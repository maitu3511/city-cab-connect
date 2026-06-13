import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const statusColors: Record<string, string> = {
  pending: "text-yellow-400", paid: "text-blue-400", shipped: "text-purple-400", delivered: "text-green-400", cancelled: "text-red-400",
};

const MyOrders = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => setOrders(data ?? []));
  }, [user]);

  if (loading) return <PageLayout title="My Orders"><div /></PageLayout>;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <PageLayout title="My Orders" subtitle="Track your sacred items.">
      <div className="container max-w-4xl space-y-4">
        {orders.length === 0 ? (
          <div className="glass-gold rounded-3xl p-10 text-center text-cosmic-silver/70">
            <p>No orders yet. <Link to="/shop" className="text-gold underline">Visit shop</Link></p>
          </div>
        ) : orders.map((o) => (
          <div key={o.id} className="glass-gold rounded-2xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-xs text-cosmic-silver/60">Order #{o.id.slice(0, 8)}</div>
                <div className="text-xs text-cosmic-silver/60">{new Date(o.created_at).toLocaleDateString()}</div>
              </div>
              <span className={`text-xs uppercase font-semibold ${statusColors[o.status] ?? "text-cosmic-silver"}`}>{o.status}</span>
            </div>
            <div className="space-y-1 text-sm text-cosmic-silver/80 mb-3">
              {(o.items as any[]).map((i, idx) => <div key={idx}>• {i.name} × {i.qty}</div>)}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gold/10">
              <span className="text-xs text-cosmic-silver/60">{o.address}</span>
              <span className="font-display text-gold font-bold">₹{Number(o.total).toLocaleString("en-IN")}</span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MyOrders;
