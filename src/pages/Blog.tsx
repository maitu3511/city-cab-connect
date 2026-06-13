import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false }).then(({ data }) => setPosts(data ?? []));
  }, []);

  return (
    <PageLayout title="Cosmic Insights" subtitle="Wisdom, predictions and spiritual guidance.">
      <div className="container max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="glass-gold rounded-2xl overflow-hidden group hover:glow-gold transition-all block">
              {p.cover_url && <div className="aspect-video overflow-hidden"><img src={p.cover_url} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>}
              <div className="p-5">
                <div className="text-xs text-gold/80 mb-2">{new Date(p.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</div>
                <h3 className="font-display text-lg text-foreground group-hover:text-gold mb-2 line-clamp-2">{p.title}</h3>
                <p className="text-sm text-cosmic-silver/70 line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
