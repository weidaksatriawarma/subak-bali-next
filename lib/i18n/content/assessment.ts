import type { Locale } from "../dictionaries"
import {
  INDUSTRY_QUESTIONS,
  type IndustryQuestion,
} from "@/lib/gamification/industry-questions"
import type { Industry } from "@/types/database"

interface StepInfo {
  title: string
  description: string
}

interface ProcessingStep {
  id: string
  label: string
  subtitle: string
}

interface AssessmentFormDictionary {
  stepLabel: string
  industryQuestionsTitle: string
  industryQuestionsDesc: string
  steps: StepInfo[]
  processing: {
    heading: string
    pleaseWait: string
    steps: ProcessingStep[]
  }
  intro: {
    heading: string
    description: string
  }
  fields: {
    energySource: string
    monthlyElectricity: string
    monthlyElectricityPlaceholder: string
    energyEfficient: string
    wasteManagement: string
    plasticReduction: string
    wasteVolume: string
    wasteVolumePlaceholder: string
    localSourcing: string
    supplierSustainability: string
    packagingType: string
    waterConservation: string
    digitalOperations: string
    transportationType: string
    sustainabilityPolicy: string
    employeeTraining: string
    communityEngagement: string
  }
  energySourceLabels: Record<string, string>
  wasteManagementLabels: Record<string, string>
  packagingTypeLabels: Record<string, string>
  transportationTypeLabels: Record<string, string>
  errors: {
    energySource: string
    wasteManagement: string
    packagingType: string
    transportationType: string
    scoreFailed: string
    roadmapFailed: string
    generic: string
  }
  nav: {
    previous: string
    next: string
    submit: string
  }
  toasts: {
    draftFound: string
  }
}

interface QuickQuestion {
  key: string
  title: string
  description: string
  options: { value: string; label: string }[]
}

interface QuickAssessmentDictionary {
  title: string
  description: string
  submitButton: string
  questions: QuickQuestion[]
  categoryLabels: Record<string, string>
  errors: {
    selectOption: string
  }
  results: {
    title: string
    subtitle: string
    outOf: string
    categoryTitle: string
    fullAssessment: string
    retry: string
  }
}

interface IndustryQuestionTranslation {
  label: string
  options?: Record<string, string>
}

type IndustryQuestionsTranslations = Record<
  string,
  Record<string, IndustryQuestionTranslation>
>

interface AssessmentContent {
  form: AssessmentFormDictionary
  quick: QuickAssessmentDictionary
  industryQuestions: IndustryQuestionsTranslations
}

// --- Indonesian ---

