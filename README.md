<p align="center">
  <img src="https://img.shields.io/badge/🌿-GreenAdvisor-22c55e?style=for-the-badge&labelColor=1a1a2e" alt="GreenAdvisor" />
</p>

<h1 align="center">🌿 GreenAdvisor</h1>

<p align="center">
  <strong>Konsultan Sustainability AI untuk UMKM Indonesia</strong><br/>
  <em>AI-Powered Sustainability Consultant for Indonesian MSMEs</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/AI_SDK-6-000000?style=flat-square&logo=vercel" alt="AI SDK 6" />
</p>

<p align="center">
  🏆 <strong>PROXOCORIS 2026</strong> — Tim SubakCode
</p>

---

## 🔥 Permasalahan

Indonesia memiliki **65 juta UMKM** — namun hampir tidak ada yang punya akses ke panduan sustainability yang terjangkau.

| | Fakta |
|---|---|
| 💰 | Konsultasi sustainability tradisional: **$5.000–$200.000+** per proyek |
| 📊 | Hanya **7,7%** UKM global yang melakukan sustainability reporting |
| 🏭 | UMKM Indonesia menghasilkan **216 juta ton CO₂/tahun** |
| 🤖 | **Nol** platform AI sustainability untuk UMKM di emerging market |

## 💡 Solusi

**GreenAdvisor** adalah aplikasi web berbasis AI yang membantu UMKM Indonesia menilai, memahami, dan meningkatkan praktik keberlanjutan bisnis mereka — dengan biaya **Rp 0** dibanding jutaan rupiah untuk konsultan tradisional.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 📝 **Assessment Interaktif** | Formulir multi-langkah untuk mengevaluasi 5 aspek keberlanjutan: energi, limbah, rantai pasok, operasional, kebijakan |
| 🎯 **Skor AI (0–100)** | Analisis komprehensif per kategori dengan radar chart, AI summary, dan benchmark industri |
| 🧮 **Kalkulator Karbon** | Estimasi CO₂/tahun, penghematan Rp/bulan, dan persentase kepatuhan regulasi (POJK, TKBI) |
| 🗺️ **Roadmap Personalisasi** | 8–12 langkah aksi yang diprioritaskan berdasarkan dampak, biaya, dan timeline |
| 💬 **Chat AI Konsultan** | Konsultasi real-time dengan AI yang memahami konteks bisnis dan skor sustainability Anda |
| 🛠️ **AI Tools** | `calculateCO2` — hitung jejak karbon, `lookupRegulation` — cari regulasi Indonesia, `getIndustryBenchmark` — bandingkan dengan industri sejenis |
| 📈 **Tracking Progres** | Visualisasi riwayat skor, pencapaian, dan progres per kategori |
| 🏅 **Gamifikasi** | Achievement badges, poin, dan level untuk memotivasi perjalanan sustainability |
| 🎞️ **Animasi Scroll** | Framer Motion entrance animations yang dipicu saat scroll di landing page |
| 📱 **Mobile Bottom Nav** | Navigasi bawah 5-item untuk mobile, sidebar untuk desktop |
| 🌍 **Bilingual** | Antarmuka Bahasa Indonesia & English |
| 🌙 **Dark Mode** | Toggle tema gelap/terang (tekan `d`) |
| 📋 **Laporan Cetak** | Printable report: jejak karbon + kepatuhan regulasi |
| 🎯 **SDG Alignment** | Selaras dengan Sustainable Development Goals (SDG 7, 12, 13) |
| ⚖️ **Kepatuhan Regulasi** | POJK 51/2017, TKBI, IFRS S1/S2 |

---

## 🎬 Demo Script (5 Menit)

> Alur demo untuk presentasi kompetisi

