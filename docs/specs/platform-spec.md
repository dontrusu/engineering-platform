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
site's existence *is* the pitch — it should read as the honest reason
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
/work        → index of the 3 case studies
/work/atlas
/work/pulse
/work/composite
/notes       → 3–5 short decision-record write-ups
/resume      → downloadable PDF + contact links
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
  (not side projects) — e.g. "Built LLM-based planning tooling used for
  enterprise initiative estimation," "Optimized Core Web Vitals across a
  high-traffic e-commerce microfrontend network," "Shipped reusable
  component systems adopted across an enterprise platform."
- 30–60s zone: 3 case study cards — one-sentence problem framing, tech
  badges, one headline metric each. No screenshot-first grid.
- 60–120s zone: a short "who's behind this" strip — one compact paragraph
  covering the breadth of what's been built professionally (enterprise
  tooling, AI-assisted workflows, security platforms, high-traffic
  commerce infra) as a single narrative sentence or two, not an itemized
  per-project list. This replaces a dedicated `/about` page — the case
  studies carry the depth, this strip just gives a sense of range and
  voice. Tone should read as a person who got tired of resumes and built
  something better, not a corporate bio.
- Then: short "how I work" strip (3–4 short statements, not an essay) +
  resume/contact CTA, persistent/sticky.
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

## 5. Visual Direction

Reference point: Vercel / Linear / Stripe engineering-blog aesthetic —
type-driven, restrained, high-contrast, generous whitespace, one accent
color, monospace for code/metrics/data. No gradients-as-decoration, no 3D,
no particle backgrounds, no scroll-jacking. Interactions exist only where
they prove something (e.g. a live-updating metric, an actually-fast route
transition) — not for decoration.

## 6. Meta-Signal Feature: the site's own performance, shown honestly

Surface the site's own real Core Web Vitals somewhere unobtrusive (footer,
or a small stat near the "who's behind this" strip) using the client-side
`web-vitals` library, reported honestly at build/deploy time or on-demand —
**no database required for this.** Fullstack/persistence skill is already
demonstrated for real in Atlas; duplicating it here just to log a metric
nobody asked to see history of is scope the platform doesn't need. If
historical CWV tracking ever becomes genuinely useful, it's a separate,
later enhancement — not an MVP requirement.

## 7. Tech Stack

- Next.js (App Router), TypeScript strict.
- MDX for case study and notes content, stored in the repo.
- No database. The platform is a presentation layer for the evidence, not
  a fourth engineering project — it must not compete for scope with Atlas,
  Pulse, or Composite. If a coding agent proposes infrastructure here
  (a DB, an admin panel, a CMS), the default answer is no unless there's a
  concrete, non-portfolio-optics reason for it.
- Deployed on Vercel.
- No auth needed on the platform site itself (auth lives inside Atlas/Pulse
  where it's actually part of the demonstrated skill).

## 8. Non-Functional Requirements

- LCP, INP, TTFB targets in the "good" Core Web Vitals thresholds on a
  throttled connection profile — and actually measured, not assumed.
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
/lib
/tests
README.md
```

## 10. Definition of Done (MVP)

- `/`, `/work`, `/work/atlas` (once Atlas is built), `/resume` live and
  deployed, with the home page's "who's behind this" strip populated.
- Case study page template implemented and reusable for Pulse and Composite
  without rework.
- Site's own Core Web Vitals meet target thresholds, verified, not assumed.
- Basic accessibility check passing.