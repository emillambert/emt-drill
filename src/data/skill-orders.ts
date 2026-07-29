import type { SkillOrderItem } from "@/lib/types";
import { NATIONAL } from "./helpers";

function sequentialOrder(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}

export const skillOrders: SkillOrderItem[] = [
  {
    id: "so-assess-01",
    category: "assessment",
    title: "Medical patient assessment sequence",
    prompt: "Put the EMT medical assessment flow in the correct order.",
    steps: [
      "Scene size-up (safety, BSI, NOI, resources, C-spine decision)",
      "Primary assessment (general impression, responsiveness, ABCs, priority)",
      "History (OPQRST / SAMPLE) and focused exam as appropriate",
      "Baseline vital signs",
      "Interventions / reassessment and transport decision updates",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Size-up and primary survey come before detailed history. Vitals and ongoing reassessment guide interventions and transport priority.",
    keyTakeaway:
      "Never skip scene safety and ABCs for a long history on an unstable patient.",
    source: NATIONAL,
  },
  {
    id: "so-assess-02",
    category: "assessment",
    title: "Trauma patient assessment sequence",
    prompt: "Order the trauma assessment priorities from first to last.",
    steps: [
      "Scene size-up and mechanism evaluation",
      "Primary survey with simultaneous life-threat control (XABC)",
      "Rapid trauma exam or focused exam based on MOI/priority",
      "Baseline vitals and SAMPLE (as time allows)",
      "Detailed exam en route if indicated; continuous reassessment",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Trauma care emphasizes early hemorrhage/ABC control and shorter scene times for unstable patients.",
    keyTakeaway:
      "Fix life threats first; save detailed exams for the ambulance when the patient is unstable.",
    source: NATIONAL,
  },
  {
    id: "so-airway-01",
    category: "airway",
    title: "Basic airway management order",
    prompt: "Arrange basic airway steps for an unresponsive medical patient.",
    steps: [
      "Open the airway (head-tilt/chin-lift if no trauma concern)",
      "Assess breathing (look, listen, feel) and need for suction",
      "Suction as needed; insert OPA if no gag reflex",
      "Ventilate with BVM and oxygen if breathing is inadequate",
      "Reassess chest rise, rate, and oxygenation",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Open and clear the airway before adjuncts and ventilations; always reassess effectiveness.",
    keyTakeaway:
      "Airway first — then breathing support — with continuous reassessment.",
    source: NATIONAL,
  },
  {
    id: "so-airway-02",
    category: "airway",
    title: "Trauma airway with c-spine concern",
    prompt: "Order airway actions when cervical injury is possible.",
    steps: [
      "Maintain manual in-line stabilization",
      "Open airway with jaw-thrust",
      "Suction if secretions/blood obstruct",
      "Provide ventilations while minimizing cervical motion",
      "Package with spinal motion restriction as indicated and reassess",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Jaw-thrust plus manual stabilization protects the cord while you still manage the airway aggressively.",
    keyTakeaway:
      "Trauma airway: jaw-thrust, suction, ventilate — without abandoning spinal precautions.",
    source: NATIONAL,
  },
  {
    id: "so-trauma-01",
    category: "trauma",
    title: "Severe extremity hemorrhage control",
    prompt: "Put bleeding-control steps in the best order for severe limb hemorrhage.",
    steps: [
      "Expose the wound and apply firm direct pressure",
      "Pack/pressure dressings as appropriate if bleeding continues",
      "Apply a tourniquet proximal to the wound if severe bleeding persists",
      "Note time of tourniquet and reassess hemorrhage control",
      "Treat for shock and rapid transport",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Direct pressure is first-line; tourniquets are used for severe uncontrolled extremity bleeding.",
    keyTakeaway:
      "Life over limb: stop the bleed, note the time, treat shock, go.",
    source: NATIONAL,
  },
  {
    id: "so-trauma-02",
    category: "trauma",
    title: "Open chest wound care",
    prompt: "Order care for an open (sucking) chest wound.",
    steps: [
      "Ensure scene safety and BSI; primary survey",
      "High-flow oxygen / support ventilations as needed",
      "Apply occlusive dressing (3-sided or commercial seal)",
      "Monitor for signs of tension pneumothorax",
      "Rapid transport and reassessment",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Seal the wound after ABCs/oxygen, then watch closely for tension physiology.",
    keyTakeaway:
      "Seal open chest wounds and reassess frequently for tension.",
    source: NATIONAL,
  },
  {
    id: "so-cardiac-01",
    category: "cardiac",
    title: "Adult cardiac arrest — CPR/AED order",
    prompt: "Arrange adult BLS cardiac arrest actions in order.",
    steps: [
      "Confirm unresponsiveness and absent/abnormal breathing; activate EMS/AED",
      "Begin high-quality chest compressions",
      "Attach AED pads and clear for analysis",
      "Deliver shock if advised, then immediately resume CPR",
      "Continue cycles with minimal interruptions until ROSC or transfer of care",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Early compressions and rapid defibrillation save lives; minimize pauses.",
    keyTakeaway:
      "Push hard/fast, shock when advised, resume CPR immediately.",
    source: NATIONAL,
  },
  {
    id: "so-cardiac-02",
    category: "cardiac",
    title: "Suspected ACS care sequence",
    prompt: "Order EMT priorities for suspected cardiac chest pain.",
    steps: [
      "Scene size-up and primary assessment (ABCs, oxygen as needed)",
      "Position of comfort; calm the patient; obtain OPQRST/SAMPLE",
      "Baseline vitals and focused cardiac assessment",
      "Assist with allowed medications per protocol (e.g., aspirin) if indicated",
      "Rapid transport / ALS; reassess and give concise handoff",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Stabilize ABCs, gather focused history, then protocol medications and priority transport.",
    keyTakeaway:
      "ABCs and transport priority come before completing every history detail.",
    source: NATIONAL,
  },
  {
    id: "so-obpeds-01",
    category: "ob_peds",
    title: "Imminent childbirth assistance",
    prompt: "Put childbirth assistance steps in order for crowning.",
    steps: [
      "BSI and prepare OB kit; position mother for delivery",
      "Support the perineum and control delivery of the head",
      "Check for nuchal cord and manage appropriately; deliver shoulders/body",
      "Dry and warm the newborn; note time of birth; clamp/cut cord when appropriate",
      "Assess mother for bleeding; keep both warm; transport and reassess",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Prepare, control the head, manage the cord, care for newborn and mother together.",
    keyTakeaway:
      "Never pull on the baby — guide delivery and prevent newborn heat loss.",
    source: NATIONAL,
  },
  {
    id: "so-obpeds-02",
    category: "ob_peds",
    title: "Neonatal resuscitation priorities",
    prompt: "Order initial neonatal resuscitation priorities.",
    steps: [
      "Warm, dry, and stimulate; position the airway",
      "Assess breathing and heart rate",
      "Begin positive-pressure ventilations if apnea/gasping or HR low after stimulation",
      "Add compressions if HR remains critically low after adequate ventilation",
      "Reassess frequently and transport with ongoing support",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Most newborns improve with warming/drying; ventilation precedes compressions.",
    keyTakeaway:
      "Neonates: warm → stimulate → ventilate → then compressions if needed.",
    source: NATIONAL,
  },
  {
    id: "so-ops-01",
    category: "operations",
    title: "START triage flow",
    prompt: "Put adult START triage decision steps in order.",
    steps: [
      "Direct walking wounded to a green (minor) area",
      "Assess breathing; open airway if needed; tag black if still apneic",
      "If breathing is present but too fast or otherwise failing RPM thresholds, tag red",
      "Check perfusion and mental status (RPM)",
      "Tag yellow if non-ambulatory but RPM intact; continue triage",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "START sorts by walk, then respirations/perfusion/mental status, to maximize lives saved with limited resources.",
    keyTakeaway:
      "Walk → breathe → RPM. Tag and move on.",
    source: NATIONAL,
  },
  {
    id: "so-legal-01",
    category: "medical_legal",
    title: "Informed refusal process",
    prompt: "Order the steps for a proper informed refusal.",
    steps: [
      "Ensure scene safety and complete an appropriate assessment including vitals",
      "Determine decision-making capacity",
      "Explain risks, benefits, and alternatives; answer questions",
      "If capacity remains and patient refuses, document thoroughly with signatures/witnesses per policy",
      "Advise to call 911 if condition worsens; leave written/verbal instructions as required",
    ],
    correctOrder: sequentialOrder(5),
    explanation:
      "Assessment and capacity come before accepting refusal; documentation closes the loop.",
    keyTakeaway:
      "No capacity, no valid refusal — and always document the risk discussion.",
    source: NATIONAL,
  },
];
