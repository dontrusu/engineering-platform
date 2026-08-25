# Portfolio Platform — Specification (v1 / MVP)

> This is the site itself — the hub that hosts and presents Atlas, Pulse,
> and Composite. It is also, on its own, evidence: a fast, correctly
> server-rendered, well-architected application built by the same person
> who wrote the case studies it links to.

## 1. Positioning (content requirement, not just design)

Headline framing to use across the site:

> "A resume can't show how I actually think through a hard technical
> problem — so I built this instead. Real systems, real decisions, real
> trade-offs, judged on their own terms."

This is deliberately not a title/stack/years-of-experience headline. The
site's existence _is_ the pitch — it should read as the honest reason
someone would build this rather than just send another CV, not as a label
("frontend engineer," "fullstack engineer") the person is asking to be
filed under. Let the case studies demonstrate range across frontend, SSR,
and backend concerns; the headline doesn't need to pre-claim a title.

Every page should reinforce this without repeating it verbatim.

## 2. Target Audience & Priority

1. Technical recruiter — 60–120 second scan, needs to walk away knowing
   level + specialization + where the evidence lives.
2. Engineering manager / staff engineer — 5–15 minute deep read before or
   during an interview loop, needs to reach decisions → code → results →
   retrospective without hunting.
3. Interviewer — pulling discussion topics directly from a case study
   during a live interview.

## 3. Information Architecture

```
/            → positioning + a compact "who's behind this" strip + 3
               real-experience proof points + 3 case study cards +
               resume/contact CTA
/work        → index of the 3 Projects; unavailable Projects are not linked
/work/atlas  → Atlas Stub until the real Case Study is built
/work/pulse  → available once its Case Study exists
/work/composite → available once its Case Study exists
/notes       → Notes, with an honest empty state when none exist
/resume      → page shell with explicit content placeholders until real
               resume/contact material is available
```

No blog, no tags/categories system, no CMS — content is authored directly
as MDX/markdown in the repo. This is a deliberate simplicity decision: the
site should not look over-engineered relative to its actual content volume
(3 case studies, 5 notes). Note this as an ADR if a coding agent suggests a
CMS — the answer is "not yet, would revisit past N case studies."

## 4. Page-Level Content Requirements

### `/` (home)

- 0–10s zone: name, one-line positioning (the "why this site exists"
  framing from section 1).
- 10–30s zone: 3 quantified real-experience proof points from actual jobs
  (not side projects). Until approved Proof Points are gathered, retain
  the section structure but show an editorial notice rather than example
  claims.
- 30–60s zone: 3 case study cards — one-sentence problem framing, tech
  badges, and a headline metric only when one is verified and meaningful.
  Unavailable Projects omit metrics and are not linked. No screenshot-first
  grid.
- 60–120s zone: a short "who's behind this" strip — one compact paragraph
  covering the breadth of what's been built professionally (enterprise
  tooling, AI-assisted workflows, security platforms, high-traffic
  commerce infra) as a single narrative sentence or two, not an itemized
  per-project list. This replaces a dedicated `/about` page — the case
  studies carry the depth, this strip just gives a sense of range and
  voice. Until approved background copy exists, show an editorial notice.
  Tone should read as a person who got tired of resumes and built
  something better, not a corporate bio.
- Then: short "how I work" strip (3–4 approved statements, not an essay) +
  resume/contact CTA, persistent/sticky. Use an editorial notice until the
  statements are approved.
- Explicitly excluded: hero animation, skill-icon wall, testimonials
  carousel, long "About Me" text above the fold, a dedicated `/about` page
  that just restates the resume.

### `/work/[slug]` (case study page — shared questions, flexible structure)

Do not force every case study through the same nine sections in the same
order — that produces the exact "symmetric case studies built for visual
consistency" smell that undermines credibility. Instead, every case study
must **answer the same underlying questions**, but the structure and
emphasis should fit the project:

Core questions every case study must answer somewhere:

- What was the problem, and what made it non-trivial?
- What were the real constraints?
- What did the architecture look like, and why?
- What decisions were genuinely contested (multiple viable options, real
  consequences) — and why this one?
- What trade-offs were accepted, and what was rejected?
- What evidence supports the claims (metrics, benchmarks, or reasoning —
  whichever actually fits this project)?
- What would be done differently, or what's a known limitation?
- Where's the source / live demo / decision record?

Suggested (not mandatory) structures per project, reflecting what each one
is actually built to prove:

