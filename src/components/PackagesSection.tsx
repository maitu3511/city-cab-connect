import { motion } from "framer-motion";
import { MessageCircle, Check, Clock, Plane, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "919999999999";

const packages = [
  {
    icon: Clock,
    name: "Local Package",
    subtitle: "8 Hours / 80 KM",
    startingPrice: "₹1,499",
    includes: [
      "8 hours of travel time",
      "Up to 80 KM distance",
      "AC Sedan / Hatchback",
      "Fuel & driver charges included",
      "Extra KM @ ₹11/km",
      "Extra hour @ ₹150/hr",
    ],
  },
  {
    icon: Plane,
    name: "Airport Transfer",
    subtitle: "Pickup / Drop",
    startingPrice: "₹799",
    popular: true,
    includes: [
      "Airport pickup or drop",
      "Flight tracking included",
      "30 min free waiting time",
      "Meet & greet at terminal",
      "AC Sedan with boot space",
      "Toll & parking included",
    ],
  },
  {
    icon: MapPinned,
    name: "Outstation Trip",
    subtitle: "Per KM Basis",
    startingPrice: "₹9/km",
    includes: [
      "One-way & round trip available",
      "Minimum 250 KM/day",
      "Driver allowance included",
      "AC Sedan / SUV options",
      "Multiple city stops allowed",
      "Toll & state tax extra",
    ],
  },
];

const PackagesSection = () => {
  const handleBook = (packageName: string) => {
    const message = `Hi, I'm interested in the *${packageName}* package.\n\nPlease share details and availability.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="packages" className="py-16 sm:py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Popular <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Transparent pricing, no hidden charges. Pick a package and book instantly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-background border rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(48_100%_50%/0.1)] ${
                pkg.popular ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Best Value
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <pkg.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <p className="text-xs text-muted-foreground">{pkg.subtitle}</p>
                </div>
              </div>

              <div className="mb-5">
                <span className="text-3xl font-bold text-primary">{pkg.startingPrice}</span>
                <span className="text-sm text-muted-foreground ml-1">onwards</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => handleBook(pkg.name)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Book on WhatsApp
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
