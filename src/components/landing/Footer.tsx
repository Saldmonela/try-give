'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/5 py-24 px-4 text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-semibold tracking-tight">Google AI Pro Giveaway</span>
              </div>
              <p className="text-primary/60 max-w-xs text-sm leading-relaxed">
                Bantu anak muda berbakat akses teknologi Google paling canggih. Biar masa depan lo makin cerah, gak suram.
              </p>
          </div>
          
          <div className="space-y-4 text-sm">
             <h4 className="font-bold uppercase tracking-wider text-xs">Menu</h4>
             <ul className="space-y-2 opacity-60">
                <li><Link href="#benefits" className="hover:opacity-100 transition-opacity">Apa Untungnya</Link></li>
                <li><Link href="#faq" className="hover:opacity-100 transition-opacity">QnA / Kepo</Link></li>
                <li><Link href="/features" className="hover:opacity-100 transition-opacity">Fitur Dewa</Link></li>
             </ul>
          </div>

          <div className="space-y-4 text-sm">
             <h4 className="font-bold uppercase tracking-wider text-xs">Penting</h4>
             <ul className="space-y-2 opacity-60">
                <li><Link href="/submit" className="hover:opacity-100 transition-opacity">Daftar Sekarang</Link></li>
                <li><Link href="/admin" className="hover:opacity-100 transition-opacity">Ruang Admin</Link></li>
             </ul>
          </div>

          <div className="space-y-4 text-sm">
             <h4 className="font-bold uppercase tracking-wider text-xs">Sosial</h4>
             <ul className="space-y-2 opacity-60">
                <li><Link href="#" className="hover:opacity-100 transition-opacity">LinkedIn</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Twitter / X</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition-opacity">Facebook</Link></li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-primary/30">
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <p>© 2026. DIBUAT DENGAN CINTA & ANTIGRAVITY.</p>
              <p className="text-pink-500/50">Dibikin Pake Google Antigravity</p>
           </div>
           <div className="flex gap-8">
              <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privasi</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
