export interface Regulation {
  name: string
  number: string
  year: number
  summary: string
  requirements: string[]
  tips: string[]
  topics: string[]
}

export const REGULATIONS: Regulation[] = [
  {
    name: "Keuangan Berkelanjutan",
    number: "POJK 51/2017",
    year: 2017,
    summary:
      "Peraturan OJK tentang penerapan keuangan berkelanjutan bagi lembaga jasa keuangan, emiten, dan perusahaan publik. Mengharuskan pelaporan sustainability dan rencana aksi keuangan berkelanjutan.",
    requirements: [
      "Laporan keberlanjutan tahunan",
      "Rencana Aksi Keuangan Berkelanjutan (RAKB)",
      "Penilaian risiko lingkungan dalam keputusan bisnis",
      "Pengungkapan dampak lingkungan dan sosial",
    ],
    tips: [
      "UMKM: mulai dengan laporan sederhana tentang praktik ramah lingkungan",
      "Dokumentasikan upaya penghematan energi dan pengelolaan limbah",
      "Simpan bukti pembelian dari supplier lokal",
    ],
    topics: ["reporting", "green_finance"],
  },
  {
    name: "Pengelolaan Sampah",
    number: "PP 22/2021",
    year: 2021,
    summary:
      "Peraturan Pemerintah tentang penyelenggaraan perlindungan dan pengelolaan lingkungan hidup. Mencakup standar pengelolaan limbah B3 dan non-B3, serta kewajiban pemilahan sampah di sumber.",
    requirements: [
      "Pemilahan sampah di sumber (organik, anorganik, B3)",
      "Pengurangan timbulan sampah",
      "Pemanfaatan kembali dan daur ulang",
      "Pengelolaan limbah B3 sesuai standar",
    ],
    tips: [
      "Sediakan 3 tempat sampah terpisah: organik, anorganik, B3",
      "Kompos limbah organik untuk mengurangi volume 40-60%",
      "Kerja sama dengan bank sampah atau pengepul lokal",
    ],
    topics: ["waste"],
  },
  {
    name: "Taksonomi Keuangan Berkelanjutan Indonesia",
    number: "TKBI Versi 2",
    year: 2022,
    summary:
      "Taksonomi yang mengklasifikasikan aktivitas ekonomi berdasarkan dampak lingkungannya: hijau (green), kuning (transition), dan merah (red). Digunakan sebagai acuan untuk green financing dan investasi berkelanjutan.",
    requirements: [
      "Klasifikasi aktivitas bisnis sesuai kategori warna",
      "Bukti kontribusi terhadap mitigasi perubahan iklim",
      "Pemenuhan standar minimum untuk kategori transisi",
      "Pelaporan emisi karbon (scope 1 & 2)",
    ],
    tips: [
      "Identifikasi aktivitas bisnis yang masuk kategori 'hijau'",
      "Gunakan panel surya atau energi terbarukan untuk naik kategori",
      "Laporan sederhana emisi CO2 bisa meningkatkan akses ke green financing",
    ],
    topics: ["carbon", "green_finance"],
  },
  {
    name: "Perlindungan dan Pengelolaan Lingkungan Hidup",
    number: "UU 32/2009",
    year: 2009,
    summary:
      "Undang-undang dasar tentang perlindungan lingkungan hidup di Indonesia. Mencakup AMDAL, izin lingkungan, dan sanksi pelanggaran lingkungan. Berlaku untuk semua pelaku usaha.",
    requirements: [
      "AMDAL atau UKL-UPL untuk usaha berdampak lingkungan",
      "Izin lingkungan sesuai skala usaha",
      "Pencegahan pencemaran air, udara, dan tanah",
      "Pengelolaan limbah sesuai standar baku mutu",
    ],
    tips: [
      "UMKM umumnya cukup UKL-UPL (lebih sederhana dari AMDAL)",
      "Pastikan limbah cair tidak langsung dibuang ke saluran air",
      "Dokumentasikan semua upaya pengelolaan lingkungan",
    ],
    topics: ["waste", "reporting"],
  },
  {
    name: "Kebijakan Energi Nasional",
    number: "PP 79/2014",
    year: 2014,
    summary:
      "Kebijakan Energi Nasional yang menargetkan bauran energi baru terbarukan (EBT) minimal 23% pada 2025 dan 31% pada 2050. Mendorong efisiensi energi dan penggunaan energi terbarukan di semua sektor.",
    requirements: [
      "Efisiensi energi dalam operasional bisnis",
      "Penggunaan peralatan berlabel SNI hemat energi",
      "Pemanfaatan potensi energi terbarukan lokal",
      "Audit energi berkala (untuk industri besar)",
    ],
    tips: [
      "Ganti lampu ke LED — hemat 60-80% listrik untuk penerangan",
      "Pasang panel surya — subsidi dan insentif tersedia dari PLN",
      "Matikan peralatan saat tidak digunakan (standby mode = 5-10% listrik)",
    ],
    topics: ["energy", "carbon"],
  },
]

export function lookupRegulations(topic: string): {
  name: string
  number: string
  year: number
  summary: string
  requirements: string[]
  tips: string[]
}[] {
  return REGULATIONS.filter((r) => r.topics.includes(topic)).map((r) => ({
    name: r.name,
    number: r.number,
    year: r.year,
    summary: r.summary,
    requirements: r.requirements,
    tips: r.tips,
  }))
}