const idForm: AssessmentFormDictionary = {
  stepLabel: "Langkah",
  industryQuestionsTitle: "Pertanyaan Industri",
  industryQuestionsDesc: "Pertanyaan khusus untuk industri Anda",
  steps: [
    { title: "Energi", description: "Penggunaan energi bisnis Anda" },
    {
      title: "Pengelolaan Limbah",
      description: "Cara Anda mengelola limbah",
    },
    { title: "Rantai Pasok", description: "Sumber bahan baku dan kemasan" },
    { title: "Operasional", description: "Praktik operasional harian" },
    {
      title: "Kebijakan",
      description: "Kebijakan ramah lingkungan bisnis",
    },
  ],
  processing: {
    heading: "Menganalisis Assessment Anda",
    pleaseWait: "Mohon tunggu...",
    steps: [
      {
        id: "save",
        label: "Menyimpan data assessment",
        subtitle: "Menyimpan jawaban Anda ke database...",
      },
      {
        id: "score",
        label: "Menghitung skor keberlanjutan",
        subtitle: "AI sedang menganalisis praktik bisnis Anda...",
      },
      {
        id: "roadmap",
        label: "Membuat roadmap perbaikan",
        subtitle: "AI sedang menyusun rekomendasi untuk bisnis Anda...",
      },
      {
        id: "done",
        label: "Mempersiapkan hasil",
        subtitle: "Sebentar lagi selesai...",
      },
    ],
  },
  intro: {
    heading: "Jawab dengan jujur dan apa adanya",
    description:
      "Hasil assessment ini sepenuhnya bergantung pada keakuratan jawaban Anda. Jawaban yang jujur akan menghasilkan skor yang lebih akurat dan rekomendasi yang benar-benar sesuai dengan kondisi bisnis Anda. Data Anda bersifat rahasia dan hanya digunakan untuk analisis sustainability.",
  },
  fields: {
    energySource: "Sumber Energi Utama",
    monthlyElectricity: "Estimasi Penggunaan Listrik Bulanan (kWh)",
    monthlyElectricityPlaceholder: "Contoh: 500",
    energyEfficient: "Menggunakan Peralatan Hemat Energi?",
    wasteManagement: "Cara Pengelolaan Limbah",
    plasticReduction: "Upaya Pengurangan Plastik?",
    wasteVolume: "Estimasi Volume Limbah Bulanan (kg)",
    wasteVolumePlaceholder: "Contoh: 50",
    localSourcing: "Persentase Bahan Baku Lokal",
    supplierSustainability: "Memilih Pemasok Ramah Lingkungan?",
    packagingType: "Jenis Kemasan Utama",
    waterConservation: "Menghemat Penggunaan Air?",
    digitalOperations: "Sudah Beralih ke Sistem Digital (Tanpa Kertas)?",
    transportationType: "Transportasi Utama Bisnis (Pengiriman/Operasional)",
    sustainabilityPolicy: "Memiliki Kebijakan Ramah Lingkungan Tertulis?",
    employeeTraining: "Melatih Karyawan tentang Praktik Ramah Lingkungan?",
    communityEngagement: "Aktif Terlibat dalam Kegiatan Lingkungan Sekitar?",
  },
  energySourceLabels: {
    pln_only: "PLN saja",
    pln_solar: "PLN + Solar Panel",
    solar_only: "Solar Panel saja",
    diesel_generator: "Genset Diesel",
  },
  wasteManagementLabels: {
    none: "Tidak dikelola",
    segregation: "Pemilahan",
    recycling: "Daur Ulang",
    composting: "Pengomposan",
    circular: "Ekonomi Sirkular",
  },
  packagingTypeLabels: {
    single_use_plastic: "Plastik Sekali Pakai",
    recyclable: "Dapat Didaur Ulang",
    biodegradable: "Biodegradable",
    reusable: "Dapat Digunakan Ulang",
  },
  transportationTypeLabels: {
    gasoline: "Kendaraan Bensin/Solar",
    electric: "Kendaraan Listrik",
    hybrid: "Kendaraan Hybrid",
    bicycle: "Sepeda/Jalan Kaki",
    none: "Tidak Menggunakan Kendaraan",
  },
  errors: {
    energySource: "Pilih sumber energi",
    wasteManagement: "Pilih cara pengelolaan limbah",
    packagingType: "Pilih jenis kemasan",
    transportationType: "Pilih jenis transportasi",
    scoreFailed: "Gagal menghasilkan skor",
    roadmapFailed: "Gagal menghasilkan roadmap",
    generic: "Terjadi kesalahan. Silakan coba lagi.",
  },
  nav: {
    previous: "Sebelumnya",
    next: "Selanjutnya",
    submit: "Kirim Assessment",
  },
  toasts: {
    draftFound: "Draft assessment ditemukan. Melanjutkan dari langkah {step}.",
  },
}

