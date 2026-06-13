import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Calendar, Clock, Sparkles, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "918460107287";

const services = [
  "Kundli Reading", "Marriage Consultation", "Relationship Guidance",
  "Career Astrology", "Business Astrology", "Numerology",
  "Vastu Consultation", "Gemstone Guidance", "Horoscope Analysis", "Spiritual Guidance",
];

const BookingSection = () => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: "", service: "", message: "",
  });

  const update = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🙏 *New Appointment Request*\n\n👤 *Name:* ${form.name}\n📞 *Phone:* ${form.phone}${form.email ? `\n📧 *Email:* ${form.email}` : ""}\n✨ *Service:* ${form.service}\n📅 *Date:* ${form.date}\n⏰ *Time:* ${form.time}${form.message ? `\n📝 *Message:* ${form.message}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass-gold mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-gold">
              Sacred Appointment
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Begin Your{" "}
            <span className="text-gradient-gold">Cosmic Journey</span>
          </h2>
          <div className="gold-divider w-32 mx-auto mb-6" />
          <p className="text-cosmic-silver/75">
            Fill the form and we'll confirm your sacred slot instantly on WhatsApp.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-gold/40 via-cosmic-purple/30 to-cosmic-blue/30 rounded-3xl blur-xl opacity-60" />
          <div className="relative glass-gold rounded-3xl p-6 sm:p-10 shadow-luxury space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={User}>
                <Input required placeholder="Full Name" value={form.name}
                  onChange={(e) => update("name")(e.target.value)} className="pl-11 h-12 bg-background/40 border-gold/20" />
              </Field>
              <Field icon={Phone}>
                <Input required type="tel" placeholder="Mobile Number" value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)} className="pl-11 h-12 bg-background/40 border-gold/20" />
              </Field>
              <Field icon={Mail}>
                <Input type="email" placeholder="Email (optional)" value={form.email}
                  onChange={(e) => update("email")(e.target.value)} className="pl-11 h-12 bg-background/40 border-gold/20" />
              </Field>
              <Field icon={Sparkles}>
                <Select value={form.service} onValueChange={update("service")} required>
                  <SelectTrigger className="pl-11 h-12 bg-background/40 border-gold/20">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field icon={Calendar}>
                <Input required type="date" value={form.date}
                  onChange={(e) => update("date")(e.target.value)} className="pl-11 h-12 bg-background/40 border-gold/20" />
              </Field>
              <Field icon={Clock}>
                <Input required type="time" value={form.time}
                  onChange={(e) => update("time")(e.target.value)} className="pl-11 h-12 bg-background/40 border-gold/20" />
              </Field>
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 h-5 w-5 text-gold/70" />
              <Textarea
                placeholder="Share your concern or what you'd like guidance on..."
                value={form.message}
                onChange={(e) => update("message")(e.target.value)}
                className="pl-11 min-h-[110px] bg-background/40 border-gold/20"
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground font-semibold text-base py-6 glow-gold hover:scale-[1.02] transition-transform">
              <Send className="mr-2 h-5 w-5" />
              Confirm Appointment via WhatsApp
            </Button>

            <p className="text-center text-xs text-cosmic-silver/60">
              🔒 Your details remain private. You'll be redirected to WhatsApp to finalize the slot.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

const Field = ({ icon: Icon, children }: { icon: typeof User; children: React.ReactNode }) => (
  <div className="relative">
    <Icon className="absolute left-3.5 top-3.5 h-5 w-5 text-gold/70 z-10 pointer-events-none" />
    {children}
  </div>
);

export default BookingSection;
