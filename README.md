# RENSTONE — Luxury Accessories & Timepieces

> **Timeless Style. Distinctive Details.**  
> A bespoke, editorial luxury e-commerce platform and management dashboard for premium watches, molten crest talismans, signet rings, cuffs, and chains tailored for Bangladesh.

---

## 🌐 Official Links

- **Live Public Website**: [https://renstone.vercel.app](https://renstone.vercel.app)
- **GitHub Repository**: [https://github.com/mdrokon2004/RENSTONE](https://github.com/mdrokon2004/RENSTONE)
- **Administrator Portal**: [https://renstone.vercel.app/admin/login](https://renstone.vercel.app/admin/login)
- **Official WhatsApp Concierge**: [+880 1322-177107](https://wa.me/8801322177107)
- **Official Facebook Page**: [facebook.com/profile.php?id=61594618265976](https://www.facebook.com/profile.php?id=61594618265976)
- **Official Email**: `renstoneofficialbd@gmail.com`

---

## 🌟 Key Features

- **Editorial Luxury Storefront**: Warm ivory & crisp white palettes for clear product inspection paired with obsidian black (`#111111`) and champagne gold (`#C5A46D`) editorial accents.
- **Reference-Grade Product Details**: Multi-angle photography gallery with fullscreen lightbox zoom, variant selector (sizes, finishes), real-time stock checks, and technical specifications accordion.
- **100% Genuine Activity Counter**: Live visitor indicator (`"N person watching this product"`) based strictly on genuine page visits. Order counts reflect only verified database orders.
- **Seamless Bangladesh Ordering Flow**:
  - Direct WhatsApp Concierge ordering (`https://wa.me/8801322177107`) with pre-encoded product title, variant, delivery address, and reference code.
  - Floating WhatsApp chat widget for instant customer support.
  - Automated shipping rates: Inside Dhaka (৳80) vs. Outside Dhaka (৳150), and complimentary express delivery on orders over ৳5,000.
  - Cash on Delivery (COD) standard with doorstep inspection notices.
- **Protected Administrator Control Center (`/admin`)**:
  - **Strict Server-Side Authentication**: Access is guarded strictly by Supabase Authentication and database-level authorization. Unauthenticated visitors cannot access admin views or data.
  - **Row Level Security (RLS)**: Public visitors have read-only access to published products; only verified members of `public.admin_users` can create/edit products or view customer orders.
  - **Catalog & Orders Management**: Full product CRUD, image galleries, category management, order status workflow (`Pending` → `Processing` → `Shipped` → `Delivered`), and store settings controls.

---

## 🚀 Local Development

1. Clone or navigate to the repository directory:
   ```bash
   cd G:\RENSTONE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Production Administrator Setup & Security

Administrative accounts are **never hardcoded** and cannot be registered publicly through the website. They must be provisioned securely directly in your database:

### 1. Database Schema & Row Level Security
Execute the provided SQL schema in your Supabase SQL Editor:
- File location: `supabase/migrations/20260101000000_init_renstone.sql`
- This script enables Row Level Security (RLS) across all tables (`products`, `orders`, `categories`, `store_settings`, `admin_users`).
- Only authenticated users with an authorized record in `public.admin_users` have write permissions.

### 2. Provisioning an Administrator Account
1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and navigate to **Authentication** > **Users**.
2. Click **Add User** > **Create User** and enter your administrator email and a strong private password.
3. In the Supabase **SQL Editor**, grant administrative privileges to this user ID:
   ```sql
   INSERT INTO public.admin_users (id, email, role)
   SELECT id, email, 'admin'
   FROM auth.users
   WHERE email = 'your-admin-email@yourdomain.com';
   ```
4. Add your public Supabase keys to your hosting platform's Environment Variables (e.g., in Vercel):
   - `VITE_SUPABASE_URL` = `https://your-project-ref.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-public-anon-key`
5. Log into the live portal at [https://renstone.vercel.app/admin/login](https://renstone.vercel.app/admin/login) using your provisioned credentials.

> [!IMPORTANT]
> **Never commit `.env` or `.env.local` files to GitHub**. Never place your Supabase `service_role` key in frontend code or in variables prefixed with `VITE_`. Service-role keys bypass all Row Level Security and must only be used in secure server environments.

---

## ☁️ Deployment Architecture

- **Hosting Provider**: Vercel (Edge Network)
- **Live URL**: [https://renstone.vercel.app](https://renstone.vercel.app)
- **SPA Routing**: Configured via `vercel.json` rewrites and `public/_redirects`.
- **Database & Auth**: Supabase PostgreSQL with Row Level Security.

---

## 📁 Repository Structure

```
G:\RENSTONE\
├── .env.example              # Template environment configuration (no secrets)
├── .gitignore                # Secret protection rules
├── vercel.json               # SPA rewrite rules for Vercel
├── vite.config.ts            # Vite tooling configuration
├── tailwind.config.js        # Obsidian, champagne, and ivory color system
├── supabase/
│   └── migrations/
│       └── 20260101000000_init_renstone.sql # Complete schema, RLS & storage policies
├── public/
│   ├── _redirects            # Cloudflare Pages SPA rewrite rules
│   └── renstone-logo.png     # Official high-resolution luxury logo
├── src/
│   ├── types/index.ts        # Fully typed data models
│   ├── data/mockProducts.ts  # Default catalog data
│   ├── context/
│   │   ├── StoreContext.tsx  # Server-side Supabase authentication & authorization
│   │   ├── CartContext.tsx   # Shopping bag state & checkout calculation
│   │   └── WishlistContext.tsx # Wishlist state
│   ├── lib/
│   │   ├── supabase.ts       # Supabase client initializer
│   │   └── formatters.ts     # BDT currency & phone number formatting
│   ├── components/           # Luxury UI components & floating WhatsApp concierge
│   └── pages/                # Storefront & protected /admin portal
└── README.md
```