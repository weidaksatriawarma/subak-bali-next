# GreenAdvisor

**Konsultan Sustainability AI untuk UMKM Indonesia**

> Proyek kompetisi PROXOCORIS 2026 oleh Tim SubakCode

---

## Permasalahan

Indonesia memiliki lebih dari 65 juta UMKM, namun sebagian besar tidak memiliki akses terhadap panduan keberlanjutan (sustainability) yang terjangkau. Konsultasi sustainability tradisional mahal dan tidak skalabel untuk usaha kecil.

## Solusi

GreenAdvisor adalah aplikasi web berbasis AI yang membantu UMKM Indonesia menilai, memahami, dan meningkatkan praktik keberlanjutan bisnis mereka melalui assessment otomatis, scoring AI, dan roadmap yang dipersonalisasi.

## Fitur Utama

- **Assessment Interaktif** — Formulir multi-langkah untuk mengevaluasi 5 aspek keberlanjutan: energi, limbah, rantai pasok, operasional, dan kebijakan
- **Skor AI** — Analisis komprehensif dengan skor 0-100 per kategori, disertai ringkasan AI dan benchmark industri
- **Roadmap Personalisasi** — Langkah-langkah aksi yang diprioritaskan berdasarkan dampak, biaya, dan timeline, lengkap dengan estimasi pengurangan CO2
- **Chat AI Konsultan** — Konsultasi real-time dengan AI yang memahami konteks bisnis dan skor sustainability Anda
- **Tracking Progres** — Visualisasi riwayat skor, pencapaian, dan progres per kategori
- **Gamifikasi** — Achievement badges, poin, dan level untuk memotivasi perjalanan sustainability
- **Bilingual** — Antarmuka dalam Bahasa Indonesia dan English

## Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Next.js | 16 | App Router, Server Components, API Routes |
| React | 19 | UI framework dengan Server Components |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling utility-first |
| shadcn/ui | 4 | Komponen UI (Radix-based) |
| Supabase | - | Database PostgreSQL, Auth, Row Level Security |
| Vercel AI SDK | 6 | Streaming chat, structured generation |
| Recharts | 2 | Visualisasi data (radar chart, line chart) |

## Arsitektur

```
App Router Structure
├── /                          Landing page (publik)
├── /(auth)/login              Autentikasi Supabase
├── /(auth)/register           Registrasi akun
├── /onboarding                Setup profil bisnis
├── /dashboard                 Overview dengan statistik
├── /dashboard/assessment      Formulir assessment multi-langkah
├── /dashboard/score           Hasil skor + radar chart
├── /dashboard/roadmap         Roadmap aksi (filterable, sortable)
├── /dashboard/chat            Konsultasi AI real-time
├── /dashboard/progress        Riwayat skor + tracking
├── /dashboard/settings        Pengaturan profil + akun
├── /api/chat                  Streaming endpoint (streamText)
├── /api/assessment/score      Scoring endpoint (generateText + Output.object)
└── /api/assessment/roadmap    Roadmap generation endpoint
```

**Integrasi AI:**
- Scoring dan roadmap menggunakan `generateText()` dengan `Output.object()` dan Zod schema untuk structured output
- Chat menggunakan `streamText()` server-side dengan konteks bisnis yang diinjeksi ke system prompt
- Model routing via AI Gateway (primary: Claude Sonnet, fallback: GPT-4o)

## Getting Started

### Prerequisites

- Node.js 18+
- npm atau pnpm
- Akun [Supabase](https://supabase.com) (gratis)
- API key AI (Anthropic atau OpenAI, via AI Gateway)

### Instalasi

```bash
# Clone repository
git clone https://github.com/your-repo/subak-bali-next.git
cd subak-bali-next

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan credentials Anda

# Jalankan migrasi database
# Import file SQL dari supabase/migrations/ ke Supabase Dashboard

# Start development server
npm run dev
```

### Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript type checking
npm run format       # Prettier formatting
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# AI Gateway (handles routing to Anthropic/OpenAI)
AI_GATEWAY_API_KEY=your-ai-gateway-key

# Production seed (optional, for demo data)
SEED_SECRET=your-random-secret
```

## Struktur Proyek

```
├── app/                    Next.js App Router pages & API routes
│   ├── (auth)/             Login & register pages
│   ├── dashboard/          Protected dashboard routes
│   └── api/                API endpoints (chat, score, roadmap, seed)
├── components/
│   ├── ui/                 shadcn/ui primitives (auto-generated)
│   ├── dashboard/          Dashboard components (sidebar, charts, cards)
│   ├── forms/              Assessment form
│   ├── landing/            Landing page sections
│   └── shared/             Reusable components (empty state, etc.)
├── lib/
│   ├── ai/                 AI prompts & Zod schemas
│   ├── i18n/               Internationalization (ID/EN dictionaries)
│   ├── supabase/           Supabase client helpers (SSR pattern)
│   └── utils.ts            Utility functions (cn helper)
├── types/                  TypeScript type definitions
└── supabase/migrations/    SQL migration files
```

## Database Schema

Supabase PostgreSQL dengan Row Level Security (RLS):

| Tabel | Deskripsi |
|-------|-----------|
| `profiles` | Profil bisnis pengguna (nama, industri, ukuran, lokasi) |
| `assessments` | Data assessment sustainability (15+ field per kategori) |
| `scores` | Skor AI per assessment (total + 5 kategori + AI summary) |
| `roadmaps` | Roadmap yang di-generate AI |
| `roadmap_items` | Langkah-langkah aksi individual (10 items per roadmap) |
| `chat_conversations` | Riwayat percakapan chat |
| `chat_messages` | Pesan chat individual |

## Screenshots

<!-- Tambahkan screenshot aplikasi di sini -->

## Lisensi

Proyek kompetisi PROXOCORIS 2026 - Tim SubakCode
