"use client";

import Link from "next/link";
import { AppShell } from "@/components/ui";
import { useProgress } from "@/components/ProgressProvider";
import { CATEGORIES, categoryLabel } from "@/lib/categories";
import { accuracyByCategory, dueReviews, recentMistakes } from "@/lib/progress";
import type { CategoryId } from "@/lib/types";

export default function ProgressPage() {
  const { progress, ready, reset } = useProgress();
  const accuracy = ready ? accuracyByCategory(progress) : {};
  const due = ready ? dueReviews(progress) : [];
  const mistakes = ready ? recentMistakes(progress) : [];

  return (
    <AppShell title="Progress" backHref="/">
      <div className="panel">
        <p className="kicker">Accuracy by topic</p>
        {CATEGORIES.map((c) => {
          const row = accuracy[c.id];
          const pct = row?.pct ?? 0;
          return (
            <div key={c.id} className="stat-row" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{c.label}</span>
                <strong>{row ? `${pct}%` : "—"}</strong>
              </div>
              <div className="bar-meter">
                <span style={{ width: `${row ? pct : 0}%` }} />
              </div>
              <div className="muted" style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>
                {row ? `${row.correct}/${row.total} decisions` : "No attempts yet"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <p className="kicker">Due for review</p>
        {due.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            Nothing due. Missed decisions will reappear here with spaced repetition.
          </p>
        ) : (
          <ul className="list-check">
            {due.slice(0, 10).map((r) => (
              <li key={r.conceptId} className="warn">
                <div>{r.label}</div>
                <Link
                  href={`/scenario?id=${r.conceptId.split(":")[0]}`}
                  className="muted"
                  style={{ fontSize: "0.85rem", fontWeight: 600 }}
                >
                  Retry · {categoryLabel(r.category as CategoryId)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="panel">
        <p className="kicker">Recent mistakes</p>
        {mistakes.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            No mistakes logged yet.
          </p>
        ) : (
          <ul className="list-check">
            {mistakes.map((m, i) => (
              <li key={`${m.nodeId}-${i}`} className="bad">
                <strong>{m.choiceText}</strong>
                <div className="muted" style={{ marginTop: "0.25rem" }}>
                  {m.feedback}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="nav-tabs">
        <Link href="/scenario" className="btn btn-primary">
          Drill scenarios
        </Link>
        <Link href="/rapid?count=10" className="btn btn-secondary">
          Quick 10
        </Link>
      </div>

      <button
        type="button"
        className="btn btn-ghost"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          if (confirm("Reset all local progress?")) reset();
        }}
      >
        Reset local progress
      </button>
    </AppShell>
  );
}
