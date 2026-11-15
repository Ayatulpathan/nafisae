'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Maximize2, Minimize2, Sparkles, Box, ShoppingBag } from 'lucide-react';
import { PRODUCTS, formatBDT } from '@/data/products';

interface LookSpread {
  id: string;
  season: string;
  lookNumber: string;
  title: string;
  subtitle: string;
  description: string;
  fabric: string;
  colorScheme: string;
  productId: string;
  videoSrc?: string;
  imagePoster: string;
  layout: 'split' | 'full' | 'asymmetric';
}

const LOOKS: LookSpread[] = [
  {
    id: 'look-01',
    season: 'FALL/WINTER 2026',
    lookNumber: 'LOOK 01',
    title: 'CHROMATIC TENSION SLIT GOWN',
    subtitle: 'METALLIC LIQUID VISCOSE / KINETIC DRAPING',
    description:
      'Engineered with micro-pleated metallic filaments that reflect architectural lighting in motion. Asymmetrical slit cut by laser precision with seamless hem bonding.',
    fabric: '72% Liquid Viscose, 18% Polyamide, 10% Metallic Elastane',
    colorScheme: 'Obsidian Liquid / Palladium Sheen',
    productId: 'naf-001',
    videoSrc: '/videos/models/dress-chrome-walk.mp4',
    imagePoster: '/videos/models/dress-chrome-poster.jpg',
    layout: 'split',
  },
  {
    id: 'look-02',
    season: 'FALL/WINTER 2026',
    lookNumber: 'LOOK 02',
    title: 'PATENT ARMOR CORSET BUSTIER',
    subtitle: 'EXTRUDED POLYMER BONING / HIGH-SHINE PATENT',
    description:
      'Rigid architectural structure balanced by internal glove-leather lining. Sculpted directly on 3D anatomical mannequins for ergonomic runway movement.',
    fabric: '100% Gloss Coated Polyurethane on Calf Leather Bed',
    colorScheme: 'Black Mirror / Smoked Chrome',
    productId: 'naf-002',
    videoSrc: '/videos/models/corset-patent-turn.mp4',
    imagePoster: '/videos/models/corset-patent-poster.jpg',
    layout: 'asymmetric',
  },
  {
    id: 'look-03',
    season: 'FALL/WINTER 2026',
    lookNumber: 'LOOK 03',
    title: 'OVERSIZED RAW SHEARLING OVERCOAT',
    subtitle: 'TUSCAN MERINO SHEARLING / DOUBLE-BREASTED PEAK',
    description:
      'An imposing silhouette designed for harsh atmospheric conditions. The reverse hide is treated with water-resistant resin while the shearling interior retains thermal equilibrium.',
    fabric: '100% Genuine Tuscan Merino Shearling Hide',
    colorScheme: 'Raw Bone / Camel / Dark Soil',
    productId: 'naf-004',
    videoSrc: '/videos/models/coat-shearling-walk.mp4',
    imagePoster: '/videos/models/coat-shearling-poster.jpg',
    layout: 'split',
  },
  {
    id: 'look-04',
    season: 'SPRING/SUMMER 2027',
    lookNumber: 'LOOK 04',
    title: 'SOLAR PLEAT ASYMMETRICAL BODYSUIT',
    subtitle: 'SECOND-SKIN MICROFIBER / THERMAL VENTING',
    description:
      'High-compression seamless knit with ergonomic thermal mapping along the thoracic spine. High-cut leg openings with raw silicone grip banding.',
    fabric: '78% Recycled Polyamide, 22% Xtra Life Lycra',
    colorScheme: 'Solar Ochre / Pure Carbon',
    productId: 'naf-003',
    videoSrc: '/videos/models/body-solar-pose.mp4',
    imagePoster: '/videos/models/body-solar-poster.jpg',
    layout: 'asymmetric',
  },
];

