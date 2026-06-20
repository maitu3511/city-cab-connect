import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Star } from "lucide-react";
import astrologer from "@/assets/astrologer.jpg";

const About = () => (
  <PageLayout title="About Hrishi" subtitle="A devoted Vedic astrologer guiding souls toward clarity, purpose and prosperity.">
    <div className="container max-w-5xl">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 via-cosmic-violet/20 to-cosmic-blue/20 rounded-3xl blur-2xl" />
          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-luxury border border-gold/30">
            <img src={astrologer} alt="Hrishi - Vedic Astrologer" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 text-cosmic-silver/80">
          <p className="text-lg leading-relaxed">With over <span className="text-gold font-semibold">3 years</span> of dedicated Vedic study, Hrishi blends ancient Jyotish wisdom with modern psychology to deliver consultations that are both spiritually deep and practically actionable.</p>
          <p>Trained under traditional gurus in Varanasi and Ujjain, Hrishi specialises in Kundli analysis, marriage compatibility, career guidance, Vastu and remedial gemology. Every reading is personalised — no generic predictions, only sacred truth.</p>
          <p>Thousands of clients across India, USA, UK, UAE and Australia trust Astro With Hrishi for life-changing guidance delivered with compassion and integrity.</p>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
        {[
          { Icon: Star, label: "3+ Years Experience" },
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
