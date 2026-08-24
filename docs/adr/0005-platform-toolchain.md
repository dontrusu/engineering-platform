# Platform toolchain

**Status:** accepted
**Date:** 2026-08-24
**Project:** Platform

The platform uses Node.js 24 LTS, pnpm with a pinned `packageManager` and Corepack, Next.js 16.3.x with the App Router and Server Components by default, official local `@next/mdx`, Zod, Tailwind CSS v4, locally owned shadcn-style components with selective Radix primitives, Lucide React, ESLint, Prettier, Vitest, Playwright/axe, Vercel, and GitHub Actions. This keeps the implementation current while preserving a small, repository-owned presentation layer; diagram tooling is intentionally deferred until after the first launch.
