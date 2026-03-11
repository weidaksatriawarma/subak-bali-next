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
      simulator: string
      carbonFootprint: string
      compliance: string
      help: string
      certificate: string
      achievementCard: string
      report: string
      sdgImpact: string
    }
    groups: {
      main: string
      analysis: string
      results: string
      support: string
    }
    settings: string
    signOut: string
    ariaLabel: string
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
    impactTitle: string
    categoryBreakdown: string
    downloadReport: string
    sdg: {
      title: string
      subtitle: string
      active: string
      inactive: string
    }
    share: {
      button: string
      gotScore: string
      from: string
      checkYours: string
    }
    report: {
      title: string
      generatedAt: string
      categoryBreakdown: string
      sdgAlignment: string
      aiAnalysis: string
      industryBenchmark: string
      recommendedActions: string
      priority: string
      impact: string
      footer: string
      carbonTitle: string
      co2Year: string
      potentialSavingsMonth: string
      treeEquivalentText: string
      complianceTitle: string
      compliant: string
      nonCompliant: string
      aboveAverage: string
      belowAverage: string
      scanToVerify: string
      downloadPdf: string
      pdfPrint: string
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
      progressLabel: string
    }
    addItem: string
    editItem: string
    deleteItem: string
    deleteConfirmTitle: string
    deleteConfirmDesc: string
    deleteBtn: string
    cancelBtn: string
    saveBtn: string
    savingBtn: string
    aiGenerated: string
    mandatory: string
    mandatoryTooltip: string
    askAi: string
    askAiTooltip: string
    stepCompletedToast: string
    userAdded: string
    itemAdded: string
    itemUpdated: string
    itemDeleted: string
    addError: string
    updateError: string
    deleteError: string
    cannotDeleteMandatory: string
    form: {
      title: string
      titlePlaceholder: string
      description: string
      descriptionPlaceholder: string
      category: string
      priority: string
      estimatedImpact: string
      estimatedCost: string
      timeline: string
      selectPlaceholder: string
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
    industryLabels: {
      fnb: string
      retail: string
      manufacturing: string
      services: string
      agriculture: string
      other: string
    }
  }
  carbon: {
    title: string
    subtitle: string
    totalEmissions: string
    treeEquivalent: string
    potentialSavings: string
    breakdown: string
    energyLabel: string
    wasteLabel: string
    transportLabel: string
    vsIndustry: string
    yourBusiness: string
    industryAvg: string
    topRecommendations: string
    noAssessment: string
    noAssessmentDesc: string
    startAssessment: string
    kgYear: string
    trees: string
    rpMonth: string
  }
  compliance: {
    title: string
    subtitle: string
    overallScore: string
    framework: string
    compliant: string
    nonCompliant: string
    recommendation: string
    noAssessment: string
    noAssessmentDesc: string
    startAssessment: string
  }
  simulator: {
    title: string
    subtitle: string
    currentScore: string
    projectedScore: string
    pointIncrease: string
    ifAllApplied: string
    couldIncrease: string
    to: string
    reset: string
    changeScenarios: string
    allAchieved: string
    noAssessment: string
    noAssessmentDesc: string
    startAssessment: string
  }
  certificate: {
    download: string
    generating: string
    certificateTitle: string
    issuedTo: string
    assessmentDate: string
    level: string
    categoryBreakdown: string
  }
  progress: {
    last7Days: string
    last30Days: string
    allTime: string
    noDataInRange: string
    title: string
    subtitle: string
    exportScoreHistory: string
    scoreHistory: string
    totalSteps: string
    completed: string
    inProgress: string
    completionPercent: string
    categoryProgress: string
    recentCompletions: string
    milestones: string
    analyticsTitle: string
    estSavingsMonth: string
    estCO2Reduced: string
    estROI: string
    estSavingsPerCategory: string
    perMonth: string
    months: string
    emptyTitle: string
    emptyDescription: string
    startAssessment: string
    milestoneFirstAssessment: string
    milestoneFirstAssessmentDesc: string
    milestoneScore50: string
    milestoneScore50Desc: string
    milestone5Steps: string
    milestone5StepsDesc: string
    milestoneScore80: string
    milestoneScore80Desc: string
    milestoneStreak4: string
    milestoneStreak4Desc: string
    milestoneStreak8: string
    milestoneStreak8Desc: string
    chartScore: string
    chartDateLabel: string
  }
  gamification: {
    streak: {
      title: string
      weeksInRow: string
      bestStreak: string
      noStreak: string
      milestone4: string
      milestone8: string
      milestone12: string
    }
    celebration: {
      firstItem: { title: string; subtitle: string }
      pct25: { title: string; subtitle: string }
      pct50: { title: string; subtitle: string }
      pct75: { title: string; subtitle: string }
      pct100: { title: string; subtitle: string }
      rankChange: { title: string; subtitle: string }
      categoryMaster: { title: string; subtitle: string }
      streakMilestone: { title: string; subtitle: string }
      shareBtn: string
      continueBtn: string
    }
    industryRank: {
      title: string
      yourRank: string
    }
    industryBadges: {
      title: string
      locked: string
    }
    percentile: {
      template: string // "Di atas {percent}% perusahaan {industry}"
    }
    achievementCard: {
      download: string
      title: string
    }
    industryQuestions: {
      title: string
      description: string
      skipInfo: string
    }
    verification: {
      title: string
      verifiedBy: string
      score: string
      level: string
      assessmentDate: string
      businessName: string
      invalid: string
      invalidDesc: string
    }
  }
  certificatePage: {
    title: string
    subtitle: string
    downloadPng: string
    downloadPdf: string
    shareLink: string
    copyLink: string
    linkCopied: string
    shareWhatsApp: string
    scanToVerify: string
    noScore: string
    noScoreDesc: string
    viewAchievement: string
  }
  achievementPage: {
    title: string
    subtitle: string
    downloadPng: string
    shareLink: string
    copyLink: string
    linkCopied: string
    shareWhatsApp: string
    scanToVerify: string
    noScore: string
    noScoreDesc: string
    viewCertificate: string
    previewCardTitle: string
    shareTitle: string
    achievementsLabel: string
    canvasAchievements: string
    canvasFooter: string
    downloadSuccess: string
    downloadError: string
    copySuccess: string
    copyError: string
  }
  askAiCard: {
    button: string
    score: { title: string; description: string }
    carbon: { title: string; description: string }
    compliance: { title: string; description: string }
    progress: { title: string; description: string }
    simulator: { title: string; description: string }
    sdg: { title: string; description: string }
  }
  chatWidget: {
    title: string
    placeholder: string
    openFullChat: string
    suggestedTitle: string
  }
  bottomSheet: {
    more: string
    moreMenu: string
    ariaLabel: string
  }
  journeyChecklist: {
    title: string
    stepCount: string
    completeProfile: string
    fillAssessment: string
    viewScore: string
    createRoadmap: string
    getCertificate: string
  }
  chatMessage: {
    carbonFootprint: string
    kgCo2Year: string
    equivalent: string
    treesYear: string
    industryBenchmark: string
    average: string
    top: string
    requirements: string
    codeCopied: string
    codeCopyFail: string
    copied: string
    copy: string
    messageCopied: string
    messageCopyFail: string
    copyMessage: string
    analyzing: string
  }
  chatHistory: {
    newConversation: string
    deleteTitle: string
    deleteDescription: string
    cancel: string
    delete: string
    empty: string
    justNow: string
    minutesAgo: string
    hoursAgo: string
    daysAgo: string
  }
  chatPage: {
    greeting: string
    greetingDesc: string
    typing: string
    errorTitle: string
    errorRetry: string
    historyTitle: string
    suggestedPrompts: string[]
    aiUnavailable: string
    headerTitle: string
  }
  chatInput: {
    placeholder: string
    send: string
  }
  commandPalette: {
    searchPlaceholder: string
    noResults: string
    navigation: string
    actions: string
    switchToLight: string
    switchToDark: string
  }
  keyboardShortcuts: {
    title: string
    openCommandPalette: string
    toggleDarkMode: string
    toggleSidebar: string
    showShortcuts: string
  }
  comparison: {
    title: string
    subtitle: string
    emptyTitle: string
    emptyDescription: string
    startAssessment: string
    totalScore: string
    overallChange: string
    first: string
    latest: string
    points: string
    biggestImprovement: string
    categoryComparison: string
  }
  certificatePreview: {
    title: string
    issuedTo: string
    dateLabel: string
    footer: string
  }
  settings: {
    title: string
    subtitle: string
    businessProfile: string
    businessName: string
    businessNamePlaceholder: string
    industryType: string
    industryPlaceholder: string
    businessSize: string
    businessSizePlaceholder: string
    employeeCount: string
    employeePlaceholder: string
    location: string
    locationPlaceholder: string
    description: string
    descriptionPlaceholder: string
    saving: string
    saveChanges: string
    saveSuccess: string
    saveError: string
    assessment: string
    assessmentDesc: string
    retakeAssessment: string
    cookiePreferences: string
    cookieDesc: string
    cookieEssentialLabel: string
    cookieEssentialDesc: string
    cookieFunctionalLabel: string
    cookieFunctionalDesc: string
    cookieAnalyticsLabel: string
    cookieAnalyticsDesc: string
    helpTitle: string
    helpDesc: string
    startTour: string
    account: string
    email: string
    signOut: string
    deleteAccount: string
    deleteAccountTitle: string
    deleteAccountDesc: string
    cancelBtn: string
    confirmDelete: string
    validationBusinessName: string
  }
  assessmentPage: {
    title: string
    description: string
    retakeGate: {
      title: string
      subtitle: string
      lastScore: string
      outOf100: string
      lastDate: string
      warning: string
      viewResults: string
      startNew: string
    }
  }
  scorePage: {
    emptyTitle: string
    emptyDescription: string
    startAssessment: string
  }
  benchmark: {
    title: string
    percentileAbove: string
    percentileBelow: string
    of: string
    avg: string
    avgFull: string
    yourScore: string
    difference: string
    pts: string
    ariaLabel: string
  }
}

