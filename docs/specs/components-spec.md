# Component layering — UI primitives and domain components

This spec is the normative guide for component placement and composition.
The architectural rationale and alternatives are recorded in
[ADR-0006](../adr/0006-component-layering.md).

## UI primitives — `components/ui/*`

`components/ui/*` contains domain-agnostic, locally owned UI primitives
generated in the shadcn style, such as `Button`, `Card`, `Badge`, and
`Dialog`.

Generic styling, behavior, and accessibility fixes are allowed, because the
source is repository-owned. Business concepts, content, and domain-specific
props are not allowed in this layer.

## Shared compositions — `components/common/*`

`components/common/*` contains components used across two or more routes,
and components whose props or rendering express portfolio concepts such as
Projects, Case Studies, Notes, Proof Points, Evidence, or availability
states. It also contains generic cross-route compositions that are above the
primitive level.

Domain components may accept domain-specific typed props, but data fetching
and business decisions remain outside the component.

## Route-local components

Components used by one route and without an established domain contract
are colocated directly beside that route's `page.tsx`. Once a route segment
accumulates three or more local-only components, group them in a
`_components/` or `components/` subfolder to keep the segment scannable.

## Composition and dependencies

Domain components compose UI primitives by default. Routes may import both
layers; domain/common components may import UI primitives; UI primitives must
not import domain/common components.

If composition no longer meaningfully fits a domain component, a standalone
Tailwind implementation is allowed. No additional exception document is
required.

Shared domain variants use `class-variance-authority`. Add the dependency
when the first such variant is introduced; do not install it preemptively.

## Completion checklist

A new shared or domain component is complete when it has:

- Typed public props.
- Semantic, accessible behavior.
- Responsive states appropriate to its use.
- A focused test when its behavior is non-trivial, using the repository's
  existing Vitest or Playwright/axe setup as appropriate.

Do not introduce Storybook for this architecture.

The rule applies to all new work. Existing repeated inline UI may be moved
to the prescribed folders opportunistically when that code is changed.
