import type { Locale } from "../dictionaries"

export interface TutorialDictionary {
  public: {
    title: string
    metaDescription: string
    heroHeading: string
    heroDescription: string
    heroImageAlt: string
    gettingStarted: {
      title: string
      subtitle: string
      steps: { title: string; description: string }[]
    }
    coreFeatures: {
      title: string
      subtitle: string
      features: { title: string; description: string }[]
    }
    aiTools: {
      title: string
      subtitle: string
      features: { title: string; description: string }[]
    }
    gamification: {
      title: string
      subtitle: string
      features: { title: string; description: string }[]
    }
    cta: {
      heading: string
      description: string
      button: string
    }
    imageAlts: {
      hero: string
      collaboration: string
      greenTech: string
      analytics: string
      nature: string
      ctaBg: string
    }
  }
  dashboard: {
    title: string
    subtitle: string
    fullGuideLink: string
    sections: {
      title: string
      items: { question: string; answer: string }[]
    }[]
    tips: {
      title: string
      items: string[]
    }
  }
}

const id: TutorialDictionary = {
  public: {
    title: "Panduan Pengguna",
    metaDescription:
      "Panduan lengkap cara menggunakan Subak Hijau — platform konsultan sustainability AI untuk UMKM Indonesia.",
    heroHeading: "Panduan Pengguna",
    heroDescription:
      "Pelajari cara memaksimalkan Subak Hijau untuk meningkatkan sustainability bisnis Anda secara efektif.",
    heroImageAlt: "Ruang kerja profesional dengan laptop",
    gettingStarted: {
      title: "Mulai dalam 4 Langkah",
      subtitle:
        "Ikuti langkah-langkah sederhana ini untuk memulai perjalanan sustainability bisnis Anda",
      steps: [
        {
          title: "Daftar Akun",
          description:
            "Buat akun gratis dengan email Anda dalam hitungan detik.",
        },
        {
          title: "Isi Profil Bisnis",
          description:
            "Lengkapi informasi bisnis seperti industri, lokasi, dan jumlah karyawan.",
        },
        {
          title: "Ambil Assessment",
          description:
            "Jawab pertanyaan tentang praktik operasional bisnis Anda saat ini.",
        },
        {
          title: "Lihat Skor & Roadmap",
          description:
            "Dapatkan skor sustainability dan rencana aksi yang dipersonalisasi AI.",
        },
      ],
    },
    coreFeatures: {
      title: "Fitur Utama",
      subtitle:
        "Empat fitur inti yang membantu Anda mengelola sustainability bisnis",
      features: [
        {
          title: "Assessment Sustainability",
          description:
            "Isi kuesioner tentang praktik energi, limbah, rantai pasok, operasional, dan kebijakan bisnis Anda.",
        },
        {
          title: "Skor & Analisis",
          description:
            "Dapatkan skor 0-100 dengan breakdown per kategori, benchmark industri, dan ranking spesifik industri.",
        },
        {
          title: "Roadmap Aksi",
          description:
            "Ikuti rencana aksi yang dipersonalisasi AI — tandai item selesai, lacak progress, dan raih achievement.",
        },
        {
          title: "AI Consultant Chat",
          description:
            "Tanya apapun tentang sustainability — AI dilengkapi kalkulator CO\u2082, lookup regulasi, dan benchmark industri.",
        },
      ],
    },
    aiTools: {
      title: "Tools & Analitik AI",
      subtitle:
        "Alat analitik canggih untuk mengukur dan meningkatkan dampak lingkungan bisnis Anda",
      features: [
        {
          title: "Kalkulasi Karbon",
          description:
            "Lihat estimasi jejak karbon tahunan, breakdown per sumber emisi, dan potensi penghematan biaya.",
        },
        {
          title: "Kepatuhan Regulasi",
          description:
            "Cek kepatuhan terhadap POJK 51/2017, UU PDP, dan regulasi sustainability Indonesia lainnya.",
        },
        {
          title: "Simulator What-If",
          description:
            "Simulasikan perubahan praktik bisnis dan lihat dampaknya terhadap skor, karbon, dan penghematan.",
        },
      ],
    },
    gamification: {
      title: "Gamifikasi & Motivasi",
      subtitle:
        "Sistem penghargaan yang membuat perjalanan sustainability Anda lebih menyenangkan",
      features: [
        {
          title: "Ranking Industri",
          description:
            "Naik 5 level ranking yang unik untuk setiap industri — dari pemula hingga champion sustainability.",
        },
        {
          title: "Badge Achievement",
          description:
            "Raih badge saat menyelesaikan milestone: 25%, 50%, 75%, 100% roadmap, dan penguasaan kategori.",
        },
        {
          title: "Streak Mingguan",
          description:
            "Jaga streak dengan menyelesaikan setidaknya 1 item roadmap per minggu — raih milestone di minggu ke-4, 8, dan 12.",
        },
      ],
    },
    cta: {
      heading: "Siap Mulai?",
      description:
        "Bergabunglah dengan ribuan UMKM Indonesia yang sudah memulai perjalanan sustainability mereka.",
      button: "Daftar Gratis",
    },
    imageAlts: {
      hero: "Ruang kerja profesional dengan laptop",
      collaboration: "Tim berkolaborasi dalam proyek sustainability",
      greenTech: "Turbin angin sebagai teknologi hijau",
      analytics: "Dashboard analitik data",
      nature: "Pemandangan alam yang asri",
      ctaBg: "Pemandangan alam tropis",
    },
  },
  dashboard: {
    title: "Pusat Bantuan",
    subtitle: "Temukan jawaban untuk pertanyaan Anda tentang Subak Hijau",
    fullGuideLink: "Lihat panduan lengkap \u2192",
    sections: [
      {
        title: "Memulai",
        items: [
          {
            question: "Bagaimana cara mendaftar dan memulai onboarding?",
            answer:
              "Klik tombol 'Daftar' di halaman utama, masukkan email dan password Anda. Setelah verifikasi email, Anda akan diarahkan ke halaman onboarding untuk mengisi profil bisnis seperti nama bisnis, industri, lokasi, dan jumlah karyawan.",
          },
          {
            question: "Bagaimana cara mengambil assessment?",
            answer:
              "Buka menu 'Assessment' di sidebar, lalu jawab pertanyaan tentang praktik operasional bisnis Anda di 5 kategori: Energi, Limbah, Rantai Pasok, Operasional, dan Kebijakan. Assessment membutuhkan waktu sekitar 10-15 menit.",
          },
          {
            question: "Bagaimana cara melihat skor saya?",
            answer:
              "Setelah menyelesaikan assessment, buka menu 'Skor Saya' untuk melihat skor sustainability 0-100 dengan breakdown per kategori, benchmark industri, dan ranking spesifik industri Anda.",
          },
        ],
      },
      {
        title: "Fitur Utama",
        items: [
          {
            question: "Bagaimana cara membaca skor dan benchmark?",
            answer:
              "Halaman skor menampilkan skor keseluruhan 0-100 dan breakdown per kategori (Energi, Limbah, dll). Benchmark menunjukkan posisi Anda dibandingkan bisnis sejenis di industri yang sama, termasuk persentil dan ranking industri.",
          },
          {
            question: "Bagaimana cara mengikuti roadmap?",
            answer:
              "Buka menu 'Roadmap' untuk melihat rencana aksi yang dipersonalisasi AI. Tandai item sebagai selesai saat Anda mengimplementasikannya. Lacak progress di halaman Progress dan raih achievement saat mencapai milestone.",
          },
          {
            question: "Bagaimana cara chat dengan AI consultant?",
            answer:
              "Buka menu 'AI Consultant' untuk memulai percakapan. Anda bisa bertanya tentang sustainability, menghitung emisi CO\u2082, mencari regulasi Indonesia, atau membandingkan bisnis Anda dengan benchmark industri. AI dilengkapi tools khusus untuk membantu Anda.",
          },
        ],
      },
      {
        title: "Tools Analitik",
        items: [
          {
            question: "Bagaimana cara menggunakan kalkulator karbon?",
            answer:
              "Buka menu 'Jejak Karbon' untuk melihat estimasi emisi CO\u2082 tahunan bisnis Anda. Halaman ini menampilkan breakdown per sumber emisi (listrik, transportasi, limbah) dan estimasi potensi penghematan biaya.",
          },
          {
            question: "Bagaimana cara cek kepatuhan regulasi?",
            answer:
              "Buka menu 'Kepatuhan' untuk melihat status kepatuhan bisnis Anda terhadap regulasi sustainability Indonesia seperti POJK 51/2017, UU PDP, dan Perpres Ekonomi Hijau. Anda akan mendapatkan rekomendasi untuk meningkatkan kepatuhan.",
          },
          {
            question: "Bagaimana cara menggunakan simulator?",
            answer:
              "Buka menu 'Simulator' untuk menjalankan simulasi what-if. Ubah parameter praktik bisnis (misalnya beralih ke energi terbarukan) dan lihat dampak prediksinya terhadap skor sustainability, jejak karbon, dan potensi penghematan biaya.",
          },
        ],
      },
      {
        title: "Gamifikasi",
        items: [
          {
            question: "Apa itu ranking industri?",
            answer:
              "Setiap industri memiliki 5 level ranking unik (misalnya F&B: Warung Pemula \u2192 Chef Sustainability). Ranking Anda naik berdasarkan skor sustainability. Lihat ranking di halaman skor atau progress.",
          },
          {
            question: "Bagaimana cara mendapatkan badge?",
            answer:
              "Badge diraih saat Anda mencapai milestone: menyelesaikan 25%, 50%, 75%, atau 100% item roadmap, menguasai kategori tertentu, atau menjaga streak mingguan. Badge bisa dibagikan sebagai Instagram Story card.",
          },
          {
            question: "Bagaimana cara menjaga streak?",
            answer:
              "Streak dihitung per minggu (ISO week). Selesaikan setidaknya 1 item roadmap per minggu untuk menjaga streak. Milestone streak di minggu ke-4, 8, dan 12 memberikan celebrasi dan badge khusus.",
          },
        ],
      },
      {
        title: "Akun & Pengaturan",
        items: [
          {
            question: "Bagaimana cara mengubah profil bisnis?",
            answer:
              "Buka menu 'Pengaturan' di sidebar untuk mengubah informasi bisnis seperti nama, industri, lokasi, dan jumlah karyawan. Perubahan profil akan mempengaruhi rekomendasi AI Anda selanjutnya.",
          },
          {
            question: "Bagaimana cara retake assessment?",
            answer:
              "Buka menu 'Assessment' dan klik tombol retake. Anda bisa mengambil ulang assessment kapan saja untuk memperbarui skor dan roadmap berdasarkan perubahan praktik bisnis Anda.",
          },
          {
            question: "Bagaimana cara menghapus akun?",
            answer:
              "Untuk menghapus akun, hubungi kami melalui halaman Kontak. Semua data Anda akan dihapus secara permanen sesuai kebijakan privasi dan UU PDP.",
          },
        ],
      },
    ],
    tips: {
      title: "Tips Cepat",
      items: [
        "Tekan 'd' untuk toggle dark mode",
        "Ganti bahasa kapan saja dari navigasi",
        "Retake assessment untuk update skor",
        "Selesaikan 1 item roadmap per minggu untuk menjaga streak",
      ],
    },
  },
}

