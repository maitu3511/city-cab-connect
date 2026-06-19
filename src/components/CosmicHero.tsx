import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import zodiacWheel from "@/assets/zodiac-wheel.png";

import cosmicBg from "@/assets/cosmic-hero.jpg";

const WHATSAPP_NUMBER = "918460107287";

const CosmicHero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Galaxy backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={cosmicBg}
          alt="Cosmic galaxy with zodiac constellations"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Floating zodiac wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute right-[-6%] bottom-0 sm:right-[-2%] lg:right-[4%] w-[360px] h-[460px] sm:w-[460px] sm:h-[580px] lg:w-[560px] lg:h-[700px] z-10 pointer-events-none hidden md:block"
      >
        <div className="absolute inset-0 rounded-full bg-gold/15 blur-[100px] animate-pulse-glow" />
        <img
          src={zodiacWheel}
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 top-0 w-full opacity-30 animate-spin-slower"
        />
        <div className="absolute inset-[6%] rounded-full border border-gold/15 animate-spin-slow" />
        <img
          src={astrologer}
          alt="Astrologer Hrishi"
          className="relative w-full h-full object-contain object-bottom drop-shadow-[0_30px_60px_hsl(43_78%_58%/0.45)]"
        />
      </motion.div>

      <div className="container relative z-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold animate-twinkle" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold">
              Vedic Astrologer · 15+ Years Experience
            </span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Unlock Your{" "}
            <span className="text-gradient-gold">Cosmic Destiny</span>
            <br />
            <span className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-cosmic-silver/90 font-normal">
              with Astro Hrishi
            </span>
          </h1>

          <p className="text-base sm:text-lg text-cosmic-silver/80 mb-10 max-w-xl leading-relaxed">
            Discover ancient Vedic wisdom blended with modern insight. Personalized
            Kundli readings, life-changing guidance & spiritual clarity — delivered
            with the precision of the stars.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-gold text-primary-foreground font-semibold text-base px-8 py-6 glow-gold hover:scale-105 transition-transform"
              asChild
            >
              <a href="#booking">
                <Sparkles className="mr-2 h-5 w-5" />
                Book Consultation
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/10 text-base px-8 py-6"
              onClick={() =>
                window.open(
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Namaste Hrishi ji, I'd like to know more about your astrology consultations."
                  )}`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-xl"
          >
            {[
              { num: "15+", label: "Years" },
              { num: "10K+", label: "Clients" },
              { num: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl text-gradient-gold font-bold">
                  {s.num}
                </div>
                <div className="text-xs uppercase tracking-widest text-cosmic-silver/60 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-gold/60 hover:text-gold"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
};

export default CosmicHero;
