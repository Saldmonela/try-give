'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import { ThemeToggle } from '../ThemeToggle';

export default function HeroSection() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <span className="text-white dark:text-primary-foreground font-bold text-sm">G</span>
        </div>
        <span className="font-semibold tracking-tight text-primary">Google AI Pro</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-primary/60">
        <Link href="#benefits" className="hover:text-primary transition-colors">Manfaat</Link>
        <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
        <Link href="/features" className="hover:text-primary transition-colors text-purple-600 font-bold">Fitur Lengkap</Link>
        <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href="/submit">
          <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
            Daftar Sekarang
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export function HeroContent() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [deadline, setDeadline] = useState<Date>(new Date('2026-03-01T00:00:00+07:00')); // Default fallback to WIB

  useEffect(() => {
    // 1. Fetch Stats
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (typeof data.total === 'number') {
           setTotalUsers(data.total);
        }
      })
      .catch(err => console.error('Failed to fetch stats', err));

    // 2. Fetch Settings (Deadline)
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.giveaway_end_date) {
            // Admin saves as WIB (+07:00) converted to UTC.
            // So we just need to parse the UTC time back to a Date object.
            // Browser handles the conversion to local time for display, 
            // but the *difference* (countdown) remains correct for the absolute intended time.
            setDeadline(new Date(data.giveaway_end_date));
        }
      })
      .catch(err => console.error('Failed to fetch settings', err));
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-28 pb-32 bg-background border-b border-primary/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col items-center gap-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/40">
            Exclusive untuk Kelas 32
          </span>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/5 border border-pink-500/10">
             <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
             <span className="text-[10px] font-bold text-pink-500/60 uppercase tracking-widest">Built with Google Antigravity</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-[1.1] mb-8"
        >
          AI Canggih. Gratis. <br />
          <span className="italic font-normal">Khusus Buat Lo.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-primary mb-8 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Lupain cara lama ngerjain tugas. Dapatkan akses <span className="font-bold">Google AI Pro</span> (Senilai 4 Juta) GRATIS selama setahun. Cuma buat anak Kelas 32!
        </motion.p>
        
        {/* Countdown Timer Added Here */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.25 }}
           className="mb-12"
        >
          <CountdownTimer targetDate={deadline} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/submit">
            <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/10">
              Gas Daftar Sekarang 🚀
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                  <span className="text-[10px] font-bold">U{i}</span>
                </div>
              ))}
            </div>
            <span>+{totalUsers.toLocaleString()} orang udah join</span>
          </div>
        </motion.div>
      </div>

      {/* Ticker/Features wrap */}
      <div className="absolute bottom-10 left-0 right-0 overflow-hidden opacity-60">
        <div className="flex whitespace-nowrap gap-12 font-serif text-2xl italic text-primary/40 animate-infinite-scroll">
          <span>Gemini 3 Pro</span>
          <span>1M Token Context</span>
          <span>Veo 3.1 Video Gen</span>
          <span>Deep Research</span>
          <span>AI in Gmail/Docs</span>
          <span>NotebookLM Premium</span>
          <span>2TB Storage</span>
        </div>
      </div>
    </section>
  );
}
