import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const airwayScenarios: Scenario[] = [
  sc({
    id: "airway-01",
    title: "Dyspnea with Tripod Positioning",
    category: "airway",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "32 y/o male, difficulty breathing, sitting on porch. Caller says he looks scared and won't lie down.",
    scene:
      "Residential porch, afternoon, well lit. One adult bystander. No hazards. Patient sitting forward on a chair, hands on knees.",
    presentation:
      "Alert, speaking in short phrases, audible wheezing, using accessory muscles, tripod posture. Denies trauma. Says 'I can't get air.'",
    vitals: { hr: 118, rr: 28, spo2: 90, bp: "142/88", skin: "pale, diaphoretic", gcs: "15" },
    startNodeId: "a01-n1",
    nodes: [
      {
        id: "a01-n1",
        prompt: "After scene safety and BSI, what is your first priority?",
        options: [
          {
            id: "a01-n1-best",
            text: "Assess airway patency and work of breathing while keeping the patient in a position of comfort (tripod/sitting)",
            quality: "best",
            next: "a01-n2",
            feedback:
              "Correct. Position of comfort supports ventilation; simultaneously evaluate the airway and breathing effort.",
          },
          {
            id: "a01-n1-ok",
            text: "Obtain a full SAMPLE history before touching the patient",
            quality: "incorrect",
            next: "a01-n2",
            feedback:
              "History matters, but life threats to airway and breathing come first in primary assessment.",
            delayedCritical: true,
          },
          {
            id: "a01-n1-bad",
            text: "Lay the patient flat to take a blood pressure",
            quality: "harmful",
            next: "a01-n2",
            feedback:
              "Forcing a dyspneic patient flat can worsen respiratory distress. Keep them upright if tolerated.",
            delayedCritical: true,
          },
          {
            id: "a01-n1-wrong",
            text: "Focus only on pulse and skin color; breathing can wait until transport",
            quality: "incorrect",
            next: "a01-n2",
            feedback:
              "Breathing assessment is part of the ABCs and cannot be deferred.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "a01-n2",
        prompt: "SpO\u2082 is 90% on room air; patient remains upright and alert. Best next action?",
        vitals: { hr: 120, rr: 28, spo2: 90, bp: "144/90" },
        options: [
          {
            id: "a01-n2-best",
            text: "Apply high-flow oxygen per protocol and reassess work of breathing and SpO\u2082",
            quality: "best",
            next: "a01-n3",
            feedback:
              "Correct. Hypoxemic dyspnea needs oxygen while you continue assessment and prepare for ALS/transport.",
          },
          {
            id: "a01-n2-ok",
            text: "Coach slow breathing only; withhold oxygen until SpO\u2082 drops further",
            quality: "incorrect",
            next: "a01-n3",
            feedback:
              "Coaching may help, but SpO\u2082 90% with distress warrants oxygen now.",
            delayedCritical: true,
          },
          {
            id: "a01-n2-bad",
            text: "Begin immediate bag-valve-mask ventilations on this alert, speaking patient",
            quality: "harmful",
            next: "a01-n3",
            feedback:
              "BVM is for inadequate ventilation or failure\u2014not an alert patient who is still moving air with distress.",
          },
          {
            id: "a01-n2-acc",
            text: "Apply oxygen and simultaneously ask about asthma, inhaler use, and onset",
            quality: "acceptable",
            next: "a01-n3",
            feedback:
              "Acceptable. Oxygen plus focused history is appropriate once ABCs are addressed.",
          },
        ],
      },
      {
        id: "a01-n3",
        prompt: "After oxygen, SpO\u2082 rises to 94% but accessory muscle use continues. What should guide your transport plan?",
        vitals: { hr: 112, rr: 26, spo2: 94, bp: "140/86" },
        options: [
          {
            id: "a01-n3-best",
            text: "Treat as priority respiratory distress: keep upright, ongoing oxygen, rapid transport, request ALS if available",
            quality: "best",
            next: "a01-n4",
            feedback:
              "Correct. Persistent work of breathing after oxygen is a high-priority medical emergency.",
          },
          {
            id: "a01-n3-ok",
            text: "Stay on scene to complete a full secondary survey before moving",
            quality: "incorrect",
            next: "a01-n4",
            feedback:
              "Do not delay transport for exhaustive secondary exam when the patient remains in respiratory distress.",
            delayedCritical: true,
          },
          {
            id: "a01-n3-bad",
            text: "Have the patient walk to the ambulance to 'expand the lungs'",
            quality: "harmful",
            next: "a01-n4",
            feedback:
              "Exertion can worsen hypoxia and fatigue. Move the patient with assistance, minimizing effort.",
          },
          {
            id: "a01-n3-wrong",
            text: "Cancel ALS because SpO\u2082 improved slightly",
            quality: "incorrect",
            next: "a01-n4",
            feedback:
              "A small SpO\u2082 rise does not erase ongoing distress or the need for advanced support.",
          },
        ],
      },
      {
        id: "a01-n4",
        prompt: "En route the patient becomes drowsy and speaks only single words. Best action?",
        sceneUpdate: "Patient slumps slightly but still has a pulse; respirations become shallow.",
        vitals: { hr: 128, rr: 8, spo2: 88, bp: "100/70", gcs: "12" },
        options: [
          {
            id: "a01-n4-best",
            text: "Open the airway as needed and assist ventilations with a BVM and oxygen; prepare for deterioration",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Fatigue and declining mental status mean inadequate ventilation\u2014assist breaths immediately.",
          },
          {
            id: "a01-n4-ok",
            text: "Increase oxygen flow only and continue coaching",
            quality: "incorrect",
            next: "end",
            feedback:
              "Shallow, slow respirations need assisted ventilation, not oxygen alone.",
            delayedCritical: true,
          },
          {
            id: "a01-n4-bad",
            text: "Insert an OPA in this semi-responsive patient with a gag reflex without assessing need",
            quality: "harmful",
            next: "end",
            feedback:
              "OPA is contraindicated if gag reflex is present; it can cause vomiting and aspiration.",
          },
          {
            id: "a01-n4-acc",
            text: "Assist ventilations and update ALS/receiving facility on decline",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable. Ventilatory support plus early notification is appropriate.",
          },
        ],
      },
    ],
    correctSequence: [
      "Keep upright; assess airway and work of breathing",
      "High-flow oxygen per protocol; reassess SpO\u2082 and effort",
      "Priority transport upright with ongoing oxygen; request ALS",
      "If ventilation fails, assist with BVM and oxygen",
    ],
    keyTakeaway:
      "Tripod dyspnea gets position of comfort and oxygen first; falling mental status means switch from oxygen alone to assisted ventilation.",
  }),
  sc({
    id: "airway-02",
    title: "Asthma Exacerbation",
    category: "airway",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "19 y/o female, known asthma, severe shortness of breath after soccer practice. Mother on scene with inhaler.",
    scene:
      "School athletic field, clear weather. Coach and parent present. No safety hazards.",
    presentation:
      "Sitting forward, prolonged expiratory wheezes, speaking 2\u20133 words at a time. Used her prescribed inhaler once with little relief. Denies chest trauma. Anxious.",
    vitals: { hr: 124, rr: 32, spo2: 91, bp: "128/78", skin: "flushed, sweaty", gcs: "15" },
    startNodeId: "a02-n1",
    nodes: [
      {
        id: "a02-n1",
        prompt: "Primary assessment findings confirm respiratory distress. Best immediate management?",
        options: [
          {
            id: "a02-n1-best",
            text: "Keep seated upright, apply oxygen per protocol, and assess for prescribed inhaler assist per protocol",
            quality: "best",
            next: "a02-n2",
            feedback:
              "Correct. Position, oxygen, and protocol-guided inhaler assist are core EMT asthma care.",
          },
          {
            id: "a02-n1-bad",
            text: "Lay her supine and begin aggressive abdominal thrusts",
            quality: "harmful",
            next: "a02-n2",
            feedback:
              "This is asthma, not choking. Supine positioning harms ventilation.",
          },
          {
            id: "a02-n1-wrong",
            text: "Withhold oxygen because asthmatics should always stay hypoxic to 'drive breathing'",
            quality: "incorrect",
            next: "a02-n2",
            feedback:
              "That myth is dangerous. Treat hypoxia; monitor closely.",
            delayedCritical: true,
          },
          {
            id: "a02-n1-acc",
            text: "Oxygen first, then confirm inhaler is prescribed to the patient before assisting",
            quality: "acceptable",
            next: "a02-n2",
            feedback:
              "Acceptable sequence\u2014verify the medication belongs to the patient.",
          },
        ],
      },
      {
        id: "a02-n2",
        prompt: "Mother hands you the patient's prescribed MDI. Patient is alert and cooperative. What is correct?",
        options: [
          {
            id: "a02-n2-best",
            text: "Confirm it is her prescribed inhaler, check indications/contraindications per protocol, then assist as allowed",
            quality: "best",
            next: "a02-n3",
            feedback:
              "Correct. EMTs assist with the patient's prescribed inhaler under protocol\u2014never invent a dose.",
          },
          {
            id: "a02-n2-bad",
            text: "Give several extra puffs beyond what protocol allows because she looks bad",
            quality: "harmful",
            next: "a02-n3",
            feedback:
              "Do not exceed protocol. Overuse risks toxicity and arrhythmia.",
          },
          {
            id: "a02-n2-wrong",
            text: "Refuse any inhaler assist and only drive without treatment",
            quality: "incorrect",
            next: "a02-n3",
            feedback:
              "If protocol allows assist and criteria are met, withholding delays bronchodilation.",
            delayedCritical: true,
          },
          {
            id: "a02-n2-acc",
            text: "Oxygen ongoing; assist inhaler per protocol while preparing rapid transport",
            quality: "acceptable",
            next: "a02-n3",
            feedback:
              "Acceptable combined approach.",
          },
        ],
      },
      {
        id: "a02-n3",
        prompt: "After oxygen and inhaler assist, wheezing is quieter but the patient looks exhausted and SpO\u2082 is 89%. Concern?",
        vitals: { hr: 130, rr: 10, spo2: 89, bp: "110/70", gcs: "14" },
        options: [
          {
            id: "a02-n3-best",
            text: "Recognize possible 'silent chest'/fatigue\u2014prepare to assist ventilations and expedite ALS/ED care",
            quality: "best",
            next: "a02-n4",
            feedback:
              "Correct. Decreasing wheeze with fatigue can mean worsening airflow, not improvement.",
          },
          {
            id: "a02-n3-ok",
            text: "Assume she is improving because wheezes are softer; delay transport",
            quality: "harmful",
            next: "a02-n4",
            feedback:
              "Quieter breath sounds with exhaustion is a red flag for failure.",
            delayedCritical: true,
          },
          {
            id: "a02-n3-wrong",
            text: "Force her to walk to 'open airways'",
            quality: "harmful",
            next: "a02-n4",
            feedback:
              "Exertion can precipitate respiratory arrest.",
          },
          {
            id: "a02-n3-acc",
            text: "Reassess ABCs frequently and be ready to BVM if tidal volume falls",
            quality: "acceptable",
            next: "a02-n4",
            feedback:
              "Acceptable vigilance.",
          },
        ],
      },
      {
        id: "a02-n4",
        prompt: "She becomes barely responsive with inadequate chest rise. Next step?",
        options: [
          {
            id: "a02-n4-best",
            text: "Open airway, assist ventilations with BVM and oxygen, monitor for arrest",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Inadequate ventilation requires immediate BVM support.",
          },
          {
            id: "a02-n4-wrong",
            text: "Continue nasal cannula only and wait for the hospital",
            quality: "incorrect",
            next: "end",
            feedback:
              "Nasal cannula cannot fix apnea/hypoventilation.",
            delayedCritical: true,
          },
          {
            id: "a02-n4-bad",
            text: "Perform blind finger sweeps of the mouth",
            quality: "harmful",
            next: "end",
            feedback:
              "Blind sweeps can push objects deeper and are not indicated here.",
          },
          {
            id: "a02-n4-acc",
            text: "BVM ventilations with high-flow oxygen and urgent update to ALS",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Upright positioning and oxygen; evaluate for prescribed inhaler assist",
      "Assist with patient's prescribed MDI only per protocol",
      "Watch for fatigue/silent chest as signs of failure",
      "Assist ventilations if breathing becomes inadequate",
    ],
    keyTakeaway:
      "Asthma care is oxygen, position, and protocol inhaler assist\u2014falling effort or a quieting chest means imminent ventilatory failure.",
  }),
  sc({
    id: "airway-03",
    title: "Opioid Overdose \u2014 Airway First",
    category: "airway",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Unresponsive adult in bathroom, possible overdose. Slow breathing reported.",
    scene:
      "Apartment bathroom. Drug paraphernalia visible. Scene safe after PD clears. Partner present.",
    presentation:
      "Unresponsive to voice, responds only to deep pain with moan. Snoring respirations, cyanotic lips, pinpoint pupils. Pulse present and slow.",
    vitals: { hr: 52, rr: 6, spo2: 78, bp: "98/60", skin: "cool, cyanotic", gcs: "6", glucose: "110" },
    startNodeId: "a03-n1",
    nodes: [
      {
        id: "a03-n1",
        prompt: "What is the immediate priority for this unresponsive, hypoventilating patient?",
        options: [
          {
            id: "a03-n1-best",
            text: "Open the airway (head-tilt/chin-lift if no trauma), suction if needed, and begin assisting ventilations with oxygen",
            quality: "best",
            next: "a03-n2",
            feedback:
              "Correct. Airway and breathing failures kill first\u2014support ventilation before other interventions.",
          },
          {
            id: "a03-n1-wrong",
            text: "Search the room for a medication history before touching the patient",
            quality: "incorrect",
            next: "a03-n2",
            feedback:
              "Do not delay airway support to investigate.",
            delayedCritical: true,
          },
          {
            id: "a03-n1-bad",
            text: "Leave the patient face-down to 'drain secretions'",
            quality: "harmful",
            next: "a03-n2",
            feedback:
              "Prone positioning without a managed airway risks further obstruction.",
          },
          {
            id: "a03-n1-acc",
            text: "Manually open airway and prepare BVM while checking pulse",
            quality: "acceptable",
            next: "a03-n2",
            feedback:
              "Acceptable concurrent ABC approach.",
          },
        ],
      },
      {
        id: "a03-n2",
        prompt: "You are ventilating adequately; SpO\u2082 is rising. Partner asks about naloxone. Correct EMT framing?",
        vitals: { hr: 56, rr: "assisted", spo2: 92, bp: "100/64" },
        options: [
          {
            id: "a03-n2-best",
            text: "Continue effective ventilations; administer/assist naloxone per protocol if indicated, without delaying airway support",
            quality: "best",
            next: "a03-n3",
            feedback:
              "Correct. Ventilation is primary; naloxone is adjunct per protocol\u2014no dose invention.",
          },
          {
            id: "a03-n2-bad",
            text: "Stop ventilating so the drug can 'work better' alone",
            quality: "harmful",
            next: "a03-n3",
            feedback:
              "Never stop ventilations waiting for naloxone.",
          },
          {
            id: "a03-n2-wrong",
            text: "Give an arbitrary large dose you invent on scene",
            quality: "harmful",
            next: "a03-n3",
            feedback:
              "Never invent medication doses. Follow protocol only.",
          },
          {
            id: "a03-n2-acc",
            text: "Keep BVM support and request ALS while following local naloxone protocol",
            quality: "acceptable",
            next: "a03-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a03-n3",
        prompt: "After naloxone per protocol, the patient becomes agitated and tries to refuse care. Best next step?",
        sceneUpdate: "Patient sits up, SpO\u2082 96% on oxygen, still drowsy.",
        vitals: { hr: 88, rr: 14, spo2: 96, bp: "118/72", gcs: "14" },
        options: [
          {
            id: "a03-n3-best",
            text: "Reassess ABCs, explain risks of recurrence, encourage transport, and document; do not abandon an unsafe refusal process",
            quality: "best",
            next: "a03-n4",
            feedback:
              "Correct. Opioid effects can return; capacity and informed refusal matter\u2014stay professional.",
          },
          {
            id: "a03-n3-bad",
            text: "Physically restrain and force an airway adjunct because he overdosed",
            quality: "harmful",
            next: "a03-n4",
            feedback:
              "Forcing invasive care on an improving, protecting patient is harmful and legally risky.",
          },
          {
            id: "a03-n3-wrong",
            text: "Leave immediately without reassessment once he can speak",
            quality: "incorrect",
            next: "a03-n4",
            feedback:
              "Reassess and address refusal properly; renarcotization is possible.",
          },
          {
            id: "a03-n3-acc",
            text: "Monitor closely, keep oxygen as needed, strongly recommend ED evaluation",
            quality: "acceptable",
            next: "a03-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a03-n4",
        prompt: "During packaging he becomes unresponsive again with snoring. Priority?",
        options: [
          {
            id: "a03-n4-best",
            text: "Re-open airway, suction if needed, resume assisted ventilations, reconsider protocol naloxone/ALS",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Recurrence of hypoventilation returns you to airway/breathing support.",
          },
          {
            id: "a03-n4-wrong",
            text: "Assume he is faking and continue loading without airway care",
            quality: "harmful",
            next: "end",
            feedback:
              "Snoring unresponsiveness is a true airway emergency.",
            delayedCritical: true,
          },
          {
            id: "a03-n4-bad",
            text: "Pour water on his face to wake him",
            quality: "harmful",
            next: "end",
            feedback:
              "Not a substitute for airway management; aspiration risk.",
          },
          {
            id: "a03-n4-acc",
            text: "Airway + BVM again; update receiving facility",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Open airway and assist ventilations with oxygen",
      "Naloxone only as protocol adjunct\u2014never stop ventilating",
      "Reassess after improvement; address refusal carefully",
      "If hypoventilation returns, restart airway/ventilation support",
    ],
    keyTakeaway:
      "In opioid overdose, effective airway opening and BVM come first; naloxone supports but never replaces ventilation.",
  }),
  sc({
    id: "airway-04",
    title: "Choking: Conscious to Unconscious",
    category: "airway",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Restaurant, adult choking on food. Conscious on dispatch.",
    scene:
      "Crowded dining room. Waitstaff pointing to a middle-aged male standing at a table, clutching his throat.",
    presentation:
      "Universal choking sign, unable to speak or cough effectively, cyanosis around lips. Still standing with a pulse.",
    vitals: { hr: 120, rr: "ineffective", spo2: "unable", bp: "not yet obtained", skin: "cyanotic", gcs: "15 (panic)" },
    startNodeId: "a04-n1",
    nodes: [
      {
        id: "a04-n1",
        prompt: "Severe FBAO in a conscious adult. Best action?",
        options: [
          {
            id: "a04-n1-best",
            text: "Perform abdominal thrusts (or chest thrusts if pregnant/obese) until object expels or patient becomes unresponsive",
            quality: "best",
            next: "a04-n2",
            feedback:
              "Correct. Severe choking needs immediate foreign-body airway clearing.",
          },
          {
            id: "a04-n1-wrong",
            text: "Encourage him to take deep breaths and drink water",
            quality: "harmful",
            next: "a04-n2",
            feedback:
              "Ineffective cough plus silence means severe obstruction\u2014water will not help.",
            delayedCritical: true,
          },
          {
            id: "a04-n1-bad",
            text: "Blind finger sweep while he is standing and conscious",
            quality: "harmful",
            next: "a04-n2",
            feedback:
              "Blind sweeps are not for conscious patients and can worsen obstruction.",
          },
          {
            id: "a04-n1-acc",
            text: "Confirm severe obstruction, activate help, begin abdominal thrusts",
            quality: "acceptable",
            next: "a04-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a04-n2",
        prompt: "After several thrusts he collapses unresponsive. You lower him to the floor. Next?",
        sceneUpdate: "Patient unresponsive, not breathing normally.",
        options: [
          {
            id: "a04-n2-best",
            text: "Begin CPR starting with compressions; each time you open the airway look for an object and remove only if visible",
            quality: "best",
            next: "a04-n3",
            feedback:
              "Correct. Unresponsive FBAO care follows CPR with checks for a visible object.",
          },
          {
            id: "a04-n2-wrong",
            text: "Continue only abdominal thrusts on the unresponsive patient on the floor",
            quality: "incorrect",
            next: "a04-n3",
            feedback:
              "Once unresponsive, switch to CPR-based algorithm.",
            delayedCritical: true,
          },
          {
            id: "a04-n2-bad",
            text: "Spend prolonged time with repeated blind finger sweeps before compressions",
            quality: "harmful",
            next: "a04-n3",
            feedback:
              "Blind sweeps delay CPR and may push the object deeper.",
          },
          {
            id: "a04-n2-acc",
            text: "Activate ALS/AED, start CPR, inspect mouth when opening airway",
            quality: "acceptable",
            next: "a04-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a04-n3",
        prompt: "During airway opening you see a piece of food. What do you do?",
        options: [
          {
            id: "a04-n3-best",
            text: "Remove the visible object, then attempt ventilations and continue CPR as needed",
            quality: "best",
            next: "a04-n4",
            feedback:
              "Correct. Only remove objects you can see.",
          },
          {
            id: "a04-n3-bad",
            text: "Push the object farther back to 'clear the path'",
            quality: "harmful",
            next: "a04-n4",
            feedback:
              "Never push a foreign body deeper.",
          },
          {
            id: "a04-n3-wrong",
            text: "Ignore it and only compress forever without trying to clear",
            quality: "incorrect",
            next: "a04-n4",
            feedback:
              "A visible object should be removed when the airway is opened.",
          },
          {
            id: "a04-n3-acc",
            text: "Remove visible food with a finger sweep, then ventilate",
            quality: "acceptable",
            next: "a04-n4",
            feedback:
              "Acceptable when the object is seen.",
          },
        ],
      },
      {
        id: "a04-n4",
        prompt: "Object removed; patient has a pulse and starts gasping. Priority?",
        vitals: { hr: 110, rr: 8, spo2: 85, bp: "130/80", gcs: "10" },
        options: [
          {
            id: "a04-n4-best",
            text: "Support airway, assist ventilations as needed with oxygen, monitor for re-obstruction, rapid transport",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Post-obstruction patients need airway support and close monitoring.",
          },
          {
            id: "a04-n4-wrong",
            text: "Declare the emergency over and have him finish dinner",
            quality: "harmful",
            next: "end",
            feedback:
              "Airway trauma, aspiration, and hypoxia effects still require evaluation.",
          },
          {
            id: "a04-n4-bad",
            text: "Force an OPA while he is gagging vigorously",
            quality: "harmful",
            next: "end",
            feedback:
              "OPA with intact gag causes vomiting.",
          },
          {
            id: "a04-n4-acc",
            text: "Oxygen/ventilatory support and ED transport for evaluation",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Abdominal (or chest) thrusts for severe conscious choking",
      "If unresponsive: CPR with visible-object checks",
      "Remove only what you can see; attempt ventilations",
      "Post-clearance: support breathing and transport",
    ],
    keyTakeaway:
      "Severe conscious choking gets thrusts; once unresponsive, switch to CPR and remove only visible objects.",
  }),
  sc({
    id: "airway-05",
    title: "CHF / Pulmonary Edema Respiratory Distress",
    category: "airway",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "74 y/o female, sudden shortness of breath, history of heart failure. Sitting in recliner.",
    scene:
      "Private residence, bedroom. Husband present. Home oxygen concentrator in corner, currently off.",
    presentation:
      "Orthopnea, wet crackles bilaterally, frothy sputum, speaking in short phrases. Legs with chronic edema. Denies fever. Very anxious.",
    vitals: { hr: 118, rr: 30, spo2: 86, bp: "178/98", skin: "pale, diaphoretic", gcs: "15" },
    startNodeId: "a05-n1",
    nodes: [
      {
        id: "a05-n1",
        prompt: "Best initial positioning and oxygen approach?",
        options: [
          {
            id: "a05-n1-best",
            text: "Keep sitting upright/legs dependent; apply high-flow oxygen per protocol and reassess",
            quality: "best",
            next: "a05-n2",
            feedback:
              "Correct. Upright position reduces pulmonary congestion work; treat hypoxia.",
          },
          {
            id: "a05-n1-bad",
            text: "Lay flat to improve blood pressure reading comfort",
            quality: "harmful",
            next: "a05-n2",
            feedback:
              "Flat position worsens orthopnea and edema fluid shift into lungs.",
            delayedCritical: true,
          },
          {
            id: "a05-n1-wrong",
            text: "Withhold oxygen until a full 12-lead is done by you as EMT",
            quality: "incorrect",
            next: "a05-n2",
            feedback:
              "Oxygen for hypoxemia is not delayed for non-critical tasks.",
            delayedCritical: true,
          },
          {
            id: "a05-n1-acc",
            text: "Upright posture, oxygen, calm reassurance while preparing transport",
            quality: "acceptable",
            next: "a05-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a05-n2",
        prompt: "Husband offers her prescribed nitroglycerin tablets. She has crackles and BP 178/98. EMT consideration?",
        options: [
          {
            id: "a05-n2-best",
            text: "Follow local protocol for assisting prescribed nitro only if criteria met; prioritize oxygen, position, and ALS/rapid transport",
            quality: "best",
            next: "a05-n3",
            feedback:
              "Correct. No invented doses; many systems require ALS for CHF meds\u2014know your protocol.",
          },
          {
            id: "a05-n2-bad",
            text: "Give multiple nitro tablets based on a dose you invent",
            quality: "harmful",
            next: "a05-n3",
            feedback:
              "Never invent doses.",
          },
          {
            id: "a05-n2-wrong",
            text: "Ignore hypoxia and argue about medication philosophy on scene",
            quality: "incorrect",
            next: "a05-n3",
            feedback:
              "Airway/oxygen remain the immediate priorities.",
            delayedCritical: true,
          },
          {
            id: "a05-n2-acc",
            text: "Continue oxygen/upright care and request ALS for advanced CHF management",
            quality: "acceptable",
            next: "a05-n3",
            feedback:
              "Acceptable when protocol limits EMT medication assist.",
          },
        ],
      },
      {
        id: "a05-n3",
        prompt: "Despite oxygen, she becomes more fatigued with shallow breaths. Next?",
        vitals: { hr: 130, rr: 8, spo2: 84, bp: "160/90", gcs: "13" },
        options: [
          {
            id: "a05-n3-best",
            text: "Assist ventilations with BVM and oxygen; consider CPAP only if trained/protocol and she remains candidate",
            quality: "best",
            next: "a05-n4",
            feedback:
              "Correct. Inadequate rate/volume needs assisted ventilation; CPAP is protocol/training dependent.",
          },
          {
            id: "a05-n3-wrong",
            text: "Keep NC only because 'CHF patients shouldn't be ventilated'",
            quality: "incorrect",
            next: "a05-n4",
            feedback:
              "Hypoventilation still requires support.",
            delayedCritical: true,
          },
          {
            id: "a05-n3-bad",
            text: "Force CPAP on a nearly unresponsive patient who cannot protect her airway",
            quality: "harmful",
            next: "a05-n4",
            feedback:
              "CPAP needs a spontaneously breathing, cooperative/protecting patient per typical protocols.",
          },
          {
            id: "a05-n3-acc",
            text: "BVM assist and expedite transport/ALS",
            quality: "acceptable",
            next: "a05-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a05-n4",
        prompt: "Transport priority decision?",
        options: [
          {
            id: "a05-n4-best",
            text: "High priority: ongoing respiratory support, upright if possible, early hospital notification",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Acute pulmonary edema is time-sensitive.",
          },
          {
            id: "a05-n4-wrong",
            text: "Non-emergent transport after a complete home inventory of medications",
            quality: "incorrect",
            next: "end",
            feedback:
              "Do not delay for nonessential tasks.",
            delayedCritical: true,
          },
          {
            id: "a05-n4-bad",
            text: "Have her walk downstairs unassisted 'for exercise'",
            quality: "harmful",
            next: "end",
            feedback:
              "Exertion can cause arrest.",
          },
          {
            id: "a05-n4-acc",
            text: "Priority move with continuous monitoring and oxygen/ventilation support",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Upright position and high-flow oxygen",
      "Medication assist only per protocol\u2014no invented doses",
      "Assist ventilations if effort fails; CPAP only if allowed/appropriate",
      "High-priority transport with early notification",
    ],
    keyTakeaway:
      "Suspected cardiogenic pulmonary edema: keep upright, oxygenate, and escalate to assisted ventilation when fatigue appears.",
  }),
  sc({
    id: "airway-06",
    title: "Aspiration Risk \u2014 Vomiting Unresponsive",
    category: "airway",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Elderly male found unresponsive at nursing facility after vomiting. Possible stroke history.",
    scene:
      "Skilled nursing facility room. Staff present. Suction available on wall. Patient supine in bed, gurgling.",
    presentation:
      "Unresponsive, gurgling upper airway sounds, vomitus in mouth and on pillow. Spontaneous but noisy respirations. Pulse present.",
    vitals: { hr: 96, rr: 20, spo2: 88, bp: "150/90", skin: "pale", gcs: "7", glucose: "140" },
    startNodeId: "a06-n1",
    nodes: [
      {
        id: "a06-n1",
        prompt: "Immediate airway action?",
        options: [
          {
            id: "a06-n1-best",
            text: "Position to drain if needed, suction the oropharynx, then open airway and oxygenate/ventilate as indicated",
            quality: "best",
            next: "a06-n2",
            feedback:
              "Correct. Clear vomit first\u2014suction before forcing positive pressure into a soiled airway.",
          },
          {
            id: "a06-n1-bad",
            text: "Immediately BVM large volumes without clearing the mouth",
            quality: "harmful",
            next: "a06-n2",
            feedback:
              "Bagging into vomitus drives aspirate into the lungs.",
            delayedCritical: true,
          },
          {
            id: "a06-n1-wrong",
            text: "Ignore gurgling and start a detailed neurologic exam",
            quality: "incorrect",
            next: "a06-n2",
            feedback:
              "Gurgling is an airway threat first.",
            delayedCritical: true,
          },
          {
            id: "a06-n1-acc",
            text: "Log-roll/recovery position briefly to clear, then suction and reassess",
            quality: "acceptable",
            next: "a06-n2",
            feedback:
              "Acceptable when spinal injury is not the leading concern and it helps drainage.",
          },
        ],
      },
      {
        id: "a06-n2",
        prompt: "Airway is clearer after suction; patient still unresponsive with inadequate tidal volume. Next?",
        vitals: { hr: 100, rr: 8, spo2: 86, bp: "148/88", gcs: "7" },
        options: [
          {
            id: "a06-n2-best",
            text: "Insert appropriate airway adjunct if tolerated and assist ventilations with BVM and oxygen",
            quality: "best",
            next: "a06-n3",
            feedback:
              "Correct. After clearing, support ventilation and protect the airway.",
          },
          {
            id: "a06-n2-wrong",
            text: "Leave him without ventilatory support because suction 'fixed it'",
            quality: "incorrect",
            next: "a06-n3",
            feedback:
              "Hypoventilation remains after clearing.",
            delayedCritical: true,
          },
          {
            id: "a06-n2-bad",
            text: "Pour oral fluids to 'rinse' the airway",
            quality: "harmful",
            next: "a06-n3",
            feedback:
              "Adds aspiration volume.",
          },
          {
            id: "a06-n2-acc",
            text: "NPA/OPA as appropriate plus BVM with high-flow oxygen",
            quality: "acceptable",
            next: "a06-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a06-n3",
        prompt: "During BVM he vomits again. Best response?",
        options: [
          {
            id: "a06-n3-best",
            text: "Turn patient as able, suction immediately, then resume careful ventilations",
            quality: "best",
            next: "a06-n4",
            feedback:
              "Correct. Interrupt to clear; then resume support.",
          },
          {
            id: "a06-n3-bad",
            text: "Keep bagging through the vomit to maintain a schedule",
            quality: "harmful",
            next: "a06-n4",
            feedback:
              "Forces aspirate into lungs.",
          },
          {
            id: "a06-n3-wrong",
            text: "Stop all care and wait silently for ALS without suctioning",
            quality: "incorrect",
            next: "a06-n4",
            feedback:
              "You can and must suction now.",
            delayedCritical: true,
          },
          {
            id: "a06-n3-acc",
            text: "Suction quickly and reassess airway patency before next ventilation",
            quality: "acceptable",
            next: "a06-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a06-n4",
        prompt: "Transport consideration for aspiration risk?",
        options: [
          {
            id: "a06-n4-best",
            text: "Maintain suction readiness, continuous airway monitoring, and priority transport with ALS backup if available",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Aspiration patients deteriorate\u2014stay ready to suction and ventilate.",
          },
          {
            id: "a06-n4-wrong",
            text: "Non-urgent transport without suction available",
            quality: "incorrect",
            next: "end",
            feedback:
              "Suction must travel with an aspiration-risk airway.",
          },
          {
            id: "a06-n4-bad",
            text: "Feed ice chips to keep the mouth moist",
            quality: "harmful",
            next: "end",
            feedback:
              "NPO\u2014aspiration risk.",
          },
          {
            id: "a06-n4-acc",
            text: "Keep airway kit and suction at the head throughout transport",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Suction/clear vomitus before positive-pressure ventilation",
      "Airway adjunct + assist ventilations once clear",
      "If re-vomiting: stop, clear, then resume",
      "Transport with suction ready and continuous airway watch",
    ],
    keyTakeaway:
      "Gurgling vomit means suction first\u2014never bag debris into the lungs.",
  }),
  sc({
    id: "airway-07",
    title: "Inadequate Ventilations \u2014 BVM Technique",
    category: "airway",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "46 y/o male, altered mental status, slow breathing after possible seizure. Bystander CPR not started\u2014pulse present.",
    scene:
      "Public sidewalk. Bystanders clear a space. No trauma reported. ALS 8 minutes out.",
    presentation:
      "Unresponsive, occasional agonal gasps, weak chest rise, cyanosis. Radial pulse present ~50. Jaw slightly clenched but you can open the mouth.",
    vitals: { hr: 50, rr: 4, spo2: 74, bp: "88/50", skin: "cyanotic", gcs: "3", glucose: "98" },
    startNodeId: "a07-n1",
    nodes: [
      {
        id: "a07-n1",
        prompt: "Pulse present but breathing inadequate. Correct action?",
        options: [
          {
            id: "a07-n1-best",
            text: "Open airway, insert adjunct if appropriate, deliver BVM ventilations with oxygen at a proper rate\u2014do not start compressions solely for bradypnea with a pulse",
            quality: "best",
            next: "a07-n2",
            feedback:
              "Correct. With a pulse, treat as respiratory failure with assisted ventilation.",
          },
          {
            id: "a07-n1-wrong",
            text: "Withhold ventilation because a pulse means breathing is fine",
            quality: "incorrect",
            next: "a07-n2",
            feedback:
              "Agonal/slow breaths are not adequate.",
            delayedCritical: true,
          },
          {
            id: "a07-n1-bad",
            text: "Perform continuous chest compressions only and never ventilate",
            quality: "harmful",
            next: "a07-n2",
            feedback:
              "With a pulse, the priority is ventilation; needless compressions can cause injury.",
          },
          {
            id: "a07-n1-acc",
            text: "BVM with oxygen while monitoring pulse closely",
            quality: "acceptable",
            next: "a07-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a07-n2",
        prompt: "Your first BVM attempts show poor chest rise and a large mask leak. Fix?",
        options: [
          {
            id: "a07-n2-best",
            text: "Reposition the airway, improve mask seal (EC clamp), consider two-person BVM, and confirm chest rise",
            quality: "best",
            next: "a07-n3",
            feedback:
              "Correct. Seal and airway position fix most failed BVM attempts.",
          },
          {
            id: "a07-n2-bad",
            text: "Squeeze as hard and fast as possible regardless of chest rise",
            quality: "harmful",
            next: "a07-n3",
            feedback:
              "Hyperventilation and gastric inflation worsen outcomes.",
          },
          {
            id: "a07-n2-wrong",
            text: "Abandon ventilations because the first try failed",
            quality: "incorrect",
            next: "a07-n3",
            feedback:
              "Troubleshoot\u2014don't quit.",
            delayedCritical: true,
          },
          {
            id: "a07-n2-acc",
            text: "Switch to two-rescuer BVM technique for a better seal",
            quality: "acceptable",
            next: "a07-n3",
            feedback:
              "Acceptable and often preferred.",
          },
        ],
      },
      {
        id: "a07-n3",
        prompt: "Chest rise improves. What ventilation rate concept should guide you (adult)?",
        options: [
          {
            id: "a07-n3-best",
            text: "Deliver steady breaths that produce visible chest rise about once every 5\u20136 seconds; avoid over-ventilation",
            quality: "best",
            next: "a07-n4",
            feedback:
              "Correct. Adult rescue breathing targets roughly 10/min with visible rise\u2014no stacking.",
          },
          {
            id: "a07-n3-bad",
            text: "Ventilate as fast as possible to 'blow off CO\u2082'",
            quality: "harmful",
            next: "a07-n4",
            feedback:
              "Excessive rates hurt venous return and increase aspiration/gastric risk.",
          },
          {
            id: "a07-n3-wrong",
            text: "Give one huge breath every 30 seconds only",
            quality: "incorrect",
            next: "a07-n4",
            feedback:
              "That rate is too slow for an apneic/hypoventilating adult.",
          },
          {
            id: "a07-n3-acc",
            text: "Visible chest rise, controlled rate, continuous pulse checks",
            quality: "acceptable",
            next: "a07-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "a07-n4",
        prompt: "After two minutes SpO\u2082 is 93% assisted; pulse still present. Next priority?",
        vitals: { hr: 58, rr: "assisted", spo2: 93, bp: "92/56", gcs: "3" },
        options: [
          {
            id: "a07-n4-best",
            text: "Continue effective ventilations, treat for shock as indicated, rapid transport/ALS intercept",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Maintain what works and move toward definitive care.",
          },
          {
            id: "a07-n4-wrong",
            text: "Stop BVM because SpO\u2082 improved and wait on scene",
            quality: "incorrect",
            next: "end",
            feedback:
              "He still needs ventilatory support.",
            delayedCritical: true,
          },
          {
            id: "a07-n4-bad",
            text: "Remove oxygen from the BVM to 'prevent oxygen toxicity' in the field",
            quality: "harmful",
            next: "end",
            feedback:
              "Acute hypoxic failure needs oxygenated ventilations.",
          },
          {
            id: "a07-n4-acc",
            text: "Maintain BVM/oxygen and package for urgent transport",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "With pulse + inadequate breathing: assist ventilations (not compressions alone)",
      "Fix seal/airway position; prefer two-person BVM if needed",
      "Visible chest rise at an appropriate adult rate\u2014avoid hyperventilation",
      "Continue support and rapid transport/ALS",
    ],
    keyTakeaway:
      "Inadequate breathing with a pulse is a BVM problem: seal, rate, visible chest rise, and ongoing oxygen.",
  }),
];
