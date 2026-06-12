import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Hrishi ji's Kundli reading was breathtakingly accurate. He predicted my career shift months before it happened. Truly a master of his craft.",
  },
  {
    name: "Rohan Mehta",
    location: "Ahmedabad",
    rating: 5,
    text: "The marriage consultation gave us such clarity. His remedies brought peace to our family. I cannot thank him enough.",
  },
  {
    name: "Anjali Desai",
    location: "Surat",
    rating: 5,
    text: "Business astrology session transformed my decision-making. I expanded my startup at the exact muhurat he suggested — pure magic.",
  },
  {
    name: "Vikram Patel",
    location: "Vadodara",
    rating: 5,
    text: "His gemstone guidance changed everything. Within months I felt mental clarity I hadn't in years. Truly divine guidance.",
  },
  {
    name: "Neha Joshi",
    location: "Delhi",
    rating: 5,
    text: "The vastu consultation for our new home brought harmony we didn't know was missing. Hrishi ji is patient, kind & deeply knowledgeable.",
  },
  {
    name: "Arjun Kapoor",
    location: "Pune",
    rating: 5,
    text: "Career astrology helped me pivot to my dream role. Every prediction unfolded exactly as he said. Forever grateful.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass-gold mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-gold">
              Voices of Transformation
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Stories Written in the{" "}
            <span className="text-gradient-gold">Stars</span>
          </h2>
          <div className="gold-divider w-32 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="glass rounded-2xl p-7 relative hover:border-gold/40 transition-colors"
            >
              <Quote className="absolute top-5 right-5 h-10 w-10 text-gold/15" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-cosmic-silver/85 leading-relaxed mb-6 font-serif text-lg italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                <div className="h-11 w-11 rounded-full bg-gradient-gold flex items-center justify-center font-display font-bold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-cosmic-silver/60">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
