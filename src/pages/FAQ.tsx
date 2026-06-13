import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do consultations work?", a: "After booking, you'll receive a WhatsApp confirmation. Sessions can be conducted via call, video, or in-person in Ahmedabad. Provide accurate birth details for the most precise reading." },
  { q: "What information do I need to share?", a: "Your full name, exact date of birth, time of birth, and place of birth. This is essential for accurate Kundli analysis." },
  { q: "Are my details kept confidential?", a: "Absolutely. All consultations and personal data are 100% private. We never share your information." },
  { q: "How are gemstones authenticated?", a: "Every gemstone comes with a government-recognised lab certificate (IGI/GIA). They are also energised by Hrishi ji before dispatch." },
  { q: "What is the typical delivery time for shop items?", a: "Within India: 3-7 business days. International: 10-15 business days. Tracking is provided." },
  { q: "Can I get a refund?", a: "Yes — please review our Refund Policy. Most consultations are non-refundable once delivered, but unused products can be returned within 7 days." },
  { q: "Do you offer remedies for specific problems?", a: "Yes — career, marriage, health, finance, education, and spiritual blockages all have Vedic remedies tailored to your chart." },
  { q: "How accurate are predictions?", a: "Vedic astrology is highly accurate when birth details are precise. Hrishi ji also accounts for free will and karma — predictions are guidance, not fate." },
];

const FAQ = () => (
  <PageLayout title="Frequently Asked" subtitle="Everything you need to know.">
    <div className="container max-w-3xl">
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f${i}`} className="glass-gold rounded-2xl px-5 border-gold/20">
            <AccordionTrigger className="text-left hover:no-underline hover:text-gold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-cosmic-silver/80">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </PageLayout>
);

export default FAQ;
