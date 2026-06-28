import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Star } from "lucide-react";
import astrologer from "@/assets/astrologer.jpg";

const About = () => (
  <PageLayout title="About Hrishi" subtitle="A devoted practitioner of Astrology & Numerology guiding souls toward clarity, purpose and prosperity.">
    <div className="container max-w-5xl">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 via-cosmic-violet/20 to-cosmic-blue/20 rounded-3xl blur-2xl" />
          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-luxury border border-gold/30">
            <img src={astrologer} alt="Hrishi - Astrology & Numerology Expert" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 text-cosmic-silver/80">
          <p className="text-lg leading-relaxed">With <span className="text-gold font-semibold">years of dedicated practice</span> in Astrology and Numerology, Hrishi combines ancient Vedic wisdom with modern numerological insights to deliver guidance that transforms lives.</p>
          <p>Specializing in Astrology, Numerology, Mobile Number Numerology, Name Numerology, Business Name Selection, Brand Name Numerology, Logo Guidance, and Complete Startup Consultation including Marketing Strategy, Business Planning, Financial Planning & P&L Sheet Guidance.</p>
          <p>Every consultation is personalized with care and delivered with integrity. From individual numerology corrections to complete business consultations, every session brings clarity and actionable guidance.</p>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
        {[
          { Icon: Star, label: "500+ Consultations" },
          { Icon: Heart, label: "Satisfied Clients" },
          { Icon: Award, label: "Certified Expert" },
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
