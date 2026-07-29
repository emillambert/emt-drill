# EMT Drill

Mobile-first web app for US EMT students to practise **clinical decisions** through short, interactive scenarios—not flashcards.

## V1 focus

**NREMT-style clinical competence + patient-assessment sequencing.**

Each scenario is a short call (dispatch → scene → presentation → vitals). You pick one action at a time (3–5 options). After the call you get score, correct sequence, what you got right, delays/mistakes, and one key takeaway.

## Modes

| Mode | Purpose |
|------|---------|
| **Scenarios** | Main mode — branching EMT-level decisions (~50 scenarios) |
| **Rapid facts** | Terminology, vitals ranges, contraindications, ops, med/legal |
| **Skill order** | Arrange assessment/treatment steps correctly |
| **Progress** | Accuracy by topic, spaced-review queue, recent mistakes |

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Progress in **localStorage** (works offline once loaded)
- Optional **Supabase** schema in `supabase/schema.sql` for later sync + course uploads

## Safety / sources

- Every item includes a **source** badge
- Content is labeled **national curriculum** vs **local protocol**
- No unsupported medication doses — oxygen/med assists are qualitative (“per protocol”)

## Screens

1. **Home** — continue, quick 10, weak topics  
2. **Scenario** — one decision per screen  
3. **Review** — sequence, rationale, takeaway  
4. **Progress** — accuracy, due reviews, mistakes  

## Run locally

```bash
cd emt-drill
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content layout

```
src/data/
  helpers.ts              # NATIONAL source helper
  scenarios/*.ts          # ~50 scenarios by category
  rapid-questions.ts      # ~40 rapid items
  skill-orders.ts         # ~12 sequencing drills
  index.ts
```

Categories: airway, cardiac, medical, trauma, OB/peds, assessment, operations, medical/legal.

## Later: upload course materials

The Supabase schema includes `study_materials` and `generated_items` so slides, textbook chapters, study guides, and **local EMS protocols** can become sourced scenarios/questions with passage links. Not wired in V1 UI yet.

## Disclaimer

Educational practice only. Follow your instructor, textbook, and local protocols for patient care.

## Live demo

Temporary Cloudflare Workers URL (claim into your Cloudflare account to keep it):

- App: https://emt-drill.small-flax.workers.dev
- Claim account: https://dash.cloudflare.com/claim-preview?claimToken=Ykr85EuH9q2KpxPzwn1Q64UkMAxRnxleRjvEAxrtQBU

Redeploy:

```bash
npm run build
npx wrangler deploy --assets=./out --name=emt-drill
```

Or with an API token:

```bash
export CLOUDFLARE_API_TOKEN=...
npm run deploy
```
