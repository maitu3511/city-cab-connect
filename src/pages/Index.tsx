import StarField from "@/components/StarField";
import CosmicNavbar from "@/components/CosmicNavbar";
import CosmicHero from "@/components/CosmicHero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import CosmicFooter from "@/components/CosmicFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField />
      <div className="relative z-10">
        <CosmicNavbar />
        <main>
          <CosmicHero />
          <AboutSection />
          <ServicesSection />
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
