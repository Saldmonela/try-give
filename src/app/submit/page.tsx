'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { submissionSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type FormData = z.infer<typeof submissionSchema>;

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [announcementDate, setAnnouncementDate] = useState('...');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.giveaway_end_date) {
            const date = new Date(data.giveaway_end_date);
            setAnnouncementDate(date.toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      full_name: '',
      gmail: '',
      answer_1: '',
      answer_2: '',
      answer_3: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Check if email already exists
      const checkRes = await fetch('/api/submissions/check-email', {
        method: 'POST',
        body: JSON.stringify({ gmail: data.gmail }),
      });
      const { exists } = await checkRes.json();

      if (exists) {
        toast.error('Email ini udah pernah dipake daftar, bro. Coba yang lain.');
        setIsSubmitting(false);
        return;
      }

      // Submit form
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSuccess(true);
        window.scrollTo(0, 0);
      } else {
        toast.error('Waduh, ada error pas kirim. Coba lagi ya.');
      }
    } catch (error) {
      toast.error('Gagal ngirim data. Cek koneksi lo deh.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8 p-12 bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 dark:border-white/10 shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div className="space-y-4">
            <h1 className="font-serif text-4xl text-primary dark:text-white">Mantap, Masuk! 🎉</h1>
            <p className="text-primary/60 dark:text-white/60 text-lg">
              Jawaban lo udah kesimpen aman. Pemenang bakal diumumin via IG Story Kelas tanggal {announcementDate}. Pantengin terus!
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="w-full h-14 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
              Balik ke Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/30 dark:bg-slate-950 pb-24">
      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2 text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Balik
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <span className="text-white dark:text-primary-foreground font-bold text-[10px]">G</span>
          </div>
          <span className="font-bold text-sm tracking-tight text-primary dark:text-white">APPLICATION FORM</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 pt-12">
        <div className="mb-16">
           <h1 className="font-serif text-5xl md:text-6xl text-primary dark:text-white mb-6">Giveaway Form 🚀</h1>
           <p className="text-primary/60 dark:text-white/60 text-lg max-w-xl leading-relaxed">
             Isi jawaban lo se-kreatif dan se-jujur mungkin. Jawaban bakal dinilai sama AI + Tim Juri. Jangan kaku-kaku amat, santai aja!
           </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 bg-white dark:bg-slate-900/50 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-primary/5 dark:border-white/10 shadow-2xl shadow-primary/5 dark:shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label htmlFor="full_name" className="text-xs font-bold uppercase tracking-widest text-primary/40 dark:text-white/40">Nama Lengkap</Label>
              <Input 
                id="full_name" 
                {...form.register('full_name')}
                placeholder="Misal: Budi Santoso"
                className="h-14 bg-secondary/20 dark:bg-slate-800/50 border-transparent focus:border-primary/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-lg dark:text-white dark:placeholder:text-slate-500"
              />
              {form.formState.errors.full_name && (
                <p className="text-red-500 text-xs italic">{form.formState.errors.full_name.message}</p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="gmail" className="text-xs font-bold uppercase tracking-widest text-primary/40 dark:text-white/40">Akun Gmail</Label>
              <Input 
                id="gmail" 
                type="email"
                {...form.register('gmail')}
                placeholder="Misal: budi@gmail.com"
                className="h-14 bg-secondary/20 dark:bg-slate-800/50 border-transparent focus:border-primary/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-lg dark:text-white dark:placeholder:text-slate-500"
              />
              {form.formState.errors.gmail && (
                <p className="text-red-500 text-xs italic">{form.formState.errors.gmail.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4 border-t border-primary/5 dark:border-white/10 pt-12">
            <div className="flex justify-between items-end mb-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary/40 dark:text-white/40 italic">Pertimbangan 01</Label>
            </div>
            <p className="text-primary dark:text-white font-medium text-xl">Kenapa lo harus dapet akses ini?</p>
            <Textarea 
              {...form.register('answer_1')}
              placeholder="Ceritain motivasi lo, jangan jawaban template ChatGPT ya..."
              className="min-h-[150px] bg-secondary/20 dark:bg-slate-800/50 border-transparent focus:border-primary/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-lg leading-relaxed pt-4 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-4 border-t border-primary/5 dark:border-white/10 pt-12">
            <div className="flex justify-between items-end mb-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary/40 dark:text-white/40 italic">Pertimbangan 02</Label>
            </div>
            <p className="text-primary dark:text-white font-medium text-xl">Mau dipake buat apa emang?</p>
            <Textarea 
              {...form.register('answer_2')}
              placeholder="Sebutin project atau tugas spesifik yang bakal lo kerjain..."
              className="min-h-[150px] bg-secondary/20 dark:bg-slate-800/50 border-transparent focus:border-primary/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-lg leading-relaxed pt-4 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-4 border-t border-primary/5 dark:border-white/10 pt-12">
            <div className="flex justify-between items-end mb-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary/40 dark:text-white/40 italic">Pertimbangan 03</Label>
            </div>
            <p className="text-primary dark:text-white font-medium text-xl">Seberapa ngaruh buat hidup lo?</p>
            <Textarea 
              {...form.register('answer_3')}
              placeholder="Bakal bikin IPK naik? Atau bikin portofolio keren? Ceritain!..."
              className="min-h-[150px] bg-secondary/20 dark:bg-slate-800/50 border-transparent focus:border-primary/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-lg leading-relaxed pt-4 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-16 rounded-full text-xl font-medium bg-primary text-primary-foreground hover:scale-[1.02] transition-all disabled:opacity-50 shadow-2xl shadow-primary/20 dark:shadow-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Lagi ngirim...
              </>
            ) : (
              'Kirim Jawaban Gue 🚀'
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
