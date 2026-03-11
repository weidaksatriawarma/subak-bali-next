import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { timingSafeEqual, logError } from "@/lib/security"
import { auditLog } from "@/lib/audit"

export async function POST(req: Request) {
  // Deny-first: block production unless SEED_SECRET is set and matches
  if (process.env.NODE_ENV !== "development") {
    if (!process.env.SEED_SECRET) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    try {
      const { secret } = await req.json()
      if (
        typeof secret !== "string" ||
        !timingSafeEqual(secret, process.env.SEED_SECRET)
      ) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }
    } catch {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = user.id

  auditLog({
    action: "seed_execute",
    userId,
    resourceType: "database",
  })

  const now = new Date()

  // Date helpers
  const daysAgo = (days: number) =>
    new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString()

  // Generate deterministic UUIDs for linking
  const assessmentIds = [
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
  ]
  const scoreIds = [
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
  ]
  const roadmapId = crypto.randomUUID()
  const conversationId = crypto.randomUUID()

  try {
    // Clean existing data (order matters due to FK constraints)
    await supabase.from("chat_messages").delete().eq("user_id", userId)
    await supabase.from("chat_conversations").delete().eq("user_id", userId)
    await supabase.from("roadmap_items").delete().eq("user_id", userId)
    await supabase.from("roadmaps").delete().eq("user_id", userId)
    await supabase.from("scores").delete().eq("user_id", userId)
    await supabase.from("assessments").delete().eq("user_id", userId)

    // 1. Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        business_name: "Warung Hijau Bali",
        industry: "fnb",
        business_size: "small",
        employee_count: 12,
        location: "Denpasar, Bali",
        description:
          "Warung makan tradisional Bali yang berkomitmen pada praktik bisnis berkelanjutan dan ramah lingkungan.",
        updated_at: now.toISOString(),
      })
      .eq("id", userId)

    if (profileError) throw profileError

    // 2. Insert assessments
    const { error: assessmentError } = await supabase
      .from("assessments")
      .insert([
        {
          id: assessmentIds[0],
          user_id: userId,
          status: "completed",
          energy_source: "diesel_generator",
          monthly_electricity_kwh: 800,
          uses_energy_efficient_equipment: false,
          waste_management: "none",
          plastic_reduction_efforts: false,
          waste_volume_kg_monthly: 200,
          local_sourcing_percentage: 10,
          supplier_sustainability_check: false,
          packaging_type: "single_use_plastic",
          water_conservation: false,
          digital_operations: false,
          transportation_type: "gasoline",
          has_sustainability_policy: false,
          employee_sustainability_training: false,
          community_engagement: false,
          created_at: daysAgo(90),
          updated_at: daysAgo(90),
        },
        {
          id: assessmentIds[1],
          user_id: userId,
          status: "completed",
          energy_source: "pln_only",
          monthly_electricity_kwh: 600,
          uses_energy_efficient_equipment: true,
          waste_management: "segregation",
          plastic_reduction_efforts: true,
          waste_volume_kg_monthly: 120,
          local_sourcing_percentage: 40,
          supplier_sustainability_check: false,
          packaging_type: "recyclable",
          water_conservation: true,
          digital_operations: false,
          transportation_type: "hybrid",
          has_sustainability_policy: true,
          employee_sustainability_training: false,
          community_engagement: false,
          created_at: daysAgo(45),
          updated_at: daysAgo(45),
        },
        {
          id: assessmentIds[2],
          user_id: userId,
          status: "completed",
          energy_source: "pln_solar",
          monthly_electricity_kwh: 400,
          uses_energy_efficient_equipment: true,
          waste_management: "composting",
          plastic_reduction_efforts: true,
          waste_volume_kg_monthly: 60,
          local_sourcing_percentage: 75,
          supplier_sustainability_check: true,
          packaging_type: "biodegradable",
          water_conservation: true,
          digital_operations: true,
          transportation_type: "bicycle",
          has_sustainability_policy: true,
          employee_sustainability_training: true,
          community_engagement: true,
          created_at: daysAgo(7),
          updated_at: daysAgo(7),
        },
      ])

    if (assessmentError) throw assessmentError

    // 3. Insert scores (with certificate_token for PDF/QR demo)
    const certificateToken = crypto.randomUUID()

    const { error: scoreError } = await supabase.from("scores").insert([
      {
        id: scoreIds[0],
        user_id: userId,
        assessment_id: assessmentIds[0],
        total_score: 35,
        energy_score: 20,
        waste_score: 15,
        supply_chain_score: 30,
        operations_score: 45,
        policy_score: 40,
        ai_summary:
          "Bisnis Anda masih dalam tahap awal keberlanjutan. Penggunaan genset diesel dan tidak adanya pengelolaan limbah menjadi area utama yang perlu diperbaiki. Rekomendasi: mulai dengan beralih ke PLN dan terapkan pemilahan sampah dasar.",
        industry_benchmark: 45,
        created_at: daysAgo(90),
      },
      {
        id: scoreIds[1],
        user_id: userId,
        assessment_id: assessmentIds[1],
        total_score: 55,
        energy_score: 50,
        waste_score: 55,
        supply_chain_score: 45,
        operations_score: 65,
        policy_score: 60,
        ai_summary:
          "Kemajuan yang baik! Peralihan ke PLN dan pemilahan limbah menunjukkan komitmen nyata. Persentase sourcing lokal meningkat ke 40%. Langkah selanjutnya: eksplorasi panel surya dan tingkatkan kemitraan dengan supplier lokal.",
        industry_benchmark: 48,
        created_at: daysAgo(45),
      },
      {
        id: scoreIds[2],
        user_id: userId,
        assessment_id: assessmentIds[2],
        total_score: 72,
        energy_score: 75,
        waste_score: 70,
        supply_chain_score: 65,
        operations_score: 80,
        policy_score: 70,
        ai_summary:
          "Warung Hijau Bali menunjukkan transformasi luar biasa! Penggunaan panel surya, pengomposan limbah, dan 75% bahan baku lokal menempatkan bisnis Anda di atas rata-rata industri F&B. Fokus selanjutnya: sertifikasi hijau dan program pelatihan karyawan berkelanjutan.",
        industry_benchmark: 48,
        certificate_token: certificateToken,
        created_at: daysAgo(7),
      },
    ])

    if (scoreError) throw scoreError

    // 4. Insert roadmap
    const { error: roadmapError } = await supabase.from("roadmaps").insert({
      id: roadmapId,
      user_id: userId,
      score_id: scoreIds[2],
      title: "Roadmap Keberlanjutan - Warung Hijau Bali",
      ai_generated_content: {
        generated_at: daysAgo(7),
        model: "claude-sonnet-4-20250514",
        estimated_co2_reduction_kg: 1850,
        tree_equivalent: 84,
      },
      created_at: daysAgo(7),
    })

    if (roadmapError) throw roadmapError

    // 5. Insert roadmap items
    const { error: itemsError } = await supabase.from("roadmap_items").insert([
      // Energy (2 items)
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Optimalkan penggunaan panel surya",
        description:
          "Lakukan audit energi untuk memaksimalkan output panel surya yang sudah terpasang. Pastikan panel bersih dan tidak terhalang. Target: 60% kebutuhan listrik dari surya.",
        category: "energy",
        priority: "high",
        estimated_impact: "high",
        estimated_cost: "low",
        timeline: "1_month",
        is_completed: true,
        completed_at: daysAgo(3),
        sort_order: 0,
        created_at: daysAgo(7),
      },
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Ganti peralatan dapur ke model hemat energi",
        description:
          "Investasi pada kompor induksi dan kulkas berperingkat energi A. Penghematan listrik hingga 30% per bulan dengan ROI dalam 12 bulan.",
        category: "energy",
        priority: "medium",
        estimated_impact: "high",
        estimated_cost: "high",
        timeline: "6_months",
        is_completed: false,
        completed_at: null,
        sort_order: 1,
        created_at: daysAgo(7),
      },
      // Waste (2 items)
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Bangun area kompos terstruktur",
        description:
          "Buat area pengomposan khusus dengan 3 bak rotasi untuk limbah organik dapur. Kompos yang dihasilkan bisa digunakan untuk kebun herbal warung.",
        category: "waste",
        priority: "high",
        estimated_impact: "high",
        estimated_cost: "medium",
        timeline: "1_month",
        is_completed: true,
        completed_at: daysAgo(5),
        sort_order: 2,
        created_at: daysAgo(7),
      },
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Program zero-waste untuk sisa makanan",
        description:
          "Kerjasama dengan bank makanan lokal untuk menyalurkan makanan berlebih. Implementasi sistem porsi yang lebih akurat untuk mengurangi food waste 50%.",
        category: "waste",
        priority: "medium",
        estimated_impact: "medium",
        estimated_cost: "free",
        timeline: "3_months",
        is_completed: false,
        completed_at: null,
        sort_order: 3,
        created_at: daysAgo(7),
      },
      // Supply Chain (2 items)
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Perluas jaringan supplier lokal ke 85%",
        description:
          "Identifikasi 3-5 petani lokal tambahan di radius 20km untuk pasokan sayur, bumbu, dan protein. Buat kontrak langsung tanpa perantara.",
        category: "supply_chain",
        priority: "high",
        estimated_impact: "high",
        estimated_cost: "low",
        timeline: "3_months",
        is_completed: false,
        completed_at: null,
        sort_order: 4,
        created_at: daysAgo(7),
      },
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Audit keberlanjutan supplier utama",
        description:
          "Kunjungi dan evaluasi 5 supplier utama menggunakan checklist keberlanjutan. Prioritaskan supplier yang menggunakan praktik pertanian organik.",
        category: "supply_chain",
        priority: "low",
        estimated_impact: "medium",
        estimated_cost: "free",
        timeline: "1_month",
        is_completed: true,
        completed_at: daysAgo(2),
        sort_order: 5,
        created_at: daysAgo(7),
      },
      // Operations (2 items)
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Implementasi sistem POS digital",
        description:
          "Beralih dari nota kertas ke sistem POS digital untuk mengurangi penggunaan kertas dan meningkatkan tracking inventori secara real-time.",
        category: "operations",
        priority: "medium",
        estimated_impact: "medium",
        estimated_cost: "medium",
        timeline: "1_month",
        is_completed: true,
        completed_at: daysAgo(4),
        sort_order: 6,
        created_at: daysAgo(7),
      },
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Pasang sistem penampungan air hujan",
        description:
          "Install tangki penampung air hujan 2000L untuk kebutuhan cuci dan siram tanaman. Dapat menghemat 40% penggunaan air PDAM.",
        category: "operations",
        priority: "low",
        estimated_impact: "medium",
        estimated_cost: "medium",
        timeline: "3_months",
        is_completed: false,
        completed_at: null,
        sort_order: 7,
        created_at: daysAgo(7),
      },
      // Policy (2 items)
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Daftarkan sertifikasi Eco-Label Indonesia",
        description:
          "Ajukan sertifikasi ramah lingkungan dari KLH. Persiapkan dokumen kebijakan, bukti implementasi, dan laporan dampak lingkungan.",
        category: "policy",
        priority: "high",
        estimated_impact: "high",
        estimated_cost: "medium",
        timeline: "6_months",
        is_completed: false,
        completed_at: null,
        sort_order: 8,
        created_at: daysAgo(7),
      },
      {
        roadmap_id: roadmapId,
        user_id: userId,
        title: "Program pelatihan keberlanjutan bulanan",
        description:
          "Adakan sesi pelatihan 1 jam per bulan untuk semua 12 karyawan tentang praktik ramah lingkungan: penghematan energi, pemilahan limbah, dan layanan pelanggan hijau.",
        category: "policy",
        priority: "medium",
        estimated_impact: "medium",
        estimated_cost: "free",
        timeline: "1_week",
        is_completed: false,
        completed_at: null,
        sort_order: 9,
        created_at: daysAgo(7),
      },
    ])

    if (itemsError) throw itemsError

    // 6. Insert chat conversations
    const conversationId2 = crypto.randomUUID()

    const { error: convError } = await supabase
      .from("chat_conversations")
      .insert([
        {
          id: conversationId,
          user_id: userId,
          title: "Strategi Pengurangan Limbah",
          created_at: daysAgo(5),
          updated_at: daysAgo(5),
        },
        {
          id: conversationId2,
          user_id: userId,
          title: "Berapa jejak karbon saya?",
          created_at: daysAgo(2),
          updated_at: daysAgo(2),
        },
      ])

    if (convError) throw convError

    // 7. Insert chat messages
    const { error: msgError } = await supabase.from("chat_messages").insert([
      {
        conversation_id: conversationId,
        user_id: userId,
        role: "user",
        content:
          "Halo, saya ingin mengurangi limbah plastik di warung saya. Sekarang kami masih banyak pakai plastik untuk bungkus makanan takeaway. Ada saran?",
        created_at: daysAgo(5),
      },
      {
        conversation_id: conversationId,
        user_id: userId,
        role: "assistant",
        content:
          "Bagus sekali inisiatif Anda! Untuk mengurangi plastik di takeaway, ada beberapa langkah yang bisa dilakukan:\n\n1. **Beralih ke kemasan biodegradable** - Gunakan kotak dari bagasse (ampas tebu) atau daun pisang untuk nasi bungkus. Harga hanya 15-20% lebih mahal dari styrofoam.\n\n2. **Program wadah sendiri** - Berikan diskon Rp 2.000-3.000 untuk pelanggan yang bawa wadah sendiri. Ini juga membangun loyalitas pelanggan.\n\n3. **Kurangi sedotan plastik** - Ganti dengan sedotan bambu atau kertas, atau tawarkan tanpa sedotan sebagai default.\n\nMana yang paling feasible untuk warung Anda saat ini?",
        created_at: daysAgo(5),
      },
      {
        conversation_id: conversationId,
        user_id: userId,
        role: "user",
        content:
          "Kalau kemasan biodegradable, supplier-nya di Bali ada yang terpercaya? Dan apakah food-grade?",
        created_at: daysAgo(5),
      },
      {
        conversation_id: conversationId,
        user_id: userId,
        role: "assistant",
        content:
          "Di Bali ada beberapa supplier kemasan ramah lingkungan yang sudah food-grade:\n\n1. **Bali Green Packaging** - Menyediakan kotak bagasse, mangkok PLA, dan kantong kertas kraft. Sudah sertifikasi BPOM untuk food contact.\n\n2. **EcoBali** - Selain jasa pengolahan limbah, mereka juga supply kemasan kompos. Bisa antar langsung ke area Denpasar.\n\n3. **AvaniEco** - Produk mereka dari singkong dan pati jagung, 100% compostable. Tersedia di Tokopedia juga untuk order kecil.\n\nUntuk warung dengan 12 karyawan, saya rekomendasikan mulai dengan order kecil (1 minggu stock) untuk uji coba, lalu bandingkan kualitas dan harga sebelum kontrak bulanan. Budget tambahan sekitar Rp 500.000-800.000/bulan untuk volume takeaway rata-rata warung kecil.",
        created_at: daysAgo(5),
      },
      {
        conversation_id: conversationId,
        user_id: userId,
        role: "user",
        content:
          "Terima kasih! Saya akan coba order dari AvaniEco dulu. Bagaimana cara mengukur pengurangan limbah plastik setelah beralih?",
        created_at: daysAgo(5),
      },
      {
        conversation_id: conversationId,
        user_id: userId,
        role: "assistant",
        content:
          "Cara mengukur pengurangan limbah plastik:\n\n**Metode Sederhana (Rekomendasi):**\n1. **Timbang sebelum** - Minggu ini, timbang semua plastik yang dibuang per hari. Catat rata-rata harian.\n2. **Timbang sesudah** - Setelah beralih ke AvaniEco, timbang lagi plastik yang tersisa.\n3. **Hitung persentase** - (Sebelum - Sesudah) / Sebelum x 100%\n\n**Tracking Tambahan:**\n- Catat jumlah pelanggan takeaway per hari\n- Hitung biaya kemasan lama vs baru\n- Foto dokumentasi untuk laporan keberlanjutan\n\n**Target Realistis:**\n- Bulan 1: Pengurangan 50% plastik takeaway\n- Bulan 3: Pengurangan 80%\n- Bulan 6: Warung bebas plastik sekali pakai\n\nAnda bisa input data ini di assessment berikutnya di Subak Hijau untuk melihat peningkatan skor keberlanjutan Anda!",
        created_at: daysAgo(5),
      },
      // Second conversation — demo of AI tool usage
      {
        conversation_id: conversationId2,
        user_id: userId,
        role: "user",
        content: "Berapa jejak karbon bisnis saya saat ini?",
        created_at: daysAgo(2),
      },
      {
        conversation_id: conversationId2,
        user_id: userId,
        role: "assistant",
        content:
          "Berdasarkan data assessment Warung Hijau Bali, berikut estimasi jejak karbon tahunan bisnis Anda:\n\n**Total: 2,620 kg CO₂/tahun**\n\n- Energi (PLN + Solar, 400 kWh/bulan): **1,872 kg** (71%)\n- Limbah (60 kg/bulan, composting): **72 kg** (3%)\n- Transportasi (sepeda): **0 kg** (0%)\n\nSetara dengan **119 pohon** per tahun untuk menyerap emisi ini.\n\nKabar baiknya, penggunaan panel surya dan sepeda sudah mengurangi emisi Anda secara signifikan! Jika Anda beralih sepenuhnya ke solar panel, emisi energi bisa turun dari 1,872 kg menjadi hanya **240 kg/tahun** — penghematan 87%.\n\nMau saya hitung potensi penghematan biaya juga?",
        created_at: daysAgo(2),
      },
    ])

    if (msgError) throw msgError

    return NextResponse.json({
      success: true,
      message: "Seed data inserted successfully",
      data: {
        assessments: 3,
        scores: 3,
        roadmap_items: 10,
        chat_conversations: 2,
        chat_messages: 8,
        certificate_token: certificateToken,
        verify_url: `/verify/${certificateToken}`,
      },
    })
  } catch (error) {
    logError("seed", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
