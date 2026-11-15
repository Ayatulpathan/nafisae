'use client';

import React from 'react';
import { formatBDT } from '@/data/products';

export default function AdminAnalyticsPage() {
  const topProducts = [
    { name: 'Liquid Chrome Slip Dress', units: 48, revenue: 2016000 },
    { name: 'Obsidian Patent Leather Corset', units: 36, revenue: 882000 },
    { name: 'Oversized Shearling Trench', units: 18, revenue: 1224000 },
    { name: 'Sculptural Tulle Ballgown', units: 12, revenue: 936000 },
    { name: 'Solar Cutout Bodysuit', units: 28, revenue: 518000 },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Performance Metrics & Sales Data
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            ANALYTICS & METRICS
          </h1>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <p className="text-[8px] tracking-[0.3em] uppercase text-white/40">Gross Sales (Year-to-Date)</p>
          <p className="text-[28px] font-bold text-white tracking-tight">{formatBDT(14280000)}</p>
          <p className="text-[8px] text-emerald-400 uppercase tracking-widest">+22.4% vs target</p>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <p className="text-[8px] tracking-[0.3em] uppercase text-white/40">Average Order Value (AOV)</p>
          <p className="text-[28px] font-bold text-white tracking-tight">{formatBDT(48600)}</p>
          <p className="text-[8px] text-white/40 uppercase tracking-widest">Luxury benchmark met</p>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <p className="text-[8px] tracking-[0.3em] uppercase text-white/40">Cart Abandonment Rate</p>
          <p className="text-[28px] font-bold text-white tracking-tight">18.2%</p>
          <p className="text-[8px] text-emerald-400 uppercase tracking-widest">Industry avg: 69%</p>
        </div>
      </div>

      {/* Top Performing Garments Table */}
      <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-4">
        <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white border-b border-white/10 pb-3">
          TOP 5 REVENUE-GENERATING SILHOUETTES
        </h2>
        <div className="divide-y divide-white/5">
          {topProducts.map((p, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center text-[9px] uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="font-mono text-white/40 text-[9px]">0{idx + 1}</span>
                <span className="font-bold text-white">{p.name}</span>
                <span className="text-white/40 text-[8px]">({p.units} units shipped)</span>
              </div>
              <span className="font-mono font-bold text-white">{formatBDT(p.revenue)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
