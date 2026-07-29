import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const medicalLegalScenarios: Scenario[] = [
  sc({
    id: "medical-legal-01",
    title: "Consent and Informed Refusal",
    category: "medical_legal",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "48 y/o with chest discomfort. Patient is alert and talking when you arrive.",
    scene:
      "Home. Spouse present. No hazards.",
    presentation:
      "Alert, oriented ×4, understands questions. Mild chest pressure. Wants to 'wait it out' and refuses transport.",
    vitals: {
      hr: 92,
      rr: 18,
      spo2: 96,
      bp: "150/88",
      gcs: "15",
    },
    startNodeId: "ml01-n1",
    nodes: [
      {
        id: "ml01-n1",
        prompt: "The patient refuses transport. What must you assess first?",
        options: [
          {
            id: "ml01-n1-best",
            text: "Decision-making capacity: oriented, understands risks/benefits/alternatives, and can explain their choice",
            quality: "best",
            next: "ml01-n2",
            feedback:
              "Correct. Valid refusal requires an adult with decision-making capacity.",
          },
          {
            id: "ml01-n1-ok",
            text: "Nothing — anyone who says no is automatically released without assessment",
            quality: "harmful",
            next: "ml01-n2",
            feedback:
              "You must assess capacity and explain risks before accepting refusal.",
            delayedCritical: true,
          },
          {
            id: "ml01-n1-bad",
            text: "Force treatment immediately without talking because chest pain always voids rights",
            quality: "harmful",
            next: "ml01-n2",
            feedback:
              "Alert capacitated adults can refuse — even if you disagree clinically.",
            delayedCritical: true,
          },
          {
            id: "ml01-n1-wrong",
            text: "Only ask the spouse; ignore the patient",
            quality: "incorrect",
            next: "ml01-n2",
            feedback:
              "The capacitated patient is the decision-maker.",
          },
        ],
      },
      {
        id: "ml01-n2",
        prompt: "Patient demonstrates capacity. Best next step for refusal?",
        options: [
          {
            id: "ml01-n2-best",
            text: "Explain risks of refusal (including death/disability), benefits of transport, offer alternatives, document thoroughly, encourage 911 if worsens",
            quality: "best",
            next: "ml01-n3",
            feedback:
              "Correct. Informed refusal includes risk discussion and clear documentation.",
          },
          {
            id: "ml01-n2-ok",
            text: "Have them sign a blank form without explanation",
            quality: "incorrect",
            next: "ml01-n3",
            feedback:
              "A signature without information is not informed refusal.",
            delayedCritical: true,
          },
          {
            id: "ml01-n2-bad",
            text: "Threaten to call police to arrest them for refusing",
            quality: "incorrect",
            next: "ml01-n3",
            feedback:
              "Do not coerce with false legal threats.",
          },
          {
            id: "ml01-n2-wrong",
            text: "Leave immediately without vitals, advice, or documentation",
            quality: "harmful",
            next: "ml01-n3",
            feedback:
              "Assess, advise, and document before clearing.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml01-n3",
        prompt: "During discussion the patient becomes newly confused and hypotensive. What changes?",
        options: [
          {
            id: "ml01-n3-best",
            text: "Capacity is now in doubt — treat under emergency/implied consent principles and transport",
            quality: "best",
            next: "ml01-n4",
            feedback:
              "Correct. Loss of capacity plus emergency condition allows emergency care.",
          },
          {
            id: "ml01-n3-ok",
            text: "Still honor the earlier refusal without reassessing",
            quality: "harmful",
            next: "ml01-n4",
            feedback:
              "Refusal is not valid if capacity is lost and an emergency exists.",
            delayedCritical: true,
          },
          {
            id: "ml01-n3-bad",
            text: "Ask an uninvolved neighbor to refuse on their behalf",
            quality: "incorrect",
            next: "ml01-n4",
            feedback:
              "Neighbors are not automatic decision-makers.",
          },
          {
            id: "ml01-n3-wrong",
            text: "Wait an hour without intervening to 'see what happens'",
            quality: "harmful",
            next: "ml01-n4",
            feedback:
              "Treat the emergency.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml01-n4",
        prompt: "Best documentation elements for refusal encounters?",
        options: [
          {
            id: "ml01-n4-best",
            text: "Capacity assessment, risks explained, patient questions, witnesses, signature/refusal form, advice to call back, vitals/findings",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Thorough documentation protects the patient record and the provider.",
          },
          {
            id: "ml01-n4-ok",
            text: "Only 'pt refused' with no details",
            quality: "incorrect",
            next: "end",
            feedback:
              "Details matter legally and clinically.",
          },
          {
            id: "ml01-n4-bad",
            text: "Alter the chart later to hide that risks were not explained",
            quality: "harmful",
            next: "end",
            feedback:
              "Never falsify records.",
            delayedCritical: true,
          },
          {
            id: "ml01-n4-wrong",
            text: "No documentation if the patient was polite",
            quality: "incorrect",
            next: "end",
            feedback:
              "Document every refusal.",
          },
        ],
      },
    ],
    correctSequence: [
      "Assess decision-making capacity",
      "Explain risks/benefits; document informed refusal",
      "If capacity lost with emergency, treat/transport",
      "Document capacity, risks, advice, and signatures",
    ],
    keyTakeaway:
      "Capacitated adults may refuse — but only after risks are explained and capacity is confirmed.",
  }),

  sc({
    id: "medical-legal-02",
    title: "Implied Consent — Unresponsive Patient",
    category: "medical_legal",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "Unknown medical, unresponsive adult in a store aisle. No family on scene.",
    scene:
      "Retail store. Staff present. AED available. Patient collapsed minutes ago.",
    presentation:
      "Unresponsive, snoring, possible weak pulse. No wallet ID located yet.",
    startNodeId: "ml02-n1",
    nodes: [
      {
        id: "ml02-n1",
        prompt: "May you treat this unresponsive adult without verbal consent?",
        options: [
          {
            id: "ml02-n1-best",
            text: "Yes — implied consent assumes a reasonable person would want emergency care when unable to consent",
            quality: "best",
            next: "ml02-n2",
            feedback:
              "Correct. Unresponsive patients are treated under implied consent.",
          },
          {
            id: "ml02-n1-ok",
            text: "No — you must wait for a signed form before opening the airway",
            quality: "harmful",
            next: "ml02-n2",
            feedback:
              "Delaying emergency care for paperwork harms the patient.",
            delayedCritical: true,
          },
          {
            id: "ml02-n1-bad",
            text: "Only if a store manager guesses what the patient would want",
            quality: "incorrect",
            next: "ml02-n2",
            feedback:
              "Implied consent does not require a manager's permission.",
          },
          {
            id: "ml02-n1-wrong",
            text: "Never treat without a relative present",
            quality: "incorrect",
            next: "ml02-n2",
            feedback:
              "Emergency care proceeds without family if needed.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml02-n2",
        prompt: "A bystander claims the patient 'hates doctors' and demands you stop. Best response?",
        options: [
          {
            id: "ml02-n2-best",
            text: "Continue emergency care; a random bystander cannot refuse for an unresponsive patient without legal authority",
            quality: "best",
            next: "ml02-n3",
            feedback:
              "Correct. Do not stop life-saving care based on unverified third-party claims.",
          },
          {
            id: "ml02-n2-ok",
            text: "Immediately stop all care and leave",
            quality: "harmful",
            next: "ml02-n3",
            feedback:
              "Abandonment risk — continue indicated emergency care.",
            delayedCritical: true,
          },
          {
            id: "ml02-n2-bad",
            text: "Ask the bystander to take the patient home in their car",
            quality: "harmful",
            next: "ml02-n3",
            feedback:
              "Unresponsive patients need EMS care and transport.",
            delayedCritical: true,
          },
          {
            id: "ml02-n2-wrong",
            text: "Argue for several minutes without managing the airway",
            quality: "incorrect",
            next: "ml02-n3",
            feedback:
              "Airway/breathing come first while you address concerns briefly.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml02-n3",
        prompt: "Patient regains consciousness and capacitatedly refuses further care. What now?",
        options: [
          {
            id: "ml02-n3-best",
            text: "Reassess capacity, explain what happened and risks of refusal, then proceed with informed consent or informed refusal process",
            quality: "best",
            next: "ml02-n4",
            feedback:
              "Correct. When capacity returns, consent rules shift back to expressed consent/refusal.",
          },
          {
            id: "ml02-n3-ok",
            text: "Forcibly restrain and treat forever because implied consent never ends",
            quality: "harmful",
            next: "ml02-n4",
            feedback:
              "Implied consent covers the emergency while incapacitated — not indefinite forced care after capacity returns.",
            delayedCritical: true,
          },
          {
            id: "ml02-n3-bad",
            text: "Ignore capacity and accept refusal from anyone nearby",
            quality: "incorrect",
            next: "ml02-n4",
            feedback:
              "Assess the patient directly.",
          },
          {
            id: "ml02-n3-wrong",
            text: "Hide that you already treated them",
            quality: "incorrect",
            next: "ml02-n4",
            feedback:
              "Be honest about care already provided.",
          },
        ],
      },
      {
        id: "ml02-n4",
        prompt: "Implied consent most clearly applies when:",
        options: [
          {
            id: "ml02-n4-best",
            text: "A patient is unresponsive or otherwise unable to consent and has an emergency condition requiring care",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Emergency + inability to consent = implied consent.",
          },
          {
            id: "ml02-n4-ok",
            text: "A capacitated adult calmly refuses and you disagree",
            quality: "incorrect",
            next: "end",
            feedback:
              "That is not implied consent — that is a refusal situation.",
          },
          {
            id: "ml02-n4-bad",
            text: "Any minor scrape with no urgency",
            quality: "incorrect",
            next: "end",
            feedback:
              "Implied consent targets emergency inability to consent.",
          },
          {
            id: "ml02-n4-wrong",
            text: "Only after hospital admission paperwork",
            quality: "incorrect",
            next: "end",
            feedback:
              "Field emergency care uses implied consent when needed.",
          },
        ],
      },
    ],
    correctSequence: [
      "Treat unresponsive emergencies under implied consent",
      "Do not stop care for unverified bystander refusals",
      "When capacity returns, use expressed consent/refusal",
      "Know when implied consent applies",
    ],
    keyTakeaway:
      "Unresponsive emergency patients are treated under implied consent until they can decide for themselves.",
  }),

  sc({
    id: "medical-legal-03",
    title: "DNR Recognition",
    category: "medical_legal",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Nursing facility, cardiac arrest. Staff says there is a DNR.",
    scene:
      "Long-term care room. Nurse present with paperwork. Patient pulseless, apneic.",
    presentation:
      "Unresponsive, no breathing, no pulse. Nurse hands you a document while CPR has not yet started.",
    startNodeId: "ml03-n1",
    nodes: [
      {
        id: "ml03-n1",
        prompt: "You are handed a paper. What should you verify before withholding resuscitation?",
        options: [
          {
            id: "ml03-n1-best",
            text: "Valid, apparent state-recognized DNR/POLST for this patient, properly executed per local rules — then follow it",
            quality: "best",
            next: "ml03-n2",
            feedback:
              "Correct. Honor valid out-of-hospital DNR/POLST orders after identity and validity checks per protocol.",
          },
          {
            id: "ml03-n1-ok",
            text: "A sticky note that says 'no CPR' with no identifiers or signatures",
            quality: "incorrect",
            next: "ml03-n2",
            feedback:
              "Informal notes are not valid DNR orders.",
            delayedCritical: true,
          },
          {
            id: "ml03-n1-bad",
            text: "A relative's verbal statement alone with no documentation when policy requires a form",
            quality: "incorrect",
            next: "ml03-n2",
            feedback:
              "Follow local requirements — usually a recognized form/bracelet/order.",
          },
          {
            id: "ml03-n1-wrong",
            text: "Any document in the room regardless of patient name",
            quality: "harmful",
            next: "ml03-n2",
            feedback:
              "Confirm it belongs to this patient.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml03-n2",
        prompt: "No valid DNR is present and the patient is in arrest. Action?",
        options: [
          {
            id: "ml03-n2-best",
            text: "Begin resuscitation per protocol while continuing to look for valid orders",
            quality: "best",
            next: "ml03-n3",
            feedback:
              "Correct. Without a valid order, provide emergency care.",
          },
          {
            id: "ml03-n2-ok",
            text: "Withhold CPR based on age alone",
            quality: "harmful",
            next: "ml03-n3",
            feedback:
              "Age is not a DNR.",
            delayedCritical: true,
          },
          {
            id: "ml03-n2-bad",
            text: "Wait 20 minutes for a fax that might arrive",
            quality: "harmful",
            next: "ml03-n3",
            feedback:
              "Do not delay resuscitation for speculative paperwork.",
            delayedCritical: true,
          },
          {
            id: "ml03-n2-wrong",
            text: "Ask bystanders to vote",
            quality: "incorrect",
            next: "ml03-n3",
            feedback:
              "Follow legal orders and protocols, not polls.",
          },
        ],
      },
      {
        id: "ml03-n3",
        prompt: "A valid DNR is confirmed mid-resuscitation. Best action?",
        options: [
          {
            id: "ml03-n3-best",
            text: "Stop resuscitation efforts per the order and provide comfort-focused care as allowed; document times and decision",
            quality: "best",
            next: "ml03-n4",
            feedback:
              "Correct. Once a valid DNR is confirmed, honor it and document.",
          },
          {
            id: "ml03-n3-ok",
            text: "Continue full ACLS indefinitely because you already started",
            quality: "incorrect",
            next: "ml03-n4",
            feedback:
              "Valid orders should be honored when recognized.",
          },
          {
            id: "ml03-n3-bad",
            text: "Hide the DNR from your partner",
            quality: "harmful",
            next: "ml03-n4",
            feedback:
              "Share valid orders with the team.",
            delayedCritical: true,
          },
          {
            id: "ml03-n3-wrong",
            text: "Destroy the document",
            quality: "harmful",
            next: "ml03-n4",
            feedback:
              "Preserve and document legal orders.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml03-n4",
        prompt: "Family arrives upset that a DNR exists. Your role?",
        options: [
          {
            id: "ml03-n4-best",
            text: "Explain compassionately that you must follow valid legal orders; involve supervisors/medical direction as needed; do not argue cruelly",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Be empathetic while complying with lawful orders and policy.",
          },
          {
            id: "ml03-n4-ok",
            text: "Ignore the DNR because family is louder",
            quality: "incorrect",
            next: "end",
            feedback:
              "Valid patient orders are not overridden by volume.",
          },
          {
            id: "ml03-n4-bad",
            text: "Mock the family's grief",
            quality: "harmful",
            next: "end",
            feedback:
              "Remain professional and compassionate.",
            delayedCritical: true,
          },
          {
            id: "ml03-n4-wrong",
            text: "Make a new DNR on a napkin for a different patient",
            quality: "harmful",
            next: "end",
            feedback:
              "Never fabricate legal orders.",
            delayedCritical: true,
          },
        ],
      },
    ],
    correctSequence: [
      "Verify valid patient-specific DNR/POLST",
      "Resuscitate if no valid order",
      "Honor a confirmed valid DNR and document",
      "Communicate compassionately with family; follow law/policy",
    ],
    keyTakeaway:
      "Honor valid DNR/POLST after identity checks — without one, resuscitate.",
  }),

  sc({
    id: "medical-legal-04",
    title: "Negligence and Duty",
    category: "medical_legal",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "Classroom-style review embedded in a call QA scenario after a delayed airway case.",
    scene:
      "Post-call review with a preceptor. You discuss what legally constitutes negligence.",
    presentation:
      "A previous crew allegedly ignored an obvious obstructed airway for a prolonged period.",
    startNodeId: "ml04-n1",
    nodes: [
      {
        id: "ml04-n1",
        prompt: "Which elements are commonly required to prove negligence?",
        options: [
          {
            id: "ml04-n1-best",
            text: "Duty to act, breach of duty, damages/harm, and causation linking breach to harm",
            quality: "best",
            next: "ml04-n2",
            feedback:
              "Correct. Negligence generally needs duty, breach, damages, and causation.",
          },
          {
            id: "ml04-n1-ok",
            text: "Only that the patient disliked the EMT's personality",
            quality: "incorrect",
            next: "ml04-n2",
            feedback:
              "Personality conflict alone is not negligence.",
          },
          {
            id: "ml04-n1-bad",
            text: "A perfect outcome is required on every call or it is negligence",
            quality: "incorrect",
            next: "ml04-n2",
            feedback:
              "Bad outcomes can occur despite appropriate care.",
          },
          {
            id: "ml04-n1-wrong",
            text: "Negligence never applies to EMS",
            quality: "incorrect",
            next: "ml04-n2",
            feedback:
              "EMS providers can be held to a standard of care.",
          },
        ],
      },
      {
        id: "ml04-n2",
        prompt: "You are on duty and dispatched. What is 'duty to act'?",
        options: [
          {
            id: "ml04-n2-best",
            text: "An obligation to respond and provide care within your scope and protocols while on duty for that service",
            quality: "best",
            next: "ml04-n3",
            feedback:
              "Correct. On-duty EMS typically has a duty to act once assigned/dispatched per agency rules.",
          },
          {
            id: "ml04-n2-ok",
            text: "A requirement to perform surgery outside your scope",
            quality: "incorrect",
            next: "ml04-n3",
            feedback:
              "Duty is within scope of practice — not beyond it.",
          },
          {
            id: "ml04-n2-bad",
            text: "Permission to abandon a patient after starting care without transfer",
            quality: "harmful",
            next: "ml04-n3",
            feedback:
              "Abandonment is a serious breach once care has begun.",
            delayedCritical: true,
          },
          {
            id: "ml04-n2-wrong",
            text: "Only a duty to drive fast with no patient care",
            quality: "incorrect",
            next: "ml04-n3",
            feedback:
              "Duty includes appropriate assessment and care.",
          },
        ],
      },
      {
        id: "ml04-n3",
        prompt: "Which is the best example of breach of duty at EMT level?",
        options: [
          {
            id: "ml04-n3-best",
            text: "Failing to open an obviously obstructed airway or provide indicated BVM support that a similarly trained EMT would provide",
            quality: "best",
            next: "ml04-n4",
            feedback:
              "Correct. Breach compares your actions to the expected standard of care.",
          },
          {
            id: "ml04-n3-ok",
            text: "Following protocol and documenting carefully",
            quality: "incorrect",
            next: "ml04-n4",
            feedback:
              "That supports meeting the standard of care.",
          },
          {
            id: "ml04-n3-bad",
            text: "Asking for ALS when the patient is critical",
            quality: "incorrect",
            next: "ml04-n4",
            feedback:
              "Requesting appropriate resources is good care.",
          },
          {
            id: "ml04-n3-wrong",
            text: "Wearing gloves for BSI",
            quality: "incorrect",
            next: "ml04-n4",
            feedback:
              "PPE is expected, not a breach.",
          },
        ],
      },
      {
        id: "ml04-n4",
        prompt: "Best practical defense against negligence claims?",
        options: [
          {
            id: "ml04-n4-best",
            text: "Practice within protocols/scope, communicate, reassess, and document accurately and contemporaneously",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Good care plus good documentation is your best protection.",
          },
          {
            id: "ml04-n4-ok",
            text: "Falsify charts to look perfect",
            quality: "harmful",
            next: "end",
            feedback:
              "Fraud makes everything worse.",
            delayedCritical: true,
          },
          {
            id: "ml04-n4-bad",
            text: "Never write anything down",
            quality: "incorrect",
            next: "end",
            feedback:
              "Absence of documentation harms continuity and legal defense.",
          },
          {
            id: "ml04-n4-wrong",
            text: "Ignore medical direction",
            quality: "incorrect",
            next: "end",
            feedback:
              "Follow lawful medical direction and protocols.",
          },
        ],
      },
    ],
    correctSequence: [
      "Know duty, breach, damages, causation",
      "On-duty response creates duty to act within scope",
      "Breach = failure to meet expected EMT standard",
      "Follow protocols and document well",
    ],
    keyTakeaway:
      "Negligence = duty + breach + harm caused by the breach — meet the standard and document it.",
  }),

  sc({
    id: "medical-legal-05",
    title: "HIPAA and Field Privacy",
    category: "medical_legal",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "You transported a local elected official with a possible overdose. Media is on scene at the hospital.",
    scene:
      "ED ambulance bay. Reporters asking questions. Your partner still has the PCR open on a screen.",
    presentation:
      "Patient already handed off. Crew is cleaning the unit. Phones are out.",
    startNodeId: "ml05-n1",
    nodes: [
      {
        id: "ml05-n1",
        prompt: "A reporter asks for the patient's name and diagnosis. Best response?",
        options: [
          {
            id: "ml05-n1-best",
            text: "Decline to share protected health information; refer media to the agency PIO/public information process",
            quality: "best",
            next: "ml05-n2",
            feedback:
              "Correct. Do not disclose PHI to the media.",
          },
          {
            id: "ml05-n1-ok",
            text: "Confirm the overdose details because the person is famous",
            quality: "harmful",
            next: "ml05-n2",
            feedback:
              "Fame does not waive privacy.",
            delayedCritical: true,
          },
          {
            id: "ml05-n1-bad",
            text: "Trade information for a quote about how skilled you are",
            quality: "harmful",
            next: "ml05-n2",
            feedback:
              "Never barter PHI.",
            delayedCritical: true,
          },
          {
            id: "ml05-n1-wrong",
            text: "Post the PCR photo on social media 'for education'",
            quality: "harmful",
            next: "ml05-n2",
            feedback:
              "Social media posts can violate HIPAA.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml05-n2",
        prompt: "When is sharing patient information generally permitted?",
        options: [
          {
            id: "ml05-n2-best",
            text: "For treatment, payment, and health-care operations — including handoff to receiving clinicians who need it for care",
            quality: "best",
            next: "ml05-n3",
            feedback:
              "Correct. PHI may be shared for treatment with the care team; minimize unnecessary disclosure.",
          },
          {
            id: "ml05-n2-ok",
            text: "With any curious coworker who is not involved in care",
            quality: "incorrect",
            next: "ml05-n3",
            feedback:
              "Need-to-know applies — idle gossip is not allowed.",
          },
          {
            id: "ml05-n2-bad",
            text: "On a podcast using full identifiers without authorization",
            quality: "harmful",
            next: "ml05-n3",
            feedback:
              "Unauthorized public disclosure is a violation.",
            delayedCritical: true,
          },
          {
            id: "ml05-n2-wrong",
            text: "Never, even to the ED physician accepting the patient",
            quality: "incorrect",
            next: "ml05-n3",
            feedback:
              "Treatment-related handoffs are appropriate.",
          },
        ],
      },
      {
        id: "ml05-n3",
        prompt: "Your partner leaves a PCR visible on a screen facing the hallway. Action?",
        options: [
          {
            id: "ml05-n3-best",
            text: "Shield/close the screen, store records securely, and remind the team about minimum necessary disclosure",
            quality: "best",
            next: "ml05-n4",
            feedback:
              "Correct. Prevent incidental exposure of PHI.",
          },
          {
            id: "ml05-n3-ok",
            text: "Increase font size so more people can read it",
            quality: "harmful",
            next: "ml05-n4",
            feedback:
              "That increases unauthorized access.",
            delayedCritical: true,
          },
          {
            id: "ml05-n3-bad",
            text: "Email the PCR to your personal account for 'later studying'",
            quality: "harmful",
            next: "ml05-n4",
            feedback:
              "Do not move PHI to unsecured personal accounts.",
            delayedCritical: true,
          },
          {
            id: "ml05-n3-wrong",
            text: "Read the chart aloud in the cafeteria for fun",
            quality: "harmful",
            next: "ml05-n4",
            feedback:
              "Public discussion of PHI is inappropriate.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ml05-n4",
        prompt: "Core HIPAA field takeaway for EMTs?",
        options: [
          {
            id: "ml05-n4-best",
            text: "Protect PHI: share for care on a need-to-know basis, secure records/devices, and avoid public/social disclosure",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Privacy is part of professional practice.",
          },
          {
            id: "ml05-n4-ok",
            text: "HIPAA means you cannot give a radio report to the hospital",
            quality: "incorrect",
            next: "end",
            feedback:
              "Treatment communications are allowed; keep them relevant.",
          },
          {
            id: "ml05-n4-bad",
            text: "Privacy rules never apply in EMS",
            quality: "incorrect",
            next: "end",
            feedback:
              "EMS handles PHI and must protect it.",
          },
          {
            id: "ml05-n4-wrong",
            text: "Only paper records matter; phones are exempt",
            quality: "incorrect",
            next: "end",
            feedback:
              "Electronic devices and photos are covered too.",
          },
        ],
      },
    ],
    correctSequence: [
      "Do not disclose PHI to media; use PIO channels",
      "Share for treatment with need-to-know clinicians",
      "Secure screens/records from public view",
      "Protect PHI in all field and online settings",
    ],
    keyTakeaway:
      "Share patient information for care on a need-to-know basis — never for gossip, media, or social media.",
  }),
];
