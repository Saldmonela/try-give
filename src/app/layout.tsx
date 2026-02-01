import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google AI Pro Giveaway | Menangkan Akses Premium Gratis",
  description: "Ikuti giveaway Google AI Pro dan dapatkan akses premium ke AI terbaik dari Google. Jawab 3 pertanyaan sederhana untuk berkesempatan menang!",
  keywords: ["Google AI", "Gemini Pro", "Giveaway", "AI Premium", "Google AI Pro"],
  icons: {
    icon: '/logo.png', // Ganti dengan nama file lo di folder public
  },
  openGraph: {
    title: "Google AI Pro Giveaway | Menangkan Akses Premium Gratis",
    description: "Ikuti giveaway Google AI Pro dan dapatkan akses premium ke AI terbaik dari Google.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google AI Pro Giveaway",
    description: "Menangkan akses premium Google AI Pro gratis!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
