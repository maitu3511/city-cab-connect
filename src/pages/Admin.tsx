import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Download } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <PageLayout title="Admin"><div /></PageLayout>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <PageLayout title="Access Denied"><p className="container text-center text-cosmic-silver/70">You must be an admin. Ask Hrishi to grant you admin role.</p></PageLayout>;

  return (
    <PageLayout title="Admin Dashboard">
      <div className="container max-w-6xl">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="glass-gold flex-wrap h-auto justify-start">
            {["appointments", "leads", "blog", "gallery", "videos", "testimonials", "messages", "customers"].map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize data-[state=active]:bg-gradient-gold data-[state=active]:text-primary-foreground">{t}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="appointments"><AppointmentsTab /></TabsContent>
          <TabsContent value="leads"><LeadsTab /></TabsContent>
          <TabsContent value="blog"><BlogTab /></TabsContent>
          <TabsContent value="gallery"><GalleryTab /></TabsContent>
          <TabsContent value="videos"><VideosTab /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsTab /></TabsContent>
          <TabsContent value="messages"><MessagesTab /></TabsContent>
          <TabsContent value="customers"><CustomersTab /></TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

const useList = (table: string, order = "created_at") => {
  const [data, setData] = useState<any[]>([]);
  const load = () => supabase.from(table as any).select("*").order(order, { ascending: false }).then(({ data }) => setData(data ?? []));
  useEffect(() => { load(); }, []);
  return [data, load] as const;
};

const Card = ({ children }: { children: any }) => <div className="glass-gold rounded-2xl p-5 mt-6">{children}</div>;


const AppointmentsTab = () => {
  const [list, reload] = useList("appointments");
  return (
    <div className="space-y-3 mt-6">
      {list.map((a) => (
        <div key={a.id} className="glass-gold rounded-2xl p-4">
          <div className="flex justify-between">
            <div><div className="font-display text-gold">{a.name}</div><div className="text-xs text-cosmic-silver/70">{a.phone} • {a.service}</div></div>
            <div className="text-xs text-cosmic-silver/70">{a.appointment_date} {a.appointment_time}</div>
          </div>
          {a.message && <p className="text-xs text-cosmic-silver/60 mt-2">{a.message}</p>}
          <select value={a.status} onChange={async (e) => { await supabase.from("appointments").update({ status: e.target.value }).eq("id", a.id); reload(); }} className="bg-background/60 border border-gold/30 rounded px-2 text-xs mt-2">
            {["pending", "confirmed", "completed", "cancelled"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
};

const LeadsTab = () => {
  const [list, reload] = useList("visitor_leads");

  const exportCSV = () => {
    const headers = ["Name", "Mobile/Date", "Email", "City", "Service", "Created At"];
    const rows = list.map((l) => [
      l.full_name,
      l.mobile_number,
      l.email || "",
      l.city || "",
      l.interested_service || "",
      new Date(l.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitors_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Count unique dates for visitor stats
  const todayVisitors = list.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;
  const thisWeekVisitors = list.filter(l => {
    const d = new Date(l.created_at);
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  }).length;

  return (
    <div className="mt-6">
      <div className="glass-gold rounded-2xl p-4 mb-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{list.length}</div>
              <div className="text-xs text-cosmic-silver/60">Total Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{todayVisitors}</div>
              <div className="text-xs text-cosmic-silver/60">Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{thisWeekVisitors}</div>
              <div className="text-xs text-cosmic-silver/60">This Week</div>
            </div>
          </div>
          <Button onClick={exportCSV} className="bg-gradient-gold text-primary-foreground">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {list.map((lead) => (
          <div key={lead.id} className="glass-gold rounded-xl p-3 flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold">{lead.full_name}</div>
              <div className="text-xs text-cosmic-silver/60">{lead.interested_service} • {lead.city}</div>
            </div>
            <div className="text-xs text-cosmic-silver/60">
              {new Date(lead.created_at).toLocaleString()}
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center text-cosmic-silver/60 py-8">No visitors yet</div>
        )}
      </div>
    </div>
  );
};

const ProductsTab = () => {
  const [list, reload] = useList("products");
  const [f, setF] = useState({ name: "", description: "", price: "", image_url: "", category: "", stock: "100" });
  const create = async () => {
    if (!f.name || !f.price) return toast.error("Name and price required");
    const { error } = await supabase.from("products").insert({ ...f, price: parseFloat(f.price), stock: parseInt(f.stock) });
    if (error) return toast.error(error.message);
    toast.success("Created"); setF({ name: "", description: "", price: "", image_url: "", category: "", stock: "100" }); reload();
  };
  const del = async (id: string) => { await supabase.from("products").delete().eq("id", id); reload(); };
  return (
    <>
      <Card>
        <h3 className="font-display text-gold mb-3">Add Product</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Input placeholder="Category" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} />
          <Input placeholder="Price (₹)" type="number" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
          <Input placeholder="Stock" type="number" value={f.stock} onChange={(e) => setF({ ...f, stock: e.target.value })} />
          <Input placeholder="Image URL" value={f.image_url} onChange={(e) => setF({ ...f, image_url: e.target.value })} className="sm:col-span-2" />
          <Textarea placeholder="Description" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} className="sm:col-span-2" />
        </div>
        <Button onClick={create} className="mt-3 bg-gradient-gold text-primary-foreground">Add Product</Button>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {list.map((p) => (
          <div key={p.id} className="glass-gold rounded-2xl p-4 flex gap-3">
            {p.image_url && <img src={p.image_url} className="h-16 w-16 rounded object-cover" />}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{p.name}</div>
              <div className="text-xs text-gold">₹{Number(p.price).toLocaleString("en-IN")}</div>
              <div className="text-xs text-cosmic-silver/60">Stock: {p.stock}</div>
            </div>
            <button onClick={() => del(p.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </>
  );
};

const BlogTab = () => {
  const [list, reload] = useList("blog_posts");
  const [f, setF] = useState({ slug: "", title: "", excerpt: "", content: "", cover_url: "" });
  const create = async () => {
    if (!f.slug || !f.title) return toast.error("Slug & title required");
    const { error } = await supabase.from("blog_posts").insert(f);
    if (error) return toast.error(error.message);
    toast.success("Posted"); setF({ slug: "", title: "", excerpt: "", content: "", cover_url: "" }); reload();
  };
  return (
    <>
      <Card>
        <h3 className="font-display text-gold mb-3">New Post</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Slug (url-friendly)" value={f.slug} onChange={(e) => setF({ ...f, slug: e.target.value })} />
          <Input placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <Input placeholder="Cover image URL" value={f.cover_url} onChange={(e) => setF({ ...f, cover_url: e.target.value })} className="sm:col-span-2" />
          <Textarea placeholder="Excerpt" value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} className="sm:col-span-2" />
          <Textarea placeholder="Content (markdown supported)" value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} className="sm:col-span-2 min-h-[200px]" />
        </div>
        <Button onClick={create} className="mt-3 bg-gradient-gold text-primary-foreground">Publish</Button>
      </Card>
      <div className="space-y-2 mt-6">
        {list.map((p) => (
          <div key={p.id} className="glass-gold rounded-2xl p-3 flex justify-between items-center">
            <span className="text-sm">{p.title}</span>
            <button onClick={async () => { await supabase.from("blog_posts").delete().eq("id", p.id); reload(); }} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </>
  );
};

const GalleryTab = () => {
  const [list, reload] = useList("gallery_items");
  const [f, setF] = useState({ image_url: "", caption: "", category: "events" });
  return (
    <>
      <Card>
        <div className="grid sm:grid-cols-3 gap-3">
          <Input placeholder="Image URL" value={f.image_url} onChange={(e) => setF({ ...f, image_url: e.target.value })} className="sm:col-span-2" />
          <select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} className="bg-background/60 border border-gold/30 rounded px-3">
            {["events", "clients", "spiritual", "photos"].map((c) => <option key={c}>{c}</option>)}
          </select>
          <Input placeholder="Caption" value={f.caption} onChange={(e) => setF({ ...f, caption: e.target.value })} className="sm:col-span-3" />
        </div>
        <Button onClick={async () => { if (!f.image_url) return; await supabase.from("gallery_items").insert(f); setF({ image_url: "", caption: "", category: "events" }); reload(); }} className="mt-3 bg-gradient-gold text-primary-foreground">Add Image</Button>
      </Card>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-6">
        {list.map((g) => (
          <div key={g.id} className="relative aspect-square rounded-lg overflow-hidden group">
            <img src={g.image_url} className="w-full h-full object-cover" />
            <button onClick={async () => { await supabase.from("gallery_items").delete().eq("id", g.id); reload(); }} className="absolute top-1 right-1 bg-destructive/80 text-white rounded p-1 opacity-0 group-hover:opacity-100"><Trash2 className="h-3 w-3" /></button>
          </div>
        ))}
      </div>
    </>
  );
};

const VideosTab = () => {
  const [list, reload] = useList("videos");
  const [f, setF] = useState({ youtube_id: "", title: "", description: "", category: "general", video_type: "video" });
  return (
    <>
      <Card>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" value={f.youtube_id} onChange={(e) => setF({ ...f, youtube_id: e.target.value })} />
          <Input placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <Input placeholder="Category" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} />
          <select value={f.video_type} onChange={(e) => setF({ ...f, video_type: e.target.value })} className="bg-background/60 border border-gold/30 rounded px-3">
            <option value="video">Video</option><option value="short">Short</option>
          </select>
        </div>
        <Button onClick={async () => { if (!f.youtube_id || !f.title) return; await supabase.from("videos").insert(f); setF({ youtube_id: "", title: "", description: "", category: "general", video_type: "video" }); reload(); }} className="mt-3 bg-gradient-gold text-primary-foreground">Add Video</Button>
      </Card>
      <div className="space-y-2 mt-6">
        {list.map((v) => (
          <div key={v.id} className="glass-gold rounded-2xl p-3 flex justify-between items-center">
            <span className="text-sm">{v.title} <span className="text-xs text-cosmic-silver/60">[{v.video_type}]</span></span>
            <button onClick={async () => { await supabase.from("videos").delete().eq("id", v.id); reload(); }} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </>
  );
};

const TestimonialsTab = () => {
  const [list, reload] = useList("testimonials");
  const [f, setF] = useState({ client_name: "", location: "", rating: 5, message: "" });
  return (
    <>
      <Card>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Client name" value={f.client_name} onChange={(e) => setF({ ...f, client_name: e.target.value })} />
          <Input placeholder="Location" value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} />
          <Textarea placeholder="Message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="sm:col-span-2" />
        </div>
        <Button onClick={async () => { if (!f.client_name || !f.message) return; await supabase.from("testimonials").insert(f); setF({ client_name: "", location: "", rating: 5, message: "" }); reload(); }} className="mt-3 bg-gradient-gold text-primary-foreground">Add</Button>
      </Card>
      <div className="space-y-2 mt-6">
        {list.map((t) => (
          <div key={t.id} className="glass-gold rounded-2xl p-3 flex justify-between items-center">
            <div><div className="text-sm font-semibold">{t.client_name}</div><div className="text-xs text-cosmic-silver/70 line-clamp-1">{t.message}</div></div>
            <button onClick={async () => { await supabase.from("testimonials").delete().eq("id", t.id); reload(); }} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </>
  );
};

const MessagesTab = () => {
  const [list] = useList("contact_messages");
  return (
    <div className="space-y-3 mt-6">
      {list.map((m) => (
        <div key={m.id} className="glass-gold rounded-2xl p-4">
          <div className="flex justify-between">
            <div className="font-display text-gold">{m.name}</div>
            <div className="text-xs text-cosmic-silver/60">{new Date(m.created_at).toLocaleString()}</div>
          </div>
          <div className="text-xs text-cosmic-silver/70">{m.email} • {m.phone}</div>
          {m.subject && <div className="text-sm text-foreground mt-1">{m.subject}</div>}
          <p className="text-sm text-cosmic-silver/85 mt-2">{m.message}</p>
        </div>
      ))}
    </div>
  );
};

const CustomersTab = () => {
  const [list] = useList("profiles");
  return (
    <div className="space-y-2 mt-6">
      {list.map((p) => (
        <div key={p.id} className="glass-gold rounded-2xl p-3 flex justify-between">
          <div><div className="text-sm font-semibold">{p.full_name || "—"}</div><div className="text-xs text-cosmic-silver/60">{p.email}</div></div>
          <div className="text-xs text-cosmic-silver/60">{new Date(p.created_at).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