const en: TutorialDictionary = {
  public: {
    title: "User Guide",
    metaDescription:
      "Complete guide on how to use Subak Hijau — an AI sustainability consultant platform for Indonesian MSMEs.",
    heroHeading: "User Guide",
    heroDescription:
      "Learn how to maximize Subak Hijau to effectively improve your business sustainability.",
    heroImageAlt: "Professional workspace with laptop",
    gettingStarted: {
      title: "Get Started in 4 Steps",
      subtitle:
        "Follow these simple steps to begin your business sustainability journey",
      steps: [
        {
          title: "Create Account",
          description: "Create a free account with your email in seconds.",
        },
        {
          title: "Set Up Business Profile",
          description:
            "Complete your business info like industry, location, and employee count.",
        },
        {
          title: "Take Assessment",
          description:
            "Answer questions about your current business operational practices.",
        },
        {
          title: "View Score & Roadmap",
          description:
            "Get a sustainability score and an AI-personalized action plan.",
        },
      ],
    },
    coreFeatures: {
      title: "Core Features",
      subtitle:
        "Four core features to help you manage your business sustainability",
      features: [
        {
          title: "Sustainability Assessment",
          description:
            "Fill out questionnaires about your energy, waste, supply chain, operations, and business policy practices.",
        },
        {
          title: "Score & Analysis",
          description:
            "Get a 0-100 score with per-category breakdown, industry benchmarks, and industry-specific ranking.",
        },
        {
          title: "Action Roadmap",
          description:
            "Follow an AI-personalized action plan — mark items complete, track progress, and earn achievements.",
        },
        {
          title: "AI Consultant Chat",
          description:
            "Ask anything about sustainability — AI equipped with CO\u2082 calculator, regulation lookup, and industry benchmarks.",
        },
      ],
    },
    aiTools: {
      title: "AI Tools & Analytics",
      subtitle:
        "Advanced analytical tools to measure and improve your business environmental impact",
      features: [
        {
          title: "Carbon Calculator",
          description:
            "View annual carbon footprint estimates, breakdown by emission source, and potential cost savings.",
        },
        {
          title: "Regulatory Compliance",
          description:
            "Check compliance with POJK 51/2017, UU PDP, and other Indonesian sustainability regulations.",
        },
        {
          title: "What-If Simulator",
          description:
            "Simulate business practice changes and see their impact on score, carbon, and savings.",
        },
      ],
    },
    gamification: {
      title: "Gamification & Motivation",
      subtitle:
        "A reward system that makes your sustainability journey more enjoyable",
      features: [
        {
          title: "Industry Ranking",
          description:
            "Progress through 5 ranking levels unique to your industry — from beginner to sustainability champion.",
        },
        {
          title: "Achievement Badges",
          description:
            "Earn badges when completing milestones: 25%, 50%, 75%, 100% roadmap, and category mastery.",
        },
        {
          title: "Weekly Streaks",
          description:
            "Keep your streak by completing at least 1 roadmap item per week — earn milestones at weeks 4, 8, and 12.",
        },
      ],
    },
    cta: {
      heading: "Ready to Start?",
      description:
        "Join thousands of Indonesian MSMEs who have started their sustainability journey.",
      button: "Register for Free",
    },
    imageAlts: {
      hero: "Professional workspace with laptop",
      collaboration: "Team collaborating on sustainability project",
      greenTech: "Wind turbines as green technology",
      analytics: "Data analytics dashboard",
      nature: "Beautiful nature scenery",
      ctaBg: "Tropical nature scenery",
    },
  },
  dashboard: {
    title: "Help Center",
    subtitle: "Find answers to your questions about Subak Hijau",
    fullGuideLink: "See full guide \u2192",
    sections: [
      {
        title: "Getting Started",
        items: [
          {
            question: "How do I sign up and complete onboarding?",
            answer:
              "Click the 'Register' button on the home page, enter your email and password. After email verification, you'll be directed to the onboarding page to fill in your business profile such as business name, industry, location, and employee count.",
          },
          {
            question: "How do I take the assessment?",
            answer:
              "Open the 'Assessment' menu in the sidebar, then answer questions about your business operational practices across 5 categories: Energy, Waste, Supply Chain, Operations, and Policy. The assessment takes about 10-15 minutes.",
          },
          {
            question: "How do I view my score?",
            answer:
              "After completing the assessment, open the 'My Score' menu to see your 0-100 sustainability score with per-category breakdown, industry benchmarks, and your industry-specific ranking.",
          },
        ],
      },
      {
        title: "Core Features",
        items: [
          {
            question: "How do I read the score and benchmarks?",
            answer:
              "The score page displays your overall 0-100 score and per-category breakdown (Energy, Waste, etc.). Benchmarks show your position compared to similar businesses in the same industry, including percentile and industry ranking.",
          },
          {
            question: "How do I follow the roadmap?",
            answer:
              "Open the 'Roadmap' menu to see your AI-personalized action plan. Mark items as complete as you implement them. Track progress on the Progress page and earn achievements when reaching milestones.",
          },
          {
            question: "How do I chat with the AI consultant?",
            answer:
              "Open the 'AI Consultant' menu to start a conversation. You can ask about sustainability, calculate CO\u2082 emissions, look up Indonesian regulations, or compare your business with industry benchmarks. The AI comes with specialized tools to assist you.",
          },
        ],
      },
      {
        title: "Analytics Tools",
        items: [
          {
            question: "How do I use the carbon calculator?",
            answer:
              "Open the 'Carbon Footprint' menu to view your business's estimated annual CO\u2082 emissions. This page shows a breakdown by emission source (electricity, transportation, waste) and estimated potential cost savings.",
          },
          {
            question: "How do I check regulatory compliance?",
            answer:
              "Open the 'Compliance' menu to see your compliance status with Indonesian sustainability regulations like POJK 51/2017, UU PDP, and the Green Economy Presidential Regulation. You'll get recommendations to improve compliance.",
          },
          {
            question: "How do I use the simulator?",
            answer:
              "Open the 'Simulator' menu to run what-if simulations. Change business practice parameters (e.g., switching to renewable energy) and see the predicted impact on your sustainability score, carbon footprint, and potential cost savings.",
          },
        ],
      },
      {
        title: "Gamification",
        items: [
          {
            question: "What is industry ranking?",
            answer:
              "Each industry has 5 unique ranking levels (e.g., F&B: Warung Pemula \u2192 Chef Sustainability). Your ranking increases based on your sustainability score. View your ranking on the score or progress page.",
          },
          {
            question: "How do I earn badges?",
            answer:
              "Badges are earned when you reach milestones: completing 25%, 50%, 75%, or 100% of roadmap items, mastering specific categories, or maintaining weekly streaks. Badges can be shared as Instagram Story cards.",
          },
          {
            question: "How do I maintain my streak?",
            answer:
              "Streaks are counted per week (ISO week). Complete at least 1 roadmap item per week to maintain your streak. Streak milestones at weeks 4, 8, and 12 trigger celebrations and special badges.",
          },
        ],
      },
      {
        title: "Account & Settings",
        items: [
          {
            question: "How do I change my business profile?",
            answer:
              "Open the 'Settings' menu in the sidebar to change business information like name, industry, location, and employee count. Profile changes will affect your subsequent AI recommendations.",
          },
          {
            question: "How do I retake the assessment?",
            answer:
              "Open the 'Assessment' menu and click the retake button. You can retake the assessment anytime to update your score and roadmap based on changes in your business practices.",
          },
          {
            question: "How do I delete my account?",
            answer:
              "To delete your account, contact us through the Contact page. All your data will be permanently deleted in accordance with our privacy policy and UU PDP.",
          },
        ],
      },
    ],
    tips: {
      title: "Quick Tips",
      items: [
        "Press 'd' to toggle dark mode",
        "Switch language anytime from navigation",
        "Retake assessment to update your score",
        "Complete 1 roadmap item per week to keep your streak",
      ],
    },
  },
}

export const tutorialContent: Record<Locale, TutorialDictionary> = { id, en }
