import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { submissionSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET - List all submissions (for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search');

    const supabase = createServerClient();

    if (!supabase) {
      return NextResponse.json({ submissions: [] });
    }

    let query = supabase
      .from('submissions')
      .select('*')
      .order(sortBy, { ascending: sortOrder === 'asc' });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,gmail.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }

    return NextResponse.json({ submissions: data });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper to get IP address
function getIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

// POST - Create new submission
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ipAddress = getIp(request);

    // Validate input
    const validationResult = submissionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { full_name, gmail, answer_1, answer_2, answer_3 } = validationResult.data;

    const supabase = createServerClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    // --- Rate Limiting Check ---
    // Check submissions from this IP in the last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    
    const { count, error: countError } = await supabase
      .from('submissions')
      .select('id', { count: 'exact', head: true })
      .eq('ip_address', ipAddress)
      .gte('created_at', fifteenMinutesAgo);

    if (countError) {
      console.error('Rate limit check error:', countError);
      // Fail open (allow submission) if db check fails, or fail closed? Let's fail open but log.
    } else if (count !== null && count >= 3) {
      return NextResponse.json(
        { error: 'Sabar bro! Lo udah submit 3 kali barusan. Tunggu 15 menit ya.' },
        { status: 429 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('submissions')
      .select('id')
      .eq('gmail', gmail.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Insert new submission
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        full_name,
        gmail: gmail.toLowerCase(),
        answer_1,
        answer_2,
        answer_3,
        status: 'pending',
        ip_address: ipAddress, // Save IP
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
