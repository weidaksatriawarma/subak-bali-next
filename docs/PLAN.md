# Subak Hijau — Product Requirements Document (PRD)

> **AI-Powered Sustainability Consultant untuk Bisnis UMKM Indonesia**
> Version 1.0 | March 2026 | Tim Subak Code — PROXOCORIS 2026

---

## 1. Project Overview

### 1.1 What is Subak Hijau?

Subak Hijau is a web application that acts as an AI-powered sustainability consultant for Indonesian MSMEs (UMKM). It helps businesses assess their environmental impact, generates a Sustainability Score (0–100), provides AI-generated roadmaps for going green, and offers real-time AI chat consultation — all at a fraction of the cost of traditional sustainability consultants ($5,000–$200,000+).

### 1.2 Core Problem

- 65 million MSMEs in Indonesia have no affordable sustainability guidance
- Traditional sustainability consulting costs $5,000–$200,000+ per project
- Only 7.7% of global SMEs do sustainability reporting (UNCTAD 2024)
- MSMEs generate 216 million tons CO₂/year in Indonesia alone
- Zero AI-powered sustainability platforms exist for emerging market MSMEs

### 1.3 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui (pre-styled) |
| Database | Supabase (PostgreSQL + Auth + Realtime + Storage) |
| AI | Vercel AI SDK + AI Gateway |
| AI Models | Claude (Anthropic) via AI Gateway, fallback GPT-4o |
| Charts | Recharts |
| Deployment | Vercel |

### 1.4 Key Constraints

- Must be a functional web app for competition demo (deadline: March 10–14, 2026)
- Pitching on April 5 — needs polished UI and working live demo
- Judging criteria: Live Demo 30%, UI/UX 20%, Presentation 25%, Relevance & Impact 25%
- shadcn/ui is already styled — use existing theme, do NOT override
- Indonesian language primary, English secondary
- Mobile-first responsive design

---

## 2. Information Architecture

```
/                           → Landing page (hero, features, CTA)
/login                      → Login page (Supabase Auth)
/register                   → Register page (Supabase Auth)
/onboarding                 → Business profile setup (multi-step form)
/dashboard                  → Main dashboard (score, roadmap summary, quick actions)
/dashboard/assessment       → Sustainability assessment questionnaire
/dashboard/score            → Detailed score breakdown with charts
/dashboard/roadmap          → AI-generated roadmap with checklist
/dashboard/chat             → AI sustainability consultant chat
/dashboard/progress         → Progress tracking & history
/dashboard/settings         → Account & business profile settings
```

---

## 3. Database Schema (Supabase)

### 3.1 Tables

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  business_name text not null,
  industry text not null,           -- enum: 'fnb', 'retail', 'manufacturing', 'services', 'agriculture', 'other'
  business_size text not null,      -- enum: 'micro', 'small', 'medium'
  employee_count int,
  location text,                    -- city/province
  description text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- ASSESSMENTS
-- ============================================
create table public.assessments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'draft',      -- 'draft', 'completed'
  
  -- Energy
  energy_source text,               -- 'pln_only', 'pln_solar', 'solar_only', 'diesel_generator'
  monthly_electricity_kwh numeric,
  uses_energy_efficient_equipment boolean default false,
  
  -- Waste
  waste_management text,            -- 'none', 'segregation', 'recycling', 'composting', 'circular'
  plastic_reduction_efforts boolean default false,
  waste_volume_kg_monthly numeric,
  
  -- Supply Chain
  local_sourcing_percentage numeric, -- 0-100
  supplier_sustainability_check boolean default false,
  packaging_type text,              -- 'single_use_plastic', 'recyclable', 'biodegradable', 'reusable'
  
  -- Operations
  water_conservation boolean default false,
  digital_operations boolean default false,  -- paperless, digital receipts etc
  transportation_type text,         -- 'gasoline', 'electric', 'hybrid', 'bicycle', 'none'
  
  -- Policy
  has_sustainability_policy boolean default false,
  employee_sustainability_training boolean default false,
  community_engagement boolean default false,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SCORES
