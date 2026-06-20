import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles, Gem, BookOpen, Flame, ScrollText, FileText, Package,
  Bell, MessageCircle, Mail, Clock,
} from "lucide-react";
import { toast } from "sonner";

const ZODIAC = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const CATEGORIES = [
  { icon: Sparkles, name: "Rudraksha Collection", desc: "Sacred beads for spiritual energy" },
  { icon: Gem, name: "Gemstones", desc: "Certified planetary gemstones" },
  { icon: ScrollText, name: "Yantras", desc: "Powerful sacred geometry" },
  { icon: BookOpen, name: "Astrology Books", desc: "Ancient wisdom in print" },
  { icon: Flame, name: "Spiritual Products", desc: "Pooja essentials & more" },
  { icon: FileText, name: "Digital Reports", desc: "Personalised PDF reports" },
  { icon: Package, name: "Pooja Kits", desc: "Complete ritual kits" },
];

const Shop = () => {
  const [email, setEmail] = useState("");

  const notifyWhatsApp = () => {
    window.open(
      waLink("Namaste Hrishi ji, please notify me when the Astro Shop launches. 🙏"),
      "_blank"
    );
  };

  const notifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list! We'll notify you at launch ✨");
    setEmail("");
  };

  return (
    <PageLayout>
      <SEO
        title="Shop — Coming Soon · Astro With Hrishi"
        description="A curated cosmic shop of Rudraksha, gemstones, yantras and spiritual products — launching soon."
        path="/shop"
      />

      <section className="relative min-h-[80vh] overflow-hidden pt-20">
        {/* Floating zodiac glyphs */}
        <div className="absolute inset-0 pointer-events-none">
          {ZODIAC.map((g, i) => (
            <motion.span
              key={i}
              className="absolute text-gold/20 font-display text-4xl sm:text-6xl select-none"
              style={{
                left: `${(i * 83) % 95}%`,
                top: `${(i * 47) % 85}%`,
              }}
              animate={{ y: [0, -20, 0], rotate: [0, 8, 0], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {g}
            </motion.span>
          ))}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cosmic-purple/20 blur-[100px]" />
        </div>

        <div className="container relative z-10 py-12">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-6">
              <Clock className="h-3.5 w-3.5 text-gold animate-pulse" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold">Launching Soon</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-6">
              The <span className="text-gradient-gold">Cosmic Shop</span>
              <br />
              <span className="font-serif italic text-3xl sm:text-5xl text-cosmic-silver/85 font-normal">
                is arriving
              </span>
            </h1>

            <p className="text-base sm:text-lg text-cosmic-silver/80 leading-relaxed mb-10">
              A curated collection of sacred Rudraksha, certified gemstones, powerful yantras and
              authentic spiritual essentials — handpicked by Astro Hrishi. Be the first to know.
            </p>

            {/* Notify form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-gold rounded-3xl p-6 sm:p-8 max-w-xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-4 text-gold">
                <Bell className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.25em]">Notify Me at Launch</span>
              </div>
              <form onSubmit={notifyEmail} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/60 border-gold/30 focus:border-gold"
                />
                <Button
                  type="submit"
                  className="bg-gradient-gold text-primary-foreground font-semibold glow-gold"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Notify Me
                </Button>
              </form>
              <div className="my-4 flex items-center gap-3 text-xs text-cosmic-silver/50">
                <div className="flex-1 h-px bg-gold/20" />
                or
                <div className="flex-1 h-px bg-gold/20" />
              </div>
              <Button
                onClick={notifyWhatsApp}
                variant="outline"
                className="w-full border-gold/40 text-gold hover:bg-gold/10"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Get WhatsApp Updates
              </Button>
            </motion.div>
          </motion.div>

          {/* Upcoming categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
                A glimpse of what's coming
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold">
                Sacred Collections
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {CATEGORIES.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative glass-gold rounded-2xl p-6 group overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/25 transition-all" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 glow-gold">
                      <c.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-gold mb-1">
                      {c.name}
                    </h3>
                    <p className="text-sm text-cosmic-silver/70">{c.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold/70">
                      <Clock className="h-3 w-3" /> Coming soon
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Shop;