export default function LookbookPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState<string>('ALL');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredLooks =
    selectedSeason === 'ALL'
      ? LOOKS
      : LOOKS.filter((l) => l.season.includes(selectedSeason));

  const activeLook = filteredLooks[currentIdx] || LOOKS[0];
  const linkedProduct = PRODUCTS.find((p) => p.id === activeLook.productId) || PRODUCTS[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIdx((prev) => (prev < filteredLooks.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIdx((prev) => (prev > 0 ? prev - 1 : filteredLooks.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredLooks.length]);

  return (
    <div
      className={`bg-[#0A0A0A] text-[#FDFDFB] min-h-screen transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : ''
      }`}
    >
      {/* Editorial Lookbook Bar */}
      <div className="border-b border-white/10 px-6 md:px-12 py-5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/shop"
            className="text-[8px] tracking-[0.3em] uppercase text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={10} /> Back to Shop
          </Link>
          <div className="h-3 w-px bg-white/20 hidden md:block" />
          <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-white">
            RUNWAY LOOKBOOK · {activeLook.season}
          </span>
        </div>

        {/* Season Filter Tabs */}
        <div className="flex items-center gap-3 text-[8px] tracking-[0.25em] uppercase">
          {['ALL', 'FALL/WINTER 2026', 'SPRING/SUMMER 2027'].map((season) => (
            <button
              key={season}
              onClick={() => {
                setSelectedSeason(season);
                setCurrentIdx(0);
              }}
              className={`px-3 py-1 transition-all ${
                selectedSeason === season
                  ? 'bg-white text-black font-bold'
                  : 'text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {season}
            </button>
          ))}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 border border-white/20 text-white/70 hover:text-white transition-colors ml-2"
            title="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
        </div>
      </div>

      {/* Main Runway Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-140px)]">
        {/* Left Column: Visual Runway Media (7 cols) */}
        <div className="lg:col-span-7 relative bg-black flex items-center justify-center p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          {/* Subtle Ambient Grain/Glow */}
          <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent pointer-events-none" />

          {/* Model Runway Video Player */}
          <div className="relative w-full max-w-[500px] h-[640px] flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl bg-[#141414]">
            {activeLook.videoSrc ? (
              <video
                key={activeLook.videoSrc}
                src={activeLook.videoSrc}
                poster={activeLook.imagePoster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <img
                src={activeLook.imagePoster}
                alt={activeLook.title}
                className="w-full h-full object-cover object-top"
              />
            )}

            {/* Run-time HUD overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/15 text-[7px] tracking-[0.3em] uppercase">
              {activeLook.lookNumber} / RUNWAY FEED
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
              <div>
                <p className="text-[7px] tracking-[0.3em] uppercase text-white/50">Curated Style</p>
                <p className="text-[12px] uppercase font-bold tracking-wider">{linkedProduct.name}</p>
              </div>
              <p className="text-[11px] font-bold tracking-widest">{formatBDT(linkedProduct.price)}</p>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fashion Editorial Typography (5 cols) */}
        <div className="lg:col-span-5 p-8 md:p-14 flex flex-col justify-between bg-[#0A0A0A]">
          <div className="space-y-8">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[8px] tracking-[0.4em] uppercase bg-white/10 px-2.5 py-1 font-bold text-white">
                  {activeLook.lookNumber}
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-white/40">
                  {activeLook.season} COLLECTION
                </span>
              </div>

              <h1
                className="text-[36px] md:text-[54px] font-black uppercase tracking-tight leading-none text-white"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                {activeLook.title}
              </h1>

              <p className="text-[9px] tracking-[0.3em] uppercase text-white/50 mt-3 border-l-2 border-white/40 pl-3">
                {activeLook.subtitle}
              </p>
            </div>

            {/* Narrative Storytelling */}
            <p className="text-[12px] text-white/70 leading-relaxed font-light">
              {activeLook.description}
            </p>

            {/* Specifications Matrix */}
            <div className="border-t border-b border-white/10 py-5 space-y-3 text-[9px] uppercase tracking-[0.18em]">
              <div className="flex justify-between">
                <span className="text-white/40">Fabric Engineering</span>
                <span className="text-white/90 text-right max-w-[60%]">{activeLook.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Palette Tone</span>
                <span className="text-white/90">{activeLook.colorScheme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Atelier ID</span>
                <span className="text-white/90 font-mono">{linkedProduct.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Runway Presentation</span>
                <span className="text-white/90">Look {activeLook.lookNumber} / 04</span>
              </div>
            </div>

            {/* Direct Studio & Try-On Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                href={`/virtual-studio?product=${linkedProduct.id}`}
                className="py-3 px-3 bg-white text-black text-[8px] tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-1.5 hover:bg-white/90 transition-all text-center"
              >
                <Box size={12} /> 3D Studio
              </Link>

              <Link
                href="/try-on"
                className="py-3 px-3 border border-white/30 text-white hover:border-white text-[8px] tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <Sparkles size={12} /> AI Try-On
              </Link>

              <Link
                href={`/product/${linkedProduct.id}`}
                className="py-3 px-3 border border-white/30 text-white hover:border-white text-[8px] tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <ShoppingBag size={12} /> Shop Piece
              </Link>
            </div>
          </div>

          {/* Bottom Spread Pagination */}
          <div className="pt-10 mt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setCurrentIdx((prev) => (prev > 0 ? prev - 1 : filteredLooks.length - 1))
                }
                className="p-3 border border-white/20 text-white/70 hover:text-white hover:border-white transition-all"
                title="Previous Spread (or Left Arrow)"
              >
                <ArrowLeft size={14} />
              </button>

              <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">
                <span className="text-white font-bold">{currentIdx + 1}</span> / {filteredLooks.length}
              </span>

              <button
                onClick={() =>
                  setCurrentIdx((prev) => (prev < filteredLooks.length - 1 ? prev + 1 : 0))
                }
                className="p-3 border border-white/20 text-white/70 hover:text-white hover:border-white transition-all"
                title="Next Spread (or Right Arrow)"
              >
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Thumbnail Quick Selector */}
            <div className="hidden sm:flex items-center gap-2">
              {filteredLooks.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-7 h-9 border overflow-hidden transition-all ${
                    currentIdx === idx ? 'border-white scale-110' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={look.imagePoster} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
