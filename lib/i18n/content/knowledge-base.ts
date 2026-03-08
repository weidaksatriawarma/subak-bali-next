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

interface KnowledgeBase {
  sectionTitles: {
    regulations: string
    tips: string
    glossary: string
  }
  regulations: RegulationGuide[]
  tips: SustainabilityTip[]
  glossary: GlossaryItem[]
}

const id: KnowledgeBase = {
  sectionTitles: {
    regulations: "Panduan Regulasi",
    tips: "Tips Sustainability",
    glossary: "Glosarium",
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
}

const en: KnowledgeBase = {
  sectionTitles: {
    regulations: "Regulation Guide",
    tips: "Sustainability Tips",
    glossary: "Glossary",
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
}

export const knowledgeBase: Record<Locale, KnowledgeBase> = { id, en }
