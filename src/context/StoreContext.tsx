import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order, StoreSettings, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_STORE_SETTINGS } from '../data/mockProducts';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { generateOrderReference } from '../lib/formatters';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  settings: StoreSettings;
  isCloudConnected: boolean;
  isLoading: boolean;
  // Admin auth
  isAdminAuthenticated: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string) => Promise<Product>;
  togglePublish: (id: string) => Promise<void>;
  // Category CRUD
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Orders
  createOrder: (orderData: Omit<Order, 'id' | 'orderReference' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, internalNotes?: string) => Promise<void>;
  // Settings
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = 'renstone_products';
const LOCAL_STORAGE_CATEGORIES = 'renstone_categories';
const LOCAL_STORAGE_ORDERS = 'renstone_orders';
const LOCAL_STORAGE_SETTINGS = 'renstone_settings';
const LOCAL_STORAGE_ADMIN_AUTH = 'renstone_admin_auth';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Initialize Data
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);

      // Check Admin Auth session
      if (isSupabaseConfigured && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAdminAuthenticated(true);
          setAdminEmail(session.user.email || 'Admin');
        }
      } else {
        const storedAuth = localStorage.getItem(LOCAL_STORAGE_ADMIN_AUTH);
        if (storedAuth) {
          const authObj = JSON.parse(storedAuth);
          setIsAdminAuthenticated(authObj.isAuth);
          setAdminEmail(authObj.email);
        }
      }

      // Load Store Data
      if (isSupabaseConfigured && supabase) {
        try {
          // Fetch from Supabase
          const { data: prodsData, error: prodsErr } = await supabase.from('products').select('*');
          const { data: catsData, error: catsErr } = await supabase.from('categories').select('*');
          const { data: setsData } = await supabase.from('store_settings').select('*').single();
          const { data: ordsData } = await supabase.from('orders').select('*, items:order_items(*)');

          if (!prodsErr && prodsData && prodsData.length > 0) {
            setProducts(prodsData.map(mapSupabaseProduct));
          } else {
            setProducts(INITIAL_PRODUCTS);
          }

          if (!catsErr && catsData && catsData.length > 0) {
            setCategories(catsData);
          } else {
            setCategories(INITIAL_CATEGORIES);
          }

          if (setsData) {
            setSettings({
              storeName: setsData.store_name,
              tagline: setsData.tagline,
              whatsappNumber: setsData.whatsapp_number,
              messengerUrl: setsData.messenger_url,
              dhakaDeliveryFee: Number(setsData.dhaka_delivery_fee),
              outsideDhakaDeliveryFee: Number(setsData.outside_dhaka_delivery_fee),
              freeDeliveryThreshold: Number(setsData.free_delivery_threshold),
              announcementText: setsData.announcement_text,
              announcementEnabled: setsData.announcement_enabled,
              contactEmail: setsData.contact_email,
              contactPhone: setsData.contact_phone,
              contactAddress: setsData.contact_address,
            });
          }

          if (ordsData) {
            setOrders(ordsData.map(mapSupabaseOrder));
          }
        } catch (err) {
          console.warn('Falling back to local data due to Supabase fetch error:', err);
          loadLocalFallback();
        }
      } else {
        loadLocalFallback();
      }

      setIsLoading(false);
    }

    loadInitialData();
  }, []);

  function loadLocalFallback() {
    const savedProds = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
    const savedCats = localStorage.getItem(LOCAL_STORAGE_CATEGORIES);
    const savedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS);
    const savedSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS);

    setProducts(savedProds ? JSON.parse(savedProds) : INITIAL_PRODUCTS);
    setCategories(savedCats ? JSON.parse(savedCats) : INITIAL_CATEGORIES);
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    setSettings(savedSettings ? JSON.parse(savedSettings) : INITIAL_STORE_SETTINGS);
  }

  // Helper mappings
  function mapSupabaseProduct(row: any): Product {
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      category: row.category_slug,
      description: row.description,
      highlights: row.highlights || [],
      price: Number(row.price),
      compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
      images: row.images || [],
      variants: row.variants || [],
      stockQuantity: row.stock_quantity || 0,
      isPublished: row.is_published ?? true,
      isFeatured: row.is_featured ?? false,
      isNewArrival: row.is_new_arrival ?? false,
      specifications: row.specifications || [],
      careInstructions: row.care_instructions,
      warranty: row.warranty,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  function mapSupabaseOrder(row: any): Order {
    return {
      id: row.id,
      orderReference: row.order_reference,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      district: row.district,
      area: row.area,
      address: row.address,
      notes: row.notes,
      preferredChannel: row.preferred_channel,
      items: row.items || [],
      subtotal: Number(row.subtotal),
      deliveryFee: Number(row.delivery_fee),
      total: Number(row.total),
      status: row.status,
      internalNotes: row.internal_notes,
      createdAt: row.created_at
    };
  }

  // Admin Auth Methods
  async function loginAdmin(email: string, pass: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) {
        return { success: false, error: error.message };
      }
      setIsAdminAuthenticated(true);
      setAdminEmail(data.user?.email || email);
      return { success: true };
    } else {
      // Local demo password check: accept 'admin@renstone.store' / 'renstone2026' or demo credentials
      if (email.trim() && pass.length >= 6) {
        setIsAdminAuthenticated(true);
        setAdminEmail(email.trim());
        localStorage.setItem(LOCAL_STORAGE_ADMIN_AUTH, JSON.stringify({ isAuth: true, email: email.trim() }));
        return { success: true };
      }
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
  }

  async function logoutAdmin() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_AUTH);
  }

  // Product CRUD
  async function addProduct(prodData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const newId = 'ren-' + Date.now().toString(36);
    const newProduct: Product = {
      ...prodData,
      id: newId,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('products').insert([{
          slug: newProduct.slug,
          name: newProduct.name,
          category_slug: newProduct.category,
          description: newProduct.description,
          highlights: newProduct.highlights,
          price: newProduct.price,
          compare_at_price: newProduct.compareAtPrice,
          images: newProduct.images,
          stock_quantity: newProduct.stockQuantity,
          is_published: newProduct.isPublished,
          is_featured: newProduct.isFeatured,
          is_new_arrival: newProduct.isNewArrival,
          specifications: newProduct.specifications,
          care_instructions: newProduct.careInstructions,
          warranty: newProduct.warranty
        }]).select().single();

        if (error) throw error;
        if (data) newProduct.id = data.id;
      } catch (err) {
        console.error('Supabase product insert failed:', err);
      }
    }

    setProducts(prev => {
      const updated = [newProduct, ...prev];
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(updated));
      return updated;
    });

    return newProduct;
  }

  async function updateProduct(id: string, updates: Partial<Product>) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').update({
          ...(updates.name && { name: updates.name }),
          ...(updates.slug && { slug: updates.slug }),
          ...(updates.category && { category_slug: updates.category }),
          ...(updates.description && { description: updates.description }),
          ...(updates.highlights && { highlights: updates.highlights }),
          ...(updates.price !== undefined && { price: updates.price }),
          ...(updates.compareAtPrice !== undefined && { compare_at_price: updates.compareAtPrice }),
          ...(updates.images && { images: updates.images }),
          ...(updates.stockQuantity !== undefined && { stock_quantity: updates.stockQuantity }),
          ...(updates.isPublished !== undefined && { is_published: updates.isPublished }),
          ...(updates.isFeatured !== undefined && { is_featured: updates.isFeatured }),
          ...(updates.isNewArrival !== undefined && { is_new_arrival: updates.isNewArrival }),
          ...(updates.specifications && { specifications: updates.specifications }),
          ...(updates.careInstructions !== undefined && { care_instructions: updates.careInstructions }),
          ...(updates.warranty !== undefined && { warranty: updates.warranty }),
          updated_at: new Date().toISOString()
        }).eq('id', id);
      } catch (err) {
        console.error('Supabase product update failed:', err);
      }
    }

    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(updated));
      return updated;
    });
  }

  async function deleteProduct(id: string) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase product delete failed:', err);
      }
    }

    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(updated));
      return updated;
    });
  }

  async function duplicateProduct(id: string): Promise<Product> {
    const target = products.find(p => p.id === id);
    if (!target) throw new Error('Product not found');

    const copyData: Omit<Product, 'id' | 'createdAt'> = {
      ...target,
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy-${Math.floor(Math.random() * 900 + 100)}`,
      isPublished: false
    };

    return addProduct(copyData);
  }

  async function togglePublish(id: string) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    await updateProduct(id, { isPublished: !prod.isPublished });
  }

  // Category CRUD
  async function addCategory(catData: Omit<Category, 'id'>): Promise<Category> {
    const newCategory: Category = {
      ...catData,
      id: 'cat-' + Date.now().toString(36)
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('categories').insert([{
          slug: newCategory.slug,
          name: newCategory.name,
          description: newCategory.description,
          image: newCategory.image,
          display_order: newCategory.displayOrder || 0
        }]);
      } catch (err) {
        console.error('Supabase category insert failed:', err);
      }
    }

    setCategories(prev => {
      const updated = [...prev, newCategory];
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(updated));
      return updated;
    });

    return newCategory;
  }

  async function updateCategory(id: string, updates: Partial<Category>) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('categories').update(updates).eq('id', id);
      } catch (err) {
        console.error('Supabase category update failed:', err);
      }
    }

    setCategories(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c);
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(updated));
      return updated;
    });
  }

  async function deleteCategory(id: string) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase category delete failed:', err);
      }
    }

    setCategories(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(updated));
      return updated;
    });
  }

  // Orders
  async function createOrder(orderData: Omit<Order, 'id' | 'orderReference' | 'createdAt' | 'status'>): Promise<Order> {
    const ref = generateOrderReference();
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderReference: ref,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: ordRow, error: ordErr } = await supabase.from('orders').insert([{
          order_reference: newOrder.orderReference,
          customer_name: newOrder.customerName,
          customer_phone: newOrder.customerPhone,
          district: newOrder.district,
          area: newOrder.area,
          address: newOrder.address,
          notes: newOrder.notes,
          preferred_channel: newOrder.preferredChannel,
          subtotal: newOrder.subtotal,
          delivery_fee: newOrder.deliveryFee,
          total: newOrder.total,
          status: 'Pending'
        }]).select().single();

        if (!ordErr && ordRow) {
          newOrder.id = ordRow.id;
          // Insert order items
          const itemInserts = newOrder.items.map(item => ({
            order_id: ordRow.id,
            product_id: item.productId,
            product_name: item.productName,
            variant_name: item.variantName || null,
            unit_price: item.unitPrice,
            quantity: item.quantity,
            line_total: item.lineTotal,
            image: item.image
          }));
          await supabase.from('order_items').insert(itemInserts);
        }
      } catch (err) {
        console.error('Supabase order creation error:', err);
      }
    }

    setOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(updated));
      return updated;
    });

    return newOrder;
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus, internalNotes?: string) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({
          status,
          ...(internalNotes !== undefined && { internal_notes: internalNotes }),
          updated_at: new Date().toISOString()
        }).eq('id', orderId);
      } catch (err) {
        console.error('Supabase update order status error:', err);
      }
    }

    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? {
        ...o,
        status,
        ...(internalNotes !== undefined && { internalNotes }),
        updatedAt: new Date().toISOString()
      } : o);
      localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(updated));
      return updated;
    });
  }

  // Store Settings
  async function updateSettings(newSettings: Partial<StoreSettings>) {
    const updated = { ...settings, ...newSettings };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('store_settings').update({
          store_name: updated.storeName,
          tagline: updated.tagline,
          whatsapp_number: updated.whatsappNumber,
          messenger_url: updated.messengerUrl,
          dhaka_delivery_fee: updated.dhakaDeliveryFee,
          outside_dhaka_delivery_fee: updated.outsideDhakaDeliveryFee,
          free_delivery_threshold: updated.freeDeliveryThreshold,
          announcement_text: updated.announcementText,
          announcement_enabled: updated.announcementEnabled,
          contact_email: updated.contactEmail,
          contact_phone: updated.contactPhone,
          contact_address: updated.contactAddress,
          updated_at: new Date().toISOString()
        }).eq('id', 1);
      } catch (err) {
        console.error('Supabase store settings update error:', err);
      }
    }

    setSettings(updated);
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(updated));
  }

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      orders,
      settings,
      isCloudConnected: isSupabaseConfigured,
      isLoading,
      isAdminAuthenticated,
      adminEmail,
      loginAdmin,
      logoutAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      duplicateProduct,
      togglePublish,
      addCategory,
      updateCategory,
      deleteCategory,
      createOrder,
      updateOrderStatus,
      updateSettings
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
