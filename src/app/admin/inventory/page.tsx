'use client';

import React, { useState } from 'react';
import { AlertTriangle, Plus, Minus } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function AdminInventoryPage() {
  const [stockLevels, setStockLevels] = useState([
    { id: 'stk-1', name: 'Liquid Chrome Slip Dress', sku: 'NAF-DR-001', variant: 'XS / Obsidian', stock: 4, threshold: 2 },
    { id: 'stk-2', name: 'Liquid Chrome Slip Dress', sku: 'NAF-DR-001', variant: 'S / Obsidian', stock: 1, threshold: 2 },
    { id: 'stk-3', name: 'Liquid Chrome Slip Dress', sku: 'NAF-DR-001', variant: 'M / Chrome', stock: 8, threshold: 2 },
    { id: 'stk-4', name: 'Obsidian Patent Leather Corset', sku: 'NAF-CO-001', variant: 'S / Obsidian', stock: 3, threshold: 2 },
    { id: 'stk-5', name: 'Oversized Shearling Trench', sku: 'NAF-CT-001', variant: 'M / Ecru', stock: 2, threshold: 2 },
    { id: 'stk-6', name: 'Tailored Cyber Blazer', sku: 'NAF-JK-001', variant: 'L / Obsidian', stock: 6, threshold: 2 },
  ]);

  const updateStock = (id: string, delta: number) => {
    setStockLevels(
      stockLevels.map((s) => (s.id === id ? { ...s, stock: Math.max(0, s.stock + delta) } : s))
    );
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Atelier Stock & Variant Counts
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            INVENTORY MANAGEMENT
          </h1>
        </div>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">SKU</th>
              <th className="p-4">Garment</th>
              <th className="p-4">Size & Color Variant</th>
              <th className="p-4">Units in Atelier</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Adjust Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {stockLevels.map((s) => {
              const isLow = s.stock <= s.threshold;
              return (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-white/60">{s.sku}</td>
                  <td className="p-4 font-bold text-white">{s.name}</td>
                  <td className="p-4 text-white/60">{s.variant}</td>
                  <td className="p-4 font-mono font-bold text-white text-[11px]">{s.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[7px] tracking-widest font-bold ${
                        isLow
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {isLow ? 'LOW STOCK' : 'IN STOCK'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => updateStock(s.id, -1)}
                        className="p-1 border border-white/20 text-white hover:bg-white/10"
                      >
                        <Minus size={10} />
                      </button>
                      <button
                        onClick={() => updateStock(s.id, 1)}
                        className="p-1 border border-white/20 text-white hover:bg-white/10"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
