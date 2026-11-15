'use client';

import React from 'react';
import { Video, Box, Eye, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function AdminStudioPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Media Stage & Real-Time Assets
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            VIRTUAL STUDIO ASSETS
          </h1>
        </div>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">SKU</th>
              <th className="p-4">Garment</th>
              <th className="p-4">Idle Video (MP4)</th>
              <th className="p-4">Walk Video (MP4)</th>
              <th className="p-4">3D Mesh (GLB)</th>
              <th className="p-4">Try-On Cutout</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono font-bold text-white/60">{p.sku}</td>
                <td className="p-4 font-bold text-white">{p.name}</td>
                <td className="p-4 text-white/60 font-mono text-[8px]">
                  {p.assets?.videoIdle ?? 'default-idle.mp4'}
                </td>
                <td className="p-4 text-white/60 font-mono text-[8px]">
                  {p.assets?.videoWalk ?? 'default-walk.mp4'}
                </td>
                <td className="p-4 text-white/60 font-mono text-[8px]">
                  {p.assets?.glbModel ?? 'model-twin.glb'}
                </td>
                <td className="p-4 text-white/60 font-mono text-[8px]">
                  {p.assets?.tryonGarment ?? 'mask.png'}
                </td>
                <td className="p-4 text-right">
                  <span className="text-[7px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold">
                    CONNECTED
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