const idQuick: QuickAssessmentDictionary = {
  title: "Quick Assessment",
  description: "Estimasi skor sustainability bisnis Anda dalam 3 menit",
  submitButton: "Lihat Estimasi Skor",
  questions: [
    {
      key: "energy_source",
      title: "Sumber Energi",
      description: "Apa sumber energi utama bisnis Anda?",
      options: [
        { value: "pln_only", label: "PLN saja" },
        { value: "diesel", label: "Genset / Diesel" },
        { value: "pln_solar", label: "PLN + Panel Surya" },
        { value: "solar", label: "Panel Surya penuh" },
      ],
    },
    {
      key: "waste_management",
      title: "Pengelolaan Sampah",
      description: "Bagaimana bisnis Anda mengelola sampah?",
      options: [
        { value: "none", label: "Tidak ada pengelolaan khusus" },
        { value: "segregation", label: "Pemilahan sampah" },
        { value: "recycling", label: "Daur ulang" },
        { value: "composting", label: "Pengomposan" },
        { value: "circular", label: "Ekonomi sirkular" },
      ],
    },
    {
      key: "packaging_type",
      title: "Jenis Kemasan",
      description: "Jenis kemasan apa yang paling sering digunakan?",
      options: [
        { value: "single_use_plastic", label: "Plastik sekali pakai" },
        { value: "recyclable", label: "Bahan dapat didaur ulang" },
        { value: "biodegradable", label: "Bahan biodegradable" },
        { value: "reusable", label: "Kemasan dapat dipakai ulang" },
      ],
    },
    {
      key: "transportation",
      title: "Transportasi",
      description: "Moda transportasi utama untuk operasional bisnis?",
      options: [
        { value: "gasoline", label: "Kendaraan bensin/solar" },
        { value: "hybrid", label: "Kendaraan hybrid" },
        { value: "electric", label: "Kendaraan listrik" },
        { value: "bicycle", label: "Sepeda / tanpa kendaraan" },
      ],
    },
    {
      key: "has_sustainability_policy",
      title: "Kebijakan Sustainability",
      description: "Apakah bisnis Anda memiliki kebijakan sustainability?",
      options: [
        { value: "false", label: "Belum ada" },
        { value: "true", label: "Sudah ada" },
      ],
    },
  ],
  categoryLabels: {
    energy_source: "Energi",
    waste_management: "Sampah",
    packaging_type: "Kemasan",
    transportation: "Transportasi",
    has_sustainability_policy: "Kebijakan",
  },
  errors: {
    selectOption: "Pilih salah satu opsi",
  },
  results: {
    title: "Estimasi Skor Sustainability",
    subtitle: "Berdasarkan jawaban cepat Anda",
    outOf: "dari 100 poin",
    categoryTitle: "Skor per Kategori",
    fullAssessment: "Assessment Lengkap",
    retry: "Coba Lagi",
  },
}

const idIndustryQuestions: IndustryQuestionsTranslations = {
  fnb: {
    local_ingredients: {
      label: "Apakah menggunakan bahan baku lokal untuk menu utama?",
    },
    food_waste_management: {
      label: "Bagaimana mengelola sisa makanan?",
      options: {
        dibuang: "Dibuang",
        donasi: "Donasi",
        kompos: "Kompos",
        olahan_ulang: "Olahan Ulang",
      },
    },
    eco_packaging: {
      label: "Apakah menyediakan kemasan ramah lingkungan untuk takeaway?",
    },
    organic_percentage: {
      label: "Berapa persen menu menggunakan bahan organik?",
    },
    used_oil_program: {
      label: "Apakah ada program pengurangan minyak goreng bekas?",
    },
  },
  retail: {
    led_lighting: {
      label: "Apakah toko menggunakan pencahayaan LED?",
    },
    reusable_bags: {
      label: "Apakah menawarkan tas belanja reusable?",
    },
    unsold_products: {
      label: "Bagaimana mengelola produk yang tidak terjual?",
      options: {
        dibuang: "Dibuang",
        diskon: "Diskon",
        donasi: "Donasi",
        retur: "Retur",
      },
    },
    eco_label_products: {
      label: "Apakah memprioritaskan produk berlabel ramah lingkungan?",
    },
    local_supplier_percentage: {
      label: "Berapa persen produk dari supplier lokal (<100km)?",
    },
  },
  manufacturing: {
    wastewater_treatment: {
      label: "Apakah pabrik memiliki sistem pengolahan air limbah?",
    },
    recycled_materials: {
      label: "Apakah menggunakan bahan baku daur ulang?",
    },
    emission_management: {
      label: "Bagaimana mengelola emisi gas produksi?",
      options: {
        tidak_dikelola: "Tidak Dikelola",
        filter_dasar: "Filter Dasar",
        scrubber: "Scrubber",
        zero_emission: "Zero Emission",
      },
    },
    renewable_energy_percentage: {
      label: "Berapa persen energi dari sumber terbarukan?",
    },
    lean_manufacturing: {
      label: "Apakah menerapkan lean manufacturing?",
    },
  },
  services: {
    paperless_policy: {
      label: "Apakah kantor menerapkan kebijakan paperless?",
    },
    wfh_policy: {
      label: "Apakah karyawan boleh WFH untuk kurangi emisi transportasi?",
    },
    cooling_system: {
      label: "Bagaimana sistem pendingin ruangan?",
      options: {
        ac_lama: "AC Lama",
        ac_inverter: "AC Inverter",
        ventilasi_alami: "Ventilasi Alami",
        hybrid: "Hybrid",
      },
    },
    cloud_computing: {
      label: "Apakah menggunakan cloud computing?",
    },
    green_commuting: {
      label: "Apakah ada program green commuting untuk karyawan?",
    },
  },
  agriculture: {
    organic_fertilizer: {
      label: "Apakah menggunakan pupuk organik?",
    },
    irrigation_system: {
      label: "Bagaimana sistem irigasi?",
      options: {
        tadah_hujan: "Tadah Hujan",
        irigasi_banjir: "Irigasi Banjir",
        irigasi_tetes: "Irigasi Tetes",
        irigasi_sprinkler: "Irigasi Sprinkler",
      },
    },
    crop_rotation: {
      label: "Apakah menerapkan rotasi tanaman?",
    },
    conservation_percentage: {
      label: "Berapa persen lahan menggunakan teknik pertanian konservasi?",
    },
    pesticide_usage: {
      label: "Apakah menggunakan pestisida kimia?",
      options: {
        banyak: "Banyak",
        sedikit: "Sedikit",
        organik_saja: "Organik Saja",
        tidak_ada: "Tidak Ada",
      },
    },
  },
}

