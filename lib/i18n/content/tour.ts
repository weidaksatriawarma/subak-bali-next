import type { Locale } from "../dictionaries"

interface TourStep {
  title: string
  content: string
}

interface TourContent {
  steps: TourStep[]
  skipButton: string
  nextButton: string
  backButton: string
  lastButton: string
  stepOf: string
}

const id: TourContent = {
  steps: [
    {
      title: "Selamat datang di Subak Hijau!",
      content:
        "Subak Hijau adalah konsultan sustainability berbasis AI untuk UMKM Indonesia. Kami membantu Anda mengukur, memahami, dan meningkatkan kinerja sustainability bisnis Anda.",
    },
    {
      title: "Skor Keberlanjutan",
      content:
        "Di sini Anda bisa melihat skor sustainability bisnis Anda (0-100) beserta breakdown per kategori. Skor ini dihitung berdasarkan hasil assessment yang Anda isi.",
    },
    {
      title: "Aksi Cepat",
      content:
        "Gunakan tombol aksi cepat ini untuk langsung mengambil assessment, memulai konsultasi dengan AI, atau melihat roadmap aksi Anda.",
    },
    {
      title: "Navigasi",
      content:
        "Gunakan sidebar untuk berpindah antar fitur: Dashboard, Assessment, Skor, Roadmap, AI Consultant, Progress, dan lainnya.",
    },
    {
      title: "Assessment",
      content:
        "Mulai dari sini! Isi kuesioner tentang praktik energi, limbah, rantai pasok, operasional, dan kebijakan bisnis Anda untuk mendapatkan skor sustainability.",
    },
    {
      title: "AI Konsultan",
      content:
        "Tanya apa saja tentang sustainability bisnis Anda. AI kami dilengkapi kalkulator CO\u2082, lookup regulasi Indonesia, dan benchmark industri.",
    },
    {
      title: "Selamat!",
      content:
        "Anda siap menggunakan Subak Hijau. Mulailah dengan mengambil assessment pertama Anda. Selamat memulai perjalanan sustainability!",
    },
  ],
  skipButton: "Lewati",
  nextButton: "Lanjut",
  backButton: "Kembali",
  lastButton: "Selesai",
  stepOf: "Langkah {0} dari {1}",
}

const en: TourContent = {
  steps: [
    {
      title: "Welcome to Subak Hijau!",
      content:
        "Subak Hijau is an AI-powered sustainability consultant for Indonesian MSMEs. We help you measure, understand, and improve your business sustainability performance.",
    },
    {
      title: "Sustainability Score",
      content:
        "Here you can view your business sustainability score (0-100) with a per-category breakdown. This score is calculated based on the assessment you complete.",
    },
    {
      title: "Quick Actions",
      content:
        "Use these quick action buttons to immediately take an assessment, start a consultation with AI, or view your action roadmap.",
    },
    {
      title: "Navigation",
      content:
        "Use the sidebar to navigate between features: Dashboard, Assessment, Score, Roadmap, AI Consultant, Progress, and more.",
    },
    {
      title: "Assessment",
      content:
        "Start here! Fill out the questionnaire about your energy, waste, supply chain, operations, and business policy practices to get your sustainability score.",
    },
    {
      title: "AI Consultant",
      content:
        "Ask anything about your business sustainability. Our AI is equipped with a CO\u2082 calculator, Indonesian regulation lookup, and industry benchmarks.",
    },
    {
      title: "All Done!",
      content:
        "You're all set to use Subak Hijau. Start by taking your first assessment. Happy sustainability journey!",
    },
  ],
  skipButton: "Skip",
  nextButton: "Next",
  backButton: "Back",
  lastButton: "Finish",
  stepOf: "Step {0} of {1}",
}

export const tourContent: Record<Locale, TourContent> = { id, en }
