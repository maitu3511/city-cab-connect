import { Sparkles, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WHATSAPP_NUMBER, PHONE_NUMBER, EMAIL } from "@/lib/whatsapp";

const CosmicFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative pt-20 pb-8 border-t border-gold/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-7 w-7 text-gold" />
              <div>
                <div className="font-display text-xl text-gradient-gold font-bold">Astro With Hrishi</div>
                <div className="text-[10px] tracking-[0.3em] text-cosmic-silver/70 uppercase">{t("home.tagline")}</div>
              </div>
            </div>
            <p className="text-cosmic-silver/70 leading-relaxed mb-6 text-sm">
              Premium Vedic astrology consultations crafted with classical precision and modern clarity.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Youtube, href: "https://youtube.com" },
                { Icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}` },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full glass-gold flex items-center justify-center text-gold hover:scale-110 hover:glow-gold transition-all" aria-label="Social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-5">{t("footer.explore")}</h4>
            <ul className="space-y-2.5 text-sm text-cosmic-silver/75">
              {[
                { l: t("nav.home"), to: "/" },
                { l: t("nav.about"), to: "/about" },
                { l: t("nav.services"), to: "/services" },
                { l: t("nav.shop"), to: "/shop" },
                { l: t("nav.gallery"), to: "/gallery" },
                { l: t("nav.videos"), to: "/videos" },
                { l: t("nav.blog"), to: "/blog" },
                { l: t("nav.testimonials"), to: "/testimonials" },
                { l: t("nav.booking"), to: "/booking" },
              ].map((x) => (
                <li key={x.to}><Link to={x.to} className="hover:text-gold transition-colors">{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-5">{t("footer.legal")}</h4>
            <ul className="space-y-2.5 text-sm text-cosmic-silver/75">
              <li><Link to="/faq" className="hover:text-gold transition-colors">{t("nav.faq")}</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/refund" className="hover:text-gold transition-colors">{t("footer.refund")}</Link></li>
              <li><Link to="/terms" className="hover:text-gold transition-colors">{t("footer.terms")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-5">{t("footer.connect")}</h4>
            <ul className="space-y-3 text-sm text-cosmic-silver/75">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold flex-shrink-0" /><a href={`tel:${PHONE_NUMBER}`} className="hover:text-gold">+91 84601 07287</a></li>
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-gold flex-shrink-0" /><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold flex-shrink-0" /><a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a></li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" /><span>Ahmedabad, Gujarat<br />India</span></li>
            </ul>
          </div>
        </div>
        <div className="gold-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cosmic-silver/50">
          <div>© {new Date().getFullYear()} Astro With Hrishi. {t("footer.rights")}</div>
          <div className="font-serif italic">"{t("footer.quote")}" ✦</div>
        </div>
      </div>
    </footer>
  );
};

export default CosmicFooter;
