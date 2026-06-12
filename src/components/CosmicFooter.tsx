import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react/icons";

const WHATSAPP_NUMBER = "918460107287";
const PHONE_NUMBER = "+918460107287";

const CosmicFooter = () => {
  return (
    <footer className="relative pt-20 pb-8 border-t border-gold/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-7 w-7 text-gold" />
              <div>
                <div className="font-display text-xl text-gradient-gold font-bold">
                  Astro With Hrishi
                </div>
                <div className="text-[10px] tracking-[0.3em] text-cosmic-silver/70 uppercase">
                  Vedic · Cosmic · Premium
                </div>
              </div>
            </div>
            <p className="text-cosmic-silver/70 max-w-md leading-relaxed mb-6">
              Premium Vedic astrology consultations crafted with classical precision and
              modern clarity. Illuminating life's path through the ancient wisdom of the stars.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}` },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full glass-gold flex items-center justify-center text-gold hover:scale-110 hover:glow-gold transition-all"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-cosmic-silver/75">
              {["Home", "About", "Services", "Testimonials", "Book Now"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "")}`} className="hover:text-gold transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-5">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-cosmic-silver/75">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-gold transition-colors">
                  +91 84601 07287
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <a href="mailto:hello@astrowithhrishi.com" className="hover:text-gold transition-colors">
                  hello@astrowithhrishi.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Ahmedabad, Gujarat<br />India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cosmic-silver/50">
          <div>© {new Date().getFullYear()} Astro With Hrishi. All rights reserved.</div>
          <div className="font-serif italic">"As above, so below." ✦</div>
        </div>
      </div>
    </footer>
  );
};

export default CosmicFooter;
