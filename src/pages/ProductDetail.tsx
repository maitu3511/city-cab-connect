import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, Minus, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [p, setP] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (!id) return;
    supabase.from("products").select("*").eq("id", id).maybeSingle().then(({ data }) => setP(data));
  }, [id]);

  if (!p) return <PageLayout title="Loading…"><div /></PageLayout>;

  return (
    <PageLayout>
      <div className="container max-w-6xl pt-28">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-cosmic-silver/70 hover:text-gold mb-6"><ArrowLeft className="h-4 w-4" />Back to shop</Link>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-3xl overflow-hidden glass-gold">
            {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold/80 mb-2">{p.category}</div>
            <h1 className="font-display text-4xl font-bold mb-4">{p.name}</h1>
            <div className="text-3xl text-gradient-gold font-bold mb-6">₹{Number(p.price).toLocaleString("en-IN")}</div>
            <p className="text-cosmic-silver/80 leading-relaxed mb-8">{p.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-cosmic-silver/70">Quantity:</span>
              <div className="flex items-center glass-gold rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-gold hover:bg-gold/10 rounded-l-full"><Minus className="h-4 w-4" /></button>
                <span className="px-4 font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 text-gold hover:bg-gold/10 rounded-r-full"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Button size="lg" variant="outline" className="border-gold/40 text-gold hover:bg-gold/10" onClick={() => { add({ id: p.id, name: p.name, price: Number(p.price), image_url: p.image_url }, qty); toast.success("Added to cart"); }}>
                <ShoppingBag className="h-4 w-4 mr-2" />Add to Cart
              </Button>
              <Button size="lg" className="bg-gradient-gold text-primary-foreground glow-gold" onClick={() => openWhatsApp(`🛍️ *Order Inquiry*\n\nProduct: ${p.name}\nQty: ${qty}\nTotal: ₹${(Number(p.price) * qty).toLocaleString("en-IN")}\n\nPlease confirm availability.`)}>
                <MessageCircle className="h-4 w-4 mr-2" />Order on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
