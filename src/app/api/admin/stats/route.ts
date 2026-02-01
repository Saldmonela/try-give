import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerClient();

    if (!supabase) {
      return NextResponse.json({
        total: 0,
        pending: 0,
        reviewed: 0,
        winners: 0,
        averageAiScore: 0,
      });
    }

    // Get total submissions
    const { count: total } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true });

    // Get count by status
    const { count: pending } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: reviewed } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'reviewed');

    const { count: winners } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'winner');

    // Get average AI score
    const { data: avgData } = await supabase
      .from('submissions')
      .select('ai_score')
      .not('ai_score', 'is', null);

    let averageAiScore = 0;
    if (avgData && avgData.length > 0) {
      const sum = avgData.reduce((acc, curr) => acc + (curr.ai_score || 0), 0);
      averageAiScore = Math.round(sum / avgData.length);
    }

    return NextResponse.json({
      total: total || 0,
      pending: pending || 0,
      reviewed: reviewed || 0,
      winners: winners || 0,
      averageAiScore,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({
      total: 0,
      pending: 0,
      reviewed: 0,
      winners: 0,
      averageAiScore: 0,
    });
  }
}
