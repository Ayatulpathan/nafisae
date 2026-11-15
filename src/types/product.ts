// ============================================================
// NAFISAÉ — Product Types
// ============================================================

export type AnimationType = 'idle' | 'walk' | 'turn' | 'pose';
export type ViewMode = 'video' | '3d' | 'tryon';
export type ProductStatus = 'published' | 'draft' | 'archived';
export type UserRole = 'customer' | 'staff' | 'manager' | 'super_admin';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface ProductAssets {
  videoIdle?: string;
  videoWalk?: string;
  videoTurn?: string;
  videoPose?: string;
  glbModel?: string;
  tryonGarment?: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: Color;
  stock: number;
  skuVariant: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;           // in BDT (Bangladeshi Taka)
  salePrice?: number;
  sku: string;
  collectionTag?: string;
  category: Category;
  sizes: string[];
  colors: Color[];
  images: string[];        // URLs of product photographs
  assets: ProductAssets;   // video, 3D, try-on assets
  status: ProductStatus;
  isFeatured: boolean;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  productCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  displayOrder: number;
  products?: Product[];
}

export interface CartItem {
  product: Product;
  variantId?: string;
  size: string;
  color: Color;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  discountAmount: number;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc';

export interface ProductFilters {
  categorySlug?: string;
  sizes?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  search?: string;
}
