import { sc, NATIONAL } from "../helpers";
import type { Scenario } from "../../lib/types";

export const obPedsScenarios: Scenario[] = [
  sc({
    id: "ob-peds-01",
    title: "Imminent Delivery",
    category: "ob_peds",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "28 y/o female, full-term pregnancy, contractions every 2 minutes. Partner says she feels the urge to push.",
    scene:
      "Apartment bedroom, evening. Partner present. Floor clear, no hazards. OB kit available on the ambulance.",
    presentation:
      "Alert, sweaty, between contractions. Crowning visible on inspection. Membranes ruptured. Denies prenatal complications.",
    vitals: {
      hr: 110,
      rr: 22,
      bp: "128/82",
      spo2: 98,
      skin: "flushed, diaphoretic",
      gcs: "15",
    },
    startNodeId: "op01-n1",
    nodes: [
      {
        id: "op01-n1",
        prompt:
          "Crowning is present and the patient has a strong urge to push. Best immediate action?",
        options: [
          {
            id: "op01-n1-best",
            text: "Prepare for delivery on scene: BSI, OB kit, support the perineum, coach controlled delivery of the head",
            quality: "best",
            next: "op01-n2",
            feedback:
              "Correct. With crowning and urge to push, delivery is imminent — prepare and assist rather than attempting a prolonged extrication.",
          },
          {
            id: "op01-n1-ok",
            text: "Load immediately for hospital delivery without preparing an OB kit",
            quality: "incorrect",
            next: "op01-n2",
            feedback:
              "Transport may still be needed, but crowning means you must be ready to deliver en route or on scene. Prepare the kit now.",
            delayedCritical: true,
          },
          {
            id: "op01-n1-bad",
            text: "Have the mother hold her legs together tightly to delay birth until the hospital",
            quality: "harmful",
            next: "op01-n2",
            feedback:
              "Never attempt to delay delivery. Support a controlled birth and protect mother and newborn.",
            delayedCritical: true,
          },
          {
            id: "op01-n1-wrong",
            text: "Focus only on obtaining a full prenatal history before examining the perineum",
            quality: "incorrect",
            next: "op01-n2",
            feedback:
              "History matters, but imminent delivery signs require immediate preparation for birth.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op01-n2",
        prompt:
          "The head delivers. You notice the cord is loosely around the neck. Best next step?",
        sceneUpdate: "Head is out; body not yet delivered. Cord visible around neck, not tightly constricting.",
        options: [
          {
            id: "op01-n2-best",
            text: "Gently slip the cord over the head if loose; if tightly clamped and irreducible, clamp and cut per training, then continue delivery",
            quality: "best",
            next: "op01-n3",
            feedback:
              "Correct. A nuchal cord is managed by slipping it free when possible; tight irreducible cords are clamped and cut so the body can deliver.",
          },
          {
            id: "op01-n2-ok",
            text: "Pull firmly on the head to deliver the shoulders quickly past the cord",
            quality: "harmful",
            next: "op01-n3",
            feedback:
              "Traction on the head risks injury. Guide delivery; do not pull.",
            delayedCritical: true,
          },
          {
            id: "op01-n2-bad",
            text: "Ignore the cord and wait without intervening until the placenta delivers",
            quality: "incorrect",
            next: "op01-n3",
            feedback:
              "A cord around the neck must be addressed so the body can deliver safely.",
            delayedCritical: true,
          },
          {
            id: "op01-n2-wrong",
            text: "Push the head back in and transport without delivering",
            quality: "harmful",
            next: "op01-n3",
            feedback:
              "Never attempt to replace a delivered head. Continue assisted delivery.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op01-n3",
        prompt:
          "Shoulders and body deliver. Newborn is crying vigorously. Mother is stable. Priority now?",
        options: [
          {
            id: "op01-n3-best",
            text: "Dry and warm the newborn, place skin-to-skin or wrap, note time of birth, clamp/cut cord when appropriate, reassess mother for bleeding",
            quality: "best",
            next: "op01-n4",
            feedback:
              "Correct. Vigorous newborns need drying, warmth, and ongoing maternal assessment for postpartum hemorrhage.",
          },
          {
            id: "op01-n3-ok",
            text: "Immediately begin aggressive stimulation and prolonged suction of a crying newborn",
            quality: "incorrect",
            next: "op01-n4",
            feedback:
              "A vigorous crying newborn does not need aggressive airway intervention — dry, warm, and observe.",
          },
          {
            id: "op01-n3-bad",
            text: "Leave the newborn unattended while you complete paperwork",
            quality: "harmful",
            next: "op01-n4",
            feedback:
              "Newborns cool quickly and need continuous attention alongside maternal care.",
            delayedCritical: true,
          },
          {
            id: "op01-n3-wrong",
            text: "Pull on the cord to speed placental delivery",
            quality: "harmful",
            next: "op01-n4",
            feedback:
              "Do not traction the cord. Allow placental delivery; watch for excessive maternal bleeding.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op01-n4",
        prompt: "Best transport and monitoring plan for mother and newborn?",
        options: [
          {
            id: "op01-n4-best",
            text: "Transport both; keep newborn warm, monitor maternal bleeding/fundus awareness per training, reassess both frequently",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Postpartum mother and neonate both need ongoing assessment and warm, careful transport.",
          },
          {
            id: "op01-n4-ok",
            text: "Transport mother only; leave newborn with family until another unit arrives",
            quality: "harmful",
            next: "end",
            feedback:
              "Do not separate care without a plan — both patients need EMS attention.",
            delayedCritical: true,
          },
          {
            id: "op01-n4-bad",
            text: "Delay transport indefinitely to wait for the placenta if bleeding is already heavy",
            quality: "incorrect",
            next: "end",
            feedback:
              "Significant maternal bleeding is a load-and-go priority while supporting care.",
            delayedCritical: true,
          },
          {
            id: "op01-n4-wrong",
            text: "Stop reassessment once both appear briefly well",
            quality: "incorrect",
            next: "end",
            feedback:
              "Condition can change quickly postpartum — continue reassessment.",
          },
        ],
      },
    ],
    correctSequence: [
      "Prepare for imminent delivery with BSI and OB kit",
      "Manage nuchal cord appropriately; avoid traction on the head",
      "Dry/warm vigorous newborn; reassess mother for bleeding",
      "Transport both with ongoing warmth and reassessment",
    ],
    keyTakeaway:
      "Crowning means deliver now: support controlled birth, protect the newborn from heat loss, and watch the mother for hemorrhage.",
  }),

  sc({
    id: "ob-peds-02",
    title: "Neonate Needs Stimulation",
    category: "ob_peds",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "Home birth just occurred. Caller says the baby is blue and not crying loudly.",
    scene:
      "Living room floor, warm apartment. Mother still on the floor, placenta not delivered. Newborn in partner's arms, limp-appearing.",
    presentation:
      "Term newborn, weak intermittent cry, central cyanosis, poor tone. Mother alert with moderate vaginal bleeding.",
    vitals: {
      hr: "newborn ~90 (weak)",
      rr: "irregular, weak",
      spo2: "not yet applied",
      skin: "central cyanosis",
    },
    startNodeId: "op02-n1",
    nodes: [
      {
        id: "op02-n1",
        prompt: "First priority for this newly born infant?",
        options: [
          {
            id: "op02-n1-best",
            text: "Warm, dry thoroughly, clear airway as needed, stimulate by drying/rubbing the back or feet, position airway open",
            quality: "best",
            next: "op02-n2",
            feedback:
              "Correct. Initial neonatal steps are warmth, drying, airway positioning, and tactile stimulation.",
          },
          {
            id: "op02-n1-ok",
            text: "Immediately start chest compressions without drying or stimulating",
            quality: "incorrect",
            next: "op02-n2",
            feedback:
              "Most newborns improve with drying and stimulation. Assess heart rate after initial steps before compressions.",
            delayedCritical: true,
          },
          {
            id: "op02-n1-bad",
            text: "Blow cold air on the infant's face and splash with water",
            quality: "harmful",
            next: "op02-n2",
            feedback:
              "Cold stress worsens newborns. Warm and dry — never cool them.",
            delayedCritical: true,
          },
          {
            id: "op02-n1-wrong",
            text: "Ignore the newborn until the placenta delivers",
            quality: "harmful",
            next: "op02-n2",
            feedback:
              "A depressed newborn is the immediate life threat. Assign maternal care while you resuscitate the infant.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op02-n2",
        prompt:
          "After drying and stimulation, the infant remains limp with HR about 50 and inadequate breathing. Best next action?",
        options: [
          {
            id: "op02-n2-best",
            text: "Begin positive-pressure ventilations with an appropriately sized BVM and room air/oxygen per neonatal protocol; reassess HR",
            quality: "best",
            next: "op02-n3",
            feedback:
              "Correct. Persistent apnea/bradycardia after stimulation needs effective ventilations — the key neonatal intervention.",
          },
          {
            id: "op02-n2-ok",
            text: "Only give blow-by oxygen without supporting ventilations",
            quality: "incorrect",
            next: "op02-n3",
            feedback:
              "Inadequate breathing with bradycardia requires assisted ventilation, not blow-by alone.",
            delayedCritical: true,
          },
          {
            id: "op02-n2-bad",
            text: "Start compressions first without ventilating",
            quality: "incorrect",
            next: "op02-n3",
            feedback:
              "Ventilation comes before compressions in neonatal resuscitation priorities for most cases.",
            delayedCritical: true,
          },
          {
            id: "op02-n2-wrong",
            text: "Stimulate harder for several more minutes without ventilating",
            quality: "harmful",
            next: "op02-n3",
            feedback:
              "Do not delay ventilations when HR is critically low and breathing is inadequate.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op02-n3",
        prompt:
          "Effective ventilations are ongoing. After about 30 seconds, HR is still under 60. Next step?",
        options: [
          {
            id: "op02-n3-best",
            text: "Ensure ventilations are effective, then begin chest compressions coordinated with ventilations per neonatal guidelines; request ALS",
            quality: "best",
            next: "op02-n4",
            feedback:
              "Correct. Persistent HR <60 after adequate ventilation warrants compressions and advanced help.",
          },
          {
            id: "op02-n3-ok",
            text: "Stop all care and wait for ALS without continuing ventilations",
            quality: "harmful",
            next: "op02-n4",
            feedback:
              "Continue BLS neonatal support until ALS arrives or the infant improves.",
            delayedCritical: true,
          },
          {
            id: "op02-n3-bad",
            text: "Give adult-sized ventilation volumes as hard as possible",
            quality: "harmful",
            next: "op02-n4",
            feedback:
              "Use gentle, appropriate neonatal volumes — overventilation causes harm.",
            delayedCritical: true,
          },
          {
            id: "op02-n3-wrong",
            text: "Place the infant prone and stop reassessment of HR",
            quality: "incorrect",
            next: "op02-n4",
            feedback:
              "Keep the airway open supine/neutral and reassess HR frequently.",
          },
        ],
      },
      {
        id: "op02-n4",
        prompt: "While resuscitating the newborn, how do you manage the mother?",
        options: [
          {
            id: "op02-n4-best",
            text: "Assign a provider to monitor maternal bleeding and mental status; keep both warm; transport with ongoing neonatal support",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Two patients — newborn resuscitation plus maternal hemorrhage watch and transport.",
          },
          {
            id: "op02-n4-ok",
            text: "Leave mother completely unmonitored for the rest of the call",
            quality: "harmful",
            next: "end",
            feedback:
              "Postpartum hemorrhage can kill the mother while you focus on the infant — divide attention.",
            delayedCritical: true,
          },
          {
            id: "op02-n4-bad",
            text: "Have mother walk to the ambulance carrying the infant during CPR",
            quality: "harmful",
            next: "end",
            feedback:
              "Do not interrupt effective resuscitation or create fall/cold-stress hazards.",
            delayedCritical: true,
          },
          {
            id: "op02-n4-wrong",
            text: "Refuse transport because the birth already happened at home",
            quality: "incorrect",
            next: "end",
            feedback:
              "A depressed neonate and postpartum mother need emergency transport.",
          },
        ],
      },
    ],
    correctSequence: [
      "Warm, dry, stimulate, position airway",
      "Provide PPV for persistent apnea/bradycardia",
      "Add compressions if HR remains <60 after adequate ventilation",
      "Care for mother and newborn; transport with ongoing support",
    ],
    keyTakeaway:
      "Neonatal priorities: warmth and drying first, then effective ventilation — compressions only after ventilation fails to raise HR.",
  }),

  sc({
    id: "ob-peds-03",
    title: "Pediatric Respiratory Distress",
    category: "ob_peds",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "4 y/o with difficulty breathing. Parent says the child has a known history of asthma-like wheezing.",
    scene:
      "Home living room. Parent present. No smoke or toxins. Child sitting on parent's lap.",
    presentation:
      "Alert, anxious, speaking in short phrases, audible wheeze, mild retractions. Able to follow commands.",
    vitals: {
      hr: 130,
      rr: 36,
      spo2: 91,
      bp: "age-appropriate",
      skin: "pale, warm",
      gcs: "15",
    },
    startNodeId: "op03-n1",
    nodes: [
      {
        id: "op03-n1",
        prompt: "Best initial approach to this child?",
        options: [
          {
            id: "op03-n1-best",
            text: "Allow position of comfort with caregiver, assess ABCs calmly, apply oxygen as needed without forcing agitation",
            quality: "best",
            next: "op03-n2",
            feedback:
              "Correct. Keep the child calm with a caregiver; agitation worsens work of breathing.",
          },
          {
            id: "op03-n1-ok",
            text: "Separate the child from the parent and lay them flat for a full exam",
            quality: "harmful",
            next: "op03-n2",
            feedback:
              "Separation and supine positioning often worsen pediatric respiratory distress.",
            delayedCritical: true,
          },
          {
            id: "op03-n1-bad",
            text: "Ignore SpO₂ because children always look pale",
            quality: "incorrect",
            next: "op03-n2",
            feedback:
              "Hypoxemia matters — treat and reassess oxygenation and work of breathing.",
            delayedCritical: true,
          },
          {
            id: "op03-n1-wrong",
            text: "Start adult-dose interventions without pediatric assessment",
            quality: "incorrect",
            next: "op03-n2",
            feedback:
              "Use pediatric assessment and EMT-scope care only; no dosing improvisation.",
          },
        ],
      },
      {
        id: "op03-n2",
        prompt: "SpO₂ is 91% on room air with increased work of breathing. Best next action?",
        options: [
          {
            id: "op03-n2-best",
            text: "Provide oxygen in a tolerated manner, assist with prescribed inhaler if protocol allows, prepare for transport, request ALS if available",
            quality: "best",
            next: "op03-n3",
            feedback:
              "Correct. Support oxygenation, use allowed assistive meds per protocol, and arrange higher-level care/transport.",
          },
          {
            id: "op03-n2-ok",
            text: "Withhold oxygen to 'drive' breathing effort",
            quality: "harmful",
            next: "op03-n3",
            feedback:
              "Do not withhold oxygen from a hypoxemic child in distress.",
            delayedCritical: true,
          },
          {
            id: "op03-n2-bad",
            text: "Force a tight NRB that causes panic and breath-holding",
            quality: "incorrect",
            next: "op03-n3",
            feedback:
              "If a mask causes severe agitation, use a better-tolerated method while still supporting oxygenation.",
          },
          {
            id: "op03-n2-wrong",
            text: "Advise waiting at home until the wheeze resolves on its own",
            quality: "harmful",
            next: "op03-n3",
            feedback:
              "Hypoxemic pediatric distress needs transport and ongoing assessment.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op03-n3",
        prompt:
          "En route the child becomes drowsy with slowing respirations and dropping SpO₂. What changed priority?",
        options: [
          {
            id: "op03-n3-best",
            text: "Recognize impending failure — open airway, assist ventilations with BVM as needed, rapid transport, update receiving facility",
            quality: "best",
            next: "op03-n4",
            feedback:
              "Correct. Fatigue and declining mentation signal failure — support ventilation immediately.",
          },
          {
            id: "op03-n3-ok",
            text: "Assume the child is 'finally relaxing' and reduce oxygen",
            quality: "harmful",
            next: "op03-n4",
            feedback:
              "Quiet/drowsy after distress often means fatigue and failure, not improvement.",
            delayedCritical: true,
          },
          {
            id: "op03-n3-bad",
            text: "Stop reassessment to finish a long SAMPLE interview",
            quality: "incorrect",
            next: "op03-n4",
            feedback:
              "Life-threat changes override detailed history.",
            delayedCritical: true,
          },
          {
            id: "op03-n3-wrong",
            text: "Sit the child up more and wait without supporting breaths",
            quality: "incorrect",
            next: "op03-n4",
            feedback:
              "Inadequate respirations require assisted ventilation.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op03-n4",
        prompt: "Key reassessment focus for this pediatric respiratory patient?",
        options: [
          {
            id: "op03-n4-best",
            text: "Work of breathing, mental status, SpO₂, skin color, and response to oxygen/ventilation support",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Pediatric respiratory status is tracked by effort, alertness, color, and oxygenation — not a single number.",
          },
          {
            id: "op03-n4-ok",
            text: "Only blood pressure every 30 minutes",
            quality: "incorrect",
            next: "end",
            feedback:
              "BP is less useful early than respiratory effort and mentation in kids.",
          },
          {
            id: "op03-n4-bad",
            text: "No further checks once oxygen is applied",
            quality: "incorrect",
            next: "end",
            feedback:
              "Always reassess after interventions — failure can develop quickly.",
            delayedCritical: true,
          },
          {
            id: "op03-n4-wrong",
            text: "Focus only on parental anxiety",
            quality: "incorrect",
            next: "end",
            feedback:
              "Support parents, but clinical reassessment of the child comes first.",
          },
        ],
      },
    ],
    correctSequence: [
      "Keep child calm with caregiver; assess ABCs",
      "Oxygen as tolerated; assist allowed inhaler; transport/ALS",
      "If fatigue/failure develops, assist ventilations",
      "Reassess effort, mentation, SpO₂, and color",
    ],
    keyTakeaway:
      "In pediatric respiratory distress, calm positioning and oxygen come first — a quiet tired child may be failing, not improving.",
  }),

  sc({
    id: "ob-peds-04",
    title: "Croup vs Epiglottitis Caution",
    category: "ob_peds",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "3 y/o with noisy breathing and fever. Parent says the child is drooling and won't lie down.",
    scene:
      "Bedroom. Soft lighting. Parent holding child upright. No foreign body history.",
    presentation:
      "Anxious, sitting forward, drooling, muffled voice, high fever. Minimal cough. Looks toxic.",
    vitals: {
      hr: 140,
      rr: 32,
      spo2: 94,
      temp: "high fever",
      skin: "flushed, hot",
      gcs: "15 (anxious)",
    },
    startNodeId: "op04-n1",
    nodes: [
      {
        id: "op04-n1",
        prompt:
          "This presentation raises concern for a serious upper-airway infection. Best immediate approach?",
        options: [
          {
            id: "op04-n1-best",
            text: "Keep child calm and upright with caregiver; do not agitate; avoid inspecting the throat; high-flow O₂ as tolerated; rapid gentle transport",
            quality: "best",
            next: "op04-n2",
            feedback:
              "Correct. Suspected epiglottitis: minimize agitation and never force an oral exam that may precipitate complete obstruction.",
          },
          {
            id: "op04-n1-ok",
            text: "Lay the child flat and use a tongue blade to visualize the throat",
            quality: "harmful",
            next: "op04-n2",
            feedback:
              "Throat inspection and supine positioning can trigger fatal airway loss in epiglottitis.",
            delayedCritical: true,
          },
          {
            id: "op04-n1-bad",
            text: "Insert an OPA to 'secure' the airway while the child is still alert",
            quality: "harmful",
            next: "op04-n2",
            feedback:
              "Never force an airway adjunct into an alert child with suspected upper-airway obstruction.",
            delayedCritical: true,
          },
          {
            id: "op04-n1-wrong",
            text: "Treat as mild croup only and recommend home observation without transport",
            quality: "incorrect",
            next: "op04-n2",
            feedback:
              "Toxic appearance, drooling, and preference for sitting forward warrant emergency transport.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op04-n2",
        prompt:
          "How does classic croup typically differ from this concerning picture?",
        options: [
          {
            id: "op04-n2-best",
            text: "Croup more often has barky cough and stridor that may improve with calm/cool air; epiglottitis presents more toxic with drooling and muffled voice",
            quality: "best",
            next: "op04-n3",
            feedback:
              "Correct. Pattern recognition guides caution — when in doubt, treat as a fragile airway and do not agitate.",
          },
          {
            id: "op04-n2-ok",
            text: "They are identical, so always examine the throat aggressively",
            quality: "harmful",
            next: "op04-n3",
            feedback:
              "Aggressive exam is never the EMT default for suspected epiglottitis.",
            delayedCritical: true,
          },
          {
            id: "op04-n2-bad",
            text: "Epiglottitis always has a barky cough and never fever",
            quality: "incorrect",
            next: "op04-n3",
            feedback:
              "Epiglottitis is often febrile and toxic; barky cough is more classic for croup.",
          },
          {
            id: "op04-n2-wrong",
            text: "Croup never needs oxygen or transport",
            quality: "incorrect",
            next: "op04-n3",
            feedback:
              "Severe croup can still need oxygen, ALS, and transport.",
          },
        ],
      },
      {
        id: "op04-n3",
        prompt: "Child suddenly becomes quiet with marked stridor and poor air movement. Next action?",
        options: [
          {
            id: "op04-n3-best",
            text: "Support airway carefully, assist ventilations if needed without forcing devices that worsen obstruction, rapid transport, ALS intercept",
            quality: "best",
            next: "op04-n4",
            feedback:
              "Correct. Impending obstruction needs gentle ventilatory support and immediate definitive care — not delay for nonessential tasks.",
          },
          {
            id: "op04-n3-ok",
            text: "Perform blind finger sweeps of the mouth",
            quality: "harmful",
            next: "op04-n4",
            feedback:
              "Blind sweeps can worsen obstruction and are not indicated here.",
            delayedCritical: true,
          },
          {
            id: "op04-n3-bad",
            text: "Have the child gargle water to 'clear' the throat",
            quality: "harmful",
            next: "op04-n4",
            feedback:
              "Oral intake and irritation can worsen a critical airway.",
            delayedCritical: true,
          },
          {
            id: "op04-n3-wrong",
            text: "Spend several minutes obtaining a full vaccination history before moving",
            quality: "incorrect",
            next: "op04-n4",
            feedback:
              "History can wait — airway failure is the priority.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op04-n4",
        prompt: "Best communication to the receiving facility?",
        options: [
          {
            id: "op04-n4-best",
            text: "Alert them early to a pediatric possible upper-airway emergency with suspected epiglottitis features and current airway status",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Early notification lets the hospital prepare airway experts and equipment.",
          },
          {
            id: "op04-n4-ok",
            text: "Give no radio report to avoid 'HIPAA issues'",
            quality: "incorrect",
            next: "end",
            feedback:
              "Clinical handoff for emergency care is appropriate and necessary.",
          },
          {
            id: "op04-n4-bad",
            text: "Tell them it is definitely mild cold symptoms only",
            quality: "incorrect",
            next: "end",
            feedback:
              "Under-calling a critical airway delays preparation.",
          },
          {
            id: "op04-n4-wrong",
            text: "Read the entire chart including unrelated family history on an open channel with no clinical focus",
            quality: "incorrect",
            next: "end",
            feedback:
              "Keep radio reports concise and clinically relevant.",
          },
        ],
      },
    ],
    correctSequence: [
      "Keep calm/upright; no throat exam; oxygen as tolerated",
      "Differentiate toxic drooling presentation from typical croup",
      "If worsening, gentle ventilatory support and rapid transport",
      "Early hospital notification for pediatric airway emergency",
    ],
    keyTakeaway:
      "Drooling, toxic appearance, and tripoding mean fragile airway — do not inspect the throat or agitate the child.",
  }),

  sc({
    id: "ob-peds-05",
    title: "Pediatric Trauma Priorities",
    category: "ob_peds",
    difficulty: "application",
    source: NATIONAL,
    dispatch:
      "7 y/o struck by a slow-moving car in a parking lot. Conscious per bystanders.",
    scene:
      "Parking lot secured by PD. Vehicle stopped. Child on pavement with parent kneeling nearby.",
    presentation:
      "Crying, ABCs present, abrasion to forehead, guarding abdomen, deformity to left femur. Distal pulses present in injured leg.",
    vitals: {
      hr: 128,
      rr: 28,
      spo2: 97,
      bp: "100/70",
      skin: "pale, cool",
      gcs: "14 (confused/crying)",
    },
    startNodeId: "op05-n1",
    nodes: [
      {
        id: "op05-n1",
        prompt: "After scene safety, what guides your primary survey?",
        options: [
          {
            id: "op05-n1-best",
            text: "XABC approach: control major hemorrhage, airway with C-spine consideration, breathing, circulation/perfusion, disability, expose as needed",
            quality: "best",
            next: "op05-n2",
            feedback:
              "Correct. Pediatric trauma still follows life-threat order with spinal motion awareness.",
          },
          {
            id: "op05-n1-ok",
            text: "Splint the femur before checking airway and breathing",
            quality: "incorrect",
            next: "op05-n2",
            feedback:
              "Life threats and ABCs come before isolated extremity care.",
            delayedCritical: true,
          },
          {
            id: "op05-n1-bad",
            text: "Assume children cannot be in shock if BP is 'normal'",
            quality: "incorrect",
            next: "op05-n2",
            feedback:
              "Kids compensate — tachycardia and pale/cool skin can signal shock before hypotension.",
            delayedCritical: true,
          },
          {
            id: "op05-n1-wrong",
            text: "Skip spinal precautions because the child is crying",
            quality: "incorrect",
            next: "op05-n2",
            feedback:
              "Significant MOI warrants spinal motion restriction decisions regardless of crying.",
          },
        ],
      },
      {
        id: "op05-n2",
        prompt:
          "Abdomen is tender and the child is tachycardic and pale. Femur is deformed. Priority packaging?",
        options: [
          {
            id: "op05-n2-best",
            text: "Treat as multi-system trauma: high-priority transport, spinal motion restriction as indicated, stabilize femur en route if time allows, keep warm",
            quality: "best",
            next: "op05-n3",
            feedback:
              "Correct. Suspected internal bleeding plus long-bone injury = load-and-go priorities with warmth and ongoing ABCs.",
          },
          {
            id: "op05-n2-ok",
            text: "Stay on scene for a detailed head-to-toe before any movement",
            quality: "incorrect",
            next: "op05-n3",
            feedback:
              "Unstable multi-system pediatric trauma needs rapid transport after life threats are addressed.",
            delayedCritical: true,
          },
          {
            id: "op05-n2-bad",
            text: "Give oral fluids because the child says they are thirsty",
            quality: "harmful",
            next: "op05-n3",
            feedback:
              "NPO in trauma with possible surgical needs; oral fluids risk aspiration and delay.",
            delayedCritical: true,
          },
          {
            id: "op05-n2-wrong",
            text: "Focus only on the femur and ignore abdominal findings",
            quality: "incorrect",
            next: "op05-n3",
            feedback:
              "Abdominal injury can be the life threat — do not fixate on the obvious deformity.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op05-n3",
        prompt: "Parent is distraught and interfering with care. Best approach?",
        options: [
          {
            id: "op05-n3-best",
            text: "Assign someone to calmly update the parent, keep them informed, and allow presence if it calms the child without blocking care",
            quality: "best",
            next: "op05-n4",
            feedback:
              "Correct. Caregiver presence often helps pediatric patients when it does not compromise care.",
          },
          {
            id: "op05-n3-ok",
            text: "Yell at the parent to leave immediately without explanation",
            quality: "incorrect",
            next: "op05-n4",
            feedback:
              "Clear, calm boundaries work better than confrontation.",
          },
          {
            id: "op05-n3-bad",
            text: "Stop patient care until the parent finishes a long argument",
            quality: "harmful",
            next: "op05-n4",
            feedback:
              "Do not pause critical trauma care for nonessential conflict.",
            delayedCritical: true,
          },
          {
            id: "op05-n3-wrong",
            text: "Ask the child alone for consent to refuse transport",
            quality: "incorrect",
            next: "op05-n4",
            feedback:
              "Minors generally cannot refuse needed emergency care; involve a parent/guardian and follow protocol.",
          },
        ],
      },
      {
        id: "op05-n4",
        prompt: "En route, what reassessment finding would most increase urgency?",
        options: [
          {
            id: "op05-n4-best",
            text: "Rising HR, worsening pallor, altered mentation, or increasing abdominal distention/pain",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Signs of decompensating shock or head injury demand immediate recognition and hospital update.",
          },
          {
            id: "op05-n4-ok",
            text: "A single stable SpO₂ reading with no other checks",
            quality: "incorrect",
            next: "end",
            feedback:
              "Trends across multiple signs matter more than one number.",
          },
          {
            id: "op05-n4-bad",
            text: "Improved crying alone without vital sign trends",
            quality: "incorrect",
            next: "end",
            feedback:
              "Crying can coexist with serious injury — track perfusion and mentation.",
          },
          {
            id: "op05-n4-wrong",
            text: "No need to reassess until arrival",
            quality: "incorrect",
            next: "end",
            feedback:
              "Trauma patients require frequent reassessment.",
            delayedCritical: true,
          },
        ],
      },
    ],
    correctSequence: [
      "Primary survey with hemorrhage/ABC priorities and spinal awareness",
      "Treat as multi-system trauma; rapid transport; stabilize limb as able",
      "Manage caregiver presence to support the child",
      "Reassess for shock and mentation changes",
    ],
    keyTakeaway:
      "Pediatric trauma: kids hide shock — prioritize ABCs, warmth, and rapid transport over prolonged on-scene extremity care.",
  }),

  sc({
    id: "ob-peds-06",
    title: "Complicated Delivery — Breech",
    category: "ob_peds",
    difficulty: "critical",
    source: NATIONAL,
    dispatch:
      "32 y/o female in labor. Caller thinks 'the feet are coming first.'",
    scene:
      "Bathroom floor. Partner assisting. Crowding but manageable. ALS 15 minutes out.",
    presentation:
      "Feet/buttocks presenting. Mother pushing. Head not yet delivered. Cord not visible. Mother exhausted but alert.",
    vitals: {
      hr: 120,
      rr: 24,
      bp: "132/84",
      spo2: 97,
      skin: "diaphoretic",
      gcs: "15",
    },
    startNodeId: "op06-n1",
    nodes: [
      {
        id: "op06-n1",
        prompt: "You recognize a breech presentation. Best EMT action?",
        options: [
          {
            id: "op06-n1-best",
            text: "Support the presenting parts; do not pull; create an airway for the baby if the head is delayed; rapid transport / ALS; prepare for newborn care",
            quality: "best",
            next: "op06-n2",
            feedback:
              "Correct. Breech is a complicated delivery — support, avoid traction, and move toward definitive care while managing the airway if needed.",
          },
          {
            id: "op06-n1-ok",
            text: "Pull hard on the legs to speed delivery of the head",
            quality: "harmful",
            next: "op06-n2",
            feedback:
              "Never pull on a breech infant — traction causes injury.",
            delayedCritical: true,
          },
          {
            id: "op06-n1-bad",
            text: "Push the presenting parts back in and tell the mother to wait hours",
            quality: "harmful",
            next: "op06-n2",
            feedback:
              "Do not attempt to replace presenting parts or delay needed care.",
            delayedCritical: true,
          },
          {
            id: "op06-n1-wrong",
            text: "Treat exactly like a normal uncomplicated cephalic delivery with no extra caution",
            quality: "incorrect",
            next: "op06-n2",
            feedback:
              "Breech requires recognition as complicated and different handling.",
          },
        ],
      },
      {
        id: "op06-n2",
        prompt:
          "The body delivers but the head is entrapped. You were trained to form an airway. What is the concept?",
        options: [
          {
            id: "op06-n2-best",
            text: "Use a gloved hand to create a space for the newborn's airway (V-shaped fingers elevating the vaginal wall off the face) while avoiding pulling on the body",
            quality: "best",
            next: "op06-n3",
            feedback:
              "Correct. If the head is delayed, maintain an airway space for the infant and continue support without traction.",
          },
          {
            id: "op06-n2-ok",
            text: "Insert an adult OPA into the mother to help the baby breathe",
            quality: "harmful",
            next: "op06-n3",
            feedback:
              "That does not create a neonatal airway and can injure the mother.",
            delayedCritical: true,
          },
          {
            id: "op06-n2-bad",
            text: "Twist and yank the torso forcefully",
            quality: "harmful",
            next: "op06-n3",
            feedback:
              "Forceful manipulation risks catastrophic injury.",
            delayedCritical: true,
          },
          {
            id: "op06-n2-wrong",
            text: "Cover the infant's face tightly with a towel until the head delivers",
            quality: "harmful",
            next: "op06-n3",
            feedback:
              "Do not obstruct the infant's airway — maintain a patent path for air.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op06-n3",
        prompt: "Delivery completes. Newborn is floppy and not crying. Immediate focus?",
        options: [
          {
            id: "op06-n3-best",
            text: "Neonatal resuscitation sequence: warm/dry/stimulate, open airway, ventilate if needed; continue maternal support",
            quality: "best",
            next: "op06-n4",
            feedback:
              "Correct. Complicated deliveries often yield depressed newborns — be ready to resuscitate.",
          },
          {
            id: "op06-n3-ok",
            text: "Assume the newborn is fine because the mother is talking",
            quality: "incorrect",
            next: "op06-n4",
            feedback:
              "Assess the newborn independently every time.",
            delayedCritical: true,
          },
          {
            id: "op06-n3-bad",
            text: "Shake the infant vigorously by the shoulders",
            quality: "harmful",
            next: "op06-n4",
            feedback:
              "Do not shake — use appropriate tactile stimulation and airway support.",
            delayedCritical: true,
          },
          {
            id: "op06-n3-wrong",
            text: "Place the infant face-down in fluid without clearing the airway",
            quality: "harmful",
            next: "op06-n4",
            feedback:
              "Position for airway patency and clear secretions as needed.",
            delayedCritical: true,
          },
        ],
      },
      {
        id: "op06-n4",
        prompt: "Transport priority after breech delivery?",
        options: [
          {
            id: "op06-n4-best",
            text: "High priority for mother and newborn; keep warm; monitor bleeding; early hospital notification about breech/complicated delivery",
            quality: "best",
            next: "end",
            feedback:
              "Correct. Complicated delivery warrants priority transport and a clear handoff.",
          },
          {
            id: "op06-n4-ok",
            text: "Non-urgent transport with no hospital notification",
            quality: "incorrect",
            next: "end",
            feedback:
              "Breech and possible neonatal depression are urgent.",
            delayedCritical: true,
          },
          {
            id: "op06-n4-bad",
            text: "Release both patients home without evaluation",
            quality: "harmful",
            next: "end",
            feedback:
              "Both need emergency evaluation after complicated delivery.",
            delayedCritical: true,
          },
          {
            id: "op06-n4-wrong",
            text: "Transport mother only; leave newborn on scene",
            quality: "harmful",
            next: "end",
            feedback:
              "Never abandon the newborn.",
            delayedCritical: true,
          },
        ],
      },
    ],
    correctSequence: [
      "Recognize breech; support without pulling; rapid transport/ALS",
      "Maintain neonatal airway space if head entrapped",
      "Resuscitate depressed newborn; support mother",
      "Priority transport with early hospital notification",
    ],
    keyTakeaway:
      "Breech: support, never pull, maintain an airway for the baby if the head is delayed, and expect a depressed newborn.",
  }),
];
