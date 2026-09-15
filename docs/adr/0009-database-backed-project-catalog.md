# Database-backed Project catalog

**Status:** accepted
**Date:** 2026-09-08
**Project:** Platform

The platform stores its Project catalog in Neon-managed PostgreSQL and reads it
at runtime through Drizzle ORM. This replaces the source-authored Project
collection so Projects can be managed through Neon's dashboard without code
changes or redeployment, while keeping authoring, authentication, and write
operations outside the application. PostgreSQL constraints protect core data
invariants, PostgreSQL filters and orders public reads, and a dedicated
server-only data module validates minimal Project DTOs with Zod. The deployed
application connects with a read-only database role.

Project Visibility is a boolean editorial control independent of the Project's
`Planned` or `Live` status. New Projects are hidden by default. Only visible
Projects appear on public lists, in the sitemap, and at Project Page routes;
hidden and unknown slugs both return `404`. This supersedes ADR-0008's rule that
every Project has a public Project Page: every _visible_ Project now has one.

Project reads are uncached so dashboard changes appear on the next request.
Development and production use separate databases, and Vercel previews read
from development. The schema is changed with explicit, manually run migrations;
schema tests exercise Project DTO validation, route tests mock the server-only
data module, and browser tests use deterministic Project fixtures. Migrations
and real queries are verified manually.

## Consequences

The database becomes the single source of truth, so the platform fails
explicitly when it cannot read Project data rather than falling back to a
bundled collection. Existing Projects must be entered manually in both
environments before database-backed reads are deployed. Normal removal hides a
Project instead of deleting it. Slugs may be changed, but previous slugs are not
retained and their former URLs return `404`.
