import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WHATSAPP_NUMBER = "919999999999";

const BookingForm = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'd like to book a cab.\n\n📍 Pickup: ${pickup}\n📍 Drop: ${drop}\n📅 Date: ${date}\n⏰ Time: ${time}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="booking" className="py-16 sm:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Quick <span className="text-gradient">Booking</span>
            </h2>
            <p className="text-muted-foreground">
              Fill in your details and we'll connect with you on WhatsApp instantly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 glow-primary space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                <Input
                  placeholder="Pickup Location"
                  className="pl-10 bg-secondary border-border h-12"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                <Input
                  placeholder="Drop Location"
                  className="pl-10 bg-secondary border-border h-12"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                <Input
                  type="date"
                  className="pl-10 bg-secondary border-border h-12"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                <Input
                  type="time"
                  className="pl-10 bg-secondary border-border h-12"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full text-lg py-6">
              <Send className="mr-2 h-5 w-5" />
              Book via WhatsApp
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
