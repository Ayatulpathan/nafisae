'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, User, MapPin, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function AccountPage() {
  const { state: { wishlist } } = useCart();

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      <div className="border-b border-black/8 pb-6 mb-12">
        <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-2">Client Portal</p>
        <h1
          className="text-[44px] md:text-[68px] font-black uppercase leading-none"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          MY ACCOUNT
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          href="/account/orders"
          className="border border-black/8 p-8 bg-[#F5F5F0] hover:bg-white transition-all group flex flex-col justify-between h-48"
        >
          <div className="flex justify-between items-start">
            <span className="text-[9px] tracking-[0.3em] uppercase text-black/40">History</span>
            <Package size={20} className="text-black/60 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold uppercase tracking-wider">Orders & Tracking</h3>
            <p className="text-[10px] text-black/50 mt-1">Review active atelier orders</p>
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="border border-black/8 p-8 bg-[#F5F5F0] hover:bg-white transition-all group flex flex-col justify-between h-48"
        >
          <div className="flex justify-between items-start">
            <span className="text-[9px] tracking-[0.3em] uppercase text-black/40">Saved Looks</span>
            <Heart size={20} className="text-black/60 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold uppercase tracking-wider">Wishlist ({wishlist.length})</h3>
            <p className="text-[10px] text-black/50 mt-1">Private garment collection</p>
          </div>
        </Link>

        <div className="border border-black/8 p-8 bg-[#F5F5F0] flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-[9px] tracking-[0.3em] uppercase text-black/40">Security</span>
            <Shield size={20} className="text-black/60" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold uppercase tracking-wider">Supabase Auth</h3>
            <p className="text-[10px] text-black/50 mt-1">Protected by PostgreSQL RLS in Phase 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
