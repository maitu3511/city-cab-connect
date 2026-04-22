import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const WHATSAPP_NUMBER = "919999999999";
const PHONE_NUMBER = "+919999999999";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-primary mb-3">[Client Name] Cab Service</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted cab service in [City]. Available 24/7 for local rides, airport transfers and outstation trips.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#booking" className="hover:text-primary transition-colors">Book a Cab</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
              <li><a href="#location" className="hover:text-primary transition-colors">Location</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-primary transition-colors">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@clientcab.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>[City], India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} [Client Name] Cab Service. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
