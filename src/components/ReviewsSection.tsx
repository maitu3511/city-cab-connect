import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Rajesh Kumar", text: "Excellent service! The driver was on time and very polite. Best cab service in the city.", city: "Indiranagar" },
  { name: "Priya Sharma", text: "I use their airport transfer regularly. Always punctual and the cars are clean and comfortable.", city: "Koramangala" },
  { name: "Amit Patel", text: "Affordable pricing and no hidden charges. Booked via WhatsApp and the cab arrived in 10 minutes!", city: "Whitefield" },
  { name: "Sneha Reddy", text: "Great outstation trip experience. The driver was professional and the ride was smooth throughout.", city: "HSR Layout" },
  { name: "Vikram Singh", text: "Reliable 24/7 service. Called at midnight and got a cab within 15 minutes. Highly recommended!", city: "MG Road" },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-2">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Customer <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-muted-foreground">Trusted by thousands of happy passengers.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-2xl p-6"
            >
              <Stars />
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">"{r.text}"</p>
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
