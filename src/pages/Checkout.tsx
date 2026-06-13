import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Checkout = () => {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <PageLayout title="Checkout">
        <div className="container max-w-2xl text-center">
          <p className="text-cosmic-silver/70">Cart is empty.</p>
        </div>
      </PageLayout>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return toast.error("Please fill all required fields");
    setSubmitting(true);
    const orderItems = items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.quantity }));
    const subtotal = total();

    let orderId: string | null = null;
    if (user) {
      const { data, error } = await supabase.from("orders").insert({
        user_id: user.id,
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email || null,
        address: form.address,
        items: orderItems,
        subtotal,
        total: subtotal,
        notes: form.notes || null,
        status: "pending",
      }).select("id").single();
      if (error) { toast.error("Order save failed"); setSubmitting(false); return; }
      orderId = data?.id ?? null;
    }

    const itemsTxt = items.map((i) => `• ${i.name} × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString("en-IN")}`).join("\n");
    const msg = `🛍️ *NEW ORDER*\n\n👤 *Customer:* ${form.name}\n📞 *Phone:* ${form.phone}${form.email ? `\n📧 *Email:* ${form.email}` : ""}\n📍 *Address:* ${form.address}\n\n*Items:*\n${itemsTxt}\n\n💰 *Total: ₹${subtotal.toLocaleString("en-IN")}*${form.notes ? `\n\n📝 *Notes:* ${form.notes}` : ""}${orderId ? `\n\n🆔 Order ID: ${orderId.slice(0, 8)}` : ""}\n\nPlease confirm.`;
    openWhatsApp(msg);
    clear();
    toast.success("Order sent on WhatsApp!");
    nav(orderId ? `/order-success/${orderId}` : "/");
  };

  return (
    <PageLayout title="Checkout" subtitle="Complete your details — we'll confirm on WhatsApp.">
      <div className="container max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6">
          <form onSubmit={submit} className="md:col-span-2 glass-gold rounded-3xl p-6 space-y-4">
            <Input required placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Input required type="tel" placeholder="Mobile Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
            <Textarea required placeholder="Delivery Address *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="bg-background/40 border-gold/20" />
            <Textarea placeholder="Order notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-background/40 border-gold/20" />
            <Button disabled={submitting} type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground glow-gold">
              <MessageCircle className="h-5 w-5 mr-2" />{submitting ? "Sending…" : "Send Order on WhatsApp"}
            </Button>
            {!user && <p className="text-xs text-cosmic-silver/60 text-center">Sign in to track your orders later.</p>}
          </form>
          <div className="glass-gold rounded-3xl p-6 h-fit">
            <h3 className="font-display text-lg text-gold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-cosmic-silver/80">
                  <span className="line-clamp-1 pr-2">{i.name} × {i.quantity}</span>
                  <span>₹{(i.price * i.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="gold-divider my-4" />
            <div className="flex justify-between font-display text-lg"><span>Total</span><span className="text-gradient-gold font-bold">₹{total().toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
