export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  displayOrder?: number;
}

export interface ProductVariantOption {
  id: string;
  name: string; // e.g. "Size 10 / Champagne Gold" or "Midnight Leather Strap"
  sku: string;
  priceModifier?: number; // add or subtract from base price
  stockQuantity: number;
  attributes: Record<string, string>; // { size: '10', finish: 'Gold' }
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // matches Category slug (e.g. 'watches', 'pendants', 'rings', 'bracelets', 'chains')
  description: string;
  highlights: string[];
  price: number; // In BDT
  compareAtPrice?: number; // In BDT (optional)
  images: string[];
  variants: ProductVariantOption[];
  stockQuantity: number;
  isPublished: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  specifications: ProductSpecification[];
  careInstructions?: string;
  warranty?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string; // unique item id = productId + (variantId || '')
  productId: string;
  product: Product;
  selectedVariant?: ProductVariantOption;
  quantity: number;
}

export type OrderStatus = 
  | 'Pending' 
  | 'Contacted' 
  | 'Confirmed' 
  | 'Processing' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  image: string;
}

export interface Order {
  id: string;
  orderReference: string; // e.g., REN-2026-7841
  customerName: string;
  customerPhone: string;
  district: string; // "Dhaka" or "Outside Dhaka"
  area: string; // Thana or specific area
  address: string; // Full delivery address
  notes?: string;
  preferredChannel: 'whatsapp' | 'messenger';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // E.g. 8801700000000 (international without +)
  messengerUrl: string; // E.g. https://m.me/renstone.bd
  dhakaDeliveryFee: number;
  outsideDhakaDeliveryFee: number;
  freeDeliveryThreshold: number;
  announcementText: string;
  announcementEnabled: boolean;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}
