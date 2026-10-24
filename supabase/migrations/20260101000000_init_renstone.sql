-- ====================================================================
-- RENSTONE LUXURY ACCESSORIES - SUPABASE POSTGRESQL SCHEMA
-- Migration: 20260101000000_init_renstone.sql
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category_slug TEXT REFERENCES public.categories(slug) ON UPDATE CASCADE ON DELETE SET NULL,
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2) CHECK (compare_at_price IS NULL OR compare_at_price >= price),
    images TEXT[] DEFAULT '{}',
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    specifications JSONB DEFAULT '[]'::jsonb,
    care_instructions TEXT,
    warranty TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Create Product Variants Table
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    price_modifier NUMERIC(10, 2) DEFAULT 0,
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    attributes JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_reference TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    preferred_channel TEXT DEFAULT 'whatsapp' CHECK (preferred_channel IN ('whatsapp', 'messenger')),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    delivery_fee NUMERIC(10, 2) NOT NULL CHECK (delivery_fee >= 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    variant_name TEXT,
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    line_total NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
    image TEXT
);

-- 7. Create Store Settings Table
CREATE TABLE IF NOT EXISTS public.store_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    store_name TEXT DEFAULT 'RENSTONE',
    tagline TEXT DEFAULT 'Timeless Style. Distinctive Details.',
    whatsapp_number TEXT DEFAULT '8801700000000',
    messenger_url TEXT DEFAULT 'https://m.me/renstone.official',
    dhaka_delivery_fee NUMERIC(10, 2) DEFAULT 80,
    outside_dhaka_delivery_fee NUMERIC(10, 2) DEFAULT 150,
    free_delivery_threshold NUMERIC(10, 2) DEFAULT 5000,
    announcement_text TEXT DEFAULT 'Complimentary Express Shipping on orders over ৳5,000 across Bangladesh',
    announcement_enabled BOOLEAN DEFAULT true,
    contact_email TEXT DEFAULT 'concierge@renstone.store',
    contact_phone TEXT DEFAULT '+880 1700-000000',
    contact_address TEXT DEFAULT 'Gulshan 2, Dhaka 1212, Bangladesh',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Create Admin Users Table (Links to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Create Useful Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_reference ON public.orders(order_reference);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);

-- 10. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Define RLS Policies

-- Categories: Public read, Admin write
CREATE POLICY "Public categories read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admin categories all" ON public.categories FOR ALL USING (public.is_admin());

-- Products: Public read published only, Admin full access
CREATE POLICY "Public published products read" ON public.products FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin products all" ON public.products FOR ALL USING (public.is_admin());

-- Product Variants: Public read, Admin write
CREATE POLICY "Public variants read" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Admin variants all" ON public.product_variants FOR ALL USING (public.is_admin());

-- Store Settings: Public read, Admin write
CREATE POLICY "Public settings read" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Admin settings update" ON public.store_settings FOR ALL USING (public.is_admin());

-- Orders: Public can INSERT only (anonymous checkout), Admin full access
CREATE POLICY "Public order insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin orders all" ON public.orders FOR ALL USING (public.is_admin());

-- Order Items: Public can INSERT with valid order, Admin full access
CREATE POLICY "Public order items insert" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin order items all" ON public.order_items FOR ALL USING (public.is_admin());

-- Admin Users: Only admins can view/edit admin table
CREATE POLICY "Admin users self read" ON public.admin_users FOR SELECT USING (auth.uid() = id OR public.is_admin());

-- 12. Storage Bucket Setup (Run if storage extension is active)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public image read" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin image upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin image delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
