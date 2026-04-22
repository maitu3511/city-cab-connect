import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import ChooseCarSection from "@/components/ChooseCarSection";
import PackagesSection from "@/components/PackagesSection";
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
      <ChooseCarSection />
      <PackagesSection />
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
