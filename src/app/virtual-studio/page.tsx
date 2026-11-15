'use client';

/**
 * NAFISAÉ Virtual Fashion Studio
 *
 * Fully integrated multi-mode showroom:
 *  - Mode 1: High-performance double-buffered VideoModelViewer
 *  - Mode 2: Interactive Real-Time 3D WebGL PBR Model Viewer (Three.js)
 *  - Mode 3: AI Virtual Try-On Studio Preview
 *  - Staggered miniature outfit rack with instant live product switching
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { X, ChevronRight, Play, Pause, RefreshCw, Box } from 'lucide-react';
import { useStudio } from '@/contexts/StudioContext';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS, formatBDT } from '@/data/products';
import { AnimationType, ViewMode, Product, Color } from '@/types/product';
import VideoModelViewer from '@/components/fashion-studio/VideoModelViewer';

// Dynamic import of 3D WebGL viewer with SSR disabled
const ThreeDModelViewer = dynamic(
  () => import('@/components/fashion-studio/ThreeDModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-24 h-48 bg-black/5 animate-pulse" />
        <span className="text-[7px] tracking-[0.3em] uppercase text-black/30">
          Initializing WebGL 3D Engine...
        </span>
      </div>
    ),
  }
);

const MODE_LABELS: Record<ViewMode, string> = {
  video: 'Video Model',
  '3d': '3D WebGL Viewer',
  tryon: 'AI Try-On',
};

const ANIM_LABELS: Record<AnimationType, string> = {
  idle: 'Idle',
  walk: 'Walk',
  turn: 'Turn',
  pose: 'Pose',
};

const RACK_POSITIONS = [
  { x: '8%',  y: '5%',  w: '28%', h: '44%' },
  { x: '55%', y: '2%',  w: '24%', h: '40%' },
  { x: '82%', y: '5%',  w: '14%', h: '36%' },
  { x: '15%', y: '52%', w: '26%', h: '44%' },
  { x: '45%', y: '50%', w: '22%', h: '42%' },
  { x: '72%', y: '48%', w: '20%', h: '44%' },
];

export default function VirtualStudioPage() {
  const {
    selectedProduct,
    selectedCategory,
    activeMode,
    activeAnimation,
    selectProduct,
    selectCategory,
    setMode,
    setAnimation,
    filteredProducts,
    categories,
  } = useStudio();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    selectedProduct?.colors[0] ?? null
  );
  const [addFeedback, setAddFeedback] = useState(false);

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

  const getVideoSrc = (): string => {
    if (!selectedProduct?.assets) return '/videos/models/default-idle.mp4';
    const { videoIdle, videoWalk, videoTurn, videoPose } = selectedProduct.assets;
    switch (activeAnimation) {
      case 'walk':
        return videoWalk || videoIdle || '/videos/models/default-walk.mp4';
      case 'turn':
        return videoTurn || videoIdle || '/videos/models/default-turn.mp4';
      case 'pose':
        return videoPose || videoIdle || '/videos/models/default-pose.mp4';
      case 'idle':
      default:
        return videoIdle || '/videos/models/default-idle.mp4';
    }
  };

  return (
    <div className="fixed inset-0 top-14 bg-[#FDFDFB] flex flex-col overflow-hidden">
      {/* ── Top Bar: Mode switcher + Animation controls ─── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-black/8 bg-[#FDFDFB] flex-shrink-0">
        <div className="flex items-center gap-0">
          {(Object.keys(MODE_LABELS) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className={`text-[8px] tracking-[0.3em] uppercase px-5 py-2 border-r border-black/8 transition-all flex items-center gap-1.5 ${
                activeMode === mode
                  ? 'bg-[#080808] text-[#FDFDFB] font-bold'
                  : 'hover:bg-black/5 text-black/70'
              }`}
            >
              {mode === '3d' && <Box size={11} />}
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Animation Motion Controls (Active in Video Mode) */}
        {activeMode === 'video' && (
          <div className="flex items-center gap-1">
            <span className="text-[7px] tracking-[0.3em] uppercase text-black/30 mr-2">
              Model Motion
            </span>
            {(Object.keys(ANIM_LABELS) as AnimationType[]).map((anim) => (
              <button
                key={anim}
                onClick={() => setAnimation(anim)}
                className={`text-[7px] tracking-[0.25em] uppercase px-3.5 py-1.5 border transition-all ${
                  activeAnimation === anim
                    ? 'bg-[#080808] text-white border-black font-semibold'
                    : 'border-black/15 hover:border-black text-black/70'
                }`}
              >
                {ANIM_LABELS[anim]}
              </button>
            ))}
          </div>
        )}

        {/* 3D Mode Hint */}
        {activeMode === '3d' && (
          <div className="text-[7px] tracking-[0.25em] uppercase text-black/50 hidden sm:block">
            Orbit 360° · PBR Materials · Multi-Angle Camera Snap
          </div>
        )}

        <Link href="/" className="ml-4 hover:opacity-50 transition-opacity">
          <X size={16} strokeWidth={1.5} />
        </Link>
      </div>

      {/* ── Main Split Canvas ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Category Nav + Stage */}
        <div className="relative flex" style={{ width: '52%' }}>
          {/* Vertical Category Bracket Index */}
          <nav className="flex-shrink-0 w-36 bg-[#F5F5F0] flex flex-col pt-6 pb-4 border-r border-black/8 overflow-y-auto">
            <div className="px-4 mb-4">
              <p className="text-[7px] tracking-[0.4em] uppercase text-black/30 mb-1">MENU +</p>
              <button
                onClick={() => selectCategory('all')}
                className={`text-[7px] tracking-[0.25em] uppercase hover:opacity-50 transition-opacity ${
                  selectedCategory === 'all' ? 'font-black' : 'text-black/50'
                }`}
              >
                SHOP ALL
              </button>
            </div>

            <div className="px-4 mb-2">
              <p className="text-[7px] tracking-[0.4em] uppercase text-black/20 mb-3">CATEGORIES</p>
            </div>

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
                    <span
                      className={`text-[7px] tracking-[0.1em] ml-2 ${
                        selectedCategory === cat.slug ? 'text-white/70' : 'text-black/30'
                      }`}
                    >
                      [{String(cat.productCount ?? 0).padStart(2, '0')}]
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="px-4 mt-auto pt-4 border-t border-black/8">
              <p className="text-[6px] tracking-[0.3em] uppercase text-black/20">STUDIO STAGE</p>
              <p className="text-[7px] tracking-[0.2em] uppercase text-black/40 mt-0.5">
                RUNWAY 26
              </p>
            </div>
          </nav>

          {/* Model Display Stage */}
          <div className="flex-1 relative bg-[#EEEEE9] studio-grid overflow-hidden">
            {/* Massive Active Category Headline (bottom left) */}
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

            {/* Video Model Mode */}
            {activeMode === 'video' && selectedProduct && (
              <VideoModelViewer
                productId={selectedProduct.id}
                videoSrc={getVideoSrc()}
                posterSrc={getVideoSrc().replace('.mp4', '.jpg')}
                animationType={activeAnimation}
                modelId="AURA / MODEL-01"
              />
            )}

            {/* Real-Time Interactive 3D WebGL Mode */}
            {activeMode === '3d' && selectedProduct && (
              <ThreeDModelViewer product={selectedProduct} />
            )}

            {/* AI Try-On Mode */}
            {activeMode === 'tryon' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="border border-black/10 p-8 max-w-xs bg-white/70 backdrop-blur-md">
                  <p className="text-[8px] tracking-[0.3em] uppercase text-black/40 mb-2 font-bold">
                    AI Virtual Try-On
                  </p>
                  <p className="text-[7px] tracking-[0.2em] uppercase text-black/40 leading-relaxed">
                    Upload your photograph to synthesize this garment onto your personal physique with
                    our local open-source CatVTON model.
                  </p>
                  <Link
                    href="/try-on"
                    className="mt-4 inline-block bg-black text-white px-6 py-2.5 text-[7px] tracking-[0.3em] uppercase hover:bg-black/80 transition-colors"
                  >
                    Launch Try-On Studio
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Staggered Miniature Outfit Rack */}
        <div className="flex-1 relative bg-[#FDFDFB] border-l border-black/8 overflow-hidden">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
            <p
              className="text-[11px] tracking-[0.4em] font-black uppercase"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              NAFISAÉ
            </p>
          </div>

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
                className={`group text-left transition-all duration-300 ${
                  isActive ? 'z-20 scale-[1.03]' : 'z-10 hover:z-20 hover:scale-[1.01]'
                }`}
              >
                <div
                  className={`w-full h-full border transition-all duration-300 flex flex-col ${
                    isActive
                      ? 'border-[#080808] shadow-xl shadow-black/10'
                      : 'border-black/10 hover:border-black/30'
                  }`}
                  style={{ backgroundColor: isActive ? '#F0F0EB' : '#F7F7F2' }}
                >
                  <div className="flex-1 flex items-end justify-center px-2 pt-2 pb-1 relative overflow-hidden">
                    {product.assets?.videoIdle && isActive ? (
                      <video
                        src={product.assets.videoIdle}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-contain"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-0.5 w-full">
                        <div
                          className={`w-3 h-3 rounded-full border border-black/20 ${
                            isActive ? 'bg-black/15' : 'bg-black/5'
                          }`}
                          style={{ width: '22%', aspectRatio: '1/1', borderRadius: '50%' }}
                        />
                        <div
                          className="border border-black/15"
                          style={{
                            width: '38%',
                            height: '55%',
                            backgroundColor: product.colors[0]?.hex ?? '#d0d0cb',
                            opacity: 0.85,
                          }}
                        />
                        <div
                          className="border border-black/10"
                          style={{
                            width: '30%',
                            height: '28%',
                            backgroundColor: '#c8c8c3',
                            opacity: 0.5,
                          }}
                        />
                      </div>
                    )}
                    {isActive && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-[#080808] rounded-full ring-2 ring-white" />
                    )}
                  </div>

                  <div className="px-2.5 pb-2 pt-1 border-t border-black/5">
                    <p className="text-[7px] tracking-[0.15em] uppercase font-bold truncate leading-tight">
                      {product.name}
                    </p>
                    <p className="text-[6px] tracking-[0.1em] uppercase text-black/50 truncate">
                      {formatBDT(product.salePrice ?? product.price)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-5 right-5 text-[7px] tracking-[0.3em] uppercase text-black/30">
            {filteredProducts.length} Silhouettes
          </div>
        </div>
      </div>

      {/* ── Bottom HUD ─── */}
      {selectedProduct && (
        <div className="flex-shrink-0 border-t border-black/8 bg-[#FDFDFB] px-6 py-4 flex flex-wrap items-center gap-6 z-30">
          <div className="flex-1 min-w-[180px]">
            <p className="text-[7px] tracking-[0.35em] uppercase text-black/30">
              {selectedProduct.collectionTag ?? selectedProduct.category.name}
            </p>
            <p className="text-[12px] tracking-[0.1em] uppercase font-bold mt-0.5">
              {selectedProduct.name}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-[7px] tracking-[0.3em] uppercase text-black/30">Price</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[14px] font-bold tracking-tight">
                {formatBDT(selectedProduct.salePrice ?? selectedProduct.price)}
              </span>
              {selectedProduct.salePrice && (
                <span className="text-[9px] text-black/35 line-through">
                  {formatBDT(selectedProduct.price)}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-[7px] tracking-[0.3em] uppercase text-black/30 mb-1.5">Size</p>
            <div className="flex gap-1">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[7px] tracking-[0.2em] px-2.5 py-1.5 border transition-all ${
                    selectedSize === size
                      ? 'bg-[#080808] text-white border-black font-bold'
                      : 'border-black/15 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[7px] tracking-[0.3em] uppercase text-black/30 mb-1.5">Colour</p>
            <div className="flex gap-1.5">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color.id}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 border-2 transition-all ${
                    selectedColor?.id === color.id
                      ? 'border-black scale-110'
                      : 'border-transparent hover:border-black/30'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 ml-auto">
            <Link
              href={`/product/${selectedProduct.id}`}
              className="border border-black/20 px-5 py-2.5 text-[7px] tracking-[0.35em] uppercase hover:bg-black/5 transition-colors font-medium"
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`px-6 py-2.5 text-[8px] tracking-[0.35em] uppercase font-bold transition-all ${
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
