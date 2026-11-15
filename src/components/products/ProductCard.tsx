'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { formatBDT } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'editorial';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className={`group relative ${variant === 'editorial' ? 'flex flex-col' : ''}`}>
      {/* ── Image Container ─── */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-[2/3] bg-[#F5F5F0]">
        {/* Placeholder — replace with real <Image /> when assets are available */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#eeeee9] to-[#ddddd8] transition-transform duration-700 group-hover:scale-105">
          <span className="text-[8px] tracking-[0.4em] uppercase text-black/20 mt-auto mb-6">
            {product.category.name}
          </span>
        </div>

        {/* Product Image (shown when available) */}
        {product.images[0] && product.images[0] !== '/images/products/placeholder.jpg' && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="bg-[#D02020] text-white text-[7px] tracking-[0.25em] uppercase px-2 py-0.5">
              -{discountPct}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[#080808] text-white text-[7px] tracking-[0.25em] uppercase px-2 py-0.5">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={inWishlist ? 'fill-black text-black' : 'text-black/50'}
          />
        </button>

        {/* Quick Studio Button */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            href={`/virtual-studio?product=${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="block w-full bg-[#080808]/90 text-white text-center text-[8px] tracking-[0.4em] uppercase py-3 hover:bg-[#080808] transition-colors"
          >
            View in Studio
          </Link>
        </div>
      </Link>

      {/* ── Product Info ─── */}
      <div className="mt-3 px-0.5">
        <Link href={`/product/${product.id}`}>
          <p className="text-[8px] tracking-[0.25em] uppercase text-black/40 mb-0.5">
            {product.collectionTag ?? product.category.name}
          </p>
          <p className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[#080808] leading-tight hover:opacity-60 transition-opacity">
            {product.name}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            {hasDiscount ? (
              <>
                <span className="text-[11px] tracking-[0.05em] font-semibold text-[#D02020]">
                  {formatBDT(product.salePrice!)}
                </span>
                <span className="text-[9px] tracking-[0.05em] text-black/40 line-through">
                  {formatBDT(product.price)}
                </span>
              </>
            ) : (
              <span className="text-[11px] tracking-[0.05em] font-semibold text-[#080808]">
                {formatBDT(product.price)}
              </span>
            )}
          </div>
        </Link>

        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex gap-1.5 mt-2">
            {product.colors.map((c) => (
              <div
                key={c.id}
                title={c.name}
                className="w-3 h-3 rounded-full border border-black/10 cursor-pointer hover:scale-125 transition-transform"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
