import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { submissionId } = await request.json();

    if (!submissionId) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const supabase = createServerClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    // Fetch the submission
    const { data: submission, error: fetchError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 503 });
    }

    // Generate AI score using Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Kamu adalah juri untuk giveaway Google AI Pro. Evaluasi jawaban berikut dan berikan skor 0-100 beserta alasan singkat.

Kriteria penilaian (Prioritaskan jawaban yang unik, lucu, dan out of the box):
1. Seberapa NIAT jawabannya (Panjang, detail, spesifik) - 40%
2. Seberapa KREATIF use case-nya (Unik, jarang kepikiran, bukan template) - 30%
3. Seberapa GOKIL alasannya (Lucu, menghibur, atau mind-blowing) - 30%

Nama: ${submission.full_name}

Pertanyaan 1: Kenapa kamu layak mendapatkan Google AI Pro?
Jawaban: ${submission.answer_1}

Pertanyaan 2: Apa yang akan kamu lakukan jika mendapat akses ini?
Jawaban: ${submission.answer_2}

Pertanyaan 3: Bagaimana Google AI Pro akan membantu project atau karir kamu?
Jawaban: ${submission.answer_3}

Berikan respons dalam format JSON seperti ini:
{
  "score": 85,
  "reasoning": "Penjelasan singkat mengapa skor ini diberikan dalam 2-3 kalimat"
}

Hanya berikan JSON, tanpa teks tambahan.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Parse the JSON response
    let aiScore = 0;
    let aiReasoning = '';

    try {
      // Clean the response (remove markdown code blocks if present)
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanedResponse);
      aiScore = Math.min(100, Math.max(0, parseInt(parsed.score, 10)));
      aiReasoning = parsed.reasoning || '';
    } catch {
      console.error('Failed to parse AI response:', response);
      aiScore = 50;
      aiReasoning = 'Auto-scoring failed. Manual review required.';
    }

    // Update the submission with AI score
    const { error: updateError } = await supabase
      .from('submissions')
      .update({
        ai_score: aiScore,
        ai_reasoning: aiReasoning,
      })
      .eq('id', submissionId);

    if (updateError) {
      console.error('Failed to update submission:', updateError);
      return NextResponse.json({ error: 'Failed to save AI score' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      score: aiScore,
      reasoning: aiReasoning,
    });
  } catch (error) {
    console.error('AI scoring error:', error);
    return NextResponse.json({ error: 'AI scoring failed' }, { status: 500 });
  }
}
