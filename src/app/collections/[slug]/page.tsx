'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function SingleCollectionPage() {
  const params = useParams();
  const slug = params.slug as string;

  const title =
    slug === 'cybernetic-couture'
      ? 'CYBERNETIC COUTURE A/W 26'
      : slug === 'obsidian-silk'
      ? 'OBSIDIAN SILK S/S 26'
      : 'NOIR STRUCTURE A/W 26';

  const collectionProducts = PRODUCTS.filter((p) =>
    p.collectionTag?.toLowerCase().includes(slug.replace('-', ' ').toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      <div className="mb-6">
        <Link href="/collections" className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black flex items-center gap-1">
          <ArrowLeft size={10} /> All Collections
        </Link>
      </div>

      <div className="border-b border-black/8 pb-6 mb-12">
        <h1
          className="text-[40px] md:text-[68px] font-black uppercase leading-none"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          {title}
        </h1>
        <p className="text-[9px] tracking-[0.3em] uppercase text-black/40 mt-2">
          {collectionProducts.length} Curated Silhouettes
        </p>
      </div>

      {collectionProducts.length === 0 ? (
        <div className="py-20 text-center text-black/40 text-[9px] uppercase tracking-widest">
          Coming Soon to Runway
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collectionProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
