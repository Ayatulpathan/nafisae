'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';
import { formatBDT } from '@/data/products';

export default function AdminDiscountsPage() {
  const [coupons, setCoupons] = useState([
    { id: 'cp-1', code: 'CYBER26', type: 'percentage', value: 15, minSpend: 20000, uses: 42, active: true },
    { id: 'cp-2', code: 'VIPATELIER', type: 'fixed', value: 5000, minSpend: 35000, uses: 12, active: true },
    { id: 'cp-3', code: 'RUNWAYLAUNCH', type: 'percentage', value: 20, minSpend: 50000, uses: 89, active: false },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newValue, setNewValue] = useState(10);
  const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    setCoupons([
      ...coupons,
      {
        id: `cp-${Date.now()}`,
        code: newCode.toUpperCase(),
        type: newType,
        value: Number(newValue),
        minSpend: 10000,
        uses: 0,
        active: true,
      },
    ]);
    setNewCode('');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Promotions & Seasonal Codes
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            DISCOUNTS & PROMOTIONS
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 border border-white/10 bg-[#0f0f0f] p-6 space-y-4">
          <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white border-b border-white/10 pb-3">
            ACTIVE PROMOTIONAL CODES
          </h2>
          <div className="divide-y divide-white/5">
            {coupons.map((c) => (
              <div key={c.id} className="py-4 flex justify-between items-center text-[9px] uppercase tracking-wider">
                <div>
                  <span className="font-mono text-[12px] font-bold text-white bg-white/10 px-2 py-0.5">
                    {c.code}
                  </span>
                  <p className="text-white/40 text-[8px] mt-1">
                    {c.type === 'percentage' ? `${c.value}% OFF` : `${formatBDT(c.value)} OFF`} · Min spend {formatBDT(c.minSpend)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 text-[7px] font-bold ${c.active ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    {c.active ? 'ACTIVE' : 'EXPIRED'}
                  </span>
                  <p className="text-white/30 text-[7px] mt-1">{c.uses} redemptions</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-4 h-fit">
          <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white border-b border-white/10 pb-3">
            CREATE COUPON
          </h2>
          <form onSubmit={handleCreate} className="space-y-4 text-[9px] uppercase tracking-wider">
            <div>
              <label className="block text-white/50 mb-1">Coupon String *</label>
              <input
                required
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g. DHAKA2026"
                className="w-full bg-black border border-white/15 p-2 text-white outline-none uppercase font-mono"
              />
            </div>
            <div>
              <label className="block text-white/50 mb-1">Discount Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as 'percentage' | 'fixed')}
                className="w-full bg-black border border-white/15 p-2 text-white outline-none"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳ BDT)</option>
              </select>
            </div>
            <div>
              <label className="block text-white/50 mb-1">Value ({newType === 'percentage' ? '%' : 'BDT ৳'})</label>
              <input
                required
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full bg-black border border-white/15 p-2 text-white outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-3 text-[9px] tracking-[0.3em] font-bold hover:bg-white/80 transition-colors"
            >
              Generate Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
