import type { RapidQuestion } from "@/lib/types";
import { NATIONAL } from "./helpers";

export const rapidQuestions: RapidQuestion[] = [
  {
    id: "rq-airway-01",
    category: "airway",
    prompt:
      "What is the preferred airway maneuver for an unresponsive trauma patient with suspected cervical spine injury?",
    choices: [
      "Head-tilt/chin-lift",
      "Jaw-thrust without head tilt",
      "Blind finger sweep of the oropharynx",
      "Immediate nasopharyngeal airway insertion without assessment",
    ],
    correctIndex: 1,
    explanation:
      "Jaw-thrust opens the airway while minimizing cervical motion. Head-tilt/chin-lift is used when trauma is not a concern.",
    source: NATIONAL,
  },
  {
    id: "rq-airway-02",
    category: "airway",
    prompt: "An oropharyngeal airway (OPA) is contraindicated when the patient:",
    choices: [
      "Is unresponsive with no gag reflex",
      "Has a gag reflex or is semi-conscious",
      "Needs assisted ventilations",
      "Has facial trauma and requires suction",
    ],
    correctIndex: 1,
    explanation:
      "An OPA can provoke vomiting or laryngospasm if the gag reflex is intact. Use only in unresponsive patients without a gag.",
    source: NATIONAL,
  },
  {
    id: "rq-airway-03",
    category: "airway",
    prompt: "The most reliable sign that BVM ventilations are effective is:",
    choices: [
      "Loud gurgling with each squeeze",
      "Visible chest rise with each ventilation",
      "Rapid gastric distention alone",
      "A falling SpO₂ with good seal",
    ],
    correctIndex: 1,
    explanation:
      "Adequate chest rise indicates volume is entering the lungs. Reassess seal, airway, and rate if the chest does not rise.",
    source: NATIONAL,
  },
  {
    id: "rq-airway-04",
    category: "airway",
    prompt: "A nasopharyngeal airway (NPA) is generally avoided when there is:",
    choices: [
      "An intact gag reflex in a semi-conscious patient",
      "Suspected basilar skull fracture or severe facial trauma",
      "Need for suctioning",
      "Spontaneous breathing",
    ],
    correctIndex: 1,
    explanation:
      "NPAs are relatively contraindicated with significant facial/skull trauma because of possible intracranial placement risk.",
    source: NATIONAL,
  },
  {
    id: "rq-airway-05",
    category: "airway",
    prompt: "Suctioning of the oropharynx in an adult should generally be limited to about:",
    choices: [
      "15 seconds per attempt while watching the patient",
      "2 minutes continuously without pause",
      "Only once ever during a call",
      "Until the suction canister is empty regardless of hypoxia",
    ],
    correctIndex: 0,
    explanation:
      "Limit suction attempts (commonly ~15 seconds in adults), then re-oxygenate/ventilate and reassess.",
    source: NATIONAL,
  },
  {
    id: "rq-cardiac-01",
    category: "cardiac",
    prompt: "High-quality adult CPR compressions are performed at a rate of about:",
    choices: [
      "60–80 per minute",
      "100–120 per minute",
      "140–160 per minute",
      "40–50 per minute",
    ],
    correctIndex: 1,
    explanation:
      "Current adult CPR targets roughly 100–120 compressions per minute with adequate depth and full recoil.",
    source: NATIONAL,
  },
  {
    id: "rq-cardiac-02",
    category: "cardiac",
    prompt: "After an AED delivers a shock, the immediate next action is usually to:",
    choices: [
      "Check a pulse for a full minute before touching the patient",
      "Resume CPR starting with compressions",
      "Turn the AED off and wait",
      "Move the patient to sitting position",
    ],
    correctIndex: 1,
    explanation:
      "Minimize pauses — resume high-quality CPR immediately after a shock unless the device prompts otherwise.",
    source: NATIONAL,
  },
  {
    id: "rq-cardiac-03",
    category: "cardiac",
    prompt:
      "A patient with suspected cardiac chest pain who is hypotensive and pale is best described as:",
    choices: [
      "Stable — continue a leisurely interview only",
      "Potentially unstable — support ABCs and rapid transport/ALS",
      "A refusal candidate without assessment",
      "A minor call not needing oxygen assessment",
    ],
    correctIndex: 1,
    explanation:
      "Hypotension and poor perfusion with cardiac symptoms indicate instability and priority transport.",
    source: NATIONAL,
  },
  {
    id: "rq-cardiac-04",
    category: "cardiac",
    prompt: "Aspirin assistance for suspected ACS (when protocol allows) is primarily to:",
    choices: [
      "Relieve anxiety only",
      "Reduce platelet aggregation as part of cardiac care",
      "Replace the need for transport",
      "Raise blood pressure immediately",
    ],
    correctIndex: 1,
    explanation:
      "Aspirin is given (per protocol/indications) for its antiplatelet effect in suspected ACS — not as a sedative or BP drug.",
    source: NATIONAL,
  },
  {
    id: "rq-cardiac-05",
    category: "cardiac",
    prompt: "Return of spontaneous circulation (ROSC) after CPR is suggested by:",
    choices: [
      "Sudden presence of a pulse and signs of life during reassessment",
      "AED advising 'shock' continuously without pause",
      "Complete absence of end-tidal effort forever",
      "Only by skin color changing once",
    ],
    correctIndex: 0,
    explanation:
      "ROSC is recognized by return of organized pulse/perfusion signs — then support ABCs and transport.",
    source: NATIONAL,
  },
  {
    id: "rq-medical-01",
    category: "medical",
    prompt: "A normal adult capillary blood glucose is commonly near which range (approximate)?",
    choices: [
      "About 70–100 mg/dL fasting / roughly under ~140 mg/dL random (varies)",
      "Always exactly 20 mg/dL",
      "Always above 400 mg/dL",
      "Glucose is never measurable in adults",
    ],
    correctIndex: 0,
    explanation:
      "Exact cutoffs vary by protocol, but EMTs should recognize hypoglycemia vs marked hyperglycemia qualitatively and treat per protocol.",
    source: NATIONAL,
  },
  {
    id: "rq-medical-02",
    category: "medical",
    prompt: "Oral glucose is generally intended for a patient who is:",
    choices: [
      "Unresponsive with no gag reflex",
      "Hypoglycemic (or suspected) and able to swallow/protect the airway",
      "Choking with a complete obstruction",
      "In cardiac arrest only",
    ],
    correctIndex: 1,
    explanation:
      "Oral glucose requires a patient who can swallow and protect the airway. Unresponsive patients need airway support and other pathways per protocol.",
    source: NATIONAL,
  },
  {
    id: "rq-medical-03",
    category: "medical",
    prompt: "The Cincinnati Prehospital Stroke Scale assesses:",
    choices: [
      "Facial droop, arm drift, and abnormal speech",
      "Only blood pressure",
      "Only pupil size",
      "Ability to run a mile",
    ],
    correctIndex: 0,
    explanation:
      "Facial droop, arm drift, and speech abnormalities are classic stroke-screen elements.",
    source: NATIONAL,
  },
  {
    id: "rq-medical-04",
    category: "medical",
    prompt: "In suspected anaphylaxis with respiratory compromise, EMT priority includes:",
    choices: [
      "Waiting at home for self-resolution without assessment",
      "Airway/oxygen support and assisting the patient's epinephrine auto-injector per protocol",
      "Encouraging the patient to run to increase adrenaline naturally",
      "Giving oral fluids only",
    ],
    correctIndex: 1,
    explanation:
      "Support ABCs and assist with prescribed epinephrine when indicated by protocol; transport and reassess.",
    source: NATIONAL,
  },
  {
    id: "rq-medical-05",
    category: "medical",
    prompt: "Seizing patients should primarily be protected by:",
    choices: [
      "Forcing objects between the teeth",
      "Protecting from injury, positioning for airway after the seizure, and timing the event",
      "Holding them upright in a standing position",
      "Giving oral meds during tonic-clonic activity",
    ],
    correctIndex: 1,
    explanation:
      "Do not force objects into the mouth. Protect the patient, support airway after the seizure, and gather SAMPLE/timing.",
    source: NATIONAL,
  },
  {
    id: "rq-trauma-01",
    category: "trauma",
    prompt: "The first priority for life-threatening external hemorrhage is:",
    choices: [
      "Detailed SAMPLE history",
      "Direct pressure (and tourniquet for severe extremity bleeding when needed)",
      "Ice packs only",
      "Walking the patient to test stability",
    ],
    correctIndex: 1,
    explanation:
      "Severe bleeding is controlled early (XABC). Direct pressure first; tourniquets for severe extremity hemorrhage when indicated.",
    source: NATIONAL,
  },
  {
    id: "rq-trauma-02",
    category: "trauma",
    prompt: "A sucking chest wound is initially managed by:",
    choices: [
      "Occlusive dressing sealed on three sides (or commercial chest seal) and monitoring for tension",
      "Deep probing of the wound with fingers",
      "Encouraging deep breath-holding only",
      "Ignoring it if SpO₂ is briefly normal",
    ],
    correctIndex: 0,
    explanation:
      "Seal open chest wounds and reassess for developing tension pneumothorax signs.",
    source: NATIONAL,
  },
  {
    id: "rq-trauma-03",
    category: "trauma",
    prompt: "Cushing's triad (late increased ICP pattern) includes:",
    choices: [
      "Hypertension, bradycardia, and irregular respirations",
      "Hypotension, tachycardia, and warm dry skin only",
      "Fever, rash, and stiff neck only",
      "Hypoglycemia alone",
    ],
    correctIndex: 0,
    explanation:
      "Hypertension with bradycardia and abnormal breathing suggests critically elevated ICP — rapid transport and airway support.",
    source: NATIONAL,
  },
  {
    id: "rq-trauma-04",
    category: "trauma",
    prompt: "For a partially amputated extremity with severe bleeding:",
    choices: [
      "Focus only on finding the amputated part before any bleeding control",
      "Control hemorrhage first, then manage the part (moist sterile dressing, bag, cool without direct ice on tissue)",
      "Place the part directly on dry ice against bare tissue",
      "Soak the part in water indefinitely",
    ],
    correctIndex: 1,
    explanation:
      "Life over limb — stop bleeding first. Preserve the part appropriately without freezing tissue directly.",
    source: NATIONAL,
  },
  {
    id: "rq-trauma-05",
    category: "trauma",
    prompt: "Spinal motion restriction decisions should be based on:",
    choices: [
      "MOI, reliable exam, neurologic complaints/deficits, and protocol criteria — not reflex boarding everyone forever",
      "Weather only",
      "Patient preference exclusively without assessment",
      "Whether the ambulance has a cot",
    ],
    correctIndex: 0,
    explanation:
      "Modern EMS uses selective spinal motion restriction based on criteria, not automatic longboard use for every trauma.",
    source: NATIONAL,
  },
  {
    id: "rq-obpeds-01",
    category: "ob_peds",
    prompt: "Crowning during labor means:",
    choices: [
      "Delivery is imminent and you should prepare to assist on scene/en route",
      "You have hours before any preparation is needed",
      "The placenta has already delivered",
      "Transport can be canceled",
    ],
    correctIndex: 0,
    explanation:
      "Visible crowning indicates birth is about to occur — prepare the OB kit and assist.",
    source: NATIONAL,
  },
  {
    id: "rq-obpeds-02",
    category: "ob_peds",
    prompt: "Immediate care of a vigorous newborn prioritizes:",
    choices: [
      "Drying, warming, and positioning the airway",
      "Routine prolonged separation in a cold room",
      "Adult-sized ventilation volumes immediately for every crying newborn",
      "Ignoring the mother entirely",
    ],
    correctIndex: 0,
    explanation:
      "Warmth and drying prevent hypothermia and stimulate breathing in most newborns.",
    source: NATIONAL,
  },
  {
    id: "rq-obpeds-03",
    category: "ob_peds",
    prompt: "Compared with adults, infants in shock often:",
    choices: [
      "Maintain blood pressure until late while showing tachycardia and poor perfusion signs earlier",
      "Always become hypotensive first before any other sign",
      "Never show skin color changes",
      "Cannot be assessed without invasive monitors only",
    ],
    correctIndex: 0,
    explanation:
      "Pediatric patients compensate with tachycardia; hypotension is a late and ominous finding.",
    source: NATIONAL,
  },
  {
    id: "rq-obpeds-04",
    category: "ob_peds",
    prompt: "Suspected epiglottitis management emphasizes:",
    choices: [
      "Keeping the child calm, avoiding throat inspection, and gentle transport",
      "Forced supine positioning and tongue-blade exam",
      "OPA insertion while fully alert",
      "Home observation without EMS",
    ],
    correctIndex: 0,
    explanation:
      "Do not agitate or examine the throat — maintain position of comfort and transport carefully.",
    source: NATIONAL,
  },
  {
    id: "rq-obpeds-05",
    category: "ob_peds",
    prompt: "In breech delivery, the EMT should:",
    choices: [
      "Support the presenting parts and avoid pulling on the infant",
      "Apply strong traction on the legs to speed the head",
      "Push the presenting parts back inside forcefully",
      "Ignore airway needs if the head is delayed",
    ],
    correctIndex: 0,
    explanation:
      "Breech is complicated: support without traction and manage airway/entrapped head per training while arranging rapid transport.",
    source: NATIONAL,
  },
  {
    id: "rq-assess-01",
    category: "assessment",
    prompt: "Scene size-up includes all EXCEPT:",
    choices: [
      "Scene safety and BSI",
      "NOI/MOI and number of patients",
      "Need for additional resources",
      "Completing a full detailed secondary exam before looking for hazards",
    ],
    correctIndex: 3,
    explanation:
      "Size-up comes before detailed exams. Safety, NOI/MOI, patient count, and resources come first.",
    source: NATIONAL,
  },
  {
    id: "rq-assess-02",
    category: "assessment",
    prompt: "AVPU assesses:",
    choices: [
      "Responsiveness: Alert, Voice, Pain, Unresponsive",
      "Only blood pressure categories",
      "Only allergy history",
      "Ambulance vehicle positioning units",
    ],
    correctIndex: 0,
    explanation:
      "AVPU is a rapid responsiveness scale used in the primary survey.",
    source: NATIONAL,
  },
  {
    id: "rq-assess-03",
    category: "assessment",
    prompt: "SAMPLE history is best obtained:",
    choices: [
      "After life threats are addressed, during secondary assessment on an appropriate patient",
      "Before opening an obstructed airway",
      "Only by law enforcement",
      "Instead of vital signs forever",
    ],
    correctIndex: 0,
    explanation:
      "History supports care after ABCs; interrupt it if the patient destabilizes.",
    source: NATIONAL,
  },
  {
    id: "rq-assess-04",
    category: "assessment",
    prompt: "OPQRST is primarily used to evaluate:",
    choices: [
      "Pain or symptom characteristics (onset, provocation, quality, radiation, severity, time)",
      "Only scene hazards",
      "Only medication doses",
      "Only triage tag colors",
    ],
    correctIndex: 0,
    explanation:
      "OPQRST structures the history of the present illness for pain and similar complaints.",
    source: NATIONAL,
  },
  {
    id: "rq-assess-05",
    category: "assessment",
    prompt: "Unstable patients should generally be reassessed about every:",
    choices: [
      "5 minutes",
      "1 hour",
      "Once per shift",
      "Never en route",
    ],
    correctIndex: 0,
    explanation:
      "Unstable patients need frequent reassessment (commonly ~5 minutes); stable patients about every 15 minutes.",
    source: NATIONAL,
  },
  {
    id: "rq-ops-01",
    category: "operations",
    prompt: "At a highway MVC, EMT personal protective priority includes:",
    choices: [
      "High-visibility vest and traffic awareness",
      "Dark clothing and headphones",
      "Standing in live lanes without warning devices",
      "Removing all reflective gear at night",
    ],
    correctIndex: 0,
    explanation:
      "Struck-by prevention relies on visibility, positioning, and situational awareness.",
    source: NATIONAL,
  },
  {
    id: "rq-ops-02",
    category: "operations",
    prompt: "In START triage, a walking wounded patient is initially tagged:",
    choices: [
      "Minor (green)",
      "Expectant (black)",
      "Immediate (red) automatically",
      "Not tagged",
    ],
    correctIndex: 0,
    explanation:
      "Ambulatory patients are directed to a green area for delayed evaluation.",
    source: NATIONAL,
  },
  {
    id: "rq-ops-03",
    category: "operations",
    prompt: "When approaching a landed helicopter, you should:",
    choices: [
      "Approach only when signaled, typically avoiding the tail rotor area",
      "Run under the tail boom for speed",
      "Hold long objects upright in rotor wash",
      "Shine lasers at the cockpit",
    ],
    correctIndex: 0,
    explanation:
      "Follow crew direction; never approach from the rear near the tail rotor.",
    source: NATIONAL,
  },
  {
    id: "rq-ops-04",
    category: "operations",
    prompt: "A concise hospital radio report should begin with:",
    choices: [
      "Unit identification, ETA, age/sex, chief concern/priority",
      "Full Social Security number and home address",
      "Unrelated jokes",
      "Insurance negotiation",
    ],
    correctIndex: 0,
    explanation:
      "Lead with operational/clinical essentials so the hospital can prepare.",
    source: NATIONAL,
  },
  {
    id: "rq-ops-05",
    category: "operations",
    prompt: "Standard precautions mean:",
    choices: [
      "Assume every patient may transmit infection and use appropriate BSI",
      "PPE only if the patient looks unclean",
      "Gloves are never needed for blood",
      "Hand hygiene is optional",
    ],
    correctIndex: 0,
    explanation:
      "Standard precautions protect providers and patients on every contact.",
    source: NATIONAL,
  },
  {
    id: "rq-legal-01",
    category: "medical_legal",
    prompt: "Informed refusal requires that the patient:",
    choices: [
      "Has decision-making capacity and understands the risks/benefits explained",
      "Signs anything blank without discussion",
      "Is unresponsive",
      "Is a minor deciding alone for major trauma in all cases",
    ],
    correctIndex: 0,
    explanation:
      "Valid refusal needs capacity plus an explanation of risks and documentation.",
    source: NATIONAL,
  },
  {
    id: "rq-legal-02",
    category: "medical_legal",
    prompt: "Implied consent applies when:",
    choices: [
      "An unresponsive patient has an emergency and cannot consent",
      "A capacitated adult clearly refuses",
      "A neighbor demands you stop care without authority",
      "You want to skip assessment",
    ],
    correctIndex: 0,
    explanation:
      "Emergency care is provided under implied consent when the patient cannot speak for themselves.",
    source: NATIONAL,
  },
  {
    id: "rq-legal-03",
    category: "medical_legal",
    prompt: "A valid DNR/POLST should be:",
    choices: [
      "Verified as applying to this patient and executed per local/state rules before withholding CPR",
      "Replaced by a sticky note saying 'no CPR'",
      "Ignored if you already opened the jump bag",
      "Invented verbally by any bystander",
    ],
    correctIndex: 0,
    explanation:
      "Honor recognized, patient-specific orders; resuscitate if validity is uncertain per protocol.",
    source: NATIONAL,
  },
  {
    id: "rq-legal-04",
    category: "medical_legal",
    prompt: "The four classic elements of negligence include:",
    choices: [
      "Duty, breach, damages, and causation",
      "Speed, lights, sirens, and coffee",
      "Only a bad outcome with perfect care",
      "Patient dissatisfaction alone",
    ],
    correctIndex: 0,
    explanation:
      "Negligence claims typically require duty to act, breach of the standard of care, harm, and a causal link.",
    source: NATIONAL,
  },
  {
    id: "rq-legal-05",
    category: "medical_legal",
    prompt: "HIPAA in the field primarily requires EMTs to:",
    choices: [
      "Protect PHI and share it for treatment on a need-to-know basis",
      "Post patient details on social media for education",
      "Give full diagnoses to reporters",
      "Never give a clinical handoff to the ED",
    ],
    correctIndex: 0,
    explanation:
      "Protect privacy; treatment-related sharing with the care team is appropriate.",
    source: NATIONAL,
  },
];
