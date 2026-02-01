-- Google AI Pro Giveaway Database Schema
-- Run this in your Supabase SQL Editor

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  gmail TEXT UNIQUE NOT NULL,
  answer_1 TEXT NOT NULL,
  answer_2 TEXT NOT NULL,
  answer_3 TEXT NOT NULL,
  ai_score INTEGER,
  ai_reasoning TEXT,
  manual_score INTEGER CHECK (manual_score >= 1 AND manual_score <= 10),
  admin_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'winner')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  giveaway_end_date TIMESTAMPTZ NOT NULL DEFAULT '2026-02-28T23:59:59Z',
  is_active BOOLEAN DEFAULT true,
  total_slots INTEGER DEFAULT 10
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_submissions_gmail ON submissions(gmail);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_ai_score ON submissions(ai_score DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_ip_address ON submissions(ip_address);

-- Insert default settings
INSERT INTO settings (id, giveaway_end_date, is_active, total_slots)
VALUES (1, '2026-02-28T23:59:59Z', true, 10)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (optional but recommended)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (for API routes)
CREATE POLICY "Service role can do everything on submissions" ON submissions
  FOR ALL USING (true);

CREATE POLICY "Service role can do everything on settings" ON settings
  FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON submissions TO service_role;
GRANT ALL ON settings TO service_role;
