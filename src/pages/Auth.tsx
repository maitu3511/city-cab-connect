import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  if (loading) return <PageLayout title="Admin Login"><div /></PageLayout>;
  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: f.email.trim(),
      password: f.password,
    });
    if (error) {
      toast.error("Invalid credentials. Access is restricted.");
    } else {
      toast.success("Welcome back!");
      nav("/admin");
    }
    setBusy(false);
  };

  return (
    <PageLayout title="Admin Login">
      <div className="container max-w-md">
        <form onSubmit={submit} className="glass-gold rounded-3xl p-6 space-y-4">
          <p className="text-sm text-cosmic-silver/70 text-center">
            Restricted access. Only authorised admin can sign in.
          </p>
          <Input
            required
            type="email"
            placeholder="Email"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            className="h-12 bg-background/40 border-gold/20"
          />
          <Input
            required
            type="password"
            placeholder="Password"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            className="h-12 bg-background/40 border-gold/20"
          />
          <Button
            disabled={busy}
            type="submit"
            size="lg"
            className="w-full bg-gradient-gold text-primary-foreground glow-gold"
          >
            {busy ? "…" : "Sign In"}
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Auth;
