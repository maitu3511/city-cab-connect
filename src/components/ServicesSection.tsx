import { motion } from "framer-motion";
import {
  ScrollText, Heart, Users, Briefcase, TrendingUp, Hash,
  Home, Gem, Sparkles, Compass, MessageCircle, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "918460107287";

const services = [
  { icon: ScrollText, title: "Kundli Reading", desc: "In-depth birth chart analysis revealing your life's blueprint, dashas & cosmic purpose.", price: "₹1,500", benefits: ["Detailed birth chart", "Dasha predictions", "Remedial guidance"] },
  { icon: Heart, title: "Marriage Consultation", desc: "Compatibility analysis, muhurat selection & guidance for a harmonious matrimonial life.", price: "₹2,500", benefits: ["Kundli matching", "Auspicious timing", "Relationship insights"] },
  { icon: Users, title: "Relationship Guidance", desc: "Resolve conflicts and deepen emotional bonds through astrological insights.", price: "₹2,000", benefits: ["Synastry analysis", "Conflict resolution", "Love forecasts"] },
  { icon: Briefcase, title: "Career Astrology", desc: "Discover your ideal profession, growth windows & career-defining transits.", price: "₹2,000", benefits: ["Career direction", "Job change timing", "Success periods"] },
  { icon: TrendingUp, title: "Business Astrology", desc: "Strategic guidance for startups, partnerships, expansions & financial decisions.", price: "₹3,500", benefits: ["Business muhurat", "Partner compatibility", "Growth planning"] },
  { icon: Hash, title: "Numerology", desc: "Decode the vibrational power of your name & numbers for prosperity.", price: "₹1,200", benefits: ["Name analysis", "Lucky numbers", "Brand naming"] },
  { icon: Home, title: "Vastu Consultation", desc: "Align your home or workspace with cosmic energy for peace & prosperity.", price: "₹3,000", benefits: ["Layout analysis", "Energy correction", "Without demolition"] },
  { icon: Gem, title: "Gemstone Guidance", desc: "Personalized gemstone recommendations based on your unique planetary chart.", price: "₹1,500", benefits: ["Stone selection", "Wearing rituals", "Authentic sourcing"] },
  { icon: Compass, title: "Horoscope Analysis", desc: "Annual & monthly forecasts to navigate opportunities and challenges ahead.", price: "₹1,800", benefits: ["Yearly outlook", "Monthly transits", "Action plans"] },
  { icon: Sparkles, title: "Spiritual Guidance", desc: "Personalized sadhana, mantras & rituals to elevate your spiritual journey.", price: "₹2,500", benefits: ["Mantra diksha", "Daily practices", "Soul awakening"] },
];

const ServicesSection = () => {
  const bookOnWhatsApp = (service: string) => {
    const msg = `Namaste Hrishi ji, I'd like to book a ${service} consultation. Please share availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Aurora glow */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cosmic-purple/10 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass-gold mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-gold">
              Premium Services
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Sacred Consultations for{" "}
            <span className="text-gradient-gold">Every Life Path</span>
          </h2>
          <div className="gold-divider w-32 mx-auto mb-6" />
          <p className="text-cosmic-silver/75">
            From birth charts to gemstone guidance — every service is a doorway to clarity,
            crafted with classical precision and personalized devotion.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold/40 via-cosmic-purple/30 to-cosmic-blue/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />

              <div className="relative glass rounded-2xl p-7 h-full flex flex-col hover:border-gold/40 transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold/20 blur-2xl group-hover:bg-gold/40 transition-all" />
                    <div className="relative h-14 w-14 rounded-xl glass-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                      <s.icon className="h-7 w-7 text-gold" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-cosmic-silver/50">From</div>
                    <div className="font-display text-2xl text-gradient-gold font-bold">{s.price}</div>
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-cosmic-silver/70 mb-5 leading-relaxed">{s.desc}</p>

                <ul className="space-y-1.5 mb-6 flex-1">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-cosmic-silver/80">
                      <Sparkles className="h-3 w-3 text-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-gradient-gold text-primary-foreground hover:opacity-90"
                  >
                    <a href="#booking">
                      Book <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold/10 px-3"
                    onClick={() => bookOnWhatsApp(s.title)}
                    aria-label={`WhatsApp ${s.title}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
