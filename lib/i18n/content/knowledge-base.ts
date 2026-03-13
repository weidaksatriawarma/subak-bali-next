import type { Locale } from "../dictionaries"

interface RegulationGuide {
  title: string
  number: string
  summary: string
  keyRequirements: string[]
  deadline?: string
  relevantIndustries: string[]
}

interface SustainabilityTip {
  industry: string
  tips: { title: string; description: string }[]
}

interface GlossaryItem {
  term: string
  definition: string
}

interface MethodologyItem {
  question: string
  answer: string
}

interface MethodologySection {
  title: string
  description: string
  items: MethodologyItem[]
}

interface KnowledgeBase {
  sectionTitles: {
    regulations: string
    tips: string
    glossary: string
    methodology: string
  }
  regulations: RegulationGuide[]
  tips: SustainabilityTip[]
  glossary: GlossaryItem[]
  methodology: MethodologySection[]
}

const id: KnowledgeBase = {
  sectionTitles: {
    regulations: "Panduan Regulasi",
    tips: "Tips Sustainability",
    glossary: "Glosarium",
    methodology: "Metodologi Perhitungan",
  },
  regulations: [
    {
      title: "Keuangan Berkelanjutan",
      number: "POJK 51/2017",
      summary:
        "Peraturan OJK tentang penerapan keuangan berkelanjutan bagi lembaga jasa keuangan, emiten, dan perusahaan publik. Mewajibkan pelaporan sustainability dan integrasi ESG ke dalam proses bisnis.",
      keyRequirements: [
        "Menyusun dan mempublikasikan laporan sustainability tahunan",
        "Melakukan penilaian risiko ESG secara berkala",
        "Menyiapkan rencana aksi keuangan berkelanjutan",
        "Melakukan pelibatan pemangku kepentingan (stakeholder engagement)",
      ],
      deadline: "Berlaku sejak 2017, pelaporan wajib tahunan",
      relevantIndustries: [
        "fnb",
        "retail",
        "manufacturing",
        "services",
        "agriculture",
      ],
    },
    {
      title: "Taksonomi Keuangan Berkelanjutan Indonesia",
      number: "TKBI",
      summary:
        "Kerangka klasifikasi untuk mengidentifikasi dan mengkategorikan aktivitas ekonomi yang mendukung pembangunan berkelanjutan. Membantu pelaku usaha memahami apakah kegiatan bisnisnya tergolong hijau atau transisi.",
      keyRequirements: [
        "Mengklasifikasikan aktivitas bisnis sebagai hijau, kuning (transisi), atau merah",
        "Melaporkan keselarasan aktivitas bisnis dengan taksonomi",
      ],
      relevantIndustries: ["manufacturing", "services"],
    },
    {
      title: "Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup",
      number: "PP 22/2021",
      summary:
        "Peraturan pemerintah yang mengatur perlindungan dan pengelolaan lingkungan hidup, termasuk kewajiban analisis dampak lingkungan, pengelolaan limbah, dan pelaporan emisi bagi pelaku usaha.",
      keyRequirements: [
        "Menyusun analisis mengenai dampak lingkungan (AMDAL) atau UKL-UPL",
        "Menerapkan sistem pengelolaan limbah sesuai standar",
        "Melaporkan emisi gas rumah kaca secara berkala",
      ],
      relevantIndustries: ["manufacturing", "fnb", "agriculture"],
    },
    {
      title: "Standar Pengungkapan Sustainability",
      number: "IFRS S1/S2",
      summary:
        "Standar global dari ISSB untuk pengungkapan informasi terkait sustainability dan iklim dalam laporan keuangan. Indonesia sedang mengadopsi standar ini secara bertahap untuk meningkatkan transparansi dan daya banding.",
      keyRequirements: [
        "Menyusun pengungkapan keuangan terkait iklim (climate-related financial disclosures)",
        "Melakukan penilaian risiko dan peluang terkait sustainability",
        "Melaporkan metrik dan target sustainability secara kuantitatif",
      ],
      deadline: "Adopsi bertahap mulai 2025-2028",
      relevantIndustries: [
        "fnb",
        "retail",
        "manufacturing",
        "services",
        "agriculture",
      ],
    },
  ],
  tips: [
    {
      industry: "fnb",
      tips: [
        {
          title: "Kurangi Limbah Makanan",
          description:
            "Terapkan sistem inventaris FIFO (First In, First Out) dan donasikan sisa makanan layak konsumsi ke food bank atau komunitas lokal.",
        },
        {
          title: "Dapur Hemat Energi",
          description:
            "Gunakan peralatan masak berstandar Energy Star, matikan peralatan saat tidak digunakan, dan rawat mesin pendingin secara rutin.",
        },
        {
          title: "Bahan Baku Lokal",
          description:
            "Prioritaskan pembelian bahan baku dari pemasok lokal untuk mengurangi emisi transportasi dan mendukung ekonomi daerah.",
        },
        {
          title: "Komposting",
          description:
            "Olah sisa makanan menjadi kompos untuk mengurangi limbah organik ke TPA dan menghasilkan pupuk gratis untuk tanaman.",
        },
        {
          title: "Kemasan Ramah Lingkungan",
          description:
            "Beralih ke kemasan biodegradable atau yang dapat didaur ulang, dan berikan insentif bagi pelanggan yang membawa wadah sendiri.",
        },
      ],
    },
    {
      industry: "retail",
      tips: [
        {
          title: "Kemasan Berkelanjutan",
          description:
            "Gunakan kemasan daur ulang atau biodegradable, kurangi penggunaan plastik sekali pakai, dan tawarkan opsi tanpa kemasan.",
        },
        {
          title: "Rantai Pasok Hijau",
          description:
            "Pilih pemasok yang memiliki sertifikasi sustainability dan audit praktik lingkungan mereka secara berkala.",
        },
        {
          title: "Manajemen Energi Toko",
          description:
            "Pasang sensor gerak untuk pencahayaan, gunakan AC inverter, dan atur suhu optimal untuk menghemat energi.",
        },
        {
          title: "Struk Digital",
          description:
            "Tawarkan struk digital melalui email atau WhatsApp untuk mengurangi penggunaan kertas termal yang sulit didaur ulang.",
        },
        {
          title: "Desain Toko Eco-Friendly",
          description:
            "Maksimalkan pencahayaan alami, gunakan material daur ulang untuk interior, dan sediakan tempat sampah terpilah.",
        },
      ],
    },
    {
      industry: "manufacturing",
      tips: [
        {
          title: "Kurangi Emisi Produksi",
          description:
            "Lakukan audit energi rutin, optimalkan proses produksi, dan pertimbangkan transisi ke bahan bakar bersih.",
        },
        {
          title: "Minimalisasi Limbah",
          description:
            "Terapkan prinsip lean manufacturing untuk mengurangi limbah produksi dan implementasikan program daur ulang internal.",
        },
        {
          title: "Produksi Bersih",
          description:
            "Adopsi teknologi produksi bersih yang mengurangi penggunaan bahan kimia berbahaya dan emisi polutan.",
        },
        {
          title: "Daur Ulang Air",
          description:
            "Pasang sistem pengolahan air limbah untuk mendaur ulang air proses produksi dan mengurangi konsumsi air bersih.",
        },
        {
          title: "Energi Terbarukan",
          description:
            "Pasang panel surya di atap pabrik atau beli sertifikat energi terbarukan (REC) untuk mengurangi jejak karbon.",
        },
      ],
    },
    {
      industry: "services",
      tips: [
        {
          title: "Operasi Tanpa Kertas",
          description:
            "Digitalisasi dokumen, gunakan tanda tangan elektronik, dan simpan arsip di cloud untuk mengurangi penggunaan kertas.",
        },
        {
          title: "Kerja Jarak Jauh",
          description:
            "Terapkan kebijakan hybrid working untuk mengurangi emisi komuter karyawan dan konsumsi energi kantor.",
        },
        {
          title: "Green IT",
          description:
            "Gunakan perangkat hemat energi, aktifkan mode sleep otomatis, dan pilih penyedia cloud yang berkomitmen pada energi terbarukan.",
        },
        {
          title: "Audit Energi",
          description:
            "Lakukan audit energi kantor secara berkala untuk mengidentifikasi pemborosan dan peluang penghematan.",
        },
        {
          title: "Pengadaan Berkelanjutan",
          description:
            "Prioritaskan pembelian produk dan jasa dari vendor yang memiliki komitmen sustainability dan sertifikasi lingkungan.",
        },
      ],
    },
    {
      industry: "agriculture",
      tips: [
        {
          title: "Pertanian Organik",
          description:
            "Kurangi penggunaan pestisida dan pupuk sintetis, beralih ke metode organik untuk menjaga kesehatan tanah dan ekosistem.",
        },
        {
          title: "Konservasi Air",
          description:
            "Gunakan sistem irigasi tetes atau sprinkler efisien, dan tampung air hujan untuk mengurangi konsumsi air tanah.",
        },
        {
          title: "Kesehatan Tanah",
          description:
            "Tambahkan kompos dan bahan organik secara rutin, hindari pengolahan tanah berlebihan untuk menjaga struktur dan mikroba tanah.",
        },
        {
          title: "Rotasi Tanaman",
          description:
            "Terapkan rotasi tanaman untuk mencegah penipisan nutrisi tanah, mengurangi hama, dan meningkatkan kesuburan alami.",
        },
        {
          title: "Pengendalian Hama Terpadu",
          description:
            "Gunakan metode pengendalian hama terpadu (IPM) yang mengombinasikan teknik biologis, mekanis, dan minimal kimia.",
        },
      ],
    },
    {
      industry: "general",
      tips: [
        {
          title: "Pencahayaan LED",
          description:
            "Ganti semua lampu konvensional dengan LED hemat energi yang bisa menghemat hingga 80% konsumsi listrik pencahayaan.",
        },
        {
          title: "Pemilahan Sampah",
          description:
            "Sediakan tempat sampah terpilah (organik, anorganik, B3) dan edukasi karyawan tentang cara memilah yang benar.",
        },
        {
          title: "Pelatihan Karyawan",
          description:
            "Adakan pelatihan sustainability rutin agar seluruh tim memahami pentingnya dan cara berkontribusi dalam praktik ramah lingkungan.",
        },
        {
          title: "Pelacakan Jejak Karbon",
          description:
            "Gunakan tools seperti Subak Hijau untuk mengukur dan memantau jejak karbon bisnis secara berkala sebagai dasar perbaikan.",
        },
        {
          title: "Keterlibatan Komunitas",
          description:
            "Berpartisipasi dalam program lingkungan lokal seperti penanaman pohon, bersih-bersih pantai, atau bank sampah komunitas.",
        },
      ],
    },
  ],
  glossary: [
    {
      term: "Jejak Karbon (Carbon Footprint)",
      definition:
        "Total emisi gas rumah kaca yang dihasilkan langsung dan tidak langsung oleh individu, organisasi, atau produk, diukur dalam satuan ton CO\u2082 ekuivalen.",
    },
    {
      term: "POJK",
      definition:
        "Peraturan Otoritas Jasa Keuangan \u2014 regulasi yang dikeluarkan OJK untuk mengatur lembaga jasa keuangan di Indonesia, termasuk ketentuan keuangan berkelanjutan.",
    },
    {
      term: "TKBI",
      definition:
        "Taksonomi Keuangan Berkelanjutan Indonesia \u2014 kerangka klasifikasi untuk mengidentifikasi aktivitas ekonomi yang mendukung pembangunan berkelanjutan.",
    },
    {
      term: "SDG (Sustainable Development Goals)",
      definition:
        "17 Tujuan Pembangunan Berkelanjutan yang ditetapkan PBB sebagai agenda global 2030 untuk mengatasi kemiskinan, ketimpangan, dan perubahan iklim.",
    },
    {
      term: "ESG",
      definition:
        "Environmental, Social, and Governance \u2014 tiga faktor utama yang digunakan untuk menilai kinerja sustainability dan tanggung jawab sosial suatu organisasi.",
    },
    {
      term: "Net Zero",
      definition:
        "Kondisi di mana total emisi gas rumah kaca yang diproduksi sama dengan jumlah yang dihilangkan dari atmosfer, sehingga emisi bersih menjadi nol.",
    },
    {
      term: "Scope 1",
      definition:
        "Emisi langsung dari sumber yang dimiliki atau dikendalikan organisasi, seperti pembakaran bahan bakar di kendaraan atau mesin milik sendiri.",
    },
    {
      term: "Scope 2",
      definition:
        "Emisi tidak langsung dari konsumsi listrik, uap, panas, atau pendingin yang dibeli dari pihak ketiga.",
    },
    {
      term: "Scope 3",
      definition:
        "Emisi tidak langsung lainnya yang terjadi di seluruh rantai nilai organisasi, termasuk aktivitas pemasok dan penggunaan produk oleh konsumen.",
    },
    {
      term: "Ekonomi Sirkular (Circular Economy)",
      definition:
        "Model ekonomi yang bertujuan menghilangkan limbah dan polusi dengan menjaga produk dan material tetap dalam siklus penggunaan selama mungkin melalui daur ulang, perbaikan, dan penggunaan ulang.",
    },
    {
      term: "Green Financing",
      definition:
        "Instrumen keuangan yang dirancang khusus untuk mendanai proyek atau kegiatan yang memberikan manfaat lingkungan, seperti obligasi hijau dan kredit hijau.",
    },
    {
      term: "LCA (Life Cycle Assessment)",
      definition:
        "Metode analisis yang mengevaluasi dampak lingkungan suatu produk atau layanan sepanjang seluruh siklus hidupnya, dari ekstraksi bahan baku hingga pembuangan akhir.",
    },
    {
      term: "Kredit Karbon (Carbon Credit)",
      definition:
        "Sertifikat yang mewakili pengurangan satu ton CO\u2082 ekuivalen dari atmosfer, yang dapat diperdagangkan di pasar karbon.",
    },
    {
      term: "Greenwashing",
      definition:
        "Praktik memberikan kesan menyesatkan bahwa produk, layanan, atau organisasi lebih ramah lingkungan dari kenyataannya, melalui klaim sustainability yang tidak didukung bukti.",
    },
  ],
  methodology: [
    {
      title: "Jejak Karbon",
      description:
        "Bagaimana estimasi emisi CO\u2082 dihitung dari data listrik, limbah, dan transportasi bisnis Anda.",
      items: [
        {
          question: "Bagaimana emisi CO\u2082 dari listrik dihitung?",
          answer:
            "Emisi energi = kWh/bulan \u00d7 faktor emisi \u00d7 12 bulan. Faktor emisi PLN: 0,78 kg CO\u2082/kWh, PLN+Solar: 0,39, Solar: 0,05, Genset Diesel: 0,84. Contoh: 500 kWh/bulan dengan PLN = 500 \u00d7 0,78 \u00d7 12 = 4.680 kg CO\u2082/tahun.",
        },
        {
          question: "Bagaimana emisi dari limbah dihitung?",
          answer:
            "Emisi limbah = kg limbah/bulan \u00d7 faktor emisi \u00d7 12. Faktor: tanpa pengelolaan (0,50), pemilahan (0,35), daur ulang (0,10), komposting (0,10), sirkular (0,05). Contoh: 100 kg/bulan tanpa pengelolaan = 100 \u00d7 0,50 \u00d7 12 = 600 kg CO\u2082/tahun.",
        },
        {
          question: "Apa itu 'ekuivalen pohon'?",
          answer:
            "Total CO\u2082 dibagi 22 kg (rata-rata penyerapan CO\u2082 satu pohon dewasa per tahun). Jika total emisi 7.680 kg, itu setara dengan \u00b1349 pohon yang dibutuhkan untuk menyerap emisi tersebut.",
        },
      ],
    },
    {
      title: "Estimasi Penghematan",
      description:
        "Bagaimana potensi penghematan biaya bulanan dihitung berdasarkan ukuran bisnis.",
      items: [
        {
          question: "Bagaimana estimasi penghematan dihitung?",
          answer:
            "Penghematan per kategori = (batas bawah + batas atas) / 2. Contoh untuk UMKM mikro: Energi Rp 300rb, Limbah Rp 125rb, Rantai Pasok Rp 75rb, Operasional Rp 65rb = total \u00b1Rp 565rb/bulan.",
        },
        {
          question: "Berapa kisaran penghematan per ukuran bisnis?",
          answer:
            "Mikro: Rp 400rb\u2013730rb/bulan. Kecil: Rp 630rb\u20131,07jt/bulan. Menengah: Rp 1,07jt\u20131,45jt/bulan. Besar: Rp 1,45jt\u20132,3jt/bulan. Penghematan ini adalah estimasi potensial dari implementasi praktik berkelanjutan.",
        },
      ],
    },
    {
      title: "Kepatuhan Regulasi",
      description:
        "Bagaimana persentase kepatuhan terhadap POJK 51/2017 & TKBI dihitung.",
      items: [
        {
          question: "Apa saja 8 item kepatuhan dan bobotnya?",
          answer:
            "Kebijakan sustainability (20%), Pengelolaan limbah/recycling+ (15%), Peralatan hemat energi (15%), Evaluasi supplier (10%), Pelatihan karyawan (10%), Keterlibatan komunitas (10%), Operasi digital (10%), Konservasi air (10%). Total: 100%.",
        },
        {
          question: "Bagaimana persentase kepatuhan dihitung?",
          answer:
            "Setiap item bernilai biner (terpenuhi atau tidak). Persentase kepatuhan = jumlah bobot item yang terpenuhi. Contoh: jika memiliki kebijakan sustainability (20%) dan peralatan hemat energi (15%), kepatuhan = 35%.",
        },
      ],
    },
    {
      title: "Skor Sustainability",
      description:
        "Bagaimana skor 0\u2013100 dihitung per kategori dan cara Quick Assessment bekerja.",
      items: [
        {
          question: "Bagaimana skor per kategori dihitung?",
          answer:
            "Setiap kategori (energi, limbah, rantai pasok, operasional, kebijakan) memiliki 3\u20134 faktor penilaian. Poin dijumlahkan, maksimal 100 per kategori. Skor total = rata-rata dari 5 kategori.",
        },
        {
          question: "Bagaimana Quick Assessment bekerja?",
          answer:
            "5 pertanyaan cepat tentang energi, limbah, kemasan, transportasi, dan kebijakan. Setiap jawaban dinilai 10\u2013100. Skor akhir = rata-rata \u00b1 10 poin (range ketidakpastian karena penilaian singkat).",
        },
        {
          question: "Apa perbedaan Quick Assessment dan Full Assessment?",
          answer:
            "Quick Assessment hanya 5 pertanyaan untuk gambaran umum (akurasi \u00b110 poin). Full Assessment mencakup 15+ pertanyaan detail untuk skor akurat per kategori, roadmap aksi, dan sertifikat.",
        },
      ],
    },
    {
      title: "Bobot Industri & Benchmark",
      description:
        "Mengapa industri berbeda memiliki bobot penilaian berbeda, dan apa arti persentil.",
      items: [
        {
          question: "Mengapa bobot berbeda per industri?",
          answer:
            "Setiap industri memiliki tantangan sustainability yang berbeda. Contoh: F&B menekankan limbah (30%) karena food waste, Manufaktur menekankan energi (30%) karena proses produksi intensif energi, Jasa menekankan operasional (35%) karena berbasis kantor/digital.",
        },
        {
          question: "Apa arti 'Di atas X% perusahaan'?",
          answer:
            "Ini adalah persentil yang menunjukkan posisi Anda dibanding bisnis sejenis. 'Di atas 70%' berarti skor Anda lebih baik dari 70% bisnis di industri yang sama. Benchmark menggunakan distribusi simulasi yang mencerminkan tingkat kematangan sustainability UMKM Indonesia.",
        },
        {
          question: "Bagaimana rank industri ditentukan?",
          answer:
            "5 tier berdasarkan skor: 0\u201319 (Tier 1/Pemula), 20\u201339 (Tier 2), 40\u201359 (Tier 3), 60\u201379 (Tier 4), 80\u2013100 (Tier 5/Master). Setiap industri memiliki nama rank unik, misal F&B: Beginner Kitchen \u2192 Sustainability Chef.",
        },
      ],
    },
    {
      title: "Sertifikat & Pencapaian",
      description:
        "Bagaimana tier sertifikat ditentukan dan cara membuka achievement badges.",
      items: [
        {
          question: "Apa saja tier sertifikat?",
          answer:
            "BRONZE (skor 0\u201329), SILVER (30\u201359), GOLD (60\u201379), EMERALD (80\u2013100). Sertifikat dilengkapi QR code untuk verifikasi publik di /verify/[token].",
        },
        {
          question: "Bagaimana cara membuka achievement badges?",
          answer:
            "Badges umum: selesaikan 1, 5, 50%, 80%, atau 100% roadmap items. Badges kategori: selesaikan semua item dalam satu kategori. Badges industri: capai skor tertentu di kategori spesifik (misal F&B: Zero Food Waste = skor limbah \u226580).",
        },
        {
          question: "Bagaimana sistem streak bekerja?",
          answer:
            "Streak dihitung berdasarkan minggu ISO berturut-turut dengan minimal 1 item roadmap diselesaikan. Streak terputus jika minggu ini tidak ada penyelesaian. Celebrasi muncul di milestone minggu ke-4, 8, dan 12.",
        },
      ],
    },
  ],
}

