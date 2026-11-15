import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts, getNewArrivals, formatBDT, CATEGORIES } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals(4);

  return (
    <div className="bg-[#FDFDFB]">

      {/* ══════════════════════════════════════════════════════
          HERO — Full-screen editorial campaign
      ═══════════════════════════════════════════════════════ */}
      <section className="relative h-[90vh] min-h-[600px] flex overflow-hidden">

        {/* Left Panel — Pure white with typography */}
        <div className="flex-1 flex flex-col justify-between p-10 md:p-14 bg-[#FDFDFB] relative z-10">
          <div>
            <p className="text-[8px] tracking-[0.45em] uppercase text-black/40 mb-6">
              A/W 2026 — New Season
            </p>
            <h1
              className="text-[52px] md:text-[80px] lg:text-[100px] font-black uppercase leading-[0.9] tracking-[-0.01em]"
              style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
            >
              WHERE<br />
              CYBER<br />
              NETIC<br />
              MEETS<br />
              COUTURE
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <Link
              href="/virtual-studio"
              className="inline-flex items-center gap-3 group w-fit"
            >
              <span className="text-[9px] tracking-[0.4em] uppercase font-semibold">
                Enter Virtual Studio
              </span>
              <span className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300" />
              <ArrowRight size={12} />
            </Link>
            <Link
              href="/collections/cybernetic-couture"
              className="inline-flex items-center gap-2 group w-fit"
            >
              <span className="text-[8px] tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors">
                CYBERNETIC COUTURE [COLLECTION]
              </span>
            </Link>
          </div>
        </div>

        {/* Center — Model image area */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-[280px] lg:w-[360px] z-20">
          {/* Placeholder model silhouette — replace with real photography */}
          <div className="h-full bg-gradient-to-b from-[#e8e8e3] via-[#d8d8d3] to-[#c8c8c3] flex items-end justify-center relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className="text-[8px] tracking-[0.4em] uppercase text-black/20 placeholder-pulse"
              >
                Fashion Model Video
              </div>
              <div className="text-[7px] tracking-[0.3em] uppercase text-black/15 mt-2">
                Replace with actual footage
              </div>
            </div>
            <div className="pb-8 text-center">
              <span className="text-[7px] tracking-[0.3em] uppercase text-black/20">
                MODEL 001
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel — Grey/Ivory editorial */}
        <div className="flex-1 flex flex-col justify-between p-10 md:p-14 bg-[#F0F0EB] relative z-10">
          <div className="flex flex-col items-end gap-2 text-right">
            <span
              className="text-[11px] md:text-[13px] tracking-[0.3em] uppercase font-black text-[#D02020]"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              CYBERNETIC COUTURE
            </span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-black/40">
              [COLLECTION]
            </span>
          </div>

          <div className="flex flex-col items-end gap-6">
            <p className="text-right text-[9px] tracking-[0.2em] uppercase leading-relaxed text-black/50 max-w-[180px]">
              Garments engineered for the architecturally-minded silhouette.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-black/20 px-6 py-3 text-[8px] tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all group w-fit"
            >
              Shop All
              <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom horizontal label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-4">
          <span className="w-8 h-px bg-black/20" />
          <span
            className="text-[32px] font-black uppercase tracking-widest"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            NAFISAÉ
          </span>
          <span className="text-[8px] tracking-[0.3em] uppercase text-black/30">
            CYBERNETIC COUTURE A/W 26
          </span>
          <span className="w-8 h-px bg-black/20" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIRTUAL STUDIO ENTRY — Feature spotlight
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#080808] text-[#FDFDFB] px-10 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/30 mb-4">
            New Experience
          </p>
          <h2
            className="text-[48px] md:text-[64px] font-black uppercase leading-[0.9] mb-8"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            VIRTUAL<br />FASHION<br />STUDIO
          </h2>
          <p className="text-[10px] tracking-[0.2em] uppercase leading-relaxed text-white/50 max-w-sm mb-8">
            Select a garment. Watch the fashion model change. Explore the outfit in 3D.
            Use AI to try it on yourself.
          </p>
          <Link
            href="/virtual-studio"
            className="inline-flex items-center gap-3 bg-[#FDFDFB] text-[#080808] px-8 py-4 text-[9px] tracking-[0.4em] uppercase font-semibold hover:bg-white/80 transition-colors group"
          >
            Enter the Studio
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2">
          {(['Video Model', '3D Viewer', 'AI Try-On'] as const).map((mode) => (
            <div key={mode} className="border border-white/10 p-6 flex flex-col gap-3">
              <div className="w-8 h-px bg-white/30" />
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/60">{mode}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CATEGORIES — Bracketed category browser
      ═══════════════════════════════════════════════════════ */}
      <section className="px-10 py-20 border-b border-black/8">
        <div className="flex items-baseline justify-between mb-12">
          <p className="text-[8px] tracking-[0.45em] uppercase text-black/40">Browse By Category</p>
          <Link href="/shop" className="text-[8px] tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors underline underline-offset-4">
            Shop All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 border-l border-t border-black/8">
          {CATEGORIES.slice(0, 12).map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="border-r border-b border-black/8 p-6 group hover:bg-[#080808] hover:text-[#FDFDFB] transition-all"
            >
              <p className="text-[8px] tracking-[0.4em] uppercase text-black/30 group-hover:text-white/40 mb-2">
                [{String(cat.productCount ?? 0).padStart(2, '0')}]
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED PRODUCTS — Editorial editorial grid
      ═══════════════════════════════════════════════════════ */}
      <section className="px-10 py-20">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-[8px] tracking-[0.45em] uppercase text-black/40 mb-2">
              Curated Selection
            </p>
            <h2
              className="text-[32px] md:text-[42px] font-black uppercase leading-none"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              FEATURED LOOKS
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-[8px] tracking-[0.3em] uppercase hover:opacity-50 transition-opacity"
          >
            View All <ArrowRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NEW ARRIVALS — Latest drops
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F0] px-10 py-20">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-[8px] tracking-[0.45em] uppercase text-black/40 mb-2">
              Latest Drop
            </p>
            <h2
              className="text-[32px] md:text-[42px] font-black uppercase leading-none"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="hidden md:flex items-center gap-2 text-[8px] tracking-[0.3em] uppercase hover:opacity-50 transition-opacity"
          >
            See All New <ArrowRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EDITORIAL MANIFESTO — Brand statement
      ═══════════════════════════════════════════════════════ */}
      <section className="px-10 py-24 flex flex-col md:flex-row gap-20 items-center border-t border-black/8">
        <div className="flex-1">
          <h2
            className="text-[80px] md:text-[120px] font-black uppercase leading-[0.85] tracking-[-0.02em]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            THE<br />HOUSE<br />OF<br />NAFISAÉ
          </h2>
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-[8px] tracking-[0.45em] uppercase text-black/30">Our Manifesto</p>
          <p className="text-[13px] leading-relaxed tracking-wide text-black/70">
            We do not make clothing. We engineer garments. Each piece is a proposition —
            a structural argument about the relationship between body, fabric, and presence.
          </p>
          <p className="text-[13px] leading-relaxed tracking-wide text-black/70">
            NAFISAÉ exists at the intersection of avant-garde architecture and high couture.
            Born in Dhaka. Worn everywhere. Remembered forever.
          </p>
          <Link
            href="/story"
            className="inline-flex items-center gap-3 mt-4 group"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase font-semibold">
              Read the Story
            </span>
            <span className="w-8 h-px bg-black group-hover:w-16 transition-all duration-300" />
          </Link>
        </div>
      </section>

    </div>
  );
}
