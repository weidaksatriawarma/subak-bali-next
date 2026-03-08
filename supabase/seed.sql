-- Subak Hijau Seed Data
-- =====================
-- Replace 'REPLACE_WITH_USER_ID' with your actual auth.users UUID.
-- You can find it in Supabase Dashboard > Authentication > Users.
--
-- Usage:
--   1. Copy this file content
--   2. Go to Supabase Dashboard > SQL Editor
--   3. Replace all 'REPLACE_WITH_USER_ID' with your user UUID
--   4. Run the query

-- Clean existing data for this user
DELETE FROM chat_messages WHERE user_id = 'REPLACE_WITH_USER_ID';
DELETE FROM chat_conversations WHERE user_id = 'REPLACE_WITH_USER_ID';
DELETE FROM roadmap_items WHERE user_id = 'REPLACE_WITH_USER_ID';
DELETE FROM roadmaps WHERE user_id = 'REPLACE_WITH_USER_ID';
DELETE FROM scores WHERE user_id = 'REPLACE_WITH_USER_ID';
DELETE FROM assessments WHERE user_id = 'REPLACE_WITH_USER_ID';

-- Update profile
UPDATE profiles SET
  business_name = 'Warung Hijau Bali',
  industry = 'fnb',
  business_size = 'small',
  employee_count = 12,
  location = 'Denpasar, Bali',
  description = 'Warung makan tradisional Bali yang berkomitmen pada praktik bisnis berkelanjutan dan ramah lingkungan.',
  updated_at = now()
WHERE id = 'REPLACE_WITH_USER_ID';

-- Assessments
INSERT INTO assessments (id, user_id, status, energy_source, monthly_electricity_kwh, uses_energy_efficient_equipment, waste_management, plastic_reduction_efforts, waste_volume_kg_monthly, local_sourcing_percentage, supplier_sustainability_check, packaging_type, water_conservation, digital_operations, transportation_type, has_sustainability_policy, employee_sustainability_training, community_engagement, created_at, updated_at) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'completed', 'diesel_generator', 800, false, 'none', false, 200, 10, false, 'single_use_plastic', false, false, 'gasoline', false, false, false, now() - interval '90 days', now() - interval '90 days'),
  ('a0000001-0000-0000-0000-000000000002', 'REPLACE_WITH_USER_ID', 'completed', 'pln_only', 600, true, 'segregation', true, 120, 40, false, 'recyclable', true, false, 'hybrid', true, false, false, now() - interval '45 days', now() - interval '45 days'),
  ('a0000001-0000-0000-0000-000000000003', 'REPLACE_WITH_USER_ID', 'completed', 'pln_solar', 400, true, 'composting', true, 60, 75, true, 'biodegradable', true, true, 'bicycle', true, true, true, now() - interval '7 days', now() - interval '7 days');

-- Scores
INSERT INTO scores (id, user_id, assessment_id, total_score, energy_score, waste_score, supply_chain_score, operations_score, policy_score, ai_summary, industry_benchmark, created_at) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'a0000001-0000-0000-0000-000000000001', 35, 20, 15, 30, 45, 40, 'Bisnis Anda masih dalam tahap awal keberlanjutan. Penggunaan genset diesel dan tidak adanya pengelolaan limbah menjadi area utama yang perlu diperbaiki. Rekomendasi: mulai dengan beralih ke PLN dan terapkan pemilahan sampah dasar.', 45, now() - interval '90 days'),
  ('b0000001-0000-0000-0000-000000000002', 'REPLACE_WITH_USER_ID', 'a0000001-0000-0000-0000-000000000002', 55, 50, 55, 45, 65, 60, 'Kemajuan yang baik! Peralihan ke PLN dan pemilahan limbah menunjukkan komitmen nyata. Persentase sourcing lokal meningkat ke 40%. Langkah selanjutnya: eksplorasi panel surya dan tingkatkan kemitraan dengan supplier lokal.', 48, now() - interval '45 days'),
  ('b0000001-0000-0000-0000-000000000003', 'REPLACE_WITH_USER_ID', 'a0000001-0000-0000-0000-000000000003', 72, 75, 70, 65, 80, 70, 'Warung Hijau Bali menunjukkan transformasi luar biasa! Penggunaan panel surya, pengomposan limbah, dan 75% bahan baku lokal menempatkan bisnis Anda di atas rata-rata industri F&B. Fokus selanjutnya: sertifikasi hijau dan program pelatihan karyawan berkelanjutan.', 48, now() - interval '7 days');

