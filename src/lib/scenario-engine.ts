import type { Scenario, ScenarioNode } from "./types";

export function getNode(scenario: Scenario, nodeId: string): ScenarioNode {
  const node = scenario.nodes.find((n) => n.id === nodeId);
  if (!node) throw new Error(`Missing node ${nodeId} in ${scenario.id}`);
  return node;
}

export function countDecisionNodes(scenario: Scenario): number {
  return scenario.nodes.filter((n) => n.options.length > 0).length;
}
