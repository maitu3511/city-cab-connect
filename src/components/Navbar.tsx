import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "+918460107287";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Book Now", href: "#booking" },
    { label: "Cars", href: "#cars" },
    { label: "Packages", href: "#packages" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl font-bold text-primary">
          RideSure
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <Button size="sm" asChild>
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-1.5 h-4 w-4" />
              Call Now
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="w-full" asChild>
            <a href={`tel:${PHONE_NUMBER}`}>
              <Phone className="mr-1.5 h-4 w-4" />
              Call Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
