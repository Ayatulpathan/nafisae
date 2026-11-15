'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const COLLECTIONS_DATA = [
  {
    slug: 'cybernetic-couture',
    title: 'CYBERNETIC COUTURE',
    season: 'AUTUMN / WINTER 2026',
    description: 'A study in reflective liquid fabrics, structured boning, and futuristic drape. Engineered in Dhaka for international runways.',
    itemsCount: 14,
    colorScheme: 'Obsidian & Liquid Chrome',
  },
  {
    slug: 'obsidian-silk',
    title: 'OBSIDIAN SILK',
    season: 'SPRING / SUMMER 2026',
    description: 'Heavyweight charmeuse silk draped against structural corsetry. Pure darkness elevated through subtle sheen.',
    itemsCount: 10,
    colorScheme: 'Deep Black & Bordeaux',
  },
  {
    slug: 'noir-structure',
    title: 'NOIR STRUCTURE',
    season: 'PERMANENT ARCHIVE',
    description: 'Bonded wools, shearling trenches, and architectural outerwear designed as wearable sculpture.',
    itemsCount: 8,
    colorScheme: 'Raw Ecru & Matte Black',
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      <div className="border-b border-black/8 pb-6 mb-12">
        <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-2">NAFISAÉ / Runway</p>
        <h1
          className="text-[44px] md:text-[72px] font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          COLLECTIONS
        </h1>
      </div>

      <div className="space-y-12">
        {COLLECTIONS_DATA.map((col, index) => (
          <div
            key={col.slug}
            className="border border-black/8 p-8 md:p-12 bg-[#F5F5F0] hover:bg-white transition-colors flex flex-col md:flex-row justify-between gap-8 group"
          >
            <div className="space-y-4 max-w-xl">
              <span className="text-[8px] tracking-[0.4em] uppercase text-[#D02020] font-bold">
                [0{index + 1}] — {col.season}
              </span>
              <h2
                className="text-[32px] md:text-[48px] font-black uppercase leading-tight group-hover:translate-x-2 transition-transform duration-300"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                {col.title}
              </h2>
              <p className="text-[12px] text-black/60 tracking-wide leading-relaxed">
                {col.description}
              </p>
              <p className="text-[8px] tracking-[0.25em] uppercase text-black/40">
                Palette: {col.colorScheme} · {col.itemsCount} Masterworks
              </p>
            </div>

            <div className="flex md:flex-col justify-between items-end">
              <span className="text-[9px] tracking-[0.3em] uppercase text-black/40">
                VIEW ARCHIVE
              </span>
              <Link
                href={`/collections/${col.slug}`}
                className="bg-[#080808] text-[#FDFDFB] text-[8px] tracking-[0.4em] uppercase px-8 py-4 flex items-center gap-3 hover:bg-black/80 transition-colors"
              >
                Explore <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
