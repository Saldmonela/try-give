'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Siapa aja yang boleh ikutan?',
    answer: 'Siapapun yang punya Gmail aktif dan tercatat sebagai siswa Kelas 32. Pemenangnya dipilih yang jawabannya paling niat, kreatif, dan gokil.',
  },
  {
    question: 'Dapet fitur Deep Research juga gak?',
    answer: 'Pastinya dong. Lo dapet jatah 20 Deep Research per bulan plus 1 Juta Token di Gemini 3 Pro. Tugas riset auto beres sambil merem.',
  },
  {
    question: 'Hadiahnya tahan berapa lama?',
    answer: 'Tergantung lo juara berapa! Juara 1 dapet 12 Bulan Full. Juara 2 (9 Bulan), Juara 3 (6 Bulan), Juara 4 (3 Bulan), dan Juara 5 (1 Bulan). Mayan banget kan buat hemat uang jajan.',
  },
  {
    question: 'Kalo menang taunya dari mana?',
    answer: 'Cek email Gmail lo. Kita bakal kirim notifikasi sakti ke sana. Jadi pastiin email yang lo daftarin beneran aktif ya!',
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-32 px-4 bg-background border-t border-primary/5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-tight sticky top-32"
          >
            Masih Bingung? <br/>
            <span className="italic opacity-60">Sini Gue Jelasin.</span>
          </motion.h2>
        </div>
        
        <div className="flex-[1.5]">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-primary/10 overflow-hidden"
              >
                <AccordionTrigger className="text-xl font-medium text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-primary/60 text-lg leading-relaxed pb-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
