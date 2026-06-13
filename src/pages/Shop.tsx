import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";

type Product = { id: string; name: string; description: string | null; price: number; image_url: string | null; category: string | null; stock: number };

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState<string>("all");
  const add = useCart((s) => s.add);

  useEffect(() => {
    supabase.from("products").select("*").eq("active", true).order("created_at", { ascending: false }).then(({ data }) => {
      setProducts((data as Product[]) ?? []);
      setLoading(false);
    });
  }, []);

  const cats = ["all", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[]))];
  const filtered = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <PageLayout title="Sacred Shop" subtitle="Authentic gemstones, malas, yantras & reports — energised by Hrishi.">
      <div className="container max-w-7xl">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${cat === c ? "bg-gradient-gold text-primary-foreground" : "glass-gold text-cosmic-silver/80 hover:text-gold"}`}>{c}</button>
          ))}
        </div>

        {loading ? <p className="text-center text-cosmic-silver/60">Loading sacred items…</p> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-gold rounded-2xl overflow-hidden group hover:glow-gold transition-all flex flex-col">
                <Link to={`/shop/${p.id}`} className="block aspect-square overflow-hidden bg-background/40">
                  {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />}
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-gold/80 mb-1">{p.category}</div>
                  <Link to={`/shop/${p.id}`}><h3 className="font-display text-lg text-foreground hover:text-gold transition-colors mb-2 line-clamp-2">{p.name}</h3></Link>
                  <p className="text-xs text-cosmic-silver/65 line-clamp-2 mb-4 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-display text-gradient-gold font-bold">₹{Number(p.price).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="border-gold/40 text-gold hover:bg-gold/10" onClick={() => { add({ id: p.id, name: p.name, price: Number(p.price), image_url: p.image_url }); toast.success("Added to cart"); }}>
                      <ShoppingBag className="h-3.5 w-3.5 mr-1" />Cart
                    </Button>
                    <Button size="sm" className="bg-gradient-gold text-primary-foreground" onClick={() => openWhatsApp(`🛍️ *Order Inquiry*\n\nProduct: ${p.name}\nPrice: ₹${p.price}\n\nPlease confirm availability and order process.`)}>
                      <MessageCircle className="h-3.5 w-3.5 mr-1" />Order
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Shop;
