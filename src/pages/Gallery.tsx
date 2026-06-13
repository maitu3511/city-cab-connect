import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";

const cats = ["all", "events", "clients", "spiritual", "photos"];

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    supabase.from("gallery_items").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data ?? []));
  }, []);

  const filtered = cat === "all" ? items : items.filter((i) => i.category === cat);

  return (
    <PageLayout title="Gallery" subtitle="Moments of light, devotion and transformation.">
      <div className="container max-w-7xl">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition ${cat === c ? "bg-gradient-gold text-primary-foreground" : "glass-gold text-cosmic-silver/80 hover:text-gold"}`}>{c}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="aspect-square rounded-2xl overflow-hidden glass-gold group">
              <img src={g.image_url} alt={g.caption ?? ""} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Gallery;
