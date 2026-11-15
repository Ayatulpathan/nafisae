'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  Users,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  ArrowUpRight,
} from 'lucide-react';
import { formatBDT } from '@/data/products';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([
    { id: 'NF-9021', customer: 'Sultana Rahman', item: 'Liquid Chrome Slip Dress', amount: 42000, status: 'Pending', date: 'Just now' },
    { id: 'NF-9020', customer: 'Tariq Hassan', item: 'Obsidian Patent Leather Corset', amount: 24500, status: 'Confirmed', date: '25m ago' },
    { id: 'NF-9019', customer: 'Amina Chowdhury', item: 'Oversized Shearling Trench', amount: 68000, status: 'Shipped', date: '2h ago' },
    { id: 'NF-9018', customer: 'Fahim Khan', item: 'Tailored Cyber Blazer', amount: 38500, status: 'Delivered', date: '5h ago' },
  ]);

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Real-Time Operations
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            ATELIER OVERVIEW
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] tracking-[0.2em] uppercase bg-white/10 px-3 py-1.5 text-white/70">
            Currency: BDT (৳)
          </span>
          <Link
            href="/admin/products"
            className="bg-white text-black px-4 py-1.5 text-[8px] tracking-[0.3em] uppercase font-bold hover:bg-white/80 transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <div className="flex justify-between items-start text-white/40">
            <span className="text-[8px] tracking-[0.3em] uppercase">Total Revenue (Month)</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <p className="text-[26px] font-bold tracking-tight text-white">{formatBDT(1842500)}</p>
          <p className="text-[8px] tracking-[0.2em] text-emerald-400 uppercase">+18.4% from last month</p>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <div className="flex justify-between items-start text-white/40">
            <span className="text-[8px] tracking-[0.3em] uppercase">Active Orders</span>
            <ShoppingBag size={16} className="text-white/60" />
          </div>
          <p className="text-[26px] font-bold tracking-tight text-white">42</p>
          <p className="text-[8px] tracking-[0.2em] text-white/40 uppercase">7 awaiting fulfillment</p>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <div className="flex justify-between items-start text-white/40">
            <span className="text-[8px] tracking-[0.3em] uppercase">Registered Clients</span>
            <Users size={16} className="text-white/60" />
          </div>
          <p className="text-[26px] font-bold tracking-tight text-white">618</p>
          <p className="text-[8px] tracking-[0.2em] text-emerald-400 uppercase">+34 this week</p>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-2">
          <div className="flex justify-between items-start text-white/40">
            <span className="text-[8px] tracking-[0.3em] uppercase">Low Stock SKUs</span>
            <AlertTriangle size={16} className="text-[#D02020]" />
          </div>
          <p className="text-[26px] font-bold tracking-tight text-[#D02020]">3</p>
          <p className="text-[8px] tracking-[0.2em] text-white/40 uppercase">Needs atelier restock</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table (2 Cols) */}
        <div className="lg:col-span-2 border border-white/10 bg-[#0f0f0f] p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white">
              RECENT ATELIER ORDERS
            </h2>
            <Link
              href="/admin/orders"
              className="text-[8px] tracking-[0.25em] uppercase text-white/50 hover:text-white flex items-center gap-1"
            >
              View All <ArrowUpRight size={10} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[9px] uppercase tracking-wider">
              <thead>
                <tr className="border-b border-white/10 text-white/30">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Garment</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-mono font-bold text-white">{o.id}</td>
                    <td className="py-3 text-white/80">{o.customer}</td>
                    <td className="py-3 text-white/60">{o.item}</td>
                    <td className="py-3 font-semibold text-white">{formatBDT(o.amount)}</td>
                    <td className="py-3">
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
                    <td className="py-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className="bg-black border border-white/20 text-white text-[7px] uppercase px-2 py-1 outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock & Quick Insights */}
        <div className="space-y-6">
          {/* Low Stock Box */}
          <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white flex items-center gap-2">
              <AlertTriangle size={14} className="text-[#D02020]" />
              CRITICAL STOCK ALERTS
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Liquid Chrome Slip Dress', variant: 'Size S / Obsidian', stock: 1 },
                { name: 'Sculptural Tulle Ballgown', variant: 'Size M / Alabaster', stock: 2 },
                { name: 'Vinyl Cocoon Coat', variant: 'Size L / Blood Red', stock: 1 },
              ].map((item, idx) => (
                <div key={idx} className="border border-white/5 p-3 bg-white/[0.02] flex justify-between items-center text-[8px] uppercase tracking-wider">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-white/40">{item.variant}</p>
                  </div>
                  <span className="text-[#D02020] font-bold border border-[#D02020]/40 px-2 py-0.5">
                    {item.stock} LEFT
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/admin/inventory"
              className="block text-center border border-white/20 py-2.5 text-[8px] tracking-[0.3em] uppercase text-white/70 hover:bg-white hover:text-black transition-all"
            >
              Manage Inventory
            </Link>
          </div>

          {/* Studio & Virtual Insights */}
          <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-3">
            <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white">
              VIRTUAL STUDIO TELEMETRY
            </h2>
            <div className="space-y-2 text-[9px] uppercase tracking-wider text-white/60">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Studio Session Views</span>
                <span className="font-bold text-white">1,842</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Model Video Plays</span>
                <span className="font-bold text-white">4,290</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>AI Try-On Inferences</span>
                <span className="font-bold text-white">314</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Studio to Cart Conversion</span>
                <span className="font-bold text-emerald-400">14.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
