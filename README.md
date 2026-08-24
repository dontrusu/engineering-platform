# Engineering Platform

This repository bootstraps the portfolio platform with the agreed Node.js 24 and pnpm toolchain, Next.js 16.3.x App Router, and a minimal server-rendered home shell.

## Local setup

```bash
corepack enable
pnpm install
pnpm dev
```

## Quality commands

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## CI

GitHub Actions installs dependencies and runs typecheck, lint, build, and tests on each push and pull request.
