import HeroSection, { HeroContent } from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="relative selection:bg-primary selection:text-white">
      <HeroSection />
      <HeroContent />
      <BenefitsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
