import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsSection from "@/components/ReviewsSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import StickyCTAs from "@/components/StickyCTAs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookingForm />
      <ServicesSection />
      <WhyChooseUs />
      <ReviewsSection />
      <MapSection />
      <Footer />
      <StickyCTAs />
    </div>
  );
};

export default Index;
