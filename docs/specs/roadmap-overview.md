# Engineering Portfolio — Roadmap & Document Index

This is the entry point. Read this first, then hand the relevant spec file
to a coding agent one project at a time — don't hand all four at once, the
scope is deliberately sequenced.

## Documents in this set

| File | Purpose |
|---|---|
| `platform-spec.md` | The portfolio site itself — IA, positioning, page templates, stack |
| `atlas-spec.md` | Project 1 — repo architecture visualizer (AI + fullstack anchor) |
| `pulse-spec.md` | Project 2 — SSR performance case study (Nuxt/Vue) |
| `composite-spec.md` | Project 3 — microfrontend migration case study (architecture/writing-led) |
| `adr-template.md` | Copy into every project's `/decisions` folder, one file per decision |
| `readme-template.md` | Copy into every project repo root, fill in per project |

## Sequencing

### Phase 1 — MVP
1. Build **Atlas** first, standalone, using `atlas-spec.md`. This is the
   highest-impact single project (fullstack + AI positioning) and should
   exist and be deployed before the platform site needs to link to it.
2. Build the **platform site** shell using `platform-spec.md`, with the
   `/work/atlas` case study page as the first fully-populated case study.
   At the end of Phase 1 you have a live site with one strong case study —
   enough to start applying.

### Phase 2
3. Build **Pulse** using `pulse-spec.md`. Add `/work/pulse` to the site
   using the same case study page template already built in Phase 1 (no
   template rework needed).

### Phase 3
4. Build **Composite** using `composite-spec.md`. This one is
   writing-and-diagram-led and lower engineering effort than the first two
   — don't over-invest in the POC's polish.
5. Add `/work/composite`, backfill `/notes` (3–5 decision-record write-ups
   pulled from the strongest ADRs across all three projects), and add the
   site's own live Core Web Vitals meta-feature if not already done.

## Non-negotiables across all three projects

These apply regardless of which spec you're working from — reinforce them
if a coding agent starts to drift:

- **ADRs are written as decisions are made, not reconstructed afterward.**
  This is the single highest-leverage authenticity signal across the whole
  portfolio — do not skip it or backfill it at the end.
- **Every project needs at least one honestly documented failure or
  rejected approach.** A project with no visible mistakes reads as staged.
- **No project executes untrusted/cloned code.** Static analysis only
  where relevant (Atlas).
- **AI output is always constrained and validated** — never trust raw
  model output directly into the UI or into a claimed metric.
- **Commit history stays real and incremental** — no squashing the
  iteration history, especially in Pulse where the optimization sequence
  *is* the evidence.
- **Every repo uses the same README structure** (`readme-template.md`) so
  an EM reviewing multiple repos doesn't have to re-orient each time.

## Definition of done for the whole portfolio (not just MVP)

- 3 deployed, working projects, each with a populated case study page on
  the platform site.
- Each project repo: README (from template), `/decisions` with at least
  3–4 real ADRs, tests passing in CI, and — where applicable —
  `/benchmarks` with raw, disclosed-methodology data.
- Platform site: home page hits the 60–120 second hierarchy from
  `platform-spec.md` (including the compact "who's behind this" strip —
  no dedicated `/about` page), all 3 case study pages follow the same
  template, resume is current and consistent with the positioning
  statement used across the site.
- Cross-check: CV / LinkedIn positioning language matches the site's
  positioning statement — this consistency is worth a final pass once all
  three projects are live.
