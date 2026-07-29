import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const assessmentScenarios: Scenario[] = [
  sc({
    id: "assessment-01",
    title: "Scene Size-Up Essentials",
    category: "assessment",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "Unknown medical emergency in an alley behind a bar. Caller hung up.",
    scene:
      "Night. Dim alley. Two bystanders arguing near a person on the ground. Broken glass. Possible smell of alcohol.",
    presentation:
      "From a distance: adult male supine, not obviously moving. Crowd tense. No PD on scene yet.",
    startNodeId: "as01-n1",
    nodes: [
      {
        id: "as01-n1",
        prompt: "You arrive first. What is your first priority?",
        options: [
          {
            id: "as01-n1-best",
            text: "Scene size-up: safety/BSI, mechanism/nature, number of patients, need for additional resources/PD, consider C-spine",
            quality: "best",
            next: "as01-n2",
            feedback:
              "Correct. Never commit to patient contact before sizing up hazards, resources, and NOI/MOI.",
          },
          {
            id: "as01-n1-ok",
            text: "Rush directly to the patient without scanning for hazards or backup needs",
            quality: "harmful",
            next: "as01-n2",
            feedback:
              "An unsafe scene can create more patients. Size-up first.",
            delayedCritical: true,
          },
          {
            id: "as01-n1-bad",
            text: "Start a detailed neurologic exam from 50 feet away without requesting help",
            quality: "incorrect",
            next: "as01-n2",
            feedback:
              "You cannot complete a proper exam from afar — secure the scene and resources first.",
          },
          {
            id: "as01-n1-wrong",
            text: "Ignore bystanders and assume the scene is safe because dispatch said 'medical'",
            quality: "incorrect",
            next: "as01-n2",
            feedback:
              "Dispatch labels can be wrong — verify safety yourself.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as01-n2",
        prompt: "Bystanders become aggressive as you approach. Best action?",
        options: [
          {
            id: "as01-n2-best",
            text: "Withdraw to a safe location, request law enforcement, stage until the scene is secure",
            quality: "best",
            next: "as01-n3",
            feedback:
              "Correct. If the scene turns unsafe, leave and wait for PD — your safety enables care.",
          },
          {
            id: "as01-n2-ok",
            text: "Physically confront the bystanders to 'take control'",
            quality: "harmful",
            next: "as01-n3",
            feedback:
              "Do not escalate violence. Stage and wait for law enforcement.",
            delayedCritical: true,
          },
          {
            id: "as01-n2-bad",
            text: "Kneel with your back to the crowd while focusing only on the patient",
            quality: "harmful",
            next: "as01-n3",
            feedback:
              "Maintain situational awareness; request help if threatened.",
            delayedCritical: true,
          },
          {
            id: "as01-n2-wrong",
            text: "Cancel the call and leave without notifying anyone",
            quality: "incorrect",
            next: "as01-n3",
            feedback:
              "Stage safely and coordinate with dispatch/PD — do not abandon coordination.",
          },
        ],
      },
      {
        id: "as01-n3",
        prompt: "PD clears the scene. Patient is unresponsive. Next size-up/decision point?",
        options: [
          {
            id: "as01-n3-best",
            text: "Confirm BSI, consider MOI (fall/assault), request ALS if needed, begin primary assessment with C-spine as indicated",
            quality: "best",
            next: "as01-n4",
            feedback:
              "Correct. Once safe, complete size-up elements and move into the primary survey.",
          },
          {
            id: "as01-n3-ok",
            text: "Skip primary assessment and start a 20-minute SAMPLE with bystanders only",
            quality: "incorrect",
            next: "as01-n4",
            feedback:
              "Unresponsive patients need ABCs first.",
            delayedCritical: true,
          },
          {
            id: "as01-n3-bad",
            text: "Assume single patient without looking for others",
            quality: "incorrect",
            next: "as01-n4",
            feedback:
              "Always estimate number of patients during size-up.",
          },
          {
            id: "as01-n3-wrong",
            text: "Remove gloves because the alley 'looks clean'",
            quality: "harmful",
            next: "as01-n4",
            feedback:
              "Maintain BSI for body fluid exposure risk.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as01-n4",
        prompt: "Which statement best reflects scene size-up?",
        options: [
          {
            id: "as01-n4-best",
            text: "It is continuous — hazards and resource needs can change throughout the call",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Size-up is not a one-time checkbox.",
          },
          {
            id: "as01-n4-ok",
            text: "It ends the moment you touch the patient",
            quality: "incorrect",
            next: "end",
            feedback:
              "Continue scanning for hazards and changing conditions.",
          },
          {
            id: "as01-n4-bad",
            text: "Only drivers perform size-up; clinicians never do",
            quality: "incorrect",
            next: "end",
            feedback:
              "Every provider shares responsibility for scene safety.",
          },
          {
            id: "as01-n4-wrong",
            text: "Size-up is optional on 'routine' calls",
            quality: "incorrect",
            next: "end",
            feedback:
              "Every call needs a size-up.",
          },
        ],
      },
    ],
    correctSequence: [
      "Perform full scene size-up before patient contact",
      "Stage if scene becomes unsafe; request PD",
      "When clear, BSI + MOI + resources + primary survey",
      "Treat size-up as continuous",
    ],
    keyTakeaway:
      "Scene size-up first and always — unsafe scenes create more patients.",
  }),

  sc({
    id: "assessment-02",
    title: "Primary Survey — ABCs",
    category: "assessment",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "55 y/o female found unresponsive at home. Family says she collapsed after standing up.",
    scene:
      "Living room. Family present. No obvious hazards. Patient on carpet.",
    presentation:
      "Unresponsive to voice. Snoring respirations. Skin pale and sweaty. Radial pulse rapid and weak.",
    vitals: {
      hr: 120,
      rr: "snoring, 8",
      spo2: 84,
      bp: "88/54",
      skin: "pale, diaphoretic",
      gcs: "3–7 (unresponsive)",
    },
    startNodeId: "as02-n1",
    nodes: [
      {
        id: "as02-n1",
        prompt: "After BSI/scene safety, what is your first primary-assessment action?",
        options: [
          {
            id: "as02-n1-best",
            text: "Open/maintain airway (consider trauma), assess breathing adequacy, support ventilation/oxygenation, then evaluate circulation",
            quality: "best",
            next: "as02-n2",
            feedback:
              "Correct. Airway and breathing threats come immediately in the primary survey.",
          },
          {
            id: "as02-n1-ok",
            text: "Obtain a full OPQRST before touching the airway",
            quality: "incorrect",
            next: "as02-n2",
            feedback:
              "Unresponsive patients cannot give OPQRST — fix ABCs first.",
            delayedCritical: true,
          },
          {
            id: "as02-n1-bad",
            text: "Check blood glucose before opening a snoring airway",
            quality: "incorrect",
            next: "as02-n2",
            feedback:
              "Airway patency precedes secondary tests.",
            delayedCritical: true,
          },
          {
            id: "as02-n1-wrong",
            text: "Assume snoring is normal sleep and walk away",
            quality: "harmful",
            next: "as02-n2",
            feedback:
              "Snoring in an unresponsive patient signals obstruction.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as02-n2",
        prompt: "Airway opens with positioning; respirations remain slow and shallow. SpO₂ 84%. Next?",
        options: [
          {
            id: "as02-n2-best",
            text: "Assist ventilations with BVM and supplemental oxygen; reassess chest rise and pulse",
            quality: "best",
            next: "as02-n3",
            feedback:
              "Correct. Inadequate breathing requires assisted ventilation, not passive observation.",
          },
          {
            id: "as02-n2-ok",
            text: "Apply a nasal cannula at minimal flow and wait 20 minutes",
            quality: "incorrect",
            next: "as02-n3",
            feedback:
              "Hypoventilation needs assisted breaths.",
            delayedCritical: true,
          },
          {
            id: "as02-n2-bad",
            text: "Insert an OPA in a patient with an intact gag without assessing",
            quality: "incorrect",
            next: "as02-n3",
            feedback:
              "OPA only if no gag; choose adjunct appropriately.",
          },
          {
            id: "as02-n2-wrong",
            text: "Focus only on getting a 12-lead before supporting breathing",
            quality: "incorrect",
            next: "as02-n3",
            feedback:
              "Breathing support outranks diagnostic extras at EMT level here.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as02-n3",
        prompt: "Circulation: pale, sweaty, BP 88/54, weak rapid radial. What does this indicate for priority?",
        options: [
          {
            id: "as02-n3-best",
            text: "Shock / unstable — treat life threats, keep warm, rapid transport, ALS intercept, frequent reassessment",
            quality: "best",
            next: "as02-n4",
            feedback:
              "Correct. Hypotension with poor perfusion is a high-priority patient.",
          },
          {
            id: "as02-n3-ok",
            text: "Stable — no rush, complete a leisurely secondary exam on scene",
            quality: "incorrect",
            next: "as02-n4",
            feedback:
              "This patient is unstable.",
            delayedCritical: true,
          },
          {
            id: "as02-n3-bad",
            text: "Give oral fluids to raise blood pressure",
            quality: "harmful",
            next: "as02-n4",
            feedback:
              "Unresponsive/hypotensive patients should not receive oral fluids.",
            delayedCritical: true,
          },
          {
            id: "as02-n3-wrong",
            text: "Ignore skin signs because BP is the only perfusion measure",
            quality: "incorrect",
            next: "as02-n4",
            feedback:
              "Skin, mentation, and pulse quality matter with BP.",
          },
        ],
      },
      {
        id: "as02-n4",
        prompt: "After ABCs are supported, how do you decide disability/exposure next?",
        options: [
          {
            id: "as02-n4-best",
            text: "Quick neurologic check (AVPU/GCS/pupils), expose to find hidden life threats, then package for transport",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Primary survey includes a rapid disability check and exposure for hidden problems.",
          },
          {
            id: "as02-n4-ok",
            text: "Skip disability because you already know they are sick",
            quality: "incorrect",
            next: "end",
            feedback:
              "A brief neuro check still guides care and handoff.",
          },
          {
            id: "as02-n4-bad",
            text: "Fully undress outdoors in freezing weather without covering",
            quality: "harmful",
            next: "end",
            feedback:
              "Expose to examine, then cover to prevent hypothermia.",
          },
          {
            id: "as02-n4-wrong",
            text: "End the primary survey before addressing inadequate breathing",
            quality: "incorrect",
            next: "end",
            feedback:
              "You cannot complete primary survey while leaving ABCs uncorrected.",
            delayedCritical: true,
          },
        ],
      },
    ],
    correctSequence: [
      "Open airway and assess breathing first",
      "Assist inadequate ventilations with O₂/BVM",
      "Recognize shock and set high transport priority",
      "Rapid disability/exposure then package",
    ],
    keyTakeaway:
      "Primary survey fixes airway, breathing, and circulation threats before detailed history.",
  }),

  sc({
    id: "assessment-03",
    title: "SAMPLE Timing",
    category: "assessment",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "40 y/o male, mild abdominal pain, sitting upright, talking clearly.",
    scene:
      "Office break room. Stable environment. One coworker present.",
    presentation:
      "Alert, conversant, mild lower abdominal discomfort for 2 hours. No respiratory distress. Skin warm/dry.",
    vitals: {
      hr: 88,
      rr: 16,
      spo2: 98,
      bp: "128/78",
      skin: "warm, dry",
      gcs: "15",
    },
    startNodeId: "as03-n1",
    nodes: [
      {
        id: "as03-n1",
        prompt: "Patient is stable after a quick primary survey. When should SAMPLE be obtained?",
        options: [
          {
            id: "as03-n1-best",
            text: "After life threats are ruled out/managed — during the history/secondary assessment on a stable patient",
            quality: "best",
            next: "as03-n2",
            feedback:
              "Correct. SAMPLE supports the secondary survey once ABCs are intact.",
          },
          {
            id: "as03-n1-ok",
            text: "Before checking whether the patient can speak or breathe",
            quality: "incorrect",
            next: "as03-n2",
            feedback:
              "Never delay primary survey for a full SAMPLE on a potentially unstable patient.",
            delayedCritical: true,
          },
          {
            id: "as03-n1-bad",
            text: "Only after hospital arrival — EMTs never take history",
            quality: "incorrect",
            next: "as03-n2",
            feedback:
              "EMTs gather SAMPLE/OPQRST when appropriate.",
          },
          {
            id: "as03-n1-wrong",
            text: "Instead of vital signs forever",
            quality: "incorrect",
            next: "as03-n2",
            feedback:
              "History complements vitals; it does not replace them.",
          },
        ],
      },
      {
        id: "as03-n2",
        prompt: "Which SAMPLE element is especially important before assisting with a patient's prescribed medication (per protocol)?",
        options: [
          {
            id: "as03-n2-best",
            text: "Medications and allergies (plus pertinent history) — know what they take and what they cannot take",
            quality: "best",
            next: "as03-n3",
            feedback:
              "Correct. M and A in SAMPLE are critical before medication assistance.",
          },
          {
            id: "as03-n2-ok",
            text: "Only their favorite food (Events unrelated)",
            quality: "incorrect",
            next: "as03-n3",
            feedback:
              "Focus on clinically relevant SAMPLE elements.",
          },
          {
            id: "as03-n2-bad",
            text: "Skip allergies because protocols never mention them",
            quality: "harmful",
            next: "as03-n3",
            feedback:
              "Allergy history prevents harmful exposures.",
            delayedCritical: true,
          },
          {
            id: "as03-n2-wrong",
            text: "Last meal only — ignore medications",
            quality: "incorrect",
            next: "as03-n3",
            feedback:
              "Last oral intake matters for some patients, but meds/allergies are essential for medication decisions.",
          },
        ],
      },
      {
        id: "as03-n3",
        prompt:
          "Mid-SAMPLE the patient becomes pale, diaphoretic, and hypotensive. What do you do with history-taking?",
        options: [
          {
            id: "as03-n3-best",
            text: "Pause detailed history, return to primary survey/interventions, and resume SAMPLE later as able",
            quality: "best",
            next: "as03-n4",
            feedback:
              "Correct. Changing condition resets priorities to ABCs and transport.",
          },
          {
            id: "as03-n3-ok",
            text: "Finish every SAMPLE letter before treating shock",
            quality: "harmful",
            next: "as03-n4",
            feedback:
              "Do not finish a checklist while the patient decompensates.",
            delayedCritical: true,
          },
          {
            id: "as03-n3-bad",
            text: "Discard all history already obtained",
            quality: "incorrect",
            next: "as03-n4",
            feedback:
              "Keep useful information; just reprioritize care.",
          },
          {
            id: "as03-n3-wrong",
            text: "Argue with the patient about inconsistent answers",
            quality: "incorrect",
            next: "as03-n4",
            feedback:
              "Treat the deterioration; clarify history later.",
          },
        ],
      },
      {
        id: "as03-n4",
        prompt: "Best description of SAMPLE?",
        options: [
          {
            id: "as03-n4-best",
            text: "Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events — a structured history tool",
            quality: "best",
            next: "end",
            feedback:
              "Correct. SAMPLE organizes essential history without replacing the primary survey.",
          },
          {
            id: "as03-n4-ok",
            text: "A trauma-only exam of the spine",
            quality: "incorrect",
            next: "end",
            feedback:
              "SAMPLE is a history mnemonic for medical and trauma patients.",
          },
          {
            id: "as03-n4-bad",
            text: "A replacement for vital signs",
            quality: "incorrect",
            next: "end",
            feedback:
              "You still need vitals and physical assessment.",
          },
          {
            id: "as03-n4-wrong",
            text: "Only for pediatric patients",
            quality: "incorrect",
            next: "end",
            feedback:
              "SAMPLE applies across age groups.",
          },
        ],
      },
    ],
    correctSequence: [
      "Obtain SAMPLE after ABCs on a stable patient",
      "Prioritize meds/allergies before assisting meds",
      "Interrupt history if the patient destabilizes",
      "Know what SAMPLE stands for",
    ],
    keyTakeaway:
      "SAMPLE belongs after life threats — and must yield if the patient becomes unstable.",
  }),

  sc({
    id: "assessment-04",
    title: "OPQRST for Chest Pain",
    category: "assessment",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "60 y/o male with chest discomfort. Conscious and breathing.",
    scene:
      "Home recliner. Wife present. No hazards.",
    presentation:
      "Alert, mild distress, clutching center of chest. Skin slightly pale. Denies trauma.",
    vitals: {
      hr: 96,
      rr: 18,
      spo2: 95,
      bp: "148/90",
      skin: "pale, cool",
      gcs: "15",
    },
    startNodeId: "as04-n1",
    nodes: [
      {
        id: "as04-n1",
        prompt: "Primary survey is intact. You begin OPQRST. What does the 'O' ask?",
        options: [
          {
            id: "as04-n1-best",
            text: "Onset — what were you doing when it started, and did it begin suddenly or gradually?",
            quality: "best",
            next: "as04-n2",
            feedback:
              "Correct. Onset clarifies timing and context of the symptom.",
          },
          {
            id: "as04-n1-ok",
            text: "Oxygen saturation only",
            quality: "incorrect",
            next: "as04-n2",
            feedback:
              "O in OPQRST is Onset, not oxygen.",
          },
          {
            id: "as04-n1-bad",
            text: "Ignore onset because chest pain is always the same",
            quality: "incorrect",
            next: "as04-n2",
            feedback:
              "Onset details help risk stratification and handoff.",
          },
          {
            id: "as04-n1-wrong",
            text: "Ask only about allergies at this step",
            quality: "incorrect",
            next: "as04-n2",
            feedback:
              "Allergies are SAMPLE; onset is OPQRST.",
          },
        ],
      },
      {
        id: "as04-n2",
        prompt: "Patient says pressure-like pain 7/10 radiating to the left arm. Which OPQRST elements did you just capture?",
        options: [
          {
            id: "as04-n2-best",
            text: "Quality (pressure), Severity (7/10), and Region/Radiation (chest to arm)",
            quality: "best",
            next: "as04-n3",
            feedback:
              "Correct. Those descriptors map to Q, S, and R.",
          },
          {
            id: "as04-n2-ok",
            text: "Only Events leading up — nothing else",
            quality: "incorrect",
            next: "as04-n3",
            feedback:
              "Events is SAMPLE; you obtained quality, severity, and radiation.",
          },
          {
            id: "as04-n2-bad",
            text: "Provocation only",
            quality: "incorrect",
            next: "as04-n3",
            feedback:
              "Provocation asks what makes it better/worse — not described here.",
          },
          {
            id: "as04-n2-wrong",
            text: "None of OPQRST applies to chest pain",
            quality: "incorrect",
            next: "as04-n3",
            feedback:
              "OPQRST is classic for pain/discomfort complaints.",
          },
        ],
      },
      {
        id: "as04-n3",
        prompt: "While finishing OPQRST, SpO₂ drops to 88% and the patient becomes diaphoretic and nauseated. Next?",
        options: [
          {
            id: "as04-n3-best",
            text: "Treat the deterioration: oxygen per protocol, position of comfort, rapid transport/ALS — finish remaining history en route",
            quality: "best",
            next: "as04-n4",
            feedback:
              "Correct. Worsening cardiopulmonary status outranks completing a mnemonic on scene.",
          },
          {
            id: "as04-n3-ok",
            text: "Refuse to treat until every OPQRST letter is perfect",
            quality: "harmful",
            next: "as04-n4",
            feedback:
              "Do not delay care for a complete interview.",
            delayedCritical: true,
          },
          {
            id: "as04-n3-bad",
            text: "Have the patient walk to the ambulance to 'test' the pain",
            quality: "harmful",
            next: "as04-n4",
            feedback:
              "Minimize exertion in suspected cardiac ischemia.",
            delayedCritical: true,
          },
          {
            id: "as04-n3-wrong",
            text: "Stop monitoring SpO₂ because OPQRST is more important",
            quality: "incorrect",
            next: "as04-n4",
            feedback:
              "Vitals and oxygenation guide priority continuously.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as04-n4",
        prompt: "What belongs in a concise handoff from your OPQRST?",
        options: [
          {
            id: "as04-n4-best",
            text: "Onset time, quality, radiation, severity, and what makes it better/worse — plus key vitals and treatments",
            quality: "best",
            next: "end",
            feedback:
              "Correct. A focused OPQRST summary improves cardiac handoffs.",
          },
          {
            id: "as04-n4-ok",
            text: "Only the patient's insurance status",
            quality: "incorrect",
            next: "end",
            feedback:
              "Clinical symptom details matter for emergency care.",
          },
          {
            id: "as04-n4-bad",
            text: "Unrelated childhood stories with no symptom details",
            quality: "incorrect",
            next: "end",
            feedback:
              "Keep the report clinically relevant.",
          },
          {
            id: "as04-n4-wrong",
            text: "Nothing — hospitals dislike OPQRST",
            quality: "incorrect",
            next: "end",
            feedback:
              "Structured symptom history is valued.",
          },
        ],
      },
    ],
    correctSequence: [
      "Use Onset correctly in OPQRST",
      "Map quality/severity/radiation to the mnemonic",
      "Interrupt history for clinical deterioration",
      "Handoff key OPQRST findings with vitals/treatments",
    ],
    keyTakeaway:
      "OPQRST structures pain history — but ABCs and oxygenation still come first if the patient worsens.",
  }),

  sc({
    id: "assessment-05",
    title: "Reassessment After Intervention",
    category: "assessment",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "22 y/o with allergic reaction after a bee sting. History of anaphylaxis; has an epinephrine auto-injector.",
    scene:
      "Park picnic area. Safe. Friend present with the patient's prescribed auto-injector.",
    presentation:
      "Anxious, hives, mild lip swelling, wheezing, speaking in full sentences initially.",
    vitals: {
      hr: 118,
      rr: 24,
      spo2: 93,
      bp: "100/70",
      skin: "flushed with urticaria",
      gcs: "15",
    },
    startNodeId: "as05-n1",
    nodes: [
      {
        id: "as05-n1",
        prompt:
          "Per protocol you assist with the prescribed epinephrine auto-injector and provide oxygen. What must you do next?",
        options: [
          {
            id: "as05-n1-best",
            text: "Reassess ABCs, mental status, work of breathing, skin findings, and vitals; note time of medication; prepare for transport/ALS",
            quality: "best",
            next: "as05-n2",
            feedback:
              "Correct. Every intervention requires reassessment of response and possible deterioration.",
          },
          {
            id: "as05-n1-ok",
            text: "Assume permanent improvement and stop monitoring",
            quality: "harmful",
            next: "as05-n2",
            feedback:
              "Anaphylaxis can rebound — continue reassessment.",
            delayedCritical: true,
          },
          {
            id: "as05-n1-bad",
            text: "Immediately give a second unrelated household medication without protocol",
            quality: "harmful",
            next: "as05-n2",
            feedback:
              "Stay within EMT scope and protocols.",
            delayedCritical: true,
          },
          {
            id: "as05-n1-wrong",
            text: "Leave the patient alone in the park for 30 minutes",
            quality: "harmful",
            next: "as05-n2",
            feedback:
              "Do not abandon a patient after epinephrine.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as05-n2",
        prompt: "Two minutes later, wheezing lessens and SpO₂ rises to 97%, but BP is now 84/50 and the patient is dizzy. Interpretation?",
        options: [
          {
            id: "as05-n2-best",
            text: "Partial respiratory improvement with ongoing shock — continue support, rapid transport, ALS, frequent reassessment",
            quality: "best",
            next: "as05-n3",
            feedback:
              "Correct. Improvement in one system does not mean the patient is stable overall.",
          },
          {
            id: "as05-n2-ok",
            text: "Fully cured — cancel ALS and recommend walking home",
            quality: "harmful",
            next: "as05-n3",
            feedback:
              "Hypotension after anaphylaxis remains an emergency.",
            delayedCritical: true,
          },
          {
            id: "as05-n2-bad",
            text: "Ignore BP because breathing sounds better",
            quality: "incorrect",
            next: "as05-n3",
            feedback:
              "Reassessment must include circulation.",
            delayedCritical: true,
          },
          {
            id: "as05-n2-wrong",
            text: "Only reassess once per hour for anaphylaxis",
            quality: "incorrect",
            next: "as05-n3",
            feedback:
              "Unstable patients need frequent reassessment (often every 5 minutes).",
          },
        ],
      },
      {
        id: "as05-n3",
        prompt: "How often should you reassess an unstable patient en route?",
        options: [
          {
            id: "as05-n3-best",
            text: "About every 5 minutes (or more often if changing), including vitals and ABCs",
            quality: "best",
            next: "as05-n4",
            feedback:
              "Correct. Unstable patients get frequent reassessment; stable patients about every 15 minutes.",
          },
          {
            id: "as05-n3-ok",
            text: "Only at the hospital door",
            quality: "incorrect",
            next: "as05-n4",
            feedback:
              "Reassess throughout transport.",
            delayedCritical: true,
          },
          {
            id: "as05-n3-bad",
            text: "Never — initial vitals are enough forever",
            quality: "incorrect",
            next: "as05-n4",
            feedback:
              "Trends matter more than a single set.",
          },
          {
            id: "as05-n3-wrong",
            text: "Every 2 hours regardless of condition",
            quality: "incorrect",
            next: "as05-n4",
            feedback:
              "That interval is far too long for EMS care.",
          },
        ],
      },
      {
        id: "as05-n4",
        prompt: "What should your reassessment documentation include?",
        options: [
          {
            id: "as05-n4-best",
            text: "Time of intervention, response (better/worse/unchanged), repeat vitals, and any new treatments",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Clear before/after comparison supports continuity of care.",
          },
          {
            id: "as05-n4-ok",
            text: "Only that 'patient fine' with no details",
            quality: "incorrect",
            next: "end",
            feedback:
              "Be specific about findings and times.",
          },
          {
            id: "as05-n4-bad",
            text: "Fabricated normal vitals to save time",
            quality: "harmful",
            next: "end",
            feedback:
              "Falsifying documentation is unethical and illegal.",
            delayedCritical: true,
          },
          {
            id: "as05-n4-wrong",
            text: "Nothing about medications given",
            quality: "incorrect",
            next: "end",
            feedback:
              "Medication time and response are essential.",
          },
        ],
      },
    ],
    correctSequence: [
      "Reassess after epinephrine/oxygen",
      "Recognize partial improvement with ongoing shock",
      "Reassess unstable patients about every 5 minutes",
      "Document times, response, and repeat vitals",
    ],
    keyTakeaway:
      "Interventions demand reassessment — one improving sign does not equal a stable patient.",
  }),

  sc({
    id: "assessment-06",
    title: "Transport Priority Decision",
    category: "assessment",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Two patients from a minor parking-lot collision. You are assigned Patient A.",
    scene:
      "Parking lot, low speed. PD on scene. Your patient is in a vehicle with airbag deployment.",
    presentation:
      "Patient A: 70 y/o, seat-belted, confused from baseline per spouse, BP 78/50, HR 112, chest wall tenderness.",
    vitals: {
      hr: 112,
      rr: 22,
      spo2: 94,
      bp: "78/50",
      skin: "pale, cool",
      gcs: "13 (confused)",
    },
    startNodeId: "as06-n1",
    nodes: [
      {
        id: "as06-n1",
        prompt: "Based on presentation, what transport priority is appropriate?",
        options: [
          {
            id: "as06-n1-best",
            text: "High priority — signs of shock and altered mentation after blunt trauma warrant rapid transport",
            quality: "best",
            next: "as06-n2",
            feedback:
              "Correct. Unstable vitals and mental status change drive priority transport.",
          },
          {
            id: "as06-n1-ok",
            text: "Low priority because the crash looked minor",
            quality: "incorrect",
            next: "as06-n2",
            feedback:
              "Mechanism can be misleading — patient condition drives priority.",
            delayedCritical: true,
          },
          {
            id: "as06-n1-bad",
            text: "No transport — advise driving home",
            quality: "harmful",
            next: "as06-n2",
            feedback:
              "Hypotensive trauma patients need emergency care.",
            delayedCritical: true,
          },
          {
            id: "as06-n1-wrong",
            text: "Priority is based only on who called 911 first",
            quality: "incorrect",
            next: "as06-n2",
            feedback:
              "Clinical status and triage principles guide priority.",
          },
        ],
      },
      {
        id: "as06-n2",
        prompt: "On-scene time is climbing while a detailed secondary exam continues. Best adjustment?",
        options: [
          {
            id: "as06-n2-best",
            text: "Limit on-scene interventions to life threats; perform detailed exam en route; notify hospital early",
            quality: "best",
            next: "as06-n3",
            feedback:
              "Correct. For unstable trauma, shorten scene time after critical interventions.",
          },
          {
            id: "as06-n2-ok",
            text: "Remain on scene until a perfect head-to-toe is finished in every detail",
            quality: "incorrect",
            next: "as06-n3",
            feedback:
              "Perfection on scene delays definitive care.",
            delayedCritical: true,
          },
          {
            id: "as06-n2-bad",
            text: "Wait for the patient's preferred hospital across town with a long delay despite instability",
            quality: "incorrect",
            next: "as06-n3",
            feedback:
              "Unstable patients go to the closest appropriate facility per protocol.",
            delayedCritical: true,
          },
          {
            id: "as06-n2-wrong",
            text: "Cancel ALS because you 'might' finish sooner alone",
            quality: "incorrect",
            next: "as06-n3",
            feedback:
              "Unstable trauma often benefits from ALS intercept when available.",
          },
        ],
      },
      {
        id: "as06-n3",
        prompt: "Spouse asks to ride along and talks continuously. How do you protect priority care?",
        options: [
          {
            id: "as06-n3-best",
            text: "Allow if policy/safety permit, set clear expectations, keep focus on ABCs and rapid transport",
            quality: "best",
            next: "as06-n4",
            feedback:
              "Correct. Family can help with history if they do not impede care.",
          },
          {
            id: "as06-n3-ok",
            text: "Stop resuscitation tasks to debate destination for 20 minutes",
            quality: "harmful",
            next: "as06-n4",
            feedback:
              "Do not delay critical transport for nonessential debate.",
            delayedCritical: true,
          },
          {
            id: "as06-n3-bad",
            text: "Refuse all history from the spouse even when the patient is confused",
            quality: "incorrect",
            next: "as06-n4",
            feedback:
              "Collateral history is valuable when the patient cannot provide it.",
          },
          {
            id: "as06-n3-wrong",
            text: "Let the spouse drive the ambulance",
            quality: "harmful",
            next: "as06-n4",
            feedback:
              "Only qualified personnel operate the ambulance.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "as06-n4",
        prompt: "Which finding would most justify downgrading urgency (if truly present)?",
        options: [
          {
            id: "as06-n4-best",
            text: "None of these in this patient — persistent hypotension and confusion keep priority high",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Do not downgrade while shock and altered mentation persist.",
          },
          {
            id: "as06-n4-ok",
            text: "Any single smile from the patient regardless of BP",
            quality: "incorrect",
            next: "end",
            feedback:
              "Affect does not override vital-sign evidence of shock.",
          },
          {
            id: "as06-n4-bad",
            text: "Insurance preference alone",
            quality: "incorrect",
            next: "end",
            feedback:
              "Clinical priority is not set by insurance.",
          },
          {
            id: "as06-n4-wrong",
            text: "A bystander saying 'they look fine'",
            quality: "incorrect",
            next: "end",
            feedback:
              "Use your assessment, not casual opinions.",
          },
        ],
      },
    ],
    correctSequence: [
      "Assign high priority for shock + altered mentation",
      "Shorten scene time; detailed exam en route",
      "Manage family without delaying care",
      "Do not downgrade while instability persists",
    ],
    keyTakeaway:
      "Transport priority follows patient condition — unstable vitals mean load-and-go after life threats.",
  }),
];
