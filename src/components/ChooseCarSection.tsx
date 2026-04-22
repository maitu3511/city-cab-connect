import { motion } from "framer-motion";
import { Users, MessageCircle, IndianRupee, Fuel, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import carHatchback from "@/assets/car-hatchback.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";

const WHATSAPP_NUMBER = "918460107287";

const cars = [
  {
    name: "Hatchback",
    examples: "WagonR, Swift, Celerio",
    image: carHatchback,
    seats: "4 Seater",
    price: "₹9/km",
    features: ["AC", "4 Seater", "Fuel Included", "Best for City Rides"],
    description: "Compact & budget-friendly. Perfect for solo travellers or small groups within the city.",
  },
  {
    name: "Sedan",
    examples: "Dzire, Etios, Aura",
    image: carSedan,
    seats: "4 Seater",
    price: "₹11/km",
    features: ["AC", "4 Seater", "Extra Boot Space", "Airport Ready"],
    description: "Comfortable & spacious. Ideal for airport transfers and business travel.",
    popular: true,
  },
  {
    name: "SUV / MUV",
    examples: "Ertiga, Innova, Marazzo",
    image: carSuv,
    seats: "6-7 Seater",
    price: "₹14/km",
    features: ["AC", "6-7 Seater", "Luggage Friendly", "Outstation Ready"],
    description: "Spacious & powerful. Best for family trips, group travel and outstation journeys.",
  },
];

const ChooseCarSection = () => {
  const handleBook = (carName: string) => {
    const message = `Hi, I want to book a *${carName}*.\n\nPlease share availability and pricing.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="cars" className="py-16 sm:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Choose Your <span className="text-gradient">Car</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select the perfect ride for your journey. All cars are well-maintained, clean & AC equipped.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cars.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(48_100%_50%/0.1)] ${
                car.popular ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
              }`}
            >
              {car.popular && (
                <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Car Image */}
              <div className="relative h-48 overflow-hidden bg-secondary/50">
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <span className="text-primary font-bold text-lg">{car.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">e.g., {car.examples}</p>
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{car.description}</p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {car.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                    >
                      {f === "AC" && <Snowflake className="inline h-3 w-3 mr-1 text-primary" />}
                      {(f.includes("Seater")) && <Users className="inline h-3 w-3 mr-1 text-primary" />}
                      {f.includes("Fuel") && <Fuel className="inline h-3 w-3 mr-1 text-primary" />}
                      {f}
                    </span>
                  ))}
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleBook(car.name)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Select & Book on WhatsApp
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseCarSection;
