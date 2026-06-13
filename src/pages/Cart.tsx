import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, MessageCircle, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0)
    return (
      <PageLayout title="Your Cart" subtitle="Sacred items you wish to bring home.">
        <div className="container max-w-2xl text-center glass-gold rounded-3xl p-12">
          <ShoppingBag className="h-12 w-12 text-gold mx-auto mb-4 opacity-60" />
          <p className="text-cosmic-silver/80 mb-6">Your cart is empty.</p>
          <Button asChild className="bg-gradient-gold text-primary-foreground"><Link to="/shop">Browse Shop</Link></Button>
        </div>
      </PageLayout>
    );

  return (
    <PageLayout title="Your Cart">
      <div className="container max-w-4xl">
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.id} className="glass-gold rounded-2xl p-4 flex items-center gap-4">
              {i.image_url && <img src={i.image_url} alt={i.name} className="h-20 w-20 rounded-xl object-cover" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-foreground line-clamp-1">{i.name}</h3>
                <div className="text-sm text-gold">₹{i.price.toLocaleString("en-IN")}</div>
              </div>
              <div className="flex items-center glass rounded-full">
                <button onClick={() => setQty(i.id, i.quantity - 1)} className="p-1.5 text-gold"><Minus className="h-3 w-3" /></button>
                <span className="px-3 text-sm">{i.quantity}</span>
                <button onClick={() => setQty(i.id, i.quantity + 1)} className="p-1.5 text-gold"><Plus className="h-3 w-3" /></button>
              </div>
              <div className="hidden sm:block w-24 text-right font-semibold text-foreground">₹{(i.price * i.quantity).toLocaleString("en-IN")}</div>
              <button onClick={() => remove(i.id)} className="text-cosmic-silver/60 hover:text-destructive"><X className="h-5 w-5" /></button>
            </div>
          ))}
        </div>
        <div className="glass-gold rounded-3xl p-6 mt-6">
          <div className="flex justify-between items-center mb-5">
            <div className="text-cosmic-silver/80">Total</div>
            <div className="text-3xl text-gradient-gold font-bold font-display">₹{total().toLocaleString("en-IN")}</div>
          </div>
          <Button asChild size="lg" className="w-full bg-gradient-gold text-primary-foreground glow-gold">
            <Link to="/checkout"><MessageCircle className="h-5 w-5 mr-2" />Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
