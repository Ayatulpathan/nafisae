export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: 'customer' | 'staff' | 'manager' | 'super_admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'customer' | 'staff' | 'manager' | 'super_admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'customer' | 'staff' | 'manager' | 'super_admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category_id: string;
          description: string | null;
          price_bdt: number;
          original_price_bdt: number | null;
          sku: string;
          is_new: boolean;
          is_best_seller: boolean;
          is_archived: boolean;
          fabric_composition: string | null;
          care_instructions: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_email: string;
          customer_phone: string;
          customer_name: string;
          shipping_address: Json;
          total_bdt: number;
          shipping_bdt: number;
          discount_bdt: number;
          payment_method: 'cod' | 'bkash' | 'nagad' | 'rocket' | 'bank_transfer';
          payment_status: 'unpaid' | 'paid' | 'refunded';
          order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
