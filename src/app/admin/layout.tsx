'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Users,
  Layers,
  Boxes,
  Tag,
  BarChart3,
  Sliders,
  Sparkles,
  Video,
  Globe,
  Truck,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Shirt },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Categories & Taxonomy', href: '/admin/categories', icon: Layers },
  { label: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes },
  { label: 'Discounts & Coupons', href: '/admin/discounts', icon: Tag },
  { label: 'Virtual Studio Assets', href: '/admin/studio', icon: Video },
  { label: 'AI Try-On Settings', href: '/admin/settings/ai', icon: Sparkles },
  { label: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Shipping Settings', href: '/admin/settings/shipping', icon: Truck },
  { label: 'Currencies', href: '/admin/settings/currencies', icon: Globe },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [adminRole] = useState<'super_admin' | 'manager' | 'staff'>('super_admin');

  return (
    <div className="min-h-screen bg-[#080808] text-[#FDFDFB] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0c0c0c] flex flex-col justify-between p-6 flex-shrink-0">
        <div>
          {/* Logo & Admin Badge */}
          <div className="border-b border-white/10 pb-6 mb-6">
            <Link href="/" className="block">
              <span
                className="text-[20px] font-black uppercase tracking-[0.3em] block"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                NAFISAÉ
              </span>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] tracking-[0.25em] uppercase text-white/50">
                Atelier Admin Console
              </span>
            </div>
            <div className="mt-2 inline-block bg-white/10 text-white text-[7px] tracking-[0.3em] uppercase px-2 py-0.5">
              Role: {adminRole.replace('_', ' ').toUpperCase()}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-[9px] tracking-[0.2em] uppercase transition-all ${
                    isActive
                      ? 'bg-white text-black font-bold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-[8px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors"
          >
            <ChevronRight size={12} /> View Live Storefront
          </Link>
          <div className="text-[7px] tracking-[0.2em] text-white/20 uppercase">
            NAFISAÉ v1.0.0 · ZERO-COST STACK
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 overflow-y-auto bg-[#080808] p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}
