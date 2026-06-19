import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/whatsapp";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp?: number;
  image: string;
  desc: string;
};

const PRODUCTS: Product[] = [
  // Bracelets
  { id: "b1", name: "Rose Quartz Bracelet", category: "Bracelet", price: 599, mrp: 1999, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", desc: "Heals emotions, attracts love and harmony." },
  { id: "b2", name: "Yellow Hakik Bracelet", category: "Bracelet", price: 549, mrp: 1799, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80", desc: "Boosts confidence, prosperity and focus." },
  { id: "b3", name: "White Hakik Bracelet", category: "Bracelet", price: 549, mrp: 1799, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80", desc: "Brings calmness, balance and clarity." },
  { id: "b4", name: "Tiger Eye Bracelet", category: "Bracelet", price: 699, mrp: 1899, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80", desc: "Protection, courage and strong willpower." },
  { id: "b5", name: "Black Tourmaline Bracelet", category: "Bracelet", price: 799, mrp: 2099, image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80", desc: "Removes negativity and evil eye." },
  { id: "b6", name: "7 Chakra Healing Bracelet", category: "Bracelet", price: 899, mrp: 2499, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80", desc: "Balances all seven chakras for harmony." },

  // Gemstones
  { id: "g1", name: "Natural Ruby (Manik)", category: "Gemstone", price: 4500, mrp: 7500, image: "https://images.unsplash.com/photo-1611425143596-5db5b91b0c47?w=600&q=80", desc: "Strengthens Sun, boosts authority and fame." },
  { id: "g2", name: "Blue Sapphire (Neelam)", category: "Gemstone", price: 6500, mrp: 9999, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80", desc: "Powerful Saturn stone for sudden wealth." },
  { id: "g3", name: "Yellow Sapphire (Pukhraj)", category: "Gemstone", price: 5500, mrp: 8999, image: "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=600&q=80", desc: "Jupiter's blessing for wisdom & marriage." },
  { id: "g4", name: "Emerald (Panna)", category: "Gemstone", price: 4200, mrp: 7200, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80", desc: "Sharpens Mercury, intellect and business." },

  // Rudraksha
  { id: "r1", name: "5 Mukhi Rudraksha", category: "Rudraksha", price: 299, mrp: 799, image: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=600&q=80", desc: "Peace of mind, planet Jupiter blessings." },
  { id: "r2", name: "7 Mukhi Rudraksha", category: "Rudraksha", price: 599, mrp: 1499, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80", desc: "Wealth, prosperity – Goddess Lakshmi." },
  { id: "r3", name: "Rudraksha Mala (108 beads)", category: "Rudraksha", price: 899, mrp: 1999, image: "https://images.unsplash.com/photo-1622818425825-1ab30ed8b1f5?w=600&q=80", desc: "For japa, meditation and daily wear." },

  // Yantra
  { id: "y1", name: "Shri Yantra (Copper)", category: "Yantra", price: 999, mrp: 2499, image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d0c1b9?w=600&q=80", desc: "Attracts abundance and prosperity." },
  { id: "y2", name: "Vastu Dosh Nivaran Yantra", category: "Yantra", price: 799, mrp: 1799, image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80", desc: "Removes vastu doshas from home/office." },
  { id: "y3", name: "Mahalakshmi Yantra", category: "Yantra", price: 899, mrp: 1999, image: "https://images.unsplash.com/photo-1604608672386-f1b9b1d0c1b9?w=600&q=80", desc: "Wealth, success and good fortune." },
];

const CATEGORIES = ["All", "Bracelet", "Gemstone", "Rudraksha", "Yantra"];

const Shop = () => {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <PageLayout title="Spiritual Shop" subtitle="Energised astrology products — bracelets, gemstones, rudraksha & yantras">
      <SEO
        title="Astrology Shop – Bracelets, Gemstones, Rudraksha | Astro With Hrishi"
        description="Shop energised astrology products: rose quartz, tiger eye, yellow sapphire, rudraksha mala, shri yantra and more. Order on WhatsApp."
        path="/shop"
      />

      <section className="container">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                cat === c
                  ? "bg-gradient-gold text-primary-foreground border-transparent glow-gold"
                  : "border-gold/30 text-cosmic-silver/80 hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => {
            const off = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
            return (
              <article
                key={p.id}
                className="group relative glass border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/50 hover:glow-gold transition-all flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-cosmic-deep/40">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {off > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-lg">
                      {off}% OFF
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-background/70 text-gold border border-gold/30 px-2 py-1 rounded-full backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-lg text-foreground mb-1">{p.name}</h3>
                  <p className="text-xs text-cosmic-silver/70 mb-4 flex-1">{p.desc}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-gradient-gold">₹{p.price.toLocaleString()}</span>
                    {p.mrp && (
                      <span className="text-xs text-cosmic-silver/50 line-through">₹{p.mrp.toLocaleString()}</span>
                    )}
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90"
                  >
                    <a
                      href={waLink(`Hello, I'd like to order: ${p.name} (₹${p.price})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Now on WhatsApp
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-center text-xs text-cosmic-silver/60 mt-10">
          * All products are energised & abhimantrit. Prices include GST. Shipping extra as per location.
        </p>
      </section>
    </PageLayout>
  );
};

export default Shop;
