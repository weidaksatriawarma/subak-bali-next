import type { Locale } from "../dictionaries"

export interface PublicPagesDictionary {
  about: {
    title: string
    heroHeading: string
    heroDescription: string
    heroImageAlt: string
    mission: {
      title: string
      content: string
    }
    vision: {
      title: string
      content: string
    }
    impact: {
      title: string
      subtitle: string
      features: { title: string; description: string }[]
    }
    imageAlts: {
      sustainability: string
      market: string
      greenTech: string
      agriculture: string
      forest: string
    }
    sdg: {
      title: string
      subtitle: string
      goals: { number: number; title: string; description: string }[]
    }
  }
  contact: {
    title: string
    heading: string
    description: string
    whatsapp: {
      label: string
      description: string
      cta: string
    }
    email: {
      label: string
      value: string
    }
    social: {
      title: string
      instagram: string
      linkedin: string
    }
    response: string
  }
}

const id: PublicPagesDictionary = {
  about: {
    title: "Tentang Kami",
    heroHeading: "Tentang GreenAdvisor",
    heroDescription:
      "Platform konsultan sustainability AI yang memberdayakan UMKM Indonesia untuk bisnis yang lebih hijau dan berkelanjutan.",
    heroImageAlt: "Pemandangan sawah terasering Bali dari udara",
    mission: {
      title: "Misi Kami",
      content:
        "Menjadikan konsultasi sustainability terjangkau dan mudah diakses oleh seluruh UMKM Indonesia melalui teknologi AI, sehingga setiap pelaku usaha dapat berkontribusi pada pembangunan berkelanjutan.",
    },
    vision: {
      title: "Visi Kami",
      content:
        "Menjadi platform konsultan sustainability AI terdepan di Asia Tenggara yang membantu jutaan UMKM bertransformasi menuju praktik bisnis yang ramah lingkungan dan berkelanjutan.",
    },
    impact: {
      title: "Apa yang Kami Lakukan",
      subtitle:
        "Solusi berbasis AI untuk membantu UMKM Indonesia menuju bisnis berkelanjutan",
      features: [
        {
          title: "Analisis AI",
          description:
            "Penilaian sustainability AI yang dipersonalisasi untuk setiap bisnis",
        },
        {
          title: "Kalkulasi Karbon",
          description:
            "Ukur dan lacak jejak karbon dengan faktor emisi Indonesia",
        },
        {
          title: "Kepatuhan Regulasi",
          description: "Panduan regulasi POJK dan sustainability Indonesia",
        },
      ],
    },
    imageAlts: {
      sustainability: "Pasar tradisional Indonesia yang ramai",
      market: "Pasar makanan Indonesia",
      greenTech: "Turbin angin sebagai energi terbarukan",
      agriculture: "Pertanian tropis Indonesia",
      forest: "Hutan berkabut yang asri",
    },
    sdg: {
      title: "Kontribusi SDG",
      subtitle:
        "GreenAdvisor berkontribusi pada pencapaian Sustainable Development Goals",
      goals: [
        {
          number: 7,
          title: "Energi Bersih dan Terjangkau",
          description:
            "Membantu UMKM mengoptimalkan penggunaan energi dan beralih ke sumber energi terbarukan.",
        },
        {
          number: 12,
          title: "Konsumsi dan Produksi Bertanggung Jawab",
          description:
            "Mendorong praktik bisnis yang berkelanjutan melalui pengelolaan limbah dan rantai pasok yang bertanggung jawab.",
        },
        {
          number: 13,
          title: "Penanganan Perubahan Iklim",
          description:
            "Membantu UMKM mengukur dan mengurangi jejak karbon melalui estimasi CO\u2082 dan roadmap aksi.",
        },
      ],
    },
  },
  contact: {
    title: "Hubungi Kami",
    heading: "Hubungi Kami",
    description:
      "Punya pertanyaan, saran, atau ingin berkolaborasi? Hubungi Tim Subak Code melalui salah satu kanal berikut.",
    whatsapp: {
      label: "WhatsApp",
      description: "Cara tercepat untuk menghubungi kami",
      cta: "Chat via WhatsApp",
    },
    email: {
      label: "Email",
      value: "hello@greenadvisor.id",
    },
    social: {
      title: "Media Sosial",
      instagram: "greenadvisor.id",
      linkedin: "GreenAdvisor",
    },
    response: "Kami biasanya merespons dalam 1x24 jam pada hari kerja.",
  },
}

const en: PublicPagesDictionary = {
  about: {
    title: "About Us",
    heroHeading: "About GreenAdvisor",
    heroDescription:
      "An AI sustainability consultant platform empowering Indonesian MSMEs for greener and more sustainable businesses.",
    heroImageAlt: "Aerial view of Bali rice terraces",
    mission: {
      title: "Our Mission",
      content:
        "To make sustainability consulting affordable and accessible to all Indonesian MSMEs through AI technology, enabling every business owner to contribute to sustainable development.",
    },
    vision: {
      title: "Our Vision",
      content:
        "To become the leading AI sustainability consultant platform in Southeast Asia, helping millions of MSMEs transform toward environmentally friendly and sustainable business practices.",
    },
    impact: {
      title: "What We Do",
      subtitle:
        "AI-powered solutions to help Indonesian MSMEs build sustainable businesses",
      features: [
        {
          title: "AI Analysis",
          description:
            "Personalized AI sustainability assessment for each business",
        },
        {
          title: "Carbon Calculation",
          description:
            "Measure and track carbon footprint with Indonesian emission factors",
        },
        {
          title: "Regulatory Compliance",
          description: "POJK and Indonesian sustainability regulation guidance",
        },
      ],
    },
    imageAlts: {
      sustainability: "Bustling Indonesian traditional market",
      market: "Indonesian food market",
      greenTech: "Wind turbines as renewable energy",
      agriculture: "Tropical Indonesian agriculture",
      forest: "Lush misty forest",
    },
    sdg: {
      title: "SDG Contribution",
      subtitle:
        "GreenAdvisor contributes to achieving the Sustainable Development Goals",
      goals: [
        {
          number: 7,
          title: "Affordable and Clean Energy",
          description:
            "Helping MSMEs optimize energy usage and transition to renewable energy sources.",
        },
        {
          number: 12,
          title: "Responsible Consumption and Production",
          description:
            "Promoting sustainable business practices through responsible waste management and supply chains.",
        },
        {
          number: 13,
          title: "Climate Action",
          description:
            "Helping MSMEs measure and reduce their carbon footprint through CO\u2082 estimates and action roadmaps.",
        },
      ],
    },
  },
  contact: {
    title: "Contact Us",
    heading: "Contact Us",
    description:
      "Have questions, suggestions, or want to collaborate? Reach out to Team Subak Code through any of the following channels.",
    whatsapp: {
      label: "WhatsApp",
      description: "The fastest way to reach us",
      cta: "Chat via WhatsApp",
    },
    email: {
      label: "Email",
      value: "hello@greenadvisor.id",
    },
    social: {
      title: "Social Media",
      instagram: "greenadvisor.id",
      linkedin: "GreenAdvisor",
    },
    response: "We typically respond within 24 hours on business days.",
  },
}

export const publicPagesContent: Record<Locale, PublicPagesDictionary> = {
  id,
  en,
}
