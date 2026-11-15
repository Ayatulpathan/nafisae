'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export default function AdminCurrenciesPage() {
  const [currencies] = useState([
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 1.0, isDefault: true },
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.0084, isDefault: false },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.0078, isDefault: false },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0067, isDefault: false },
  ]);

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Global Currency Engine
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            CURRENCY CONFIGURATION
          </h1>
        </div>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">Currency Code</th>
              <th className="p-4">Symbol</th>
              <th className="p-4">Currency Name</th>
              <th className="p-4">Exchange Multiplier (Base BDT)</th>
              <th className="p-4 text-right">Default Base</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currencies.map((c) => (
              <tr key={c.code} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono font-bold text-white">{c.code}</td>
                <td className="p-4 text-white text-base font-serif">{c.symbol}</td>
                <td className="p-4 text-white/80">{c.name}</td>
                <td className="p-4 font-mono text-white/70">{c.rate}</td>
                <td className="p-4 text-right">
                  {c.isDefault ? (
                    <span className="text-[7px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold">
                      BASE SYSTEM CURRENCY
                    </span>
                  ) : (
                    <span className="text-[7px] text-white/40 border border-white/10 px-2 py-0.5">
                      SECONDARY
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
