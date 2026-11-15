'use client';

/**
 * NAFISAÉ Virtual Fashion Studio
 *
 * Layout faithfully recreated from reference video:
 *  - LEFT: Full-height model stage + bracketed category nav
 *  - RIGHT: Staggered asymmetrical miniature outfit rack (white canvas)
 *  - BOTTOM HUD: Selected product details, price ৳, sizes, colors, Add to Bag
 *  - TOP: Mode switcher (Video / 3D / AI Try-On) + animation controls
 */

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { useStudio } from '@/contexts/StudioContext';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS, formatBDT } from '@/data/products';
import { AnimationType, ViewMode, Product, Color } from '@/types/product';

// ── Mode tab label map ───────────────────────────────────────
const MODE_LABELS: Record<ViewMode, string> = {
  video: 'Video Model',
  '3d': '3D Viewer',
  tryon: 'AI Try-On',
};

// ── Animation label map ──────────────────────────────────────
const ANIM_LABELS: Record<AnimationType, string> = {
  idle: 'Idle',
  walk: 'Walk',
  turn: 'Turn',
  pose: 'Pose',
};

// ── Stagger positions for the miniature rack (reference-style)
const RACK_POSITIONS = [
  { x: '8%',  y: '5%',  w: '28%', h: '44%' },
  { x: '55%', y: '2%',  w: '24%', h: '40%' },
  { x: '82%', y: '5%',  w: '14%', h: '36%' },
  { x: '15%', y: '52%', w: '26%', h: '44%' },
  { x: '45%', y: '50%', w: '22%', h: '42%' },
  { x: '72%', y: '48%', w: '20%', h: '44%' },
];

