import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+918460107287";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Now", href: "#booking" },
];

const CosmicNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 glass border-b border-gold/20" : "py-4 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles className="h-7 w-7 text-gold transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-gold/30 blur-xl group-hover:bg-gold/60 transition-all" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg sm:text-xl text-gradient-gold font-bold">
              Astro With Hrishi
            </div>
            <div className="text-[10px] tracking-[0.3em] text-cosmic-silver/70 uppercase">
              Vedic · Cosmic · Premium
            </div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors relative group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold group-hover:w-full transition-all" />
            </a>
          ))}
          <Button
            asChild
            className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 glow-gold"
          >
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-2 h-4 w-4" />
              Consult Now
            </a>
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass mt-2 mx-4 rounded-2xl p-5 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-foreground/90 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full bg-gradient-gold text-primary-foreground">
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-2 h-4 w-4" /> Consult Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default CosmicNavbar;
