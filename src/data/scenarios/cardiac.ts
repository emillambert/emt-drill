import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const cardiacScenarios: Scenario[] = [
  sc({
    id: "cardiac-01",
    title: "Chest Pain \u2014 Suspected ACS",
    category: "cardiac",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "58 y/o male, crushing chest pressure for 20 minutes, sweating. At office desk.",
    scene:
      "Office building, conference room. Coworkers present. Elevator access available. No hazards.",
    presentation:
      "Pale, diaphoretic, clutching center of chest. Pain radiates to left arm. Denies trauma. History of hypertension. Alert and anxious.",
    vitals: { hr: 96, rr: 20, spo2: 95, bp: "148/92", skin: "pale, diaphoretic", gcs: "15" },
    startNodeId: "c01-n1",
    nodes: [
      {
        id: "c01-n1",
        prompt: "After scene safety, what is your best initial focus?",
        options: [
          {
            id: "c01-n1-best",
            text: "ABCs, oxygen if needed per protocol, keep at rest, obtain SAMPLE/OPQRST while preparing rapid ALS/ED care",
            quality: "best",
            next: "c01-n2",
            feedback:
              "Correct. Suspected ACS: limit exertion, support ABCs, focused history, expedite definitive care.",
          },
          {
            id: "c01-n1-bad",
            text: "Have him walk briskly to the ambulance to 'test the heart'",
            quality: "harmful",
            next: "c01-n2",
            feedback:
              "Exertion can extend infarct or trigger arrest.",
          },
          {
            id: "c01-n1-wrong",
            text: "Ignore chest pain and only bandage a paper cut on his finger",
            quality: "incorrect",
            next: "c01-n2",
            feedback:
              "Chest pressure with diaphoresis is the life threat.",
            delayedCritical: true,
          },
          {
            id: "c01-n1-acc",
            text: "Place at rest, assess ABCs, request ALS",
            quality: "acceptable",
            next: "c01-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c01-n2",
        prompt: "He has prescribed nitroglycerin. BP is 148/92, SpO\u2082 95%. EMT medication approach?",
        vitals: { hr: 98, rr: 20, spo2: 95, bp: "148/92" },
        options: [
          {
            id: "c01-n2-best",
            text: "If protocol allows, assist with his prescribed nitroglycerin only after checking contraindications (e.g., recent ED meds, hypotension); no invented doses",
            quality: "best",
            next: "c01-n3",
            feedback:
              "Correct. Assist only per protocol with safety checks\u2014never invent a dose.",
          },
          {
            id: "c01-n2-bad",
            text: "Give several tablets based on a dose you invent because pain is severe",
            quality: "harmful",
            next: "c01-n3",
            feedback:
              "Never invent medication doses.",
          },
          {
            id: "c01-n2-wrong",
            text: "Force him to take a coworker's nitro 'just like his'",
            quality: "harmful",
            next: "c01-n3",
            feedback:
              "Only the patient's prescribed medication, and only per protocol.",
          },
          {
            id: "c01-n2-acc",
            text: "Oxygen as indicated, aspirin/nitro only if local protocol authorizes EMT assist",
            quality: "acceptable",
            next: "c01-n3",
            feedback:
              "Acceptable\u2014protocols vary.",
          },
        ],
      },
      {
        id: "c01-n3",
        prompt: "During assessment he becomes profoundly pale, BP 82/50, still complaining of chest pain. Priority shift?",
        vitals: { hr: 110, rr: 24, spo2: 93, bp: "82/50", skin: "cool, clammy" },
        options: [
          {
            id: "c01-n3-best",
            text: "Treat as cardiogenic shock/ACS emergency: keep supine or position of comfort as tolerated, oxygen as needed, rapid transport, ALS\u2014do not give nitro if hypotensive per typical rules",
            quality: "best",
            next: "c01-n4",
            feedback:
              "Correct. Hypotension changes the plan\u2014support perfusion and move fast.",
          },
          {
            id: "c01-n3-bad",
            text: "Sit him bolt upright and assist more nitro despite hypotension",
            quality: "harmful",
            next: "c01-n4",
            feedback:
              "Nitro with hypotension can worsen shock.",
          },
          {
            id: "c01-n3-wrong",
            text: "Stay on scene for a complete social history",
            quality: "incorrect",
            next: "c01-n4",
            feedback:
              "Shocking ACS needs transport now.",
            delayedCritical: true,
          },
          {
            id: "c01-n3-acc",
            text: "Withhold nitro due to low BP; high-priority transport",
            quality: "acceptable",
            next: "c01-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c01-n4",
        prompt: "Transport decision and notification?",
        options: [
          {
            id: "c01-n4-best",
            text: "Priority transport to an appropriate ED, early radio report of suspected ACS/shock",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Time-sensitive cardiac care needs early notification.",
          },
          {
            id: "c01-n4-wrong",
            text: "Take the long scenic route so he can 'relax'",
            quality: "incorrect",
            next: "end",
            feedback:
              "Delays reperfusion.",
          },
          {
            id: "c01-n4-bad",
            text: "Discharge him on scene because pain briefly lessened",
            quality: "harmful",
            next: "end",
            feedback:
              "Suspected ACS requires evaluation even if pain fluctuates.",
          },
          {
            id: "c01-n4-acc",
            text: "Lights/siren per protocol, continuous monitoring, ALS intercept if beneficial",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Rest + ABCs + focused ACS assessment",
      "Assist prescribed nitro/aspirin only per protocol with contraindications checked",
      "If hypotensive: stop nitro, support, rapid transport",
      "Priority ED transport with early notification",
    ],
    keyTakeaway:
      "Suspected ACS: limit work of the heart, follow protocol for assists, and treat hypotension as a reason to withhold nitro and move faster.",
  }),
  sc({
    id: "cardiac-02",
    title: "Cardiac Arrest \u2014 CPR and AED",
    category: "cardiac",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Witnessed collapse at gym. Unresponsive, not breathing normally.",
    scene:
      "Gym floor cleared. AED on wall. Bystander starting compressions on your arrival.",
    presentation:
      "Unresponsive, agonal gasps, no pulse. Adult male ~50s.",
    vitals: { hr: "none", rr: "agonal", spo2: "n/a", bp: "unobtainable", skin: "cyanotic", gcs: "3" },
    startNodeId: "c02-n1",
    nodes: [
      {
        id: "c02-n1",
        prompt: "Confirm arrest. Immediate priority?",
        options: [
          {
            id: "c02-n1-best",
            text: "Ensure high-quality CPR, apply AED as soon as available, minimize interruptions",
            quality: "best",
            next: "c02-n2",
            feedback:
              "Correct. Compressions + early defibrillation save lives.",
          },
          {
            id: "c02-n1-wrong",
            text: "Pause everything for a 5-minute detailed history from bystanders",
            quality: "incorrect",
            next: "c02-n2",
            feedback:
              "Do not delay CPR/AED.",
            delayedCritical: true,
          },
          {
            id: "c02-n1-bad",
            text: "Move the patient to the ambulance before any CPR",
            quality: "harmful",
            next: "c02-n2",
            feedback:
              "Start resuscitation where you find him if safe.",
          },
          {
            id: "c02-n1-acc",
            text: "Take over/coach CPR and send someone for the AED",
            quality: "acceptable",
            next: "c02-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c02-n2",
        prompt: "AED analyzes and advises a shock. Correct action?",
        options: [
          {
            id: "c02-n2-best",
            text: "Clear the patient, deliver shock, then immediately resume CPR starting with compressions",
            quality: "best",
            next: "c02-n3",
            feedback:
              "Correct. Shock then CPR\u2014do not delay for pulse checks.",
          },
          {
            id: "c02-n2-wrong",
            text: "Check a pulse for a full minute before shocking",
            quality: "incorrect",
            next: "c02-n3",
            feedback:
              "Follow AED prompts promptly.",
            delayedCritical: true,
          },
          {
            id: "c02-n2-bad",
            text: "Shock while a rescuer is still touching the patient",
            quality: "harmful",
            next: "c02-n3",
            feedback:
              "Clear before defibrillation.",
          },
          {
            id: "c02-n2-acc",
            text: "Clear, shock, resume compressions for about 2 minutes until next analyze",
            quality: "acceptable",
            next: "c02-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c02-n3",
        prompt: "During CPR the AED says 'no shock advised.' What now?",
        options: [
          {
            id: "c02-n3-best",
            text: "Immediately resume high-quality CPR; treat reversible issues as able; continue cycles",
            quality: "best",
            next: "c02-n4",
            feedback:
              "Correct. No-shock means continue CPR and ALS care\u2014not a reason to stop.",
          },
          {
            id: "c02-n3-bad",
            text: "Stop all resuscitation because no shock was advised",
            quality: "harmful",
            next: "c02-n4",
            feedback:
              "Asystole/PEA still need CPR.",
          },
          {
            id: "c02-n3-wrong",
            text: "Deliver a shock anyway against AED guidance",
            quality: "harmful",
            next: "c02-n4",
            feedback:
              "Do not override 'no shock' with unsynchronized guessing.",
          },
          {
            id: "c02-n3-acc",
            text: "Resume CPR and prepare for ALS airway/vascular care",
            quality: "acceptable",
            next: "c02-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c02-n4",
        prompt: "After a shock and CPR, signs of life return (pulse, breathing). Next?",
        sceneUpdate: "Carotid pulse present; spontaneous respirations slow.",
        options: [
          {
            id: "c02-n4-best",
            text: "Support ABCs, oxygen/ventilations as needed, monitor closely for re-arrest, rapid transport",
            quality: "best",
            next: "end",
            feedback:
              "Correct. ROSC care is airway, oxygenation, perfusion support, and readiness to restart CPR.",
          },
          {
            id: "c02-n4-wrong",
            text: "Remove oxygen and walk him to the locker room",
            quality: "harmful",
            next: "end",
            feedback:
              "Post-arrest patients are unstable.",
          },
          {
            id: "c02-n4-bad",
            text: "Sit him up immediately for a sports drink",
            quality: "harmful",
            next: "end",
            feedback:
              "Risk of aspiration and hemodynamic collapse.",
          },
          {
            id: "c02-n4-acc",
            text: "Post-ROSC monitoring with AED left attached during transport prep",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "High-quality CPR + early AED",
      "Clear, shock if advised, immediate CPR",
      "If no shock: continue CPR cycles",
      "On ROSC: support ABCs and watch for re-arrest",
    ],
    keyTakeaway:
      "Arrest care is uninterrupted CPR and AED use\u2014shock when advised, CPR when not, and never stop for a 'no shock' message alone.",
  }),
  sc({
    id: "cardiac-03",
    title: "Symptomatic Bradycardia",
    category: "cardiac",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "81 y/o female, weakness and near-fainting. Caregiver says pulse is 'very slow.'",
    scene:
      "Assisted living apartment. Patient in chair. Caregiver present. No trauma.",
    presentation:
      "Pale, cool skin, dizzy when sitting forward. Alert but weak. Denies chest pain currently. Possible beta-blocker on med list.",
    vitals: { hr: 38, rr: 16, spo2: 94, bp: "78/50", skin: "pale, cool", gcs: "15" },
    startNodeId: "c03-n1",
    nodes: [
      {
        id: "c03-n1",
        prompt: "HR 38 with hypotension and poor perfusion. Best EMT framing?",
        options: [
          {
            id: "c03-n1-best",
            text: "Recognize symptomatic bradycardia: support ABCs, oxygen as needed, keep supine if tolerated, rapid ALS/transport\u2014EMTs do not pace or give rate meds unless protocolized",
            quality: "best",
            next: "c03-n2",
            feedback:
              "Correct. Identify instability and expedite advanced care.",
          },
          {
            id: "c03-n1-wrong",
            text: "Call it 'normal aging' and clear the call without transport",
            quality: "incorrect",
            next: "c03-n2",
            feedback:
              "Symptomatic bradycardia with shock signs is an emergency.",
            delayedCritical: true,
          },
          {
            id: "c03-n1-bad",
            text: "Have her stand and march in place to raise the rate",
            quality: "harmful",
            next: "c03-n2",
            feedback:
              "Standing may cause syncope.",
          },
          {
            id: "c03-n1-acc",
            text: "Supine, oxygen if indicated, request ALS",
            quality: "acceptable",
            next: "c03-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c03-n2",
        prompt: "While waiting for ALS she becomes confused and BP falls to 70/40. Priority?",
        vitals: { hr: 36, rr: 12, spo2: 91, bp: "70/40", gcs: "13" },
        options: [
          {
            id: "c03-n2-best",
            text: "Maintain airway, assist ventilations if needed, treat for shock, expedite movement/ALS",
            quality: "best",
            next: "c03-n3",
            feedback:
              "Correct. Worsening perfusion means escalate support and time to ALS/ED.",
          },
          {
            id: "c03-n2-wrong",
            text: "Start a long secondary head-to-toe before any movement",
            quality: "incorrect",
            next: "c03-n3",
            feedback:
              "Unstable patients need rapid packaging.",
            delayedCritical: true,
          },
          {
            id: "c03-n2-bad",
            text: "Give an invented dose of atropine from a friend's kit",
            quality: "harmful",
            next: "c03-n3",
            feedback:
              "Never invent doses or use unregulated meds.",
          },
          {
            id: "c03-n2-acc",
            text: "Airway readiness and high-priority transport toward ALS intercept",
            quality: "acceptable",
            next: "c03-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c03-n3",
        prompt: "She becomes unresponsive with a weak slow pulse and inadequate breathing. Next?",
        options: [
          {
            id: "c03-n3-best",
            text: "Open airway and assist ventilations; if pulse becomes absent, begin CPR/AED",
            quality: "best",
            next: "c03-n4",
            feedback:
              "Correct. Support breathing while pulse present; be ready for arrest.",
          },
          {
            id: "c03-n3-wrong",
            text: "Assume she is sleeping and stop assessments",
            quality: "harmful",
            next: "c03-n4",
            feedback:
              "Unresponsive + bradycardia needs active management.",
            delayedCritical: true,
          },
          {
            id: "c03-n3-bad",
            text: "Deliver an AED shock while a definite pulse is still present without analysis guidance",
            quality: "harmful",
            next: "c03-n4",
            feedback:
              "Do not shock a perfusing bradycardia.",
          },
          {
            id: "c03-n3-acc",
            text: "BVM support and continuous pulse checks",
            quality: "acceptable",
            next: "c03-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c03-n4",
        prompt: "Key handoff point to ALS/ED?",
        options: [
          {
            id: "c03-n4-best",
            text: "Report rate, signs of poor perfusion, interventions, and trends (mental status/BP)",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Symptomatic vs asymptomatic hinges on perfusion findings.",
          },
          {
            id: "c03-n4-wrong",
            text: "Only say 'old person tired' without vitals",
            quality: "incorrect",
            next: "end",
            feedback:
              "Rate and perfusion data are essential.",
          },
          {
            id: "c03-n4-bad",
            text: "Hide that she became unresponsive to avoid paperwork",
            quality: "harmful",
            next: "end",
            feedback:
              "Honesty in handoff is required.",
          },
          {
            id: "c03-n4-acc",
            text: "Concise SAMPLE plus bradycardia with hypotension timeline",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Identify symptomatic bradycardia and support ABCs",
      "If deteriorating: airway/shock care and rapid ALS",
      "Assist ventilations if needed; CPR if pulseless",
      "Handoff rate + perfusion trends",
    ],
    keyTakeaway:
      "Bradycardia matters when perfusion fails\u2014support ABCs and get ALS/ED care rather than inventing rate medications.",
  }),
  sc({
    id: "cardiac-04",
    title: "CHF vs ACS \u2014 EMT Differentiation",
    category: "cardiac",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "67 y/o male, shortness of breath and chest discomfort. History of MI and CHF.",
    scene:
      "Living room recliner. Wife present. Home meds include a diuretic and antiplatelet.",
    presentation:
      "Sitting bolt upright, bilateral crackles, mild frothy sputum, also reports pressure-like chest pain. Ankle edema present. Diaphoretic.",
    vitals: { hr: 112, rr: 28, spo2: 88, bp: "170/100", skin: "pale, sweaty", gcs: "15" },
    startNodeId: "c04-n1",
    nodes: [
      {
        id: "c04-n1",
        prompt: "Both ACS and CHF features are present. What should drive EMT priorities?",
        options: [
          {
            id: "c04-n1-best",
            text: "Treat the life threats you see: upright posture, oxygen for hypoxia, limit exertion, rapid ALS/ED\u2014do not delay for perfect labeling",
            quality: "best",
            next: "c04-n2",
            feedback:
              "Correct. Overlapping presentations are common; ABCs and transport matter most at EMT level.",
          },
          {
            id: "c04-n1-wrong",
            text: "Refuse care until you decide a single diagnosis with certainty",
            quality: "incorrect",
            next: "c04-n2",
            feedback:
              "EMTs manage presentations, not definitive labels.",
            delayedCritical: true,
          },
          {
            id: "c04-n1-bad",
            text: "Lay him flat to 'equalize' heart and lung problems",
            quality: "harmful",
            next: "c04-n2",
            feedback:
              "Flat position worsens pulmonary edema.",
          },
          {
            id: "c04-n1-acc",
            text: "Oxygen, upright, monitor, request ALS",
            quality: "acceptable",
            next: "c04-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c04-n2",
        prompt: "Which finding most supports a dominant pulmonary edema/CHF picture right now?",
        options: [
          {
            id: "c04-n2-best",
            text: "Orthopnea with wet crackles and frothy sputum plus hypoxia while upright",
            quality: "best",
            next: "c04-n3",
            feedback:
              "Correct. Those point strongly to fluid in the lungs.",
          },
          {
            id: "c04-n2-wrong",
            text: "A healed scar on his knee",
            quality: "incorrect",
            next: "c04-n3",
            feedback:
              "Irrelevant to the acute respiratory picture.",
          },
          {
            id: "c04-n2-bad",
            text: "Assuming crackles always mean pneumonia so you withhold oxygen",
            quality: "harmful",
            next: "c04-n3",
            feedback:
              "Hypoxia still needs oxygen.",
          },
          {
            id: "c04-n2-acc",
            text: "Hypertension with acute dyspnea and crackles in a known CHF patient",
            quality: "acceptable",
            next: "c04-n3",
            feedback:
              "Acceptable supporting picture.",
          },
        ],
      },
      {
        id: "c04-n3",
        prompt: "Chest pressure continues. Nitro assist consideration?",
        options: [
          {
            id: "c04-n3-best",
            text: "Follow protocol: assist prescribed nitro only if allowed and BP/contraindications OK; remember hypoxia and positioning remain first-line EMT care",
            quality: "best",
            next: "c04-n4",
            feedback:
              "Correct. Dual presentation still obeys protocol and ABC priorities.",
          },
          {
            id: "c04-n3-bad",
            text: "Invent a nitro dosing schedule because he 'looks like a textbook MI'",
            quality: "harmful",
            next: "c04-n4",
            feedback:
              "No invented doses.",
          },
          {
            id: "c04-n3-wrong",
            text: "Ignore SpO\u2082 88% to debate ACS vs CHF for ten minutes",
            quality: "incorrect",
            next: "c04-n4",
            feedback:
              "Oxygenate now.",
            delayedCritical: true,
          },
          {
            id: "c04-n3-acc",
            text: "Oxygen/upright care first; medication assist only per protocol",
            quality: "acceptable",
            next: "c04-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c04-n4",
        prompt: "Best transport framing?",
        options: [
          {
            id: "c04-n4-best",
            text: "Priority transport as undifferentiated cardiac/respiratory emergency with ongoing oxygen and monitoring",
            quality: "best",
            next: "end",
            feedback:
              "Correct. ED/ALS will refine the diagnosis.",
          },
          {
            id: "c04-n4-wrong",
            text: "Cancel ALS because you 'mostly think it is CHF'",
            quality: "incorrect",
            next: "end",
            feedback:
              "He remains unstable.",
          },
          {
            id: "c04-n4-bad",
            text: "Encourage him to shower before leaving",
            quality: "harmful",
            next: "end",
            feedback:
              "Delays care and risks collapse.",
          },
          {
            id: "c04-n4-acc",
            text: "Early notification describing both chest pain and pulmonary edema signs",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "ABCs/upright/oxygen without forcing a single label",
      "Use crackles/orthopnea/froth as CHF-leaning clues",
      "Med assists only per protocol after ABCs",
      "Priority transport as cardiac-respiratory emergency",
    ],
    keyTakeaway:
      "ACS and CHF often overlap\u2014treat hypoxia and perfusion threats first; perfect labeling is not required to act.",
  }),
  sc({
    id: "cardiac-05",
    title: "Syncope \u2014 Scene to Transport",
    category: "cardiac",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "42 y/o female fainted at church, now awake. Bystanders say brief seizure-like jerking.",
    scene:
      "Church aisle. Patient sitting on floor against a pew. Crowd controlled by ushers.",
    presentation:
      "Now alert, embarrassed, pale. Remembers standing then 'blacking out.' No incontinence. Denies ongoing chest pain. Slightly tachycardic.",
    vitals: { hr: 104, rr: 18, spo2: 98, bp: "100/68", skin: "pale", gcs: "15", glucose: "92" },
    startNodeId: "c05-n1",
    nodes: [
      {
        id: "c05-n1",
        prompt: "First priorities after scene safety?",
        options: [
          {
            id: "c05-n1-best",
            text: "ABCs, spinal considerations only if trauma mechanism, glucose check, history of prodrome, and cardiac risk screening",
            quality: "best",
            next: "c05-n2",
            feedback:
              "Correct. Syncope workup starts with life threats and causes you can find in the field.",
          },
          {
            id: "c05-n1-wrong",
            text: "Immediately full spinal immobilization solely because she fainted",
            quality: "incorrect",
            next: "c05-n2",
            feedback:
              "Syncope alone is not automatic spinal immobilization without trauma indicators.",
          },
          {
            id: "c05-n1-bad",
            text: "Have her stand quickly to prove she is fine",
            quality: "harmful",
            next: "c05-n2",
            feedback:
              "Risk of recurrent syncope.",
          },
          {
            id: "c05-n1-acc",
            text: "Keep supine/sitting supported while assessing ABCs and glucose",
            quality: "acceptable",
            next: "c05-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c05-n2",
        prompt: "Bystanders describe brief jerking after she hit the floor. Best interpretation at EMT level?",
        options: [
          {
            id: "c05-n2-best",
            text: "Treat as syncope with possible convulsive activity from hypoxia/hypotension\u2014still needs medical evaluation; do not dismiss as 'just a seizure' without assessment",
            quality: "best",
            next: "c05-n3",
            feedback:
              "Correct. Convulsive syncope happens; evaluate fully and transport.",
          },
          {
            id: "c05-n2-wrong",
            text: "Clear the scene without vitals because she is talking",
            quality: "incorrect",
            next: "c05-n3",
            feedback:
              "Syncope warrants evaluation.",
          },
          {
            id: "c05-n2-bad",
            text: "Force oral fluids while she is still pale and nauseated",
            quality: "harmful",
            next: "c05-n3",
            feedback:
              "Aspiration risk if she faints again.",
          },
          {
            id: "c05-n2-acc",
            text: "Document witness account and continue cardiac/neuro assessment",
            quality: "acceptable",
            next: "c05-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c05-n3",
        prompt: "She wants to refuse transport. Capacity and counseling?",
        options: [
          {
            id: "c05-n3-best",
            text: "Assess decision-making capacity, explain risks of cardiac syncope, encourage transport, involve medical control/protocol if refusing",
            quality: "best",
            next: "c05-n4",
            feedback:
              "Correct. Informed refusal requires capacity plus clear risk explanation.",
          },
          {
            id: "c05-n3-bad",
            text: "Forge her signature on a refusal and leave",
            quality: "harmful",
            next: "c05-n4",
            feedback:
              "Fraudulent and dangerous.",
          },
          {
            id: "c05-n3-wrong",
            text: "Physically force her onto the stretcher without legal/ethical basis",
            quality: "harmful",
            next: "c05-n4",
            feedback:
              "Alert refusing patients with capacity have rights\u2014use proper process.",
          },
          {
            id: "c05-n3-acc",
            text: "Strongly recommend ED evaluation for first-time syncope with unknown cause",
            quality: "acceptable",
            next: "c05-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c05-n4",
        prompt: "She agrees to go. En route BP is 88/56 and she feels like fainting again. Action?",
        vitals: { hr: 120, rr: 22, spo2: 96, bp: "88/56" },
        options: [
          {
            id: "c05-n4-best",
            text: "Supine, elevate legs if appropriate, oxygen as needed, treat for shock, update hospital, watch airway",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Recurrent near-syncope with hypotension is unstable.",
          },
          {
            id: "c05-n4-wrong",
            text: "Sit her fully upright for the view",
            quality: "harmful",
            next: "end",
            feedback:
              "Worsens cerebral perfusion.",
          },
          {
            id: "c05-n4-bad",
            text: "Ignore vitals because the church service is ending",
            quality: "incorrect",
            next: "end",
            feedback:
              "Reassess continuously.",
            delayedCritical: true,
          },
          {
            id: "c05-n4-acc",
            text: "Shock position as tolerated and rapid notification",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "ABCs, glucose, syncope history\u2014not automatic full spinal",
      "Don't dismiss convulsive syncope",
      "Capacity-based refusal counseling",
      "If hypotensive again: shock care and notify",
    ],
    keyTakeaway:
      "Syncope is a symptom\u2014rule out life threats, advise transport, and treat recurrent hypotension as an emergency.",
  }),
  sc({
    id: "cardiac-06",
    title: "ROSC Care Basics",
    category: "cardiac",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "You regain a pulse after AED shock and CPR on a 61 y/o male in a parking lot.",
    scene:
      "Store parking lot. Safe. ALS 5 minutes out. AED pads still on chest.",
    presentation:
      "Pulse present ~70, unresponsive, shallow irregular breathing. Skin mottled. No obvious trauma.",
    vitals: { hr: 70, rr: 6, spo2: 85, bp: "90/60", skin: "mottled", gcs: "3", etco2: "if available" },
    startNodeId: "c06-n1",
    nodes: [
      {
        id: "c06-n1",
        prompt: "Immediate post-ROSC priority?",
        options: [
          {
            id: "c06-n1-best",
            text: "Support airway and assist ventilations with oxygen; do not remove AED pads; prepare for possible re-arrest",
            quality: "best",
            next: "c06-n2",
            feedback:
              "Correct. Airway/breathing and readiness to restart CPR define early ROSC care.",
          },
          {
            id: "c06-n1-wrong",
            text: "Celebrate and stop all monitoring",
            quality: "incorrect",
            next: "c06-n2",
            feedback:
              "Re-arrest is common.",
            delayedCritical: true,
          },
          {
            id: "c06-n1-bad",
            text: "Sit him up and offer oral water",
            quality: "harmful",
            next: "c06-n2",
            feedback:
              "Unresponsive\u2014aspiration risk.",
          },
          {
            id: "c06-n1-acc",
            text: "BVM/oxygen and continuous pulse checks with pads left in place",
            quality: "acceptable",
            next: "c06-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c06-n2",
        prompt: "Ventilations are ongoing. BP 90/60. Best EMT supportive care?",
        options: [
          {
            id: "c06-n2-best",
            text: "Maintain oxygenation/ventilation, keep supine, gentle handling, rapid transport/ALS\u2014avoid hyperventilation",
            quality: "best",
            next: "c06-n3",
            feedback:
              "Correct. Stable support beats aggressive over-ventilation.",
          },
          {
            id: "c06-n2-bad",
            text: "Hyperventilate as fast as possible",
            quality: "harmful",
            next: "c06-n3",
            feedback:
              "Hyperventilation harms post-arrest hemodynamics.",
          },
          {
            id: "c06-n2-wrong",
            text: "Delay transport to deep-clean the ambulance first",
            quality: "incorrect",
            next: "c06-n3",
            feedback:
              "Move toward definitive care.",
            delayedCritical: true,
          },
          {
            id: "c06-n2-acc",
            text: "Controlled ventilations and urgent ALS intercept",
            quality: "acceptable",
            next: "c06-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c06-n3",
        prompt: "Pulse suddenly disappears again. Action?",
        sceneUpdate: "Carotid pulse absent; no breathing.",
        options: [
          {
            id: "c06-n3-best",
            text: "Resume high-quality CPR and use the AED as indicated",
            quality: "best",
            next: "c06-n4",
            feedback:
              "Correct. Return to arrest algorithm immediately.",
          },
          {
            id: "c06-n3-wrong",
            text: "Wait three minutes to 'see if the pulse comes back'",
            quality: "incorrect",
            next: "c06-n4",
            feedback:
              "Start CPR now.",
            delayedCritical: true,
          },
          {
            id: "c06-n3-bad",
            text: "Pour water on the chest instead of compressing",
            quality: "harmful",
            next: "c06-n4",
            feedback:
              "Not a resuscitation method.",
          },
          {
            id: "c06-n3-acc",
            text: "CPR + AED analyze/shock sequence again",
            quality: "acceptable",
            next: "c06-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c06-n4",
        prompt: "After another shock, ROSC returns. Transport note?",
        options: [
          {
            id: "c06-n4-best",
            text: "Notify receiving facility of arrest-to-ROSC timeline, shocks, and current ABCs; continue close monitoring",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Clear timelines help ED post-arrest care.",
          },
          {
            id: "c06-n4-wrong",
            text: "Omit that he re-arrested to keep the report short",
            quality: "harmful",
            next: "end",
            feedback:
              "Critical information must be reported.",
          },
          {
            id: "c06-n4-bad",
            text: "Remove pads so the ED can 'start fresh' without history",
            quality: "incorrect",
            next: "end",
            feedback:
              "Leave pads on unless directed otherwise; communicate care given.",
          },
          {
            id: "c06-n4-acc",
            text: "Concise ROSC handoff with ongoing ventilatory support",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Airway/ventilation support; keep AED ready",
      "Avoid hyperventilation; rapid ALS/ED",
      "If re-arrest: immediate CPR/AED",
      "Report arrest timeline accurately",
    ],
    keyTakeaway:
      "ROSC is unstable\u2014oxygenate carefully, watch for re-arrest, and hand off a clear resuscitation timeline.",
  }),
  sc({
    id: "cardiac-07",
    title: "AED Shockable vs Continue CPR",
    category: "cardiac",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "Nursing home, cardiac arrest. Staff performing CPR. AED connected by your partner.",
    scene:
      "Resident room. Clear space. Staff rotating compressors. ALS en route.",
    presentation:
      "Elderly male, pulseless, apneic. CPR in progress with visible chest recoil coached.",
    vitals: { hr: "none", rr: "none", spo2: "n/a", bp: "unobtainable", gcs: "3" },
    startNodeId: "c07-n1",
    nodes: [
      {
        id: "c07-n1",
        prompt: "AED charges for a shock. Team coordination?",
        options: [
          {
            id: "c07-n1-best",
            text: "Pause compressions briefly only to clear and shock, then resume compressions immediately",
            quality: "best",
            next: "c07-n2",
            feedback:
              "Correct. Minimize the pause around defibrillation.",
          },
          {
            id: "c07-n1-wrong",
            text: "Take a prolonged break to discuss lunch after the shock tone",
            quality: "incorrect",
            next: "c07-n2",
            feedback:
              "Long pauses kill.",
            delayedCritical: true,
          },
          {
            id: "c07-n1-bad",
            text: "Shock without clearing because CPR is 'more important'",
            quality: "harmful",
            next: "c07-n2",
            feedback:
              "Rescuers must be clear of the patient for the shock.",
          },
          {
            id: "c07-n1-acc",
            text: "Clear, shock, compressions within seconds",
            quality: "acceptable",
            next: "c07-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c07-n2",
        prompt: "Next analyze: 'No shock advised.' Correct understanding?",
        options: [
          {
            id: "c07-n2-best",
            text: "Resume CPR immediately\u2014nonshockable rhythms still require high-quality compressions and ventilations",
            quality: "best",
            next: "c07-n3",
            feedback:
              "Correct. No shock \u2260 stop.",
          },
          {
            id: "c07-n2-bad",
            text: "End the code solely because the AED will not shock",
            quality: "harmful",
            next: "c07-n3",
            feedback:
              "Continue CPR until ROSC, valid termination order, or transfer of care.",
          },
          {
            id: "c07-n2-wrong",
            text: "Deliver three stacked shocks against the prompt",
            quality: "harmful",
            next: "c07-n3",
            feedback:
              "Follow AED guidance.",
          },
          {
            id: "c07-n2-acc",
            text: "CPR for ~2 minutes then reanalyze",
            quality: "acceptable",
            next: "c07-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c07-n3",
        prompt: "Compressions look shallow and too slow. Coaching?",
        options: [
          {
            id: "c07-n3-best",
            text: "Coach rate ~100\u2013120, depth ~2 inches adult, full recoil, minimize interruptions, rotate compressors",
            quality: "best",
            next: "c07-n4",
            feedback:
              "Correct. Quality metrics matter as much as the algorithm.",
          },
          {
            id: "c07-n3-wrong",
            text: "Say nothing because criticism is rude",
            quality: "incorrect",
            next: "c07-n4",
            feedback:
              "Patient-centered coaching is required.",
          },
          {
            id: "c07-n3-bad",
            text: "Order compressions at 40/min to 'rest the heart'",
            quality: "harmful",
            next: "c07-n4",
            feedback:
              "Too slow is ineffective.",
          },
          {
            id: "c07-n3-acc",
            text: "Rotate every 2 minutes and correct depth/recoil in real time",
            quality: "acceptable",
            next: "c07-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "c07-n4",
        prompt: "AED again advises shock. You notice a medication patch under a pad site. Action?",
        options: [
          {
            id: "c07-n4-best",
            text: "If safe and does not cause a long delay, remove the patch and wipe the area, then apply pad and shock as advised",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Patches can interfere with pads/energy\u2014address quickly without abandoning the algorithm.",
          },
          {
            id: "c07-n4-wrong",
            text: "Never shock again because a patch exists, even after removal is possible",
            quality: "incorrect",
            next: "end",
            feedback:
              "Remove/wipe and proceed.",
            delayedCritical: true,
          },
          {
            id: "c07-n4-bad",
            text: "Shock through a thick pool of water on the chest without drying",
            quality: "harmful",
            next: "end",
            feedback:
              "Dry the chest; avoid shocking in standing water hazards.",
          },
          {
            id: "c07-n4-acc",
            text: "Quickly move pad to an appropriate dry area if patch cannot be removed instantly",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable alternative.",
          },
        ],
      },
    ],
    correctSequence: [
      "Clear-shock-CPR with minimal pause",
      "No shock \u2192 continue CPR",
      "Coach high-quality compressions",
      "Address patches/wet chest quickly, then defibrillate if advised",
    ],
    keyTakeaway:
      "Shock when the AED advises; when it does not, high-quality CPR continues without delay.",
  }),
];
