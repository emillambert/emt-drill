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
      ? "/rapid"
      : progress.continuePath?.mode === "skill"
        ? "/skill"
        : "/scenario";

  return (
    <AppShell>
      <section className="hero-home">
        <p className="kicker">Clinical decision practice</p>
        <h1 className="brand-hero">EMT Drill</h1>
        <p className="hero-copy">
          Short calls. One decision at a time. Learn priority order the way the field demands it.
        </p>

        <div className="stack">
          <Link className="btn btn-primary" href={continueHref}>
            {attemptCount > 0 ? "Continue studying" : "Start a scenario"}
          </Link>
          <Link className="btn btn-secondary" href="/rapid?count=10">
            Quick 10-question session
          </Link>
          <Link className="btn btn-secondary" href={weak[0] ? `/scenario?category=${weak[0]}` : "/progress"}>
            {weak[0] ? `Weak topics · ${categoryLabel(weak[0] as never)}` : "Weak topics"}
          </Link>
        </div>
      </section>

      <div className="mode-grid">
        <Link href="/scenario" className="mode-card-link">
          <h2>Scenarios</h2>
          <p>{allScenarios.length} branching calls focused on NREMT clinical competence.</p>
        </Link>
        <Link href="/skill" className="mode-card-link">
          <h2>Skill order</h2>
          <p>Arrange assessment and treatment steps in the correct sequence.</p>
        </Link>
        <Link href="/rapid" className="mode-card-link">
          <h2>Rapid facts</h2>
          <p>Terminology, vitals ranges, contraindications, ops, and legal basics.</p>
        </Link>
        <Link href="/progress" className="mode-card-link">
          <h2>Progress</h2>
          <p>
            {ready
              ? due.length
                ? `${due.length} concepts due for review`
                : "Accuracy by topic and recent mistakes"
              : "Loading…"}
          </p>
        </Link>
      </div>

      <div className="panel" style={{ marginTop: "1.25rem" }}>
        <p className="kicker">V1 focus</p>
        <p style={{ margin: 0, lineHeight: 1.45 }}>
          Built for <strong>NREMT-style clinical decisions</strong> and patient-assessment sequencing—not
          flashcard memorization. Medication doses and agency procedures stay labeled as national
          curriculum vs local protocol.
        </p>
        <div className="chip-row">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/scenario?category=${c.id}`} className="chip">
              {c.short}
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
