import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { gmail } = await request.json();

    if (!gmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createServerClient();

    if (!supabase) {
      return NextResponse.json({ exists: false });
    }

    const { data } = await supabase
      .from('submissions')
      .select('id')
      .eq('gmail', gmail.toLowerCase())
      .single();

    return NextResponse.json({ exists: !!data });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ exists: false });
  }
}
