"use client";

import { createContext, useContext, useCallback, useMemo, useSyncExternalStore, type ReactNode } from "react";
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

let cachedSnapshot: ProgressState = emptyProgress();
let cacheInitialized = false;

function readCachedProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  if (!cacheInitialized) {
    cachedSnapshot = loadProgress();
    cacheInitialized = true;
  }
  return cachedSnapshot;
}

function writeAndCache(next: ProgressState): void {
  cachedSnapshot = next;
  cacheInitialized = true;
  saveProgress(next);
  window.dispatchEvent(new Event("emt-drill-progress"));
}

function subscribe(cb: () => void) {
  const onChange = () => {
    cachedSnapshot = loadProgress();
    cacheInitialized = true;
    cb();
  };
  window.addEventListener("emt-drill-progress", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("emt-drill-progress", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getServerSnapshot(): ProgressState {
  return emptyProgress();
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progress = useSyncExternalStore(subscribe, readCachedProgress, getServerSnapshot);
  const ready = useIsClient();

  const recordScenarioAttempt = useCallback((attempt: ScenarioAttempt) => {
    const cur = readCachedProgress();
    const next = upsertReviewFromAttempt(
      {
        ...cur,
        attempts: [...cur.attempts, attempt].slice(-200),
        lastSessionAt: attempt.completedAt,
        continuePath: { mode: "scenario" },
      },
      attempt,
    );
    writeAndCache(next);
  }, []);

  const recordRapid = useCallback((q: RapidQuestion, correct: boolean) => {
    const cur = readCachedProgress();
    writeAndCache({
      ...cur,
      rapidAttempts: [
        ...cur.rapidAttempts,
        { questionId: q.id, category: q.category, correct, at: new Date().toISOString() },
      ].slice(-300),
      lastSessionAt: new Date().toISOString(),
      continuePath: { mode: "rapid" },
    });
  }, []);

  const recordSkill = useCallback((item: SkillOrderItem, correct: boolean) => {
    const cur = readCachedProgress();
    writeAndCache({
      ...cur,
      skillAttempts: [
        ...cur.skillAttempts,
        { itemId: item.id, category: item.category, correct, at: new Date().toISOString() },
      ].slice(-200),
      lastSessionAt: new Date().toISOString(),
      continuePath: { mode: "skill" },
    });
  }, []);

  const setContinue = useCallback((path: ProgressState["continuePath"]) => {
    const cur = readCachedProgress();
    writeAndCache({ ...cur, continuePath: path });
  }, []);

  const reset = useCallback(() => {
    writeAndCache(emptyProgress());
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      progress,
      ready,
      recordScenarioAttempt,
      recordRapid,
      recordSkill,
      setContinue,
      reset,
    }),
    [progress, ready, recordScenarioAttempt, recordRapid, recordSkill, setContinue, reset],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress requires ProgressProvider");
  return ctx;
}
