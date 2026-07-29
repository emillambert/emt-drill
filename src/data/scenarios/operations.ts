import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const operationsScenarios: Scenario[] = [
  sc({
    id: "operations-01",
    title: "Ambulance Positioning & Scene Safety",
    category: "operations",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "MVC on a two-lane highway, unknown injuries. PD ETA 5 minutes.",
    scene:
      "Daytime. Moderate traffic. Disabled vehicle in the right lane. You are first EMS unit.",
    presentation:
      "From approach: vehicle with rear damage, occupants still inside, traffic streaming past.",
    startNodeId: "ops01-n1",
    nodes: [
      {
        id: "ops01-n1",
        prompt: "Where should you position the ambulance initially?",
        options: [
          {
            id: "ops01-n1-best",
            text: "Uphill/upwind when relevant, create a protective barrier (fend-off position) between traffic and the work area, leave egress, use lights thoughtfully",
            quality: "best",
            next: "ops01-n2",
            feedback:
              "Correct. Position to shield providers and patients while preserving an exit path.",
          },
          {
            id: "ops01-n1-ok",
            text: "Park in a blind curve on the opposite shoulder with no warning to traffic",
            quality: "harmful",
            next: "ops01-n2",
            feedback:
              "Poor positioning invites secondary crashes.",
            delayedCritical: true,
          },
          {
            id: "ops01-n1-bad",
            text: "Block both directions completely without coordinating with PD when alternatives exist",
            quality: "incorrect",
            next: "ops01-n2",
            feedback:
              "Coordinate traffic control; avoid creating worse hazards when possible.",
          },
          {
            id: "ops01-n1-wrong",
            text: "Leave the ambulance in drive unattended in the travel lane",
            quality: "harmful",
            next: "ops01-n2",
            feedback:
              "Secure the vehicle; never leave it uncontrolled in traffic.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops01-n2",
        prompt: "Before exiting into traffic, what personal protective action is essential?",
        options: [
          {
            id: "ops01-n2-best",
            text: "High-visibility ANSI/ISEA class vest/jacket as required, eyewear as needed, scan for traffic, exit away from moving lanes when possible",
            quality: "best",
            next: "ops01-n3",
            feedback:
              "Correct. Visibility and traffic awareness reduce struck-by injuries.",
          },
          {
            id: "ops01-n2-ok",
            text: "Dark clothing at dusk with earbuds in both ears",
            quality: "harmful",
            next: "ops01-n3",
            feedback:
              "Stay visible and able to hear hazards.",
            delayedCritical: true,
          },
          {
            id: "ops01-n2-bad",
            text: "Stand in the active lane to 'slow traffic with hand signals' alone without training/authority",
            quality: "incorrect",
            next: "ops01-n3",
            feedback:
              "Use proper traffic control resources; do not improvise in live lanes.",
          },
          {
            id: "ops01-n2-wrong",
            text: "Ignore oncoming traffic once parked",
            quality: "incorrect",
            next: "ops01-n3",
            feedback:
              "Situational awareness continues for the whole call.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops01-n3",
        prompt: "A second vehicle nearly hits your unit. Best operational response?",
        options: [
          {
            id: "ops01-n3-best",
            text: "Increase scene protection: request PD/DOT for traffic control, adjust positioning if safe, keep personnel out of live lanes",
            quality: "best",
            next: "ops01-n4",
            feedback:
              "Correct. Escalate traffic control rather than accepting ongoing struck-by risk.",
          },
          {
            id: "ops01-n3-ok",
            text: "Chase the near-miss driver personally",
            quality: "harmful",
            next: "ops01-n4",
            feedback:
              "Do not abandon the scene or create new hazards.",
            delayedCritical: true,
          },
          {
            id: "ops01-n3-bad",
            text: "Move all patients into the travel lane for 'visibility'",
            quality: "harmful",
            next: "ops01-n4",
            feedback:
              "Keep patients and providers in the protected work zone.",
            delayedCritical: true,
          },
          {
            id: "ops01-n3-wrong",
            text: "Turn off all lights so traffic 'won't notice you'",
            quality: "incorrect",
            next: "ops01-n4",
            feedback:
              "Use lighting per SOP to warn traffic while avoiding unnecessary dazzle.",
          },
        ],
      },
      {
        id: "ops01-n4",
        prompt: "Key principle of ambulance operations on roadways?",
        options: [
          {
            id: "ops01-n4-best",
            text: "Your crew's safety enables patient care — never trade provider safety for a few seconds of access",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Safe positioning and PPE are part of EMS operations, not optional extras.",
          },
          {
            id: "ops01-n4-ok",
            text: "Speed of parking matters more than barrier protection",
            quality: "incorrect",
            next: "end",
            feedback:
              "Deliberate protective positioning comes first.",
          },
          {
            id: "ops01-n4-bad",
            text: "Highway calls never need reflective vests",
            quality: "incorrect",
            next: "end",
            feedback:
              "High-visibility apparel is standard for traffic incidents.",
          },
          {
            id: "ops01-n4-wrong",
            text: "Only fire apparatus can create a block — ambulances never consider positioning",
            quality: "incorrect",
            next: "end",
            feedback:
              "Ambulances also position for safety within their role.",
          },
        ],
      },
    ],
    correctSequence: [
      "Park to create a protective barrier with egress",
      "Wear high-visibility PPE; scan traffic",
      "Escalate traffic control if struck-by risk persists",
      "Provider safety enables care",
    ],
    keyTakeaway:
      "On roadways, position the ambulance as a shield, wear high-visibility gear, and never work casually in live lanes.",
  }),

  sc({
    id: "operations-02",
    title: "START Triage Basics",
    category: "operations",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Bus vs. truck MCI. Multiple casualties. You are assigned triage.",
    scene:
      "Highway shoulder. Command establishing. More than 10 patients visible. Limited initial resources.",
    presentation:
      "You must rapidly categorize patients using START (Simple Triage and Rapid Treatment) concepts.",
    startNodeId: "ops02-n1",
    nodes: [
      {
        id: "ops02-n1",
        prompt:
          "First START action for ambulatory patients who can walk to a designated area?",
        options: [
          {
            id: "ops02-n1-best",
            text: "Direct walking wounded to a green (minor) area for later assessment",
            quality: "best",
            next: "ops02-n2",
            feedback:
              "Correct. Ability to walk initially sorts many patients as minor (green) for delayed care.",
          },
          {
            id: "ops02-n1-ok",
            text: "Declare every walking patient expectant (black) automatically",
            quality: "incorrect",
            next: "ops02-n2",
            feedback:
              "Walking wounded are typically minor, not expectant.",
          },
          {
            id: "ops02-n1-bad",
            text: "Provide a full secondary exam to each walker before moving anyone",
            quality: "incorrect",
            next: "ops02-n2",
            feedback:
              "START is rapid — detailed exams come later.",
            delayedCritical: true,
          },
          {
            id: "ops02-n1-wrong",
            text: "Ignore all walking patients forever",
            quality: "incorrect",
            next: "ops02-n2",
            feedback:
              "They still need later assessment and may worsen.",
          },
        ],
      },
      {
        id: "ops02-n2",
        prompt:
          "Non-walking adult: not breathing. After airway opened, still apneic. START category?",
        options: [
          {
            id: "ops02-n2-best",
            text: "Expectant / deceased (black) in START adult algorithm when apnea persists after airway positioning",
            quality: "best",
            next: "ops02-n3",
            feedback:
              "Correct. In START, persistent apnea after simple airway opening is black/expectant when resources are overwhelmed.",
          },
          {
            id: "ops02-n2-ok",
            text: "Immediate (red) and begin prolonged single-patient ALS on scene while ignoring others",
            quality: "incorrect",
            next: "ops02-n3",
            feedback:
              "MCI triage limits initial care so more salvageable patients can be reached.",
            delayedCritical: true,
          },
          {
            id: "ops02-n2-bad",
            text: "Minor (green)",
            quality: "incorrect",
            next: "ops02-n3",
            feedback:
              "Apnea is never minor.",
          },
          {
            id: "ops02-n2-wrong",
            text: "Delayed (yellow) without checking breathing",
            quality: "incorrect",
            next: "ops02-n3",
            feedback:
              "Breathing assessment is required in START.",
          },
        ],
      },
      {
        id: "ops02-n3",
        prompt:
          "Adult: breathing >30/min after airway check, or radial pulse absent / CRT >2 sec, or cannot follow commands. Category?",
        options: [
          {
            id: "ops02-n3-best",
            text: "Immediate (red)",
            quality: "best",
            next: "ops02-n4",
            feedback:
              "Correct. RPM failures (Respirations, Perfusion, Mental status) triage to immediate.",
          },
          {
            id: "ops02-n3-ok",
            text: "Minor (green)",
            quality: "incorrect",
            next: "ops02-n4",
            feedback:
              "These findings indicate immediate priority.",
          },
          {
            id: "ops02-n3-bad",
            text: "No category — START does not use mental status",
            quality: "incorrect",
            next: "ops02-n4",
            feedback:
              "Ability to follow commands is part of START mental-status check.",
          },
          {
            id: "ops02-n3-wrong",
            text: "Automatically black regardless of breathing",
            quality: "incorrect",
            next: "ops02-n4",
            feedback:
              "Breathing patients with RPM failure are red, not black.",
          },
        ],
      },
      {
        id: "ops02-n4",
        prompt: "Adult who cannot walk but has normal RPM — category?",
        options: [
          {
            id: "ops02-n4-best",
            text: "Delayed (yellow)",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Non-ambulatory with adequate RPM is delayed.",
          },
          {
            id: "ops02-n4-ok",
            text: "Immediate (red) solely because they cannot walk",
            quality: "incorrect",
            next: "end",
            feedback:
              "Inability to walk alone does not equal red if RPM is intact.",
          },
          {
            id: "ops02-n4-bad",
            text: "Expectant (black)",
            quality: "incorrect",
            next: "end",
            feedback:
              "Intact RPM means delayed, not expectant.",
          },
          {
            id: "ops02-n4-wrong",
            text: "Skip tagging to save time",
            quality: "incorrect",
            next: "end",
            feedback:
              "Tagging communicates priority to the next providers.",
            delayedCritical: true,
          },
        ],
      },
    ],
    correctSequence: [
      "Send walking wounded to green",
      "Persistent apnea after airway → black in START",
      "RPM failure → red",
      "Non-walker with intact RPM → yellow",
    ],
    keyTakeaway:
      "START sorts by walk → breathe → RPM so limited rescuers help the most salvageable patients first.",
  }),

  sc({
    id: "operations-03",
    title: "Landing Zone Basics",
    category: "operations",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Critical trauma patient; air medical requested. You are asked to set up an LZ.",
    scene:
      "Rural field near a two-lane road at dusk. Wires along the road. Soft ground in one corner.",
    presentation:
      "Patient packaging ongoing. Helicopter 8 minutes out. You must brief and prepare the LZ.",
    startNodeId: "ops03-n1",
    nodes: [
      {
        id: "ops03-n1",
        prompt: "Ideal LZ characteristics for a helicopter?",
        options: [
          {
            id: "ops03-n1-best",
            text: "Level, firm, free of wires/debris/loose objects, adequate size, marked, with wind direction known and radio contact",
            quality: "best",
            next: "ops03-n2",
            feedback:
              "Correct. Safe LZs are clear, marked, and communicated to the aircraft.",
          },
          {
            id: "ops03-n1-ok",
            text: "Directly under power lines for easy landmarking",
            quality: "harmful",
            next: "ops03-n2",
            feedback:
              "Wires are a leading LZ hazard — avoid them.",
            delayedCritical: true,
          },
          {
            id: "ops03-n1-bad",
            text: "A soft muddy depression filled with loose trash",
            quality: "harmful",
            next: "ops03-n2",
            feedback:
              "Debris becomes projectiles; soft ground risks dynamic rollover/settling issues.",
            delayedCritical: true,
          },
          {
            id: "ops03-n1-wrong",
            text: "Any driveway regardless of obstacles because helicopters can 'hover forever'",
            quality: "incorrect",
            next: "ops03-n2",
            feedback:
              "Choose an appropriate site; do not assume the aircraft can safely ignore hazards.",
          },
        ],
      },
      {
        id: "ops03-n2",
        prompt: "As the aircraft approaches, how should ground personnel behave?",
        options: [
          {
            id: "ops03-n2-best",
            text: "Secure loose items, stay clear of the rotor disc unless directed, approach only when signaled — usually from the front/downhill as instructed",
            quality: "best",
            next: "ops03-n3",
            feedback:
              "Correct. Never approach without crew direction; protect against rotor wash and blades.",
          },
          {
            id: "ops03-n2-ok",
            text: "Run under the tail rotor to 'help faster'",
            quality: "harmful",
            next: "ops03-n3",
            feedback:
              "Tail rotor strikes are deadly — never approach from the rear.",
            delayedCritical: true,
          },
          {
            id: "ops03-n2-bad",
            text: "Hold IV poles and blankets high overhead in rotor wash",
            quality: "harmful",
            next: "ops03-n3",
            feedback:
              "Secure and lower equipment; loose objects fly.",
            delayedCritical: true,
          },
          {
            id: "ops03-n2-wrong",
            text: "Shine lasers or high-beam lights into the cockpit",
            quality: "harmful",
            next: "ops03-n3",
            feedback:
              "Do not blind the pilots; mark the LZ appropriately.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops03-n3",
        prompt: "What information is most useful in an LZ radio brief?",
        options: [
          {
            id: "ops03-n3-best",
            text: "Location description, LZ hazards (wires/trees/slope), wind, patient weight/status summary, and how the LZ is marked",
            quality: "best",
            next: "ops03-n4",
            feedback:
              "Correct. Pilots need hazards and wind as much as patient details.",
          },
          {
            id: "ops03-n3-ok",
            text: "Only the patient's favorite sports team",
            quality: "incorrect",
            next: "ops03-n4",
            feedback:
              "Keep the brief operational and clinical.",
          },
          {
            id: "ops03-n3-bad",
            text: "Hide wire hazards so the crew is not 'worried'",
            quality: "harmful",
            next: "ops03-n4",
            feedback:
              "Always disclose hazards.",
            delayedCritical: true,
          },
          {
            id: "ops03-n3-wrong",
            text: "No radio contact is needed if you can wave",
            quality: "incorrect",
            next: "ops03-n4",
            feedback:
              "Establish communications with the aircraft/command.",
          },
        ],
      },
      {
        id: "ops03-n4",
        prompt: "Patient loaded; aircraft departing. Your role?",
        options: [
          {
            id: "ops03-n4-best",
            text: "Keep personnel clear until rotors are safe/aircraft departed; secure the scene; complete documentation and ground transport tasks as assigned",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Stay clear during departure — rotor hazards remain.",
          },
          {
            id: "ops03-n4-ok",
            text: "Stand directly behind the tail to 'feel the wind'",
            quality: "harmful",
            next: "end",
            feedback:
              "Never occupy the tail-rotor area.",
            delayedCritical: true,
          },
          {
            id: "ops03-n4-bad",
            text: "Chase the helicopter in a personal vehicle down the highway",
            quality: "incorrect",
            next: "end",
            feedback:
              "Unnecessary and dangerous.",
          },
          {
            id: "ops03-n4-wrong",
            text: "Leave loose scene tape and trash for the next rotor wash event",
            quality: "incorrect",
            next: "end",
            feedback:
              "Police the LZ of debris.",
          },
        ],
      },
    ],
    correctSequence: [
      "Select clear, level, marked LZ away from wires",
      "Approach aircraft only when directed; never via tail",
      "Brief hazards, wind, marking, patient summary",
      "Stay clear during departure",
    ],
    keyTakeaway:
      "LZ safety: clear hazards, mark and brief the site, and never approach the aircraft without crew direction.",
  }),

  sc({
    id: "operations-04",
    title: "Radio Report Structure",
    category: "operations",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "You are transporting a stroke alert candidate. Hospital asks for a radio report.",
    scene:
      "En route, lights and siren. Partner driving. You have a concise patient summary ready.",
    presentation:
      "72 y/o female, last known well 45 minutes ago, right-sided weakness, speech difficulty, SpO₂ 97% on O₂, BP 178/96, glucose checked normal per protocol.",
    vitals: {
      hr: 88,
      rr: 16,
      spo2: 97,
      bp: "178/96",
      glucose: "normal range",
      gcs: "14",
    },
    startNodeId: "ops04-n1",
    nodes: [
      {
        id: "ops04-n1",
        prompt: "Best opening for a hospital radio report?",
        options: [
          {
            id: "ops04-n1-best",
            text: "Identify unit, ETA, age/sex, chief concern, and priority (e.g., possible stroke alert)",
            quality: "best",
            next: "ops04-n2",
            feedback:
              "Correct. Lead with who you are, when you arrive, and why it matters.",
          },
          {
            id: "ops04-n1-ok",
            text: "Read the entire PCR including billing address first",
            quality: "incorrect",
            next: "ops04-n2",
            feedback:
              "Keep radio reports concise and clinical.",
          },
          {
            id: "ops04-n1-bad",
            text: "Use the patient's full name and Social Security number on an open channel",
            quality: "incorrect",
            next: "ops04-n2",
            feedback:
              "Minimize unnecessary identifiers on radio; share what is needed for care.",
            delayedCritical: true,
          },
          {
            id: "ops04-n1-wrong",
            text: "Say nothing because 'they will see us soon'",
            quality: "incorrect",
            next: "ops04-n2",
            feedback:
              "Early notification prepares stroke resources.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops04-n2",
        prompt: "Which clinical content is most important next?",
        options: [
          {
            id: "ops04-n2-best",
            text: "Last known well time, key neuro deficits, pertinent vitals/glucose, treatments, and current trends",
            quality: "best",
            next: "ops04-n3",
            feedback:
              "Correct. Time last known well and deficit pattern drive stroke preparation.",
          },
          {
            id: "ops04-n2-ok",
            text: "Only that the patient 'looks sick' with no details",
            quality: "incorrect",
            next: "ops04-n3",
            feedback:
              "Specific findings enable team readiness.",
          },
          {
            id: "ops04-n2-bad",
            text: "A 10-minute story about traffic with no patient data",
            quality: "incorrect",
            next: "ops04-n3",
            feedback:
              "Stay on clinical content.",
          },
          {
            id: "ops04-n2-wrong",
            text: "Guess a definitive hospital diagnosis as fact",
            quality: "incorrect",
            next: "ops04-n3",
            feedback:
              "Report findings and suspected stroke signs — not overconfident labels.",
          },
        ],
      },
      {
        id: "ops04-n3",
        prompt: "Radio traffic is congested. How do you keep the report effective?",
        options: [
          {
            id: "ops04-n3-best",
            text: "Be brief, pause for questions, confirm receipt of critical elements (ETA, LKW, deficits)",
            quality: "best",
            next: "ops04-n4",
            feedback:
              "Correct. Clarity beats length on a busy channel.",
          },
          {
            id: "ops04-n3-ok",
            text: "Shout continuously without listening for acknowledgment",
            quality: "incorrect",
            next: "ops04-n4",
            feedback:
              "Listen for confirmation and questions.",
          },
          {
            id: "ops04-n3-bad",
            text: "Use unprofessional codes or jokes about the patient",
            quality: "incorrect",
            next: "ops04-n4",
            feedback:
              "Remain professional — others can hear.",
          },
          {
            id: "ops04-n3-wrong",
            text: "Invent vital signs you did not measure",
            quality: "harmful",
            next: "ops04-n4",
            feedback:
              "Never fabricate clinical data.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops04-n4",
        prompt: "After the radio report, what still matters at bedside handoff?",
        options: [
          {
            id: "ops04-n4-best",
            text: "Update any changes since the radio call and give a structured face-to-face MIST/SAMPLE-style handoff",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Radio reports can go stale — close the loop in person.",
          },
          {
            id: "ops04-n4-ok",
            text: "Leave without speaking because radio already happened",
            quality: "incorrect",
            next: "end",
            feedback:
              "Bedside handoff remains essential.",
            delayedCritical: true,
          },
          {
            id: "ops04-n4-bad",
            text: "Contradict your report with unrelated speculation",
            quality: "incorrect",
            next: "end",
            feedback:
              "Be consistent and accurate.",
          },
          {
            id: "ops04-n4-wrong",
            text: "Hide medications you assisted with",
            quality: "harmful",
            next: "end",
            feedback:
              "Always report treatments and times.",
            delayedCritical: true,
          },
        ],
      },
    ],
    correctSequence: [
      "Open with unit, ETA, demographics, priority",
      "Give LKW, deficits, vitals/glucose, treatments",
      "Keep it brief; confirm critical items",
      "Update changes at bedside handoff",
    ],
    keyTakeaway:
      "Radio reports: unit/ETA/priority first, then time-critical clinical facts — update again at the bedside.",
  }),

  sc({
    id: "operations-05",
    title: "BSI and Infection Control",
    category: "operations",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "Unresponsive patient with possible overdose. Vomitus on clothing. Unknown medical history.",
    scene:
      "Small bathroom. Limited space. Fluid on floor. Partner preparing suction.",
    presentation:
      "Gurgling respirations, soiled airway, needle paraphernalia nearby.",
    startNodeId: "ops05-n1",
    nodes: [
      {
        id: "ops05-n1",
        prompt: "Before patient contact, what BSI is most appropriate?",
        options: [
          {
            id: "ops05-n1-best",
            text: "Gloves at minimum; add eye protection/mask/gown as exposure risk rises (splash, airway, blood)",
            quality: "best",
            next: "ops05-n2",
            feedback:
              "Correct. Scale PPE to the task and exposure risk.",
          },
          {
            id: "ops05-n1-ok",
            text: "No gloves because you 'know this patient'",
            quality: "harmful",
            next: "ops05-n2",
            feedback:
              "BSI is not optional based on familiarity.",
            delayedCritical: true,
          },
          {
            id: "ops05-n1-bad",
            text: "Reuse blood-soiled gloves between patients without changing",
            quality: "harmful",
            next: "ops05-n2",
            feedback:
              "Change contaminated gloves; avoid cross-contamination.",
            delayedCritical: true,
          },
          {
            id: "ops05-n1-wrong",
            text: "Only wash hands after needlesticks, never before care",
            quality: "incorrect",
            next: "ops05-n2",
            feedback:
              "Hand hygiene belongs before and after patient contact.",
          },
        ],
      },
      {
        id: "ops05-n2",
        prompt: "You sustain a needlestick from debris while moving the patient. Immediate action?",
        options: [
          {
            id: "ops05-n2-best",
            text: "Encourage bleeding, wash with soap and water, notify supervisor/designated officer, seek medical evaluation per exposure plan",
            quality: "best",
            next: "ops05-n3",
            feedback:
              "Correct. Follow the agency exposure-control plan promptly.",
          },
          {
            id: "ops05-n2-ok",
            text: "Ignore it and tell no one",
            quality: "harmful",
            next: "ops05-n3",
            feedback:
              "Unreported exposures delay prophylaxis and documentation.",
            delayedCritical: true,
          },
          {
            id: "ops05-n2-bad",
            text: "Suck the wound and continue without washing",
            quality: "harmful",
            next: "ops05-n3",
            feedback:
              "Do not suck wounds; wash and report.",
            delayedCritical: true,
          },
          {
            id: "ops05-n2-wrong",
            text: "Throw the needle into the regular trash unmarked",
            quality: "harmful",
            next: "ops05-n3",
            feedback:
              "Use sharps containers; never loose sharps in trash.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops05-n3",
        prompt: "After the call, infection-control priorities include:",
        options: [
          {
            id: "ops05-n3-best",
            text: "Remove PPE correctly, hand hygiene, disinfect equipment/surfaces, bag contaminated linen per policy",
            quality: "best",
            next: "ops05-n4",
            feedback:
              "Correct. Post-call decontamination protects the next patient and crew.",
          },
          {
            id: "ops05-n3-ok",
            text: "Wipe blood with a dry napkin only and skip disinfection",
            quality: "incorrect",
            next: "ops05-n4",
            feedback:
              "Use proper EPA-appropriate disinfectants per policy.",
          },
          {
            id: "ops05-n3-bad",
            text: "Wear the same gloves to write the report, eat, and hug family",
            quality: "harmful",
            next: "ops05-n4",
            feedback:
              "Remove PPE before leaving the clinical workspace.",
            delayedCritical: true,
          },
          {
            id: "ops05-n3-wrong",
            text: "Store used sharps in a pants pocket for later",
            quality: "harmful",
            next: "ops05-n4",
            feedback:
              "Immediate sharps disposal only.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "ops05-n4",
        prompt: "Core BSI principle for EMTs?",
        options: [
          {
            id: "ops05-n4-best",
            text: "Assume every patient can transmit infection — use standard precautions consistently",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Standard precautions protect you and your patients on every call.",
          },
          {
            id: "ops05-n4-ok",
            text: "PPE only for patients who 'look infectious'",
            quality: "incorrect",
            next: "end",
            feedback:
              "Many infections are not obvious — use standard precautions always.",
          },
          {
            id: "ops05-n4-bad",
            text: "Hand hygiene is outdated",
            quality: "incorrect",
            next: "end",
            feedback:
              "Hand hygiene remains foundational.",
          },
          {
            id: "ops05-n4-wrong",
            text: "Only ALS providers need exposure plans",
            quality: "incorrect",
            next: "end",
            feedback:
              "All EMS personnel follow exposure-control policies.",
          },
        ],
      },
    ],
    correctSequence: [
      "Scale PPE to exposure risk",
      "Report and care for needlesticks per plan",
      "Decontaminate and doff PPE correctly after the call",
      "Use standard precautions every time",
    ],
    keyTakeaway:
      "BSI is standard precautions on every call — right PPE, careful sharps handling, and post-call disinfection.",
  }),
];
