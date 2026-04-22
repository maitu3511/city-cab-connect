import { motion } from "framer-motion";
import { Clock, Shield, IndianRupee, Timer } from "lucide-react";

const features = [
  { icon: Clock, title: "24/7 Service", desc: "Available round the clock, any day of the year." },
  { icon: Shield, title: "Experienced Drivers", desc: "Verified, trained and courteous professional drivers." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Transparent pricing with no hidden charges." },
  { icon: Timer, title: "On-time Pickup", desc: "We value your time. Always on schedule." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Why <span className="text-gradient">Choose Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-5"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
