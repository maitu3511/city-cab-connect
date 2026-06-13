import { ReactNode } from "react";
import StarField from "@/components/StarField";
import CosmicNavbar from "@/components/CosmicNavbar";
import CosmicFooter from "@/components/CosmicFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const PageLayout = ({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) => (
  <div className="relative min-h-screen overflow-x-hidden">
    <StarField />
    <div className="relative z-10">
      <CosmicNavbar />
      {title && (
        <section className="pt-32 pb-10 text-center container">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient-gold mb-3">{title}</h1>
          {subtitle && <p className="text-cosmic-silver/75 max-w-2xl mx-auto">{subtitle}</p>}
          <div className="gold-divider w-32 mx-auto mt-5" />
        </section>
      )}
      <main className="pb-20">{children}</main>
      <CosmicFooter />
      <FloatingWhatsApp />
    </div>
  </div>
);

export default PageLayout;
