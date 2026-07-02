import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  stock: number;
};

const originalPrice = (p: number) => Math.round(p * 1.4);

const badgeFor = (p: Product) => {
  const seed = p.id.charCodeAt(0) + p.id.charCodeAt(1);
  const opts = ["Bestseller", "New", "Limited"];
  return opts[seed % opts.length];
};

const ratingFor = (p: Product) => 4 + ((p.id.charCodeAt(0) % 10) / 10);

const ProductCard = ({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) => {
  const add = useCart((s) => s.add);
  const { toggle, has } = useWishlist();
  const wished = has(product.id);
  const badge = badgeFor(product);
  const rating = ratingFor(product);
  const reviews = 20 + (product.id.charCodeAt(2) % 200);
  const inStock = product.stock > 0;

  const addToCart = () => {
    add({ id: product.id, name: product.name, price: product.price, image_url: product.image_url });
    toast.success(`${product.name} added to cart ✨`);
  };

  const buyNow = () => {
    openWhatsApp(
      `Namaste 🙏\nI'd like to order:\n\n*${product.name}*\nPrice: ₹${product.price}\n\nPlease confirm availability & delivery.`
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative glass-gold rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-cosmic-purple/30 to-background">
        {product.image_url && (
          <motion.img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={cn(
              "text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full",
              badge === "Bestseller" && "bg-gradient-gold text-primary-foreground",
              badge === "New" && "bg-[hsl(var(--cosmic-blue))] text-white",
              badge === "Limited" && "bg-[hsl(var(--purple-glow))] text-white"
            )}
          >
            {badge}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-destructive/90 text-white">
            -29% OFF
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggle(product.id)}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/70 backdrop-blur-md flex items-center justify-center border border-gold/30 hover:border-gold transition-colors"
          aria-label="Wishlist"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", wished ? "fill-destructive text-destructive" : "text-cosmic-silver")}
          />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onQuickView(product)}
            className="flex-1 bg-background/70 backdrop-blur border-gold/40 text-gold hover:bg-gold/10"
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-gold/70 mb-1">{product.category}</div>
        <h3 className="font-display text-base font-semibold text-cosmic-silver line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-cosmic-silver/60 line-clamp-2 mb-3">{product.description}</p>
        )}

        <div className="flex items-center gap-1 text-xs text-cosmic-silver/70 mb-3">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-cosmic-silver font-medium">{rating.toFixed(1)}</span>
          <span className="text-cosmic-silver/50">({reviews})</span>
          <span className={cn("ml-auto text-[10px] font-semibold", inStock ? "text-emerald-400" : "text-destructive")}>
            {inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-display text-xl font-bold text-gradient-gold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-cosmic-silver/50 line-through">
            ₹{originalPrice(product.price).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" onClick={addToCart} className="border-gold/40 text-gold hover:bg-gold/10">
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" /> Add
          </Button>
          <Button size="sm" onClick={buyNow} className="bg-gradient-gold text-primary-foreground font-semibold">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Buy
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
