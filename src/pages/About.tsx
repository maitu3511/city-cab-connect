import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Star } from "lucide-react";
import astrologer from "@/assets/astrologer.png";

const About = () => (
  <PageLayout title="About Hrishi" subtitle="A devoted Vedic astrologer guiding souls toward clarity, purpose and prosperity.">
    <div className="container max-w-5xl">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative flex items-end justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-cosmic-violet/10 to-transparent rounded-[3rem] blur-3xl" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gold/30 blur-2xl rounded-full" />
          <img src={astrologer} alt="Hrishi - Vedic Astrologer" className="relative max-h-[560px] object-contain drop-shadow-[0_20px_40px_rgba(212,175,55,0.25)]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 text-cosmic-silver/80">
          <p className="text-lg leading-relaxed">With over <span className="text-gold font-semibold">15 years</span> of dedicated Vedic study, Hrishi blends ancient Jyotish wisdom with modern psychology to deliver consultations that are both spiritually deep and practically actionable.</p>
          <p>Trained under traditional gurus in Varanasi and Ujjain, Hrishi specialises in Kundli analysis, marriage compatibility, career guidance, Vastu and remedial gemology. Every reading is personalised — no generic predictions, only sacred truth.</p>
          <p>Thousands of clients across India, USA, UK, UAE and Australia trust Astro With Hrishi for life-changing guidance delivered with compassion and integrity.</p>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
        {[
          { Icon: Star, label: "15+ Years Experience" },
          { Icon: Heart, label: "10,000+ Happy Clients" },
          { Icon: Award, label: "Certified Vedic Master" },
          { Icon: Sparkles, label: "100% Confidential" },
        ].map(({ Icon, label }, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-gold rounded-2xl p-6 text-center">
            <Icon className="h-8 w-8 text-gold mx-auto mb-3" />
            <div className="text-sm text-cosmic-silver/85">{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default About;