-- ============================================
create table public.scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  assessment_id uuid references public.assessments(id) on delete cascade not null,
  
  total_score numeric not null,          -- 0-100
  energy_score numeric not null,         -- 0-100
  waste_score numeric not null,          -- 0-100
  supply_chain_score numeric not null,   -- 0-100
  operations_score numeric not null,     -- 0-100
  policy_score numeric not null,         -- 0-100
  
  ai_summary text,                       -- AI-generated summary of score
  industry_benchmark numeric,            -- average score for same industry
  
  created_at timestamptz default now()
);

-- ============================================
-- ROADMAPS
-- ============================================
create table public.roadmaps (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  score_id uuid references public.scores(id) on delete cascade not null,
  
  title text not null,
  ai_generated_content jsonb not null,   -- full roadmap JSON from AI
  
  created_at timestamptz default now()
);

-- ============================================
-- ROADMAP_ITEMS (individual action items)
-- ============================================
create table public.roadmap_items (
  id uuid default uuid_generate_v4() primary key,
  roadmap_id uuid references public.roadmaps(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  
  title text not null,
  description text not null,
  category text not null,               -- 'energy', 'waste', 'supply_chain', 'operations', 'policy'
  priority text not null,               -- 'high', 'medium', 'low'
  estimated_impact text,                -- 'high', 'medium', 'low'
  estimated_cost text,                  -- 'free', 'low', 'medium', 'high'
  timeline text,                        -- '1_week', '1_month', '3_months', '6_months', '1_year'
  
  is_completed boolean default false,
  completed_at timestamptz,
  sort_order int default 0,
  
  created_at timestamptz default now()
);

-- ============================================
-- CHAT_CONVERSATIONS
-- ============================================
create table public.chat_conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'New Conversation',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- CHAT_MESSAGES
-- ============================================
create table public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.chat_conversations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null,                    -- 'user', 'assistant'
  content text not null,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.scores enable row level security;
alter table public.roadmaps enable row level security;
alter table public.roadmap_items enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;

-- Profiles: users can only access their own
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Assessments: users can only access their own
create policy "Users can CRUD own assessments" on public.assessments for all using (auth.uid() = user_id);

-- Scores: users can only access their own
create policy "Users can view own scores" on public.scores for select using (auth.uid() = user_id);
create policy "Users can insert own scores" on public.scores for insert with check (auth.uid() = user_id);

-- Roadmaps: users can only access their own
create policy "Users can CRUD own roadmaps" on public.roadmaps for all using (auth.uid() = user_id);

-- Roadmap Items: users can only access their own
create policy "Users can CRUD own roadmap items" on public.roadmap_items for all using (auth.uid() = user_id);

-- Chat: users can only access their own
create policy "Users can CRUD own conversations" on public.chat_conversations for all using (auth.uid() = user_id);
create policy "Users can CRUD own messages" on public.chat_messages for all using (auth.uid() = user_id);
```

### 3.2 Supabase Auth Configuration

- Enable Email/Password provider
- Enable Google OAuth provider
- Set redirect URL to `/dashboard` after login
- Enable email confirmation (optional for MVP — can skip)

---

## 4. Feature Specifications

### 4.1 Landing Page (`/`)

**Purpose:** Convert visitors to sign up.

**Sections:**
1. **Hero** — headline: "Konsultan Sustainability AI untuk Bisnis Anda", subheadline about affordable AI-powered sustainability, CTA "Mulai Gratis"
2. **Problem stats** — 3 stat cards: "65 Juta UMKM belum punya strategi sustainability", "79% konsumen pilih brand ramah lingkungan", "$5,000+ biaya konsultan per sesi"
3. **How it works** — 3-step visual: Profil Bisnis → AI Assessment → Roadmap & Tracking
4. **Features** — 4 cards: AI Chat, Sustainability Score, Roadmap Generator, Progress Tracking
5. **CTA** — "Mulai Assessment Gratis Sekarang"
6. **Footer** — links, credits, PROXOCORIS 2026 badge

**Notes:** Use shadcn components. No auth required to view.

---

### 4.2 Authentication (`/login`, `/register`)

**Implementation:** Supabase Auth with `@supabase/ssr`

```typescript
// Use Supabase SSR client pattern
// Server: createServerClient from @supabase/ssr
// Client: createBrowserClient from @supabase/ssr
// Middleware: handle auth session refresh
```

**Login page:**
- Email + password form
- Google OAuth button
- Link to register

**Register page:**
- Email + password form
- Google OAuth button
- Link to login

**Middleware (`middleware.ts`):**
- Refresh auth session on every request
- Redirect unauthenticated users from `/dashboard/*` to `/login`
- Redirect authenticated users from `/login` and `/register` to `/dashboard`

**Post-auth flow:**
- After first login, check if profile exists in `profiles` table
- If no profile → redirect to `/onboarding`
- If profile exists → redirect to `/dashboard`

---

### 4.3 Onboarding (`/onboarding`)

**Purpose:** Collect business profile data on first login.

**Multi-step form (3 steps):**

**Step 1 — Business Info:**
- Business name (text input, required)
- Industry (select: F&B, Retail, Manufaktur, Jasa, Pertanian, Lainnya)
- Business size (select: Mikro <5 karyawan, Kecil 5-19, Menengah 20-99)

**Step 2 — Details:**
- Employee count (number input)
- Location / city (text input)
- Brief description of business (textarea, optional)

**Step 3 — Confirmation:**
- Summary of entered data
- "Mulai Assessment" button

**On submit:** Insert into `profiles` table, redirect to `/dashboard/assessment`.

---

### 4.4 Dashboard (`/dashboard`)

**Layout:** Sidebar navigation (collapsible on mobile) + main content area.

**Sidebar nav items:**
- Dashboard (overview)
- Assessment
- Skor Saya
- Roadmap
- AI Consultant
- Progress
- Pengaturan

**Dashboard overview page shows:**
- Welcome message with business name
- Sustainability Score card (large number, color-coded: red <30, orange <60, green 60+) — or "Belum dinilai" prompt if no assessment
- Quick action cards: "Mulai Assessment", "Chat dengan AI", "Lihat Roadmap"
- Recent activity (latest roadmap items completed)

---

### 4.5 Sustainability Assessment (`/dashboard/assessment`)

**Purpose:** Collect data about current sustainability practices.

**Implementation:** Multi-step form with 5 categories, each a separate step.

**Step 1 — Energi:**
- Sumber energi utama (radio: PLN saja, PLN + Solar, Solar saja, Genset diesel)
- Estimasi penggunaan listrik bulanan dalam kWh (number input with helper text)
- Apakah menggunakan peralatan hemat energi? (toggle)

**Step 2 — Pengelolaan Limbah:**
- Cara pengelolaan limbah (radio: Tidak dikelola, Pemilahan, Daur ulang, Pengomposan, Ekonomi sirkular)
- Upaya pengurangan plastik? (toggle)
- Estimasi volume limbah bulanan kg (number input)

**Step 3 — Rantai Pasok:**
- Persentase bahan baku lokal (slider 0-100%)
- Apakah mengecek sustainability supplier? (toggle)
- Jenis kemasan (radio: Plastik sekali pakai, Dapat didaur ulang, Biodegradable, Dapat digunakan ulang)

**Step 4 — Operasional:**
- Konservasi air? (toggle)
- Operasional digital/paperless? (toggle)
- Transportasi utama (radio: Bensin, Listrik, Hybrid, Sepeda, Tidak ada)

**Step 5 — Kebijakan:**
- Memiliki kebijakan sustainability tertulis? (toggle)
- Training sustainability untuk karyawan? (toggle)
- Keterlibatan dengan komunitas/lingkungan? (toggle)

**On submit:**
1. Save assessment to `assessments` table (status: 'completed')
2. Call AI API to generate score (see section 5.1)
3. Save score to `scores` table
4. Call AI API to generate roadmap (see section 5.2)
5. Save roadmap and roadmap_items
6. Redirect to `/dashboard/score`

**UI notes:**
- Progress bar showing current step (1/5, 2/5, etc.)
- Back/Next navigation between steps
- Save draft capability (status: 'draft')
- Form validation on each step before proceeding

---

### 4.6 Score Dashboard (`/dashboard/score`)

**Purpose:** Display Sustainability Score with visual breakdown.

**UI Components:**
1. **Hero score** — Large circular gauge/donut chart showing total score (0-100) with color coding
2. **Score label** — Text: "Sangat Rendah" (<20), "Rendah" (20-39), "Sedang" (40-59), "Baik" (60-79), "Sangat Baik" (80+)
3. **Category breakdown** — Radar chart or bar chart showing 5 category scores (energy, waste, supply chain, operations, policy)
4. **AI Summary** — Card with AI-generated text explaining the score and key areas for improvement
5. **Industry benchmark** — Comparison line: "Rata-rata industri {industry}: {benchmark}"
6. **CTA** — "Lihat Roadmap untuk Meningkatkan Skor"

**Charts:** Use Recharts. Colors should match shadcn theme.

---

### 4.7 AI Roadmap (`/dashboard/roadmap`)

**Purpose:** Display AI-generated action items grouped by category.

**UI:**
- Filter tabs: Semua, Energi, Limbah, Rantai Pasok, Operasional, Kebijakan
- Sort by: Prioritas, Estimasi Dampak, Timeline
- Each roadmap item is a card showing:
  - Checkbox (marks completion)
  - Title
  - Description
  - Priority badge (Tinggi=red, Sedang=yellow, Rendah=green)
  - Estimated impact badge
  - Estimated cost badge
  - Timeline badge
- Progress bar at top: "X of Y langkah selesai"

**Interactions:**
- Toggle checkbox → update `is_completed` and `completed_at` in `roadmap_items`
- After toggling, show toast: "Langkah selesai! Skor akan diperbarui."
- Use Supabase Realtime subscription to update progress bar live (optional, nice-to-have)

---

### 4.8 AI Chat Consultant (`/dashboard/chat`)

**Purpose:** Real-time AI chat for sustainability consultation.

**Implementation:** Vercel AI SDK `useChat()` hook with streaming.

**UI:**
- Chat message list (scrollable)
- Input bar at bottom with send button
- Typing indicator during AI streaming
- New conversation button
- Conversation history sidebar (list of past conversations)

**System prompt for AI (important):**

```
You are Subak Hijau, an AI sustainability consultant specializing in helping Indonesian MSMEs (UMKM) adopt environmentally friendly business practices.

Context about this business:
- Business name: {business_name}
- Industry: {industry}
- Size: {business_size}
- Location: {location}
- Current Sustainability Score: {total_score}/100
- Score breakdown: Energy {energy_score}, Waste {waste_score}, Supply Chain {supply_chain_score}, Operations {operations_score}, Policy {policy_score}

Your role:
1. Answer questions about sustainability practices relevant to their specific industry and scale
2. Provide actionable, realistic recommendations for Indonesian UMKM context
3. Consider local regulations (POJK 51/2017, TKBI, IFRS S1/S2)
4. Suggest affordable, practical solutions — not expensive corporate approaches
5. Use Indonesian emission factors and local benchmarks when relevant
6. Be encouraging and motivating — celebrate small wins

Communication style:
- Respond in the same language as the user (Bahasa Indonesia or English)
- Be concise but thorough
- Use specific numbers and examples when possible
- Prioritize low-cost, high-impact actions
```

**API Route (`/api/chat`):**

```typescript
import { streamText } from 'ai';
import { gateway } from '@ai-sdk/gateway'; // Vercel AI Gateway

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Fetch user profile and latest score from Supabase
  // Inject into system prompt
  
  const result = streamText({
    model: gateway('anthropic:claude-sonnet-4-20250514'), // via AI Gateway
    system: systemPrompt, // constructed with user context
    messages,
  });
  
  return result.toDataStreamResponse();
}
```

**Message persistence:**
- On user send: save message to `chat_messages` (role: 'user')
- On AI complete: save message to `chat_messages` (role: 'assistant')
- Load conversation history from DB on page load

---

### 4.9 Progress Tracking (`/dashboard/progress`)

**Purpose:** Visualize sustainability journey over time.

**UI:**
- **Score history chart** — Line chart (Recharts) showing score over time (from `scores` table)
- **Completion stats** — Cards: total items, completed, in progress, completion percentage
- **Category progress** — 5 progress bars (one per category) showing % of items completed
- **Recent completions** — List of recently completed roadmap items with timestamps
- **Milestone badges** — Visual achievements: "First Assessment", "Score 50+", "5 Items Completed", etc.

---

### 4.10 Settings (`/dashboard/settings`)

**Purpose:** Edit business profile.

**Sections:**
- Edit business info (same fields as onboarding)
- Re-take assessment button (creates new assessment, new score, new roadmap)
- Account section: email display, sign out button
- Delete account (with confirmation modal)

---

## 5. AI Integration Specifications

### 5.1 Score Generation

**Endpoint:** `/api/assessment/score`
**Method:** POST
**Trigger:** After assessment form submission

```typescript
import { generateObject } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { z } from 'zod';

const ScoreSchema = z.object({
  total_score: z.number().min(0).max(100),
  energy_score: z.number().min(0).max(100),
  waste_score: z.number().min(0).max(100),
  supply_chain_score: z.number().min(0).max(100),
  operations_score: z.number().min(0).max(100),
  policy_score: z.number().min(0).max(100),
  ai_summary: z.string(),
  industry_benchmark: z.number().min(0).max(100),
});

const result = await generateObject({
  model: gateway('anthropic:claude-sonnet-4-20250514'),
  schema: ScoreSchema,
  prompt: `Analyze this MSME sustainability assessment and generate scores.
  
  Business: ${profile.business_name}
  Industry: ${profile.industry}
  Size: ${profile.business_size}
  
  Assessment data:
  ${JSON.stringify(assessment)}
  
  Score each category 0-100 based on Indonesian MSME standards.
  Generate a 2-3 sentence summary in Bahasa Indonesia.
  Estimate industry benchmark for ${profile.industry} sector.`,
});
```

### 5.2 Roadmap Generation

**Endpoint:** `/api/assessment/roadmap`
**Method:** POST
**Trigger:** After score generation

```typescript
const RoadmapSchema = z.object({
  title: z.string(),
  items: z.array(z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['energy', 'waste', 'supply_chain', 'operations', 'policy']),
    priority: z.enum(['high', 'medium', 'low']),
    estimated_impact: z.enum(['high', 'medium', 'low']),
    estimated_cost: z.enum(['free', 'low', 'medium', 'high']),
    timeline: z.enum(['1_week', '1_month', '3_months', '6_months', '1_year']),
  })),
});

const result = await generateObject({
  model: gateway('anthropic:claude-sonnet-4-20250514'),
  schema: RoadmapSchema,
  prompt: `Generate a sustainability improvement roadmap for this Indonesian MSME.
  
  Business: ${profile.business_name}
  Industry: ${profile.industry}
  Size: ${profile.business_size}
  Current scores: ${JSON.stringify(scores)}
  Assessment: ${JSON.stringify(assessment)}
  
  Generate 8-12 specific, actionable items.
  Prioritize low-cost, high-impact actions first.
  All text in Bahasa Indonesia.
  Consider Indonesian context: PLN grid, local waste management, Indonesian supply chains.
  Focus on actions a small ${profile.industry} business can realistically implement.`,
});
```

### 5.3 AI Chat (see section 4.8)

Uses `streamText()` with `useChat()` hook for streaming.

### 5.4 AI Gateway Configuration

Use Vercel AI Gateway for:
- Single endpoint to route between Claude and GPT-4o
- Automatic fallback if primary model is down
- Usage tracking and cost monitoring

```typescript
// In code, use gateway() provider
import { gateway } from '@ai-sdk/gateway';

// Primary model
gateway('anthropic:claude-sonnet-4-20250514')

// Can swap to
gateway('openai:gpt-4o')
```

Configure in Vercel dashboard: AI → Gateway → Add providers (Anthropic, OpenAI).

---

## 6. Project Structure

```
subak-bali-next/
├── app/
│   ├── layout.tsx                    # Root layout with font, metadata
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # Tailwind + shadcn theme
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── onboarding/
│   │   └── page.tsx                  # Multi-step business profile
│   │
│   ├── dashboard/
│   │   ├── layout.tsx                # Dashboard layout with sidebar
│   │   ├── page.tsx                  # Overview
│   │   ├── assessment/page.tsx       # Multi-step assessment form
│   │   ├── score/page.tsx            # Score breakdown + charts
│   │   ├── roadmap/page.tsx          # AI roadmap + checklist
│   │   ├── chat/page.tsx             # AI chat consultant
│   │   ├── progress/page.tsx         # Progress tracking
│   │   └── settings/page.tsx         # Account settings
│   │
│   └── api/
│       ├── chat/route.ts             # AI chat streaming endpoint
│       └── assessment/
│           ├── score/route.ts        # AI score generation
│           └── roadmap/route.ts      # AI roadmap generation
│
├── components/
│   ├── ui/                           # shadcn/ui components (pre-installed)
│   ├── landing/
│   │   ├── hero.tsx
│   │   ├── stats.tsx
│   │   ├── how-it-works.tsx
│   │   ├── features.tsx
│   │   └── footer.tsx
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── score-gauge.tsx           # Circular score visualization
│   │   ├── score-radar-chart.tsx     # Category breakdown radar
│   │   ├── roadmap-item-card.tsx     # Individual roadmap item
│   │   ├── progress-chart.tsx        # Score history line chart
│   │   └── chat-message.tsx          # Chat message bubble
│   ├── forms/
│   │   ├── onboarding-form.tsx
│   │   └── assessment-form.tsx
│   └── shared/
│       ├── loading-spinner.tsx
│       └── empty-state.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server client
│   │   └── middleware.ts             # Auth middleware helper
│   ├── ai/
│   │   ├── prompts.ts                # System prompts & prompt builders
│   │   └── schemas.ts                # Zod schemas for generateObject
│   ├── utils.ts                      # General utilities
│   └── constants.ts                  # Industry types, score labels, etc.
│
├── types/
│   └── database.ts                   # Supabase generated types
│
├── middleware.ts                      # Next.js middleware (auth redirect)
├── .env.local                        # Environment variables
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 7. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI (Vercel AI Gateway handles routing, but direct keys needed for gateway config)
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key

# Vercel AI Gateway (auto-configured on Vercel)
# No additional env vars needed if deployed on Vercel with AI Gateway enabled
```

---

## 8. Implementation Priority

### Phase 1 — Core (Days 1-2)
1. Project setup: Next.js + Supabase + shadcn (already done)
2. Supabase schema: run SQL migrations
3. Auth: login, register, middleware, onboarding
4. Dashboard layout with sidebar navigation

### Phase 2 — Assessment & Score (Days 3-4)
5. Assessment multi-step form
6. AI score generation endpoint (`generateObject`)
7. Score dashboard with charts (Recharts)
8. Save scores to Supabase

### Phase 3 — Roadmap & Chat (Days 5-6)
9. AI roadmap generation endpoint (`generateObject`)
10. Roadmap display with filterable checklist
11. Roadmap item completion toggle
12. AI chat with streaming (`useChat` + `streamText`)
13. Chat message persistence to Supabase

### Phase 4 — Polish (Day 7)
14. Progress tracking page with history chart
15. Landing page
16. Settings page
17. Loading states, error handling, empty states
18. Mobile responsive polish
19. Demo preparation

---

## 9. Key Implementation Notes

### Supabase Client Setup

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  )
}
```

### Middleware Pattern

```typescript
// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options))
        },
      },
    }
  )
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Redirect logged-in users away from auth pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/onboarding'],
}
```

### UI/UX Guidelines

- **Color scheme:** Follow existing shadcn theme (green-focused, already styled)
- **Score colors:** Red (#EF4444) for <30, Orange (#F59E0B) for 30-59, Green (#22C55E) for 60+
- **Priority badges:** High=destructive variant, Medium=warning, Low=secondary
- **Toast notifications:** Use shadcn toast for feedback on actions
- **Loading:** Use shadcn Skeleton components during data fetching
- **Empty states:** Show illustration + CTA when no data (e.g., "Belum ada assessment")
- **Language:** Default Bahasa Indonesia for all UI text. AI responds in user's language.
- **Mobile:** Sidebar collapses to bottom tab bar or hamburger menu on mobile

### Performance Targets

- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- AI chat first token: <500ms (streaming)

---

## 10. Testing Checklist (Pre-Demo)

- [ ] Auth: Register → Login → Logout flow works
- [ ] Auth: Google OAuth works
- [ ] Onboarding: New user redirected, form saves to Supabase
- [ ] Assessment: All 5 steps navigate correctly, validation works
- [ ] Assessment: Submit triggers AI score generation
- [ ] Score: Displays correctly with charts, matches stored data
- [ ] Roadmap: AI generates relevant items, saved to DB
- [ ] Roadmap: Checkbox toggle persists to DB
- [ ] Chat: Streaming works, messages persist, context-aware responses
- [ ] Progress: Chart renders with real data
- [ ] Mobile: All pages responsive on iPhone SE / Android
- [ ] RLS: User A cannot see User B's data
- [ ] Error handling: API failures show user-friendly messages
- [ ] Landing page: All sections render, CTA links work