const en: KnowledgeBase = {
  sectionTitles: {
    regulations: "Regulation Guide",
    tips: "Sustainability Tips",
    glossary: "Glossary",
    methodology: "Calculation Methodology",
  },
  regulations: [
    {
      title: "Sustainable Finance",
      number: "POJK 51/2017",
      summary:
        "OJK regulation on the implementation of sustainable finance for financial service institutions, issuers, and public companies. Requires sustainability reporting and ESG integration into business processes.",
      keyRequirements: [
        "Prepare and publish annual sustainability reports",
        "Conduct regular ESG risk assessments",
        "Develop a sustainable finance action plan",
        "Conduct stakeholder engagement activities",
      ],
      deadline: "Effective since 2017, annual reporting mandatory",
      relevantIndustries: [
        "fnb",
        "retail",
        "manufacturing",
        "services",
        "agriculture",
      ],
    },
    {
      title: "Indonesian Sustainable Finance Taxonomy",
      number: "TKBI",
      summary:
        "A classification framework to identify and categorize economic activities that support sustainable development. Helps businesses understand whether their activities are classified as green or transitional.",
      keyRequirements: [
        "Classify business activities as green, yellow (transitional), or red",
        "Report alignment of business activities with the taxonomy",
      ],
      relevantIndustries: ["manufacturing", "services"],
    },
    {
      title: "Environmental Protection and Management",
      number: "PP 22/2021",
      summary:
        "Government regulation governing environmental protection and management, including requirements for environmental impact assessment, waste management, and emission reporting for businesses.",
      keyRequirements: [
        "Prepare environmental impact assessment (AMDAL) or UKL-UPL",
        "Implement waste management systems according to standards",
        "Report greenhouse gas emissions periodically",
      ],
      relevantIndustries: ["manufacturing", "fnb", "agriculture"],
    },
    {
      title: "Sustainability Disclosure Standards",
      number: "IFRS S1/S2",
      summary:
        "Global standards from ISSB for disclosing sustainability and climate-related information in financial reports. Indonesia is gradually adopting these standards to improve transparency and comparability.",
      keyRequirements: [
        "Prepare climate-related financial disclosures",
        "Conduct sustainability-related risk and opportunity assessments",
        "Report quantitative sustainability metrics and targets",
      ],
      deadline: "Phased adoption from 2025-2028",
      relevantIndustries: [
        "fnb",
        "retail",
        "manufacturing",
        "services",
        "agriculture",
      ],
    },
  ],
  tips: [
    {
      industry: "fnb",
      tips: [
        {
          title: "Reduce Food Waste",
          description:
            "Implement a FIFO (First In, First Out) inventory system and donate edible food surplus to food banks or local communities.",
        },
        {
          title: "Energy-Efficient Kitchen",
          description:
            "Use Energy Star-rated cooking equipment, turn off appliances when not in use, and maintain refrigeration units regularly.",
        },
        {
          title: "Local Sourcing",
          description:
            "Prioritize purchasing ingredients from local suppliers to reduce transportation emissions and support the local economy.",
        },
        {
          title: "Composting",
          description:
            "Process food waste into compost to reduce organic waste going to landfills and produce free fertilizer for plants.",
        },
        {
          title: "Green Packaging",
          description:
            "Switch to biodegradable or recyclable packaging and offer incentives for customers who bring their own containers.",
        },
      ],
    },
    {
      industry: "retail",
      tips: [
        {
          title: "Sustainable Packaging",
          description:
            "Use recycled or biodegradable packaging, reduce single-use plastics, and offer packaging-free options.",
        },
        {
          title: "Green Supply Chain",
          description:
            "Choose suppliers with sustainability certifications and regularly audit their environmental practices.",
        },
        {
          title: "Store Energy Management",
          description:
            "Install motion sensors for lighting, use inverter air conditioning, and set optimal temperatures to save energy.",
        },
        {
          title: "Digital Receipts",
          description:
            "Offer digital receipts via email or WhatsApp to reduce use of thermal paper that is difficult to recycle.",
        },
        {
          title: "Eco-Friendly Store Design",
          description:
            "Maximize natural lighting, use recycled materials for interiors, and provide sorted waste bins.",
        },
      ],
    },
    {
      industry: "manufacturing",
      tips: [
        {
          title: "Reduce Production Emissions",
          description:
            "Conduct regular energy audits, optimize production processes, and consider transitioning to cleaner fuels.",
        },
        {
          title: "Waste Minimization",
          description:
            "Apply lean manufacturing principles to reduce production waste and implement internal recycling programs.",
        },
        {
          title: "Clean Production",
          description:
            "Adopt clean production technologies that reduce the use of hazardous chemicals and pollutant emissions.",
        },
        {
          title: "Water Recycling",
          description:
            "Install wastewater treatment systems to recycle process water and reduce clean water consumption.",
        },
        {
          title: "Renewable Energy",
          description:
            "Install rooftop solar panels or purchase renewable energy certificates (RECs) to reduce your carbon footprint.",
        },
      ],
    },
    {
      industry: "services",
      tips: [
        {
          title: "Paperless Operations",
          description:
            "Digitize documents, use electronic signatures, and store archives in the cloud to reduce paper usage.",
        },
        {
          title: "Remote Work",
          description:
            "Implement hybrid working policies to reduce employee commuting emissions and office energy consumption.",
        },
        {
          title: "Green IT",
          description:
            "Use energy-efficient devices, enable automatic sleep mode, and choose cloud providers committed to renewable energy.",
        },
        {
          title: "Energy Audit",
          description:
            "Conduct regular office energy audits to identify waste and savings opportunities.",
        },
        {
          title: "Sustainable Procurement",
          description:
            "Prioritize purchasing products and services from vendors with sustainability commitments and environmental certifications.",
        },
      ],
    },
    {
      industry: "agriculture",
      tips: [
        {
          title: "Organic Farming",
          description:
            "Reduce the use of synthetic pesticides and fertilizers, switch to organic methods to maintain soil health and ecosystems.",
        },
        {
          title: "Water Conservation",
          description:
            "Use drip irrigation or efficient sprinkler systems, and collect rainwater to reduce groundwater consumption.",
        },
        {
          title: "Soil Health",
          description:
            "Regularly add compost and organic matter, avoid excessive tillage to maintain soil structure and microbial activity.",
        },
        {
          title: "Crop Rotation",
          description:
            "Implement crop rotation to prevent nutrient depletion, reduce pests, and improve natural soil fertility.",
        },
        {
          title: "Integrated Pest Management",
          description:
            "Use integrated pest management (IPM) methods that combine biological, mechanical, and minimal chemical techniques.",
        },
      ],
    },
    {
      industry: "general",
      tips: [
        {
          title: "LED Lighting",
          description:
            "Replace all conventional bulbs with energy-efficient LEDs that can save up to 80% of lighting electricity consumption.",
        },
        {
          title: "Waste Sorting",
          description:
            "Provide sorted waste bins (organic, inorganic, hazardous) and educate employees on proper sorting practices.",
        },
        {
          title: "Employee Training",
          description:
            "Conduct regular sustainability training so the entire team understands the importance of and how to contribute to eco-friendly practices.",
        },
        {
          title: "Carbon Footprint Tracking",
          description:
            "Use tools like Subak Hijau to measure and monitor your business carbon footprint regularly as a basis for improvement.",
        },
        {
          title: "Community Engagement",
          description:
            "Participate in local environmental programs such as tree planting, beach cleanups, or community waste banks.",
        },
      ],
    },
  ],
  glossary: [
    {
      term: "Carbon Footprint",
      definition:
        "The total greenhouse gas emissions produced directly and indirectly by an individual, organization, or product, measured in metric tons of CO\u2082 equivalent.",
    },
    {
      term: "POJK",
      definition:
        "Peraturan Otoritas Jasa Keuangan (Financial Services Authority Regulation) \u2014 regulations issued by Indonesia's OJK to govern financial service institutions, including sustainable finance provisions.",
    },
    {
      term: "TKBI",
      definition:
        "Taksonomi Keuangan Berkelanjutan Indonesia (Indonesian Sustainable Finance Taxonomy) \u2014 a classification framework to identify economic activities that support sustainable development.",
    },
    {
      term: "SDG (Sustainable Development Goals)",
      definition:
        "17 goals established by the United Nations as a global 2030 agenda to address poverty, inequality, and climate change.",
    },
    {
      term: "ESG",
      definition:
        "Environmental, Social, and Governance \u2014 three key factors used to assess the sustainability performance and social responsibility of an organization.",
    },
    {
      term: "Net Zero",
      definition:
        "A state where the total greenhouse gas emissions produced equal the amount removed from the atmosphere, resulting in zero net emissions.",
    },
    {
      term: "Scope 1",
      definition:
        "Direct emissions from sources owned or controlled by the organization, such as fuel combustion in company vehicles or machinery.",
    },
    {
      term: "Scope 2",
      definition:
        "Indirect emissions from purchased electricity, steam, heat, or cooling consumed by the organization.",
    },
    {
      term: "Scope 3",
      definition:
        "All other indirect emissions occurring across the organization's value chain, including supplier activities and consumer use of products.",
    },
    {
      term: "Circular Economy",
      definition:
        "An economic model that aims to eliminate waste and pollution by keeping products and materials in use for as long as possible through recycling, repair, and reuse.",
    },
    {
      term: "Green Financing",
      definition:
        "Financial instruments specifically designed to fund projects or activities that provide environmental benefits, such as green bonds and green credit.",
    },
    {
      term: "LCA (Life Cycle Assessment)",
      definition:
        "An analytical method that evaluates the environmental impact of a product or service throughout its entire lifecycle, from raw material extraction to final disposal.",
    },
    {
      term: "Carbon Credit",
      definition:
        "A certificate representing a reduction of one metric ton of CO\u2082 equivalent from the atmosphere, which can be traded on carbon markets.",
    },
    {
      term: "Greenwashing",
      definition:
        "The practice of giving a misleading impression that a product, service, or organization is more environmentally friendly than it actually is, through sustainability claims not supported by evidence.",
    },
  ],
  methodology: [
    {
      title: "Carbon Footprint",
      description:
        "How CO\u2082 emissions are estimated from your business electricity, waste, and transport data.",
      items: [
        {
          question: "How are electricity CO\u2082 emissions calculated?",
          answer:
            "Energy CO\u2082 = kWh/month \u00d7 emission factor \u00d7 12 months. PLN grid: 0.78 kg CO\u2082/kWh, PLN+Solar: 0.39, Solar only: 0.05, Diesel generator: 0.84. Example: 500 kWh/month on PLN = 500 \u00d7 0.78 \u00d7 12 = 4,680 kg CO\u2082/year.",
        },
        {
          question: "How are waste emissions calculated?",
          answer:
            "Waste CO\u2082 = kg waste/month \u00d7 emission factor \u00d7 12. Factors: no management (0.50), segregation (0.35), recycling (0.10), composting (0.10), circular (0.05). Example: 100 kg/month with no management = 100 \u00d7 0.50 \u00d7 12 = 600 kg CO\u2082/year.",
        },
        {
          question: "What is the 'tree equivalent'?",
          answer:
            "Total CO\u2082 divided by 22 kg (average CO\u2082 absorption of one mature tree per year). If total emissions are 7,680 kg, that's equivalent to \u00b1349 trees needed to offset those emissions.",
        },
      ],
    },
    {
      title: "Cost Savings",
      description:
        "How potential monthly cost savings are estimated based on business size.",
      items: [
        {
          question: "How are savings estimates calculated?",
          answer:
            "Savings per category = (lower bound + upper bound) / 2. Example for micro business: Energy Rp 300k, Waste Rp 125k, Supply Chain Rp 75k, Operations Rp 65k = total \u00b1Rp 565k/month.",
        },
        {
          question: "What are the savings ranges by business size?",
          answer:
            "Micro: Rp 400k\u2013730k/month. Small: Rp 630k\u20131.07M/month. Medium: Rp 1.07M\u20131.45M/month. Large: Rp 1.45M\u20132.3M/month. These are potential estimates from implementing sustainable practices.",
        },
      ],
    },
    {
      title: "Regulatory Compliance",
      description:
        "How the compliance percentage against POJK 51/2017 & TKBI is calculated.",
      items: [
        {
          question: "What are the 8 compliance items and their weights?",
          answer:
            "Sustainability policy (20%), Waste management/recycling+ (15%), Energy efficient equipment (15%), Supplier check (10%), Employee training (10%), Community engagement (10%), Digital operations (10%), Water conservation (10%). Total: 100%.",
        },
        {
          question: "How is the compliance percentage calculated?",
          answer:
            "Each item is binary (met or unmet). Compliance % = sum of weights for met items. Example: having a sustainability policy (20%) and energy efficient equipment (15%) = 35% compliance.",
        },
      ],
    },
    {
      title: "Sustainability Score",
      description:
        "How the 0\u2013100 score is calculated per category and how Quick Assessment works.",
      items: [
        {
          question: "How are category scores calculated?",
          answer:
            "Each category (energy, waste, supply chain, operations, policy) has 3\u20134 scoring factors. Points are summed, capped at 100 per category. Total score = average of all 5 categories.",
        },
        {
          question: "How does Quick Assessment work?",
          answer:
            "5 quick questions about energy, waste, packaging, transport, and policy. Each answer scores 10\u2013100. Final score = average \u00b1 10 points (uncertainty range due to simplified assessment).",
        },
        {
          question: "What's the difference between Quick and Full Assessment?",
          answer:
            "Quick Assessment is only 5 questions for a general overview (\u00b110 point accuracy). Full Assessment covers 15+ detailed questions for accurate per-category scores, action roadmap, and certification.",
        },
      ],
    },
    {
      title: "Industry Weights & Benchmarks",
      description:
        "Why different industries have different scoring weights, and what percentiles mean.",
      items: [
        {
          question: "Why do weights differ by industry?",
          answer:
            "Each industry faces different sustainability challenges. Example: F&B emphasizes waste (30%) due to food waste, Manufacturing emphasizes energy (30%) due to energy-intensive processes, Services emphasizes operations (35%) as they are office/digital-based.",
        },
        {
          question: "What does 'Above X% of businesses' mean?",
          answer:
            "This is a percentile showing your position vs. similar businesses. 'Above 70%' means your score is better than 70% of businesses in your industry. Benchmarks use simulated distributions reflecting Indonesian MSME sustainability maturity levels.",
        },
        {
          question: "How are industry ranks determined?",
          answer:
            "5 tiers based on score: 0\u201319 (Tier 1/Beginner), 20\u201339 (Tier 2), 40\u201359 (Tier 3), 60\u201379 (Tier 4), 80\u2013100 (Tier 5/Master). Each industry has unique rank names, e.g. F&B: Beginner Kitchen \u2192 Sustainability Chef.",
        },
      ],
    },
    {
      title: "Certificates & Achievements",
      description:
        "How certificate tiers are determined and how to unlock achievement badges.",
      items: [
        {
          question: "What are the certificate tiers?",
          answer:
            "BRONZE (score 0\u201329), SILVER (30\u201359), GOLD (60\u201379), EMERALD (80\u2013100). Certificates include a QR code for public verification at /verify/[token].",
        },
        {
          question: "How do I unlock achievement badges?",
          answer:
            "General badges: complete 1, 5, 50%, 80%, or 100% of roadmap items. Category badges: complete all items in a single category. Industry badges: reach specific scores in certain categories (e.g. F&B: Zero Food Waste = waste score \u226580).",
        },
        {
          question: "How does the streak system work?",
          answer:
            "Streaks count consecutive ISO weeks with at least 1 roadmap item completed. The streak breaks if the current week has no completion. Celebrations trigger at week 4, 8, and 12 milestones.",
        },
      ],
    },
  ],
}

export const knowledgeBase: Record<Locale, KnowledgeBase> = { id, en }