// --- English ---

const enForm: AssessmentFormDictionary = {
  stepLabel: "Step",
  industryQuestionsTitle: "Industry Questions",
  industryQuestionsDesc: "Questions specific to your industry",
  steps: [
    { title: "Energy", description: "Your business energy usage" },
    { title: "Waste Management", description: "How you manage waste" },
    {
      title: "Supply Chain",
      description: "Raw material sources and packaging",
    },
    {
      title: "Operations",
      description: "Daily operational practices",
    },
    {
      title: "Policy",
      description: "Business environmental policies",
    },
  ],
  processing: {
    heading: "Analyzing Your Assessment",
    pleaseWait: "Please wait...",
    steps: [
      {
        id: "save",
        label: "Saving assessment data",
        subtitle: "Saving your answers to the database...",
      },
      {
        id: "score",
        label: "Calculating sustainability score",
        subtitle: "AI is analyzing your business practices...",
      },
      {
        id: "roadmap",
        label: "Creating improvement roadmap",
        subtitle: "AI is preparing recommendations for your business...",
      },
      {
        id: "done",
        label: "Preparing results",
        subtitle: "Almost done...",
      },
    ],
  },
  intro: {
    heading: "Answer honestly and accurately",
    description:
      "The results of this assessment depend entirely on the accuracy of your answers. Honest answers will produce a more accurate score and recommendations that truly match your business conditions. Your data is confidential and used only for sustainability analysis.",
  },
  fields: {
    energySource: "Primary Energy Source",
    monthlyElectricity: "Estimated Monthly Electricity Usage (kWh)",
    monthlyElectricityPlaceholder: "e.g. 500",
    energyEfficient: "Using Energy-Efficient Equipment?",
    wasteManagement: "Waste Management Method",
    plasticReduction: "Plastic Reduction Efforts?",
    wasteVolume: "Estimated Monthly Waste Volume (kg)",
    wasteVolumePlaceholder: "e.g. 50",
    localSourcing: "Local Raw Material Percentage",
    supplierSustainability: "Choose Eco-Friendly Suppliers?",
    packagingType: "Primary Packaging Type",
    waterConservation: "Conserving Water Usage?",
    digitalOperations: "Switched to Digital Systems (Paperless)?",
    transportationType: "Primary Business Transportation (Delivery/Operations)",
    sustainabilityPolicy: "Have a Written Environmental Policy?",
    employeeTraining: "Training Employees on Environmental Practices?",
    communityEngagement: "Actively Involved in Local Environmental Activities?",
  },
  energySourceLabels: {
    pln_only: "PLN only",
    pln_solar: "PLN + Solar Panel",
    solar_only: "Solar Panel only",
    diesel_generator: "Diesel Generator",
  },
  wasteManagementLabels: {
    none: "No management",
    segregation: "Segregation",
    recycling: "Recycling",
    composting: "Composting",
    circular: "Circular Economy",
  },
  packagingTypeLabels: {
    single_use_plastic: "Single-Use Plastic",
    recyclable: "Recyclable",
    biodegradable: "Biodegradable",
    reusable: "Reusable",
  },
  transportationTypeLabels: {
    gasoline: "Gasoline/Diesel Vehicle",
    electric: "Electric Vehicle",
    hybrid: "Hybrid Vehicle",
    bicycle: "Bicycle/Walking",
    none: "No Vehicle",
  },
  errors: {
    energySource: "Select an energy source",
    wasteManagement: "Select a waste management method",
    packagingType: "Select a packaging type",
    transportationType: "Select a transportation type",
    scoreFailed: "Failed to generate score",
    roadmapFailed: "Failed to generate roadmap",
    generic: "An error occurred. Please try again.",
  },
  nav: {
    previous: "Previous",
    next: "Next",
    submit: "Submit Assessment",
  },
  toasts: {
    draftFound: "Draft assessment found. Continuing from step {step}.",
  },
}

