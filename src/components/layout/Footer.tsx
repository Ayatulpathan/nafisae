'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FOOTER_LINKS = {
  'CLIENT SERVICES': [
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Order Tracking', href: '/account/orders' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'THE HOUSE': [
    { label: 'Our Story', href: '/story' },
    { label: 'The Manifesto', href: '/manifesto' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Press', href: '/press' },
  ],
  'COLLECTIONS': [
    { label: 'Cybernetic Couture A/W 26', href: '/collections/cybernetic-couture' },
    { label: 'Obsidian Silk S/S 26', href: '/collections/obsidian-silk' },
    { label: 'Noir Structure A/W 26', href: '/collections/noir-structure' },
    { label: 'All Collections', href: '/collections' },
  ],
  'EXPERIENCE': [
    { label: 'Virtual Fashion Studio', href: '/virtual-studio' },
    { label: 'AI Virtual Try-On', href: '/try-on' },
    { label: 'Digital Lookbook', href: '/lookbook' },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  // Do not render the consumer footer in admin dashboard
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const year = 2026;

  return (
    <footer className="bg-[#080808] text-[#FDFDFB] mt-24">
      {/* ── Brand Statement ─── */}
      <div className="border-b border-white/8 px-10 py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2
            className="text-[52px] md:text-[80px] tracking-[0.3em] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', 'Impact', sans-serif" }}
          >
            NAFISAÉ
          </h2>
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mt-2">
            Dhaka · London · Berlin
          </p>
        </div>
        <div className="max-w-xs">
          <p className="text-[10px] tracking-[0.15em] leading-relaxed text-white/50 uppercase">
            Garments engineered for the architecturally-minded. Where structural intention meets
            the poetry of fabric.
          </p>
        </div>
      </div>

      {/* ── Navigation Columns ─── */}
      <div className="px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[8px] tracking-[0.4em] uppercase text-white/30 mb-5">{heading}</p>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[10px] tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Newsletter ─── */}
      <div className="border-t border-white/8 px-10 py-8 flex flex-col md:flex-row items-center gap-4">
        <p className="text-[9px] tracking-[0.35em] uppercase text-white/40 md:mr-6">
          Join the Archive
        </p>
        <div className="flex gap-0 w-full max-w-sm">
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            className="flex-1 bg-transparent border border-white/15 px-4 py-3 text-[9px] tracking-[0.2em] uppercase outline-none placeholder:text-white/20 focus:border-white/40 transition-colors"
          />
          <button className="bg-white text-black px-6 text-[8px] tracking-[0.3em] uppercase hover:bg-white/80 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* ── Legal ─── */}
      <div className="border-t border-white/8 px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[8px] tracking-[0.2em] uppercase text-white/25">
          © {year} NAFISAÉ. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
            <Link key={l} href="#" className="text-[8px] tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors">
              {l}
            </Link>
          ))}
        </div>
        <p className="text-[8px] tracking-[0.2em] uppercase text-white/25">
          Default Currency: BDT (৳)
        </p>
      </div>
    </footer>
  );
}
