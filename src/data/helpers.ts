import type { Scenario, SourceRef } from "../lib/types";

/** National EMS Education Standards / EMT-level curriculum reference (not a drug dose source). */
export const NATIONAL: SourceRef = {
  scope: "national",
  label: "National EMS Education Standards — EMT",
  note: "Principles only. Follow local protocols for medication doses and agency operations.",
};

export function sc(
  partial: Omit<Scenario, "focus" | "source"> & { source?: SourceRef },
): Scenario {
  return {
    focus: "nremt",
    source: partial.source ?? NATIONAL,
    ...partial,
  };
}
