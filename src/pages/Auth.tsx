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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [f, setF] = useState({ email: "", password: "", name: "" });
  const [busy, setBusy] = useState(false);

  if (loading) return <PageLayout title="Auth"><div /></PageLayout>;
  if (user) return <Navigate to="/" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: f.email, password: f.password,
        options: { emailRedirectTo: `${window.location.origin}/`, data: { full_name: f.name } },
      });
      if (error) toast.error(error.message); else { toast.success("Account created!"); nav("/"); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: f.email, password: f.password });
      if (error) toast.error(error.message); else { toast.success("Welcome back!"); nav("/"); }
    }
    setBusy(false);
  };

  return (
    <PageLayout title={mode === "signin" ? "Sign In" : "Create Account"}>
      <div className="container max-w-md">
        <form onSubmit={submit} className="glass-gold rounded-3xl p-6 space-y-4">
          {mode === "signup" && <Input required placeholder="Full Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="h-12 bg-background/40 border-gold/20" />}
          <Input required type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
          <Input required type="password" placeholder="Password (min 6 chars)" minLength={6} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} className="h-12 bg-background/40 border-gold/20" />
          <Button disabled={busy} type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground glow-gold">{busy ? "…" : mode === "signin" ? "Sign In" : "Create Account"}</Button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-sm text-cosmic-silver/70 hover:text-gold w-full text-center">
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Auth;