-- Roadmap
INSERT INTO roadmaps (id, user_id, score_id, title, ai_generated_content, created_at) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'b0000001-0000-0000-0000-000000000003', 'Roadmap Keberlanjutan - Warung Hijau Bali', '{"generated_at": "2026-02-28T00:00:00Z", "model": "claude-sonnet-4-20250514"}', now() - interval '7 days');

-- Roadmap Items
INSERT INTO roadmap_items (roadmap_id, user_id, title, description, category, priority, estimated_impact, estimated_cost, timeline, is_completed, completed_at, sort_order, created_at) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Optimalkan penggunaan panel surya', 'Lakukan audit energi untuk memaksimalkan output panel surya yang sudah terpasang. Pastikan panel bersih dan tidak terhalang. Target: 60% kebutuhan listrik dari surya.', 'energy', 'high', 'high', 'low', '1_month', true, now() - interval '3 days', 0, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Ganti peralatan dapur ke model hemat energi', 'Investasi pada kompor induksi dan kulkas berperingkat energi A. Penghematan listrik hingga 30% per bulan dengan ROI dalam 12 bulan.', 'energy', 'medium', 'high', 'high', '6_months', false, NULL, 1, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Bangun area kompos terstruktur', 'Buat area pengomposan khusus dengan 3 bak rotasi untuk limbah organik dapur. Kompos yang dihasilkan bisa digunakan untuk kebun herbal warung.', 'waste', 'high', 'high', 'medium', '1_month', true, now() - interval '5 days', 2, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Program zero-waste untuk sisa makanan', 'Kerjasama dengan bank makanan lokal untuk menyalurkan makanan berlebih. Implementasi sistem porsi yang lebih akurat untuk mengurangi food waste 50%.', 'waste', 'medium', 'medium', 'free', '3_months', false, NULL, 3, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Perluas jaringan supplier lokal ke 85%', 'Identifikasi 3-5 petani lokal tambahan di radius 20km untuk pasokan sayur, bumbu, dan protein. Buat kontrak langsung tanpa perantara.', 'supply_chain', 'high', 'high', 'low', '3_months', false, NULL, 4, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Audit keberlanjutan supplier utama', 'Kunjungi dan evaluasi 5 supplier utama menggunakan checklist keberlanjutan. Prioritaskan supplier yang menggunakan praktik pertanian organik.', 'supply_chain', 'low', 'medium', 'free', '1_month', true, now() - interval '2 days', 5, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Implementasi sistem POS digital', 'Beralih dari nota kertas ke sistem POS digital untuk mengurangi penggunaan kertas dan meningkatkan tracking inventori secara real-time.', 'operations', 'medium', 'medium', 'medium', '1_month', true, now() - interval '4 days', 6, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Pasang sistem penampungan air hujan', 'Install tangki penampung air hujan 2000L untuk kebutuhan cuci dan siram tanaman. Dapat menghemat 40% penggunaan air PDAM.', 'operations', 'low', 'medium', 'medium', '3_months', false, NULL, 7, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Daftarkan sertifikasi Eco-Label Indonesia', 'Ajukan sertifikasi ramah lingkungan dari KLH. Persiapkan dokumen kebijakan, bukti implementasi, dan laporan dampak lingkungan.', 'policy', 'high', 'high', 'medium', '6_months', false, NULL, 8, now() - interval '7 days'),
  ('c0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Program pelatihan keberlanjutan bulanan', 'Adakan sesi pelatihan 1 jam per bulan untuk semua 12 karyawan tentang praktik ramah lingkungan: penghematan energi, pemilahan limbah, dan layanan pelanggan hijau.', 'policy', 'medium', 'medium', 'free', '1_week', false, NULL, 9, now() - interval '7 days');

