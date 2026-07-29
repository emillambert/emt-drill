"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell, ProgressBar, SourceBadge } from "@/components/ui";
import { skillOrders } from "@/data/skill-orders";
import { useProgress } from "@/components/ProgressProvider";
import type { SkillOrderItem } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SkillPage() {
  const { recordSkill } = useProgress();
  const [deck, setDeck] = useState<SkillOrderItem[]>(skillOrders);
  const [index, setIndex] = useState(0);
  const [pool, setPool] = useState<number[]>([]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nextDeck = shuffle(skillOrders);
    setDeck(nextDeck);
    setIndex(0);
    setPool(shuffle(nextDeck[0].steps.map((_, i) => i)));
    setPlaced([]);
    setChecked(false);
    setCorrect(false);
    setReady(true);
  }, []);

  function resetFor(next: SkillOrderItem) {
    setPool(shuffle(next.steps.map((_, i) => i)));
    setPlaced([]);
    setChecked(false);
    setCorrect(false);
  }

  if (!ready) {
    return (
      <AppShell title="Skills" backHref="/">
        <p className="empty-state">Loading…</p>
      </AppShell>
    );
  }

  const current = deck[index];
  if (!current) {
    return (
      <AppShell title="Skills" backHref="/">
        <p className="empty-state">No skill drills available.</p>
      </AppShell>
    );
  }

  function pickFromPool(stepIndex: number) {
    if (checked) return;
    setPool((p) => p.filter((i) => i !== stepIndex));
    setPlaced((p) => [...p, stepIndex]);
  }

  function undo() {
    if (checked || placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced((p) => p.slice(0, -1));
    setPool((p) => [...p, last]);
  }

  function check() {
    if (placed.length !== current.steps.length) return;
    const ok = placed.every((v, i) => v === current.correctOrder[i]);
    setCorrect(ok);
    setChecked(true);
    recordSkill(current, ok);
  }

  function next() {
    if (index + 1 >= deck.length) {
      setIndex(0);
      resetFor(deck[0]);
      return;
    }
    const nextItem = deck[index + 1];
    setIndex((i) => i + 1);
    resetFor(nextItem);
  }

  return (
    <AppShell title="Skills" backHref="/">
      <ProgressBar current={index + 1} total={deck.length} />
      <div className="panel">
        <p className="kicker">{current.title}</p>
        <h2 className="prompt" style={{ marginTop: 0 }}>
          {current.prompt}
        </h2>

        <p className="section-label" style={{ marginTop: "0.25rem" }}>
          Your sequence
        </p>
        {placed.length === 0 ? (
          <p className="muted">Tap steps below in the correct order.</p>
        ) : (
          placed.map((stepIndex, order) => (
            <div key={`placed-${stepIndex}`} className="skill-step placed">
              {order + 1}. {current.steps[stepIndex]}
            </div>
          ))
        )}

        {!checked ? (
          <>
            <p className="section-label">Available steps</p>
            {pool.map((stepIndex) => (
              <button
                key={`pool-${stepIndex}`}
                type="button"
                className="skill-step"
                onClick={() => pickFromPool(stepIndex)}
              >
                {current.steps[stepIndex]}
              </button>
            ))}
            <div className="stack" style={{ marginTop: "0.75rem" }}>
              <button type="button" className="btn btn-secondary" onClick={undo} disabled={!placed.length}>
                Undo last
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={check}
                disabled={placed.length !== current.steps.length}
              >
                Check order
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`feedback-toast ${correct ? "good" : "bad"}`}>
              <strong>{correct ? "Correct sequence" : "Not quite"}</strong>
              <p style={{ margin: "0.35rem 0 0" }}>{current.explanation}</p>
            </div>
            {!correct ? (
              <div className="panel" style={{ marginTop: "0.75rem", padding: "0.75rem" }}>
                <p className="kicker">Correct order</p>
                {current.correctOrder.map((stepIndex, i) => (
                  <div key={`ans-${stepIndex}`} className="skill-step placed">
                    {i + 1}. {current.steps[stepIndex]}
                  </div>
                ))}
              </div>
            ) : null}
            <div className="takeaway">{current.keyTakeaway}</div>
            <SourceBadge {...current.source} />
            <div className="stack" style={{ marginTop: "0.85rem" }}>
              <button type="button" className="btn btn-primary" onClick={next}>
                Next skill
              </button>
              <Link href="/" className="btn btn-secondary">
                Home
              </Link>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
