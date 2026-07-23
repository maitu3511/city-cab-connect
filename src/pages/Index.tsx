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
import MoneyBackGuaranteeSection from "@/components/MoneyBackGuaranteeSection";
import SEO from "@/components/SEO";

const Index = () => {
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
    </div>
  );
};

export default Index;
