# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict), path alias set to "@/*"
- Styling: Tailwind CSS 4 (globals.css imported in the root layout)
- Auth: NextAuth (credentials + Google + GitHub) with Prisma adapter
- Data: Prisma (MySQL) with generated client output under app/generated/prisma

Common commands
- Install dependencies
  - npm install
- Prisma (required before running locally or building)
  - Generate client (output is app/generated/prisma)
    - npx prisma generate
  - Apply migrations to local DB (uses DATABASE_URL)
    - npx prisma migrate dev
- Develop
  - npm run dev
- Build
  - npm run build
- Start (after build)
  - npm run start
- Lint
  - npm run lint
- Tests
  - No test setup detected (no jest/vitest/cypress config; no test script in package.json).

Environment configuration
Set these in a .env.local for local development:
- DATABASE_URL: MySQL connection string used by Prisma
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: for NextAuth Google provider
- GITHUB_ID, GITHUB_SECRET: for NextAuth GitHub provider

High‑level architecture and structure
- App Router structure (app/)
  - app/layout.tsx defines the root HTML skeleton, loads Inter font, imports globals.css, and wraps the app with a client-side Provider (app/auth/Provider) that mounts NextAuth’s SessionProvider. A shared NavBar and ChatBot are rendered at this level.
  - app/page.tsx is the home route and demonstrates server component behavior by calling getServerSession to read the authenticated user.
  - Additional routes include nested segments and dynamic routing under app/users, app/products, app/dashboard, app/admin, etc. Loading and error boundaries are present via app/loading.tsx and app/error.tsx.
- API Routes (app/api/*)
  - REST-style handlers implemented using the Next.js App Router route handlers. Notable resources:
    - /api/users and /api/users/[id]
    - /api/products and /api/products/[id]
    - /api/auth/[...nextauth] for NextAuth
  - Handlers use Zod for input validation and Prisma for data access.
- Authentication (NextAuth)
  - Credentials provider verifies user via bcrypt against hashedPassword in the database.
  - Google and GitHub OAuth providers are configured; sessions use the JWT strategy.
  - PrismaAdapter persists users/sessions to the database. After sign-in, redirect is to /dashboard.
  - A client-only Provider component (app/auth/Provider.tsx) mounts SessionProvider and wraps the app.
- Database (Prisma)
  - prisma/schema.prisma targets MySQL. The client generator outputs to app/generated/prisma, and the runtime code imports PrismaClient from that path via prisma/client.ts.
  - Models include NextAuth tables (User, Account, Session, VerificationToken, Authenticator). User IDs are cuid-based strings.
  - Migrations are checked in under prisma/migrations/*.
- TypeScript and linting
  - tsconfig.json is strict and uses bundler moduleResolution. Path alias "@/*" maps to the repo root (e.g., import prisma from "@/prisma/client").
  - ESLint extends next/core-web-vitals.
- Next.js config
  - next.config.js currently uses defaults (no custom config).

Notes from README
- Start the dev server with npm run dev and edit app/page.tsx; changes hot-reload at http://localhost:3000/.

Repository‑specific tips
- Ensure Prisma codegen is run (npx prisma generate) before building or starting the app so that app/generated/prisma exists and imports in prisma/client.ts resolve.
- A working DATABASE_URL is required for API routes using Prisma (users/products) and for NextAuth’s PrismaAdapter.
