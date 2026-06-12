import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918460107287";

const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Namaste Hrishi ji, I'd like to know more about your consultations."
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 group"
    aria-label="WhatsApp"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    <span className="relative flex items-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform font-semibold">
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with Hrishi</span>
    </span>
  </a>
);

export default FloatingWhatsApp;
