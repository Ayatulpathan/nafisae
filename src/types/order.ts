// ============================================================
// NAFISAÉ — Order & User Types
// ============================================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type UserRole = 'customer' | 'staff' | 'manager' | 'super_admin';

export interface Address {
  id: string;
  label?: string;
  street: string;
  city: string;
  district: string;
  division: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface Profile {
  userId: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: string;
  addresses: Address[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantId?: string;
  size: string;
  colorName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderEvent {
  id: string;
  eventType: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  currency: string;
  couponCode?: string;
  notes?: string;
  events: OrderEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  rates: ShippingRate[];
}

export interface ShippingRate {
  id: string;
  label: string;
  rate: number;          // in BDT
  freeAbove?: number;    // free if order total above this in BDT
  estimatedDaysMin: number;
  estimatedDaysMax: number;
}
