import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const traumaScenarios: Scenario[] = [
  sc({
    id: "trauma-01",
    title: "External Hemorrhage Control",
    category: "trauma",
    difficulty: "foundational",
    source: NATIONAL,
    dispatch:
      "Industrial accident, severe bleeding from arm laceration. Conscious on arrival.",
    scene:
      "Warehouse floor. Machine stopped. PPE on. Bright red bleeding from upper arm wound. Coworker applying random paper towels.",
    presentation:
      "Alert, anxious, blood-soaked sleeve. Spurting bleeding from medial upper arm. Distal pulse present but weak.",
    vitals: { hr: 120, rr: 22, spo2: 97, bp: "100/70", skin: "pale, diaphoretic", gcs: "15" },
    startNodeId: "t01-n1",
    nodes: [
      {
        id: "t01-n1",
        prompt: "After BSI/scene safety, immediate priority?",
        options: [
          {
            id: "t01-n1-best",
            text: "Expose the wound and apply direct pressure with a gloved hand/dressing\u2014control life-threatening hemorrhage first",
            quality: "best",
            next: "t01-n2",
            feedback:
              "Correct. March toward bleeding control before delayed vitals.",
          },
          {
            id: "t01-n1-wrong",
            text: "Spend several minutes documenting exact mechanism before touching the wound",
            quality: "incorrect",
            next: "t01-n2",
            feedback:
              "Bleeding first.",
            delayedCritical: true,
          },
          {
            id: "t01-n1-bad",
            text: "Apply a tourniquet loosely as decoration without assessing pressure needs",
            quality: "incorrect",
            next: "t01-n2",
            feedback:
              "Start with effective direct pressure; escalate properly if needed.",
          },
          {
            id: "t01-n1-acc",
            text: "Direct pressure with sterile dressing while assessing ABCs",
            quality: "acceptable",
            next: "t01-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t01-n2",
        prompt: "Direct pressure is soaking through rapidly; bleeding continues heavily. Next escalation?",
        options: [
          {
            id: "t01-n2-best",
            text: "Apply a tourniquet proximal to the wound on the extremity per training; note time; continue assessment",
            quality: "best",
            next: "t01-n3",
            feedback:
              "Correct. Life-threatening extremity hemorrhage that fails pressure needs a tourniquet.",
          },
          {
            id: "t01-n2-wrong",
            text: "Remove all dressings to 'let it air out'",
            quality: "harmful",
            next: "t01-n3",
            feedback:
              "Worsens hemorrhage.",
          },
          {
            id: "t01-n2-bad",
            text: "Pack the wound with food napkins soaked in bleach",
            quality: "harmful",
            next: "t01-n3",
            feedback:
              "Use proper dressings/hemostatic agents per protocol\u2014not caustics.",
          },
          {
            id: "t01-n2-acc",
            text: "Tourniquet high and tight enough to stop bleeding; mark time",
            quality: "acceptable",
            next: "t01-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t01-n3",
        prompt: "Bleeding stops after tourniquet. Patient becomes dizzy, BP 88/60. Care?",
        vitals: { hr: 132, rr: 24, spo2: 95, bp: "88/60", skin: "cool, pale" },
        options: [
          {
            id: "t01-n3-best",
            text: "Treat for shock: keep warm, supine as tolerated, high-flow oxygen as needed, rapid transport",
            quality: "best",
            next: "t01-n4",
            feedback:
              "Correct. Hemorrhagic shock care after bleeding control.",
          },
          {
            id: "t01-n3-wrong",
            text: "Have him stand to check orthostatics repeatedly",
            quality: "harmful",
            next: "t01-n4",
            feedback:
              "Worsens shock.",
          },
          {
            id: "t01-n3-bad",
            text: "Loosen the tourniquet because BP dropped",
            quality: "harmful",
            next: "t01-n4",
            feedback:
              "Do not loosen a working tourniquet in the field for hypotension.",
          },
          {
            id: "t01-n3-acc",
            text: "Shock management and priority transport",
            quality: "acceptable",
            next: "t01-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t01-n4",
        prompt: "Handoff must include?",
        options: [
          {
            id: "t01-n4-best",
            text: "Tourniquet location and time applied, estimated blood loss, response, and current vitals",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Time-on-tourniquet is critical information.",
          },
          {
            id: "t01-n4-wrong",
            text: "Omit tourniquet time as unimportant",
            quality: "incorrect",
            next: "end",
            feedback:
              "Always report time.",
          },
          {
            id: "t01-n4-bad",
            text: "Hide that bleeding was arterial to avoid concern",
            quality: "harmful",
            next: "end",
            feedback:
              "Be accurate.",
          },
          {
            id: "t01-n4-acc",
            text: "Report interventions and shock signs clearly",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Direct pressure first",
      "Escalate to tourniquet if pressure fails",
      "Treat hemorrhagic shock; do not loosen a needed TQ",
      "Report TQ time and response",
    ],
    keyTakeaway:
      "Life-threatening extremity bleeding: pressure, then tourniquet if needed\u2014never delay for nonessential tasks.",
  }),
  sc({
    id: "trauma-02",
    title: "Open Chest Wound",
    category: "trauma",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Stabbing to chest, patient conscious, difficulty breathing. PD advises scene secure.",
    scene:
      "Alley cleared by PD. Adult male sitting against wall. Penetrating wound mid-chest right, bubbling with breaths.",
    presentation:
      "Alert, severe dyspnea, sucking chest wound sounds, diminished sounds on injured side. No major external bleeding now.",
    vitals: { hr: 118, rr: 28, spo2: 88, bp: "110/78", skin: "pale", gcs: "15" },
    startNodeId: "t02-n1",
    nodes: [
      {
        id: "t02-n1",
        prompt: "Immediate wound management?",
        options: [
          {
            id: "t02-n1-best",
            text: "Apply an occlusive dressing (vented per protocol/training) and monitor for tension physiology",
            quality: "best",
            next: "t02-n2",
            feedback:
              "Correct. Seal open chest wounds and watch for deterioration.",
          },
          {
            id: "t02-n1-wrong",
            text: "Leave the wound open to 'equalize pressures' indefinitely without a plan",
            quality: "incorrect",
            next: "t02-n2",
            feedback:
              "Open pneumothorax needs occlusion.",
            delayedCritical: true,
          },
          {
            id: "t02-n1-bad",
            text: "Pack the chest cavity deeply with dry gauze blindly into the thorax",
            quality: "harmful",
            next: "t02-n2",
            feedback:
              "Not appropriate open-chest packing technique for EMT sucking wound care.",
          },
          {
            id: "t02-n1-acc",
            text: "Gloved hand seal temporarily then occlusive dressing",
            quality: "acceptable",
            next: "t02-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t02-n2",
        prompt: "After sealing, SpO\u2082 still 88% and work of breathing high. Support?",
        options: [
          {
            id: "t02-n2-best",
            text: "High-flow oxygen, position of comfort if no spinal priority, rapid transport/ALS",
            quality: "best",
            next: "t02-n3",
            feedback:
              "Correct. Oxygenate and move toward definitive care.",
          },
          {
            id: "t02-n2-wrong",
            text: "Withhold oxygen to avoid fire risk from a distant cigarette butt",
            quality: "incorrect",
            next: "t02-n3",
            feedback:
              "Treat hypoxia; manage ignition sources reasonably.",
            delayedCritical: true,
          },
          {
            id: "t02-n2-bad",
            text: "Force him to lie on the uninjured side while ignoring increasing distress without reassessment",
            quality: "incorrect",
            next: "t02-n3",
            feedback:
              "Reassess continuously; follow positioning that helps breathing if spinal allows.",
          },
          {
            id: "t02-n2-acc",
            text: "Oxygen and prepare for ventilatory support if needed",
            quality: "acceptable",
            next: "t02-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t02-n3",
        prompt: "He suddenly worsens: JVD, tracheal deviation signs, severe dyspnea, BP falling. Concern?",
        vitals: { hr: 140, rr: 34, spo2: 82, bp: "86/60", gcs: "14" },
        options: [
          {
            id: "t02-n3-best",
            text: "Possible tension pneumothorax developing\u2014support ABCs, lift a corner of occlusive dressing to burp if protocol trained, rapid ALS for needle decompression",
            quality: "best",
            next: "t02-n4",
            feedback:
              "Correct. Recognize tension physiology; EMTs support and expedite ALS/ED.",
          },
          {
            id: "t02-n3-wrong",
            text: "Assume anxiety and remove oxygen",
            quality: "harmful",
            next: "t02-n4",
            feedback:
              "This is a thoracic emergency.",
          },
          {
            id: "t02-n3-bad",
            text: "Perform an improvised field thoracotomy",
            quality: "harmful",
            next: "t02-n4",
            feedback:
              "Far outside EMT scope.",
          },
          {
            id: "t02-n3-acc",
            text: "Burp the seal if trained/protocol and request immediate ALS",
            quality: "acceptable",
            next: "t02-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t02-n4",
        prompt: "Transport priority?",
        options: [
          {
            id: "t02-n4-best",
            text: "Load-and-go thoracic trauma with ongoing airway/oxygen monitoring and early trauma notification",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Penetrating chest trauma is surgical time-sensitive.",
          },
          {
            id: "t02-n4-wrong",
            text: "Extended scene for full secondary survey of toes first",
            quality: "incorrect",
            next: "end",
            feedback:
              "Do not delay.",
            delayedCritical: true,
          },
          {
            id: "t02-n4-bad",
            text: "Allow him to smoke to 'calm nerves'",
            quality: "harmful",
            next: "end",
            feedback:
              "Oxygen/fire and delay.",
          },
          {
            id: "t02-n4-acc",
            text: "Priority trauma transport with continuous reassessment of breath sounds and distress",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Occlusive dressing for sucking chest wound",
      "Oxygen and rapid ALS/transport",
      "Watch for tension\u2014burp seal/ALS decompression pathway",
      "Load-and-go with trauma notify",
    ],
    keyTakeaway:
      "Open chest wounds get sealed and watched\u2014worsening shock and dyspnea suggest tension physiology needing ALS/ED urgently.",
  }),
  sc({
    id: "trauma-03",
    title: "Flail Chest Recognition",
    category: "trauma",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "MVC, driver vs steering wheel, chest pain and trouble breathing.",
    scene:
      "Vehicle stabilized by rescue. Patient still in driver seat initially, then extricated to board. Daytime, dry road.",
    presentation:
      "Paradoxical motion of a segment of left chest wall, severe pain, shallow breaths, crepitus. Alert.",
    vitals: { hr: 110, rr: 28, spo2: 90, bp: "128/84", skin: "pale", gcs: "15" },
    startNodeId: "t03-n1",
    nodes: [
      {
        id: "t03-n1",
        prompt: "What finding defines flail chest concern?",
        options: [
          {
            id: "t03-n1-best",
            text: "A segment of chest wall moving paradoxically opposite the rest of the chest during breathing",
            quality: "best",
            next: "t03-n2",
            feedback:
              "Correct. Paradoxical motion after blunt trauma signals flail physiology.",
          },
          {
            id: "t03-n1-wrong",
            text: "A tiny scratch on the forearm",
            quality: "incorrect",
            next: "t03-n2",
            feedback:
              "Not the defining finding.",
          },
          {
            id: "t03-n1-bad",
            text: "Ignoring chest wall motion because SpO\u2082 is 'only a little low'",
            quality: "incorrect",
            next: "t03-n2",
            feedback:
              "Recognize the injury pattern.",
            delayedCritical: true,
          },
          {
            id: "t03-n1-acc",
            text: "Paradoxical segment plus respiratory distress after blunt trauma",
            quality: "acceptable",
            next: "t03-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t03-n2",
        prompt: "Best EMT respiratory support approach?",
        options: [
          {
            id: "t03-n2-best",
            text: "High-flow oxygen, stabilize with hand or bulky dressing as trained, assist ventilations if inadequate, rapid transport",
            quality: "best",
            next: "t03-n3",
            feedback:
              "Correct. Oxygenation/ventilation support is key\u2014underlying lung injury is the threat.",
          },
          {
            id: "t03-n2-bad",
            text: "Tape the chest circumferentially as tightly as possible forever",
            quality: "harmful",
            next: "t03-n3",
            feedback:
              "Over-restrictive taping can worsen ventilation.",
          },
          {
            id: "t03-n2-wrong",
            text: "Withhold oxygen to 'encourage deep breathing contests'",
            quality: "incorrect",
            next: "t03-n3",
            feedback:
              "Treat hypoxia.",
            delayedCritical: true,
          },
          {
            id: "t03-n2-acc",
            text: "Oxygen and be ready to BVM if tidal volume falls",
            quality: "acceptable",
            next: "t03-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t03-n3",
        prompt: "Patient becomes exhausted; SpO\u2082 85% despite oxygen. Next?",
        vitals: { hr: 124, rr: 8, spo2: 85, bp: "118/80", gcs: "13" },
        options: [
          {
            id: "t03-n3-best",
            text: "Assist ventilations carefully with BVM and oxygen; monitor for deterioration",
            quality: "best",
            next: "t03-n4",
            feedback:
              "Correct. Fatigue with flail/pulmonary contusion often needs assisted ventilation.",
          },
          {
            id: "t03-n3-wrong",
            text: "Encourage sprinting to the ambulance",
            quality: "harmful",
            next: "t03-n4",
            feedback:
              "Exertion worsens failure.",
          },
          {
            id: "t03-n3-bad",
            text: "Remove all oxygen to 'reset'",
            quality: "harmful",
            next: "t03-n4",
            feedback:
              "Dangerous.",
          },
          {
            id: "t03-n3-acc",
            text: "BVM support and expedite trauma center transport",
            quality: "acceptable",
            next: "t03-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t03-n4",
        prompt: "Associated injury vigilance?",
        options: [
          {
            id: "t03-n4-best",
            text: "Suspect pulmonary contusion and other blunt trauma; reassess ABCs frequently during transport",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Flail often pairs with contusion and multi-system injury.",
          },
          {
            id: "t03-n4-wrong",
            text: "Assume isolated cosmetic rib issue only",
            quality: "incorrect",
            next: "end",
            feedback:
              "Underestimates severity.",
          },
          {
            id: "t03-n4-bad",
            text: "Give an invented opioid dose for pain without protocol",
            quality: "harmful",
            next: "end",
            feedback:
              "No invented doses.",
          },
          {
            id: "t03-n4-acc",
            text: "Continuous monitoring for hypoxia and shock",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Recognize paradoxical chest wall motion",
      "Oxygen \u00b1 gentle stabilization; avoid harmful restriction",
      "Assist ventilations if failing",
      "Watch for contusion/multi-trauma during transport",
    ],
    keyTakeaway:
      "Flail chest is paradoxical motion plus respiratory failure risk\u2014oxygenate, assist early, and transport rapidly.",
  }),
  sc({
    id: "trauma-04",
    title: "Pelvic Trauma",
    category: "trauma",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Pedestrian struck, pelvic pain, unable to move legs well. High-speed vehicle.",
    scene:
      "Roadway secured. Patient supine. Longboard available. Significant mechanism.",
    presentation:
      "Pale, pelvic pain to gentle assessment, unstable pelvis suspicion, hypotension developing. Alert initially.",
    vitals: { hr: 130, rr: 24, spo2: 94, bp: "86/58", skin: "pale, cool", gcs: "15" },
    startNodeId: "t04-n1",
    nodes: [
      {
        id: "t04-n1",
        prompt: "Pelvic assessment caution?",
        options: [
          {
            id: "t04-n1-best",
            text: "Avoid repeated rocking of an unstable pelvis; assess once gently and treat for hemorrhage/shock",
            quality: "best",
            next: "t04-n2",
            feedback:
              "Correct. Do not repeatedly stress a broken pelvis.",
          },
          {
            id: "t04-n1-bad",
            text: "Vigorously spring the pelvis multiple times for teaching",
            quality: "harmful",
            next: "t04-n2",
            feedback:
              "Can worsen bleeding.",
          },
          {
            id: "t04-n1-wrong",
            text: "Ignore hypotension because pain is 'just musculoskeletal'",
            quality: "incorrect",
            next: "t04-n2",
            feedback:
              "Pelvic bleeding can be massive.",
            delayedCritical: true,
          },
          {
            id: "t04-n1-acc",
            text: "Gentle assessment once, then pelvic binder per protocol if indicated",
            quality: "acceptable",
            next: "t04-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t04-n2",
        prompt: "Best hemorrhage/shock interventions at EMT level?",
        options: [
          {
            id: "t04-n2-best",
            text: "Pelvic binder/sheet wrap per training, control other external bleeding, keep warm, rapid transport to trauma center",
            quality: "best",
            next: "t04-n3",
            feedback:
              "Correct. Stabilize pelvis and treat shock\u2014surgery/IR is definitive.",
          },
          {
            id: "t04-n2-wrong",
            text: "Log-roll repeatedly to 'check the back' before any binder",
            quality: "incorrect",
            next: "t04-n3",
            feedback:
              "Minimize movement; prioritize hemorrhage control.",
            delayedCritical: true,
          },
          {
            id: "t04-n2-bad",
            text: "Sit the hypotensive patient upright for comfort photos",
            quality: "harmful",
            next: "t04-n3",
            feedback:
              "Worsens shock.",
          },
          {
            id: "t04-n2-acc",
            text: "Binder per protocol + shock care + trauma notify",
            quality: "acceptable",
            next: "t04-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t04-n3",
        prompt: "BP falls to 70/40; patient becomes confused. Priority?",
        vitals: { hr: 146, rr: 28, spo2: 92, bp: "70/40", gcs: "12" },
        options: [
          {
            id: "t04-n3-best",
            text: "Load-and-go hemorrhagic shock care: airway, oxygen, warmth, minimize scene time, ALS intercept",
            quality: "best",
            next: "t04-n4",
            feedback:
              "Correct. Unstable pelvic trauma needs surgical hemorrhage control.",
          },
          {
            id: "t04-n3-wrong",
            text: "Start a prolonged detailed secondary on scene",
            quality: "incorrect",
            next: "t04-n4",
            feedback:
              "Delay kills.",
            delayedCritical: true,
          },
          {
            id: "t04-n3-bad",
            text: "Give oral fluids liberally",
            quality: "harmful",
            next: "t04-n4",
            feedback:
              "NPO; aspiration and delay.",
          },
          {
            id: "t04-n3-acc",
            text: "Priority move with ongoing monitoring",
            quality: "acceptable",
            next: "t04-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t04-n4",
        prompt: "Why is pelvic injury especially dangerous?",
        options: [
          {
            id: "t04-n4-best",
            text: "It can conceal large internal hemorrhage into the retroperitoneum/pelvic space",
            quality: "best",
            next: "end",
            feedback:
              "Correct. External blood loss may look modest while internal bleeding is massive.",
          },
          {
            id: "t04-n4-wrong",
            text: "Because it always causes isolated toe fractures only",
            quality: "incorrect",
            next: "end",
            feedback:
              "Misses the hemorrhage risk.",
          },
          {
            id: "t04-n4-bad",
            text: "Because oxygen is contraindicated in all pelvic injuries",
            quality: "harmful",
            next: "end",
            feedback:
              "False\u2014support perfusion/oxygenation.",
          },
          {
            id: "t04-n4-acc",
            text: "Occult bleeding plus shock physiology",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Gentle one-time pelvic assessment",
      "Binder/sheet per protocol + shock care",
      "Rapid trauma transport if unstable",
      "Respect occult internal hemorrhage risk",
    ],
    keyTakeaway:
      "Unstable pelvis means hidden bleeding\u2014bind per protocol, treat shock, and minimize scene time.",
  }),
  sc({
    id: "trauma-05",
    title: "Head Injury with Airway Threat",
    category: "trauma",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Fall from ladder ~12 feet, unresponsive, bleeding from scalp. Son on scene.",
    scene:
      "Backyard. Ladder on ground. Patient supine. No ongoing fall hazard. ALS 7 minutes.",
    presentation:
      "Unresponsive, snoring respirations, large scalp laceration with controllable bleeding, suspected head injury. Possible cervical trauma.",
    vitals: { hr: 64, rr: 8, spo2: 86, bp: "170/90", skin: "bloody scalp", gcs: "6" },
    startNodeId: "t05-n1",
    nodes: [
      {
        id: "t05-n1",
        prompt: "Competing priorities\u2014how do you sequence?",
        options: [
          {
            id: "t05-n1-best",
            text: "Manual c-spine as indicated, open airway with jaw-thrust, suction, assist ventilations with oxygen; control scalp bleeding without delaying airway",
            quality: "best",
            next: "t05-n2",
            feedback:
              "Correct. Airway/breathing still lead, with spinal motion restriction precautions.",
          },
          {
            id: "t05-n1-wrong",
            text: "Ignore airway to apply five scalp bandages first",
            quality: "incorrect",
            next: "t05-n2",
            feedback:
              "Airway first.",
            delayedCritical: true,
          },
          {
            id: "t05-n1-bad",
            text: "Hyperextend the neck aggressively despite trauma",
            quality: "harmful",
            next: "t05-n2",
            feedback:
              "Use jaw-thrust when spinal injury possible.",
          },
          {
            id: "t05-n1-acc",
            text: "Jaw-thrust, suction, BVM, then scalp pressure",
            quality: "acceptable",
            next: "t05-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t05-n2",
        prompt: "Ventilations: which concept fits head injury?",
        options: [
          {
            id: "t05-n2-best",
            text: "Maintain adequate oxygenation and avoid prolonged hypoxia/hyperventilation extremes unless directed for specific herniation protocols",
            quality: "best",
            next: "t05-n3",
            feedback:
              "Correct. Prevent hypoxia; do not wildly hyperventilate by default.",
          },
          {
            id: "t05-n2-bad",
            text: "Hyperventilate as fast as possible for the entire call without indication",
            quality: "harmful",
            next: "t05-n3",
            feedback:
              "Routine aggressive hyperventilation can harm.",
          },
          {
            id: "t05-n2-wrong",
            text: "Leave SpO\u2082 at 86% because head injuries 'need hypoxia'",
            quality: "incorrect",
            next: "t05-n3",
            feedback:
              "Hypoxia worsens brain injury.",
            delayedCritical: true,
          },
          {
            id: "t05-n2-acc",
            text: "Effective BVM with oxygen and visible chest rise at an appropriate rate",
            quality: "acceptable",
            next: "t05-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t05-n3",
        prompt: "Scalp bleeding continues under a loose dressing. Action?",
        options: [
          {
            id: "t05-n3-best",
            text: "Apply firm direct pressure with dressing; avoid pressing bone fragments into open depressed skull if palpable\u2014control bleeding carefully",
            quality: "best",
            next: "t05-n4",
            feedback:
              "Correct. Control hemorrhage without worsening open skull injuries.",
          },
          {
            id: "t05-n3-bad",
            text: "Remove clotting dressings repeatedly to photograph",
            quality: "harmful",
            next: "t05-n4",
            feedback:
              "Disrupts clotting.",
          },
          {
            id: "t05-n3-wrong",
            text: "Ignore bleeding entirely forever",
            quality: "incorrect",
            next: "t05-n4",
            feedback:
              "Scalp can bleed significantly.",
          },
          {
            id: "t05-n3-acc",
            text: "Pressure dressing once airway is being managed",
            quality: "acceptable",
            next: "t05-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t05-n4",
        prompt: "Transport packaging?",
        options: [
          {
            id: "t05-n4-best",
            text: "Spinal motion restriction as indicated, continuous airway support, elevate head of board slightly if protocol and no contraindication, rapid trauma transport",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Protect spine and airway while moving to definitive care.",
          },
          {
            id: "t05-n4-wrong",
            text: "Sit fully upright without airway adjuncts while snoring",
            quality: "harmful",
            next: "end",
            feedback:
              "Airway not secured.",
          },
          {
            id: "t05-n4-bad",
            text: "Delay for a complete insurance discussion on scene",
            quality: "incorrect",
            next: "end",
            feedback:
              "TBI needs speed.",
            delayedCritical: true,
          },
          {
            id: "t05-n4-acc",
            text: "SMR + ongoing BVM/oxygen + trauma notify",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Jaw-thrust airway + BVM with c-spine precautions",
      "Oxygenate; avoid needless hyperventilation",
      "Control scalp bleeding carefully",
      "SMR packaging and rapid transport",
    ],
    keyTakeaway:
      "Head trauma still follows ABCs\u2014open the airway with spinal precautions and prevent hypoxia.",
  }),
  sc({
    id: "trauma-06",
    title: "Spinal Motion Restriction Decision",
    category: "trauma",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "Low-speed rear-end MVC. Ambulatory on scene, neck pain. Extricated self.",
    scene:
      "Parking lot fender-bender. Vehicles minor damage. Patient standing, holding neck. No altered mental status.",
    presentation:
      "GCS 15, midline neck tenderness, no focal neuro deficits, ambulatory. Denies intoxication. Stable vitals.",
    vitals: { hr: 88, rr: 16, spo2: 99, bp: "128/78", skin: "warm, dry", gcs: "15" },
    startNodeId: "t06-n1",
    nodes: [
      {
        id: "t06-n1",
        prompt: "Best initial approach to spinal care?",
        options: [
          {
            id: "t06-n1-best",
            text: "Manual stabilization as needed and apply cervical collar based on assessment findings/protocol\u2014not every minor MVC gets longboard strapping by default",
            quality: "best",
            next: "t06-n2",
            feedback:
              "Correct. Modern SMR is assessment-driven per protocol.",
          },
          {
            id: "t06-n1-wrong",
            text: "Tackle the standing patient onto a board without assessment",
            quality: "harmful",
            next: "t06-n2",
            feedback:
              "Unnecessary force.",
          },
          {
            id: "t06-n1-bad",
            text: "Tell every patient with any crash to run home without evaluation",
            quality: "incorrect",
            next: "t06-n2",
            feedback:
              "Still assess.",
          },
          {
            id: "t06-n1-acc",
            text: "Assess for reliable exam and midline tenderness; collar if indicated",
            quality: "acceptable",
            next: "t06-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t06-n2",
        prompt: "He has midline cervical tenderness. Next?",
        options: [
          {
            id: "t06-n2-best",
            text: "C-collar and spinal motion restriction per protocol; limit unnecessary movement; transport for evaluation",
            quality: "best",
            next: "t06-n3",
            feedback:
              "Correct. Positive findings warrant SMR.",
          },
          {
            id: "t06-n2-wrong",
            text: "Have him do cartwheels to clear the spine",
            quality: "harmful",
            next: "t06-n3",
            feedback:
              "Dangerous.",
          },
          {
            id: "t06-n2-bad",
            text: "Remove collar repeatedly for selfies",
            quality: "harmful",
            next: "t06-n3",
            feedback:
              "Inconsistent protection.",
          },
          {
            id: "t06-n2-acc",
            text: "Collar, careful stretcher movement, document neuro status",
            quality: "acceptable",
            next: "t06-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t06-n3",
        prompt: "During packaging he mentions new arm numbness. Action?",
        options: [
          {
            id: "t06-n3-best",
            text: "Reassess neurologic status, maintain SMR carefully, note time of change, priority transport",
            quality: "best",
            next: "t06-n4",
            feedback:
              "Correct. New deficits raise urgency.",
          },
          {
            id: "t06-n3-wrong",
            text: "Ignore new deficits because initial exam was normal",
            quality: "incorrect",
            next: "t06-n4",
            feedback:
              "Reassess\u2014findings evolve.",
          },
          {
            id: "t06-n3-bad",
            text: "Force neck range-of-motion testing aggressively",
            quality: "harmful",
            next: "t06-n4",
            feedback:
              "Do not provoke injury.",
          },
          {
            id: "t06-n3-acc",
            text: "Document neuro change and expedite care",
            quality: "acceptable",
            next: "t06-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t06-n4",
        prompt: "Key teaching point for SMR?",
        options: [
          {
            id: "t06-n4-best",
            text: "Spinal precautions are based on mechanism plus reliable exam findings\u2014protect when indicated without causing harm from over-restriction",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Balance protection and unnecessary rigid packaging harms.",
          },
          {
            id: "t06-n4-wrong",
            text: "Longboards are mandatory for all back pain forever",
            quality: "incorrect",
            next: "end",
            feedback:
              "Protocols have evolved.",
          },
          {
            id: "t06-n4-bad",
            text: "Never collar anyone with midline tenderness",
            quality: "harmful",
            next: "end",
            feedback:
              "Positive findings need protection.",
          },
          {
            id: "t06-n4-acc",
            text: "Follow local selective SMR protocol thoughtfully",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Assessment-driven SMR, not blind tackling",
      "Collar/SMR when midline tenderness present",
      "Reassess if neuro symptoms change",
      "Balance indicated protection vs harmful over-restriction",
    ],
    keyTakeaway:
      "Spinal motion restriction is selective and protocol-based\u2014protect positive findings without causing needless harm.",
  }),
  sc({
    id: "trauma-07",
    title: "Multi-System Trauma Priorities",
    category: "trauma",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Motorcycle vs car. Multisystem injuries. Unresponsive. High-speed roadway.",
    scene:
      "Highway blocked by PD/fire. Helmet removed by fire carefully before your hands-on. Hazards controlled.",
    presentation:
      "Unresponsive, inadequate breathing, femoral bleeding, deformed femur, suspected chest injury, hypotensive.",
    vitals: { hr: 140, rr: 6, spo2: 84, bp: "78/50", skin: "pale, cool", gcs: "4" },
    startNodeId: "t07-n1",
    nodes: [
      {
        id: "t07-n1",
        prompt: "With multiple life threats, what order wins?",
        options: [
          {
            id: "t07-n1-best",
            text: "Massive hemorrhage control and airway/breathing support nearly simultaneously\u2014tourniquet for femoral bleed while opening airway/BVM",
            quality: "best",
            next: "t07-n2",
            feedback:
              "Correct. MARCH/XABC mindset: stop killing bleeding and oxygenate.",
          },
          {
            id: "t07-n1-wrong",
            text: "Splint the femur first for 15 minutes before airway or bleeding care",
            quality: "incorrect",
            next: "t07-n2",
            feedback:
              "Wrong priority.",
            delayedCritical: true,
          },
          {
            id: "t07-n1-bad",
            text: "Ignore the arterial bleed to finish a neat secondary survey",
            quality: "harmful",
            next: "t07-n2",
            feedback:
              "Exsanguination first.",
          },
          {
            id: "t07-n1-acc",
            text: "Tourniquet + BVM/oxygen together with partner teamwork",
            quality: "acceptable",
            next: "t07-n2",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t07-n2",
        prompt: "Bleeding controlled; still apneic with pulse. Focus?",
        options: [
          {
            id: "t07-n2-best",
            text: "Continue effective BVM ventilations with oxygen and rapid packaging for trauma center",
            quality: "best",
            next: "t07-n3",
            feedback:
              "Correct. After hemorrhage control, ventilate and move.",
          },
          {
            id: "t07-n2-wrong",
            text: "Stop ventilations to apply decorative tape to a scraped elbow",
            quality: "incorrect",
            next: "t07-n3",
            feedback:
              "Life threats first.",
            delayedCritical: true,
          },
          {
            id: "t07-n2-bad",
            text: "Pronounce based on hypotension alone while pulse/breathing supportable",
            quality: "harmful",
            next: "t07-n3",
            feedback:
              "Continue resuscitation.",
          },
          {
            id: "t07-n2-acc",
            text: "Airway support and load-and-go",
            quality: "acceptable",
            next: "t07-n3",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t07-n3",
        prompt: "Scene time philosophy?",
        options: [
          {
            id: "t07-n3-best",
            text: "Critical trauma: only life-saving interventions on scene, then rapid transport (platinum minutes mindset)",
            quality: "best",
            next: "t07-n4",
            feedback:
              "Correct. Surgery fixes bleeding you cannot see.",
          },
          {
            id: "t07-n3-wrong",
            text: "Stay until every abrasion is cataloged",
            quality: "incorrect",
            next: "t07-n4",
            feedback:
              "Delay.",
          },
          {
            id: "t07-n3-bad",
            text: "Drive without any airway support because 'the hospital is close'",
            quality: "harmful",
            next: "t07-n4",
            feedback:
              "Support en route.",
          },
          {
            id: "t07-n3-acc",
            text: "Minimize scene time after XABCs addressed",
            quality: "acceptable",
            next: "t07-n4",
            feedback:
              "Acceptable.",
          },
        ],
      },
      {
        id: "t07-n4",
        prompt: "En route femur still deformed; bleeding controlled. Splinting?",
        options: [
          {
            id: "t07-n4-best",
            text: "Splint en route if it does not delay critical care; reassess pulse/motor/sensory after",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Limb care after life threats, ideally during transport.",
          },
          {
            id: "t07-n4-wrong",
            text: "Return to the highway to fetch a nonessential gadget before transport",
            quality: "incorrect",
            next: "end",
            feedback:
              "Do not reverse priority.",
          },
          {
            id: "t07-n4-bad",
            text: "Remove the tourniquet to make splinting prettier",
            quality: "harmful",
            next: "end",
            feedback:
              "Keep needed hemorrhage control.",
          },
          {
            id: "t07-n4-acc",
            text: "Traction/splint per protocol once ABCs/bleeding stable enough",
            quality: "acceptable",
            next: "end",
            feedback:
              "Acceptable.",
          },
        ],
      },
    ],
    correctSequence: [
      "Hemorrhage + airway/breathing together",
      "Continue ventilation and rapid packaging",
      "Short scene time after life-saving care",
      "Splint en route without undoing critical interventions",
    ],
    keyTakeaway:
      "Multi-system trauma: stop massive bleeding, support the airway, and leave the scene\u2014definitive care is the hospital.",
  }),
];
