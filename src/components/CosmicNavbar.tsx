import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, Phone, ShoppingBag, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { PHONE_NUMBER } from "@/lib/whatsapp";

const CosmicNavbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const count = useCart((s) => s.count());
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
    { label: t("nav.shop"), to: "/shop" },
    { label: t("nav.gallery"), to: "/gallery" },
    { label: t("nav.videos"), to: "/videos" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2 glass border-b border-gold/20" : "py-3 bg-background/30 backdrop-blur-sm"}`}>
      <div className="container flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="relative">
            <Sparkles className="h-7 w-7 text-gold transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-gold/30 blur-xl group-hover:bg-gold/60 transition-all" />
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
          <Link to="/cart" className="relative p-2 text-foreground/80 hover:text-gold transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-gold text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">{count}</span>
            )}
          </Link>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/orders" className="text-xs text-cosmic-silver/80 hover:text-gold"><UserIcon className="h-5 w-5" /></Link>
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
          <Link to="/testimonials" className="block text-foreground/90 hover:text-gold">{t("nav.testimonials")}</Link>
          <Link to="/faq" className="block text-foreground/90 hover:text-gold">{t("nav.faq")}</Link>
          {user ? (
            <>
              <Link to="/orders" className="block text-foreground/90 hover:text-gold">{t("nav.myOrders")}</Link>
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
