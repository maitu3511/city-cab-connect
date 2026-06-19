import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { PHONE_NUMBER } from "@/lib/whatsapp";
import logo from "@/assets/logo.png";

const CosmicNavbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const links = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.services"), to: "/services" },
    { label: t("nav.gallery"), to: "/gallery" },
    { label: t("nav.testimonials"), to: "/testimonials" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2 glass border-b border-gold/20" : "py-3 bg-background/30 backdrop-blur-sm"}`}>
      <div className="container flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="relative">
            <img src={logo} alt="Astro With Hrishi" className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gold/20 blur-xl group-hover:bg-gold/40 transition-all -z-10" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base sm:text-lg text-gradient-gold font-bold">Astro With Hrishi</div>
            <div className="text-[9px] tracking-[0.25em] text-cosmic-silver/70 uppercase hidden sm:block">{t("home.tagline")}</div>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`text-sm tracking-wide hover:text-gold transition-colors ${loc.pathname === l.to ? "text-gold" : "text-foreground/80"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              {isAdmin && <Link to="/admin" className="text-xs text-gold hover:underline">{t("nav.admin")}</Link>}
              <button onClick={() => signOut()} className="text-xs text-cosmic-silver/70 hover:text-gold">{t("nav.signOut")}</button>
            </div>
          ) : (
            <Link to="/auth" className="hidden sm:block text-xs text-cosmic-silver/80 hover:text-gold">{t("nav.signIn")}</Link>
          )}
          <Button asChild size="sm" className="hidden lg:inline-flex bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 glow-gold">
            <a href={`tel:${PHONE_NUMBER}`}><Phone className="mr-2 h-4 w-4" />{t("nav.consultNow")}</a>
          </Button>
          <button className="xl:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden glass mt-2 mx-4 rounded-2xl p-5 space-y-3 max-h-[80vh] overflow-y-auto">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block text-foreground/90 hover:text-gold transition-colors">{l.label}</Link>
          ))}
          <Link to="/booking" className="block text-gold">{t("nav.booking")}</Link>
          <Link to="/faq" className="block text-foreground/90 hover:text-gold">{t("nav.faq")}</Link>
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="block text-gold">{t("nav.admin")}</Link>}
              <button onClick={() => signOut()} className="block text-cosmic-silver/70">{t("nav.signOut")}</button>
            </>
          ) : (
            <Link to="/auth" className="block text-cosmic-silver/80">{t("nav.signIn")}</Link>
          )}
          <Button asChild className="w-full bg-gradient-gold text-primary-foreground">
            <a href={`tel:${PHONE_NUMBER}`}><Phone className="mr-2 h-4 w-4" /> {t("nav.consultNow")}</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default CosmicNavbar;
