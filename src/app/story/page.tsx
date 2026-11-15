'use client';

import React from 'react';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <div className="border-b border-black/8 pb-8 mb-16">
        <p className="text-[8px] tracking-[0.45em] uppercase text-black/40 mb-3">
          House Archive / Monograph
        </p>
        <h1
          className="text-[52px] md:text-[84px] font-black uppercase leading-[0.88] tracking-tight"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          THE STORY<br />OF NAFISAÉ
        </h1>
      </div>

      <div className="space-y-12 text-[14px] leading-relaxed text-black/75 tracking-wide">
        <p className="text-[20px] font-medium leading-relaxed text-black">
          Founded in Dhaka at the convergence of traditional Bengal textile heritage and speculative
          futurism, NAFISAÉ challenges the boundaries between physical garments and digital reality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-y border-black/8 py-12">
          <div>
            <h3
              className="text-[24px] font-black uppercase mb-4"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              ARCHITECTURAL INTEGRITY
            </h3>
            <p className="text-[12px] text-black/60 leading-relaxed">
              Every curve, dart, and seam is calculated with mathematical rigor. We treat silk, wool
              crepe, and patent leather not merely as fabrics, but as load-bearing structural
              elements designed to sculpt space.
            </p>
          </div>
          <div>
            <h3
              className="text-[24px] font-black uppercase mb-4"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              THE DIGITAL CONVERGENCE
            </h3>
            <p className="text-[12px] text-black/60 leading-relaxed">
              Why should a garment only exist in physical atoms? With our real-time 3D models and
              open-source neural try-on engines, every client can experience couture in digital space
              before a single stitch is cut.
            </p>
          </div>
        </div>

        <p>
          Each bespoke piece is finished by master craftspeople in our private ateliers.
          From hand-boned corsetry to liquid satin slips, NAFISAÉ represents an unwavering
          dedication to luxury that rejects disposable trend cycles in favor of permanent impact.
        </p>

        <div className="pt-8">
          <Link
            href="/virtual-studio"
            className="inline-block bg-[#080808] text-[#FDFDFB] text-[9px] tracking-[0.4em] uppercase px-8 py-4 hover:bg-black/80 transition-colors"
          >
            Enter the Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