export default function VirtualStudioPage() {
  const { selectedProduct, selectedCategory, activeMode, activeAnimation,
          selectProduct, selectCategory, setMode, setAnimation,
          filteredProducts, categories } = useStudio();
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    selectedProduct?.colors[0] ?? null
  );
  const [addFeedback, setAddFeedback] = useState(false);

  // Update color picker when product changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colors[0] ?? null);
      setSelectedSize('');
    }
  }, [selectedProduct?.id]);

  const handleProductSelect = (product: Product) => {
    selectProduct(product);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedColor || !selectedSize) return;
    addItem(selectedProduct, selectedSize, selectedColor, 1);
    setAddFeedback(true);
    setTimeout(() => setAddFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 top-14 bg-[#FDFDFB] flex flex-col overflow-hidden">

      {/* ══════════════════════════════════════════════════════
          TOP BAR — Mode switcher + animation controls
      ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-black/8 bg-[#FDFDFB] flex-shrink-0">

        {/* Mode Tabs */}
        <div className="flex items-center gap-0">
          {(Object.keys(MODE_LABELS) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className={`text-[8px] tracking-[0.3em] uppercase px-5 py-2 border-r border-black/8 transition-all ${
                activeMode === mode
                  ? 'bg-[#080808] text-[#FDFDFB]'
                  : 'hover:bg-black/5'
              }`}
            >
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Animation Controls (video mode only) */}
        {activeMode === 'video' && (
          <div className="flex items-center gap-1">
            <span className="text-[7px] tracking-[0.3em] uppercase text-black/30 mr-2">Motion</span>
            {(Object.keys(ANIM_LABELS) as AnimationType[]).map((anim) => (
              <button
                key={anim}
                onClick={() => setAnimation(anim)}
                className={`text-[7px] tracking-[0.25em] uppercase px-3 py-1.5 border transition-all ${
                  activeAnimation === anim
                    ? 'bg-[#080808] text-white border-black'
                    : 'border-black/15 hover:border-black'
                }`}
              >
                {ANIM_LABELS[anim]}
              </button>
            ))}
          </div>
        )}

        {/* Close Button */}
        <Link href="/" className="ml-4 hover:opacity-50 transition-opacity">
          <X size={16} strokeWidth={1.5} />
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN SPLIT CANVAS
      ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDE: Category Nav + Model Stage ─── */}
        <div className="relative flex" style={{ width: '52%' }}>

          {/* Category Navigation Rail */}
          <nav className="flex-shrink-0 w-36 bg-[#F5F5F0] flex flex-col pt-6 pb-4 border-r border-black/8 overflow-y-auto">
            <div className="px-4 mb-4">
              <p className="text-[7px] tracking-[0.4em] uppercase text-black/30 mb-1">MENU +</p>
              <button
                onClick={() => selectCategory('all')}
                className={`text-[7px] tracking-[0.25em] uppercase hover:opacity-50 transition-opacity ${selectedCategory === 'all' ? 'font-black' : 'text-black/50'}`}
              >
                SHOP ALL
              </button>
            </div>

            <div className="px-4 mb-2">
              <p className="text-[7px] tracking-[0.4em] uppercase text-black/20 mb-3">CATEGORIES</p>
            </div>

            {/* Bracketed Category List — exact reference style */}
            <ul className="flex-1 space-y-0">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => selectCategory(cat.slug)}
                    className={`w-full flex items-center justify-between px-4 py-1.5 group transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-[#D02020] text-white'
                        : 'hover:bg-black/5'
                    }`}
                  >
                    <span className="text-[8px] tracking-[0.2em] uppercase font-semibold">
                      {cat.name.toUpperCase()}
                    </span>
                    <span className={`text-[7px] tracking-[0.1em] ml-2 ${
                      selectedCategory === cat.slug ? 'text-white/70' : 'text-black/30'
                    }`}>
                      [{String(cat.productCount ?? 0).padStart(2,'0')}]
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Model info */}
            <div className="px-4 mt-auto pt-4 border-t border-black/8">
              <p className="text-[6px] tracking-[0.3em] uppercase text-black/20">STUDIO ROOM</p>
              <p className="text-[7px] tracking-[0.2em] uppercase text-black/40 mt-0.5">MODEL A/01</p>
            </div>
          </nav>

          {/* Model Stage */}
          <div className="flex-1 relative bg-[#EEEEE9] studio-grid overflow-hidden">

            {/* Large active category typography — bottom left */}
            <div className="absolute bottom-6 left-4 z-20 pointer-events-none">
              <p
                className="text-[42px] lg:text-[56px] font-black uppercase leading-none tracking-tight opacity-90"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                {selectedCategory === 'all'
                  ? 'ALL'
                  : categories.find((c) => c.slug === selectedCategory)?.name.toUpperCase() ?? 'ALL'}
              </p>
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-black/40 font-medium"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                [CATEGORIES]
              </p>
            </div>

            {/* Model Display Area */}
            {activeMode === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Video placeholder — real video tag with src when assets available */}
                {selectedProduct?.assets?.videoIdle ? (
                  <video
                    key={`${selectedProduct.id}-${activeAnimation}`}
                    src={
                      activeAnimation === 'walk' ? selectedProduct.assets.videoWalk :
                      activeAnimation === 'turn' ? selectedProduct.assets.videoTurn :
                      activeAnimation === 'pose' ? selectedProduct.assets.videoPose :
                      selectedProduct.assets.videoIdle
                    }
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full max-h-[88%] object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-32 h-64 bg-gradient-to-b from-[#d8d8d3] to-[#c0c0bb] opacity-60" />
                    <p className="text-[7px] tracking-[0.4em] uppercase text-black/20 placeholder-pulse">
                      Video Model
                    </p>
                    <p className="text-[6px] tracking-[0.3em] uppercase text-black/15">
                      {selectedProduct?.name}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeMode === '3d' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-28 h-56 bg-gradient-to-b from-[#d0d0cb] to-[#b8b8b3] opacity-60 animate-pulse" />
                <p className="text-[7px] tracking-[0.4em] uppercase text-black/30">3D Viewer</p>
                <p className="text-[6px] tracking-[0.25em] uppercase text-black/20">
                  Three.js / React Three Fiber — Phase 3
                </p>
              </div>
            )}

            {activeMode === 'tryon' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="border border-black/10 p-8 max-w-xs">
                  <p className="text-[8px] tracking-[0.3em] uppercase text-black/40 mb-2">
                    AI Virtual Try-On
                  </p>
                  <p className="text-[7px] tracking-[0.2em] uppercase text-black/25 leading-relaxed">
                    Local PyTorch inference service — Phase 4.
                    Upload your photo once the AI service is configured.
                  </p>
                  <Link
                    href="/try-on"
                    className="mt-4 inline-block border border-black/20 px-5 py-2 text-[7px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    Go to Try-On Page
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDE: Miniature Outfit Rack ─── */}
        <div className="flex-1 relative bg-[#FDFDFB] border-l border-black/8 overflow-hidden">
          {/* Brand label — top center */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
            <p
              className="text-[11px] tracking-[0.4em] font-black uppercase"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              NAFISAÉ
            </p>
          </div>

          {/* Staggered miniature outfit cards */}
          {filteredProducts.slice(0, 6).map((product, i) => {
            const pos = RACK_POSITIONS[i] ?? RACK_POSITIONS[0];
            const isActive = selectedProduct?.id === product.id;

            return (
              <button
                key={product.id}
                onClick={() => handleProductSelect(product)}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  width: pos.w,
                  height: pos.h,
                }}
                className={`group text-left transition-all duration-200 ${
                  isActive ? 'z-20' : 'z-10 hover:z-20'
                }`}
              >
                {/* Model card */}
                <div
                  className={`w-full h-full border transition-all duration-200 flex flex-col ${
                    isActive
                      ? 'border-[#080808] shadow-lg shadow-black/15'
                      : 'border-transparent hover:border-black/20'
                  }`}
                  style={{ backgroundColor: isActive ? '#F0F0EB' : '#F7F7F2' }}
                >
                  {/* Model silhouette area */}
                  <div className="flex-1 flex items-end justify-center px-2 pt-2 pb-1 relative overflow-hidden">
                    {/* Placeholder human silhouette */}
                    <div className="flex flex-col items-center gap-0.5 w-full">
                      <div
                        className={`w-3 h-3 rounded-full border border-black/20 ${isActive ? 'bg-black/10' : 'bg-black/5'}`}
                        style={{ width: '20%', aspectRatio: '1/1', borderRadius: '50%' }}
                      />
                      <div
                        className="border border-black/15"
                        style={{
                          width: '35%',
                          height: '55%',
                          backgroundColor: product.colors[0]?.hex ?? '#d0d0cb',
                          opacity: 0.8,
                        }}
                      />
                      <div
                        className="border border-black/10"
                        style={{
                          width: '28%',
                          height: '28%',
                          backgroundColor: '#c8c8c3',
                          opacity: 0.5,
                        }}
                      />
                    </div>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#080808] rounded-full" />
                    )}
                  </div>

                  {/* Product name */}
                  <div className="px-2 pb-1.5">
                    <p className="text-[6px] tracking-[0.2em] uppercase font-semibold truncate leading-tight">
                      {product.name}
                    </p>
                    <p className="text-[5px] tracking-[0.15em] uppercase text-black/40 truncate">
                      {formatBDT(product.salePrice ?? product.price)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Item count indicator */}
          <div className="absolute bottom-5 right-5 text-[7px] tracking-[0.3em] uppercase text-black/30">
            {filteredProducts.length} Looks
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BOTTOM HUD — Selected product details
      ═══════════════════════════════════════════════════════ */}
      {selectedProduct && (
        <div className="flex-shrink-0 border-t border-black/8 bg-[#FDFDFB] px-6 py-4 flex flex-wrap items-center gap-6">

          {/* Product Identity */}
          <div className="flex-1 min-w-[180px]">
            <p className="text-[7px] tracking-[0.35em] uppercase text-black/30">
              {selectedProduct.collectionTag ?? selectedProduct.category.name}
            </p>
            <p className="text-[12px] tracking-[0.1em] uppercase font-semibold mt-0.5">
              {selectedProduct.name}
            </p>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <p className="text-[7px] tracking-[0.3em] uppercase text-black/30">Price</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[14px] font-semibold tracking-tight">
                {formatBDT(selectedProduct.salePrice ?? selectedProduct.price)}
              </span>
              {selectedProduct.salePrice && (
                <span className="text-[9px] text-black/35 line-through">
                  {formatBDT(selectedProduct.price)}
                </span>
              )}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-[7px] tracking-[0.3em] uppercase text-black/30 mb-1.5">Size</p>
            <div className="flex gap-1">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[7px] tracking-[0.2em] px-2.5 py-1.5 border transition-all ${
                    selectedSize === size
                      ? 'bg-[#080808] text-white border-black'
                      : 'border-black/15 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="text-[7px] tracking-[0.3em] uppercase text-black/30 mb-1.5">Colour</p>
            <div className="flex gap-1.5">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color.id}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 border-2 transition-all ${
                    selectedColor?.id === color.id ? 'border-black scale-110' : 'border-transparent hover:border-black/30'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto">
            <Link
              href={`/product/${selectedProduct.id}`}
              className="border border-black/20 px-5 py-2.5 text-[7px] tracking-[0.35em] uppercase hover:bg-black/5 transition-colors"
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`px-6 py-2.5 text-[8px] tracking-[0.35em] uppercase font-semibold transition-all ${
                addFeedback
                  ? 'bg-green-800 text-white'
                  : !selectedSize || !selectedColor
                    ? 'bg-black/10 text-black/30 cursor-not-allowed'
                    : 'bg-[#080808] text-[#FDFDFB] hover:bg-[#080808]/80'
              }`}
            >
              {addFeedback ? '✓ Added' : !selectedSize ? 'Select Size' : 'Add to Bag'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
