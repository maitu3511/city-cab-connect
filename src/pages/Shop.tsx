import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import ShopHero from "@/components/shop/ShopHero";
import ProductCard, { Product } from "@/components/shop/ProductCard";
import QuickView from "@/components/shop/QuickView";
import CartDrawer from "@/components/shop/CartDrawer";
import ProductReviews from "@/components/shop/ProductReviews";
import TrustSection from "@/components/TrustSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";
import {
  Search, ShoppingBag, Gem, Sparkles, Flame, Circle, Star, Home,
  BookOpen, Wind, Package, Heart, ScrollText, SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { name: "All", icon: Sparkles },
  { name: "Gemstones", icon: Gem },
  { name: "Rudraksha", icon: Circle },
  { name: "Yantras", icon: ScrollText },
  { name: "Crystals", icon: Sparkles },
  { name: "Bracelets", icon: Star },
  { name: "Pendants", icon: Heart },
  { name: "Vastu Products", icon: Home },
  { name: "Spiritual Kits", icon: Package },
  { name: "Pooja Items", icon: Flame },
  { name: "Incense", icon: Wind },
  { name: "Books", icon: BookOpen },
  { name: "Lucky Charms", icon: Star },
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fallback-rudraksha-7-mukhi",
    name: "7 Mukhi Rudraksha Bracelet",
    description: "Certified, energised Rudraksha bracelet for prosperity, focus and spiritual protection.",
    price: 2499,
    image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    category: "Rudraksha",
    stock: 25,
  },
  {
    id: "fallback-yellow-sapphire",
    name: "Natural Yellow Sapphire",
    description: "Premium Pukhraj gemstone selected for Jupiter strength, wisdom and abundance.",
    price: 8999,
    image_url: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    category: "Gemstones",
    stock: 12,
  },
  {
    id: "fallback-sri-yantra",
    name: "Sri Yantra Copper Energised",
    description: "Sacred yantra for wealth, vastu balance and divine positive energy at home or office.",
    price: 1799,
    image_url: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=800&q=80",
    category: "Yantras",
    stock: 30,
  },
  {
    id: "fallback-chakra-bracelet",
    name: "7 Chakra Healing Bracelet",
    description: "Natural crystal bracelet for aura balancing, meditation and everyday cosmic alignment.",
    price: 799,
    image_url: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    category: "Bracelets",
    stock: 80,
  },
  {
    id: "fallback-vastu-pyramid",
    name: "Vastu Pyramid Energy Set",
    description: "Premium vastu remedy set for home, office, shop and business energy correction.",
    price: 1199,
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    category: "Vastu Products",
    stock: 45,
  },
  {
    id: "fallback-meditation-kit",
    name: "Meditation Essentials Kit",
    description: "Curated spiritual kit with meditation essentials for peace, rituals and daily sadhana.",
    price: 1699,
    image_url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    category: "Spiritual Kits",
    stock: 18,
  },
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const cartCount = useCart((s) => s.count());

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id,name,description,price,image_url,category,stock")
        .eq("active", true)
        .order("created_at", { ascending: false });
      setProducts(!error && data?.length ? (data as Product[]) : FALLBACK_PRODUCTS);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat !== "All") list = list.filter((p) => p.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new") sorted.reverse();
    return sorted;
  }, [products, activeCat, search, sort]);

  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <PageLayout>
      <SEO
        title="Astro Spiritual Store · Rudraksha, Gemstones & Yantras"
        description="Luxury astrology store — authentic rudraksha, gemstones, yantras, crystals, bracelets, pendants and pooja items. Lab certified & energised."
        path="/shop"
      />

      <ShopHero onShopNow={scrollToGrid} />

      {/* Category rail */}
      <section className="container relative z-10 -mt-4 mb-10">
        <div className="glass-gold rounded-2xl p-3 sm:p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((c) => {
              const active = activeCat === c.name;
              return (
                <motion.button
                  key={c.name}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCat(c.name)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl min-w-[92px] transition-all border",
                    active
                      ? "bg-gradient-gold text-primary-foreground border-gold glow-gold"
                      : "bg-background/40 border-gold/20 text-cosmic-silver hover:border-gold/50 hover:bg-gold/5"
                  )}
                >
                  <c.icon className="h-5 w-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">{c.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search + Sort bar */}
      <section ref={gridRef} className="container mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sacred products…"
              className="pl-10 bg-background/60 border-gold/30 focus:border-gold h-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[190px] h-11 bg-background/60 border-gold/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-xs text-cosmic-silver/60 mt-3">
          Showing <span className="text-gold font-semibold">{filtered.length}</span> of {products.length} products
          {activeCat !== "All" && <> in <span className="text-gold">{activeCat}</span></>}
        </div>
      </section>

      {/* Grid */}
      <section className="container">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-gold/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-cosmic-silver/60 mb-2">No products found</div>
            <Button variant="outline" onClick={() => { setActiveCat("All"); setSearch(""); }} className="border-gold/40 text-gold">
              Clear filters
            </Button>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </motion.div>
        )}
      </section>

      <ProductReviews />

      <div className="mt-4">
        <TrustSection />
      </div>

      <QuickView product={quickView} open={!!quickView} onOpenChange={(o) => !o && setQuickView(null)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Floating cart button */}
      <motion.button
        onClick={() => setCartOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full bg-gradient-gold text-primary-foreground shadow-[0_0_40px_hsl(43_78%_58%/0.5)] flex items-center justify-center"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive text-white text-xs font-bold flex items-center justify-center border-2 border-background">
            {cartCount}
          </span>
        )}
      </motion.button>
    </PageLayout>
  );
};

export default Shop;
