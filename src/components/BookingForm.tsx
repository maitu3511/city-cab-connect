import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Send, User, Phone, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "919999999999";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passengers, setPassengers] = useState("");
  const [cabType, setCabType] = useState("");
  const [tripType, setTripType] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'd like to book a cab.\n\n👤 Name: ${name}\n📞 Phone: ${phone}${email ? `\n📧 Email: ${email}` : ""}\n👥 Passengers: ${passengers}\n🚗 Cab Type: ${cabType}\n🔄 Trip Type: ${tripType}\n\n📍 Pickup: ${pickup}\n📍 Drop: ${drop}\n📅 Date: ${date}\n⏰ Time: ${time}${notes ? `\n📝 Notes: ${notes}` : ""}`;
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
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 glow-primary space-y-6"
          >
            {/* Customer Details */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Customer Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                  <Input
                    placeholder="Full Name"
                    className="pl-10 bg-secondary border-border h-12"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="pl-10 bg-secondary border-border h-12"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                  <Input
                    type="email"
                    placeholder="Email (Optional)"
                    className="pl-10 bg-secondary border-border h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="pl-10 bg-secondary border-border h-12">
                      <SelectValue placeholder="Passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "Passenger" : "Passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Trip Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger className="bg-secondary border-border h-12">
                    <SelectValue placeholder="Trip Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Ride</SelectItem>
                    <SelectItem value="airport">Airport Transfer</SelectItem>
                    <SelectItem value="outstation-oneway">Outstation - One Way</SelectItem>
                    <SelectItem value="outstation-round">Outstation - Round Trip</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={cabType} onValueChange={setCabType}>
                  <SelectTrigger className="bg-secondary border-border h-12">
                    <SelectValue placeholder="Cab Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="innova">Innova / MUV</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>

            {/* Additional Notes */}
            <Textarea
              placeholder="Additional Notes (e.g., luggage details, special requests...)"
              className="bg-secondary border-border min-h-[80px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

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
