import type { Locale } from "../dictionaries"

interface FaqItem {
  question: string
  answer: string
}

interface TrustBadge {
  label: string
  description: string
}

interface TrustCategory {
  title: string
  badges: TrustBadge[]
}

interface FooterColumn {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}

export interface LandingExtrasDictionary {
  faq: {
    heading: string
    subheading: string
    items: FaqItem[]
    bottomCta: string
  }
  trustBadges: {
    heading: string
    subheading: string
    categories: TrustCategory[]
  }
  footer: {
    tagline: string
    columns: FooterColumn[]
    copyright: string
    madeFor: string
  }
  cookieConsent: {
    text: string
    accept: string
    decline: string
    learnMore: string
  }
  scrollToTop: string
}

const id: LandingExtrasDictionary = {
  faq: {
    heading: "Pertanyaan yang Sering Diajukan",
    subheading: "Jawaban untuk pertanyaan umum tentang Subak Hijau",
    bottomCta: "Masih punya pertanyaan? Tanya AI kami!",
    items: [
      {
        question: "Apa itu Subak Hijau?",
        answer:
          "Subak Hijau adalah platform konsultan sustainability berbasis AI yang dirancang khusus untuk UMKM Indonesia. Kami membantu bisnis menilai dampak lingkungan, mendapatkan skor sustainability, dan membuat roadmap aksi yang dipersonalisasi.",
      },
      {
        question: "Apakah Subak Hijau gratis?",
        answer:
          "Ya, Subak Hijau sepenuhnya gratis untuk digunakan. Misi kami adalah membuat konsultasi sustainability dapat diakses oleh semua pelaku UMKM tanpa biaya konsultan yang mahal.",
      },
      {
        question: "Bagaimana cara kerja skor AI?",
        answer:
          "AI kami menganalisis profil bisnis dan praktik operasional Anda di 5 kategori: Energi, Limbah, Rantai Pasok, Operasional, dan Kebijakan. Setiap kategori dinilai berdasarkan praktik terbaik industri dan standar sustainability internasional.",
      },
      {
        question: "Apakah data saya aman?",
        answer:
          "Keamanan data adalah prioritas utama kami. Semua data dienkripsi saat transit dan penyimpanan, dilindungi dengan Row Level Security (RLS) di database, dan kami mematuhi UU Perlindungan Data Pribadi (UU PDP No. 27/2022).",
      },
      {
        question: "Industri apa saja yang didukung?",
        answer:
          "Subak Hijau mendukung berbagai sektor UMKM termasuk F&B (warung, restoran, kafe), retail, manufaktur skala kecil, jasa, pertanian, dan hospitality. AI kami memberikan rekomendasi yang disesuaikan dengan industri spesifik Anda.",
      },
      {
        question: "Berapa lama proses assessment?",
        answer:
          "Assessment awal hanya membutuhkan waktu 10-15 menit. Anda mengisi profil bisnis dan menjawab pertanyaan tentang praktik operasional, kemudian AI langsung memberikan skor dan rekomendasi.",
      },
      {
        question: "Apa hubungan Subak Hijau dengan regulasi Indonesia?",
        answer:
          "Subak Hijau membantu UMKM memahami dan memenuhi regulasi sustainability Indonesia termasuk POJK 51/2017 tentang Keuangan Berkelanjutan, Perpres 98/2021 tentang Ekonomi Hijau, dan standar ESG yang berlaku.",
      },
      {
        question: "Bahasa apa saja yang tersedia?",
        answer:
          "Subak Hijau tersedia dalam Bahasa Indonesia dan Bahasa Inggris. Anda dapat beralih bahasa kapan saja melalui tombol bahasa di navigasi.",
      },
    ],
  },
  trustBadges: {
    heading: "Terpercaya & Sesuai Standar",
    subheading: "Dibangun dengan kepatuhan regulasi dan keamanan terbaik",
    categories: [
      {
        title: "Kepatuhan Regulasi",
        badges: [
          {
            label: "UU PDP",
            description: "Sesuai UU No. 27/2022 Perlindungan Data Pribadi",
          },
          {
            label: "POJK 51/2017",
            description: "Standar Keuangan Berkelanjutan OJK",
          },
          {
            label: "PP 71/2019",
            description: "Penyelenggaraan Sistem Elektronik",
          },
        ],
      },
      {
        title: "Keamanan",
        badges: [
          {
            label: "Enkripsi Data",
            description: "Data terenkripsi saat transit dan penyimpanan",
          },
          {
            label: "Row Level Security",
            description: "Isolasi data per pengguna di database",
          },
          {
            label: "SSL/TLS",
            description: "Koneksi aman terenkripsi end-to-end",
          },
        ],
      },
      {
        title: "SDG Goals",
        badges: [
          {
            label: "SDG 7",
            description: "Energi Bersih dan Terjangkau",
          },
          {
            label: "SDG 12",
            description: "Konsumsi dan Produksi Bertanggung Jawab",
          },
          {
            label: "SDG 13",
            description: "Penanganan Perubahan Iklim",
          },
        ],
      },
    ],
  },
  footer: {
    tagline:
      "Konsultan sustainability AI untuk UMKM Indonesia yang lebih hijau.",
    columns: [
      {
        title: "Navigasi",
        links: [
          { label: "Beranda", href: "/" },
          { label: "FAQ", href: "/faq" },
          { label: "Tentang Kami", href: "/about" },
          { label: "Panduan", href: "/panduan" },
          { label: "Kontak", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Syarat Layanan", href: "/terms" },
          { label: "Kebijakan Privasi", href: "/privacy" },
          { label: "Kebijakan Cookie", href: "/cookies" },
          { label: "Disclaimer", href: "/disclaimer" },
        ],
      },
      {
        title: "Kontak",
        links: [
          {
            label: "WhatsApp",
            href: "https://wa.me/6281234567890",
            external: true,
          },
          {
            label: "Email",
            href: "mailto:hello@subakhijau.app",
            external: true,
          },
        ],
      },
    ],
    copyright: "Subak Hijau. Hak cipta dilindungi.",
    madeFor: "Dibuat untuk PROXOCORIS 2026 oleh Tim Subak Code",
  },
  cookieConsent: {
    text: "Kami menggunakan cookie untuk menyimpan preferensi tampilan Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookie sesuai",
    accept: "Terima",
    decline: "Tolak",
    learnMore: "Kebijakan Cookie",
  },
  scrollToTop: "Kembali ke atas",
}

const en: LandingExtrasDictionary = {
  faq: {
    heading: "Frequently Asked Questions",
    subheading: "Answers to common questions about Subak Hijau",
    bottomCta: "Still have questions? Ask our AI!",
    items: [
      {
        question: "What is Subak Hijau?",
        answer:
          "Subak Hijau is an AI-powered sustainability consultant platform designed specifically for Indonesian MSMEs. We help businesses assess their environmental impact, get a sustainability score, and create personalized action roadmaps.",
      },
      {
        question: "Is Subak Hijau free?",
        answer:
          "Yes, Subak Hijau is completely free to use. Our mission is to make sustainability consulting accessible to all MSME entrepreneurs without expensive consultant fees.",
      },
      {
        question: "How does the AI scoring work?",
        answer:
          "Our AI analyzes your business profile and operational practices across 5 categories: Energy, Waste, Supply Chain, Operations, and Policy. Each category is scored based on industry best practices and international sustainability standards.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Data security is our top priority. All data is encrypted in transit and at rest, protected with Row Level Security (RLS) in the database, and we comply with Indonesia's Personal Data Protection Law (UU PDP No. 27/2022).",
      },
      {
        question: "Which industries are supported?",
        answer:
          "Subak Hijau supports various MSME sectors including F&B (food stalls, restaurants, cafes), retail, small-scale manufacturing, services, agriculture, and hospitality. Our AI provides recommendations tailored to your specific industry.",
      },
      {
        question: "How long does the assessment take?",
        answer:
          "The initial assessment only takes 10-15 minutes. You fill in your business profile and answer questions about your operational practices, then the AI immediately provides your score and recommendations.",
      },
      {
        question: "How does Subak Hijau relate to Indonesian regulations?",
        answer:
          "Subak Hijau helps MSMEs understand and comply with Indonesian sustainability regulations including POJK 51/2017 on Sustainable Finance, Presidential Regulation 98/2021 on Green Economy, and applicable ESG standards.",
      },
      {
        question: "What languages are available?",
        answer:
          "Subak Hijau is available in Bahasa Indonesia and English. You can switch languages anytime via the language toggle in the navigation.",
      },
    ],
  },
  trustBadges: {
    heading: "Trusted & Standards-Compliant",
    subheading: "Built with regulatory compliance and best-in-class security",
    categories: [
      {
        title: "Regulatory Compliance",
        badges: [
          {
            label: "UU PDP",
            description:
              "Compliant with Personal Data Protection Law No. 27/2022",
          },
          {
            label: "POJK 51/2017",
            description: "OJK Sustainable Finance Standards",
          },
          {
            label: "PP 71/2019",
            description: "Electronic System Regulation",
          },
        ],
      },
      {
        title: "Security",
        badges: [
          {
            label: "Data Encryption",
            description: "Data encrypted in transit and at rest",
          },
          {
            label: "Row Level Security",
            description: "Per-user data isolation in database",
          },
          {
            label: "SSL/TLS",
            description: "Secure end-to-end encrypted connections",
          },
        ],
      },
      {
        title: "SDG Goals",
        badges: [
          {
            label: "SDG 7",
            description: "Affordable and Clean Energy",
          },
          {
            label: "SDG 12",
            description: "Responsible Consumption and Production",
          },
          {
            label: "SDG 13",
            description: "Climate Action",
          },
        ],
      },
    ],
  },
  footer: {
    tagline: "AI sustainability consultant for greener Indonesian MSMEs.",
    columns: [
      {
        title: "Navigation",
        links: [
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
          { label: "About Us", href: "/about" },
          { label: "Guide", href: "/panduan" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Cookie Policy", href: "/cookies" },
          { label: "Disclaimer", href: "/disclaimer" },
        ],
      },
      {
        title: "Contact",
        links: [
          {
            label: "WhatsApp",
            href: "https://wa.me/6281234567890",
            external: true,
          },
          {
            label: "Email",
            href: "mailto:hello@subakhijau.app",
            external: true,
          },
        ],
      },
    ],
    copyright: "Subak Hijau. All rights reserved.",
    madeFor: "Made for PROXOCORIS 2026 by Team Subak Code",
  },
  cookieConsent: {
    text: "We use cookies to store your display preferences. By continuing, you agree to our cookie usage per our",
    accept: "Accept",
    decline: "Decline",
    learnMore: "Cookie Policy",
  },
  scrollToTop: "Back to top",
}

export const landingExtras: Record<Locale, LandingExtrasDictionary> = { id, en }
