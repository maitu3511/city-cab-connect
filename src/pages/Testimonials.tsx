import PageLayout from "@/components/PageLayout";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do consultations work?", a: "After booking, you'll receive a WhatsApp confirmation. Sessions can be conducted via call, video, or in-person in Ahmedabad. Provide accurate birth details for the most precise reading." },
  { q: "What information do I need to share?", a: "Your full name, exact date of birth, time of birth, and place of birth. This is essential for accurate Kundli analysis." },
  { q: "Are my details kept confidential?", a: "Absolutely. All consultations and personal data are 100% private. We never share your information." },
  { q: "How are gemstones authenticated?", a: "Every gemstone comes with a government-recognised lab certificate (IGI/GIA). They are also energised by Hrishi ji before dispatch." },
  { q: "Can I get a refund?", a: "Yes — please review our Refund Policy. Most consultations are non-refundable once delivered." },
  { q: "Do you offer remedies for specific problems?", a: "Yes — career, marriage, health, finance, education, and spiritual blockages all have Vedic remedies tailored to your chart." },
  { q: "How accurate are predictions?", a: "Vedic astrology is highly accurate when birth details are precise. Hrishi ji also accounts for free will and karma — predictions are guidance, not fate." },
];

const Testimonials = () => (
  <PageLayout title="Client Stories & FAQ" subtitle="Real transformations from souls Hrishi has guided — plus answers to your questions.">
    <TestimonialsSection />

    <section className="py-20">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full glass-gold mb-4">
            <span className="text-xs tracking-[0.25em] uppercase text-gold">FAQ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Frequently <span className="text-gradient-gold">Asked Questions</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="glass-gold rounded-2xl px-5 border-gold/20">
              <AccordionTrigger className="text-left hover:no-underline hover:text-gold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-cosmic-silver/80">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </PageLayout>
);

export default Testimonials;
