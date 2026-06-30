import { useState } from "react";
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
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Track visitor automatically
  useEffect(() => {
    const trackVisitor = async () => {
      const TRACK_KEY = "awh-visitor-tracked";
      if (localStorage.getItem(TRACK_KEY)) return;

      try {
        await supabase.from("visitor_leads").insert({
          full_name: "Website Visitor",
          mobile_number: new Date().toISOString().slice(0, 10),
          city: navigator.language || "Unknown",
          interested_service: "Homepage Visit",
        });
        localStorage.setItem(TRACK_KEY, "true");
      } catch {
        // Silent fail
      }
    };
    if (!loading) trackVisitor();
  }, [loading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SEO title="Astro With Hrishi — Vedic Astrology & Spiritual Guidance" description="3+ years of authentic Vedic astrology. Personalized Kundli readings, marriage, career, and spiritual guidance from Astrologer Hrishi." path="/" />

      {loading && <SplashLoader onLoadComplete={() => setLoading(false)} />}

      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Index;