-- Chat Conversation
INSERT INTO chat_conversations (id, user_id, title, created_at, updated_at) VALUES
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'Strategi Pengurangan Limbah', now() - interval '5 days', now() - interval '5 days');

-- Chat Messages
INSERT INTO chat_messages (conversation_id, user_id, role, content, created_at) VALUES
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'user', 'Halo, saya ingin mengurangi limbah plastik di warung saya. Sekarang kami masih banyak pakai plastik untuk bungkus makanan takeaway. Ada saran?', now() - interval '5 days'),
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'assistant', E'Bagus sekali inisiatif Anda! Untuk mengurangi plastik di takeaway, ada beberapa langkah yang bisa dilakukan:\n\n1. **Beralih ke kemasan biodegradable** - Gunakan kotak dari bagasse (ampas tebu) atau daun pisang untuk nasi bungkus. Harga hanya 15-20% lebih mahal dari styrofoam.\n\n2. **Program wadah sendiri** - Berikan diskon Rp 2.000-3.000 untuk pelanggan yang bawa wadah sendiri. Ini juga membangun loyalitas pelanggan.\n\n3. **Kurangi sedotan plastik** - Ganti dengan sedotan bambu atau kertas, atau tawarkan tanpa sedotan sebagai default.\n\nMana yang paling feasible untuk warung Anda saat ini?', now() - interval '5 days' + interval '1 minute'),
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'user', 'Kalau kemasan biodegradable, supplier-nya di Bali ada yang terpercaya? Dan apakah food-grade?', now() - interval '5 days' + interval '2 minutes'),
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'assistant', E'Di Bali ada beberapa supplier kemasan ramah lingkungan yang sudah food-grade:\n\n1. **Bali Green Packaging** - Menyediakan kotak bagasse, mangkok PLA, dan kantong kertas kraft. Sudah sertifikasi BPOM untuk food contact.\n\n2. **EcoBali** - Selain jasa pengolahan limbah, mereka juga supply kemasan kompos. Bisa antar langsung ke area Denpasar.\n\n3. **AvaniEco** - Produk mereka dari singkong dan pati jagung, 100% compostable. Tersedia di Tokopedia juga untuk order kecil.\n\nUntuk warung dengan 12 karyawan, saya rekomendasikan mulai dengan order kecil (1 minggu stock) untuk uji coba, lalu bandingkan kualitas dan harga sebelum kontrak bulanan. Budget tambahan sekitar Rp 500.000-800.000/bulan untuk volume takeaway rata-rata warung kecil.', now() - interval '5 days' + interval '3 minutes'),
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'user', 'Terima kasih! Saya akan coba order dari AvaniEco dulu. Bagaimana cara mengukur pengurangan limbah plastik setelah beralih?', now() - interval '5 days' + interval '4 minutes'),
  ('d0000001-0000-0000-0000-000000000001', 'REPLACE_WITH_USER_ID', 'assistant', E'Cara mengukur pengurangan limbah plastik:\n\n**Metode Sederhana (Rekomendasi):**\n1. **Timbang sebelum** - Minggu ini, timbang semua plastik yang dibuang per hari. Catat rata-rata harian.\n2. **Timbang sesudah** - Setelah beralih ke AvaniEco, timbang lagi plastik yang tersisa.\n3. **Hitung persentase** - (Sebelum - Sesudah) / Sebelum x 100%\n\n**Tracking Tambahan:**\n- Catat jumlah pelanggan takeaway per hari\n- Hitung biaya kemasan lama vs baru\n- Foto dokumentasi untuk laporan keberlanjutan\n\n**Target Realistis:**\n- Bulan 1: Pengurangan 50% plastik takeaway\n- Bulan 3: Pengurangan 80%\n- Bulan 6: Warung bebas plastik sekali pakai\n\nAnda bisa input data ini di assessment berikutnya di Subak Hijau untuk melihat peningkatan skor keberlanjutan Anda!', now() - interval '5 days' + interval '5 minutes');
