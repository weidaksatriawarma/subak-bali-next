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
    lastUpdated: "Terakhir diperbarui: 11 Maret 2026",
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
          "Anda tidak diperkenankan memanipulasi sistem gamifikasi, termasuk peringkat industri, lencana pencapaian, streak mingguan, atau skor sustainability secara tidak wajar. Tindakan penyalahgunaan dapat mengakibatkan penangguhan atau penghapusan akun.",
        ],
      },
      {
        title: "3. Hak dan Kewajiban Pengguna",
        content: [
          "Anda berhak mengakses fitur-fitur Subak Hijau yang tersedia, termasuk AI assessment, skor sustainability, roadmap aksi, AI chat consultant, kalkulator jejak karbon, sistem gamifikasi (peringkat industri, lencana, dan streak mingguan), sertifikat sustainability yang dapat diverifikasi, dan laporan yang dapat dicetak.",
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
        title: "5. Konten yang Dapat Dibagikan dan Sertifikat",
        content: [
          "Subak Hijau menyediakan fitur kartu pencapaian (achievement card) dalam format Instagram Story (1080\u00d71920 piksel) yang dapat diunduh dan dibagikan di media sosial. Dengan membagikan konten ini, Anda menyetujui penggunaan nama bisnis dan skor sustainability Anda secara publik.",
          "Sertifikat sustainability yang dihasilkan platform dapat diverifikasi melalui halaman publik menggunakan token unik atau kode QR. Informasi yang ditampilkan pada halaman verifikasi meliputi nama bisnis, skor total, skor per kategori, peringkat industri, dan tanggal assessment.",
          "Subak Hijau tidak bertanggung jawab atas penggunaan konten yang dibagikan oleh pengguna di luar platform, termasuk di media sosial atau materi pemasaran.",
        ],
      },
      {
        title: "6. Pembatasan Tanggung Jawab",
        content: [
          "Layanan disediakan 'sebagaimana adanya' (as-is) tanpa jaminan apapun, baik tersurat maupun tersirat.",
          "Subak Hijau tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan.",
          "Batas tanggung jawab maksimal kami adalah nilai layanan yang telah Anda bayar (untuk layanan gratis, hal ini adalah nol).",
        ],
      },
      {
        title: "7. Hukum yang Berlaku",
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
    lastUpdated: "Terakhir diperbarui: 11 Maret 2026",
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
          "Data gamifikasi: peringkat industri, lencana pencapaian, streak mingguan, dan skor per kategori (energi, limbah, rantai pasok, operasional, kebijakan).",
          "Data analitik: jika Anda menyetujui cookie analitik, Google Analytics mengumpulkan data anonim tentang pola penggunaan situs, termasuk halaman yang dikunjungi, durasi kunjungan, sumber trafik, lokasi umum (negara/kota), dan jenis perangkat. Data ini tidak mengandung informasi identitas pribadi secara langsung.",
        ],
      },
      {
        title: "2. Tujuan Pengumpulan Data",
        content: [
          "Menyediakan layanan assessment dan konsultasi sustainability yang dipersonalisasi.",
          "Menghasilkan skor sustainability, roadmap aksi, dan rekomendasi AI yang relevan.",
          "Meningkatkan kualitas layanan dan pengalaman pengguna.",
          "Memenuhi kewajiban hukum dan regulasi yang berlaku.",
          "Menganalisis pola penggunaan platform secara agregat melalui Google Analytics (jika Anda menyetujui cookie analitik) untuk meningkatkan fitur dan pengalaman pengguna.",
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
          "Untuk menggunakan hak-hak tersebut, hubungi kami melalui email hello@subakhijau.app atau halaman Kontak.",
          "Kami akan merespons permintaan Anda dalam waktu 3x24 jam sesuai ketentuan UU PDP.",
        ],
      },
      {
        title: "5. Cookie dan Pelacakan",
        content: [
          "Subak Hijau menggunakan cookie fungsional untuk menyimpan preferensi tampilan (bahasa dan tema), serta cookie analitik dari Google Analytics untuk memahami pola penggunaan platform.",
          "Anda dapat mengelola persetujuan cookie secara granular melalui banner persetujuan saat pertama kali mengunjungi situs. Cookie analitik hanya diaktifkan jika Anda secara eksplisit menyetujuinya.",
          "Informasi lengkap tentang cookie yang kami gunakan tersedia di halaman Kebijakan Cookie.",
        ],
      },
      {
        title: "6. Berbagi Data dengan Pihak Ketiga",
        content: [
          "Supabase (database dan autentikasi): Data profil, assessment, skor, roadmap, dan riwayat percakapan disimpan di server Supabase. Kebijakan privasi Supabase berlaku untuk penyimpanan data ini.",
          "Penyedia AI (Anthropic/OpenAI melalui AI Gateway): Data assessment dan konteks bisnis Anda dikirim ke model AI untuk menghasilkan skor, roadmap, dan respons chat. Data diproses sesuai kebijakan privasi masing-masing penyedia.",
          "Google Analytics: Data penggunaan anonim dikirim ke Google untuk analisis pola penggunaan platform, hanya jika Anda menyetujui cookie analitik. Google memproses data ini sesuai Kebijakan Privasi Google.",
          "Vercel (hosting): Platform di-hosting di Vercel. Log akses dan data teknis (alamat IP, user agent) diproses oleh Vercel sesuai kebijakan privasinya.",
          "Kami tidak menjual data pribadi Anda kepada pihak ketiga manapun.",
        ],
      },
      {
        title: "7. Perubahan Kebijakan",
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
    lastUpdated: "Terakhir diperbarui: 11 Maret 2026",
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
          "subakhijau-cookie-consent: Menyimpan pilihan persetujuan cookie Anda. Jenis: local storage. Durasi: permanen hingga dihapus manual.",
          "sb-*: Cookie autentikasi Supabase untuk manajemen sesi login. Jenis: cookie. Durasi: sesi.",
          "_ga: Cookie Google Analytics untuk membedakan pengguna unik. Jenis: cookie. Durasi: 2 tahun. Hanya aktif jika Anda menyetujui cookie analitik.",
          "_ga_<ID>: Cookie Google Analytics untuk mempertahankan status sesi. Jenis: cookie. Durasi: 2 tahun. Hanya aktif jika Anda menyetujui cookie analitik.",
          "_gid: Cookie Google Analytics untuk membedakan pengguna dalam 24 jam. Jenis: cookie. Durasi: 24 jam. Hanya aktif jika Anda menyetujui cookie analitik.",
        ],
      },
      {
        title: "3. Jenis Cookie",
        content: [
          "Cookie Esensial: Cookie autentikasi (sb-*) diperlukan agar fitur login dan dashboard berfungsi. Tidak dapat dinonaktifkan.",
          "Cookie Fungsional: Preferensi bahasa, tema, dan status sidebar meningkatkan pengalaman pengguna. Dapat dihapus melalui pengaturan browser.",
          "Cookie Analitik: Kami menggunakan Google Analytics (_ga, _ga_<ID>, _gid) untuk memahami pola penggunaan platform secara anonim. Cookie ini hanya diaktifkan jika Anda secara eksplisit menyetujuinya melalui banner persetujuan. Kami tidak menggunakan cookie iklan atau pelacakan untuk tujuan periklanan.",
        ],
      },
      {
        title: "4. Persetujuan Cookie",
        content: [
          "Saat pertama kali mengunjungi Subak Hijau, Anda akan melihat banner persetujuan cookie yang memungkinkan Anda memilih kategori cookie yang diizinkan.",
          "Cookie Esensial: Selalu aktif. Diperlukan untuk autentikasi, keamanan sesi, dan fungsi dasar platform. Termasuk cookie Supabase (sb-*).",
          "Cookie Fungsional: Dapat diaktifkan atau dinonaktifkan. Menyimpan preferensi bahasa, tema tampilan, dan status sidebar. Jika ditolak, preferensi tidak akan tersimpan antar kunjungan.",
          "Cookie Analitik: Dapat diaktifkan atau dinonaktifkan (default: nonaktif). Mengaktifkan Google Analytics untuk analisis penggunaan anonim. Tidak mengumpulkan data identitas pribadi.",
          "Anda dapat mengubah preferensi cookie kapan saja melalui halaman Pengaturan di dashboard.",
        ],
      },
      {
        title: "5. Cara Mengelola Cookie",
        content: [
          "Gunakan banner persetujuan cookie untuk memilih kategori cookie yang Anda izinkan saat pertama kali mengunjungi situs.",
          "Anda dapat mengubah preferensi cookie kapan saja melalui halaman Pengaturan di dashboard, termasuk mengaktifkan atau menonaktifkan cookie fungsional dan analitik secara terpisah.",
          "Menolak cookie fungsional berarti preferensi bahasa, tema, dan draft assessment tidak akan tersimpan antar kunjungan.",
          "Menonaktifkan cookie esensial melalui browser dapat memengaruhi fungsionalitas login dan dashboard.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "Terakhir diperbarui: 11 Maret 2026",
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
          "Kalkulator jejak karbon menggunakan faktor emisi rata-rata Indonesia (misalnya 0,78 kg CO\u2082/kWh untuk listrik PLN, 0,05 kg CO\u2082/kWh untuk tenaga surya). Faktor emisi aktual dapat bervariasi berdasarkan lokasi, kondisi grid lokal, dan tahun data.",
        ],
      },
      {
        title: "3. Gamifikasi dan Benchmark Industri",
        content: [
          "Sistem gamifikasi Subak Hijau, termasuk peringkat industri (5 tingkatan per jenis industri), lencana pencapaian, dan streak mingguan, dirancang sebagai motivasi dan bersifat ilustratif. Peringkat tidak mencerminkan sertifikasi resmi atau akreditasi dari lembaga manapun.",
          "Benchmark industri dan persentil (misalnya \u2018Di atas X% perusahaan Y\u2019) didasarkan pada data simulasi statis, bukan survei real-time terhadap UMKM Indonesia. Angka-angka ini bersifat indikatif dan tidak boleh dijadikan dasar untuk klaim pemasaran atau pelaporan resmi.",
          "Bobot penilaian per kategori (energi, limbah, rantai pasok, operasional, kebijakan) berbeda untuk setiap jenis industri dan ditentukan oleh model internal Subak Hijau. Bobot ini dapat berubah seiring pembaruan platform.",
        ],
      },
      {
        title: "4. Sertifikat dan Konten Publik",
        content: [
          "Sertifikat sustainability yang diterbitkan oleh Subak Hijau adalah bukti partisipasi dalam assessment platform ini, bukan sertifikasi resmi dari badan akreditasi atau lembaga pemerintah.",
          "Informasi pada halaman verifikasi publik mencerminkan hasil assessment pada saat tertentu dan tidak diperbarui secara otomatis jika pengguna melakukan assessment ulang.",
        ],
      },
      {
        title: "5. Informasi Regulasi",
        content: [
          "Referensi terhadap regulasi Indonesia (UU PDP, POJK, Perpres, dll.) bersifat informatif dan mungkin tidak mencakup perubahan terbaru.",
          "Subak Hijau bukan penasihat hukum. Untuk kepatuhan regulasi, konsultasikan dengan penasihat hukum yang berkompeten.",
          "Kami berusaha memperbarui informasi regulasi secara berkala, namun tidak menjamin kelengkapan atau kebaruan informasi.",
        ],
      },
      {
        title: "6. Ketersediaan Layanan",
        content: [
          "Subak Hijau adalah proyek kompetisi (PROXOCORIS 2026) dan ketersediaan jangka panjang tidak dijamin.",
          "Kami berhak mengubah, menangguhkan, atau menghentikan layanan tanpa pemberitahuan sebelumnya.",
          "Kami tidak bertanggung jawab atas gangguan layanan, kehilangan data, atau ketidaktersediaan platform.",
        ],
      },
      {
        title: "7. Tautan Pihak Ketiga",
        content: [
          "Platform ini mungkin mengandung tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs pihak ketiga.",
          "Penggunaan layanan pihak ketiga tunduk pada syarat dan ketentuan masing-masing: Supabase (database dan autentikasi), Anthropic dan OpenAI (penyedia model AI), Google Analytics (analitik penggunaan), dan Vercel (hosting platform).",
        ],
      },
    ],
  },
}

