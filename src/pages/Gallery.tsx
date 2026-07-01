import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

// 🖼️ Gallery images live in src/assets/gallery/
// To change an image: just replace the file in that folder with the same name,
// or import a new one below and update the array.
import zodiac1 from "@/assets/gallery/zodiac-1.jpg";
import zodiac2 from "@/assets/gallery/zodiac-2.jpg";
import zodiac3 from "@/assets/gallery/zodiac-3.jpg";
import zodiac4 from "@/assets/gallery/zodiac-4.jpg";
import cosmic1 from "@/assets/gallery/cosmic-1.jpg";
import cosmic2 from "@/assets/gallery/cosmic-2.jpg";
import cosmic3 from "@/assets/gallery/cosmic-3.jpg";
import cosmic4 from "@/assets/gallery/cosmic-4.jpg";
import cosmic5 from "@/assets/gallery/cosmic-5.jpg";
import numerology1 from "@/assets/gallery/numerology-1.jpg";
import numerology2 from "@/assets/gallery/numerology-2.jpg";
import numerology3 from "@/assets/gallery/numerology-3.jpg";
import numerology4 from "@/assets/gallery/numerology-4.jpg";
import meditation1 from "@/assets/gallery/meditation-1.jpg";
import meditation2 from "@/assets/gallery/meditation-2.jpg";
import meditation3 from "@/assets/gallery/meditation-3.jpg";
import meditation4 from "@/assets/gallery/meditation-4.jpg";
import spiritual1 from "@/assets/gallery/spiritual-1.jpg";
import spiritual2 from "@/assets/gallery/spiritual-2.jpg";
import spiritual3 from "@/assets/gallery/spiritual-3.jpg";
import spiritual4 from "@/assets/gallery/spiritual-4.jpg";
import spiritual5 from "@/assets/gallery/spiritual-5.jpg";

const cats = ["all", "zodiac", "cosmic", "numerology", "meditation", "spiritual"];

const defaultGallery = [
  { id: "z1", category: "zodiac", caption: "Zodiac Constellation Map", image_url: zodiac1 },
  { id: "z2", category: "zodiac", caption: "Celestial Zodiac Wheel", image_url: zodiac2 },
  { id: "z3", category: "zodiac", caption: "Astrology Birth Chart", image_url: zodiac3 },
  { id: "z4", category: "zodiac", caption: "Horoscope Symbols", image_url: zodiac4 },

  { id: "c1", category: "cosmic", caption: "Milky Way Galaxy", image_url: cosmic1 },
  { id: "c2", category: "cosmic", caption: "Cosmic Nebula", image_url: cosmic2 },
  { id: "c3", category: "cosmic", caption: "Moon & Planets", image_url: cosmic3 },
  { id: "c4", category: "cosmic", caption: "Star Formation", image_url: cosmic4 },
  { id: "c5", category: "cosmic", caption: "Deep Space Wonders", image_url: cosmic5 },

  { id: "n1", category: "numerology", caption: "Sacred Numbers", image_url: numerology1 },
  { id: "n2", category: "numerology", caption: "Numerology Symbols", image_url: numerology2 },
  { id: "n3", category: "numerology", caption: "Birth Number Analysis", image_url: numerology3 },
  { id: "n4", category: "numerology", caption: "Name Numerology Chart", image_url: numerology4 },

  { id: "m1", category: "meditation", caption: "Deep Meditation State", image_url: meditation1 },
  { id: "m2", category: "meditation", caption: "Third Eye Awakening", image_url: meditation2 },
  { id: "m3", category: "meditation", caption: "Chakra Alignment", image_url: meditation3 },
  { id: "m4", category: "meditation", caption: "Spiritual Awakening", image_url: meditation4 },

  { id: "s1", category: "spiritual", caption: "Rudraksha Mala Beads", image_url: spiritual1 },
  { id: "s2", category: "spiritual", caption: "Sacred Crystals & Gemstones", image_url: spiritual2 },
  { id: "s3", category: "spiritual", caption: "Yantra Sacred Geometry", image_url: spiritual3 },
  { id: "s4", category: "spiritual", caption: "Hindu Temple Architecture", image_url: spiritual4 },
  { id: "s5", category: "spiritual", caption: "Incense & Rituals", image_url: spiritual5 },
];

const Gallery = () => {
  const [items, setItems] = useState<any[]>(defaultGallery);
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    supabase.from("gallery_items").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setItems(data);
    });
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