const enQuick: QuickAssessmentDictionary = {
  title: "Quick Assessment",
  description: "Estimate your business sustainability score in 3 minutes",
  submitButton: "View Estimated Score",
  questions: [
    {
      key: "energy_source",
      title: "Energy Source",
      description: "What is your business's primary energy source?",
      options: [
        { value: "pln_only", label: "PLN only" },
        { value: "diesel", label: "Generator / Diesel" },
        { value: "pln_solar", label: "PLN + Solar Panel" },
        { value: "solar", label: "Full Solar Panel" },
      ],
    },
    {
      key: "waste_management",
      title: "Waste Management",
      description: "How does your business manage waste?",
      options: [
        { value: "none", label: "No specific management" },
        { value: "segregation", label: "Waste segregation" },
        { value: "recycling", label: "Recycling" },
        { value: "composting", label: "Composting" },
        { value: "circular", label: "Circular economy" },
      ],
    },
    {
      key: "packaging_type",
      title: "Packaging Type",
      description: "What type of packaging is most commonly used?",
      options: [
        {
          value: "single_use_plastic",
          label: "Single-use plastic",
        },
        { value: "recyclable", label: "Recyclable material" },
        { value: "biodegradable", label: "Biodegradable material" },
        { value: "reusable", label: "Reusable packaging" },
      ],
    },
    {
      key: "transportation",
      title: "Transportation",
      description: "Primary mode of transportation for business operations?",
      options: [
        { value: "gasoline", label: "Gasoline/diesel vehicle" },
        { value: "hybrid", label: "Hybrid vehicle" },
        { value: "electric", label: "Electric vehicle" },
        { value: "bicycle", label: "Bicycle / no vehicle" },
      ],
    },
    {
      key: "has_sustainability_policy",
      title: "Sustainability Policy",
      description: "Does your business have a sustainability policy?",
      options: [
        { value: "false", label: "Not yet" },
        { value: "true", label: "Yes" },
      ],
    },
  ],
  categoryLabels: {
    energy_source: "Energy",
    waste_management: "Waste",
    packaging_type: "Packaging",
    transportation: "Transportation",
    has_sustainability_policy: "Policy",
  },
  errors: {
    selectOption: "Select an option",
  },
  results: {
    title: "Estimated Sustainability Score",
    subtitle: "Based on your quick answers",
    outOf: "out of 100 points",
    categoryTitle: "Score per Category",
    fullAssessment: "Full Assessment",
    retry: "Try Again",
  },
}

