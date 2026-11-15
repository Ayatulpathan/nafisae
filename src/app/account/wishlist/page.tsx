'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function WishlistPage() {
  const { state: { wishlist } } = useCart();
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      <div className="mb-6">
        <Link href="/account" className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black flex items-center gap-1">
          <ArrowLeft size={10} /> Client Portal
        </Link>
      </div>

      <div className="border-b border-black/8 pb-6 mb-12 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-2">Curated Looks</p>
          <h1
            className="text-[44px] md:text-[68px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            SAVED WISHLIST
          </h1>
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase text-black/40">
          [{wishlistProducts.length} Items]
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
          <Heart size={44} strokeWidth={1} className="text-black/20" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-black/40">No garments saved yet</p>
          <Link
            href="/shop"
            className="mt-2 bg-[#080808] text-[#FDFDFB] text-[8px] tracking-[0.4em] uppercase px-8 py-4 hover:bg-black/80 transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
