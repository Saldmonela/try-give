'use client';


import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Video, Brain, HardDrive, Zap, Globe, MessageSquare, Terminal, Code2, Bot, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-primary/10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-medium">
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
             <span className="hidden sm:inline">Kembali ke Home</span>
             <span className="inline sm:hidden">Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-primary text-sm md:text-base">Google AI Pro</span>
            <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap">Deep Dive</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 md:mb-24 text-center space-y-4 md:space-y-6"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-primary leading-[1.1]">
              Ini Bukan <br /><span className="italic text-primary/60">Chatbot Biasa, Bro.</span>
            </h1>
            <p className="text-lg md:text-2xl text-primary/60 max-w-2xl mx-auto leading-relaxed">
              Google AI Pro (senilai <span className="text-primary font-bold">Rp 4 Jutaan/tahun</span>) itu asisten probadi lo buat ngerjain tugas, ngoding, sampe bikin konten. Gratis, khusus anak Kelas 32!
            </p>
          </motion.div>

          {/* 1. Core AI Capabilities */}
          <section id="gemini" className="mb-20 md:mb-32 scroll-mt-28">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h2 className="font-serif text-2xl md:text-4xl text-primary">Otak Di Balik Layar</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 md:p-8 bg-slate-50 rounded-3xl space-y-4 border border-slate-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Gemini 3 Pro
                </h3>
                <p className="text-primary/70 leading-relaxed text-sm md:text-base">
                  Otak paling encer dari Google. Dengan <strong>1 Juta Token Context</strong>, dia bisa baca satu buku tebel atau ribuan baris kode dalam sekejap. Riset skripsi? Sat set kelar.
                </p>
              </div>
              <div className="p-6 md:p-8 bg-slate-50 rounded-3xl space-y-4 border border-slate-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Dynamic Thinking
                </h3>
                <p className="text-primary/70 leading-relaxed text-sm md:text-base">
                  Mode jenius buat mecahin masalah susah. Pr matematika, logika algoritma, atau strategi bisnis? Dia bakal mikir dulu sebelum jawab, kayak punya dosen pribadi.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Content Creation */}
          <section id="veo" className="mb-20 md:mb-32 scroll-mt-28">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                <Video className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <h2 className="font-serif text-2xl md:text-4xl text-primary">Konten Kreator Mode</h2>
            </div>
            
            <div className="bg-[#0F172A] text-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/20 to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold">Veo 3.1: Video Instan</h3>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                    Tulisan lo berubah jadi video sinematik 1080p. Gak perlu jago ngedit, cukup jago berimajinasi.
                    <br/><br/>
                    <span className="flex items-center gap-2 text-white font-semibold">
                      <Check className="w-4 h-4 text-green-400" /> 3 Video Resolusi Tinggi / Hari
                    </span>
                    <span className="flex items-center gap-2 text-white font-semibold mt-2">
                      <Check className="w-4 h-4 text-green-400" /> Bisa Atur Gaya Kamera
                    </span>
                  </p>
                </div>
                <div className="space-y-6 md:space-y-8 md:border-l border-white/10 md:pl-12 pt-6 md:pt-0 border-t md:border-t-0">
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-purple-300">Image Generation</h4>
                    <p className="text-slate-400 text-sm md:text-base">Bikin 1,000 gambar per hari. Akurasinya ngeri, mirip foto asli.</p>
                  </div>
                   <div>
                    <h4 className="font-bold text-lg mb-2 text-purple-300">Slide & Audio</h4>
                    <p className="text-slate-400 text-sm md:text-base">Mager bikin PPT? AI ini bikinin 20 presentasi otomatis tiap hari.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Deep Research & Productivity */}
          <section id="research" className="mb-20 md:mb-32 scroll-mt-28">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <h2 className="font-serif text-2xl md:text-4xl text-primary">Joki Tugas Otomatis</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-6 md:p-8 border border-primary/10 rounded-3xl bg-secondary/5">
                <h3 className="text-xl md:text-2xl font-bold mb-4">Deep Research Agent</h3>
                <p className="text-primary/70 mb-6 text-base md:text-lg">
                  Lo tidur, dia kerja. Cari ratusan sumber, baca jurnal, terus bikinin <b>laporan lengkap</b>. Tinggal lo baca dikit, edit, kelar deh tugas kuliah.
                </p>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border shadow-sm text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  20 Laporan Mendalam / Bulan
                </div>
              </div>
              
              <div className="p-6 md:p-8 border border-primary/10 rounded-3xl bg-white space-y-4">
                 <h3 className="text-lg md:text-xl font-bold">NotebookLM Premium</h3>
                 <p className="text-sm text-primary/60">
                   Catatan kuliah lo jadi pinter. <br/>
                   <b>500 Notebooks</b> (vs 100 free) <br/>
                   <b>300 Sumber/Note</b>
                 </p>
              </div>

               <div className="p-6 md:p-8 border border-primary/10 rounded-3xl bg-white space-y-4">
                 <h3 className="text-lg md:text-xl font-bold">Integ. Workspace</h3>
                 <p className="text-sm text-primary/60">
                   Ada di <b>Docs, Gmail, Sheets, & Slides</b>. Mau nulis email formal atau rapiin data? Tinggal klik.
                 </p>
              </div>

              <div className="md:col-span-2 p-6 md:p-8 border border-primary/10 rounded-3xl bg-indigo-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                 <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-indigo-900">2TB Cloud Storage</h3>
                    <p className="text-indigo-800/70 text-sm md:text-base">Tempat lega buat backup file kuliah, foto dokumentasi, sampai project-project iseng. Gak usah pusing storage HP penuh.</p>
                 </div>
                 <HardDrive className="w-12 h-12 md:w-16 md:h-16 text-indigo-200" />
              </div>
            </div>
          </section>

          {/* New Section: Google Antigravity */}
          <section id="antigravity" className="mb-20 md:mb-32 scroll-mt-28">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                  <Terminal className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
               </div>
               <h2 className="font-serif text-2xl md:text-4xl text-primary">Google Antigravity</h2>
            </div>

            <div className="bg-gradient-to-br from-[#0b0f19] to-[#162032] text-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl">
               <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-pink-500/10 to-transparent pointer-events-none" />
               
               <div className="relative z-10">
                  <div className="max-w-3xl mb-12">
                     <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Codingan Lo <br/>
                        <span className="text-pink-400">Kelar Sendiri.</span>
                     </h3>
                     <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6">
                        Lupain copilot. <b>Google Antigravity</b> itu IDE Agent yang bisa lo suruh bikin aplikasi full-stack dari nol. Dia coding, dia debug, dia test. Lo tinggal ngopi sambil nunggu kelar.
                     </p>
                     <p className="text-pink-400 font-bold text-sm tracking-wide">
                        Fun Fact: Website ini 100% dibikin otomatis sama Google Antigravity. Keren gak?
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Bot className="w-8 h-8 text-pink-400 mb-4" />
                        <h4 className="font-bold text-lg mb-2">Full Autonomous</h4>
                        <p className="text-sm text-slate-400">Gak cuma autocompletion. Agent ini bisa plan, execute, dan fix error sendiri tanpa lo perlu ngetik satu baris pun.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Terminal className="w-8 h-8 text-blue-400 mb-4" />
                        <h4 className="font-bold text-lg mb-2">Terminal Control</h4>
                        <p className="text-sm text-slate-400">Dia bisa install package, running server, dan baca error log terminal buat benerin codingannya otomatis.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Code2 className="w-8 h-8 text-green-400 mb-4" />
                        <h4 className="font-bold text-lg mb-2">Multi-File Edit</h4>
                        <p className="text-sm text-slate-400">Bisa edit banyak file sekaligus. Bikin komponen, update CSS, dan benerin Logic backend dalam satu perintah.</p>
                     </div>
                  </div>

                  {/* Supported Models Badges */}
                  <div className="border-t border-white/10 pt-8">
                     <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Supported Models</p>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex flex-col gap-1">
                           <span className="text-blue-400 opacity-60 text-[10px] uppercase font-bold">Google</span>
                           Gemini 3 Pro (High/Low)
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex flex-col gap-1">
                           <span className="text-blue-300 opacity-60 text-[10px] uppercase font-bold">Google</span>
                           Gemini 3 Flash <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1 rounded inline-block w-fit">New</span>
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex flex-col gap-1">
                           <span className="text-purple-400 opacity-60 text-[10px] uppercase font-bold">Anthropic</span>
                           Claude Sonnet 4.5
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex flex-col gap-1">
                           <span className="text-purple-300 opacity-60 text-[10px] uppercase font-bold">Anthropic</span>
                           Claude Sonnet 4.5 (Thinking)
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex flex-col gap-1">
                           <span className="text-purple-200 opacity-60 text-[10px] uppercase font-bold">Anthropic</span>
                           Claude Opus 4.5 (Thinking)
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex flex-col gap-1">
                           <span className="text-green-400 opacity-60 text-[10px] uppercase font-bold">Open Source</span>
                           GPT-OSS 120B (Medium)
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* New Section: Nano Banana Pro */}
          <section id="nano-banana" className="mb-20 md:mb-32 scroll-mt-28">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-2xl flex items-center justify-center">
                  <Palette className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
               </div>
               <h2 className="font-serif text-2xl md:text-4xl text-primary">Nano Banana Pro</h2>
            </div>

            <div className="bg-[#1a1500] text-yellow-50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-yellow-500/20 shadow-2xl">
               <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-yellow-500/20 to-transparent pointer-events-none" />
               
               <div className="relative z-10">
                  <div className="max-w-3xl mb-12">
                     <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                        Bukan Sekadar Gambar. <br/>
                        <span className="text-yellow-400">Visual Pake Logika.</span>
                     </h3>
                     <p className="text-yellow-100/80 text-lg md:text-xl leading-relaxed mb-6">
                        <b>Nano Banana Pro</b> "mikir" dulu soal cahaya, tekstur, dan ruang sebelum mulai menggambar. Hasilnya? Visual yang masuk akal dan estetik banget. Bukan gambar AI yang aneh-aneh.
                     </p>
                     
                     <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-sm font-bold text-yellow-300">Native 2K Resolution</span>
                        <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-sm font-bold text-yellow-300">Flawless Text Rendering</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                     <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Brain className="w-8 h-8 text-yellow-400 mb-4" />
                        <h4 className="font-bold text-lg mb-2 text-white">Reasoning-Guided</h4>
                        <p className="text-sm text-yellow-100/60">AI merencanakan layout dan pencahayaan dulu secara internal (reasoning) baru dieksekusi pixel-by-pixel.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Check className="w-8 h-8 text-yellow-400 mb-4" />
                        <h4 className="font-bold text-lg mb-2 text-white">Consistent Character</h4>
                        <p className="text-sm text-yellow-100/60">Bisa bikin karakter yang sama persis di beda pose, baju, atau angle kamera. Cocok buat bikin cerita bergambar.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Sparkles className="w-8 h-8 text-yellow-400 mb-4" />
                        <h4 className="font-bold text-lg mb-2 text-white">Infographic & Text</h4>
                        <p className="text-sm text-yellow-100/60">Juaranya bikin poster atau mockup UI. Teks yang digenerate terbaca jelas, nggak <i>gibberish</i> lagi.</p>
                     </div>
                  </div>

                  {/* Examples Placeholder */}
                  <div className="border-t border-yellow-500/20 pt-8 mt-8">
                     <h4 className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-6">Generated by Nano Banana Pro</h4>
                     
                     {/* Image Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                           { src: '/images/nano-1.png', alt: 'Futuristic Cityscape' },
                           { src: '/images/nano-2.png', alt: 'Portrait of Cyborg' },
                           { src: '/images/nano-3.png', alt: 'Abstract Data Stream' }
                        ].map((img, i) => (
                           <div key={i} className="aspect-square bg-black/40 rounded-xl border border-yellow-500/30 relative overflow-hidden group">
                              <Image 
                                 src={img.src}
                                 alt={img.alt}
                                 fill
                                 className="object-cover transition-transform duration-700 group-hover:scale-110"
                                 unoptimized // Remove this if using real local images that are optimized
                              />
                           </div>
                        ))}
                     </div>

                  </div>
               </div>
            </div>
          </section>

          {/* 4. Comparison Table */}
          <section className="mb-20 md:mb-32">
             <div className="text-center mb-8 md:mb-12">
               <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Mending Mana?</h2>
               <p className="text-primary/60">Free Tier vs AI Pro (Gratisan buat Lo)</p>
             </div>

             {/* Fix: Table responsive wrapper */}
             <div className="rounded-3xl border border-primary/10 shadow-2xl overflow-hidden bg-white">
               <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white min-w-[600px]">
                 <thead>
                   <tr className="bg-secondary/20">
                     <th className="p-4 md:p-6 text-xs md:text-sm font-bold uppercase tracking-widest text-primary/50">Fitur</th>
                     <th className="p-4 md:p-6 text-xs md:text-sm font-bold uppercase tracking-widest text-primary/50">Free Tier</th>
                     <th className="p-4 md:p-6 text-xs md:text-sm font-bold uppercase tracking-widest text-primary bg-primary/5">AI Pro (Giveaway)</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-primary/5">
                   <tr>
                     <td className="p-4 md:p-6 font-semibold text-sm md:text-base">Context Window</td>
                     <td className="p-4 md:p-6 text-primary/60 text-sm md:text-base">32K tokens</td>
                     <td className="p-4 md:p-6 font-bold text-primary bg-primary/5 text-sm md:text-base">1 Juta Tokens 🔥</td>
                   </tr>
                   <tr>
                     <td className="p-4 md:p-6 font-semibold text-sm md:text-base">Antigravity Rate Limit</td>
                     <td className="p-4 md:p-6 text-primary/60 text-sm md:text-base">Standard (Weekly Reset)</td>
                     <td className="p-4 md:p-6 font-bold text-primary bg-primary/5 text-sm md:text-base">✅ High (5-Hour Reset)</td>
                   </tr>
                   <tr>
                     <td className="p-4 md:p-6 font-semibold text-sm md:text-base">Video Generation</td>
                     <td className="p-4 md:p-6 text-primary/60 text-sm md:text-base">❌ Tidak Tersedia</td>
                     <td className="p-4 md:p-6 font-bold text-primary bg-primary/5 text-sm md:text-base">✅ Veo 3.1 (3x/hari)</td>
                   </tr>
                    <tr>
                     <td className="p-4 md:p-6 font-semibold text-sm md:text-base">Deep Research</td>
                     <td className="p-4 md:p-6 text-primary/60 text-sm md:text-base">Terbatas</td>
                     <td className="p-4 md:p-6 font-bold text-primary bg-primary/5 text-sm md:text-base">✅ 20 Laporan/Bulan</td>
                   </tr>
                    <tr>
                     <td className="p-4 md:p-6 font-semibold text-sm md:text-base">Cloud Storage</td>
                     <td className="p-4 md:p-6 text-primary/60 text-sm md:text-base">15 GB</td>
                     <td className="p-4 md:p-6 font-bold text-primary bg-primary/5 text-sm md:text-base">✅ 2 TB (2.000 GB)</td>
                   </tr>
                    <tr>
                     <td className="p-4 md:p-6 font-semibold text-sm md:text-base">NotebookLM</td>
                     <td className="p-4 md:p-6 text-primary/60 text-sm md:text-base">100 Notebooks</td>
                     <td className="p-4 md:p-6 font-bold text-primary bg-primary/5 text-sm md:text-base">✅ 500 Notebooks</td>
                   </tr>
                 </tbody>
                </table>
               </div>
             </div>
          </section>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-[#0F172A] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden"
          >
            <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            
            <h2 className="relative z-10 font-serif text-3xl md:text-5xl text-white mb-8 leading-tight">
              Mau Ngerasain Powernya? <br className="hidden md:block"/>
              <span className="text-blue-400 block md:inline mt-2 md:mt-0">Gratis Banget Buat Lo.</span>
            </h2>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <Link href="/submit">
                <Button className="h-16 px-12 rounded-full text-xl font-bold bg-white text-[#0F172A] hover:bg-blue-50 hover:scale-105 transition-all shadow-xl">
                  Gas Daftar Sekarang 🚀
                </Button>
              </Link>
              <p className="text-slate-400 text-sm">Kesempatan terbatas untuk Kelas 32.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
