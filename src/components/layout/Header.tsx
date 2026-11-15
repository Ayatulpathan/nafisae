'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'STUDIO', href: '/virtual-studio' },
  { label: 'SHOP ALL', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'STORY', href: '/story' },
];

const CURRENCIES = ['BDT', 'USD', 'EUR', 'GBP'];

export default function Header() {
  const pathname = usePathname();
  const { itemCount, state: { wishlist }, toggleDrawer, openDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState('BDT');

  // Hide public header in admin console
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* ── Announcement Bar ─────────────────────────── */}
      <div className="bg-[#080808] text-[#FDFDFB] text-[10px] tracking-[0.3em] text-center py-2 uppercase">
        New Collection: Cybernetic Couture A/W 26 — Free Shipping Over ৳5,000
      </div>

      {/* ── Main Header ─────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FDFDFB] border-b border-black/8">
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* Left: Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[10px] tracking-[0.25em] text-[#080808] uppercase font-medium hover:opacity-50 transition-opacity"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>

          {/* Center: Brand Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[18px] md:text-[20px] tracking-[0.4em] font-black uppercase text-[#080808]"
            style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
          >
            NAFISAÉ
          </Link>

          {/* Right: Utilities */}
          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="hidden md:block text-[9px] tracking-[0.2em] uppercase bg-transparent border-none outline-none cursor-pointer text-[#080808]"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[9px] tracking-[0.2em] uppercase hidden md:flex items-center gap-1 hover:opacity-50 transition-opacity"
            >
              <Search size={13} strokeWidth={1.5} />
              SEARCH
            </button>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="text-[9px] tracking-[0.2em] uppercase hidden md:flex items-center gap-1 hover:opacity-50 transition-opacity"
            >
              <Heart size={13} strokeWidth={1.5} />
              {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>

            {/* Bag */}
            <button
              onClick={openDrawer}
              className="text-[9px] tracking-[0.2em] uppercase flex items-center gap-1 hover:opacity-50 transition-opacity"
            >
              <ShoppingBag size={13} strokeWidth={1.5} />
              {itemCount > 0 ? `(${itemCount})` : 'BAG'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#FDFDFB] flex flex-col px-8 pt-14">
          <button
            className="absolute top-4 right-6"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <div className="text-[28px] tracking-[0.4em] font-black uppercase mb-12"
            style={{ fontFamily: "'Anton', sans-serif" }}>
            NAFISAÉ
          </div>
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[22px] tracking-[0.15em] uppercase font-black text-[#080808]"
                style={{ fontFamily: "'Anton', sans-serif" }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto mb-10 flex gap-6">
            <Link href="/account" className="text-[10px] tracking-[0.2em] uppercase">Account</Link>
            <Link href="/account/wishlist" className="text-[10px] tracking-[0.2em] uppercase">Wishlist ({wishlist.length})</Link>
          </div>
        </div>
      )}

      {/* ── Search Modal ─────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-[#FDFDFB]/95 flex flex-col items-center justify-center px-8">
          <button
            className="absolute top-6 right-8"
            onClick={() => setSearchOpen(false)}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <p className="text-[9px] tracking-[0.4em] uppercase mb-6 text-[#080808]/40">
            What are you looking for?
          </p>
          <input
            autoFocus
            type="text"
            placeholder="SEARCH NAFISAÉ"
            className="w-full max-w-xl text-center text-2xl tracking-[0.3em] uppercase bg-transparent border-b border-black/20 outline-none pb-3 placeholder:text-black/20"
          />
        </div>
      )}
    </>
  );
}
