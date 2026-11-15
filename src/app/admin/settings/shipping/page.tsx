'use client';

import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { formatBDT } from '@/data/products';

export default function AdminShippingPage() {
  const [zones, setZones] = useState([
    { id: 'zn-1', name: 'Dhaka Metropolitan', rate: 250, freeAbove: 5000, days: '1–2 Days' },
    { id: 'zn-2', name: 'Outside Dhaka (All Bangladesh Divisions)', rate: 350, freeAbove: 7500, days: '2–4 Days' },
    { id: 'zn-3', name: 'International Courier (DHL / FedEx Express)', rate: 4500, freeAbove: 50000, days: '4–7 Days' },
  ]);

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Dispatch Rules & Rates
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            SHIPPING SETTINGS
          </h1>
        </div>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">Delivery Zone</th>
              <th className="p-4">Standard Rate (BDT)</th>
              <th className="p-4">Free Shipping Minimum</th>
              <th className="p-4">Estimated Dispatch</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {zones.map((z) => (
              <tr key={z.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{z.name}</td>
                <td className="p-4 font-semibold text-white">{formatBDT(z.rate)}</td>
                <td className="p-4 text-white/70">{formatBDT(z.freeAbove)}</td>
                <td className="p-4 text-white/60">{z.days}</td>
                <td className="p-4 text-right">
                  <span className="text-[7px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold">
                    ACTIVE
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
