import type { DecisionRecord, ScenarioAttempt } from "@/lib/types";

const REVIEW_KEY = "emt-drill-last-review";

export type ReviewPayload = {
  attempt: ScenarioAttempt;
  correctSequence: string[];
  keyTakeaway: string;
  title: string;
  source: { scope: "national" | "local"; label: string; note?: string };
  explanations: DecisionRecord[];
};

export function saveReviewPayload(payload: ReviewPayload) {
  sessionStorage.setItem(REVIEW_KEY, JSON.stringify(payload));
}

export function loadReviewPayload(): ReviewPayload | null {
  try {
    const raw = sessionStorage.getItem(REVIEW_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReviewPayload;
  } catch {
    return null;
  }
}
