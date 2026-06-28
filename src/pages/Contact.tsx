import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { openWhatsApp, PHONE_NUMBER, EMAIL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { toast } from "sonner";

const Contact = () => {
  const [f, setF] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert(f);
    setSending(false);
    if (error) return toast.error("Failed to send");
    openWhatsApp(`📨 *Contact Inquiry*\n\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nSubject: ${f.subject}\n\n${f.message}`);
    toast.success("Message sent!");
    setF({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <PageLayout title="Get in Touch" subtitle="We respond within hours on WhatsApp.">
      <SEO title="Contact — Astro With Hrishi" description="Call, WhatsApp or email Astrologer Hrishi. Based in Ahmedabad, serving clients worldwide." path="/contact" />
      <div className="container max-w-6xl space-y-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[
              { Icon: Phone, label: "Call", value: PHONE_NUMBER, href: `tel:${PHONE_NUMBER}` },
              { Icon: MessageCircle, label: "WhatsApp", value: PHONE_NUMBER, href: `https://wa.me/${WHATSAPP_NUMBER}` },
              { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              { Icon: MapPin, label: "Location", value: "Ahmedabad, Gujarat, India" },
            ].map(({ Icon, label, value, href }, i) => (
              <a key={i} href={href} className="glass-gold rounded-2xl p-5 flex items-center gap-4 hover:glow-gold transition-all">
                <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center"><Icon className="h-5 w-5 text-primary-foreground" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold/80">{label}</div>
                  <div className="text-cosmic-silver/90">{value}</div>
                </div>
              </a>
            ))}
            <div className="glass-gold rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-gold/80 mb-1">Working Hours</div>
              <div className="text-cosmic-silver/90 text-sm">Mon – Sat · 9:00 AM – 8:00 PM IST</div>
              <div className="text-cosmic-silver/60 text-xs mt-1">Sunday by appointment</div>
            </div>
          </div>
          <form onSubmit={submit} className="glass-gold rounded-3xl p-6 space-y-4">
            <Input required placeholder="Your Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Input required type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Input type="tel" placeholder="Phone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Input placeholder="Subject" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Textarea required placeholder="Your message..." value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="min-h-[120px] bg-background/40 border-gold/20" />
            <Button disabled={sending} type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground glow-gold">
              <Send className="h-4 w-4 mr-2" />{sending ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="relative rounded-3xl overflow-hidden glass-gold p-1 shadow-luxury">
          <iframe
            title="Astro With Hrishi location"
            src="https://www.google.com/maps?q=Ahmedabad%2C+Gujarat%2C+India&output=embed"
            className="w-full h-[360px] rounded-[1.4rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
