'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getProductById, formatBDT, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Color } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);

  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product?.colors[0] ?? null
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-[9px] tracking-[0.4em] uppercase text-black/30">Product not found</p>
        <Link href="/shop" className="text-[8px] tracking-[0.3em] uppercase underline underline-offset-4">
          Return to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const relatedProducts = getProductsByCategory(product.category.slug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    if (!selectedColor) return;
    setSizeError(false);
    addItem(product, selectedSize, selectedColor, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="bg-[#FDFDFB] min-h-screen">
      {/* ── Breadcrumb ─── */}
      <div className="px-10 py-5 border-b border-black/8 flex items-center gap-2">
        <Link href="/shop" className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft size={9} /> Shop
        </Link>
        <span className="text-black/20">·</span>
        <Link href={`/shop?category=${product.category.slug}`} className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black transition-colors">
          {product.category.name}
        </Link>
        <span className="text-black/20">·</span>
        <span className="text-[8px] tracking-[0.25em] uppercase text-black/80">{product.name}</span>
      </div>

      {/* ── Main Layout ─── */}
      <div className="flex flex-col lg:flex-row">

        {/* ── Image Gallery ─── */}
        <div className="lg:w-[55%] flex flex-col lg:flex-row gap-2 p-6 lg:p-8 lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:overflow-hidden">
          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="flex lg:flex-col gap-2 lg:w-16">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`flex-shrink-0 h-16 w-16 lg:h-16 lg:w-full bg-[#F5F5F0] border-2 transition-all ${imageIndex === i ? 'border-black' : 'border-transparent opacity-50'}`}
                />
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="flex-1 relative bg-[#F5F5F0] group overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[8px] tracking-[0.4em] uppercase text-black/20 placeholder-pulse">
                {product.category.name} — {product.name}
              </div>
            </div>
            {/* Navigation arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setImageIndex((i) => Math.max(0, i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setImageIndex((i) => Math.min(product.images.length - 1, i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
            {/* Image counter */}
            <div className="absolute bottom-4 right-4 text-[8px] tracking-[0.2em] uppercase text-black/40">
              {imageIndex + 1} / {Math.max(product.images.length, 1)}
            </div>
          </div>
        </div>

        {/* ── Product Info Panel ─── */}
        <div className="lg:w-[45%] px-8 lg:px-12 py-10 border-l border-black/8">

          {/* Collection & SKU */}
          <div className="flex justify-between items-start mb-4">
            <p className="text-[8px] tracking-[0.35em] uppercase text-black/40">
              {product.collectionTag ?? product.category.name}
            </p>
            <p className="text-[7px] tracking-[0.25em] uppercase text-black/25">
              {product.sku}
            </p>
          </div>

          {/* Product Name */}
          <h1
            className="text-[28px] md:text-[36px] font-black uppercase leading-[1] mb-6"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            {hasDiscount ? (
              <>
                <span className="text-[20px] font-semibold tracking-tight text-[#D02020]">
                  {formatBDT(product.salePrice!)}
                </span>
                <span className="text-[14px] text-black/40 line-through">
                  {formatBDT(product.price)}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#D02020] border border-[#D02020] px-2 py-0.5">
                  Save {Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-[20px] font-semibold tracking-tight">
                {formatBDT(product.price)}
              </span>
            )}
          </div>

          <div className="w-full h-px bg-black/8 mb-8" />

          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[8px] tracking-[0.35em] uppercase text-black/50">
                Colour
              </p>
              <p className="text-[9px] tracking-[0.1em] font-medium">
                {selectedColor?.name ?? 'Select'}
              </p>
            </div>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 border-2 transition-all ${selectedColor?.id === color.id ? 'border-black scale-110' : 'border-transparent hover:border-black/30'}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[8px] tracking-[0.35em] uppercase text-black/50">Size</p>
              <button className="text-[8px] tracking-[0.25em] uppercase text-black/40 underline underline-offset-4 hover:opacity-50">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`min-w-[52px] py-3 text-[9px] tracking-[0.25em] uppercase border transition-all ${
                    selectedSize === size
                      ? 'bg-[#080808] text-[#FDFDFB] border-black'
                      : sizeError
                        ? 'border-[#D02020]/50 hover:border-black'
                        : 'border-black/15 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-[8px] tracking-[0.25em] uppercase text-[#D02020] mt-2">
                Please select a size
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-10">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-[9px] tracking-[0.4em] uppercase font-semibold transition-all ${
                addedFeedback
                  ? 'bg-green-800 text-white'
                  : 'bg-[#080808] text-[#FDFDFB] hover:bg-[#080808]/80'
              }`}
            >
              {addedFeedback ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 py-3 border text-[8px] tracking-[0.35em] uppercase flex items-center justify-center gap-2 transition-all ${
                  inWishlist ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
                }`}
              >
                <Heart size={12} strokeWidth={1.5} className={inWishlist ? 'fill-white' : ''} />
                {inWishlist ? 'Saved' : 'Wishlist'}
              </button>
              <Link
                href={`/virtual-studio?product=${product.id}`}
                className="flex-1 py-3 border border-black/20 text-[8px] tracking-[0.35em] uppercase flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                View in Studio
              </Link>
            </div>
            <button className="w-full py-3 border border-black/15 text-[8px] tracking-[0.35em] uppercase flex items-center justify-center gap-2 hover:bg-black/5 transition-colors">
              <Share2 size={11} strokeWidth={1.5} />
              Share Look
            </button>
          </div>

          <div className="w-full h-px bg-black/8 mb-8" />

          {/* Product Description */}
          <div className="mb-8">
            <p className="text-[7px] tracking-[0.45em] uppercase text-black/30 mb-4">About This Piece</p>
            <p className="text-[12px] leading-relaxed tracking-wide text-black/70">
              {product.description}
            </p>
          </div>

          {/* Product Details Accordion */}
          {[
            { label: 'Composition & Care', content: 'Dry clean only. Store in provided garment bag. Keep away from moisture and direct sunlight.' },
            { label: 'Delivery & Returns', content: 'Free delivery on orders over ৳5,000. Standard delivery 3–5 business days within Bangladesh. Returns accepted within 14 days in original condition.' },
            { label: 'Craftsmanship Note', content: 'Each NAFISAÉ garment is hand-finished by our ateliers in Dhaka. Minor variations in texture are inherent to the artisanal process.' },
          ].map((item) => (
            <details key={item.label} className="border-t border-black/8 py-4">
              <summary className="text-[8px] tracking-[0.35em] uppercase cursor-pointer list-none flex items-center justify-between hover:opacity-50 transition-opacity">
                {item.label}
                <span className="text-black/30">+</span>
              </summary>
              <p className="mt-3 text-[11px] leading-relaxed text-black/60 tracking-wide">
                {item.content}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* ── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <section className="px-10 py-20 border-t border-black/8">
          <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-3">
            From {product.category.name}
          </p>
          <h2
            className="text-[32px] font-black uppercase leading-none mb-10"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
