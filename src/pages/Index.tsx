import { useState, useEffect } from "react";
import StarField from "@/components/StarField";
import CosmicNavbar from "@/components/CosmicNavbar";
import CosmicHero from "@/components/CosmicHero";
import AboutSection from "@/components/AboutSection";
import StatsStrip from "@/components/StatsStrip";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import CosmicFooter from "@/components/CosmicFooter";
import TrustSection from "@/components/TrustSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SplashLoader from "@/components/SplashLoader";
import GuaranteePopup from "@/components/GuaranteePopup";
import MoneyBackGuaranteeSection from "@/components/MoneyBackGuaranteeSection";
import SEO from "@/components/SEO";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Hard safety: always dismiss splash after 3s no matter what
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SEO
        title="Astro With Hrishi — Vedic Astrology & Spiritual Guidance"
        description="3+ years of authentic Vedic astrology. Personalized Kundli readings, marriage, career, and spiritual guidance from Astrologer Hrishi."
        path="/"
      />

      {/* Site is always mounted so it's visible even if the splash fails */}
      <StarField />
      <div className="relative z-10">
        <CosmicNavbar />
        <main>
          <CosmicHero />
          <AboutSection />
          <StatsStrip />
          <ServicesSection />
          <TrustSection />
          <MoneyBackGuaranteeSection />
          <TestimonialsSection />
          <BookingSection />
        </main>
        <CosmicFooter />
        <FloatingWhatsApp />
      </div>
      <GuaranteePopup />

      {showSplash && <SplashLoader onLoadComplete={() => setShowSplash(false)} />}
    </div>
  );
};

export default Index;
