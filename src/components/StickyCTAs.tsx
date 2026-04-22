import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "919999999999";
const PHONE_NUMBER = "+919999999999";

const StickyCTAs = () => {
  return (
    <>
      {/* Sticky WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to book a cab.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-primary-foreground px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform animate-pulse-glow font-semibold"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Sticky Call Button - Mobile */}
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="fixed bottom-6 left-6 z-50 sm:hidden flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg font-semibold"
        aria-label="Call Now"
      >
        <Phone className="h-5 w-5" />
        Call
      </a>
    </>
  );
};

export default StickyCTAs;
