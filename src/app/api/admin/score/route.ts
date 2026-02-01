import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });
    }

    const supabase = createServerClient();
    if (!supabase) {
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // 1. Get submission data
    const { data: submission, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error || !submission) {
        return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // 2. Prepare prompt for Gemini
    const prompt = `
      Anda adalah "AI Evaluator" untuk program seleksi "Google AI Pro Giveaway". 
      Tugas Anda adalah menilai kelayakan kandidat berdasarkan jawaban essay mereka.

      Kriteria Penilaian:
      1. Kejelasan Motivasi (Seberapa kuat alasan mereka membutuhkan akses ini?)
      2. Potensi Dampak (Apakah mereka akan menggunakan AI untuk hal produktif/kreatif?)
      3. Konkretnya Rencana (Apakah mereka punya use case spesifik?)

      Berikan nilai antara 0-100. Nilai > 80 harus untuk jawaban yang sangat meyakinkan dan detail.
      Nilai < 50 untuk jawaban yang asal-asalan atau terlalu pendek.

      Data Kandidat:
      - Nama: ${submission.full_name}
      - Profesi/Role: (Ditebak dari jawaban)
      - Jawaban 1 (Motivasi): "${submission.answer_1}"
      - Jawaban 2 (Rencana): "${submission.answer_2}"
      - Jawaban 3 (Dampak): "${submission.answer_3}"

      Output WAJIB berupa JSON murni tanpa markdown, dengan format:
      {
        "score": number, // Judgement score 0-100
        "reasoning": "string" // Penjelasan singkat max 2 kalimat bahasa Indonesia yang persuasif.
      }
    `;

    // 3. Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    
    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    const responseText = result.response.text();
    let analysis;
    
    try {
        analysis = JSON.parse(responseText);
    } catch (e) {
        // Fallback cleanup if model returns markdown block
        const cleanJson = responseText.replace(/```json|```/g, '').trim();
        analysis = JSON.parse(cleanJson);
    }

    // 4. Update Database
    const { error: updateError } = await supabase
        .from('submissions')
        .update({
            ai_score: analysis.score,
            ai_reasoning: analysis.reasoning,
            status: 'reviewed' // Auto update status
        })
        .eq('id', id);

    if (updateError) {
        throw updateError;
    }

    return NextResponse.json({ 
        message: 'Analysis complete', 
        data: analysis 
    });

  } catch (error: any) {
    console.error('AI Score Error:', error);
    return NextResponse.json({ 
        error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
