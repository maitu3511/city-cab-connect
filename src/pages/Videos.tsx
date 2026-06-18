import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";

const defaultVideos = [
  { id: "v1", youtube_id: "8GW6sLrK40k", title: "Introduction to Vedic Astrology", category: "Vedic Basics", video_type: "video" },
  { id: "v2", youtube_id: "Ksk3kP0YJzo", title: "Understanding Your Birth Chart (Kundli)", category: "Kundli", video_type: "video" },
  { id: "v3", youtube_id: "0XFsHIO_KZE", title: "The 12 Zodiac Signs Explained", category: "Zodiac", video_type: "video" },
  { id: "v4", youtube_id: "EShUeudtaFg", title: "Planets and their Influence", category: "Grahas", video_type: "video" },
  { id: "v5", youtube_id: "CevxZvSJLk8", title: "Daily Cosmic Tip", category: "Tips", video_type: "short" },
  { id: "v6", youtube_id: "kJQP7kiw5Fk", title: "Morning Mantra Practice", category: "Spiritual", video_type: "short" },
];

const Videos = () => {
  const [videos, setVideos] = useState<any[]>(defaultVideos);
  const [type, setType] = useState<"all" | "video" | "short">("all");

  useEffect(() => {
    supabase.from("videos").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setVideos(data);
    });
  }, []);

  const filtered = type === "all" ? videos : videos.filter((v) => v.video_type === type);

  return (
    <PageLayout title="Video Gallery" subtitle="Watch wisdom from the cosmos.">
      <div className="container max-w-7xl">
        <div className="flex gap-2 justify-center mb-10">
          {[
            { v: "all", l: "All" }, { v: "video", l: "Videos" }, { v: "short", l: "Shorts" },
          ].map((x) => (
            <button key={x.v} onClick={() => setType(x.v as any)} className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition ${type === x.v ? "bg-gradient-gold text-primary-foreground" : "glass-gold text-cosmic-silver/80 hover:text-gold"}`}>{x.l}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <div key={v.id} className="glass-gold rounded-2xl overflow-hidden">
              <div className={`relative ${v.video_type === "short" ? "aspect-[9/16] max-h-[500px]" : "aspect-video"} bg-black`}>
                <iframe src={`https://www.youtube.com/embed/${v.youtube_id}`} title={v.title} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-gold/80 mb-1">{v.category}</div>
                <h3 className="font-display text-foreground line-clamp-2">{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Videos;
