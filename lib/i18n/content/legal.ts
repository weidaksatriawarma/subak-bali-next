import type { Locale } from "../dictionaries"

interface LegalSection {
  title: string
  content: string[]
}

interface LegalPage {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

export interface LegalDictionary {
  terms: LegalPage
  privacy: LegalPage
  cookies: LegalPage
  disclaimer: LegalPage
}

const id: LegalDictionary = {
  terms: {
    title: "Syarat dan Ketentuan Layanan",
    lastUpdated: "Terakhir diperbarui: 1 Maret 2026",
    intro:
      "Dengan mengakses dan menggunakan layanan Subak Hijau, Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan seksama sebelum menggunakan platform kami.",
    sections: [
      {
        title: "1. Ketentuan Umum",
        content: [
          "Subak Hijau adalah platform konsultan sustainability berbasis kecerdasan buatan (AI) yang ditujukan untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia.",
          "Platform ini dioperasikan oleh Tim Subak Code sebagai proyek kompetisi PROXOCORIS 2026.",
          "Dengan mendaftar dan menggunakan layanan ini, Anda menyatakan telah berusia minimal 17 tahun atau memiliki izin dari orang tua/wali.",
        ],
      },
      {
        title: "2. Penggunaan Layanan",
        content: [
          "Layanan Subak Hijau disediakan sebatas alat bantu konsultasi sustainability menggunakan teknologi AI. Anda bertanggung jawab atas keakuratan data yang Anda masukkan.",
          "Anda dilarang menggunakan platform untuk tujuan ilegal, menyebarkan malware, atau mengganggu operasi sistem.",
          "Kami berhak menangguhkan atau menghentikan akses Anda tanpa pemberitahuan jika terjadi pelanggaran ketentuan ini.",
        ],
      },
      {
        title: "3. Hak dan Kewajiban Pengguna",
        content: [
          "Anda berhak mengakses fitur-fitur Subak Hijau yang tersedia, termasuk AI assessment, skor sustainability, roadmap, dan AI chat consultant.",
          "Anda wajib menjaga kerahasiaan kredensial akun Anda dan bertanggung jawab atas semua aktivitas yang dilakukan melalui akun Anda.",
          "Anda berhak mengajukan penghapusan data pribadi sesuai dengan UU Perlindungan Data Pribadi (UU No. 27 Tahun 2022).",
        ],
      },
      {
        title: "4. Konten yang Dihasilkan AI",
        content: [
          "Skor sustainability, roadmap, dan rekomendasi yang dihasilkan oleh AI bersifat indikatif dan tidak menggantikan konsultasi profesional.",
          "Estimasi pengurangan CO\u2082 dan penghematan biaya adalah perkiraan berdasarkan model AI dan data industri rata-rata. Hasil aktual dapat berbeda.",
          "Subak Hijau tidak bertanggung jawab atas keputusan bisnis yang diambil berdasarkan rekomendasi AI.",
        ],
      },
      {
        title: "5. Pembatasan Tanggung Jawab",
        content: [
          "Layanan disediakan 'sebagaimana adanya' (as-is) tanpa jaminan apapun, baik tersurat maupun tersirat.",
          "Subak Hijau tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan.",
          "Batas tanggung jawab maksimal kami adalah nilai layanan yang telah Anda bayar (untuk layanan gratis, hal ini adalah nol).",
        ],
      },
      {
        title: "6. Hukum yang Berlaku",
        content: [
          "Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.",
          "Ketentuan ini tunduk pada UU ITE No. 11 Tahun 2008 sebagaimana diubah dengan UU No. 19 Tahun 2016, PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik, serta UU PDP No. 27 Tahun 2022.",
          "Segala sengketa akan diselesaikan secara musyawarah terlebih dahulu. Apabila tidak tercapai kesepakatan, sengketa diselesaikan melalui pengadilan yang berwenang di Indonesia.",
        ],
      },
    ],
  },
  privacy: {
    title: "Kebijakan Privasi",
    lastUpdated: "Terakhir diperbarui: 1 Maret 2026",
    intro:
      "Kebijakan privasi ini menjelaskan bagaimana Subak Hijau mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU No. 27 Tahun 2022) dan prinsip-prinsip GDPR.",
    sections: [
      {
        title: "1. Data yang Dikumpulkan",
        content: [
          "Data identitas: nama, alamat email saat pendaftaran akun.",
          "Data profil bisnis: jenis usaha, ukuran, lokasi, dan praktik operasional yang Anda isi dalam assessment.",
          "Data penggunaan: hasil assessment, skor sustainability, roadmap, dan riwayat percakapan dengan AI consultant.",
          "Data teknis: jenis perangkat, browser, alamat IP, dan preferensi tampilan (bahasa, tema).",
        ],
      },
      {
        title: "2. Tujuan Pengumpulan Data",
        content: [
          "Menyediakan layanan assessment dan konsultasi sustainability yang dipersonalisasi.",
          "Menghasilkan skor sustainability, roadmap aksi, dan rekomendasi AI yang relevan.",
          "Meningkatkan kualitas layanan dan pengalaman pengguna.",
          "Memenuhi kewajiban hukum dan regulasi yang berlaku.",
        ],
      },
      {
        title: "3. Penyimpanan dan Keamanan Data",
        content: [
          "Data disimpan pada server Supabase dengan enkripsi AES-256 saat penyimpanan (at rest) dan TLS 1.3 saat transmisi (in transit).",
          "Database dilindungi dengan Row Level Security (RLS) yang memastikan setiap pengguna hanya dapat mengakses data miliknya sendiri.",
          "Kami menerapkan prinsip minimisasi data, hanya mengumpulkan data yang diperlukan untuk menyediakan layanan.",
          "Data akan disimpan selama akun Anda aktif. Setelah penghapusan akun, data akan dihapus dalam waktu 30 hari kerja.",
        ],
      },
      {
        title: "4. Hak Subjek Data",
        content: [
          "Sesuai UU PDP No. 27/2022, Anda memiliki hak untuk: mengakses data pribadi Anda, memperbaiki data yang tidak akurat, menghapus data pribadi Anda, membatasi pemrosesan data, dan memindahkan data (portabilitas).",
          "Untuk menggunakan hak-hak tersebut, hubungi kami melalui halaman Kontak.",
          "Kami akan merespons permintaan Anda dalam waktu 3x24 jam sesuai ketentuan UU PDP.",
        ],
      },
      {
        title: "5. Cookie dan Pelacakan",
        content: [
          "Subak Hijau menggunakan cookie fungsional minimal untuk menyimpan preferensi tampilan (bahasa dan tema).",
          "Kami tidak menggunakan cookie pelacakan pihak ketiga atau iklan.",
          "Informasi lebih lanjut tentang cookie kami tersedia di halaman Kebijakan Cookie.",
        ],
      },
      {
        title: "6. Perubahan Kebijakan",
        content: [
          "Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan material akan diinformasikan melalui email atau notifikasi di platform.",
          "Penggunaan layanan setelah perubahan dianggap sebagai persetujuan terhadap kebijakan yang diperbarui.",
          "Versi terbaru dari kebijakan ini selalu tersedia di halaman ini.",
        ],
      },
    ],
  },
  cookies: {
    title: "Kebijakan Cookie",
    lastUpdated: "Terakhir diperbarui: 1 Maret 2026",
    intro:
      "Halaman ini menjelaskan penggunaan cookie dan penyimpanan lokal (local storage) oleh Subak Hijau.",
    sections: [
      {
        title: "1. Apa Itu Cookie?",
        content: [
          "Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi situs web. Cookie membantu situs mengingat preferensi Anda.",
          "Subak Hijau juga menggunakan local storage browser, yang berfungsi serupa dengan cookie tetapi disimpan secara lokal di perangkat Anda.",
        ],
      },
      {
        title: "2. Cookie yang Kami Gunakan",
        content: [
          "subakhijau-locale: Menyimpan preferensi bahasa Anda (Indonesia/English). Jenis: local storage. Durasi: permanen hingga dihapus manual.",
          "subakhijau-theme: Menyimpan preferensi tema tampilan (light/dark). Jenis: local storage. Durasi: permanen hingga dihapus manual.",
          "subakhijau-sidebar-state: Menyimpan status sidebar dashboard (terbuka/tertutup). Jenis: cookie. Durasi: 7 hari.",
          "subakhijau-cookie-consent: Menyimpan persetujuan cookie Anda. Jenis: local storage. Durasi: permanen hingga dihapus manual.",
          "sb-*: Cookie autentikasi Supabase untuk manajemen sesi login. Jenis: cookie. Durasi: sesi.",
        ],
      },
      {
        title: "3. Jenis Cookie",
        content: [
          "Cookie Esensial: Cookie autentikasi (sb-*) diperlukan agar fitur login dan dashboard berfungsi. Tidak dapat dinonaktifkan.",
          "Cookie Fungsional: Preferensi bahasa, tema, dan status sidebar meningkatkan pengalaman pengguna. Dapat dihapus melalui pengaturan browser.",
          "Cookie Analitik/Pelacakan: Kami TIDAK menggunakan cookie analitik atau pelacakan pihak ketiga.",
        ],
      },
      {
        title: "4. Cara Mengelola Cookie",
        content: [
          "Anda dapat menghapus cookie dan data local storage melalui pengaturan browser Anda.",
          "Menonaktifkan cookie esensial dapat memengaruhi fungsionalitas login dan dashboard.",
          "Menghapus cookie fungsional akan mengembalikan preferensi ke default (Bahasa Indonesia, tema sistem).",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "Terakhir diperbarui: 1 Maret 2026",
    intro:
      "Harap baca disclaimer ini dengan seksama sebelum menggunakan layanan Subak Hijau.",
    sections: [
      {
        title: "1. Konten yang Dihasilkan AI",
        content: [
          "Seluruh skor sustainability, rekomendasi, roadmap, dan informasi yang dihasilkan oleh AI Subak Hijau bersifat informatif dan indikatif.",
          "Konten AI tidak menggantikan konsultasi profesional dari konsultan sustainability, akuntan, pengacara, atau ahli lingkungan bersertifikasi.",
          "Akurasi output AI bergantung pada kualitas dan kelengkapan data yang Anda berikan.",
        ],
      },
      {
        title: "2. Estimasi Karbon dan Penghematan",
        content: [
          "Estimasi pengurangan CO\u2082 dan penghematan biaya yang ditampilkan adalah perkiraan berdasarkan model kalkulasi dan data rata-rata industri.",
          "Hasil aktual dapat berbeda secara signifikan tergantung pada kondisi spesifik bisnis, lokasi, harga energi lokal, dan faktor lainnya.",
          "Angka-angka ini tidak boleh dijadikan dasar tunggal untuk keputusan investasi atau pelaporan ESG resmi.",
        ],
      },
      {
        title: "3. Informasi Regulasi",
        content: [
          "Referensi terhadap regulasi Indonesia (UU PDP, POJK, Perpres, dll.) bersifat informatif dan mungkin tidak mencakup perubahan terbaru.",
          "Subak Hijau bukan penasihat hukum. Untuk kepatuhan regulasi, konsultasikan dengan penasihat hukum yang berkompeten.",
          "Kami berusaha memperbarui informasi regulasi secara berkala, namun tidak menjamin kelengkapan atau kebaruan informasi.",
        ],
      },
      {
        title: "4. Ketersediaan Layanan",
        content: [
          "Subak Hijau adalah proyek kompetisi (PROXOCORIS 2026) dan ketersediaan jangka panjang tidak dijamin.",
          "Kami berhak mengubah, menangguhkan, atau menghentikan layanan tanpa pemberitahuan sebelumnya.",
          "Kami tidak bertanggung jawab atas gangguan layanan, kehilangan data, atau ketidaktersediaan platform.",
        ],
      },
      {
        title: "5. Tautan Pihak Ketiga",
        content: [
          "Platform ini mungkin mengandung tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs pihak ketiga.",
          "Penggunaan layanan pihak ketiga (termasuk Supabase dan penyedia AI) tunduk pada syarat dan ketentuan masing-masing layanan tersebut.",
        ],
      },
    ],
  },
}

const en: LegalDictionary = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "Last updated: March 1, 2026",
    intro:
      "By accessing and using Subak Hijau services, you agree to the following terms and conditions. Please read carefully before using our platform.",
    sections: [
      {
        title: "1. General Provisions",
        content: [
          "Subak Hijau is an AI-powered sustainability consultant platform intended for Micro, Small, and Medium Enterprises (MSMEs) in Indonesia.",
          "This platform is operated by Team Subak Code as a PROXOCORIS 2026 competition project.",
          "By registering and using this service, you confirm that you are at least 17 years old or have parental/guardian consent.",
        ],
      },
      {
        title: "2. Use of Service",
        content: [
          "Subak Hijau services are provided solely as an AI-powered sustainability consultation tool. You are responsible for the accuracy of the data you input.",
          "You are prohibited from using the platform for illegal purposes, distributing malware, or disrupting system operations.",
          "We reserve the right to suspend or terminate your access without notice in case of violation of these terms.",
        ],
      },
      {
        title: "3. User Rights and Obligations",
        content: [
          "You have the right to access available Subak Hijau features, including AI assessment, sustainability score, roadmap, and AI chat consultant.",
          "You must maintain the confidentiality of your account credentials and are responsible for all activity conducted through your account.",
          "You have the right to request deletion of your personal data in accordance with the Personal Data Protection Law (UU No. 27/2022).",
        ],
      },
      {
        title: "4. AI-Generated Content",
        content: [
          "Sustainability scores, roadmaps, and recommendations generated by AI are indicative and do not replace professional consultation.",
          "CO\u2082 reduction estimates and cost savings are approximations based on AI models and average industry data. Actual results may vary.",
          "Subak Hijau is not responsible for business decisions made based on AI recommendations.",
        ],
      },
      {
        title: "5. Limitation of Liability",
        content: [
          "Services are provided 'as-is' without any warranties, express or implied.",
          "Subak Hijau is not liable for any direct, indirect, incidental, or consequential damages arising from the use of services.",
          "Our maximum liability is limited to the amount you have paid for services (for free services, this is zero).",
        ],
      },
      {
        title: "6. Governing Law",
        content: [
          "These terms and conditions are governed by and construed in accordance with the laws of the Republic of Indonesia.",
          "These terms are subject to the ITE Law No. 11/2008 as amended by Law No. 19/2016, Government Regulation No. 71/2019 on Electronic System and Transaction Operations, and the PDP Law No. 27/2022.",
          "Any disputes shall first be resolved through deliberation. If no agreement is reached, disputes shall be settled through the competent courts in Indonesia.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 1, 2026",
    intro:
      "This privacy policy explains how Subak Hijau collects, uses, stores, and protects your personal data in accordance with Indonesia's Personal Data Protection Law (UU No. 27/2022) and GDPR principles.",
    sections: [
      {
        title: "1. Data We Collect",
        content: [
          "Identity data: name and email address during account registration.",
          "Business profile data: business type, size, location, and operational practices you provide in the assessment.",
          "Usage data: assessment results, sustainability scores, roadmaps, and conversation history with the AI consultant.",
          "Technical data: device type, browser, IP address, and display preferences (language, theme).",
        ],
      },
      {
        title: "2. Purpose of Data Collection",
        content: [
          "To provide personalized sustainability assessment and consultation services.",
          "To generate relevant sustainability scores, action roadmaps, and AI recommendations.",
          "To improve service quality and user experience.",
          "To comply with applicable legal and regulatory obligations.",
        ],
      },
      {
        title: "3. Data Storage and Security",
        content: [
          "Data is stored on Supabase servers with AES-256 encryption at rest and TLS 1.3 encryption in transit.",
          "The database is protected with Row Level Security (RLS) ensuring each user can only access their own data.",
          "We apply the principle of data minimization, only collecting data necessary to provide our services.",
          "Data will be stored as long as your account is active. After account deletion, data will be removed within 30 business days.",
        ],
      },
      {
        title: "4. Data Subject Rights",
        content: [
          "Under UU PDP No. 27/2022, you have the right to: access your personal data, correct inaccurate data, delete your personal data, restrict data processing, and data portability.",
          "To exercise these rights, contact us through the Contact page.",
          "We will respond to your request within 3x24 hours as required by the PDP Law.",
        ],
      },
      {
        title: "5. Cookies and Tracking",
        content: [
          "Subak Hijau uses minimal functional cookies to store display preferences (language and theme).",
          "We do not use third-party tracking or advertising cookies.",
          "More information about our cookies is available on the Cookie Policy page.",
        ],
      },
      {
        title: "6. Policy Changes",
        content: [
          "We reserve the right to update this privacy policy at any time. Material changes will be communicated via email or platform notification.",
          "Continued use of the service after changes constitutes acceptance of the updated policy.",
          "The latest version of this policy is always available on this page.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    lastUpdated: "Last updated: March 1, 2026",
    intro:
      "This page explains the use of cookies and local storage by Subak Hijau.",
    sections: [
      {
        title: "1. What Are Cookies?",
        content: [
          "Cookies are small text files stored on your device when you visit a website. Cookies help the site remember your preferences.",
          "Subak Hijau also uses browser local storage, which functions similarly to cookies but is stored locally on your device.",
        ],
      },
      {
        title: "2. Cookies We Use",
        content: [
          "subakhijau-locale: Stores your language preference (Indonesia/English). Type: local storage. Duration: permanent until manually cleared.",
          "subakhijau-theme: Stores your theme preference (light/dark). Type: local storage. Duration: permanent until manually cleared.",
          "subakhijau-sidebar-state: Stores dashboard sidebar state (open/closed). Type: cookie. Duration: 7 days.",
          "subakhijau-cookie-consent: Stores your cookie consent. Type: local storage. Duration: permanent until manually cleared.",
          "sb-*: Supabase authentication cookies for login session management. Type: cookie. Duration: session.",
        ],
      },
      {
        title: "3. Types of Cookies",
        content: [
          "Essential Cookies: Authentication cookies (sb-*) are required for login and dashboard functionality. Cannot be disabled.",
          "Functional Cookies: Language, theme, and sidebar preferences enhance user experience. Can be cleared through browser settings.",
          "Analytics/Tracking Cookies: We do NOT use analytics or third-party tracking cookies.",
        ],
      },
      {
        title: "4. Managing Cookies",
        content: [
          "You can delete cookies and local storage data through your browser settings.",
          "Disabling essential cookies may affect login and dashboard functionality.",
          "Clearing functional cookies will reset preferences to defaults (Bahasa Indonesia, system theme).",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "Last updated: March 1, 2026",
    intro:
      "Please read this disclaimer carefully before using Subak Hijau services.",
    sections: [
      {
        title: "1. AI-Generated Content",
        content: [
          "All sustainability scores, recommendations, roadmaps, and information generated by Subak Hijau's AI are informational and indicative.",
          "AI content does not replace professional consultation from certified sustainability consultants, accountants, lawyers, or environmental experts.",
          "AI output accuracy depends on the quality and completeness of the data you provide.",
        ],
      },
      {
        title: "2. Carbon and Savings Estimates",
        content: [
          "CO\u2082 reduction estimates and cost savings displayed are approximations based on calculation models and average industry data.",
          "Actual results may vary significantly depending on specific business conditions, location, local energy prices, and other factors.",
          "These figures should not be used as the sole basis for investment decisions or official ESG reporting.",
        ],
      },
      {
        title: "3. Regulatory Information",
        content: [
          "References to Indonesian regulations (UU PDP, POJK, Presidential Regulations, etc.) are informational and may not reflect the latest amendments.",
          "Subak Hijau is not a legal advisor. For regulatory compliance, consult with qualified legal counsel.",
          "We strive to update regulatory information periodically, but do not guarantee completeness or currency of information.",
        ],
      },
      {
        title: "4. Service Availability",
        content: [
          "Subak Hijau is a competition project (PROXOCORIS 2026) and long-term availability is not guaranteed.",
          "We reserve the right to modify, suspend, or discontinue the service without prior notice.",
          "We are not responsible for service interruptions, data loss, or platform unavailability.",
        ],
      },
      {
        title: "5. Third-Party Links",
        content: [
          "This platform may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of third-party sites.",
          "Use of third-party services (including Supabase and AI providers) is subject to the terms and conditions of those respective services.",
        ],
      },
    ],
  },
}

export const legalContent: Record<Locale, LegalDictionary> = { id, en }
