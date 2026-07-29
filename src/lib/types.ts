export type CategoryId =
  | "airway"
  | "cardiac"
  | "medical"
  | "trauma"
  | "ob_peds"
  | "assessment"
  | "operations"
  | "medical_legal";

export type SourceScope = "national" | "local";

export type OptionQuality = "best" | "acceptable" | "incorrect" | "harmful";

export interface SourceRef {
  scope: SourceScope;
  label: string;
  note?: string;
}

export interface Vitals {
  hr?: number | string;
  rr?: number | string;
  spo2?: number | string;
  bp?: string;
  temp?: string;
  glucose?: string;
  gcs?: string;
  etco2?: string;
  skin?: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  quality: OptionQuality;
  next: string | "end";
  feedback: string;
  delayedCritical?: boolean;
}

export interface ScenarioNode {
  id: string;
  prompt: string;
  sceneUpdate?: string;
  vitals?: Vitals;
  options: ScenarioOption[];
}

export interface Scenario {
  id: string;
  title: string;
  category: CategoryId;
  difficulty: "foundational" | "application" | "critical";
  focus: "nremt";
  dispatch: string;
  scene: string;
  presentation: string;
  vitals?: Vitals;
  source: SourceRef;
  startNodeId: string;
  nodes: ScenarioNode[];
  correctSequence: string[];
  keyTakeaway: string;
}

export interface RapidQuestion {
  id: string;
  category: CategoryId;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  source: SourceRef;
}

export interface SkillOrderItem {
  id: string;
  category: CategoryId;
  title: string;
  prompt: string;
  steps: string[];
  correctOrder: number[];
  explanation: string;
  keyTakeaway: string;
  source: SourceRef;
}

export interface DecisionRecord {
  nodeId: string;
  optionId: string;
  quality: OptionQuality;
  delayedCritical: boolean;
  prompt: string;
  choiceText: string;
  feedback: string;
}

export interface ScenarioAttempt {
  scenarioId: string;
  category: CategoryId;
  completedAt: string;
  scorePercent: number;
  decisions: DecisionRecord[];
  delayedCriticalCount: number;
}

export interface ConceptReviewItem {
  conceptId: string;
  category: CategoryId;
  label: string;
  easiness: number;
  intervalDays: number;
  repetitions: number;
  dueAt: string;
  lastResult: "again" | "hard" | "good";
}

export interface ProgressState {
  version: 1;
  attempts: ScenarioAttempt[];
  rapidAttempts: {
    questionId: string;
    category: CategoryId;
    correct: boolean;
    at: string;
  }[];
  skillAttempts: {
    itemId: string;
    category: CategoryId;
    correct: boolean;
    at: string;
  }[];
  reviews: ConceptReviewItem[];
  lastSessionAt?: string;
  continuePath?: {
    mode: "scenario" | "rapid" | "skill";
    id?: string;
  };
}
