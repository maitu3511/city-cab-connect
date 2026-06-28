import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

const cats = ["all", "zodiac", "cosmic", "numerology", "meditation", "spiritual"];

const defaultGallery = [
  // Zodiac Signs
  { id: "z1", category: "zodiac", caption: "Zodiac Constellation Map", image_url: "https://images.unsplash.com/photo-1509117345201-ce2d652da06e?w=1200&q=80" },
  { id: "z2", category: "zodiac", caption: "Celestial Zodiac Wheel", image_url: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=1200&q=80" },
  { id: "z3", category: "zodiac", caption: "Astrology Birth Chart", image_url: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1200&q=80" },
  { id: "z4", category: "zodiac", caption: "Horoscope Symbols", image_url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80" },

  // Cosmic / Planets
  { id: "c1", category: "cosmic", caption: "Milky Way Galaxy", image_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&q=80" },
  { id: "c2", category: "cosmic", caption: "Cosmic Nebula", image_url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&q=80" },
  { id: "c3", category: "cosmic", caption: "Moon & Planets", image_url: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=1200&q=80" },
  { id: "c4", category: "cosmic", caption: "Star Formation", image_url: "https://images.unsplash.com/photo-1462332420958-a05d1d454a34?w=1200&q=80" },
  { id: "c5", category: "cosmic", caption: "Deep Space Wonders", image_url: "https://images.unsplash.com/photo-1464802688872-617fa5c92d80?w=1200&q=80" },

  // Numerology
  { id: "n1", category: "numerology", caption: "Sacred Numbers", image_url: "https://images.unsplash.com/photo-1501137983254-0c9e8d5b90de?w=1200&q=80" },
  { id: "n2", category: "numerology", caption: "Numerology Symbols", image_url: "https://images.unsplash.com/photo-1580953122422-5e7b3e5c1c9a?w=1200&q=80" },
  { id: "n3", category: "numerology", caption: "Birth Number Analysis", image_url: "https://images.unsplash.com/photo-1559526324-593e20b98e11?w=1200&q=80" },
  { id: "n4", category: "numerology", caption: "Name Numerology Chart", image_url: "https://images.unsplash.com/photo-1551288049-bebda4e0d07a?w=1200&q=80" },

  // Meditation
  { id: "m1", category: "meditation", caption: "Deep Meditation State", image_url: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=1200&q=80" },
  { id: "m2", category: "meditation", caption: "Third Eye Awakening", image_url: "https://images.unsplash.com/photo-1506126613408-eca21e2c16e4?w=1200&q=80" },
  { id: "m3", category: "meditation", caption: "Chakra Alignment", image_url: "https://images.unsplash.com/photo-1505506874110-6a7a69ba1de7?w=1200&q=80" },
  { id: "m4", category: "meditation", caption: "Spiritual Awakening", image_url: "https://images.unsplash.com/photo-1518241353330-0f2436cc0393?w=1200&q=80" },

  // Spiritual / Kundli / Rituals
  { id: "s1", category: "spiritual", caption: "Rudraksha Mala Beads", image_url: "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1200&q=80" },
  { id: "s2", category: "spiritual", caption: "Sacred Crystals & Gemstones", image_url: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=1200&q=80" },
  { id: "s3", category: "spiritual", caption: "Yantra Sacred Geometry", image_url: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=1200&q=80" },
  { id: "s4", category: "spiritual", caption: "Hindu Temple Architecture", image_url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80" },
  { id: "s5", category: "spiritual", caption: "Brass Diya & Lamps", image_url: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=1200&q=80" },
  { id: "s6", category: "spiritual", caption: "Incense & Rituals", image_url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80" },
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
