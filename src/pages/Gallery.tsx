import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

const cats = ["all", "events", "clients", "spiritual", "photos"];

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    supabase.from("gallery_items").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data ?? []));
  }, []);

  const filtered = cat === "all" ? items : items.filter((i) => i.category === cat);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % filtered.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, filtered.length]);

  return (
    <PageLayout title="Gallery" subtitle="Moments of light, devotion and transformation.">
      <SEO title="Gallery — Astro With Hrishi" description="Photos from events, client experiences and spiritual moments with Astrologer Hrishi." path="/gallery" />
      <div className="container max-w-7xl">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition ${cat === c ? "bg-gradient-gold text-primary-foreground" : "glass-gold text-cosmic-silver/80 hover:text-gold"}`}>{c}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-cosmic-silver/60 py-20">Gallery coming soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((g, i) => (
              <motion.button
                key={g.id}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="aspect-square rounded-2xl overflow-hidden glass-gold group cursor-zoom-in"
              >
                <img src={g.image_url} alt={g.caption ?? "Gallery image"} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </motion.button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {active !== null && filtered[active] && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setActive(null)}
            >
              <button className="absolute top-6 right-6 text-cosmic-silver hover:text-gold" onClick={() => setActive(null)} aria-label="Close"><X className="h-8 w-8" /></button>
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-cosmic-silver hover:text-gold" onClick={(e) => { e.stopPropagation(); setActive((a) => (a! - 1 + filtered.length) % filtered.length); }} aria-label="Previous"><ChevronLeft className="h-10 w-10" /></button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-cosmic-silver hover:text-gold" onClick={(e) => { e.stopPropagation(); setActive((a) => (a! + 1) % filtered.length); }} aria-label="Next"><ChevronRight className="h-10 w-10" /></button>
              <motion.img
                key={filtered[active].id}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                src={filtered[active].image_url}
                alt={filtered[active].caption ?? ""}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-luxury object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default Gallery;