- **Atlas** (build): Problem → Architecture → AI boundary (how output is
  constrained) → Backend/data model → Auth → Key decisions → Limitations →
  Trade-offs → Deployment → Interview discussion points.
- **Pulse** (measure): Problem → Baseline → Hypothesis → Experiment →
  Measurement methodology → Optimization(s) → Results → Trade-offs →
  Lessons.
- **Composite** (reason): Migration problem → Constraints → Current/target
  architecture → Migration strategy → Rejected alternatives → POC evidence
  → Risks → Lessons.

A metrics/benchmark section only belongs on a case study where a metric is
actually meaningful and reproducible for that project's problem — never
add one just to keep the cards visually symmetrical. Composite in
particular may have little to no metrics section; architecture quality and
migration safety are its evidence, not a number.

### `/notes`

Publish notes only when they emerge naturally from a genuinely difficult or
interesting decision made while building one of the case studies — do not
write notes to hit a target count. Zero, two, or five notes are all fine;
quality and authenticity matter more than quantity. Cap at 5 so this never
becomes an ongoing content commitment.
When no Note exists, show a concise empty state explaining this rule.

## 5. Visual Direction

Reference point: Vercel / Linear / Stripe engineering-blog aesthetic —
type-driven, restrained, high-contrast, generous whitespace, one accent
color, monospace for code/metrics/data. No gradients-as-decoration, no 3D,
no particle backgrounds, no scroll-jacking. Interactions exist only where
they prove something (e.g. a live-updating metric, an actually-fast route
transition) — not for decoration. Architecture diagram tooling and diagram
content are deferred until after the first platform launch; initial pages may
use prose or a simple placeholder.

## 6. Performance scope

Removed from MVP by ADR-0003. The platform may add an honest performance
signal later, but it is not required or publicly displayed in the initial
content-focused release.

## 7. Tech Stack

- Node.js 24 LTS, with the runtime declared in `package.json` for pnpm and CI.
- pnpm with a committed `pnpm-lock.yaml`, a pinned `packageManager` field,
  and Corepack enabled in local and CI setup.
- Next.js 16.3.x (App Router), React Server Components by default, and
  TypeScript strict.
- MDX through the official `@next/mdx` integration, with a small local
  content loader.
- Zod for build-time validation of separate Case Study and Note schemas.
- Tailwind CSS v4, locally owned shadcn-style components scaffolded only as
  needed, and selective Radix primitives for keyboard-sensitive interaction.
- Lucide React for occasional interface icons.
- ESLint with the Next.js/TypeScript configuration and Prettier.
- Vitest for content/schema and pure UI logic tests.
- Playwright with axe for route, keyboard-flow, and accessibility tests.
- Vercel deployment and GitHub Actions for required CI.
- No database. The platform is a presentation layer for the evidence, not
  a fourth engineering project — it must not compete for scope with Atlas,
  Pulse, or Composite. If a coding agent proposes infrastructure here
  (a DB, an admin panel, a CMS), the default answer is no unless there's a
  concrete, non-portfolio-optics reason for it.
- Deployed on Vercel.
- No auth needed on the platform site itself (auth lives inside Atlas/Pulse
  where it's actually part of the demonstrated skill).

Standard scripts:
`dev`, `build`, `start`, `lint`, `format`, `format:check`, `typecheck`,
`test`, and `test:e2e`.

## 8. Non-Functional Requirements

- Fully keyboard-navigable, semantic HTML, passes basic automated
  accessibility checks (axe or similar) — accessibility wasn't listed as a
  headline priority, but a portfolio claiming senior frontend craft with an
  inaccessible site undercuts its own argument.
- No layout shift from font loading or late-loading case study cards.

## 9. Repo Structure

```
/app                — Next.js app
/content/work        — MDX case study content
/content/notes        — MDX notes
/components
/components/ui       — locally owned shadcn-style components
/lib
/tests
package.json
pnpm-lock.yaml
README.md
```

## 10. Definition of Done (MVP)

- `/`, `/work`, `/work/atlas`, `/resume` live and
  deployed, with `/work/atlas` presented as a truthful Atlas Stub until
  Atlas is built and its Case Study is ready. Pulse and Composite appear as
  Unavailable Projects without detail routes. `/notes` has an honest empty
  state when no Note exists, and `/resume` contains no fabricated content.
- Case study page template implemented and reusable for Pulse and Composite
  without rework.
- Basic accessibility check passing.
