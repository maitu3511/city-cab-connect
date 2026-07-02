import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Truck, Award, Zap, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";
import type { Product } from "./ProductCard";

const QuickView = ({ product, open, onOpenChange }: { product: Product | null; open: boolean; onOpenChange: (o: boolean) => void }) => {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  if (!product) return null;

  const original = Math.round(product.price * 1.4);

  const addToCart = () => {
    add({ id: product.id, name: product.name, price: product.price, image_url: product.image_url }, qty);
    toast.success(`Added ${qty} × ${product.name} ✨`);
    onOpenChange(false);
  };

  const buyNow = () => {
    openWhatsApp(
      `Namaste 🙏\n\nOrder request:\n*${product.name}*\nQty: ${qty}\nTotal: ₹${(product.price * qty).toLocaleString("en-IN")}\n\nPlease confirm availability.`
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-gold/30">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-gradient-to-br from-cosmic-purple/40 to-background">
            {product.image_url && (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            )}
            <div className="absolute top-4 left-4 bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
              Certified Authentic
            </div>
          </div>

          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            <div className="text-[10px] uppercase tracking-widest text-gold/70 mb-2">{product.category}</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold mb-3">{product.name}</h2>

            <div className="flex items-center gap-2 text-sm text-cosmic-silver/70 mb-4">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}</div>
              <span className="text-cosmic-silver font-medium">4.8</span>
              <span className="text-cosmic-silver/50">(142 verified reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-3xl font-bold text-gradient-gold">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-cosmic-silver/50 line-through">₹{original.toLocaleString("en-IN")}</span>
              <span className="text-xs font-bold text-emerald-400">Save ₹{(original - product.price).toLocaleString("en-IN")}</span>
            </div>

            {product.description && <p className="text-sm text-cosmic-silver/75 leading-relaxed mb-5">{product.description}</p>}

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[{ icon: ShieldCheck, label: "Lab Certified" }, { icon: Truck, label: "Fast Delivery" }, { icon: Award, label: "Energised" }].map((f) => (
                <div key={f.label} className="text-center p-3 rounded-xl bg-background/60 border border-gold/20">
                  <f.icon className="h-4 w-4 text-gold mx-auto mb-1" />
                  <div className="text-[10px] text-cosmic-silver/70 uppercase tracking-wider">{f.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs uppercase tracking-widest text-cosmic-silver/60">Qty</span>
              <div className="flex items-center border border-gold/30 rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-9 w-9 flex items-center justify-center text-gold hover:bg-gold/10 rounded-l-full">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-cosmic-silver">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-9 w-9 flex items-center justify-center text-gold hover:bg-gold/10 rounded-r-full">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={addToCart} className="border-gold/40 text-gold hover:bg-gold/10">
                <ShoppingCart className="mr-1.5 h-4 w-4" /> Add to Cart
              </Button>
              <Button onClick={buyNow} className="bg-gradient-gold text-primary-foreground font-semibold">
                <Zap className="mr-1.5 h-4 w-4" /> Buy on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