const enIndustryQuestions: IndustryQuestionsTranslations = {
  fnb: {
    local_ingredients: {
      label: "Do you use local ingredients for the main menu?",
    },
    food_waste_management: {
      label: "How do you manage food waste?",
      options: {
        dibuang: "Discarded",
        donasi: "Donated",
        kompos: "Composted",
        olahan_ulang: "Reprocessed",
      },
    },
    eco_packaging: {
      label: "Do you provide eco-friendly packaging for takeaway?",
    },
    organic_percentage: {
      label: "What percentage of the menu uses organic ingredients?",
    },
    used_oil_program: {
      label: "Is there a program to reduce used cooking oil?",
    },
  },
  retail: {
    led_lighting: {
      label: "Does the store use LED lighting?",
    },
    reusable_bags: {
      label: "Do you offer reusable shopping bags?",
    },
    unsold_products: {
      label: "How do you manage unsold products?",
      options: {
        dibuang: "Discarded",
        diskon: "Discounted",
        donasi: "Donated",
        retur: "Returned",
      },
    },
    eco_label_products: {
      label: "Do you prioritize eco-labeled products?",
    },
    local_supplier_percentage: {
      label: "What percentage of products come from local suppliers (<100km)?",
    },
  },
  manufacturing: {
    wastewater_treatment: {
      label: "Does the factory have a wastewater treatment system?",
    },
    recycled_materials: {
      label: "Do you use recycled raw materials?",
    },
    emission_management: {
      label: "How do you manage production gas emissions?",
      options: {
        tidak_dikelola: "Not Managed",
        filter_dasar: "Basic Filter",
        scrubber: "Scrubber",
        zero_emission: "Zero Emission",
      },
    },
    renewable_energy_percentage: {
      label: "What percentage of energy comes from renewable sources?",
    },
    lean_manufacturing: {
      label: "Do you practice lean manufacturing?",
    },
  },
  services: {
    paperless_policy: {
      label: "Does the office implement a paperless policy?",
    },
    wfh_policy: {
      label: "Can employees work from home to reduce transport emissions?",
    },
    cooling_system: {
      label: "What is the cooling system?",
      options: {
        ac_lama: "Old AC",
        ac_inverter: "Inverter AC",
        ventilasi_alami: "Natural Ventilation",
        hybrid: "Hybrid",
      },
    },
    cloud_computing: {
      label: "Do you use cloud computing?",
    },
    green_commuting: {
      label: "Is there a green commuting program for employees?",
    },
  },
  agriculture: {
    organic_fertilizer: {
      label: "Do you use organic fertilizer?",
    },
    irrigation_system: {
      label: "What is the irrigation system?",
      options: {
        tadah_hujan: "Rainfed",
        irigasi_banjir: "Flood Irrigation",
        irigasi_tetes: "Drip Irrigation",
        irigasi_sprinkler: "Sprinkler Irrigation",
      },
    },
    crop_rotation: {
      label: "Do you practice crop rotation?",
    },
    conservation_percentage: {
      label: "What percentage of land uses conservation farming techniques?",
    },
    pesticide_usage: {
      label: "Do you use chemical pesticides?",
      options: {
        banyak: "Heavily",
        sedikit: "Lightly",
        organik_saja: "Organic Only",
        tidak_ada: "None",
      },
    },
  },
}

// --- Export ---

export const assessmentContent: Record<Locale, AssessmentContent> = {
  id: {
    form: idForm,
    quick: idQuick,
    industryQuestions: idIndustryQuestions,
  },
  en: {
    form: enForm,
    quick: enQuick,
    industryQuestions: enIndustryQuestions,
  },
}

/**
 * Merges structural data from INDUSTRY_QUESTIONS with translated
 * labels/options from the content file.
 */
export function getLocalizedIndustryQuestions(
  locale: Locale,
  industry: Exclude<Industry, "other">
): IndustryQuestion[] {
  const translations = assessmentContent[locale].industryQuestions[industry]
  const questions = INDUSTRY_QUESTIONS[industry]

  return questions.map((q) => {
    const t = translations?.[q.id]
    if (!t) return q

    return {
      ...q,
      label: t.label,
      options: q.options
        ? q.options.map((opt) => ({
            ...opt,
            label: t.options?.[opt.value] ?? opt.label,
          }))
        : undefined,
    }
  })
}
