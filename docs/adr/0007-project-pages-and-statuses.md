# Project pages and deployment statuses

**Status:** accepted
**Date:** 2026-08-28
**Project:** Platform

The platform uses `/projects` as the canonical Project index and `/projects/[slug]` for internal Project Pages. A Project Page may exist before the actual Project is deployed; a separate `Visit project` link appears only when a verified deployed-project URL exists. Project status is limited to `Planned` and `Live`, where `Live` means the actual Project is visitable and does not imply that its Case Study or Evidence is complete. This supersedes the earlier Work-route and Atlas Stub availability model in ADR-0002 and ADR-0004.
