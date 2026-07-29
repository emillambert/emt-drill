import type { Scenario } from "@/lib/types";
import { airwayScenarios } from "./scenarios/airway";
import { cardiacScenarios } from "./scenarios/cardiac";
import { medicalScenarios } from "./scenarios/medical";
import { traumaScenarios } from "./scenarios/trauma";
import { obPedsScenarios } from "./scenarios/ob-peds";
import { assessmentScenarios } from "./scenarios/assessment";
import { operationsScenarios } from "./scenarios/operations";
import { medicalLegalScenarios } from "./scenarios/medical-legal";

export const allScenarios: Scenario[] = [
  ...airwayScenarios,
  ...cardiacScenarios,
  ...medicalScenarios,
  ...traumaScenarios,
  ...obPedsScenarios,
  ...assessmentScenarios,
  ...operationsScenarios,
  ...medicalLegalScenarios,
];

export function getScenario(id: string): Scenario | undefined {
  return allScenarios.find((s) => s.id === id);
}

export function scenariosByCategory(category: string): Scenario[] {
  return allScenarios.filter((s) => s.category === category);
}

export function pickScenarios(count: number, category?: string): Scenario[] {
  const pool = category
    ? scenariosByCategory(category)
    : [...allScenarios];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
