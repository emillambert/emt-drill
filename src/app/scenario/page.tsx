"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppShell, ProgressBar, SourceBadge, VitalsStrip } from "@/components/ui";
import { allScenarios, getScenario, scenariosByCategory } from "@/data";
import { getNode } from "@/lib/scenario-engine";
import { scoreFromDecisions } from "@/lib/progress";
import { categoryLabel } from "@/lib/categories";
import { useProgress } from "@/components/ProgressProvider";
import { saveReviewPayload } from "@/lib/review-session";
import type { DecisionRecord, Scenario, ScenarioOption } from "@/lib/types";

function ScenarioRunner({ scenario }: { scenario: Scenario }) {
  const router = useRouter();
  const { recordScenarioAttempt, setContinue } = useProgress();
  const [nodeId, setNodeId] = useState(scenario.startNodeId);
  const [step, setStep] = useState(1);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [pending, setPending] = useState<ScenarioOption | null>(null);
  const [finishedIntro, setFinishedIntro] = useState(false);

  const node = getNode(scenario, nodeId);
  const totalSteps = scenario.nodes.length;

  function choose(option: ScenarioOption) {
    setPending(option);
  }

  function advance() {
    if (!pending) return;
    const record: DecisionRecord = {
      nodeId: node.id,
      optionId: pending.id,
      quality: pending.quality,
      delayedCritical: Boolean(pending.delayedCritical),
      prompt: node.prompt,
      choiceText: pending.text,
      feedback: pending.feedback,
    };
    const nextDecisions = [...decisions, record];
    setDecisions(nextDecisions);
    setPending(null);

    if (pending.next === "end") {
      const attempt = {
        scenarioId: scenario.id,
        category: scenario.category,
        completedAt: new Date().toISOString(),
        scorePercent: scoreFromDecisions(nextDecisions),
        decisions: nextDecisions,
        delayedCriticalCount: nextDecisions.filter((d) => d.delayedCritical).length,
      };
      recordScenarioAttempt(attempt);
      saveReviewPayload({
        attempt,
        correctSequence: scenario.correctSequence,
        keyTakeaway: scenario.keyTakeaway,
        title: scenario.title,
        source: scenario.source,
        explanations: nextDecisions,
      });
      setContinue({ mode: "scenario", id: scenario.id });
      router.push("/review/");
      return;
    }

    setNodeId(pending.next);
    setStep((s) => s + 1);
  }

  if (!finishedIntro) {
    return (
      <AppShell title="Call" backHref="/scenario/">
        <div className="panel scene-block" style={{ animation: "rise 0.45s ease-out both" }}>
          <p className="kicker">{categoryLabel(scenario.category)}</p>
          <h2 className="prompt" style={{ marginTop: 0 }}>
            {scenario.title}
          </h2>
          <p>
            <strong>Dispatch</strong> {scenario.dispatch}
          </p>
          <p>
            <strong>Scene</strong> {scenario.scene}
          </p>
          <p>
            <strong>Patient</strong> {scenario.presentation}
          </p>
          <VitalsStrip vitals={scenario.vitals} />
          <SourceBadge {...scenario.source} />
        </div>
        <div className="decision-footer">
          <button type="button" className="btn btn-primary" onClick={() => setFinishedIntro(true)}>
            Start decisions
          </button>
        </div>
      </AppShell>
    );
  }

  const feedbackClass =
    pending?.quality === "best" || pending?.quality === "acceptable"
      ? "good"
      : pending?.delayedCritical
        ? "warn"
        : "bad";

  return (
    <AppShell title="Call" backHref="/scenario/">
      <div className="decision-screen">
        <ProgressBar current={Math.min(step, totalSteps)} total={totalSteps} />
        <div className="panel quiet">
          {node.sceneUpdate ? (
            <p className="muted" style={{ marginTop: 0, marginBottom: "0.75rem" }}>
              {node.sceneUpdate}
            </p>
          ) : null}
          <VitalsStrip vitals={node.vitals ?? scenario.vitals} />
          <h2 className="prompt">{node.prompt}</h2>
          {!pending ? (
            <div className="stack">
              {node.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="btn btn-option"
                  onClick={() => choose(opt)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className={`feedback-toast ${feedbackClass}`}>
                <strong>
                  {pending.quality === "best"
                    ? "Correct priority"
                    : pending.quality === "acceptable"
                      ? "Acceptable"
                      : pending.delayedCritical
                        ? "Critical delay"
                        : "Needs work"}
                </strong>
                <p style={{ margin: "0.4rem 0 0" }}>{pending.feedback}</p>
              </div>
              <div className="decision-footer" style={{ marginTop: 0, paddingTop: 0 }}>
                <button type="button" className="btn btn-primary" onClick={advance}>
                  {pending.next === "end" ? "See debrief" : "Next decision"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function ScenarioPicker() {
  const params = useSearchParams();
  const category = params.get("category") ?? undefined;
  const id = params.get("id") ?? undefined;
  const list = useMemo(() => {
    if (id) {
      const s = getScenario(id);
      return s ? [s] : [];
    }
    return category ? scenariosByCategory(category) : allScenarios;
  }, [category, id]);

  // Deterministic first item for SSR/hydration; randomize only after mount
  const [starterId, setStarterId] = useState(list[0]?.id);
  useEffect(() => {
    if (!list.length) return;
    const pick = list[Math.floor(Math.random() * list.length)];
    setStarterId(pick.id);
  }, [list]);

  if (id) {
    const scenario = getScenario(id);
    if (!scenario) {
      return (
        <AppShell title="Scenario" backHref="/">
          <p className="empty-state">Scenario not found.</p>
        </AppShell>
      );
    }
    return <ScenarioRunner scenario={scenario} />;
  }

  return (
    <AppShell title="Calls" backHref="/">
      <div className="picker-head panel">
        <p className="kicker">{category ? categoryLabel(category as never) : "All categories"}</p>
        <h2 className="prompt" style={{ marginTop: 0 }}>
          Choose a call
        </h2>
        <p className="picker-count" style={{ margin: 0 }}>
          {list.length} scenarios · one decision at a time
        </p>
      </div>
      {starterId ? (
        <div className="stack" style={{ marginTop: "1rem" }}>
          <Link className="btn btn-primary" href={`/scenario/?id=${starterId}`}>
            Random call
          </Link>
        </div>
      ) : null}
      <div className="call-list">
        {list.map((s) => (
          <Link key={s.id} href={`/scenario/?id=${s.id}`} className="call-row">
            <strong>{s.title}</strong>
            <div className="call-meta">
              <span>{categoryLabel(s.category)}</span>
              <span>{s.difficulty}</span>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

export default function ScenarioPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Scenario" backHref="/">
          <p className="empty-state">Loading…</p>
        </AppShell>
      }
    >
      <ScenarioPicker />
    </Suspense>
  );
}
