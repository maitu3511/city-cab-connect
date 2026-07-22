import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setTimeout(async () => {
          try {
            const { data } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", sess.user.id)
              .eq("role", "admin")
              .maybeSingle();
            setIsAdmin(!!data);
          } catch {
            setIsAdmin(false);
          }
        }, 0);
      } else setIsAdmin(false);
    });
    let active = true;
    const safetyTimer = window.setTimeout(() => {
      if (active) setLoading(false);
    }, 1200);

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!active) return;
        setSession(session);
        setUser(session?.user ?? null);
      })
      .catch(() => {
        if (!active) return;
        setSession(null);
        setUser(null);
        setIsAdmin(false);
      })
      .finally(() => {
        if (!active) return;
        window.clearTimeout(safetyTimer);
        setLoading(false);
      });
    return () => {
      active = false;
      window.clearTimeout(safetyTimer);
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading, signOut: () => supabase.auth.signOut() };
};
