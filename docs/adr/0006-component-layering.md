# Component layering

**Status:** accepted
**Date:** 2026-08-27
**Project:** Platform

The platform separates domain-agnostic UI primitives from shared and
route-local compositions. UI primitives live in `components/ui/*` and are
added from the official shadcn/ui registry with the shadcn CLI. Their
generated source, configuration, and dependencies are committed and become
repository-owned code that may receive generic styling, behavior, or
accessibility fixes, but must not contain business props or content. Shared
and domain components live in `components/common/*`, compose UI primitives
by default, and may accept typed domain props without fetching data or making
business decisions.
Route-only components are colocated beside their route's `page.tsx`; once a
route has three or more local-only components, they may be grouped in a
`_components/` or `components/` subfolder.

We chose composition over standalone implementations or adding domain logic
to primitives to preserve a reusable primitive boundary while avoiding
duplicated accessibility and styling behavior. Routes may import either
layer, common components may import UI primitives, and UI primitives may not
depend on common components. New primitives should be added through the CLI
only as needed; the CLI is a scaffolding tool, not a runtime dependency.
Shared domain variants use `class-variance-authority` when needed. A domain
component may use standalone Tailwind markup when composition no longer
meaningfully fits.
