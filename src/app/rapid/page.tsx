"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppShell, ProgressBar, SourceBadge } from "@/components/ui";
import { rapidQuestions } from "@/data/rapid-questions";
import { useProgress } from "@/components/ProgressProvider";
import type { RapidQuestion } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function RapidSession() {
  const params = useSearchParams();
  const count = Number(params.get("count") ?? "10");
  const category = params.get("category") ?? undefined;
  const { recordRapid } = useProgress();

  const deck = useMemo(() => {
    const pool = category
      ? rapidQuestions.filter((q) => q.category === category)
      : rapidQuestions;
    return shuffle(pool).slice(0, Math.min(count || 10, pool.length));
  }, [category, count]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const q: RapidQuestion | undefined = deck[index];

  if (!q && !done) {
    return (
      <AppShell title="Rapid" backHref="/">
        <p className="empty-state">No questions available.</p>
      </AppShell>
    );
  }

  if (done) {
    const pct = deck.length ? Math.round((correctCount / deck.length) * 100) : 0;
    return (
      <AppShell title="Rapid" backHref="/">
        <div className="panel" style={{ textAlign: "center" }}>
          <p className="kicker">Session complete</p>
          <div className="score-ring" style={{ ["--pct" as string]: pct }}>
            <strong>{pct}%</strong>
          </div>
          <p className="muted">
            {correctCount}/{deck.length} correct
          </p>
        </div>
        <div className="stack" style={{ marginTop: "1rem" }}>
          <Link href="/rapid?count=10" className="btn btn-primary">
            Another 10
          </Link>
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </AppShell>
    );
  }

  function pick(i: number) {
    if (selected !== null || !q) return;
    setSelected(i);
    const ok = i === q.correctIndex;
    if (ok) setCorrectCount((c) => c + 1);
    recordRapid(q, ok);
  }

  function next() {
    if (index + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <AppShell title="Rapid facts" backHref="/">
      <ProgressBar current={index + 1} total={deck.length} />
      <div className="panel">
        <h2 className="prompt" style={{ marginTop: 0 }}>
          {q!.prompt}
        </h2>
        <div className="stack">
          {q!.choices.map((choice, i) => {
            let extra = "";
            if (selected !== null) {
              if (i === q!.correctIndex) extra = "good";
              else if (i === selected) extra = "bad";
            }
            return (
              <button
                key={choice}
                type="button"
                className={`btn btn-option ${extra ? `feedback-toast ${extra}` : ""}`}
                onClick={() => pick(i)}
                disabled={selected !== null}
              >
                {choice}
              </button>
            );
          })}
        </div>
        {selected !== null ? (
          <>
            <div
              className={`feedback-toast ${selected === q!.correctIndex ? "good" : "bad"}`}
              style={{ marginTop: "0.85rem" }}
            >
              {q!.explanation}
            </div>
            <SourceBadge {...q!.source} />
            <button type="button" className="btn btn-primary" style={{ marginTop: "0.85rem" }} onClick={next}>
              {index + 1 >= deck.length ? "Finish" : "Next"}
            </button>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

export default function RapidPage() {
  return (
    <Suspense fallback={<AppShell title="Rapid" backHref="/"><p className="empty-state">Loading…</p></AppShell>}>
      <RapidSession />
    </Suspense>
  );
}
