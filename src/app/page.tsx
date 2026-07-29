"use client";

import Link from "next/link";
import { AppShell } from "@/components/ui";
import { useProgress } from "@/components/ProgressProvider";
import { CATEGORIES, categoryLabel } from "@/lib/categories";
import { dueReviews, weakCategories } from "@/lib/progress";
import { allScenarios } from "@/data";

export default function HomePage() {
  const { progress, ready } = useProgress();
  const due = ready ? dueReviews(progress) : [];
  const weak = ready ? weakCategories(progress) : [];
  const attemptCount = progress.attempts.length;
  const continueHref =
    progress.continuePath?.mode === "rapid"
      ? "/rapid/"
      : progress.continuePath?.mode === "skill"
        ? "/skill/"
        : "/scenario/";

  return (
    <AppShell home>
      <section className="hero-home">
        <h1 className="brand-hero">EMT Drill</h1>
        <p className="hero-copy">
          One call at a time. Pick the next action. Learn the priority order.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href={continueHref}>
            {attemptCount > 0 ? "Continue" : "Begin a call"}
          </Link>
        </div>
      </section>

      <section className="below-fold">
        <p className="section-label">Modes</p>
        <ul className="mode-list">
          <li>
            <Link href="/scenario/">
              <strong>Scenarios</strong>
              <em>{allScenarios.length}</em>
              <span>Branching calls. One decision per screen.</span>
            </Link>
          </li>
          <li>
            <Link href="/skill/">
              <strong>Skill order</strong>
              <em>Sequence</em>
              <span>Put assessment and treatment steps in order.</span>
            </Link>
          </li>
          <li>
            <Link href="/rapid/?count=10">
              <strong>Rapid facts</strong>
              <em>10 Q</em>
              <span>Terms, vitals ranges, contraindications, ops, legal.</span>
            </Link>
          </li>
          <li>
            <Link href="/progress/">
              <strong>Progress</strong>
              <em>{ready && due.length ? `${due.length} due` : "Track"}</em>
              <span>
                {ready
                  ? weak[0]
                    ? `Weakest now: ${categoryLabel(weak[0] as never)}`
                    : "Accuracy by topic and recent misses"
                  : "Loads on this device"}
              </span>
            </Link>
          </li>
        </ul>

        <p className="section-label">Topics</p>
        <div className="topic-list">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/scenario/?category=${c.id}`}>
              {c.label}
            </Link>
          ))}
        </div>

        <p className="note-block">
          Built around NREMT-style decisions and patient assessment — not flashcards.
          National curriculum vs local protocol is labeled. No invented drug doses.
        </p>
      </section>
    </AppShell>
  );
}
