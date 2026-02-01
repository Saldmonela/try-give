import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
    }
    
    // Fetch settings logic (assume ID=1 for config singleton)
    let { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is 'Row not found'
      console.error('Settings fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Default fallback if no settings row exists
    if (!data) {
        return NextResponse.json({
            giveaway_end_date: '2026-03-01T00:00:00Z',
            is_active: true
        });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body;
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database configuration missing' }, { status: 500 });
    }

    body = await request.json();
    
    // Only allow updating specific fields
    const { giveaway_end_date } = body;

    // First try to update
    const { data, error } = await supabase
      .from('settings')
      .update({ giveaway_end_date })
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Settings create/update error:', error);
    
    // Fallback: If row 1 doesn't exist, try to insert it (upsert logic if simple update failed strangely, 
    // or just handle error. Usually update on ID=1 fails only if row is missing). 
    // Let's try explicit upsert for safety.
    try {
        const supabase = createServerClient();
        if (!supabase) throw new Error('Database configuration missing');
        if (!body) throw new Error('Request body missing');

         const { data: upsertData, error: upsertError } = await supabase
            .from('settings')
            .upsert({ 
                id: 1, 
                giveaway_end_date: body.giveaway_end_date 
            })
            .select()
            .single();
            
         if (upsertError) throw upsertError;
         return NextResponse.json({ success: true, data: upsertData });
    } catch(retryErr) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
  }
}
