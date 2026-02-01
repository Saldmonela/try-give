'use client';

import { motion } from 'framer-motion';
import { Brain, Video, Search, Terminal, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const benefits = [
  {
    icon: Brain,
    title: 'Gemini 3 Pro: Otak Encer',
    description: 'Bukan sekadar chatbot. Dia bisa baca satu buku full hitungan detik, ngodingin tugas lo, sampe curhat colongan.',
    bg: 'bg-[#0F172A] dark:bg-black', // Deep Slate / Black
    titleColor: 'text-white',
    descColor: 'text-slate-300', 
    iconBg: 'bg-white/10',
    border: 'border-white/20',
    iconColor: 'text-white',
    image: 'https://placehold.co/800x600/0F172A/FFF?text=Gemini+AI',
    link: '/features#gemini'
  },
  {
    icon: Palette,
    title: 'Nano Banana: Visual Ajaib',
    description: 'Bikin gambar level studio animasi Pixar. Lighting, tekstur, resolusi—semuanya on point tanpa tapi.',
    bg: 'bg-[#181200] dark:bg-[#1a1500]', // Always Dark (Premium Feel)
    titleColor: 'text-yellow-50',
    descColor: 'text-yellow-100/80',
    iconBg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    image: 'https://placehold.co/800x600/FEFCE8/854D0E?text=Nano+Banana+Pro',
    link: '/features#nano-banana'
  },
  {
    icon: Video,
    title: 'Bikin Video Modal Ngetik',
    description: 'Pake Veo 3.1, lo ketik doang jadi video estetik. Presentasi auto-kelar, konten TikTok auto-FYP.',
    bg: 'bg-white dark:bg-slate-900',
    titleColor: 'text-slate-900 dark:text-white',
    descColor: 'text-slate-600 dark:text-slate-400',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-800',
    iconColor: 'text-slate-900 dark:text-white',
    image: 'https://placehold.co/800x600/FFF/000?text=Veo+Video',
    link: '/features#veo'
  },
  {
    icon: Search,
    title: 'Joki Riset Otomatis',
    description: 'Lo tidur, dia kerja. Cari ratusan sumber, baca jurnal, terus bikinin rangkuman rapi buat tugas kuliah lo.',
    bg: 'bg-[#F1F5F9] dark:bg-slate-800/30',
    titleColor: 'text-slate-900 dark:text-white',
    descColor: 'text-slate-600 dark:text-slate-400',
    iconBg: 'bg-white dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-700/50',
    iconColor: 'text-slate-900 dark:text-white',
    image: 'https://placehold.co/800x600/F1F5F9/000?text=Deep+Research',
    link: '/features#research'
  },
  {
    icon: Terminal,
    title: 'Codingan Lo Dibantuin AI',
    description: 'Lo nyuruh, dia ngoding full-stack. Debugging, testing, deploy? Beres. Lo tinggal terima jadi.',
    bg: 'bg-white dark:bg-slate-900',
    titleColor: 'text-slate-900 dark:text-white',
    descColor: 'text-slate-600 dark:text-slate-400',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-800',
    iconColor: 'text-slate-900 dark:text-white',
    image: 'https://placehold.co/800x600/FFF/000?text=Antigravity+IDE',
    link: '/features#antigravity'
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits">
      {benefits.map((benefit, index) => (
        <div key={index} className={`py-24 px-4 ${benefit.bg} transition-colors duration-300 border-none`}>
          <div className={`max-w-7xl mx-auto flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <div className={`w-14 h-14 rounded-full border ${benefit.border} ${benefit.iconBg} flex items-center justify-center`}>
                <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
              </div>
              <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl ${benefit.titleColor} leading-tight`}>
                {benefit.title}
              </h2>
              <p className={`text-lg md:text-xl ${benefit.descColor} leading-relaxed max-w-xl font-medium`}>
                {benefit.description}
              </p>
              <div className="pt-4">
                <Link href={benefit.link}>
                  <button className={`font-bold underline underline-offset-8 ${benefit.titleColor} hover:opacity-70 transition-opacity decoration-2`}>
                    Spill Detailnya
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full aspect-square md:aspect-video rounded-3xl overflow-hidden border dark:border-white/10 shadow-2xl relative group"
            >
                {/* Image Component */}
                <Image 
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized={benefit.image.startsWith('http')}
                />
                
                {/* Optional overlay gradient */}
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20" />
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
