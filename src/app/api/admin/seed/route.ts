import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Custom generator helpers since we might not have faker installed and want specific persona logic
const FIRST_NAMES = [
  'Aditya', 'Bayu', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hana', 'Indra', 'Joko',
  'Kartika', 'Lestari', 'Muhammad', 'Nur', 'Putri', 'Rizky', 'Sari', 'Tono', 'Utami', 'Vina',
  'Wahyu', 'Yulia', 'Zainal', 'Agus', 'Budi', 'Dian', 'Eka', 'Fitri', 'Gunawan', 'Hadi'
];

const LAST_NAMES = [
  'Pratama', 'Saputra', 'Wijaya', 'Santoso', 'Hidayat', 'Nugroho', 'Kusuma', 'Utama', 'Wibowo', 'Siregar',
  'Nasution', 'Lubis', 'Situmorang', 'Wahyuni', 'Lestari', 'Putra', 'Ramadhan', 'Kurniawan', 'Setiawan', 'Rahmawati',
  'Puspa', 'Permata', 'Suryani', 'Indrawati', 'Susanti', 'Mulya', 'Hakim', 'Firmansyah', 'Arifin', 'Fauzi'
];

const PERSONAS = [
  {
    role: 'Mahasiswa',
    q1_templates: [
      'Sebagai mahasiswa tingkat akhir jurusan {major}, saya butuh akses ke tools AI yang powerfull untuk membantu skripsi.',
      'Saya sedang menempuh pendidikan di {major} dan ingin mendalami machine learning lebih jauh.',
      'Biaya langganan tools AI cukup mahal bagi mahasiswa {major} seperti saya, padahal sangat dibutuhkan untuk riset.'
    ],
    q2_templates: [
      'Menggunakan Gemini Advanced untuk menganalisis {count} jurnal ilmiah dalam waktu singkat.',
      'Memanfaatkan fitur coding untuk membantu debug proyek {project} saya.',
      'Membuat rangkuman materi kuliah dan generate quiz untuk persiapan ujian.'
    ],
    q3_templates: [
      'Akan sangat membantu mempercepat kelulusan saya dengan kualitas riset yang lebih baik.',
      'Meningkatkan portofolio saya agar lebih siap bersaing di dunia kerja nanti.',
      'Saya bisa fokus ke pemahaman konsep daripada habis waktu untuk hal teknis manual.'
    ],
    majors: ['Teknik Informatika', 'Ilmu Komputer', 'Sastra Inggris', 'Manajemen', 'Psikologi', 'Desain Komunikasi Visual']
  },
  {
    role: 'Developer',
    q1_templates: [
      'Saya fullstack developer yang ingin integrasi AI ke aplikasi {app}.',
      'Sedang membangun startup {app} dan butuh model AI terbaik untuk backend.',
      'Ingin beralih karir menjadi AI Engineer dan butuh akses ke model SOTA.'
    ],
    q2_templates: [
      'Generate boilerplate code dan unit test untuk microservices.',
      'Refactoring legacy code base menggunakan context window yang besar.',
      'Eksperimen dengan fine-tuning model untuk kasus spesifik bahasa daerah.'
    ],
    q3_templates: [
      'Mempercepat cycle development produk saya hingga 50%.',
      'Membantu saya launch MVP lebih cepat dan validasi ide ke market.',
      'Meningkatkan kualitas code dan mengurangi bug di production.'
    ],
    apps: ['SaaS UMKM', 'E-learning', 'Health Tech', 'Fintech', 'AgriTech']
  },
  {
    role: 'Konten Kreator',
    q1_templates: [
      'Saya konten kreator di {platform} yang membahas teknologi dan produktivitas.',
      'Fokus saya adalah edukasi digital lewat video pendek di {platform}.',
      'Ingin meningkatkan kualitas visual konten saya namun terkendala hardware.'
    ],
    q2_templates: [
      'Pake Veo untuk bikin B-roll cinematic tanpa harus shooting lokasi.',
      'Brainstorming ide konten mingguan dan scripting otomatis.',
      'Analisis tren konten viral dengan data processing Gemini.'
    ],
    q3_templates: [
      'Bisa upload konten lebih rutin dengan kualitas yang konsisten.',
      'Engagement audience naik karena visual yang lebih menarik.',
      'Menghemat budget produksi video secara signifikan.'
    ],
    platforms: ['TikTok', 'YouTube', 'Instagram Reels']
  },
  {
    role: 'Freelancer',
    q1_templates: [
      'Bekerja sebagai freelance {job} dengan deadline yang ketat.',
      'Menangani 5-10 klien {job} sekaligus dan butuh asisten cerdas.',
      'Ingin scale up jasa {job} saya ke pasar internasional.'
    ],
    q2_templates: [
      'Otomatisasi draft awal laporan untuk klien.',
      'Translate dokumen teknis dengan akurasi tinggi.',
      'Membuat variasi desain/copywriting dalam hitungan detik.'
    ],
    q3_templates: [
      'Revenue saya bisa naik karena bisa handle lebih banyak klien.',
      'Kualitas deliverable ke klien jadi lebih premium.',
      'Work-life balance lebih baik karena kerjaan repetitif di-handle AI.'
    ],
    jobs: ['Copywriter', 'Translator', 'Virtual Assistant', 'Digital Marketer']
  }
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomName() {
  return `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`;
}

function generateRandomEmail(name: string) {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const suffix = Math.random() > 0.5 ? Math.floor(Math.random() * 999) : '';
  const domain = Math.random() > 0.8 ? 'students.ui.ac.id' : 'gmail.com';
  return `${cleanName}${suffix}@${domain}`;
}

function generateSubmission() {
  const persona = getRandomElement(PERSONAS);
  const name = generateRandomName();
  
  // Fill templates
  let a1 = getRandomElement(persona.q1_templates);
  let a2 = getRandomElement(persona.q2_templates);
  let a3 = getRandomElement(persona.q3_templates);

  // Replace placeholders if any
  if (persona.majors) a1 = a1.replace('{major}', getRandomElement(persona.majors));
  if (persona.apps) a1 = a1.replace('{app}', getRandomElement(persona.apps));
  if (persona.platforms) a1 = a1.replace('{platform}', getRandomElement(persona.platforms));
  if (persona.jobs) a1 = a1.replace('{job}', getRandomElement(persona.jobs));
  
  // Clean up remaining placeholders just in case
  a1 = a1.replace(/\{.*?\}/g, 'teknologi');
  a2 = a2.replace('{count}', Math.floor(Math.random() * 50 + 10).toString());
  a2 = a2.replace('{project}', 'Skripsi');

  // Randomize Status
  const rand = Math.random();
  let status = 'pending';
  let adminNotes = null;
  
  if (rand > 0.7) status = 'reviewed'; // 20%
  if (rand > 0.9) status = 'winner';   // 10%
  
  // AI Score (Normal distribution-ish)
  // Box-Muller transform for normal distribution
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = Math.random(); 
  
  // Scale to 45-98, skew higher slightly because applicants try hard
  const score = Math.floor(45 + (num * 53));

  // Date in last 14 days
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 14));

  return {
    full_name: name,
    gmail: generateRandomEmail(name),
    answer_1: a1,
    answer_2: a2,
    answer_3: a3,
    status: status,
    ai_score: Math.random() > 0.3 ? score : null, // 70% have scores
    ai_reasoning: Math.random() > 0.3 ? 'Kandidat menunjukkan pemahaman yang kuat tentang potensi AI.' : null,
    manual_score: status === 'winner' ? Math.floor(Math.random() * 4 + 7) : null, // 7-10 range (constraint 1-10)
    created_at: date.toISOString()
  };
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    const supabase = createServerClient();
    
    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    if (action === 'clear') {
       const { error } = await supabase.from('submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
       if (error) throw error;
       return NextResponse.json({ message: 'All data cleared' });
    }

    if (action === 'seed') {
       const submissions = Array.from({ length: 50 }, generateSubmission);
       const { error } = await supabase.from('submissions').insert(submissions);
       if (error) throw error;
       return NextResponse.json({ message: 'Seeded 50 entries', count: 50 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
