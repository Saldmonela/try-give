// Types for Google AI Pro Giveaway

export type SubmissionStatus = 'pending' | 'reviewed' | 'winner';

export interface Submission {
  id: string;
  full_name: string;
  gmail: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  ai_score: number | null;
  ai_reasoning: string | null;
  manual_score: number | null;
  admin_notes: string | null;
  status: SubmissionStatus;
  created_at: string;
}

export interface GiveawaySettings {
  id: number;
  giveaway_end_date: string;
  is_active: boolean;
  total_slots: number;
}

export interface SubmissionFormData {
  full_name: string;
  gmail: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
}

export interface AIScoreResult {
  score: number;
  reasoning: string;
}

export interface SubmissionStats {
  total: number;
  pending: number;
  reviewed: number;
  winners: number;
  average_ai_score: number;
}
