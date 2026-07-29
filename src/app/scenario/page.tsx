"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { AppShell, ProgressBar, SourceBadge, VitalsStrip } from "@/components/ui";
import { allScenarios, getScenario, pickScenarios } from "@/data";
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
      router.push("/review");
      return;
    }

    setNodeId(pending.next);
    setStep((s) => s + 1);
  }

  if (!finishedIntro) {
    return (
      <AppShell title="Scenario" backHref="/">
        <div className="panel scene-block" style={{ animation: "rise 0.45s ease-out both" }}>
          <p className="kicker">{categoryLabel(scenario.category)}</p>
          <h2 className="prompt" style={{ marginTop: 0 }}>
            {scenario.title}
          </h2>
          <p>
            <strong>Dispatch:</strong> {scenario.dispatch}
          </p>
          <p>
            <strong>Scene:</strong> {scenario.scene}
          </p>
          <p>
            <strong>Presentation:</strong> {scenario.presentation}
          </p>
          <VitalsStrip vitals={scenario.vitals} />
          <SourceBadge {...scenario.source} />
        </div>
        <div className="stack" style={{ marginTop: "1rem" }}>
          <button type="button" className="btn btn-primary" onClick={() => setFinishedIntro(true)}>
            Begin decisions
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
    <AppShell title="Scenario" backHref="/">
      <ProgressBar current={Math.min(step, totalSteps)} total={totalSteps} />
      <div className="panel">
        {node.sceneUpdate ? (
          <p className="muted" style={{ marginTop: 0 }}>
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
              <p style={{ margin: "0.35rem 0 0" }}>{pending.feedback}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={advance}>
              {pending.next === "end" ? "See review" : "Next decision"}
            </button>
          </>
        )}
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
    return category
      ? allScenarios.filter((s) => s.category === category)
      : allScenarios;
  }, [category, id]);

  const starter = useMemo(() => pickScenarios(1, category)[0], [category]);

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
    <AppShell title="Scenarios" backHref="/">
      <div className="panel">        <p className="kicker">{category ? categoryLabel(category as never) : "All categories"}</p>
        <h2 className="prompt" style={{ marginTop: 0 }}>
          Choose a call
        </h2>
        <p className="muted" style={{ marginTop: 0 }}>
          {list.length} scenarios · one decision per screen
        </p>
      </div>
      {starter ? (
        <div className="stack" style={{ marginTop: "0.85rem" }}>
          <Link className="btn btn-primary" href={`/scenario?id=${starter.id}`}>
            Start random{category ? ` · ${categoryLabel(category as never)}` : ""}
          </Link>
        </div>
      ) : null}
      <div className="stack" style={{ marginTop: "0.85rem" }}>
        {list.map((s) => (
          <Link key={s.id} href={`/scenario?id=${s.id}`} className="btn btn-secondary" style={{ justifyContent: "flex-start" }}>
            <span>
              <strong>{s.title}</strong>
              <br />
              <span className="muted" style={{ fontWeight: 500, fontSize: "0.88rem" }}>
                {categoryLabel(s.category)} · {s.difficulty}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

export default function ScenarioPage() {
  return (
    <Suspense fallback={<AppShell title="Scenario" backHref="/"><p className="empty-state">Loading…</p></AppShell>}>
      <ScenarioPicker />
    </Suspense>
  );
}
