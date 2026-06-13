import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const [p, setP] = useState<any>(null);
  useEffect(() => {
    if (!slug) return;
    supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle().then(({ data }) => setP(data));
  }, [slug]);

  if (!p) return <PageLayout title="Loading…"><div /></PageLayout>;

  return (
    <PageLayout>
      <article className="container max-w-3xl pt-28">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-cosmic-silver/70 hover:text-gold mb-6"><ArrowLeft className="h-4 w-4" />All posts</Link>
        {p.cover_url && <img src={p.cover_url} alt={p.title} className="w-full rounded-3xl mb-8 aspect-video object-cover" />}
        <div className="text-xs text-gold mb-3">{new Date(p.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</div>
        <h1 className="font-display text-4xl font-bold text-gradient-gold mb-6">{p.title}</h1>
        <div className="prose prose-invert max-w-none text-cosmic-silver/85 whitespace-pre-wrap leading-relaxed">{p.content}</div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
