# Engineering Platform

This repository bootstraps the portfolio platform with the agreed Node.js 24 and pnpm toolchain, Next.js 16.3.x App Router, and a minimal server-rendered home shell.

## Local setup

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Projects are read at request time from Neon PostgreSQL. Database secrets belong
in `.env.local`; never commit them. Existing Projects are entered through
Neon's table editor.

## Database commands

```bash
pnpm db:generate # generate SQL after changing db/schema.ts; no database required
pnpm db:migrate  # apply migrations using DATABASE_ADMIN_URL from .env.local
pnpm db:studio   # inspect the database using DATABASE_ADMIN_URL from .env.local
```

The running application uses the read-only `DATABASE_URL`. Only manual schema
migrations use the privileged `DATABASE_ADMIN_URL`.

## Quality commands

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## CI

GitHub Actions installs dependencies and runs typecheck, lint, build, and tests
on each push and pull request. Automated browser tests select deterministic
Project fixtures and do not need database credentials.