const en: LegalDictionary = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "Last updated: March 11, 2026",
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
          "You must not manipulate the gamification system, including industry ranks, achievement badges, weekly streaks, or sustainability scores through improper means. Abuse may result in account suspension or deletion.",
        ],
      },
      {
        title: "3. User Rights and Obligations",
        content: [
          "You have the right to access available Subak Hijau features, including AI assessment, sustainability score, action roadmap, AI chat consultant, carbon footprint calculator, gamification system (industry ranks, badges, and weekly streaks), verifiable sustainability certificate, and printable report.",
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
        title: "5. Shareable Content and Certificates",
        content: [
          "Subak Hijau provides achievement card features in Instagram Story format (1080\u00d71920 pixels) that can be downloaded and shared on social media. By sharing this content, you consent to the public use of your business name and sustainability score.",
          "Sustainability certificates generated by the platform can be verified through a public page using a unique token or QR code. Information displayed on the verification page includes business name, total score, category scores, industry rank, and assessment date.",
          "Subak Hijau is not responsible for user-shared content used outside the platform, including on social media or marketing materials.",
        ],
      },
      {
        title: "6. Limitation of Liability",
        content: [
          "Services are provided 'as-is' without any warranties, express or implied.",
          "Subak Hijau is not liable for any direct, indirect, incidental, or consequential damages arising from the use of services.",
          "Our maximum liability is limited to the amount you have paid for services (for free services, this is zero).",
        ],
      },
      {
        title: "7. Governing Law",
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
    lastUpdated: "Last updated: March 11, 2026",
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
          "Gamification data: industry rank, achievement badges, weekly streaks, and category scores (energy, waste, supply chain, operations, policy).",
          "Analytics data: if you consent to analytics cookies, Google Analytics collects anonymized data about site usage patterns, including pages visited, visit duration, traffic sources, general location (country/city), and device type. This data does not directly contain personally identifiable information.",
        ],
      },
      {
        title: "2. Purpose of Data Collection",
        content: [
          "To provide personalized sustainability assessment and consultation services.",
          "To generate relevant sustainability scores, action roadmaps, and AI recommendations.",
          "To improve service quality and user experience.",
          "To comply with applicable legal and regulatory obligations.",
          "To analyze aggregate platform usage patterns through Google Analytics (if you consent to analytics cookies) to improve features and user experience.",
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
          "To exercise these rights, contact us at hello@subakhijau.app or through the Contact page.",
          "We will respond to your request within 3x24 hours as required by the PDP Law.",
        ],
      },
      {
        title: "5. Cookies and Tracking",
        content: [
          "Subak Hijau uses functional cookies to store display preferences (language and theme), as well as analytics cookies from Google Analytics to understand platform usage patterns.",
          "You can manage cookie consent granularly through the consent banner when first visiting the site. Analytics cookies are only activated if you explicitly consent.",
          "Full information about the cookies we use is available on the Cookie Policy page.",
        ],
      },
      {
        title: "6. Data Sharing with Third Parties",
        content: [
          "Supabase (database and authentication): Profile data, assessments, scores, roadmaps, and conversation history are stored on Supabase servers. Supabase's privacy policy applies to this data storage.",
          "AI providers (Anthropic/OpenAI via AI Gateway): Your assessment data and business context are sent to AI models to generate scores, roadmaps, and chat responses. Data is processed according to each provider's privacy policy.",
          "Google Analytics: Anonymized usage data is sent to Google for platform usage analysis, only if you consent to analytics cookies. Google processes this data in accordance with Google's Privacy Policy.",
          "Vercel (hosting): The platform is hosted on Vercel. Access logs and technical data (IP address, user agent) are processed by Vercel in accordance with its privacy policy.",
          "We do not sell your personal data to any third party.",
        ],
      },
      {
        title: "7. Policy Changes",
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
    lastUpdated: "Last updated: March 11, 2026",
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
          "subakhijau-cookie-consent: Stores your cookie consent preferences. Type: local storage. Duration: permanent until manually cleared.",
          "sb-*: Supabase authentication cookies for login session management. Type: cookie. Duration: session.",
          "_ga: Google Analytics cookie to distinguish unique users. Type: cookie. Duration: 2 years. Only active if you consent to analytics cookies.",
          "_ga_<ID>: Google Analytics cookie to maintain session state. Type: cookie. Duration: 2 years. Only active if you consent to analytics cookies.",
          "_gid: Google Analytics cookie to distinguish unique users within 24 hours. Type: cookie. Duration: 24 hours. Only active if you consent to analytics cookies.",
        ],
      },
      {
        title: "3. Types of Cookies",
        content: [
          "Essential Cookies: Authentication cookies (sb-*) are required for login and dashboard functionality. Cannot be disabled.",
          "Functional Cookies: Language, theme, and sidebar preferences enhance user experience. Can be cleared through browser settings.",
          "Analytics Cookies: We use Google Analytics (_ga, _ga_<ID>, _gid) to understand platform usage patterns anonymously. These cookies are only activated if you explicitly consent via the consent banner. We do not use advertising or tracking cookies for advertising purposes.",
        ],
      },
      {
        title: "4. Cookie Consent",
        content: [
          "When first visiting Subak Hijau, you will see a cookie consent banner that allows you to choose which cookie categories to permit.",
          "Essential Cookies: Always active. Required for authentication, session security, and basic platform functionality. Includes Supabase cookies (sb-*).",
          "Functional Cookies: Can be enabled or disabled. Stores language, display theme, and sidebar state preferences. If declined, preferences will not persist between visits.",
          "Analytics Cookies: Can be enabled or disabled (default: off). Enables Google Analytics for anonymous usage analysis. Does not collect personally identifiable information.",
          "You can change your cookie preferences at any time through the Settings page in the dashboard.",
        ],
      },
      {
        title: "5. Managing Cookies",
        content: [
          "Use the cookie consent banner to select which cookie categories you permit when first visiting the site.",
          "You can change your cookie preferences at any time through the Settings page in the dashboard, including enabling or disabling functional and analytics cookies separately.",
          "Declining functional cookies means language, theme, and assessment draft preferences will not persist between visits.",
          "Disabling essential cookies through your browser may affect login and dashboard functionality.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "Last updated: March 11, 2026",
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
          "The carbon footprint calculator uses average Indonesian emission factors (e.g., 0.78 kg CO\u2082/kWh for PLN electricity, 0.05 kg CO\u2082/kWh for solar power). Actual emission factors may vary based on location, local grid conditions, and data year.",
        ],
      },
      {
        title: "3. Gamification and Industry Benchmarks",
        content: [
          "Subak Hijau's gamification system, including industry ranks (5 tiers per industry type), achievement badges, and weekly streaks, is designed as motivation and is illustrative in nature. Ranks do not reflect official certifications or accreditation from any institution.",
          "Industry benchmarks and percentiles (e.g., \u2018Above X% of Y businesses\u2019) are based on static simulated data, not real-time surveys of Indonesian MSMEs. These figures are indicative and should not be used as a basis for marketing claims or official reporting.",
          "Scoring weights per category (energy, waste, supply chain, operations, policy) differ by industry type and are determined by Subak Hijau's internal model. These weights may change as the platform is updated.",
        ],
      },
      {
        title: "4. Certificates and Public Content",
        content: [
          "Sustainability certificates issued by Subak Hijau serve as proof of participation in this platform's assessment, not an official certification from any accreditation body or government institution.",
          "Information on the public verification page reflects assessment results at a specific point in time and is not automatically updated if the user retakes the assessment.",
        ],
      },
      {
        title: "5. Regulatory Information",
        content: [
          "References to Indonesian regulations (UU PDP, POJK, Presidential Regulations, etc.) are informational and may not reflect the latest amendments.",
          "Subak Hijau is not a legal advisor. For regulatory compliance, consult with qualified legal counsel.",
          "We strive to update regulatory information periodically, but do not guarantee completeness or currency of information.",
        ],
      },
      {
        title: "6. Service Availability",
        content: [
          "Subak Hijau is a competition project (PROXOCORIS 2026) and long-term availability is not guaranteed.",
          "We reserve the right to modify, suspend, or discontinue the service without prior notice.",
          "We are not responsible for service interruptions, data loss, or platform unavailability.",
        ],
      },
      {
        title: "7. Third-Party Links",
        content: [
          "This platform may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of third-party sites.",
          "Use of third-party services is subject to the terms and conditions of each respective service: Supabase (database and authentication), Anthropic and OpenAI (AI model providers), Google Analytics (usage analytics), and Vercel (platform hosting).",
        ],
      },
    ],
  },
}

export const legalContent: Record<Locale, LegalDictionary> = { id, en }
