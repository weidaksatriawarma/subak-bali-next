# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

## Project Overview

GreenAdvisor — an AI-powered sustainability consultant web app for Indonesian MSMEs (UMKM). Built for the PROXOCORIS 2026 competition. The full PRD is in `PLAN.md`.

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
- **Tailwind CSS v4** via `@tailwindcss/postcss` (config is in `app/globals.css`, NOT `tailwind.config.ts`)
- **shadcn/ui v4** — components go in `components/ui/`. Add with `npx shadcn@latest add <component>`
- **next-themes** for dark mode (class-based, toggle with `d` key)
- **Supabase** for database, auth, and realtime (using `@supabase/ssr` pattern)
- **Vercel AI SDK** with AI Gateway for chat streaming and structured generation
- **Recharts** for data visualization

## Architecture

### App Router Structure (from PLAN.md)
- `/` — Landing page (public)
- `/(auth)/login`, `/(auth)/register` — Supabase Auth
- `/onboarding` — Multi-step business profile setup (first login)
- `/dashboard/*` — Protected routes with sidebar layout (overview, assessment, score, roadmap, chat, progress, settings)
- `/api/chat` — AI chat streaming endpoint (`streamText` + `useChat`)
- `/api/assessment/score` — AI score generation (`generateObject`)
- `/api/assessment/roadmap` — AI roadmap generation (`generateObject`)

### Key Directories
- `app/` — Next.js App Router pages and API routes
- `components/ui/` — shadcn/ui primitives (auto-generated, don't manually edit)
- `components/` — Custom components (landing/, dashboard/, forms/, shared/)
- `lib/supabase/` — Supabase client helpers (client.ts for browser, server.ts for server, middleware.ts)
- `lib/ai/` — AI prompts and Zod schemas for structured generation
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `types/database.ts` — Supabase generated types

### Path Alias
`@/*` maps to project root (e.g., `import { cn } from "@/lib/utils"`)

## Code Conventions

- **No semicolons**, double quotes, trailing commas (es5), 2-space indent (see `.prettierrc`)
- Prettier uses `prettier-plugin-tailwindcss` with `cn` and `cva` as tailwind functions
- Tailwind theme colors use CSS custom properties with oklch values in `app/globals.css`
- shadcn theme is pre-styled — use existing theme, do NOT override
- Primary language for UI text is **Bahasa Indonesia**, English secondary
- Mobile-first responsive design

## Database

Supabase PostgreSQL with RLS. Tables: `profiles`, `assessments`, `scores`, `roadmaps`, `roadmap_items`, `chat_conversations`, `chat_messages`. Full schema in `PLAN.md` section 3.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
ANTHROPIC_API_KEY
OPENAI_API_KEY
```

## AI Integration

- Use `gateway()` from `@ai-sdk/gateway` for model routing (primary: `anthropic:claude-sonnet-4-20250514`, fallback: `openai:gpt-4o`)
- Score/roadmap generation use `generateObject()` with Zod schemas
- Chat uses `streamText()` server-side with `useChat()` client-side
- System prompts inject user business context (profile + scores)
