import { motion } from "framer-motion";
import { Car, Plane, MapPinned } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Local Ride",
    description: "Comfortable city rides for daily commute, shopping, or any local travel within Ahmedabad.",
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Timely airport pickups and drops. We track your flight so you never have to worry.",
  },
  {
    icon: MapPinned,
    title: "Outstation Trips",
    description: "One-way or round trips to any destination. Affordable rates for long-distance travel.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Whether it's a quick local ride or a long journey, we've got you covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:glow-sm transition-shadow">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
