export type Locale = "id" | "en"

interface StatItem {
  value: string
  label: string
}

interface StepItem {
  title: string
  description: string
}

interface FeatureItem {
  title: string
  description: string
}

export interface Dictionary {
  navbar: {
    howItWorks: string
    login: string
    register: string
  }
  hero: {
    badge: string
    titleStart: string
    titleHighlight: string
    titleEnd: string
    description: string
    cta: string
    learnMore: string
    imageAlt: string
  }
  stats: {
    items: StatItem[]
  }
  bentoGrid: {
    heading: string
    subheading: string
    steps: StepItem[]
    features: FeatureItem[]
  }
  cta: {
    heading: string
    description: string
    button: string
  }
  footer: {
    madeFor: string
    team: string
  }
}

const id: Dictionary = {
  navbar: {
    howItWorks: "Cara Kerja",
    login: "Masuk",
    register: "Daftar",
  },
  hero: {
    badge: "AI-Powered Sustainability",
    titleStart: "Konsultan Sustainability",
    titleHighlight: "AI",
    titleEnd: "untuk Bisnis Anda",
    description:
      "GreenAdvisor membantu UMKM Indonesia menilai, merencanakan, dan melacak strategi sustainability bisnis — tanpa biaya konsultan mahal.",
    cta: "Mulai Gratis",
    learnMore: "Pelajari Lebih Lanjut",
    imageAlt: "Tropical green foliage representing sustainability",
  },
  stats: {
    items: [
      {
        value: "65 Juta",
        label: "UMKM belum punya strategi sustainability",
      },
      {
        value: "79%",
        label: "konsumen pilih brand ramah lingkungan",
      },
      {
        value: "$5,000+",
        label: "biaya konsultan tradisional per sesi",
      },
    ],
  },
  bentoGrid: {
    heading: "Cara Kerja & Fitur Utama",
    subheading:
      "Tiga langkah sederhana dan fitur lengkap untuk sustainability bisnis Anda",
    steps: [
      {
        title: "Profil Bisnis",
        description:
          "Isi profil bisnis Anda — jenis usaha, skala, dan praktik.",
      },
      {
        title: "AI Assessment",
        description: "AI menganalisis sustainability dan memberikan skor.",
      },
      {
        title: "Roadmap & Tracking",
        description: "Dapatkan roadmap personal dan lacak progres Anda.",
      },
    ],
    features: [
      {
        title: "AI Chat Consultant",
        description:
          "Konsultasi langsung dengan AI tentang strategi sustainability, regulasi, dan praktik terbaik untuk bisnis Anda.",
      },
      {
        title: "Sustainability Score",
        description:
          "Dapatkan skor sustainability komprehensif berdasarkan analisis AI terhadap profil dan operasi bisnis Anda.",
      },
      {
        title: "Roadmap Generator",
        description:
          "AI membuat roadmap sustainability personal dengan langkah-langkah konkret dan timeline yang realistis.",
      },
      {
        title: "Progress Tracking",
        description:
          "Lacak progres sustainability bisnis Anda dengan visualisasi data dan insight dari AI.",
      },
    ],
  },
  cta: {
    heading: "Mulai Assessment Gratis Sekarang",
    description:
      "Bergabung dengan ribuan UMKM yang sudah memulai perjalanan sustainability mereka bersama GreenAdvisor.",
    button: "Daftar Sekarang",
  },
  footer: {
    madeFor: "Dibuat untuk PROXOCORIS 2026",
    team: "Tim Subak Code",
  },
}

const en: Dictionary = {
  navbar: {
    howItWorks: "How It Works",
    login: "Login",
    register: "Register",
  },
  hero: {
    badge: "AI-Powered Sustainability",
    titleStart: "Your",
    titleHighlight: "AI",
    titleEnd: "Sustainability Consultant",
    description:
      "GreenAdvisor helps Indonesian MSMEs assess, plan, and track business sustainability strategies — without expensive consultant fees.",
    cta: "Get Started Free",
    learnMore: "Learn More",
    imageAlt: "Tropical green foliage representing sustainability",
  },
  stats: {
    items: [
      {
        value: "65 Million",
        label: "MSMEs without a sustainability strategy",
      },
      {
        value: "79%",
        label: "consumers prefer eco-friendly brands",
      },
      {
        value: "$5,000+",
        label: "traditional consultant cost per session",
      },
    ],
  },
  bentoGrid: {
    heading: "How It Works & Key Features",
    subheading:
      "Three simple steps and comprehensive features for your business sustainability",
    steps: [
      {
        title: "Business Profile",
        description:
          "Fill in your business profile — industry, scale, and practices.",
      },
      {
        title: "AI Assessment",
        description: "AI analyzes your sustainability and provides a score.",
      },
      {
        title: "Roadmap & Tracking",
        description: "Get a personalized roadmap and track your progress.",
      },
    ],
    features: [
      {
        title: "AI Chat Consultant",
        description:
          "Consult directly with AI about sustainability strategies, regulations, and best practices for your business.",
      },
      {
        title: "Sustainability Score",
        description:
          "Get a comprehensive sustainability score based on AI analysis of your business profile and operations.",
      },
      {
        title: "Roadmap Generator",
        description:
          "AI creates a personalized sustainability roadmap with concrete steps and realistic timelines.",
      },
      {
        title: "Progress Tracking",
        description:
          "Track your business sustainability progress with data visualization and AI insights.",
      },
    ],
  },
  cta: {
    heading: "Start Your Free Assessment Now",
    description:
      "Join thousands of MSMEs who have started their sustainability journey with GreenAdvisor.",
    button: "Register Now",
  },
  footer: {
    madeFor: "Made for PROXOCORIS 2026",
    team: "Team Subak Code",
  },
}

export const dictionaries: Record<Locale, Dictionary> = { id, en }