| Menit | Langkah | Halaman |
|-------|---------|---------|
| 0:00 | 🏠 Buka landing page, tunjukkan hero & animasi scroll | `/` |
| 0:30 | 🔐 Login dengan akun demo | `/login` |
| 1:00 | 📊 Tunjukkan dashboard overview dengan skor & statistik | `/dashboard` |
| 1:30 | 📝 Mulai assessment baru (isi 2–3 langkah) | `/dashboard/assessment` |
| 2:30 | 🎯 Lihat hasil skor AI + radar chart + benchmark | `/dashboard/score` |
| 3:00 | 🗺️ Tunjukkan roadmap aksi (filter, sort, centang item) | `/dashboard/roadmap` |
| 3:30 | 💬 Chat dengan AI — tanya tentang CO₂ → lihat tool result | `/dashboard/chat` |
| 4:15 | 📈 Lihat tracking progres & badges | `/dashboard/progress` |
| 4:45 | 📱 Toggle mobile view + dark mode | Responsive |

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| ⚡ Next.js | 16 | App Router, Server Components, Turbopack |
| ⚛️ React | 19 | UI framework dengan Server Components |
| 🔷 TypeScript | 5 | Type safety (strict mode) |
| 🎨 Tailwind CSS | 4 | Utility-first styling via `@tailwindcss/postcss` |
| 🧱 shadcn/ui | 4 | Komponen UI (Radix-based, pre-styled) |
| 🗄️ Supabase | — | PostgreSQL, Auth, RLS (Row Level Security) |
| 🤖 Vercel AI SDK | 6 | Streaming chat, structured generation, tool calling |
| 📊 Recharts | 3 | Radar chart, line chart, data visualization |
| 🎞️ Framer Motion | 12 | Scroll-triggered entrance animations |
| 🔐 Zod | 4 | Schema validation & structured AI output |

---

## 🏗️ Arsitektur

### 📂 Route Tree

```
App Router
├── /                          🏠 Landing page (publik)
├── /(auth)/login              🔐 Autentikasi Supabase
├── /(auth)/register           📝 Registrasi akun
├── /onboarding                🎯 Setup profil bisnis (multi-step)
├── /dashboard                 📊 Overview + statistik
├── /dashboard/assessment      📝 Formulir assessment (5 langkah)
├── /dashboard/score           🎯 Hasil skor + radar chart
├── /dashboard/roadmap         🗺️ Roadmap aksi (filter, sort)
├── /dashboard/chat            💬 Konsultasi AI real-time
├── /dashboard/progress        📈 Riwayat skor + tracking
├── /dashboard/settings        ⚙️ Pengaturan profil + akun
├── /api/chat                  🤖 Streaming endpoint (streamText)
├── /api/assessment/score      🎯 Scoring (generateText + Output.object)
├── /api/assessment/roadmap    🗺️ Roadmap generation
└── /api/seed                  🌱 Demo data seeding
```

### 🤖 Integrasi AI

| Fitur | Method | Detail |
|-------|--------|--------|
| 💬 Chat | `streamText()` | Streaming real-time + tool calling (CO₂, regulasi, benchmark) |
| 🎯 Scoring | `generateText()` + `Output.object()` | Structured output dengan Zod schema |
| 🗺️ Roadmap | `generateText()` + `Output.object()` | 8–12 langkah aksi terstruktur |
| 🔀 Model Routing | AI Gateway | Primary: Claude Sonnet, Fallback: GPT-4o |

### 🛠️ AI Chat Tools

```
calculateCO2        → Hitung jejak karbon dari data assessment
lookupRegulation     → Cari regulasi sustainability Indonesia (POJK, TKBI, IFRS)
getIndustryBenchmark → Bandingkan skor dengan rata-rata & top performer industri
```

---

## 📸 Screenshots

<!-- Tambahkan screenshot aplikasi di sini -->
<!--
![Landing Page](screenshots/landing.png)
![Dashboard](screenshots/dashboard.png)
![AI Chat](screenshots/chat.png)
-->