export interface Dictionary {
  navbar: {
    howItWorks: string
    faq: string
    about: string
    guide: string
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
    speedBadge: string
    noCost: string
    industries: string
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
  productPreview: {
    heading: string
    subheading: string
    tabs: { score: string; roadmap: string; chat: string }
    scoreTab: {
      totalScore: string
      benchmarkText: string
      categories: { name: string; value: number }[]
    }
    roadmapTab: {
      items: {
        title: string
        category: string
        priority: string
        cost: string
        completed: boolean
      }[]
    }
    chatTab: {
      messages: { role: "user" | "assistant"; content: string }[]
    }
  }
  comparison: {
    heading: string
    subheading: string
    traditional: string
    subakHijau: string
    recommended: string
    rows: { aspect: string; traditional: string; subakHijau: string }[]
  }
  cta: {
    heading: string
    description: string
    button: string
    secondaryButton: string
    perks: { clock: string; wallet: string; shield: string }
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
    faq: "FAQ",
    about: "Tentang",
    guide: "Panduan",
    login: "Masuk",
    register: "Daftar",
  },
  hero: {
    badge: "AI-Powered Sustainability",
    titleStart: "Jadikan Bisnis Anda",
    titleHighlight: "Lebih Hijau",
    titleEnd: "dalam 10 Menit",
    description:
      "Subak Hijau membantu UMKM Indonesia menilai, merencanakan, dan melacak strategi sustainability bisnis tanpa biaya konsultan mahal.",
    cta: "Mulai Gratis",
    learnMore: "Lihat Demo",
    imageAlt: "Dashboard sustainability AI Subak Hijau",
    speedBadge: "10 menit",
    noCost: "100% Gratis",
    industries: "6 Industri",
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
      {
        value: "10 Menit",
        label: "untuk assessment lengkap",
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
          "Isi profil bisnis Anda seperti jenis usaha, skala, dan praktik.",
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
  productPreview: {
    heading: "Lihat Apa yang Anda Dapatkan",
    subheading:
      "Skor sustainability, roadmap aksi, dan konsultan AI — semua dalam satu platform",
    tabs: {
      score: "Skor & Analisis",
      roadmap: "Roadmap AI",
      chat: "Chat Konsultan",
    },
    scoreTab: {
      totalScore: "78/100",
      benchmarkText: "Di atas 72% perusahaan F&B",
      categories: [
        { name: "Energi", value: 82 },
        { name: "Limbah", value: 75 },
        { name: "Rantai Pasok", value: 70 },
        { name: "Operasional", value: 85 },
        { name: "Kebijakan", value: 68 },
      ],
    },
    roadmapTab: {
      items: [
        {
          title: "Ganti lampu ke LED hemat energi",
          category: "Energi",
          priority: "Tinggi",
          cost: "Rendah",
          completed: true,
        },
        {
          title: "Pisahkan limbah organik & anorganik",
          category: "Limbah",
          priority: "Tinggi",
          cost: "Gratis",
          completed: true,
        },
        {
          title: "Catat penggunaan listrik bulanan",
          category: "Operasional",
          priority: "Sedang",
          cost: "Gratis",
          completed: false,
        },
        {
          title: "Pilih supplier lokal bersertifikat",
          category: "Rantai Pasok",
          priority: "Sedang",
          cost: "Rendah",
          completed: false,
        },
      ],
    },
    chatTab: {
      messages: [
        { role: "user", content: "Berapa emisi karbon warung saya?" },
        {
          role: "assistant",
          content:
            "Berdasarkan data Anda, estimasi emisi karbon warung Anda sekitar 2.4 ton CO₂/tahun. Ini berasal dari: listrik (45%), gas memasak (30%), limbah (25%). Menurut POJK 51/2017, UMKM perlu mulai melaporkan jejak karbon.",
        },
        { role: "user", content: "Bagaimana cara menguranginya?" },
      ],
    },
  },
  comparison: {
    heading: "Konsultan Tradisional vs Subak Hijau",
    subheading:
      "Bandingkan pendekatan sustainability konvensional dengan solusi AI kami",
    traditional: "Konsultan Tradisional",
    subakHijau: "Subak Hijau",
    recommended: "Rekomendasi",
    rows: [
      {
        aspect: "Biaya",
        traditional: "Rp 75 juta+/tahun",
        subakHijau: "Gratis selamanya",
      },
      {
        aspect: "Waktu",
        traditional: "2-4 minggu",
        subakHijau: "10-15 menit",
      },
      {
        aspect: "Update",
        traditional: "Manual, tahunan",
        subakHijau: "Real-time AI",
      },
      {
        aspect: "Personalisasi",
        traditional: "Template umum",
        subakHijau: "AI per industri",
      },
      {
        aspect: "Tracking",
        traditional: "Spreadsheet manual",
        subakHijau: "Dashboard otomatis",
      },
      {
        aspect: "Bahasa",
        traditional: "English only",
        subakHijau: "Indonesia + English",
      },
      {
        aspect: "Regulasi",
        traditional: "Riset sendiri",
        subakHijau: "Database AI regulasi",
      },
    ],
  },
  cta: {
    heading: "Mulai Assessment Gratis Sekarang",
    description:
      "Hanya butuh 10 menit untuk skor sustainability, roadmap aksi, dan konsultan AI pribadi — semuanya gratis.",
    button: "Mulai Gratis",
    secondaryButton: "Lihat Demo ↑",
    perks: {
      clock: "10 menit setup",
      wallet: "Tanpa biaya",
      shield: "Data terenkripsi",
    },
  },
  footer: {
    madeFor: "Dibuat untuk PROXOCORIS 2026",
    team: "Tim Subak Code",
  },
  dashboard: {
    sidebar: {
      subtitle: "Konsultan Berkelanjutan",
      nav: {
        dashboard: "Beranda",
        assessment: "Asesmen",
        myScore: "Skor Saya",
        roadmap: "Peta Jalan",
        aiConsultant: "Konsultan AI",
        progress: "Progres",
        settings: "Pengaturan",
        simulator: "Simulator",
        carbonFootprint: "Jejak Karbon",
        compliance: "Kepatuhan",
        help: "Bantuan",
        certificate: "Sertifikat",
        achievementCard: "Kartu Pencapaian",
        report: "Laporan",
        sdgImpact: "Dampak SDG",
      },
      groups: {
        main: "Utama",
        analysis: "Analisis",
        results: "Hasil & Dukungan",
        support: "Dukungan",
      },
      settings: "Pengaturan",
      signOut: "Keluar",
      ariaLabel: "Navigasi sidebar",
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
      impactTitle: "\u{1F33F} Dampak Lingkungan Bisnis Anda",
      categoryBreakdown: "Detail Kategori",
      downloadReport: "Download Laporan",
      sdg: {
        title: "Kontribusi SDG",
        subtitle:
          "Sustainable Development Goals yang terkait dengan praktik bisnis Anda",
        active: "Berkontribusi",
        inactive: "Belum berkontribusi",
      },
      share: {
        button: "Bagikan via WhatsApp",
        gotScore: "mendapat skor keberlanjutan",
        from: "dari Subak Hijau AI!",
        checkYours: "Cek sustainability bisnis kamu juga",
      },
      report: {
        title: "Laporan Keberlanjutan",
        generatedAt: "Dihasilkan pada",
        categoryBreakdown: "Rincian Skor per Kategori",
        sdgAlignment: "Kontribusi Sustainable Development Goals",
        aiAnalysis: "Analisis AI",
        industryBenchmark: "Perbandingan Industri",
        recommendedActions: "Langkah-Langkah Prioritas",
        priority: "Prioritas",
        impact: "Dampak",
        footer:
          "Generated by Subak Hijau, Konsultan AI Sustainability untuk UMKM Indonesia",
        carbonTitle: "Jejak Karbon & Dampak Lingkungan",
        co2Year: "CO₂/tahun",
        potentialSavingsMonth: "potensi hemat/bulan",
        treeEquivalentText: "pohon per tahun untuk menyerap emisi",
        complianceTitle: "Kepatuhan Regulasi",
        compliant: "Terpenuhi",
        nonCompliant: "Belum Terpenuhi",
        aboveAverage: "di atas rata-rata",
        belowAverage: "di bawah rata-rata",
        scanToVerify: "Scan untuk verifikasi",
        downloadPdf: "Download PDF",
        pdfPrint: "Print",
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
        annualEstimate: "Estimasi dampak dari langkah yang telah diselesaikan",
        trees: "pohon/tahun",
        progressLabel: "tercapai",
      },
      addItem: "Tambah Langkah",
      editItem: "Edit Langkah",
      deleteItem: "Hapus Langkah",
      deleteConfirmTitle: "Hapus langkah ini?",
      deleteConfirmDesc:
        "Langkah ini akan dihapus permanen dan tidak bisa dikembalikan.",
      deleteBtn: "Hapus",
      cancelBtn: "Batal",
      saveBtn: "Simpan",
      savingBtn: "Menyimpan...",
      aiGenerated: "AI",
      mandatory: "Wajib",
      mandatoryTooltip: "Langkah wajib dari AI, tidak bisa dihapus",
      askAi: "Tanya AI",
      askAiTooltip: "Tanyakan langkah ini ke AI Consultant",
      stepCompletedToast: "Langkah berhasil diselesaikan!",
      userAdded: "Manual",
      itemAdded: "Langkah berhasil ditambahkan!",
      itemUpdated: "Langkah berhasil diperbarui!",
      itemDeleted: "Langkah berhasil dihapus!",
      addError: "Gagal menambahkan langkah",
      updateError: "Gagal memperbarui langkah",
      deleteError: "Gagal menghapus langkah",
      cannotDeleteMandatory: "Langkah wajib tidak bisa dihapus",
      form: {
        title: "Judul",
        titlePlaceholder: "Masukkan judul langkah",
        description: "Deskripsi",
        descriptionPlaceholder: "Jelaskan langkah ini",
        category: "Kategori",
        priority: "Prioritas",
        estimatedImpact: "Estimasi Dampak",
        estimatedCost: "Estimasi Biaya",
        timeline: "Timeline",
        selectPlaceholder: "Pilih...",
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
      industryLabels: {
        fnb: "F&B (Makanan & Minuman)",
        retail: "Ritel",
        manufacturing: "Manufaktur",
        services: "Jasa",
        agriculture: "Pertanian",
        other: "Lainnya",
      },
    },
    carbon: {
      title: "Jejak Karbon",
      subtitle: "Visualisasi emisi karbon dan potensi penghematan bisnis Anda",
      totalEmissions: "Total Emisi CO₂",
      treeEquivalent: "Setara Pohon",
      potentialSavings: "Potensi Penghematan",
      breakdown: "Rincian Emisi",
      energyLabel: "Energi",
      wasteLabel: "Limbah",
      transportLabel: "Transportasi",
      vsIndustry: "Bisnis Anda vs Rata-rata Industri",
      yourBusiness: "Bisnis Anda",
      industryAvg: "Rata-rata Industri",
      topRecommendations: "Rekomendasi Teratas",
      noAssessment: "Belum ada data",
      noAssessmentDesc:
        "Lengkapi assessment untuk melihat jejak karbon bisnis Anda.",
      startAssessment: "Mulai Assessment",
      kgYear: "kg CO₂/tahun",
      trees: "pohon",
      rpMonth: "Rp/bulan",
    },
    compliance: {
      title: "Kepatuhan Regulasi",
      subtitle:
        "Status kepatuhan bisnis Anda terhadap regulasi sustainability Indonesia",
      overallScore: "Skor Kepatuhan",
      framework: "Framework",
      compliant: "Terpenuhi",
      nonCompliant: "Belum Terpenuhi",
      recommendation: "Rekomendasi",
      noAssessment: "Belum ada data",
      noAssessmentDesc:
        "Lengkapi assessment untuk melihat status kepatuhan regulasi bisnis Anda.",
      startAssessment: "Mulai Assessment",
    },
    simulator: {
      title: "Simulator Skor",
      subtitle:
        "Simulasikan perubahan untuk melihat dampaknya terhadap skor keberlanjutan Anda",
      currentScore: "Skor Saat Ini",
      projectedScore: "Skor Proyeksi",
      pointIncrease: "poin",
      ifAllApplied: "Jika semua diterapkan, skor Anda bisa naik dari",
      couldIncrease: "menjadi",
      to: "\u2192",
      reset: "Reset Semua",
      changeScenarios: "Skenario Perubahan",
      allAchieved: "Semua skenario sudah tercapai! Luar biasa!",
      noAssessment: "Belum ada data",
      noAssessmentDesc:
        "Lengkapi assessment dan generate skor terlebih dahulu untuk menggunakan simulator.",
      startAssessment: "Mulai Assessment",
    },
    certificate: {
      download: "Download Sertifikat",
      generating: "Membuat sertifikat...",
      certificateTitle: "SERTIFIKAT KEBERLANJUTAN",
      issuedTo: "Diberikan kepada",
      assessmentDate: "Tanggal Assessment",
      level: "Level",
      categoryBreakdown: "Rincian Kategori",
    },
    progress: {
      last7Days: "7 Hari Terakhir",
      last30Days: "30 Hari Terakhir",
      allTime: "Semua",
      noDataInRange: "Tidak ada data skor dalam periode ini",
      title: "Progres Keberlanjutan",
      subtitle:
        "Lacak perkembangan skor dan langkah-langkah yang telah diselesaikan",
      exportScoreHistory: "Export Riwayat Skor",
      scoreHistory: "Riwayat Skor",
      totalSteps: "Total Langkah",
      completed: "Selesai",
      inProgress: "Dalam Proses",
      completionPercent: "Persentase Selesai",
      categoryProgress: "Progres per Kategori",
      recentCompletions: "Langkah Terakhir Diselesaikan",
      milestones: "Pencapaian",
      analyticsTitle: "Analitik Dampak Keberlanjutan",
      estSavingsMonth: "estimasi hemat/bulan",
      estCO2Reduced: "estimasi CO₂ berkurang",
      estROI: "estimasi ROI balik modal",
      estSavingsPerCategory: "Estimasi penghematan per kategori",
      perMonth: "/bulan",
      months: "bulan",
      emptyTitle: "Belum ada data progres",
      emptyDescription:
        "Selesaikan assessment untuk mulai melacak progres keberlanjutan usaha Anda.",
      startAssessment: "Mulai Assessment",
      milestoneFirstAssessment: "Assessment Pertama",
      milestoneFirstAssessmentDesc: "Menyelesaikan assessment pertama",
      milestoneScore50: "Skor 50+",
      milestoneScore50Desc: "Mencapai skor total 50 atau lebih",
      milestone5Steps: "5 Langkah Selesai",
      milestone5StepsDesc: "Menyelesaikan 5 langkah roadmap",
      milestoneScore80: "Skor 80+",
      milestoneScore80Desc: "Mencapai skor total 80 atau lebih",
      milestoneStreak4: "4 Minggu Berturut-turut",
      milestoneStreak4Desc:
        "Menyelesaikan langkah roadmap 4 minggu berturut-turut",
      milestoneStreak8: "8 Minggu Berturut-turut",
      milestoneStreak8Desc:
        "Menyelesaikan langkah roadmap 8 minggu berturut-turut",
      chartScore: "Skor",
      chartDateLabel: "Tanggal:",
    },
    gamification: {
      streak: {
        title: "Streak Mingguan",
        weeksInRow: "minggu berturut-turut",
        bestStreak: "Streak terbaik",
        noStreak: "Belum ada streak. Selesaikan langkah roadmap minggu ini!",
        milestone4: "1 Bulan Konsisten!",
        milestone8: "2 Bulan Konsisten!",
        milestone12: "3 Bulan Konsisten!",
      },
      celebration: {
        firstItem: {
          title: "Langkah Pertama!",
          subtitle: "Perjalanan sustainability Anda dimulai!",
        },
        pct25: {
          title: "25% Selesai!",
          subtitle: "Seperempat jalan menuju bisnis hijau!",
        },
        pct50: {
          title: "Setengah Jalan!",
          subtitle: "Luar biasa! Terus semangat!",
        },
        pct75: {
          title: "75% Tercapai!",
          subtitle: "Hampir sampai! Sedikit lagi!",
        },
        pct100: {
          title: "100% Selesai!",
          subtitle: "Champion Keberlanjutan! Luar biasa!",
        },
        rankChange: {
          title: "Naik Level!",
          subtitle: "Rank sustainability Anda meningkat!",
        },
        categoryMaster: {
          title: "Kategori Tuntas!",
          subtitle: "Semua langkah dalam satu kategori selesai!",
        },
        streakMilestone: {
          title: "Streak Milestone!",
          subtitle: "Konsistensi Anda luar biasa!",
        },
        shareBtn: "Bagikan",
        continueBtn: "Lanjutkan",
      },
      industryRank: {
        title: "Rank Industri",
        yourRank: "Rank Anda",
      },
      industryBadges: {
        title: "Badge Industri",
        locked: "Terkunci",
      },
      percentile: {
        template: "Di atas {percent}% perusahaan {industry}",
      },
      achievementCard: {
        download: "Download Kartu Pencapaian",
        title: "Kartu Pencapaian",
      },
      industryQuestions: {
        title: "Pertanyaan Khusus Industri",
        description: "Pertanyaan tambahan sesuai jenis industri Anda",
        skipInfo: "Industri 'Lainnya' tidak memiliki pertanyaan tambahan",
      },
      verification: {
        title: "Verifikasi Sertifikat",
        verifiedBy: "Diverifikasi oleh Subak Hijau",
        score: "Skor Keberlanjutan",
        level: "Level",
        assessmentDate: "Tanggal Assessment",
        businessName: "Nama Bisnis",
        invalid: "Sertifikat Tidak Valid",
        invalidDesc:
          "Token verifikasi tidak ditemukan atau sudah tidak berlaku.",
      },
    },
    certificatePage: {
      title: "Sertifikat Keberlanjutan",
      subtitle: "Preview dan download sertifikat sustainability bisnis Anda",
      downloadPng: "Download PNG",
      downloadPdf: "Download Laporan PDF",
      shareLink: "Bagikan Sertifikat",
      copyLink: "Salin Link",
      linkCopied: "Link disalin!",
      shareWhatsApp: "WhatsApp",
      scanToVerify: "Scan untuk verifikasi",
      noScore: "Belum ada skor",
      noScoreDesc:
        "Lengkapi assessment terlebih dahulu untuk mendapatkan sertifikat.",
      viewAchievement: "Lihat Kartu Pencapaian",
    },
    achievementPage: {
      title: "Kartu Pencapaian",
      subtitle: "Preview dan download kartu pencapaian sustainability Anda",
      downloadPng: "Download PNG",
      shareLink: "Bagikan Pencapaian",
      copyLink: "Salin Link",
      linkCopied: "Link disalin!",
      shareWhatsApp: "WhatsApp",
      scanToVerify: "Scan untuk verifikasi",
      noScore: "Belum ada skor",
      noScoreDesc:
        "Lengkapi assessment terlebih dahulu untuk melihat pencapaian.",
      viewCertificate: "Lihat Sertifikat",
      previewCardTitle: "Preview Kartu",
      shareTitle: "Bagikan Pencapaian",
      achievementsLabel: "Pencapaian",
      canvasAchievements: "Pencapaian",
      canvasFooter: "AI Sustainability Consultant untuk UMKM Indonesia",
      downloadSuccess: "Achievement card berhasil diunduh!",
      downloadError: "Gagal mengunduh achievement card",
      copySuccess: "Link berhasil disalin!",
      copyError: "Gagal menyalin link",
    },
    askAiCard: {
      button: "Tanya AI",
      score: {
        title: "Ingin meningkatkan skor Anda?",
        description:
          "Tanya AI Consultant untuk saran personal berdasarkan skor sustainability Anda.",
      },
      carbon: {
        title: "Butuh strategi kurangi emisi?",
        description:
          "AI Consultant bisa bantu analisis jejak karbon dan beri rekomendasi pengurangan emisi.",
      },
      compliance: {
        title: "Perlu bantuan kepatuhan regulasi?",
        description:
          "Tanya AI tentang langkah konkret untuk memenuhi regulasi yang belum terpenuhi.",
      },
      progress: {
        title: "Ingin mempercepat progres?",
        description:
          "AI Consultant bisa analisis progres dan sarankan cara meningkatkan skor lebih cepat.",
      },
      simulator: {
        title: "Bingung pilih skenario mana?",
        description:
          "AI Consultant bisa bantu prioritaskan perubahan yang paling berdampak dan mudah diterapkan.",
      },
      sdg: {
        title: "Ingin kontribusi SDG lebih besar?",
        description:
          "Tanya AI tentang cara meningkatkan kontribusi pada SDG yang belum aktif.",
      },
    },
    chatWidget: {
      title: "AI Consultant",
      placeholder: "Ketik pertanyaan...",
      openFullChat: "Buka Chat Lengkap",
      suggestedTitle: "Saran pertanyaan:",
    },
    bottomSheet: {
      more: "Lainnya",
      moreMenu: "Menu Lainnya",
      ariaLabel: "Navigasi utama mobile",
    },
    journeyChecklist: {
      title: "Perjalanan Anda",
      stepCount: "Langkah",
      completeProfile: "Lengkapi Profil",
      fillAssessment: "Isi Assessment",
      viewScore: "Lihat Skor",
      createRoadmap: "Buat Roadmap",
      getCertificate: "Dapatkan Sertifikat",
    },
    chatMessage: {
      carbonFootprint: "Jejak Karbon",
      kgCo2Year: "kg CO₂/tahun",
      equivalent: "Setara",
      treesYear: "pohon/tahun",
      industryBenchmark: "Benchmark Industri",
      average: "Rata-rata",
      top: "Top",
      requirements: "Persyaratan",
      codeCopied: "Kode disalin!",
      codeCopyFail: "Gagal menyalin kode",
      copied: "Disalin",
      copy: "Salin",
      messageCopied: "Disalin!",
      messageCopyFail: "Gagal menyalin teks",
      copyMessage: "Salin pesan",
      analyzing: "Menganalisis data...",
    },
    chatHistory: {
      newConversation: "Percakapan Baru",
      deleteTitle: "Hapus percakapan?",
      deleteDescription:
        "Percakapan ini akan dihapus secara permanen dan tidak dapat dikembalikan.",
      cancel: "Batal",
      delete: "Hapus",
      empty: "Belum ada percakapan",
      justNow: "Baru saja",
      minutesAgo: "menit lalu",
      hoursAgo: "jam lalu",
      daysAgo: "hari lalu",
    },
    chatPage: {
      greeting: "Halo! Saya Subak Hijau",
      greetingDesc:
        "Konsultan sustainability AI Anda. Tanyakan apa saja tentang praktik bisnis berkelanjutan.",
      typing: "Subak Hijau sedang mengetik...",
      errorTitle: "Gagal mendapat respons dari AI.",
      errorRetry: "Silakan coba kirim ulang pesan Anda.",
      historyTitle: "Riwayat Chat",
      suggestedPrompts: [
        "Bagaimana cara mengurangi limbah plastik?",
        "Tips hemat energi untuk UMKM",
        "Apa itu ekonomi sirkular?",
      ],
      aiUnavailable: "AI sedang tidak tersedia. Coba lagi dalam beberapa saat.",
      headerTitle: "Subak Hijau Chat",
    },
    chatInput: {
      placeholder: "Ketik pesan Anda...",
      send: "Kirim",
    },
    commandPalette: {
      searchPlaceholder: "Ketik perintah atau cari...",
      noResults: "Tidak ditemukan.",
      navigation: "Navigasi",
      actions: "Aksi",
      switchToLight: "Beralih ke Mode Terang",
      switchToDark: "Beralih ke Mode Gelap",
    },
    keyboardShortcuts: {
      title: "Keyboard Shortcuts",
      openCommandPalette: "Buka Command Palette",
      toggleDarkMode: "Toggle dark/light mode",
      toggleSidebar: "Toggle sidebar",
      showShortcuts: "Tampilkan keyboard shortcuts",
    },
    comparison: {
      title: "Perbandingan Skor",
      subtitle: "Assessment pertama vs terbaru",
      emptyTitle: "Belum Cukup Data untuk Perbandingan",
      emptyDescription:
        "Selesaikan minimal 2 assessment untuk melihat perbandingan skor Anda dari waktu ke waktu.",
      startAssessment: "Mulai Assessment",
      totalScore: "Skor Total",
      overallChange: "Perubahan skor keseluruhan",
      first: "Pertama",
      latest: "Terbaru",
      points: "poin",
      biggestImprovement: "Peningkatan Terbesar",
      categoryComparison: "Perbandingan per Kategori",
    },
    certificatePreview: {
      title: "SERTIFIKAT KEBERLANJUTAN",
      issuedTo: "Diberikan kepada",
      dateLabel: "Tanggal",
      footer: "Subak Hijau — AI Sustainability untuk UMKM",
    },
    settings: {
      title: "Pengaturan",
      subtitle: "Kelola profil bisnis dan akun Anda",
      businessProfile: "Profil Bisnis",
      businessName: "Nama Bisnis",
      businessNamePlaceholder: "Contoh: Warung Makan Sederhana",
      industryType: "Jenis Industri",
      industryPlaceholder: "Pilih jenis industri",
      businessSize: "Ukuran Bisnis",
      businessSizePlaceholder: "Pilih ukuran bisnis",
      employeeCount: "Jumlah Karyawan",
      employeePlaceholder: "Contoh: 10",
      location: "Lokasi (Kota/Provinsi)",
      locationPlaceholder: "Contoh: Denpasar, Bali",
      description: "Deskripsi Singkat Bisnis",
      descriptionPlaceholder: "Ceritakan sedikit tentang bisnis Anda...",
      saving: "Menyimpan...",
      saveChanges: "Simpan Perubahan",
      saveSuccess: "Profil berhasil diperbarui",
      saveError: "Gagal menyimpan perubahan",
      assessment: "Assessment",
      assessmentDesc:
        "Ambil assessment ulang untuk memperbarui skor keberlanjutan Anda berdasarkan kondisi terkini.",
      retakeAssessment: "Ambil Assessment Ulang",
      cookiePreferences: "Preferensi Cookie",
      cookieDesc:
        "Cookie fungsional menyimpan preferensi tampilan Anda (bahasa, tema, status sidebar) agar tetap tersimpan saat kembali berkunjung.",
      cookieEssentialLabel: "Cookie Esensial",
      cookieEssentialDesc: "Login dan fungsi dasar",
      cookieFunctionalLabel: "Cookie Fungsional",
      cookieFunctionalDesc: "Bahasa, tema, sidebar",
      cookieAnalyticsLabel: "Cookie Analitik",
      cookieAnalyticsDesc: "Google Analytics (anonim)",
      helpTitle: "Bantuan",
      helpDesc:
        "Mulai ulang tur interaktif untuk melihat fitur-fitur utama dashboard.",
      startTour: "Mulai Tour",
      account: "Akun",
      email: "Email",
      signOut: "Keluar",
      deleteAccount: "Hapus Akun",
      deleteAccountTitle: "Hapus Akun?",
      deleteAccountDesc:
        "Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus.",
      cancelBtn: "Batal",
      confirmDelete: "Ya, Hapus Akun",
      validationBusinessName: "Nama bisnis minimal 2 karakter",
    },
    assessmentPage: {
      title: "Assessment Sustainability",
      description:
        "Jawab pertanyaan berikut untuk menilai tingkat sustainability bisnis Anda.",
      retakeGate: {
        title: "Anda Sudah Memiliki Assessment",
        subtitle:
          "Memulai assessment baru akan menggantikan hasil sebelumnya termasuk skor, roadmap, dan sertifikat.",
        lastScore: "Skor Terakhir",
        outOf100: "dari 100",
        lastDate: "Tanggal Assessment",
        warning:
          "Perhatian: Assessment baru akan menghapus skor, roadmap, dan sertifikat yang sudah ada.",
        viewResults: "Lihat Hasil",
        startNew: "Mulai Assessment Baru",
      },
    },
    scorePage: {
      emptyTitle: "Belum ada assessment",
      emptyDescription:
        "Lengkapi assessment terlebih dahulu untuk mendapatkan skor keberlanjutan usaha Anda.",
      startAssessment: "Mulai Assessment",
    },
    benchmark: {
      title: "Benchmark Industri",
      percentileAbove: "di atas",
      percentileBelow: "di bawah",
      of: "perusahaan",
      avg: "Rata²",
      avgFull: "Rata-rata industri",
      yourScore: "Skor Anda",
      difference: "Selisih",
      pts: "poin",
      ariaLabel:
        "Perbandingan benchmark: Skor Anda {userScore}, Rata-rata industri {benchmark}",
    },
  },
}

const en: Dictionary = {
  navbar: {
    howItWorks: "How It Works",
    faq: "FAQ",
    about: "About",
    guide: "Guide",
    login: "Login",
    register: "Register",
  },
  hero: {
    badge: "AI-Powered Sustainability",
    titleStart: "Make Your Business",
    titleHighlight: "Greener",
    titleEnd: "in 10 Minutes",
    description:
      "Subak Hijau helps Indonesian MSMEs assess, plan, and track business sustainability strategies without expensive consultant fees.",
    cta: "Get Started Free",
    learnMore: "See Demo",
    imageAlt: "Subak Hijau AI sustainability dashboard",
    speedBadge: "10 minutes",
    noCost: "100% Free",
    industries: "6 Industries",
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
      {
        value: "10 Min",
        label: "for a complete assessment",
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
          "Fill in your business profile like industry, scale, and practices.",
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
  productPreview: {
    heading: "See What You Get",
    subheading:
      "Sustainability score, action roadmap, and AI consultant — all in one platform",
    tabs: {
      score: "Score & Analysis",
      roadmap: "AI Roadmap",
      chat: "AI Consultant",
    },
    scoreTab: {
      totalScore: "78/100",
      benchmarkText: "Above 72% of F&B businesses",
      categories: [
        { name: "Energy", value: 82 },
        { name: "Waste", value: 75 },
        { name: "Supply Chain", value: 70 },
        { name: "Operations", value: 85 },
        { name: "Policy", value: 68 },
      ],
    },
    roadmapTab: {
      items: [
        {
          title: "Switch to energy-efficient LED lighting",
          category: "Energy",
          priority: "High",
          cost: "Low",
          completed: true,
        },
        {
          title: "Separate organic & inorganic waste",
          category: "Waste",
          priority: "High",
          cost: "Free",
          completed: true,
        },
        {
          title: "Track monthly electricity usage",
          category: "Operations",
          priority: "Medium",
          cost: "Free",
          completed: false,
        },
        {
          title: "Choose certified local suppliers",
          category: "Supply Chain",
          priority: "Medium",
          cost: "Low",
          completed: false,
        },
      ],
    },
    chatTab: {
      messages: [
        { role: "user", content: "What's my food stall's carbon footprint?" },
        {
          role: "assistant",
          content:
            "Based on your data, your estimated carbon emissions are about 2.4 tons CO₂/year. This comes from: electricity (45%), cooking gas (30%), waste (25%). Per POJK 51/2017, MSMEs should start reporting their carbon footprint.",
        },
        { role: "user", content: "How can I reduce it?" },
      ],
    },
  },
  comparison: {
    heading: "Traditional Consultant vs Subak Hijau",
    subheading:
      "Compare conventional sustainability approaches with our AI solution",
    traditional: "Traditional Consultant",
    subakHijau: "Subak Hijau",
    recommended: "Recommended",
    rows: [
      {
        aspect: "Cost",
        traditional: "Rp 75M+/year",
        subakHijau: "Free forever",
      },
      {
        aspect: "Time",
        traditional: "2-4 weeks",
        subakHijau: "10-15 minutes",
      },
      {
        aspect: "Updates",
        traditional: "Manual, yearly",
        subakHijau: "Real-time AI",
      },
      {
        aspect: "Personalization",
        traditional: "Generic templates",
        subakHijau: "AI per industry",
      },
      {
        aspect: "Tracking",
        traditional: "Manual spreadsheet",
        subakHijau: "Auto dashboard",
      },
      {
        aspect: "Language",
        traditional: "English only",
        subakHijau: "Indonesian + English",
      },
      {
        aspect: "Regulations",
        traditional: "Self-research",
        subakHijau: "AI regulation database",
      },
    ],
  },
  cta: {
    heading: "Start Your Free Assessment Now",
    description:
      "Just 10 minutes for a sustainability score, action roadmap, and personal AI consultant — all completely free.",
    button: "Start Free",
    secondaryButton: "See Demo ↑",
    perks: {
      clock: "10 min setup",
      wallet: "No cost",
      shield: "Encrypted data",
    },
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
        simulator: "Simulator",
        carbonFootprint: "Carbon Footprint",
        compliance: "Compliance",
        help: "Help",
        certificate: "Certificate",
        achievementCard: "Achievement Card",
        report: "Report",
        sdgImpact: "SDG Impact",
      },
      groups: {
        main: "Main",
        analysis: "Analysis",
        results: "Results & Support",
        support: "Support",
      },
      settings: "Settings",
      signOut: "Sign Out",
      ariaLabel: "Sidebar navigation",
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
      impactTitle: "\u{1F33F} Your Business Environmental Impact",
      categoryBreakdown: "Category Breakdown",
      downloadReport: "Download Report",
      sdg: {
        title: "SDG Contribution",
        subtitle:
          "Sustainable Development Goals aligned with your business practices",
        active: "Contributing",
        inactive: "Not yet contributing",
      },
      share: {
        button: "Share via WhatsApp",
        gotScore: "got a sustainability score of",
        from: "from Subak Hijau AI!",
        checkYours: "Check your business sustainability too",
      },
      report: {
        title: "Sustainability Report",
        generatedAt: "Generated on",
        categoryBreakdown: "Category Score Breakdown",
        sdgAlignment: "Sustainable Development Goals Contribution",
        aiAnalysis: "AI Analysis",
        industryBenchmark: "Industry Benchmark",
        recommendedActions: "Priority Actions",
        priority: "Priority",
        impact: "Impact",
        footer:
          "Generated by Subak Hijau, AI Sustainability Consultant for Indonesian MSMEs",
        carbonTitle: "Carbon Footprint & Environmental Impact",
        co2Year: "CO₂/year",
        potentialSavingsMonth: "potential savings/month",
        treeEquivalentText: "trees per year to absorb emissions",
        complianceTitle: "Regulatory Compliance",
        compliant: "Compliant",
        nonCompliant: "Non-Compliant",
        aboveAverage: "above average",
        belowAverage: "below average",
        scanToVerify: "Scan to verify",
        downloadPdf: "Download PDF",
        pdfPrint: "Print",
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
        annualEstimate: "Impact from completed steps out of total potential",
        trees: "trees/year",
        progressLabel: "achieved",
      },
      addItem: "Add Step",
      editItem: "Edit Step",
      deleteItem: "Delete Step",
      deleteConfirmTitle: "Delete this step?",
      deleteConfirmDesc:
        "This step will be permanently deleted and cannot be recovered.",
      deleteBtn: "Delete",
      cancelBtn: "Cancel",
      saveBtn: "Save",
      savingBtn: "Saving...",
      aiGenerated: "AI",
      mandatory: "Required",
      mandatoryTooltip: "Required AI-generated step, cannot be deleted",
      askAi: "Ask AI",
      askAiTooltip: "Ask AI Consultant about this step",
      stepCompletedToast: "Step completed successfully!",
      userAdded: "Manual",
      itemAdded: "Step added successfully!",
      itemUpdated: "Step updated successfully!",
      itemDeleted: "Step deleted successfully!",
      addError: "Failed to add step",
      updateError: "Failed to update step",
      deleteError: "Failed to delete step",
      cannotDeleteMandatory: "Required steps cannot be deleted",
      form: {
        title: "Title",
        titlePlaceholder: "Enter step title",
        description: "Description",
        descriptionPlaceholder: "Describe this step",
        category: "Category",
        priority: "Priority",
        estimatedImpact: "Estimated Impact",
        estimatedCost: "Estimated Cost",
        timeline: "Timeline",
        selectPlaceholder: "Select...",
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
      industryLabels: {
        fnb: "F&B (Food & Beverage)",
        retail: "Retail",
        manufacturing: "Manufacturing",
        services: "Services",
        agriculture: "Agriculture",
        other: "Other",
      },
    },
    carbon: {
      title: "Carbon Footprint",
      subtitle:
        "Visualize your business carbon emissions and savings potential",
      totalEmissions: "Total CO₂ Emissions",
      treeEquivalent: "Tree Equivalent",
      potentialSavings: "Potential Savings",
      breakdown: "Emission Breakdown",
      energyLabel: "Energy",
      wasteLabel: "Waste",
      transportLabel: "Transportation",
      vsIndustry: "Your Business vs Industry Average",
      yourBusiness: "Your Business",
      industryAvg: "Industry Average",
      topRecommendations: "Top Recommendations",
      noAssessment: "No data yet",
      noAssessmentDesc:
        "Complete an assessment to view your business carbon footprint.",
      startAssessment: "Start Assessment",
      kgYear: "kg CO₂/year",
      trees: "trees",
      rpMonth: "Rp/month",
    },
    compliance: {
      title: "Regulatory Compliance",
      subtitle:
        "Your business compliance status against Indonesian sustainability regulations",
      overallScore: "Compliance Score",
      framework: "Framework",
      compliant: "Compliant",
      nonCompliant: "Non-Compliant",
      recommendation: "Recommendation",
      noAssessment: "No data yet",
      noAssessmentDesc:
        "Complete an assessment to view your regulatory compliance status.",
      startAssessment: "Start Assessment",
    },
    simulator: {
      title: "Score Simulator",
      subtitle:
        "Simulate changes to see their impact on your sustainability score",
      currentScore: "Current Score",
      projectedScore: "Projected Score",
      pointIncrease: "points",
      ifAllApplied: "If all applied, your score could increase from",
      couldIncrease: "to",
      to: "\u2192",
      reset: "Reset All",
      changeScenarios: "Change Scenarios",
      allAchieved: "All scenarios already achieved! Amazing!",
      noAssessment: "No data yet",
      noAssessmentDesc:
        "Complete an assessment and generate a score first to use the simulator.",
      startAssessment: "Start Assessment",
    },
    certificate: {
      download: "Download Certificate",
      generating: "Generating certificate...",
      certificateTitle: "SUSTAINABILITY CERTIFICATE",
      issuedTo: "Issued to",
      assessmentDate: "Assessment Date",
      level: "Level",
      categoryBreakdown: "Category Breakdown",
    },
    progress: {
      last7Days: "Last 7 Days",
      last30Days: "Last 30 Days",
      allTime: "All Time",
      noDataInRange: "No score data in this period",
      title: "Sustainability Progress",
      subtitle: "Track your score trends and completed steps",
      exportScoreHistory: "Export Score History",
      scoreHistory: "Score History",
      totalSteps: "Total Steps",
      completed: "Completed",
      inProgress: "In Progress",
      completionPercent: "Completion Rate",
      categoryProgress: "Progress by Category",
      recentCompletions: "Recently Completed Steps",
      milestones: "Milestones",
      analyticsTitle: "Sustainability Impact Analytics",
      estSavingsMonth: "est. savings/month",
      estCO2Reduced: "est. CO₂ reduced",
      estROI: "est. ROI payback",
      estSavingsPerCategory: "Estimated savings by category",
      perMonth: "/month",
      months: "months",
      emptyTitle: "No progress data yet",
      emptyDescription:
        "Complete an assessment to start tracking your sustainability progress.",
      startAssessment: "Start Assessment",
      milestoneFirstAssessment: "First Assessment",
      milestoneFirstAssessmentDesc: "Completed your first assessment",
      milestoneScore50: "Score 50+",
      milestoneScore50Desc: "Reached a total score of 50 or higher",
      milestone5Steps: "5 Steps Done",
      milestone5StepsDesc: "Completed 5 roadmap steps",
      milestoneScore80: "Score 80+",
      milestoneScore80Desc: "Reached a total score of 80 or higher",
      milestoneStreak4: "4 Weeks in a Row",
      milestoneStreak4Desc: "Completed roadmap steps 4 weeks in a row",
      milestoneStreak8: "8 Weeks in a Row",
      milestoneStreak8Desc: "Completed roadmap steps 8 weeks in a row",
      chartScore: "Score",
      chartDateLabel: "Date:",
    },
    gamification: {
      streak: {
        title: "Weekly Streak",
        weeksInRow: "weeks in a row",
        bestStreak: "Best streak",
        noStreak: "No streak yet. Complete a roadmap step this week!",
        milestone4: "1 Month Consistent!",
        milestone8: "2 Months Consistent!",
        milestone12: "3 Months Consistent!",
      },
      celebration: {
        firstItem: {
          title: "First Step!",
          subtitle: "Your sustainability journey begins!",
        },
        pct25: {
          title: "25% Complete!",
          subtitle: "Quarter way to a green business!",
        },
        pct50: {
          title: "Halfway There!",
          subtitle: "Amazing! Keep it up!",
        },
        pct75: {
          title: "75% Achieved!",
          subtitle: "Almost there! Just a little more!",
        },
        pct100: {
          title: "100% Complete!",
          subtitle: "Sustainability Champion! Incredible!",
        },
        rankChange: {
          title: "Level Up!",
          subtitle: "Your sustainability rank has increased!",
        },
        categoryMaster: {
          title: "Category Complete!",
          subtitle: "All steps in one category are done!",
        },
        streakMilestone: {
          title: "Streak Milestone!",
          subtitle: "Your consistency is amazing!",
        },
        shareBtn: "Share",
        continueBtn: "Continue",
      },
      industryRank: {
        title: "Industry Rank",
        yourRank: "Your Rank",
      },
      industryBadges: {
        title: "Industry Badges",
        locked: "Locked",
      },
      percentile: {
        template: "Above {percent}% of {industry} businesses",
      },
      achievementCard: {
        download: "Download Achievement Card",
        title: "Achievement Card",
      },
      industryQuestions: {
        title: "Industry-Specific Questions",
        description: "Additional questions based on your industry type",
        skipInfo: "'Other' industry has no additional questions",
      },
      verification: {
        title: "Certificate Verification",
        verifiedBy: "Verified by Subak Hijau",
        score: "Sustainability Score",
        level: "Level",
        assessmentDate: "Assessment Date",
        businessName: "Business Name",
        invalid: "Invalid Certificate",
        invalidDesc: "Verification token not found or has expired.",
      },
    },
    certificatePage: {
      title: "Sustainability Certificate",
      subtitle: "Preview and download your business sustainability certificate",
      downloadPng: "Download PNG",
      downloadPdf: "Download PDF Report",
      shareLink: "Share Certificate",
      copyLink: "Copy Link",
      linkCopied: "Link copied!",
      shareWhatsApp: "WhatsApp",
      scanToVerify: "Scan to verify",
      noScore: "No score yet",
      noScoreDesc: "Complete an assessment first to get your certificate.",
      viewAchievement: "View Achievement Card",
    },
    achievementPage: {
      title: "Achievement Card",
      subtitle: "Preview and download your sustainability achievement card",
      downloadPng: "Download PNG",
      shareLink: "Share Achievement",
      copyLink: "Copy Link",
      linkCopied: "Link copied!",
      shareWhatsApp: "WhatsApp",
      scanToVerify: "Scan to verify",
      noScore: "No score yet",
      noScoreDesc: "Complete an assessment first to view your achievements.",
      viewCertificate: "View Certificate",
      previewCardTitle: "Card Preview",
      shareTitle: "Share Achievement",
      achievementsLabel: "Achievements",
      canvasAchievements: "Achievements",
      canvasFooter: "AI Sustainability Consultant for Indonesian MSMEs",
      downloadSuccess: "Achievement card downloaded!",
      downloadError: "Failed to download achievement card",
      copySuccess: "Link copied!",
      copyError: "Failed to copy link",
    },
    askAiCard: {
      button: "Ask AI",
      score: {
        title: "Want to improve your score?",
        description:
          "Ask the AI Consultant for personalized advice based on your sustainability score.",
      },
      carbon: {
        title: "Need strategies to reduce emissions?",
        description:
          "The AI Consultant can help analyze your carbon footprint and recommend reductions.",
      },
      compliance: {
        title: "Need help with regulatory compliance?",
        description:
          "Ask AI about concrete steps to meet the regulations you haven't fulfilled yet.",
      },
      progress: {
        title: "Want to accelerate your progress?",
        description:
          "The AI Consultant can analyze your progress and suggest ways to improve faster.",
      },
      simulator: {
        title: "Not sure which scenario to pick?",
        description:
          "The AI Consultant can help prioritize the changes with the most impact and easiest to implement.",
      },
      sdg: {
        title: "Want to contribute more to SDGs?",
        description:
          "Ask AI about how to increase your contribution to inactive SDGs.",
      },
    },
    chatWidget: {
      title: "AI Consultant",
      placeholder: "Type a question...",
      openFullChat: "Open Full Chat",
      suggestedTitle: "Suggested questions:",
    },
    bottomSheet: {
      more: "More",
      moreMenu: "More Menu",
      ariaLabel: "Mobile main navigation",
    },
    journeyChecklist: {
      title: "Your Journey",
      stepCount: "Step",
      completeProfile: "Complete Profile",
      fillAssessment: "Fill Assessment",
      viewScore: "View Score",
      createRoadmap: "Create Roadmap",
      getCertificate: "Get Certificate",
    },
    chatMessage: {
      carbonFootprint: "Carbon Footprint",
      kgCo2Year: "kg CO₂/year",
      equivalent: "Equivalent to",
      treesYear: "trees/year",
      industryBenchmark: "Industry Benchmark",
      average: "Average",
      top: "Top",
      requirements: "Requirements",
      codeCopied: "Code copied!",
      codeCopyFail: "Failed to copy code",
      copied: "Copied",
      copy: "Copy",
      messageCopied: "Copied!",
      messageCopyFail: "Failed to copy text",
      copyMessage: "Copy message",
      analyzing: "Analyzing data...",
    },
    chatHistory: {
      newConversation: "New Conversation",
      deleteTitle: "Delete conversation?",
      deleteDescription:
        "This conversation will be permanently deleted and cannot be recovered.",
      cancel: "Cancel",
      delete: "Delete",
      empty: "No conversations yet",
      justNow: "Just now",
      minutesAgo: "min ago",
      hoursAgo: "hr ago",
      daysAgo: "days ago",
    },
    chatPage: {
      greeting: "Hi! I'm Subak Hijau",
      greetingDesc:
        "Your AI sustainability consultant. Ask me anything about sustainable business practices.",
      typing: "Subak Hijau is typing...",
      errorTitle: "Failed to get AI response.",
      errorRetry: "Please try resending your message.",
      historyTitle: "Chat History",
      suggestedPrompts: [
        "How to reduce plastic waste?",
        "Energy saving tips for MSMEs",
        "What is circular economy?",
      ],
      aiUnavailable: "AI is currently unavailable. Please try again shortly.",
      headerTitle: "Subak Hijau Chat",
    },
    chatInput: {
      placeholder: "Type your message...",
      send: "Send",
    },
    commandPalette: {
      searchPlaceholder: "Type a command or search...",
      noResults: "No results found.",
      navigation: "Navigation",
      actions: "Actions",
      switchToLight: "Switch to Light Mode",
      switchToDark: "Switch to Dark Mode",
    },
    keyboardShortcuts: {
      title: "Keyboard Shortcuts",
      openCommandPalette: "Open Command Palette",
      toggleDarkMode: "Toggle dark/light mode",
      toggleSidebar: "Toggle sidebar",
      showShortcuts: "Show keyboard shortcuts",
    },
    comparison: {
      title: "Score Comparison",
      subtitle: "First vs latest assessment",
      emptyTitle: "Not Enough Data for Comparison",
      emptyDescription:
        "Complete at least 2 assessments to see your score comparison over time.",
      startAssessment: "Start Assessment",
      totalScore: "Total Score",
      overallChange: "Overall score change",
      first: "First",
      latest: "Latest",
      points: "points",
      biggestImprovement: "Biggest Improvement",
      categoryComparison: "Category Comparison",
    },
    certificatePreview: {
      title: "SUSTAINABILITY CERTIFICATE",
      issuedTo: "Issued to",
      dateLabel: "Date",
      footer: "Subak Hijau — AI Sustainability for MSMEs",
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your business profile and account",
      businessProfile: "Business Profile",
      businessName: "Business Name",
      businessNamePlaceholder: "e.g., Green Café",
      industryType: "Industry Type",
      industryPlaceholder: "Select industry type",
      businessSize: "Business Size",
      businessSizePlaceholder: "Select business size",
      employeeCount: "Employee Count",
      employeePlaceholder: "e.g., 10",
      location: "Location (City/Province)",
      locationPlaceholder: "e.g., Denpasar, Bali",
      description: "Brief Business Description",
      descriptionPlaceholder: "Tell us a bit about your business...",
      saving: "Saving...",
      saveChanges: "Save Changes",
      saveSuccess: "Profile updated successfully",
      saveError: "Failed to save changes",
      assessment: "Assessment",
      assessmentDesc:
        "Retake the assessment to update your sustainability score based on current conditions.",
      retakeAssessment: "Retake Assessment",
      cookiePreferences: "Cookie Preferences",
      cookieDesc:
        "Functional cookies save your display preferences (language, theme, sidebar state) so they persist when you return.",
      cookieEssentialLabel: "Essential Cookies",
      cookieEssentialDesc: "Login and basic functions",
      cookieFunctionalLabel: "Functional Cookies",
      cookieFunctionalDesc: "Language, theme, sidebar",
      cookieAnalyticsLabel: "Analytics Cookies",
      cookieAnalyticsDesc: "Google Analytics (anonymous)",
      helpTitle: "Help",
      helpDesc:
        "Restart the interactive tour to see the main dashboard features.",
      startTour: "Start Tour",
      account: "Account",
      email: "Email",
      signOut: "Sign Out",
      deleteAccount: "Delete Account",
      deleteAccountTitle: "Delete Account?",
      deleteAccountDesc:
        "This action cannot be undone. All your data will be deleted.",
      cancelBtn: "Cancel",
      confirmDelete: "Yes, Delete Account",
      validationBusinessName: "Business name must be at least 2 characters",
    },
    assessmentPage: {
      title: "Sustainability Assessment",
      description:
        "Answer the following questions to assess your business sustainability level.",
      retakeGate: {
        title: "You Already Have an Assessment",
        subtitle:
          "Starting a new assessment will replace your previous results including score, roadmap, and certificate.",
        lastScore: "Last Score",
        outOf100: "out of 100",
        lastDate: "Assessment Date",
        warning:
          "Warning: A new assessment will overwrite your existing score, roadmap, and certificate.",
        viewResults: "View Results",
        startNew: "Start New Assessment",
      },
    },
    scorePage: {
      emptyTitle: "No assessment yet",
      emptyDescription:
        "Complete an assessment first to get your business sustainability score.",
      startAssessment: "Start Assessment",
    },
    benchmark: {
      title: "Industry Benchmark",
      percentileAbove: "above",
      percentileBelow: "below",
      of: "of",
      avg: "Avg",
      avgFull: "Industry Avg",
      yourScore: "Your Score",
      difference: "Difference",
      pts: "pts",
      ariaLabel:
        "Benchmark comparison: Your score {userScore}, Industry average {benchmark}",
    },
  },
}

export const dictionaries: Record<Locale, Dictionary> = { id, en }
