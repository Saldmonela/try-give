import { z } from 'zod';

export const submissionSchema = z.object({
  full_name: z
    .string()
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  gmail: z
    .string()
    .email('Format email tidak valid')
    .refine(
      (email) => email.toLowerCase().endsWith('@gmail.com'),
      'Harus menggunakan email Gmail (@gmail.com)'
    ),
  answer_1: z
    .string()
    .min(10, 'Jawaban terlalu pendek')
    .max(1000, 'Jawaban maksimal 1000 karakter'),
  answer_2: z
    .string()
    .min(10, 'Jawaban terlalu pendek')
    .max(1000, 'Jawaban maksimal 1000 karakter'),
  answer_3: z
    .string()
    .min(10, 'Jawaban terlalu pendek')
    .max(1000, 'Jawaban maksimal 1000 karakter'),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const manualScoreSchema = z.object({
  manual_score: z.number().min(1).max(10),
  admin_notes: z.string().optional(),
});
