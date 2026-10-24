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
  name: string;
  sku: string;
  priceModifier?: number;
  stockQuantity: number;
  attributes: Record<string, string>;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants: ProductVariantOption[];
  stockQuantity: number;
  isPublished: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  specifications: ProductSpecification[];
  careInstructions?: string;
  warranty?: string;
  viewCount?: number;
  verifiedSalesCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
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
  orderReference: string;
  customerName: string;
  customerPhone: string;
  district: string;
  area: string;
  address: string;
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
  whatsappNumber: string;
  messengerUrl: string;
  facebookUrl?: string;
  dhakaDeliveryFee: number;
  outsideDhakaDeliveryFee: number;
  freeDeliveryThreshold: number;
  announcementText: string;
  announcementEnabled: boolean;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}
