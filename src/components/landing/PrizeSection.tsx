'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const prizes = [
  {
    rank: 1,
    title: 'Juara 1',
    reward: '12 Bulan',
    desc: 'Grand Prize: Setahun penuh akses AI tanpa batas!',
    icon: Trophy,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/50',
    delay: 0.2
  },
  {
    rank: 2,
    title: 'Juara 2',
    reward: '9 Bulan',
    desc: 'Hampir setahun, cukup buat namatin semester.',
    icon: Medal,
    color: 'text-slate-300', // Silverish? Let's use darker gray for silver usually
    bg: 'bg-slate-300/10',
    border: 'border-slate-300/50',
    delay: 0.3
  },
  {
    rank: 3,
    title: 'Juara 3',
    reward: '6 Bulan',
    desc: 'Setengah tahun produktivitas maksimal.',
    icon: Medal,
    color: 'text-amber-700', // Bronze
    bg: 'bg-amber-700/10',
    border: 'border-amber-700/50',
    delay: 0.4
  },
  {
    rank: 4,
    title: 'Juara 4',
    reward: '3 Bulan',
    desc: 'Lumayan buat satu kuartal ngebut.',
    icon: Star,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    delay: 0.5
  },
  {
    rank: 5,
    title: 'Juara 5',
    reward: '1 Bulan',
    desc: 'Cicipin power AI sebulan gratis.',
    icon: Sparkles,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    delay: 0.6
  }
];

export default function PrizeSection() {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden" id="prizes">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
             <span className="w-12 h-[1px] bg-primary/20"></span>
             <span className="text-sm font-bold uppercase tracking-widest text-primary/60">Prize Pool</span>
             <span className="w-12 h-[1px] bg-primary/20"></span>
          </motion.div>
          
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="font-serif text-4xl md:text-5xl text-primary mb-4"
          >
            Total 5 Pemenang Beruntung
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-primary/60 max-w-2xl mx-auto"
          >
            Gak cuma satu yang menang. Kita bagi-bagi jatah buat 5 orang sekaligus.
            Makin niat jawaban lo, makin gokil hadiahnya!
          </motion.p>
        </div>

        {/* Top 3 Podium Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-0 mb-12">
            {/* Juara 2 (Left) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="w-full md:w-72 z-0 order-2 md:order-1"
            >
                <PrizeCard prize={prizes[1]} height="min-h-[300px]" />
            </motion.div>

            {/* Juara 1 (Center - Elevated) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.2 } }}
                className="w-full md:w-80 z-20 order-1 md:order-2"
            >
                <div className="relative group">
                    {/* Grand Prize Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 via-primary/5 to-yellow-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <PrizeCard prize={prizes[0]} isGrand height="min-h-[340px]" />
                </div>
            </motion.div>

            {/* Juara 3 (Right) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="w-full md:w-72 z-0 order-3 md:order-3"
            >
                <PrizeCard prize={prizes[2]} height="min-h-[300px]" />
            </motion.div>
        </div>
        
        {/* Bottom 2 Row */}
        <div className="flex flex-wrap justify-center gap-6">
             {prizes.slice(3, 5).map((prize, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="w-full md:w-64"
                >
                    <PrizeCard prize={prize} isSmall height="min-h-[260px]" />
                </motion.div>
             ))}
        </div>
      </div>
    </section>
  );
}

function PrizeCard({ prize, isGrand, isSmall, height }: { prize: any, isGrand?: boolean, isSmall?: boolean, height: string }) {
    return (
        <div className={`relative bg-white dark:bg-slate-900/40 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 border flex flex-col items-center text-center transition-all duration-300 h-full backdrop-blur-sm
            ${isGrand ? 'border-yellow-500/20 dark:border-yellow-500/30 shadow-2xl shadow-yellow-500/10 dark:shadow-yellow-500/20 min-h-[240px] md:min-h-[340px]' : 
              isSmall ? 'border-primary/5 dark:border-white/10 shadow-lg shadow-primary/5 dark:shadow-none min-h-[160px] md:min-h-[260px]' : 
              'border-primary/5 dark:border-white/10 shadow-xl shadow-primary/5 dark:shadow-none min-h-[200px] md:min-h-[300px]'}
        `}>
            {/* Floating Icon */}
            <div className={`absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-lg
                ${prize.rank === 1 ? 'bg-yellow-400 text-white' : 
                  prize.rank === 2 ? 'bg-slate-300 text-slate-600' : 
                  prize.rank === 3 ? 'bg-amber-600 text-white' : 
                  'bg-primary/5 dark:bg-white/10 text-primary dark:text-white'}
            `}>
                <prize.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>

            <div className="pt-2 md:pt-4 space-y-2 md:space-y-3 w-full flex-1 flex flex-col justify-center">
                <div>
                    <span className={`text-[10px] md:text-[10px] font-bold uppercase tracking-[0.2em] block mb-0.5 md:mb-1 ${prize.rank <= 3 ? prize.color : 'text-primary/40 dark:text-white/40'}`}>
                        {prize.title}
                    </span>
                    <h3 className={`font-serif leading-none text-primary dark:text-white ${isGrand ? 'text-4xl md:text-5xl' : isSmall ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'}`}>
                        {prize.reward}
                    </h3>
                </div>
                
                <div className="w-6 md:w-8 h-px bg-primary/10 dark:bg-white/10 mx-auto" />
                
                <p className={`text-primary/60 dark:text-white/60 font-medium leading-relaxed ${isSmall ? 'text-xs md:text-xs' : 'text-sm md:text-sm'}`}>
                    {prize.desc}
                </p>
            </div>
        </div>
    );
}
