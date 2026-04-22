import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-cab.jpg";

const WHATSAPP_NUMBER = "919999999999";
const PHONE_NUMBER = "+919999999999";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Premium cab service" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
            ⭐ Rated 4.9/5 by 2,000+ Happy Customers
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
            Book Your Cab{" "}
            <span className="text-gradient">in Minutes</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg">
            Fast, Reliable & Affordable Cab Service in [City]. Available 24/7 for local rides, airport transfers & outstation trips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 animate-pulse-glow"
              onClick={() =>
                window.open(
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to book a cab.")}`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Book on WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/40 text-primary hover:bg-primary/10"
              asChild
            >
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
