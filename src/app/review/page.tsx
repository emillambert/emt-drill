"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AppShell, SourceBadge } from "@/components/ui";
import { loadReviewPayload, type ReviewPayload } from "@/lib/review-session";

function subscribe() {
  return () => {};
}

function getReview(): ReviewPayload | null {
  return loadReviewPayload();
}

export default function ReviewPage() {
  const payload = useSyncExternalStore(subscribe, getReview, () => null);

  if (!payload) {
    return (
      <AppShell title="Review" backHref="/">        <p className="empty-state">Complete a scenario to see your review.</p>
        <Link href="/scenario" className="btn btn-primary">
          Open scenarios
        </Link>
      </AppShell>
    );
  }

  const { attempt, correctSequence, keyTakeaway, title, source, explanations } = payload;
  const correct = explanations.filter(
    (d) => d.quality === "best" || d.quality === "acceptable",
  );
  const mistakes = explanations.filter(
    (d) => d.quality === "incorrect" || d.quality === "harmful" || d.delayedCritical,
  );

  return (
    <AppShell title="Review" backHref="/">
      <div className="panel" style={{ textAlign: "center" }}>
        <p className="kicker">{title}</p>
        <div className="score-ring" style={{ ["--pct" as string]: attempt.scorePercent }}>
          <strong>{attempt.scorePercent}%</strong>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          {attempt.delayedCriticalCount
            ? `${attempt.delayedCriticalCount} critical delay${attempt.delayedCriticalCount > 1 ? "s" : ""}`
            : "No critical delays"}
        </p>
      </div>

      <div className="panel">
        <p className="kicker">Correct sequence</p>
        <ol className="list-check">
          {correctSequence.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="panel">
        <p className="kicker">Decisions you handled well</p>
        {correct.length ? (
          <ul className="list-check">
            {correct.map((d) => (
              <li key={`${d.nodeId}-${d.optionId}`} className="good">
                <strong>{d.choiceText}</strong>
                <div className="muted" style={{ marginTop: "0.25rem", fontWeight: 500 }}>
                  {d.feedback}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">None this round — review the sequence above and try again.</p>
        )}
      </div>

      <div className="panel">
        <p className="kicker">Mistakes & delays</p>
        {mistakes.length ? (
          <ul className="list-check">
            {mistakes.map((d) => (
              <li
                key={`${d.nodeId}-${d.optionId}-m`}
                className={d.delayedCritical ? "warn" : "bad"}
              >
                <strong>{d.delayedCritical ? "Delayed critical care: " : ""}{d.choiceText}</strong>
                <div style={{ marginTop: "0.25rem" }}>{d.feedback}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No major misses. Keep that priority order.</p>
        )}
      </div>

      <div className="takeaway">
        <span className="kicker">Key takeaway</span>
        <div>{keyTakeaway}</div>
      </div>

      <SourceBadge {...source} />

      <div className="stack" style={{ marginTop: "1rem" }}>
        <Link href="/scenario" className="btn btn-primary">
          Next scenario
        </Link>
        <Link href="/progress" className="btn btn-secondary">
          View progress
        </Link>
      </div>
    </AppShell>
  );
}
