import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Force dynamic rendering for API routes
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerClient();

    if (!supabase) {
      // Return demo count if database not configured
      return NextResponse.json({ count: 247 });
    }

    const { count, error } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      // Return demo count if database fails
      return NextResponse.json({ count: 247 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Error fetching count:', error);
    // Return demo count as fallback
    return NextResponse.json({ count: 247 });
  }
}
