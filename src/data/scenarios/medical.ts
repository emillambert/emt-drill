import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const medicalScenarios: Scenario[] = [
  sc({
    id: "medical-01",
    title: "Hypoglycemia \u2014 Altered Diabetic",
    category: "medical",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "29 y/o diabetic, acting confused at work. Coworkers say he skipped lunch after insulin.",
    scene:
      "Office break room. Patient seated, sweaty, confused. No trauma. Manager present.",
    presentation:
      "Diaphoretic, tachycardic, confused to place/time but can swallow with coaching. Speaks slurred words. Medic alert bracelet: insulin-dependent diabetes.",
    vitals: { hr: 118, rr: 20, spo2: 98, bp: "122/78", skin: "cool, diaphoretic", gcs: "13", glucose: "42" },
    startNodeId: "m01-n1",
    nodes: [
      {
        id: "m01-n1",
        prompt: "After ABCs, what confirms your suspicion and guides treatment?",
        options: [
          {
            id: "m01-n1-best",
            text: "Check blood glucose promptly in any altered diabetic/unknown AMS",
            quality: "best",
            next: "m01-n2",
            feedback:
              "Correct. Glucose is a rapid, actionable field test.",
          },
          {
            id: "m01-n1-wrong",
            text: "Skip glucose and assume stroke only",
            quality: "incorrect",
            next: "m01-n2",
            feedback:
              "Hypoglycemia mimics stroke\u2014check sugar.",
            delayedCritical: true,
          },
          {
            id: "m01-n1-bad",
            text: "Give an invented IV dextrose concentration as an EMT without protocol/authorization",
            quality: "harmful",
            next: "m01-n2",
            feedback:
              "Stay within EMT scope and never invent doses.",
          },
          {
            id: "m01-n1-acc",
            text: "SAMPLE plus immediate glucose reading",
            quality: "acceptable",
            next: "m01-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m01-n2",
        prompt: "Glucose is 42; patient can protect airway and follow commands to swallow. Best treatment path?",
        options: [
          {
            id: "m01-n2-best",
            text: "Give oral glucose per protocol if able to swallow/protect airway; reassess mental status and glucose",
            quality: "best",
            next: "m01-n3",
            feedback:
              "Correct. Oral glucose is appropriate when the airway is protected.",
          },
          {
            id: "m01-n2-bad",
            text: "Force oral gel into an unresponsive patient's mouth",
            quality: "harmful",
            next: "m01-n3",
            feedback:
              "Aspiration risk\u2014unresponsive patients need ALS route options, not oral sugar.",
          },
          {
            id: "m01-n2-wrong",
            text: "Withhold sugar because 'he needs to learn a lesson'",
            quality: "incorrect",
            next: "m01-n3",
            feedback:
              "Treat hypoglycemia now.",
            delayedCritical: true,
          },
          {
            id: "m01-n2-acc",
            text: "Oral glucose per protocol and request ALS if no improvement",
            quality: "acceptable",
            next: "m01-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m01-n3",
        prompt: "After oral glucose he improves to GCS 15. He wants to refuse transport. Consideration?",
        vitals: { hr: 90, rr: 16, spo2: 98, bp: "124/80", gcs: "15", glucose: "96" },
        options: [
          {
            id: "m01-n3-best",
            text: "Reassess, explain recurrence risk, follow protocol/medical control for diabetic refusal criteria, document thoroughly",
            quality: "best",
            next: "m01-n4",
            feedback:
              "Correct. Improvement does not automatically equal safe refusal\u2014follow local rules.",
          },
          {
            id: "m01-n3-bad",
            text: "Leave without documenting because he looks fine",
            quality: "harmful",
            next: "m01-n4",
            feedback:
              "Documentation and counseling are required.",
          },
          {
            id: "m01-n3-wrong",
            text: "Force another full tube of glucose against his will after full recovery without indication",
            quality: "incorrect",
            next: "m01-n4",
            feedback:
              "Treat based on need and protocol; respect capacity once recovered.",
          },
          {
            id: "m01-n3-acc",
            text: "Encourage ED eval especially if on insulin with unclear cause",
            quality: "acceptable",
            next: "m01-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m01-n4",
        prompt: "If instead he had been unresponsive with glucose 42, EMT priority would be?",
        options: [
          {
            id: "m01-n4-best",
            text: "Airway protection and ALS for parenteral sugar/glucagon per protocol\u2014do not give oral glucose",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Unresponsive hypoglycemics need airway first and advanced glucose routes.",
          },
          {
            id: "m01-n4-bad",
            text: "Pour syrup into the unresponsive airway",
            quality: "harmful",
            next: "end",
            feedback:
              "Aspiration hazard.",
          },
          {
            id: "m01-n4-wrong",
            text: "Wait without airway support",
            quality: "incorrect",
            next: "end",
            feedback:
              "Protect ABCs.",
            delayedCritical: true,
          },
          {
            id: "m01-n4-acc",
            text: "Manage airway, request ALS, transport rapidly",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Check glucose in AMS",
      "Oral glucose only if able to swallow/protect airway",
      "Counsel/document after improvement per protocol",
      "Unresponsive: airway + ALS parenteral options\u2014not oral sugar",
    ],
    keyTakeaway:
      "Hypoglycemia: confirm with glucose, use oral sugar only when the airway is safe, and escalate when the patient cannot swallow.",
  }),
  sc({
    id: "medical-02",
    title: "Stroke \u2014 FAST Recognition",
    category: "medical",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "72 y/o female, sudden right-sided weakness and slurred speech. Last known well 45 minutes ago.",
    scene:
      "Kitchen at home. Husband present. Patient seated in chair. No fall trauma noted.",
    presentation:
      "Facial droop left, arm drift right, speech slurred. Alert, anxious. Denies headache currently. Blood glucose pending.",
    vitals: { hr: 88, rr: 16, spo2: 97, bp: "178/96", skin: "warm, dry", gcs: "15", glucose: "118" },
    startNodeId: "m02-n1",
    nodes: [
      {
        id: "m02-n1",
        prompt: "Best immediate assessment tool?",
        options: [
          {
            id: "m02-n1-best",
            text: "Perform a stroke scale (FAST/CPSS), note last known well, check glucose, support ABCs",
            quality: "best",
            next: "m02-n2",
            feedback:
              "Correct. Time last known well and glucose are critical.",
          },
          {
            id: "m02-n1-wrong",
            text: "Wait an hour on scene to see if symptoms resolve",
            quality: "incorrect",
            next: "m02-n2",
            feedback:
              "Stroke is time-sensitive.",
            delayedCritical: true,
          },
          {
            id: "m02-n1-bad",
            text: "Give aspirin on your own invented indication for every facial droop without protocol",
            quality: "harmful",
            next: "m02-n2",
            feedback:
              "Do not invent stroke medication plans\u2014follow protocol; many strokes are hemorrhagic.",
          },
          {
            id: "m02-n1-acc",
            text: "FAST exam plus glucose and rapid transport planning",
            quality: "acceptable",
            next: "m02-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m02-n2",
        prompt: "Glucose is normal. Transport destination concept?",
        options: [
          {
            id: "m02-n2-best",
            text: "Rapid transport to an appropriate stroke-capable facility per local plan; early notification with last known well",
            quality: "best",
            next: "m02-n3",
            feedback:
              "Correct. Notify with timeline so the stroke team can activate.",
          },
          {
            id: "m02-n2-wrong",
            text: "Take the farthest hospital because traffic looks interesting",
            quality: "incorrect",
            next: "m02-n3",
            feedback:
              "Follow stroke destination protocols.",
          },
          {
            id: "m02-n2-bad",
            text: "Encourage her to sleep until tomorrow's clinic",
            quality: "harmful",
            next: "m02-n3",
            feedback:
              "Delays reperfusion windows.",
          },
          {
            id: "m02-n2-acc",
            text: "Priority move with stroke alert radio report",
            quality: "acceptable",
            next: "m02-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m02-n3",
        prompt: "She begins to vomit and becomes drowsier. Priority?",
        vitals: { hr: 92, rr: 14, spo2: 94, bp: "190/100", gcs: "12" },
        options: [
          {
            id: "m02-n3-best",
            text: "Protect airway (position/suction), assist ventilations if needed, continue rapid transport",
            quality: "best",
            next: "m02-n4",
            feedback:
              "Correct. Airway threats trump further neurologic testing.",
          },
          {
            id: "m02-n3-wrong",
            text: "Keep her fully supine without suction readiness while you re-do FAST three times",
            quality: "incorrect",
            next: "m02-n4",
            feedback:
              "Airway first.",
            delayedCritical: true,
          },
          {
            id: "m02-n3-bad",
            text: "Force oral contrast drink for 'better scans later'",
            quality: "harmful",
            next: "m02-n4",
            feedback:
              "NPO\u2014aspiration risk.",
          },
          {
            id: "m02-n3-acc",
            text: "Suction ready at the head, lateral if needed, high priority",
            quality: "acceptable",
            next: "m02-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m02-n4",
        prompt: "Key radio report elements?",
        options: [
          {
            id: "m02-n4-best",
            text: "Age, last known well time, stroke scale findings, glucose, deficits, ETA",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Time and deficits drive ED activation.",
          },
          {
            id: "m02-n4-wrong",
            text: "Only say 'sick elderly' without times",
            quality: "incorrect",
            next: "end",
            feedback:
              "Last known well is essential.",
          },
          {
            id: "m02-n4-bad",
            text: "Invent a medication dose you already gave",
            quality: "harmful",
            next: "end",
            feedback:
              "Never fabricate care.",
          },
          {
            id: "m02-n4-acc",
            text: "Stroke alert with LKW and FAST positives",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "FAST + glucose + last known well",
      "Stroke-capable destination with early notify",
      "Airway protection if vomiting/drowsiness",
      "Report LKW, findings, glucose, ETA",
    ],
    keyTakeaway:
      "Stroke care is recognition, glucose check, and rapid transport with a precise last-known-well time.",
  }),
  sc({
    id: "medical-03",
    title: "Anaphylaxis",
    category: "medical",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "22 y/o, allergic reaction after bee sting at park. Difficulty breathing and swelling.",
    scene:
      "Picnic area. Safe. Friend holding an epinephrine auto-injector prescribed to the patient.",
    presentation:
      "Urticaria, lip/tongue swelling, wheezing, anxious. Speaks in short phrases. Known bee allergy.",
    vitals: { hr: 130, rr: 28, spo2: 91, bp: "88/58", skin: "flushed with hives", gcs: "15" },
    startNodeId: "m03-n1",
    nodes: [
      {
        id: "m03-n1",
        prompt: "This presentation indicates?",
        options: [
          {
            id: "m03-n1-best",
            text: "Anaphylaxis: multi-system involvement with respiratory and/or perfusion compromise\u2014treat immediately",
            quality: "best",
            next: "m03-n2",
            feedback:
              "Correct. Hypotension + airway/breathing signs after allergen = anaphylaxis.",
          },
          {
            id: "m03-n1-wrong",
            text: "Simple localized sting\u2014observe for hours on a bench",
            quality: "incorrect",
            next: "m03-n2",
            feedback:
              "Systemic signs require emergency treatment.",
            delayedCritical: true,
          },
          {
            id: "m03-n1-bad",
            text: "Have her run laps to 'work out the venom'",
            quality: "harmful",
            next: "m03-n2",
            feedback:
              "Worsens shock and swelling.",
          },
          {
            id: "m03-n1-acc",
            text: "Recognize anaphylaxis and prepare epinephrine assist per protocol",
            quality: "acceptable",
            next: "m03-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m03-n2",
        prompt: "Friend offers her prescribed epinephrine auto-injector. Correct EMT action?",
        options: [
          {
            id: "m03-n2-best",
            text: "Confirm it is prescribed to her and assist administration per protocol; support airway/oxygen; no invented doses",
            quality: "best",
            next: "m03-n3",
            feedback:
              "Correct. Auto-injector assist is protocol-driven\u2014never invent a dose.",
          },
          {
            id: "m03-n2-bad",
            text: "Draw up an invented epinephrine concentration from a vial without authority",
            quality: "harmful",
            next: "m03-n3",
            feedback:
              "Outside typical EMT practice and dose invention is forbidden here.",
          },
          {
            id: "m03-n2-wrong",
            text: "Withhold epinephrine despite anaphylaxis to 'wait and see'",
            quality: "incorrect",
            next: "m03-n3",
            feedback:
              "Delay risks airway obstruction and arrest.",
            delayedCritical: true,
          },
          {
            id: "m03-n2-acc",
            text: "Assist auto-injector per protocol while applying oxygen",
            quality: "acceptable",
            next: "m03-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m03-n3",
        prompt: "After epinephrine assist, wheezing persists and BP is still low. Next?",
        vitals: { hr: 140, rr: 30, spo2: 90, bp: "84/50" },
        options: [
          {
            id: "m03-n3-best",
            text: "Maintain oxygen/positioning, rapid transport, ALS intercept; further dosing only per protocol",
            quality: "best",
            next: "m03-n4",
            feedback:
              "Correct. Ongoing support and advanced care\u2014do not freelance dosing.",
          },
          {
            id: "m03-n3-bad",
            text: "Give repeated unknown quantities of epinephrine by feel",
            quality: "harmful",
            next: "m03-n4",
            feedback:
              "No invented dosing.",
          },
          {
            id: "m03-n3-wrong",
            text: "Remove oxygen because she received a medication",
            quality: "incorrect",
            next: "m03-n4",
            feedback:
              "Hypoxia still needs oxygen.",
          },
          {
            id: "m03-n3-acc",
            text: "Airway readiness and priority transport",
            quality: "acceptable",
            next: "m03-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m03-n4",
        prompt: "Tongue swelling worsens; stridor appears. Priority?",
        sceneUpdate: "Inspiratory stridor now audible.",
        options: [
          {
            id: "m03-n4-best",
            text: "Airway crisis: high-flow oxygen, prepare to assist ventilations if needed, do not delay transport/ALS",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Impending obstruction needs airway support and definitive care.",
          },
          {
            id: "m03-n4-wrong",
            text: "Oral exam with repeated tongue depressor probing for fun",
            quality: "harmful",
            next: "end",
            feedback:
              "Can worsen obstruction.",
          },
          {
            id: "m03-n4-bad",
            text: "Lay flat without airway plan while swelling progresses",
            quality: "harmful",
            next: "end",
            feedback:
              "Position of comfort/airway watch; prepare to act.",
          },
          {
            id: "m03-n4-acc",
            text: "Minimize scene time; continuous airway reassessment",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Recognize anaphylaxis",
      "Assist prescribed epinephrine auto-injector per protocol",
      "Continue support; no freelance dosing",
      "Treat evolving airway threat urgently",
    ],
    keyTakeaway:
      "Anaphylaxis needs early epinephrine assist per protocol plus oxygen\u2014airway swelling can progress rapidly.",
  }),
  sc({
    id: "medical-04",
    title: "Seizure \u2014 Postictal Care",
    category: "medical",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Active seizure reported in grocery aisle. Now possibly postictal.",
    scene:
      "Grocery store. Crowd held back. Patient on floor, no major trauma apparent. Family says epilepsy history.",
    presentation:
      "On arrival: generalized tonic-clonic ending. Then snoring, unresponsive, incontinent. Bloody saliva from bitten tongue.",
    vitals: { hr: 120, rr: 24, spo2: 90, bp: "150/90", skin: "cyanotic then improving", gcs: "6", glucose: "pending" },
    startNodeId: "m04-n1",
    nodes: [
      {
        id: "m04-n1",
        prompt: "During the final seconds of seizing, your priority is?",
        options: [
          {
            id: "m04-n1-best",
            text: "Protect from injury, do not restrain forcefully, do not put objects in the mouth, prepare suction/oxygen",
            quality: "best",
            next: "m04-n2",
            feedback:
              "Correct. Protect and prepare\u2014never pry the mouth open with hard objects.",
          },
          {
            id: "m04-n1-bad",
            text: "Force a spoon between the teeth",
            quality: "harmful",
            next: "m04-n2",
            feedback:
              "Causes dental trauma and aspiration risk.",
          },
          {
            id: "m04-n1-wrong",
            text: "Pile people on the patient to stop movement",
            quality: "harmful",
            next: "m04-n2",
            feedback:
              "Injury risk.",
          },
          {
            id: "m04-n1-acc",
            text: "Clear hazards and time the seizure",
            quality: "acceptable",
            next: "m04-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m04-n2",
        prompt: "Postictal with snoring and SpO\u2082 90%. Best airway step?",
        options: [
          {
            id: "m04-n2-best",
            text: "Recovery position if no trauma contraindication, suction as needed, oxygen, consider NPA if indicated",
            quality: "best",
            next: "m04-n3",
            feedback:
              "Correct. Postictal airways often need positioning and oxygen.",
          },
          {
            id: "m04-n2-wrong",
            text: "Leave supine without airway support",
            quality: "incorrect",
            next: "m04-n3",
            feedback:
              "Snoring needs intervention.",
            delayedCritical: true,
          },
          {
            id: "m04-n2-bad",
            text: "Oral water to 'wake them up'",
            quality: "harmful",
            next: "m04-n3",
            feedback:
              "Aspiration.",
          },
          {
            id: "m04-n2-acc",
            text: "Open airway, oxygen, suction readiness",
            quality: "acceptable",
            next: "m04-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m04-n3",
        prompt: "Glucose is 70. Family asks if she can refuse once she wakes a little. Approach?",
        vitals: { hr: 100, rr: 16, spo2: 96, bp: "140/88", gcs: "12", glucose: "70" },
        options: [
          {
            id: "m04-n3-best",
            text: "Continue reassessment; capacity may be impaired postictally\u2014encourage transport; follow refusal protocols carefully",
            quality: "best",
            next: "m04-n4",
            feedback:
              "Correct. Postictal patients often lack full capacity initially.",
          },
          {
            id: "m04-n3-bad",
            text: "Accept a mumbled refusal without assessing capacity",
            quality: "harmful",
            next: "m04-n4",
            feedback:
              "Must assess capacity.",
          },
          {
            id: "m04-n3-wrong",
            text: "Invent a sedative dose to keep her quiet",
            quality: "harmful",
            next: "m04-n4",
            feedback:
              "No invented meds.",
          },
          {
            id: "m04-n3-acc",
            text: "Reassess mental status frequently and transport if first/prolonged/atypical seizure",
            quality: "acceptable",
            next: "m04-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m04-n4",
        prompt: "She has a second seizure lasting >5 minutes without regaining consciousness. Priority?",
        options: [
          {
            id: "m04-n4-best",
            text: "Treat as status epilepticus emergency: protect airway, oxygen/BVM as needed, rapid ALS/ED",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Prolonged/recurrent seizures without recovery need ALS.",
          },
          {
            id: "m04-n4-wrong",
            text: "Wait another 20 minutes on scene without support",
            quality: "incorrect",
            next: "end",
            feedback:
              "Status is time-critical.",
            delayedCritical: true,
          },
          {
            id: "m04-n4-bad",
            text: "Hold breath with the patient 'in solidarity'",
            quality: "harmful",
            next: "end",
            feedback:
              "Not care.",
          },
          {
            id: "m04-n4-acc",
            text: "Airway support and ALS for anticonvulsant therapy per their scope",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Protect during seizure\u2014nothing in the mouth",
      "Postictal: position, suction, oxygen",
      "Capacity may be impaired\u2014encourage transport",
      "Status/recurrent: airway + ALS urgently",
    ],
    keyTakeaway:
      "Seizure care is protect, then open the postictal airway\u2014prolonged seizures need ALS without delay.",
  }),
  sc({
    id: "medical-05",
    title: "Opioid Overdose \u2014 Medical Focus",
    category: "medical",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Suspected opioid overdose, unresponsive in car. Breathing slow.",
    scene:
      "Parked car, engine off. PD on scene, scene safe. Empty pill bottles and powder residue noted.",
    presentation:
      "Pinpoint pupils, cyanosis, RR 5, pulse present. Unresponsive to pain initially.",
    vitals: { hr: 48, rr: 5, spo2: 76, bp: "100/62", skin: "cyanotic", gcs: "3", glucose: "108" },
    startNodeId: "m05-n1",
    nodes: [
      {
        id: "m05-n1",
        prompt: "Priority order?",
        options: [
          {
            id: "m05-n1-best",
            text: "Airway opening and BVM ventilations with oxygen first; naloxone per protocol as adjunct",
            quality: "best",
            next: "m05-n2",
            feedback:
              "Correct. Same principle as airway scenarios\u2014breathe for the patient.",
          },
          {
            id: "m05-n1-wrong",
            text: "Only take photos of the pills before any care",
            quality: "incorrect",
            next: "m05-n2",
            feedback:
              "Treat life threats first.",
            delayedCritical: true,
          },
          {
            id: "m05-n1-bad",
            text: "Withhold ventilations until naloxone arrives from across town",
            quality: "harmful",
            next: "m05-n2",
            feedback:
              "Ventilate now.",
          },
          {
            id: "m05-n1-acc",
            text: "BVM now; naloxone per protocol when available",
            quality: "acceptable",
            next: "m05-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m05-n2",
        prompt: "Naloxone is given per protocol. Patient wakes combative. Safety?",
        sceneUpdate: "Patient thrashing, SpO\u2082 rising with oxygen.",
        options: [
          {
            id: "m05-n2-best",
            text: "Ensure crew safety, reassess ABCs, de-escalate verbally, expect possible renarcotization",
            quality: "best",
            next: "m05-n3",
            feedback:
              "Correct. Agitation can follow reversal\u2014stay safe and keep assessing.",
          },
          {
            id: "m05-n2-bad",
            text: "Immediately tackle and choke the patient",
            quality: "harmful",
            next: "m05-n3",
            feedback:
              "Unnecessary force.",
          },
          {
            id: "m05-n2-wrong",
            text: "Walk away leaving an unprotected airway patient alone in the car",
            quality: "incorrect",
            next: "m05-n3",
            feedback:
              "Continue care/monitoring.",
          },
          {
            id: "m05-n2-acc",
            text: "Calm approach, space, ongoing vitals",
            quality: "acceptable",
            next: "m05-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m05-n3",
        prompt: "He refuses hospital. Capacity assessment essentials?",
        vitals: { hr: 90, rr: 14, spo2: 97, bp: "118/76", gcs: "15" },
        options: [
          {
            id: "m05-n3-best",
            text: "Assess orientation/understanding of risks including recurrent apnea; follow refusal protocol; do not abandon unsafe process",
            quality: "best",
            next: "m05-n4",
            feedback:
              "Correct. Informed refusal after OD is high-risk\u2014do it carefully.",
          },
          {
            id: "m05-n3-bad",
            text: "Forge documents stating he was never unresponsive",
            quality: "harmful",
            next: "m05-n4",
            feedback:
              "Falsification is unethical/illegal.",
          },
          {
            id: "m05-n3-wrong",
            text: "Ignore hypoxia recurrence risk in counseling",
            quality: "incorrect",
            next: "m05-n4",
            feedback:
              "Must explain renarcotization.",
          },
          {
            id: "m05-n3-acc",
            text: "Encourage transport; document mental status and warnings",
            quality: "acceptable",
            next: "m05-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m05-n4",
        prompt: "While signing refusal paperwork he becomes unresponsive again. Action?",
        options: [
          {
            id: "m05-n4-best",
            text: "Return to airway/BVM support and protocol naloxone/ALS; refusal is moot if capacity lost",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Lost capacity + hypoventilation = treat.",
          },
          {
            id: "m05-n4-wrong",
            text: "Continue the refusal form while he is apneic",
            quality: "harmful",
            next: "end",
            feedback:
              "Treat first.",
            delayedCritical: true,
          },
          {
            id: "m05-n4-bad",
            text: "Assume faking without checking breathing",
            quality: "harmful",
            next: "end",
            feedback:
              "Verify ABCs.",
          },
          {
            id: "m05-n4-acc",
            text: "Airway, ventilate, reassess",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Ventilate first; naloxone as adjunct",
      "Manage post-reversal agitation safely",
      "High-risk refusal counseling with capacity checks",
      "If unresponsive again: restart airway care",
    ],
    keyTakeaway:
      "Opioid OD care is ventilation-first; naloxone helps but patients can crash again\u2014capacity and ABCs rule refusals.",
  }),
  sc({
    id: "medical-06",
    title: "DKA Recognition",
    category: "medical",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "17 y/o, weakness, vomiting, rapid breathing. Mother says new excessive thirst for a week.",
    scene:
      "Bedroom at home. Patient on bed. Sweet/fruity odor noted. No trauma.",
    presentation:
      "Ill-appearing, dry mucous membranes, Kussmaul respirations, abdominal pain, altered but arousable. Polyuria/polydipsia history.",
    vitals: { hr: 128, rr: 32, spo2: 98, bp: "100/70", skin: "dry, warm", temp: "99.0°F", gcs: "14", glucose: "HIGH / >500" },
    startNodeId: "m06-n1",
    nodes: [
      {
        id: "m06-n1",
        prompt: "Pattern recognition points to?",
        options: [
          {
            id: "m06-n1-best",
            text: "Suspected DKA/hyperglycemic emergency: dehydration + Kussmaul breathing + very high glucose",
            quality: "best",
            next: "m06-n2",
            feedback:
              "Correct. EMT recognition drives urgent transport\u2014not field insulin dosing.",
          },
          {
            id: "m06-n1-wrong",
            text: "Simple anxiety hyperventilation only\u2014no further care",
            quality: "incorrect",
            next: "m06-n2",
            feedback:
              "High glucose and dehydration say otherwise.",
          },
          {
            id: "m06-n1-bad",
            text: "Give insulin from the mother's vial using an invented dose",
            quality: "harmful",
            next: "m06-n2",
            feedback:
              "EMTs do not invent insulin doses.",
          },
          {
            id: "m06-n1-acc",
            text: "Flag hyperglycemic crisis and prepare ALS/ED transport",
            quality: "acceptable",
            next: "m06-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m06-n2",
        prompt: "Best EMT supportive care?",
        options: [
          {
            id: "m06-n2-best",
            text: "ABCs, oxygen if needed, keep NPO if vomiting/altered, ALS for fluids per protocol, rapid transport",
            quality: "best",
            next: "m06-n3",
            feedback:
              "Correct. Support and move\u2014definitive care is hospital/ALS.",
          },
          {
            id: "m06-n2-bad",
            text: "Force large amounts of sugary soda because glucose is already high 'to balance ketones'",
            quality: "harmful",
            next: "m06-n3",
            feedback:
              "Do not add oral sugar in DKA suspicion.",
          },
          {
            id: "m06-n2-wrong",
            text: "Withhold transport to try home remedies for hours",
            quality: "incorrect",
            next: "m06-n3",
            feedback:
              "This is an emergency.",
            delayedCritical: true,
          },
          {
            id: "m06-n2-acc",
            text: "Monitor ABCs and expedite care",
            quality: "acceptable",
            next: "m06-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m06-n3",
        prompt: "He becomes more lethargic with continued deep rapid breaths. Concern?",
        vitals: { hr: 136, rr: 36, spo2: 97, bp: "92/60", gcs: "12" },
        options: [
          {
            id: "m06-n3-best",
            text: "Worsening metabolic emergency\u2014protect airway, assist ventilations if inadequate, do not delay",
            quality: "best",
            next: "m06-n4",
            feedback:
              "Correct. Fatigue after Kussmaul can signal decompensation.",
          },
          {
            id: "m06-n3-wrong",
            text: "Coach him to hold his breath to normalize CO\u2082",
            quality: "harmful",
            next: "m06-n4",
            feedback:
              "Kussmaul is compensatory\u2014do not suppress it casually.",
          },
          {
            id: "m06-n3-bad",
            text: "Give an invented bicarbonate dose",
            quality: "harmful",
            next: "m06-n4",
            feedback:
              "No invented meds.",
          },
          {
            id: "m06-n3-acc",
            text: "Airway watch and priority transport",
            quality: "acceptable",
            next: "m06-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m06-n4",
        prompt: "Handoff emphasis?",
        options: [
          {
            id: "m06-n4-best",
            text: "Report suspected DKA signs, glucose reading, respiratory pattern, mental status trend, and fluids if given by ALS",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Clear suspicion speeds ED labs/treatment.",
          },
          {
            id: "m06-n4-wrong",
            text: "Say only 'teen with stomachache'",
            quality: "incorrect",
            next: "end",
            feedback:
              "Misses critical context.",
          },
          {
            id: "m06-n4-bad",
            text: "Claim you gave insulin when you did not",
            quality: "harmful",
            next: "end",
            feedback:
              "Never falsify.",
          },
          {
            id: "m06-n4-acc",
            text: "Hyperglycemia with Kussmaul and dehydration summary",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Recognize DKA pattern (high glucose, Kussmaul, dehydration)",
      "Supportive care\u2014no invented insulin",
      "Watch for airway/ventilatory failure as fatigue grows",
      "Clear suspected-DKA handoff",
    ],
    keyTakeaway:
      "DKA is a recognition-and-transport emergency for EMTs\u2014support ABCs and never invent insulin doses.",
  }),
  sc({
    id: "medical-07",
    title: "Behavioral Emergency \u2014 Safety First",
    category: "medical",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Agitated adult yelling in apartment hallway. Possible psychiatric history. PD requested.",
    scene:
      "Apartment hallway. PD on scene stating scene is secure but patient pacing. Exits clear behind you.",
    presentation:
      "Agitated, speaking rapidly about being followed, not currently violent. Refuses to sit. Denies SI clearly but is paranoid. Skin warm; pupils normal.",
    vitals: { hr: 110, rr: 22, spo2: 98, bp: "142/88", skin: "warm, dry", gcs: "15", glucose: "102" },
    startNodeId: "m07-n1",
    nodes: [
      {
        id: "m07-n1",
        prompt: "First priority?",
        options: [
          {
            id: "m07-n1-best",
            text: "Maintain scene safety and escape routes; approach calmly with PD; look for medical causes of AMS",
            quality: "best",
            next: "m07-n2",
            feedback:
              "Correct. Behavioral calls still need safety and medical differentials.",
          },
          {
            id: "m07-n1-bad",
            text: "Corner the patient alone without PD to 'show dominance'",
            quality: "harmful",
            next: "m07-n2",
            feedback:
              "Unsafe.",
          },
          {
            id: "m07-n1-wrong",
            text: "Ignore safety and rush hands-on restraint immediately",
            quality: "harmful",
            next: "m07-n2",
            feedback:
              "Escalate only when needed with adequate resources.",
          },
          {
            id: "m07-n1-acc",
            text: "Calm verbal engagement from a safe distance",
            quality: "acceptable",
            next: "m07-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m07-n2",
        prompt: "Which medical checks matter before labeling 'psych only'?",
        options: [
          {
            id: "m07-n2-best",
            text: "Glucose, hypoxia, overdose/trauma signs, stroke/seizure clues, fever when feasible",
            quality: "best",
            next: "m07-n3",
            feedback:
              "Correct. Many 'psych' presentations are medical.",
          },
          {
            id: "m07-n2-wrong",
            text: "No vitals ever on behavioral patients",
            quality: "incorrect",
            next: "m07-n3",
            feedback:
              "Assess as safety allows.",
          },
          {
            id: "m07-n2-bad",
            text: "Inject an invented sedative dose without protocol",
            quality: "harmful",
            next: "m07-n3",
            feedback:
              "No invented meds.",
          },
          {
            id: "m07-n2-acc",
            text: "Attempt SpO\u2082, glucose, and focused history if safe",
            quality: "acceptable",
            next: "m07-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m07-n3",
        prompt: "He agrees to sit; still agitated but not assaultive. Transport approach?",
        options: [
          {
            id: "m07-n3-best",
            text: "Voluntary transport if possible; explain process; use least restrictive measures; restrain only per protocol with enough personnel if danger appears",
            quality: "best",
            next: "m07-n4",
            feedback:
              "Correct. Least restrictive + safety.",
          },
          {
            id: "m07-n3-bad",
            text: "Hog-tie prone with weight on the back for convenience",
            quality: "harmful",
            next: "m07-n4",
            feedback:
              "Positional asphyxia risk.",
          },
          {
            id: "m07-n3-wrong",
            text: "Refuse any assessment because he is 'psych'",
            quality: "incorrect",
            next: "m07-n4",
            feedback:
              "Still a patient.",
          },
          {
            id: "m07-n3-acc",
            text: "Calm coaching onto stretcher with PD present",
            quality: "acceptable",
            next: "m07-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "m07-n4",
        prompt: "En route he becomes violent, threatening crew. Action?",
        options: [
          {
            id: "m07-n4-best",
            text: "Prioritize crew safety\u2014stop ambulance if needed, request PD, apply approved restraint methods per protocol, monitor ABCs closely",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Safety first, then protocol restraints with airway monitoring.",
          },
          {
            id: "m07-n4-bad",
            text: "Punish with airway obstruction techniques",
            quality: "harmful",
            next: "end",
            feedback:
              "Never.",
          },
          {
            id: "m07-n4-wrong",
            text: "Ignore threats and continue without changing plan",
            quality: "incorrect",
            next: "end",
            feedback:
              "Reassess safety.",
          },
          {
            id: "m07-n4-acc",
            text: "PD assist and continuous monitoring after restraint",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Scene safety + calm approach",
      "Seek medical causes (glucose/hypoxia/tox)",
      "Least restrictive transport plan",
      "If violence: safety, protocol restraints, ABC watch",
    ],
    keyTakeaway:
      "Behavioral emergencies demand safety and a medical workup\u2014restraints are last resort and require airway vigilance.",
  }),
];