*Coming soon*

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** 18+
- **npm** atau **pnpm**
- Akun [Supabase](https://supabase.com) (gratis)
- API key AI (Anthropic atau OpenAI, via AI Gateway)

### 📦 Instalasi

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

### 📜 Scripts

```bash
npm run dev          # ⚡ Start dev server (Turbopack)
npm run build        # 📦 Production build
npm run lint         # 🔍 ESLint
npm run typecheck    # 🔷 TypeScript type checking (tsc --noEmit)
npm run format       # ✨ Prettier formatting
```

---

## 🔐 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# AI Gateway
AI_GATEWAY_API_KEY=your-ai-gateway-key

# Production seed (opsional, untuk demo data)
SEED_SECRET=your-random-secret
```

---

## 📁 Struktur Proyek

```
├── 📂 app/                    Next.js App Router pages & API routes
│   ├── 📂 (auth)/             Login & register pages
│   ├── 📂 dashboard/          Protected dashboard routes
│   └── 📂 api/                API endpoints (chat, score, roadmap, seed)
├── 📂 components/
│   ├── 📂 ui/                 shadcn/ui primitives (auto-generated)
│   ├── 📂 dashboard/          Dashboard components (sidebar, bottom-nav, charts)
│   ├── 📂 forms/              Assessment & onboarding forms
│   ├── 📂 landing/            Landing page sections + motion wrappers
│   └── 📂 shared/             Reusable components (empty state, etc.)
├── 📂 lib/
│   ├── 📂 ai/                 Prompts, Zod schemas, tools, regulations
│   ├── 📂 i18n/               Internationalization (ID/EN dictionaries)
│   ├── 📂 supabase/           Client helpers (SSR pattern)
│   ├── 📄 carbon.ts           Carbon footprint calculator & compliance checker
│   ├── 📄 constants.ts        Indonesian labels for all enums
│   └── 📄 utils.ts            Utility functions (cn helper)
├── 📂 types/                  TypeScript type definitions
├── 📂 supabase/migrations/    SQL migration files (001–007)
└── 📄 middleware.ts           Next.js middleware (auth route protection)
```

---

## 🗄️ Database Schema

Supabase PostgreSQL dengan Row Level Security (RLS):

| Tabel | Deskripsi |
|-------|-----------|
| 👤 `profiles` | Profil bisnis pengguna (nama, industri, ukuran, lokasi) |
| 📝 `assessments` | Data assessment sustainability (15+ field per 5 kategori) |
| 🎯 `scores` | Skor AI per assessment (total + 5 kategori + AI summary + benchmark) |
| 🗺️ `roadmaps` | Roadmap yang di-generate AI |
| ✅ `roadmap_items` | Langkah-langkah aksi individual (8–12 items per roadmap) |
| 💬 `chat_conversations` | Riwayat percakapan chat |
| 📨 `chat_messages` | Pesan chat individual |

---

## 🧮 Kalkulator Karbon

GreenAdvisor menyertakan kalkulator karbon yang menggunakan **faktor emisi Indonesia**:

| Sumber Energi | Faktor (kg CO₂/kWh) |
|---------------|---------------------|
| ⚡ PLN Grid | 0.78 |
| ☀️ PLN + Solar | 0.39 |
| 🌞 Solar Only | 0.05 |
| 🛢️ Genset Diesel | 0.84 |

**Output kalkulator:**
- 📊 Estimasi CO₂ per tahun (ton)
- 💰 Potensi penghematan (Rp/bulan)
- ⚖️ Persentase kepatuhan regulasi (POJK 51/2017, TKBI)

---

## 🏆 Kompetisi

| | Detail |
|---|---|
| 🏅 Kompetisi | **PROXOCORIS 2026** |
| 👥 Tim | **SubakCode** |
| 📅 Demo | 10–14 Maret 2026 |
| 🎤 Pitching | 5 April 2026 |

### 📊 Kriteria Penilaian

| Kriteria | Bobot |
|----------|-------|
| 🖥️ Live Demo | 30% |
| 🎨 UI/UX | 20% |
| 🎤 Presentasi | 25% |
| 🌍 Relevansi & Dampak | 25% |

---

## 🌏 SDG Alignment

GreenAdvisor berkontribusi terhadap pencapaian **Sustainable Development Goals**:

- **SDG 7** ⚡ — Energi Bersih dan Terjangkau
- **SDG 12** ♻️ — Konsumsi dan Produksi Bertanggung Jawab
- **SDG 13** 🌍 — Penanganan Perubahan Iklim

---

## 📄 Lisensi

Proyek kompetisi **PROXOCORIS 2026** — Tim SubakCode

---

<p align="center">
  Dibuat dengan 💚 oleh <strong>Tim SubakCode</strong> untuk masa depan UMKM Indonesia yang lebih hijau 🌿
</p>
