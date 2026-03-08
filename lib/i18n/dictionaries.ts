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

export interface DashboardDictionary {
  sidebar: {
    subtitle: string
    nav: {
      dashboard: string
      assessment: string
      myScore: string
      roadmap: string
      aiConsultant: string
      progress: string
      settings: string
    }
    settings: string
    signOut: string
  }
  overview: {
    welcome: string
    subtitle: string
    scoreTitle: string
    scoreDescription: string
    outOf100: string
    roadmapAchievements: string
    viewDetails: string
    noAssessment: string
    startAssessment: string
    quickActions: string
    actions: {
      assessment: { title: string; description: string }
      chat: { title: string; description: string }
      roadmap: { title: string; description: string }
    }
    quickWins: {
      title: string
      costFree: string
      costLow: string
      viewRoadmap: string
      noQuickWins: string
      generateRoadmap: string
    }
    achievements: {
      title: string
      viewAll: string
    }
    gettingStarted: {
      title: string
      subtitle: string
      step1: string
      step2: string
      step3: string
      step4: string
      completed: string
    }
  }
  score: {
    title: string
    subtitle: string
    totalScore: string
    categoryScores: string
    radarChart: string
    aiSummary: string
    industryComparison: string
    industryAverage: string
    aboveAverage: string
    belowAverage: string
    viewRoadmap: string
    noAssessment: string
    noAssessmentDesc: string
    startAssessment: string
    comparison: {
      title: string
      improved: string
      declined: string
      noChange: string
      previousScore: string
      currentScore: string
      change: string
    }
  }
  roadmap: {
    title: string
    stepsCompleted: string
    points: string
    achievements: string
    achievementsCount: string
    all: string
    sort: { priority: string; impact: string; timeline: string }
    sortPlaceholder: string
    noRoadmap: string
    noRoadmapDesc: string
    startAssessment: string
    stepComplete: string
    pointsLabel: string
    impactEstimator: {
      title: string
      co2Reduction: string
      treeEquivalent: string
      annualEstimate: string
      trees: string
    }
  }
  common: {
    categories: {
      energy: string
      waste: string
      supply_chain: string
      operations: string
      policy: string
    }
    priorities: { high: string; medium: string; low: string }
    impacts: { high: string; medium: string; low: string }
    scoreLabels: {
      seed: { label: string; description: string }
      sprout: { label: string; description: string }
      growing: { label: string; description: string }
      tree: { label: string; description: string }
      forest: { label: string; description: string }
    }
    scoreFeedback: {
      low: string
      medium: string
      good: string
      excellent: string
    }
    achievementNames: {
      first: string
      five: string
      half: string
      eighty: string
      all: string
      energy: string
      waste: string
      supply_chain: string
      operations: string
      policy: string
    }
  }
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
  dashboard: DashboardDictionary
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
  dashboard: {
    sidebar: {
      subtitle: "Konsultan Berkelanjutan",
      nav: {
        dashboard: "Dashboard",
        assessment: "Assessment",
        myScore: "Skor Saya",
        roadmap: "Roadmap",
        aiConsultant: "AI Consultant",
        progress: "Progress",
        settings: "Pengaturan",
      },
      settings: "Pengaturan",
      signOut: "Keluar",
    },
    overview: {
      welcome: "Selamat datang,",
      subtitle: "Pantau dan tingkatkan keberlanjutan bisnis Anda",
      scoreTitle: "Skor Keberlanjutan",
      scoreDescription: "Hasil evaluasi terbaru dari assessment Anda",
      outOf100: "dari 100",
      roadmapAchievements: "pencapaian roadmap",
      viewDetails: "Lihat Detail",
      noAssessment:
        "Belum ada assessment. Mulai sekarang untuk mendapatkan skor keberlanjutan bisnis Anda.",
      startAssessment: "Mulai Assessment",
      quickActions: "Aksi Cepat",
      actions: {
        assessment: {
          title: "\u{1F4CB} Mulai Assessment",
          description: "Cek seberapa hijau bisnismu sekarang",
        },
        chat: {
          title: "\u{1F4AC} AI Consultant",
          description: "Tanya langsung ke AI advisor kamu",
        },
        roadmap: {
          title: "\u{1F5FA}\uFE0F Lihat Roadmap",
          description: "Langkah-langkah untuk naik level",
        },
      },
      quickWins: {
        title: "\u26A1 Quick Wins",
        costFree: "Gratis",
        costLow: "Biaya Rendah",
        viewRoadmap: "Lihat Semua di Roadmap",
        noQuickWins: "Belum ada quick wins. Generate roadmap untuk mulai!",
        generateRoadmap: "Generate Roadmap",
      },
      achievements: {
        title: "\u{1F3C6} Pencapaian",
        viewAll: "Lihat Semua",
      },
      gettingStarted: {
        title: "\u{1F4D6} Panduan Memulai",
        subtitle:
          "Ikuti langkah-langkah ini untuk memulai perjalanan sustainability kamu",
        step1: "Buat Profil Bisnis",
        step2: "Lengkapi Assessment",
        step3: "Lihat Skor Keberlanjutan",
        step4: "Generate Roadmap",
        completed: "Semua langkah selesai! Kamu siap!",
      },
    },
    score: {
      title: "Skor Keberlanjutan",
      subtitle: "Hasil analisis AI terhadap praktik keberlanjutan usaha Anda",
      totalScore: "Skor Total",
      categoryScores: "Skor per Kategori",
      radarChart: "\u{1F4CA} Radar Skor",
      aiSummary: "Ringkasan AI",
      industryComparison: "\u{1F4CA} Perbandingan Industri",
      industryAverage: "Rata-rata industri",
      aboveAverage: "\u{1F389} Skor kamu di atas rata-rata! Keren!",
      belowAverage: "\u{1F4AA} Masih di bawah rata-rata, tapi kamu bisa kejar!",
      viewRoadmap: "Lihat Roadmap untuk Meningkatkan Skor",
      noAssessment: "Belum ada assessment",
      noAssessmentDesc:
        "Lengkapi assessment terlebih dahulu untuk mendapatkan skor keberlanjutan usaha Anda.",
      startAssessment: "Mulai Assessment",
      comparison: {
        title: "\u{1F4C8} Perbandingan Skor",
        improved: "Naik",
        declined: "Turun",
        noChange: "Tetap",
        previousScore: "Skor Sebelumnya",
        currentScore: "Skor Sekarang",
        change: "Perubahan",
      },
    },
    roadmap: {
      title: "Roadmap Sustainability",
      stepsCompleted: "langkah selesai",
      points: "poin",
      achievements: "\u{1F3C6} Pencapaian",
      achievementsCount: "pencapaian",
      all: "Semua",
      sort: {
        priority: "Prioritas",
        impact: "Dampak",
        timeline: "Timeline",
      },
      sortPlaceholder: "Urutkan",
      noRoadmap: "Belum ada roadmap",
      noRoadmapDesc:
        "Selesaikan assessment dan generate skor untuk mendapatkan roadmap sustainability yang dipersonalisasi.",
      startAssessment: "Mulai Assessment",
      stepComplete: "\u{1F389} +10 poin! Langkah selesai!",
      pointsLabel: "+10 poin",
      impactEstimator: {
        title: "\u{1F33F} Estimasi Dampak Lingkungan",
        co2Reduction: "Pengurangan CO\u2082",
        treeEquivalent: "Setara Pohon",
        annualEstimate: "Estimasi tahunan jika semua langkah diterapkan",
        trees: "pohon/tahun",
      },
    },
    common: {
      categories: {
        energy: "Energi",
        waste: "Limbah",
        supply_chain: "Rantai Pasok",
        operations: "Operasional",
        policy: "Kebijakan",
      },
      priorities: { high: "Tinggi", medium: "Sedang", low: "Rendah" },
      impacts: {
        high: "Dampak Tinggi",
        medium: "Dampak Sedang",
        low: "Dampak Rendah",
      },
      scoreLabels: {
        seed: {
          label: "Benih Kecil",
          description: "Baru mulai! Yuk tumbuh bersama",
        },
        sprout: {
          label: "Tunas Muda",
          description: "Sudah mulai tumbuh, terus semangat!",
        },
        growing: {
          label: "Pohon yang Tumbuh",
          description: "Bisnis kamu makin hijau!",
        },
        tree: {
          label: "Pohon Rindang",
          description: "Hebat! Sudah jadi teladan",
        },
        forest: {
          label: "Hutan Lestari",
          description: "Luar biasa! Champion keberlanjutan!",
        },
      },
      scoreFeedback: {
        low: "Perlu usaha lagi",
        medium: "Lumayan!",
        good: "Bagus!",
        excellent: "Keren banget!",
      },
      achievementNames: {
        first: "Langkah Pertama",
        five: "Pejuang Hijau",
        half: "Setengah Jalan",
        eighty: "Hampir Sampai",
        all: "Champion Keberlanjutan",
        energy: "Pahlawan Energi",
        waste: "Pejuang Limbah",
        supply_chain: "Master Rantai Pasok",
        operations: "Ahli Operasional",
        policy: "Pelopor Kebijakan",
      },
    },
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
  dashboard: {
    sidebar: {
      subtitle: "Sustainability Consultant",
      nav: {
        dashboard: "Dashboard",
        assessment: "Assessment",
        myScore: "My Score",
        roadmap: "Roadmap",
        aiConsultant: "AI Consultant",
        progress: "Progress",
        settings: "Settings",
      },
      settings: "Settings",
      signOut: "Sign Out",
    },
    overview: {
      welcome: "Welcome,",
      subtitle: "Monitor and improve your business sustainability",
      scoreTitle: "Sustainability Score",
      scoreDescription: "Latest evaluation results from your assessment",
      outOf100: "out of 100",
      roadmapAchievements: "roadmap achievements",
      viewDetails: "View Details",
      noAssessment:
        "No assessment yet. Start now to get your business sustainability score.",
      startAssessment: "Start Assessment",
      quickActions: "Quick Actions",
      actions: {
        assessment: {
          title: "\u{1F4CB} Start Assessment",
          description: "Check how green your business is",
        },
        chat: {
          title: "\u{1F4AC} AI Consultant",
          description: "Ask your AI advisor directly",
        },
        roadmap: {
          title: "\u{1F5FA}\uFE0F View Roadmap",
          description: "Steps to level up your sustainability",
        },
      },
      quickWins: {
        title: "\u26A1 Quick Wins",
        costFree: "Free",
        costLow: "Low Cost",
        viewRoadmap: "View All in Roadmap",
        noQuickWins: "No quick wins yet. Generate a roadmap to start!",
        generateRoadmap: "Generate Roadmap",
      },
      achievements: {
        title: "\u{1F3C6} Achievements",
        viewAll: "View All",
      },
      gettingStarted: {
        title: "\u{1F4D6} Getting Started",
        subtitle: "Follow these steps to start your sustainability journey",
        step1: "Create Business Profile",
        step2: "Complete Assessment",
        step3: "View Sustainability Score",
        step4: "Generate Roadmap",
        completed: "All steps completed! You're ready!",
      },
    },
    score: {
      title: "Sustainability Score",
      subtitle: "AI analysis results of your business sustainability practices",
      totalScore: "Total Score",
      categoryScores: "Category Scores",
      radarChart: "\u{1F4CA} Score Radar",
      aiSummary: "AI Summary",
      industryComparison: "\u{1F4CA} Industry Comparison",
      industryAverage: "Industry average for",
      aboveAverage: "\u{1F389} Your score is above average! Great job!",
      belowAverage: "\u{1F4AA} Below average, but you can catch up!",
      viewRoadmap: "View Roadmap to Improve Your Score",
      noAssessment: "No assessment yet",
      noAssessmentDesc:
        "Complete an assessment first to get your business sustainability score.",
      startAssessment: "Start Assessment",
      comparison: {
        title: "\u{1F4C8} Score Comparison",
        improved: "Improved",
        declined: "Declined",
        noChange: "No Change",
        previousScore: "Previous Score",
        currentScore: "Current Score",
        change: "Change",
      },
    },
    roadmap: {
      title: "Sustainability Roadmap",
      stepsCompleted: "steps completed",
      points: "points",
      achievements: "\u{1F3C6} Achievements",
      achievementsCount: "achievements",
      all: "All",
      sort: {
        priority: "Priority",
        impact: "Impact",
        timeline: "Timeline",
      },
      sortPlaceholder: "Sort by",
      noRoadmap: "No roadmap yet",
      noRoadmapDesc:
        "Complete an assessment and generate a score to get your personalized sustainability roadmap.",
      startAssessment: "Start Assessment",
      stepComplete: "\u{1F389} +10 points! Step completed!",
      pointsLabel: "+10 pts",
      impactEstimator: {
        title: "\u{1F33F} Environmental Impact Estimate",
        co2Reduction: "CO\u2082 Reduction",
        treeEquivalent: "Tree Equivalent",
        annualEstimate: "Annual estimate if all steps are implemented",
        trees: "trees/year",
      },
    },
    common: {
      categories: {
        energy: "Energy",
        waste: "Waste",
        supply_chain: "Supply Chain",
        operations: "Operations",
        policy: "Policy",
      },
      priorities: { high: "High", medium: "Medium", low: "Low" },
      impacts: {
        high: "High Impact",
        medium: "Medium Impact",
        low: "Low Impact",
      },
      scoreLabels: {
        seed: {
          label: "Tiny Seed",
          description: "Just starting! Let's grow together",
        },
        sprout: {
          label: "Young Sprout",
          description: "Growing strong, keep it up!",
        },
        growing: {
          label: "Growing Tree",
          description: "Your business is getting greener!",
        },
        tree: {
          label: "Tall Tree",
          description: "Awesome! You're a role model",
        },
        forest: {
          label: "Thriving Forest",
          description: "Amazing! Sustainability champion!",
        },
      },
      scoreFeedback: {
        low: "Needs more effort",
        medium: "Not bad!",
        good: "Great!",
        excellent: "Awesome!",
      },
      achievementNames: {
        first: "First Step",
        five: "Green Fighter",
        half: "Halfway There",
        eighty: "Almost There",
        all: "Sustainability Champion",
        energy: "Energy Hero",
        waste: "Waste Warrior",
        supply_chain: "Supply Chain Master",
        operations: "Operations Expert",
        policy: "Policy Pioneer",
      },
    },
  },
}

export const dictionaries: Record<Locale, Dictionary> = { id, en }
