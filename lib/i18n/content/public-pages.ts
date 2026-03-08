import type { Locale } from "../dictionaries"

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
}

export interface PublicPagesDictionary {
  about: {
    title: string
    heroHeading: string
    heroDescription: string
    mission: {
      title: string
      content: string
    }
    vision: {
      title: string
      content: string
    }
    team: {
      title: string
      subtitle: string
      members: TeamMember[]
    }
    competition: {
      title: string
      content: string[]
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
    team: {
      title: "Tim Kami",
      subtitle:
        "Tim Subak Code, membangun solusi untuk masa depan berkelanjutan",
      members: [
        {
          name: "Ahmad Rizky",
          role: "Project Lead & Backend Developer",
          bio: "Passionate tentang sustainable technology dan AI. Berpengalaman dalam membangun platform berbasis data untuk dampak sosial.",
          initials: "AR",
        },
        {
          name: "Siti Nurhaliza",
          role: "Frontend Developer & UI/UX",
          bio: "Fokus pada desain yang inklusif dan accessible. Pengalaman dalam membangun interface yang intuitif untuk pengguna Indonesia.",
          initials: "SN",
        },
        {
          name: "Budi Prasetyo",
          role: "AI/ML Engineer",
          bio: "Spesialis dalam natural language processing dan generative AI. Membangun model AI yang relevan untuk konteks bisnis Indonesia.",
          initials: "BP",
        },
        {
          name: "Dewi Lestari",
          role: "Sustainability Researcher",
          bio: "Latar belakang di bidang ilmu lingkungan dan kebijakan publik. Memastikan rekomendasi AI selaras dengan standar sustainability internasional.",
          initials: "DL",
        },
      ],
    },
    competition: {
      title: "PROXOCORIS 2026",
      content: [
        "GreenAdvisor dikembangkan sebagai proyek kompetisi PROXOCORIS 2026, sebuah kompetisi inovasi teknologi tingkat nasional yang berfokus pada solusi digital untuk pembangunan berkelanjutan.",
        "Proyek ini bertujuan menunjukkan bagaimana teknologi AI dapat dimanfaatkan untuk mendemokratisasi akses terhadap konsultasi sustainability bagi 65 juta UMKM Indonesia.",
      ],
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
    team: {
      title: "Our Team",
      subtitle: "Team Subak Code, building solutions for a sustainable future",
      members: [
        {
          name: "Ahmad Rizky",
          role: "Project Lead & Backend Developer",
          bio: "Passionate about sustainable technology and AI. Experienced in building data-driven platforms for social impact.",
          initials: "AR",
        },
        {
          name: "Siti Nurhaliza",
          role: "Frontend Developer & UI/UX",
          bio: "Focused on inclusive and accessible design. Experienced in building intuitive interfaces for Indonesian users.",
          initials: "SN",
        },
        {
          name: "Budi Prasetyo",
          role: "AI/ML Engineer",
          bio: "Specialist in natural language processing and generative AI. Building AI models relevant to the Indonesian business context.",
          initials: "BP",
        },
        {
          name: "Dewi Lestari",
          role: "Sustainability Researcher",
          bio: "Background in environmental science and public policy. Ensuring AI recommendations align with international sustainability standards.",
          initials: "DL",
        },
      ],
    },
    competition: {
      title: "PROXOCORIS 2026",
      content: [
        "GreenAdvisor was developed as a PROXOCORIS 2026 competition project, a national technology innovation competition focused on digital solutions for sustainable development.",
        "This project aims to demonstrate how AI technology can be leveraged to democratize access to sustainability consulting for 65 million Indonesian MSMEs.",
      ],
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
