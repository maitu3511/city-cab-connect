import { motion } from "framer-motion";
import { Sparkles, Bell, ShoppingBag } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const ZODIAC = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

const Shop = () => {
  const waLink = `https://wa.me/919558565655?text=${encodeURIComponent(
    "Hi Astro Hrishi, please notify me when the Shop launches ✨"
  )}`;

  return (
    <PageLayout>
      <SEO
        title="Shop · Coming Soon — Astro With Hrishi"
        description="Our luxury spiritual store — Rudraksha, Gemstones, Yantras & more — is launching soon. Join the waitlist on WhatsApp."
        path="/shop"
      />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Floating zodiac glyphs */}
        <div className="absolute inset-0 pointer-events-none">
          {ZODIAC.map((z, i) => (
            <motion.span
              key={i}
              className="absolute text-4xl sm:text-5xl text-gold/20 font-display"
              style={{
                left: `${(i * 83) % 95 + 2}%`,
                top: `${(i * 47) % 85 + 5}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              {z}
            </motion.span>
          ))}
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />

        <div className="container relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full glass-gold mb-8 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-gold/40 border-dashed"
            />
            <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-gold" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-xs uppercase tracking-[0.25em] text-gold mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Launching Soon
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-gradient-gold mb-6"
          >
            Coming Soon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-cosmic-silver/80 text-lg sm:text-xl max-w-xl mx-auto mb-3"
          >
            Our sacred spiritual store is being blessed with the cosmic touch.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-cosmic-silver/60 max-w-lg mx-auto mb-10"
          >
            Certified Rudraksha, natural Gemstones, energised Yantras, healing Crystals & more — arriving very soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 glow-gold">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Bell className="h-4 w-4 mr-2" />
                Notify Me on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gold/40 text-gold hover:bg-gold/10">
              <a href="/booking">Book a Consultation</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center justify-center gap-8 text-xs uppercase tracking-[0.2em] text-cosmic-silver/50"
          >
            <span>✦ Lab Certified</span>
            <span>✦ Energised</span>
            <span>✦ Authentic</span>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Shop;
