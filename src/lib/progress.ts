import type {
  ConceptReviewItem,
  DecisionRecord,
  OptionQuality,
  ProgressState,
  ScenarioAttempt,
} from "./types";

const STORAGE_KEY = "emt-drill-progress-v1";

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    attempts: [],
    rapidAttempts: [],
    skillAttempts: [],
    reviews: [],
  };
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1) return emptyProgress();
    return parsed;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function scoreFromDecisions(decisions: DecisionRecord[]): number {
  if (decisions.length === 0) return 0;
  const weights: Record<OptionQuality, number> = {
    best: 1,
    acceptable: 0.7,
    incorrect: 0.2,
    harmful: 0,
  };
  const total = decisions.reduce((sum, d) => sum + weights[d.quality], 0);
  return Math.round((total / decisions.length) * 100);
}

export function scheduleReview(
  item: ConceptReviewItem | undefined,
  result: "again" | "hard" | "good",
  now = new Date(),
): ConceptReviewItem {
  const base: ConceptReviewItem = item ?? {
    conceptId: "",
    category: "assessment",
    label: "",
    easiness: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: now.toISOString(),
    lastResult: "again",
  };

  let { easiness, intervalDays, repetitions } = base;

  if (result === "again") {
    repetitions = 0;
    intervalDays = 0;
    easiness = Math.max(1.3, easiness - 0.2);
  } else if (result === "hard") {
    repetitions += 1;
    intervalDays = Math.max(1, Math.round(intervalDays * 1.2) || 1);
    easiness = Math.max(1.3, easiness - 0.05);
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * easiness);
    easiness = Math.min(3.0, easiness + 0.05);
  }

  const due = new Date(now);
  due.setDate(due.getDate() + intervalDays);

  return {
    ...base,
    easiness,
    intervalDays,
    repetitions,
    dueAt: due.toISOString(),
    lastResult: result,
  };
}

export function upsertReviewFromAttempt(
  state: ProgressState,
  attempt: ScenarioAttempt,
): ProgressState {
  const reviews = [...state.reviews];
  const missed = attempt.decisions.filter(
    (d) => d.quality === "incorrect" || d.quality === "harmful" || d.delayedCritical,
  );

  for (const d of missed) {
    const conceptId = `${attempt.scenarioId}:${d.nodeId}`;
    const idx = reviews.findIndex((r) => r.conceptId === conceptId);
    const updated = scheduleReview(
      idx >= 0
        ? reviews[idx]
        : {
            conceptId,
            category: attempt.category,
            label: d.prompt.slice(0, 80),
            easiness: 2.5,
            intervalDays: 0,
            repetitions: 0,
            dueAt: new Date().toISOString(),
            lastResult: "again",
          },
      "again",
    );
    if (idx >= 0) reviews[idx] = updated;
    else reviews.push(updated);
  }

  const correct = attempt.decisions.filter((d) => d.quality === "best" || d.quality === "acceptable");
  for (const d of correct) {
    const conceptId = `${attempt.scenarioId}:${d.nodeId}`;
    const idx = reviews.findIndex((r) => r.conceptId === conceptId);
    if (idx < 0) continue;
    reviews[idx] = scheduleReview(reviews[idx], "good");
  }

  return { ...state, reviews };
}

export function accuracyByCategory(state: ProgressState): Record<string, { correct: number; total: number; pct: number }> {
  const map: Record<string, { correct: number; total: number }> = {};

  const bump = (category: string, good: boolean) => {
    if (!map[category]) map[category] = { correct: 0, total: 0 };
    map[category].total += 1;
    if (good) map[category].correct += 1;
  };

  for (const a of state.attempts) {
    for (const d of a.decisions) {
      bump(a.category, d.quality === "best" || d.quality === "acceptable");
    }
  }
  for (const a of state.rapidAttempts) bump(a.category, a.correct);
  for (const a of state.skillAttempts) bump(a.category, a.correct);

  const out: Record<string, { correct: number; total: number; pct: number }> = {};
  for (const [k, v] of Object.entries(map)) {
    out[k] = { ...v, pct: v.total ? Math.round((v.correct / v.total) * 100) : 0 };
  }
  return out;
}

export function dueReviews(state: ProgressState, now = new Date()): ConceptReviewItem[] {
  return state.reviews
    .filter((r) => new Date(r.dueAt) <= now)
    .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt));
}

export function recentMistakes(state: ProgressState, limit = 8): DecisionRecord[] {
  const mistakes: (DecisionRecord & { at: string })[] = [];
  for (const a of [...state.attempts].reverse()) {
    for (const d of a.decisions) {
      if (d.quality === "incorrect" || d.quality === "harmful" || d.delayedCritical) {
        mistakes.push({ ...d, at: a.completedAt });
      }
    }
  }
  return mistakes.slice(0, limit);
}

export function weakCategories(state: ProgressState): string[] {
  const acc = accuracyByCategory(state);
  return Object.entries(acc)
    .filter(([, v]) => v.total >= 3)
    .sort((a, b) => a[1].pct - b[1].pct)
    .map(([k]) => k);
}
