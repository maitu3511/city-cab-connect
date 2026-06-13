## Phase 2 — Complete Astro With Hrishi Platform

This is a large build. I'll deliver it in **one coordinated implementation** keeping the existing premium 3D cosmic design across every page.

---

### 1. Backend (Lovable Cloud)
Enable Lovable Cloud first — required for database, auth, edge functions, payments, and admin panel.

**Database tables (with RLS):**
- `profiles` — user info (linked to auth.users)
- `user_roles` — admin role management (separate table, security-definer `has_role` function)
- `products` — shop items (name, description, price, image, stock, category)
- `orders` — customer orders (user, items JSON, total, status, address, payment_id)
- `appointments` — booking submissions (name, phone, service, date, time, message, status)
- `blog_posts` — blog (title, slug, content, cover, published)
- `gallery_items` — photos (url, category, caption)
- `videos` — YouTube/Reels (youtube_id, title, category, type)
- `testimonials` — client reviews
- `contact_messages` — contact form submissions

**Edge Functions:**
- `create-razorpay-order` — create payment order
- `verify-razorpay-payment` — verify signature, mark order paid
- `send-whatsapp-notification` — sends WhatsApp messages via `wa.me` deep link generation server-side + logs (true WhatsApp API requires Twilio/Meta business — see note below)
- `submit-appointment` — store appointment + trigger WhatsApp link
- `admin-stats` — dashboard metrics

**Secrets needed:**
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (you'll need to provide from Razorpay dashboard)
- WhatsApp: free tier uses `wa.me` deep links (auto-opens WhatsApp with prefilled message). For fully automated send-without-user-action, you'd need Twilio WhatsApp Business API or Meta Cloud API — extra cost & business verification. I'll build with deep-link flow + log to admin DB by default; we can upgrade later.

---

### 2. Pages (all themed with cosmic design)
Routes added to `App.tsx`:
- `/` Home (existing)
- `/about` About Us
- `/services` Services detail
- `/booking` Appointment
- `/shop` Product catalog
- `/shop/:id` Product detail (Add to Cart + Buy Now)
- `/cart` Cart
- `/checkout` Checkout + Razorpay
- `/order-success/:id` Confirmation
- `/orders` My Orders + tracking
- `/gallery` Photo gallery (categories: Events, Clients, Spiritual)
- `/videos` Video gallery (YouTube + Shorts categories)
- `/testimonials` Testimonials
- `/blog` Blog list
- `/blog/:slug` Blog post
- `/contact` Contact + form + map
- `/faq` FAQ accordion
- `/privacy`, `/refund`, `/terms` Legal pages
- `/auth` Login/Signup (email+password)
- `/admin` Admin dashboard (role-gated)
  - Products, Orders, Appointments, Blog, Gallery, Videos, Customers, Messages

---

### 3. E-commerce flow
1. Browse `/shop` → product card → detail page
2. Add to Cart (Zustand store, persisted localStorage) or Buy Now
3. Checkout: collect name, phone, email, address → create order (pending) → Razorpay popup
4. On success: verify signature in edge function → mark paid → generate WhatsApp links (customer confirmation + astrologer notification with all details) → redirect to `/order-success/:id`
5. Order tracking on `/orders` (status: pending/confirmed/shipped/delivered)

---

### 4. Appointment flow
Existing form → also stores in DB + opens astrologer WhatsApp with full details (already partially built).

---

### 5. Multi-language
`i18next` + `react-i18next` with EN/HI/GU JSON resources for all UI strings. Language switcher in navbar (saves to localStorage). Static content translated; dynamic DB content stays in entered language.

---

### 6. Admin Panel
Role-gated `/admin` route. Sidebar with:
- Dashboard stats
- Products CRUD (image upload to Cloud storage)
- Orders list + status update
- Appointments list + mark complete
- Blog CRUD (markdown editor)
- Gallery upload
- Videos CRUD (YouTube ID input)
- Customers list

First registered user can be promoted to admin via SQL snippet I'll provide.

---

### 7. Design consistency
- Reuse `StarField`, glass-gold cards, gradient-gold text, Cinzel/Cormorant fonts
- Framer Motion page transitions
- Mobile responsive throughout

---

### Inputs I need from you before/during build:
1. **Razorpay keys** — get from https://dashboard.razorpay.com → Settings → API Keys (test mode is fine to start). I'll prompt for these via the secrets tool after Cloud is enabled.
2. **WhatsApp method** — confirm OK with `wa.me` deep-link flow (free, opens WhatsApp on the customer/astrologer device) vs. paid Twilio/Meta auto-send. Default: deep-link.
3. **Admin email** — which email will be the first admin? (You can sign up with it, then I'll show you how to grant admin.)
4. **Initial seed content** — should I seed example products, blog posts, gallery placeholders so the site looks alive on launch? (Recommended: yes.)

---

### Build order (so you see progress quickly):
1. Enable Cloud + create all DB tables + RLS + roles
2. Auth pages + i18n setup + routing skeleton + Layout wrapper
3. Shop + Cart + Checkout + Razorpay + WhatsApp automation
4. Appointment DB persistence
5. Blog, Gallery, Videos, Testimonials, Contact, FAQ, Legal pages
6. Admin panel
7. Seed content + final polish

This will be a long build with many files. Approve to proceed, and answer the 4 questions above (or say "defaults" and I'll use: wa.me deep links, seed yes, ask for Razorpay keys & admin email as I go).