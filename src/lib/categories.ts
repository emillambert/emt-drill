import type { CategoryId } from "./types";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  short: string;
}[] = [
  { id: "airway", label: "Airway & breathing", short: "Airway" },
  { id: "cardiac", label: "Cardiac emergencies", short: "Cardiac" },
  { id: "medical", label: "Medical emergencies", short: "Medical" },
  { id: "trauma", label: "Trauma", short: "Trauma" },
  { id: "ob_peds", label: "Obstetrics & pediatrics", short: "OB/Peds" },
  { id: "assessment", label: "Patient assessment", short: "Assessment" },
  { id: "operations", label: "EMS operations", short: "Operations" },
  { id: "medical_legal", label: "Medical & legal issues", short: "Med/Legal" },
];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
