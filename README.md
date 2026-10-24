# RENSTONE — Luxury Accessories & Timepieces

> **Timeless Style. Distinctive Details.**  
> A bespoke, editorial luxury e-commerce platform and management dashboard for premium watches, molten crest talismans, signet rings, cuffs, and chains tailored for Bangladesh.

---

## 🌟 Key Features

- **Mixed Light & Dark Luxury Aesthetic**: Warm ivory & crisp white backgrounds for product viewing paired with deep obsidian black (`#111111`) and champagne gold (`#C5A46D`) editorial sections.
- **Reference-Inspired Product Detail Experience**: Multi-angle image showcase with fullscreen lightbox zoom, variant selector (sizes, chain lengths, finishes), dynamic stock validation, and technical accordion breakdowns.
- **Direct Bangladesh Ordering Flow**:
  - Doorstep inspection notice with Cash on Delivery (COD) as standard.
  - Automatic calculation of shipping: Inside Dhaka (৳80) vs. Outside Dhaka (৳150), and complimentary express delivery on orders over ৳5,000.
  - 1-click **WhatsApp Concierge Ordering** (`https://wa.me/...`) with preformatted, encoded order summaries.
  - Facebook Messenger conversation routing.
  - One-click copyable order summary fallback.
  - Duplicate-submission prevention and unique order reference generation (`REN-YYYY-XXXXXX`).
- **Protected `/admin` Control Center**:
  - Real-time KPIs: Recorded volume (BDT), total orders, active inventory, and low-stock alerts.
  - Full Product CRUD: Create, edit, duplicate, publish/unpublish, and delete pieces.
  - Photography management, variant options editor, and technical specifications builder.
  - Orders Manager: Inspect customer details, filter by status (`Pending`, `Contacted`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`), and save internal dispatch notes.
  - Dynamic Store Settings: Update official WhatsApp number, Messenger URL, delivery fees, announcement banner, and contact info with instant storefront effect.
- **Dual-Mode Persistence Architecture**:
  - **Local Demo Mode**: Seamless offline `localStorage` fallback with 12 pre-seeded luxury pieces. You can test admin changes and cart requests immediately without entering any API keys!
  - **Supabase Cloud Mode**: Direct connection to PostgreSQL database, Supabase Auth, Row Level Security (RLS) policies, and Supabase Storage for product images.

---

## 🚀 Step 1: Running Locally

1. Open your terminal in `G:\RENSTONE`:
   ```bash
   cd G:\RENSTONE
   ```
2. Install dependencies (already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.
5. Access the Admin Portal at [http://localhost:5173/admin/login](http://localhost:5173/admin/login).
   - **Demo Admin Email**: `admin@renstone.store`
   - **Demo Admin Password**: `renstone2026`

---

## 🗄️ Step 2: Creating and Configuring a Free Supabase Project

When you are ready to switch from local storage to persistent cloud database and storage:

1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **New Project** and name it `RENSTONE` (choose `Singapore` or nearest region to Bangladesh for optimal latency).
3. In the left navigation, click **SQL Editor**.
4. Open the SQL file provided in this repository at `supabase/migrations/20260101000000_init_renstone.sql`.
5. Copy the entire script, paste it into the Supabase SQL Editor, and click **Run**.
   - This creates all normalized tables (`products`, `categories`, `product_variants`, `orders`, `order_items`, `store_settings`, `admin_users`).
   - Configures strict **Row Level Security (RLS)** policies ensuring public visitors cannot view private orders or customer data.
   - Sets up the `product-images` storage bucket.
6. Retrieve your API credentials:
   - Go to **Project Settings** > **API**.
   - Copy your **Project URL** and your **anon / public key**.
7. Create a file named `.env.local` inside `G:\RENSTONE` (or copy from `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key
   ```
8. Restart your dev server (`npm run dev`). The admin header will now display:  
   **"Storage Provider: Supabase Live Cloud"**.

---

## 🔐 Step 3: Creating Your First Secure Admin Account

1. In your Supabase Dashboard, go to **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter your private admin email (e.g. `owner@renstone.store`) and a strong password.
4. Go to the **SQL Editor** in Supabase and grant that user admin status by linking their ID:
   ```sql
   INSERT INTO public.admin_users (id, email, role)
   SELECT id, email, 'admin'
   FROM auth.users
   WHERE email = 'owner@renstone.store';
   ```
5. You can now log into your live store's `/admin/login` using your real Supabase credentials!

---

## 🐙 Step 4: Pushing the Code to GitHub

1. Initialize Git in `G:\RENSTONE` (if not already initialized):
   ```bash
   git init
   git branch -M main
   ```
2. Add all files (the included `.gitignore` protects `.env` and `node_modules`):
   ```bash
   git add .
   git commit -m "feat: initial commit of RENSTONE luxury accessories platform"
   ```
3. Create a new repository on [https://github.com](https://github.com) named `renstone`.
4. Link and push to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/renstone.git
   git push -u origin main
   ```

---

## ☁️ Step 5: Deploying Through Vercel (Free Subdomain)

1. Go to [https://vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New...** > **Project**.
3. Import your `renstone` repository.
4. In the **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = `https://your-project-ref.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
   *(Or leave them empty if you want to deploy the local demo mode first)*.
5. Click **Deploy**.
6. Within 60 seconds, your site is live at your free Vercel subdomain:  
   `https://renstone.vercel.app` (or similar).
7. Thanks to `vercel.json`, single-page routing is fully configured (`/products/:slug`, `/shop`, `/admin`, etc. load seamlessly on refresh).

---

## ⚡ Step 6: Updating the Live Website Without Pushing New Code

Once connected to Supabase:
- Log into `https://your-domain.vercel.app/admin`.
- Add a new timepiece, edit an existing ring price, or toggle the announcement bar.
- Changes are written directly to PostgreSQL.
- **The live public website updates immediately for all visitors with zero code changes, no GitHub commits, and no Vercel redeployments!**

---

## 📁 Repository Structure

```
G:\RENSTONE\
├── .env.example              # Template environment configuration
├── .gitignore                # Clean Git protection rules
├── vercel.json               # SPA rewrite rules for Vercel
├── vite.config.ts            # Fast Vite tooling
├── tailwind.config.js        # Obsidian, champagne, ivory color system
├── supabase/
│   └── migrations/
│       └── 20260101000000_init_renstone.sql # Full schema, RLS & storage
├── src/
│   ├── types/index.ts        # Fully typed data models
│   ├── data/mockProducts.ts  # 12 pre-seeded luxury accessories
│   ├── context/
│   │   ├── StoreContext.tsx  # Dual-mode Supabase/LocalStorage CRUD
│   │   ├── CartContext.tsx   # Persistent cart drawer & subtotal
│   │   └── WishlistContext.tsx # Wishlist & recently viewed tracking
│   ├── lib/
│   │   ├── supabase.ts       # Supabase client initializer
│   │   └── formatters.ts     # BDT currency & phone sanitizers
│   ├── components/           # Modular luxury UI components
│   └── pages/                # Public storefront & /admin pages
└── README.md
```