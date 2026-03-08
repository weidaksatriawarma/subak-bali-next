# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

## Project Overview

Subak Hijau — an AI-powered sustainability consultant web app for Indonesian MSMEs (UMKM). Built for the PROXOCORIS 2026 competition. The full PRD is in `PLAN.md`.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint (flat config, Next.js core-web-vitals + typescript)
npm run typecheck    # TypeScript type checking (tsc --noEmit)
npm run format       # Prettier format all .ts/.tsx files
```

## Tech Stack

- **Next.js 16** with App Router (NOT Pages Router)
- **React 19** with Server Components by default
- **TypeScript** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` (config is in `app/globals.css`, NOT `tailwind.config.ts`). Colors use CSS custom properties with `oklch()` values.
- **shadcn/ui v4** — components go in `components/ui/`. Add with `npx shadcn@latest add <component>`
- **next-themes** for dark mode (class-based, toggle with `d` key)
- **Supabase** for database, auth, and realtime (using `@supabase/ssr` pattern)
- **Vercel AI SDK v6** for chat streaming, structured generation, and tool calling
- **Recharts** for data visualization (use direct hex colors, NOT CSS vars — CSS vars don't work in SVG)
- **Framer Motion** for scroll-triggered entrance animations (`useInView({ once: true })`, `useReducedMotion()` for a11y)
- **Zod v4** for schema validation (with RHF needs `Resolver` cast for type compatibility)

## Architecture

### App Router Structure
- `/` — Landing page (public)
- `/(auth)/login`, `/(auth)/register` — Supabase Auth
- `/onboarding` — Multi-step business profile setup (first login)
- `/dashboard/*` — Protected routes with sidebar layout (overview, assessment, score, roadmap, chat, progress, settings)
- `/api/chat` — AI chat streaming endpoint (`streamText`)
- `/api/assessment/score` — AI score generation (`generateText` + `Output.object`)
- `/api/assessment/roadmap` — AI roadmap generation (`generateText` + `Output.object`)

### Key Directories
- `app/` — Next.js App Router pages and API routes
- `components/ui/` — shadcn/ui primitives (auto-generated, don't manually edit)
- `components/` — Custom components (landing/, dashboard/, forms/, shared/)
- `lib/supabase/` — Supabase client helpers (client.ts for browser, server.ts for server, middleware.ts)
- `lib/ai/` — AI prompts, Zod schemas, tools (calculateCO2, lookupRegulation, getIndustryBenchmark), regulations data
- `lib/carbon.ts` — Carbon footprint calculator, savings estimator, regulatory compliance checker (Indonesian emission factors)
- `lib/gamification/` — Industry ranks, industry-specific scoring weights, celebrations, streaks, industry questions
- `lib/achievements.ts` — Achievement badges based on roadmap item completion
- `lib/security.ts` — Rate limiting (in-memory store), prompt sanitization, timing-safe comparison
- `lib/i18n/dictionaries.ts` — Bilingual dictionaries (`Locale = "id" | "en"`) with LanguageContext provider
- `lib/constants.ts` — Indonesian labels for all enums
- `types/database.ts` — TypeScript interfaces for all Supabase tables

### Path Alias
`@/*` maps to project root (e.g., `import { cn } from "@/lib/utils"`)

## Code Conventions

- **No semicolons**, double quotes, trailing commas (es5), 2-space indent, 80-char print width (see `.prettierrc`)
- Prettier uses `prettier-plugin-tailwindcss` with `cn` and `cva` as tailwind functions
- shadcn theme is pre-styled — use existing theme, do NOT override
- Primary language for UI text is **Bahasa Indonesia**, English secondary
- Mobile-first responsive design
- ScrollArea doesn't forward refs — use native div for scroll-to-bottom patterns

## Database

Supabase PostgreSQL with RLS. Tables: `profiles`, `assessments`, `scores`, `roadmaps`, `roadmap_items`, `chat_conversations`, `chat_messages`. Full schema in `PLAN.md` section 3. Migrations in `supabase/migrations/` (001–009).

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ANTHROPIC_API_KEY
OPENAI_API_KEY
```

## AI Integration (AI SDK v6)

- `gateway()` imported from `"ai"` package (NOT `@ai-sdk/gateway`) for model routing (primary: Claude Sonnet, fallback: GPT-4o)
- Score/roadmap generation: `generateText()` + `Output.object()` with Zod schemas (NOT the deprecated `generateObject`)
- Chat: `streamText()` server-side; client uses `DefaultChatTransport`, `sendMessage({text})`, `message.parts`
- Tools: use `tool()` factory with `inputSchema` (not `parameters`); tool parts use `isToolUIPart()` + `state: 'output-available'`
- Multi-step: use `stopWhen: stepCountIs(N)` (not deprecated `maxSteps`)
- System prompts inject user business context (profile + scores + industry-specific weights)

## Security

- API rate limiting per user per action (chat: 20/min, score/roadmap: 5/min) via `lib/security.ts`
- Prompt sanitization removes newlines and non-Unicode characters with max length
- Redirect URL validation with path whitelist

## Gamification System

- **Industry Ranks**: 5-tier ranking per industry type (e.g., F&B: "Warung Pemula" → "Chef Sustainability")
- **Scoring Weights**: Category weights differ per industry (e.g., F&B: waste=30%, manufacturing: energy=30%)
- **Celebrations**: Triggered on completion milestones (25/50/75/100%), rank changes, category mastery, streaks
- **Streaks**: ISO week-based weekly assessment streaks
- **Industry Questions**: Additional assessment questions per industry type (fnb, retail, manufacturing, services, agriculture)
