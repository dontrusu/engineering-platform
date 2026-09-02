# Universal Project Pages

**Status:** accepted
**Date:** 2026-09-02
**Project:** Platform

Every canonical Project has a public page at `/projects/[slug]`, including a
Project that is still Planned. Creating the Project makes its page available;
the platform does not maintain a separate page-approval state. This replaces
the optional-page model from ADR-0007 with a stable identity and destination
for every Project, while allowing the page to remain a simple truthful
overview rather than a Case Study.

`Planned` and `Live` describe the actual Project's lifecycle, not its page or
the availability of an external link. `Live` means the Project is operational
or released. A verified deployment link is independent and, when present,
appears as `Visit project` on the Project Page.
