# Component layering — UI primitives and domain components

This spec is the normative guide for component placement and composition.
The architectural rationale and alternatives are recorded in
[ADR-0006](../adr/0006-component-layering.md).

## UI primitives — `components/ui/*`

`components/ui/*` contains domain-agnostic UI primitives installed from
the official [shadcn/ui](https://ui.shadcn.com/) component registry using
the shadcn CLI, such as `Button`, `Card`, `Badge`, and `Dialog`. The CLI
configuration and generated source are committed to the repository.

The generated source becomes repository-owned: generic styling, behavior,
and accessibility fixes are allowed. Business concepts, content, and
domain-specific props are not allowed in this layer. Use the CLI when
adding a new primitive so its dependencies and generated files stay
consistent with the registry.

## Shared compositions — `components/common/*`

`components/common/*` contains components used across two or more routes,
and components whose props or rendering express portfolio concepts such as
Projects, Case Studies, Notes, Proof Points, Evidence, or availability
states. It also contains generic cross-route compositions that are above the
primitive level.

Domain components may accept domain-specific typed props, but data fetching
and business decisions remain outside the component.

## Route-local components

Components owned exclusively by one route segment and without an established
domain contract are colocated beside that segment's `page.tsx`, `layout.tsx`,
or other route artifact. A layout remains the sole owner of its private
components even though it renders them across descendant routes. Once a segment
accumulates three or more local-only components, group them in a `_components/`
or `components/` subfolder to keep the segment scannable.

## Composition and dependencies

Domain components compose UI primitives by default. Routes may import both
layers; domain/common components may import UI primitives; UI primitives must
not import domain/common components.

If composition no longer meaningfully fits a domain component, a standalone
Tailwind implementation is allowed. No additional exception document is
required.

Use the dependencies selected by the shadcn CLI for generated primitives.
Shared domain variants should follow the same `class-variance-authority`
pattern; add that dependency when the first such variant needs it if it
was not already introduced by a generated primitive.

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
