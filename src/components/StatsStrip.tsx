import { motion } from "framer-motion";
import CountUp from "./CountUp";

const stats = [
  { end: 15, suffix: "+", label: "Years of Practice" },
  { end: 10000, suffix: "+", label: "Lives Guided" },
  { end: 98, suffix: "%", label: "Satisfaction" },
  { end: 4.9, suffix: "★", label: "Average Rating" },
];

const StatsStrip = () => (
  <section className="relative py-16">
    <div className="container">
      <div className="glass-gold rounded-3xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-luxury">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-3xl sm:text-5xl font-bold text-gradient-gold">
              {s.end === 4.9 ? <span>4.9★</span> : <CountUp end={s.end} suffix={s.suffix} />}
            </div>
            <div className="text-xs uppercase tracking-widest text-cosmic-silver/70 mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsStrip;
