"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import {
  emptyProgress,
  loadProgress,
  saveProgress,
  upsertReviewFromAttempt,
} from "@/lib/progress";
import type {
  ProgressState,
  RapidQuestion,
  ScenarioAttempt,
  SkillOrderItem,
} from "@/lib/types";

type ProgressApi = {
  progress: ProgressState;
  ready: boolean;
  recordScenarioAttempt: (attempt: ScenarioAttempt) => void;
  recordRapid: (q: RapidQuestion, correct: boolean) => void;
  recordSkill: (item: SkillOrderItem, correct: boolean) => void;
  setContinue: (path: ProgressState["continuePath"]) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressApi | null>(null);

function subscribe(cb: () => void) {
  window.addEventListener("emt-drill-progress", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("emt-drill-progress", cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): ProgressState {
  return loadProgress();
}

function getServerSnapshot(): ProgressState {
  return emptyProgress();
}

function emit() {
  window.dispatchEvent(new Event("emt-drill-progress"));
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useIsClient();

  const api: ProgressApi = {
    progress,
    ready,
    recordScenarioAttempt: (attempt) => {
      const cur = loadProgress();
      const next = upsertReviewFromAttempt(
        {
          ...cur,
          attempts: [...cur.attempts, attempt].slice(-200),
          lastSessionAt: attempt.completedAt,
          continuePath: { mode: "scenario" },
        },        attempt,
      );
      saveProgress(next);
      emit();
    },
    recordRapid: (q, correct) => {
      const cur = loadProgress();
      saveProgress({
        ...cur,
        rapidAttempts: [
          ...cur.rapidAttempts,
          { questionId: q.id, category: q.category, correct, at: new Date().toISOString() },
        ].slice(-300),
        lastSessionAt: new Date().toISOString(),
        continuePath: { mode: "rapid" },
      });
      emit();
    },
    recordSkill: (item, correct) => {
      const cur = loadProgress();
      saveProgress({
        ...cur,
        skillAttempts: [
          ...cur.skillAttempts,
          { itemId: item.id, category: item.category, correct, at: new Date().toISOString() },
        ].slice(-200),
        lastSessionAt: new Date().toISOString(),
        continuePath: { mode: "skill" },
      });
      emit();
    },
    setContinue: (path) => {
      const cur = loadProgress();
      saveProgress({ ...cur, continuePath: path });
      emit();
    },
    reset: () => {
      saveProgress(emptyProgress());
      emit();
    },
  };

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress requires ProgressProvider");
  return ctx;
}
