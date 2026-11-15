'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, Clock } from 'lucide-react';
import { formatBDT } from '@/data/products';

export default function OrdersHistoryPage() {
  const sampleOrders = [
    {
      id: 'NF-782914',
      date: '12 Nov 2026',
      total: 42000,
      status: 'Shipped',
      items: [{ name: 'Liquid Chrome Slip Dress', size: 'S', color: 'Obsidian' }],
    },
    {
      id: 'NF-419082',
      date: '28 Oct 2026',
      total: 24500,
      status: 'Delivered',
      items: [{ name: 'Obsidian Patent Leather Corset', size: 'M', color: 'Obsidian' }],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      <div className="mb-6">
        <Link href="/account" className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black flex items-center gap-1">
          <ArrowLeft size={10} /> Client Portal
        </Link>
      </div>

      <div className="border-b border-black/8 pb-6 mb-12">
        <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-2">Order Archive</p>
        <h1
          className="text-[44px] md:text-[68px] font-black uppercase leading-none"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          ORDER HISTORY
        </h1>
      </div>

      <div className="space-y-6">
        {sampleOrders.map((ord) => (
          <div key={ord.id} className="border border-black/8 p-8 bg-[#FDFDFB] space-y-4">
            <div className="flex flex-wrap justify-between items-center border-b border-black/8 pb-4 gap-4">
              <div>
                <p className="text-[8px] tracking-[0.3em] uppercase text-black/40">Order Identifier</p>
                <p className="text-[14px] font-bold">{ord.id}</p>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.3em] uppercase text-black/40">Date Placed</p>
                <p className="text-[11px] font-semibold">{ord.date}</p>
              </div>
              <div>
                <p className="text-[8px] tracking-[0.3em] uppercase text-black/40">Status</p>
                <span className="inline-block text-[8px] tracking-[0.25em] uppercase bg-black text-white px-2.5 py-1">
                  {ord.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[8px] tracking-[0.3em] uppercase text-black/40">Total Amount</p>
                <p className="text-[13px] font-bold">{formatBDT(ord.total)}</p>
              </div>
            </div>

            <div className="pt-2">
              {ord.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-[11px] uppercase">
                  <span>{i.name}</span>
                  <span className="text-black/50">{i.size} · {i.color}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
