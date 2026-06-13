import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const { id } = useParams();
  return (
    <PageLayout>
      <div className="container max-w-xl pt-32 text-center">
        <CheckCircle2 className="h-20 w-20 text-gold mx-auto mb-6 animate-pulse-glow rounded-full" />
        <h1 className="font-display text-4xl text-gradient-gold font-bold mb-4">Order Received!</h1>
        <p className="text-cosmic-silver/80 mb-2">Thank you for your order.</p>
        {id && <p className="text-xs text-cosmic-silver/60 mb-6">Order ID: {id.slice(0, 8)}</p>}
        <p className="text-sm text-cosmic-silver/70 mb-8">We've sent your order details on WhatsApp. Hrishi ji will confirm shortly.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild variant="outline" className="border-gold/40 text-gold"><Link to="/orders">My Orders</Link></Button>
          <Button asChild className="bg-gradient-gold text-primary-foreground"><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderSuccess;
