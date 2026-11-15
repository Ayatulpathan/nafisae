'use client';

import React, { useState } from 'react';
import { Search, Printer, Eye } from 'lucide-react';
import { formatBDT } from '@/data/products';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'NF-9021', customer: 'Sultana Rahman', email: 'sultana@example.com', phone: '+880 1711 000111', city: 'Dhaka', item: 'Liquid Chrome Slip Dress', size: 'S', color: 'Obsidian', amount: 42000, status: 'Pending', date: '15 Nov 2026, 07:45 AM' },
    { id: 'NF-9020', customer: 'Tariq Hassan', email: 'tariq@example.com', phone: '+880 1819 222333', city: 'Chittagong', item: 'Obsidian Patent Leather Corset', size: 'M', color: 'Obsidian', amount: 24500, status: 'Confirmed', date: '15 Nov 2026, 06:12 AM' },
    { id: 'NF-9019', customer: 'Amina Chowdhury', email: 'amina@example.com', phone: '+880 1912 333444', city: 'Sylhet', item: 'Oversized Shearling Trench', size: 'L', color: 'Ecru', amount: 68000, status: 'Shipped', date: '14 Nov 2026, 09:30 PM' },
    { id: 'NF-9018', customer: 'Fahim Khan', email: 'fahim@example.com', phone: '+880 1611 444555', city: 'Dhaka', item: 'Tailored Cyber Blazer', size: 'XL', color: 'Obsidian', amount: 38500, status: 'Delivered', date: '14 Nov 2026, 03:15 PM' },
  ]);

  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = orders.filter((o) => filterStatus === 'ALL' || o.status.toUpperCase() === filterStatus);

  const updateStatus = (id: string, s: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: s } : o)));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Fulfillment & Deliveries
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            ORDER MANAGEMENT
          </h1>
        </div>
        <div className="flex gap-2">
          {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`text-[8px] tracking-[0.2em] px-3 py-1.5 border transition-all ${
                filterStatus === st ? 'bg-white text-black border-white' : 'border-white/20 text-white/60 hover:border-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">Order ID</th>
              <th className="p-4">Client Contact</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Item Ordered</th>
              <th className="p-4">Amount (BDT)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Quick Transition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono font-bold text-white">{o.id}</td>
                <td className="p-4">
                  <p className="font-bold text-white">{o.customer}</p>
                  <p className="text-white/40 text-[7px]">{o.phone}</p>
                </td>
                <td className="p-4 text-white/70">{o.city}</td>
                <td className="p-4">
                  <p className="text-white">{o.item}</p>
                  <p className="text-white/40 text-[7px]">{o.size} · {o.color}</p>
                </td>
                <td className="p-4 font-semibold text-white">{formatBDT(o.amount)}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 text-[7px] tracking-widest font-bold ${
                      o.status === 'Delivered'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : o.status === 'Shipped'
                        ? 'bg-blue-950 text-blue-400 border border-blue-800'
                        : o.status === 'Confirmed'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="bg-black border border-white/20 text-white text-[7px] uppercase px-2 py-1 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
