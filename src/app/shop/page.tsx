'use client';

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS, CATEGORIES, SIZES, formatBDT } from '@/data/products';
import { ProductFilters, SortOption } from '@/types/product';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A–Z' },
];

export default function ShopPage() {
  const [filters, setFilters] = useState<ProductFilters>({ sort: 'featured' });
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS].filter((p) => p.status === 'published');

    if (filters.categorySlug) {
      result = result.filter((p) => p.category.slug === filters.categorySlug);
    }
    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes!.includes(s)));
    }
    if (filters.colors && filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors!.includes(c.id)));
    }
    if (filters.minPrice) {
      result = result.filter((p) => (p.salePrice ?? p.price) >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      result = result.filter((p) => (p.salePrice ?? p.price) <= filters.maxPrice!);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }

    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [filters]);

  const toggleSize = (size: string) => {
    const curr = filters.sizes ?? [];
    setFilters((f) => ({
      ...f,
      sizes: curr.includes(size) ? curr.filter((s) => s !== size) : [...curr, size],
    }));
  };

  const clearFilters = () => setFilters({ sort: 'featured' });

  const hasActiveFilters =
    !!filters.categorySlug ||
    (filters.sizes?.length ?? 0) > 0 ||
    (filters.colors?.length ?? 0) > 0 ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  return (
    <div className="min-h-screen bg-[#FDFDFB]">
      {/* ── Page Header ─── */}
      <div className="px-10 pt-14 pb-8 border-b border-black/8">
        <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-3">
          NAFISAÉ / All Products
        </p>
        <div className="flex items-end justify-between">
          <h1
            className="text-[48px] md:text-[72px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            SHOP ALL
          </h1>
          <span className="text-[9px] tracking-[0.3em] uppercase text-black/40">
            {filtered.length} Results
          </span>
        </div>
      </div>

      <div className="flex">
        {/* ── Sidebar Filters (Desktop) ─── */}
        <aside className="hidden lg:block w-56 flex-shrink-0 border-r border-black/8 px-8 pt-10 pb-20 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-[8px] tracking-[0.3em] uppercase text-[#D02020] mb-6 hover:opacity-60 transition-opacity"
            >
              <X size={9} /> Clear Filters
            </button>
          )}

          {/* Category */}
          <div className="mb-8">
            <p className="text-[7px] tracking-[0.45em] uppercase text-black/30 mb-4">Category</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setFilters((f) => ({ ...f, categorySlug: undefined }))}
                  className={`text-[9px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity ${!filters.categorySlug ? 'font-semibold' : ''}`}
                >
                  All [{PRODUCTS.length}]
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setFilters((f) => ({ ...f, categorySlug: cat.slug }))}
                    className={`text-[9px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity ${filters.categorySlug === cat.slug ? 'font-semibold' : 'text-black/60'}`}
                  >
                    {cat.name} [{cat.productCount ?? 0}]
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Size */}
          <div className="mb-8">
            <p className="text-[7px] tracking-[0.45em] uppercase text-black/30 mb-4">Size</p>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((size) => {
                const active = (filters.sizes ?? []).includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`text-[8px] tracking-[0.2em] px-3 py-1.5 border transition-all ${active ? 'bg-[#080808] text-[#FDFDFB] border-black' : 'border-black/15 hover:border-black'}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <p className="text-[7px] tracking-[0.45em] uppercase text-black/30 mb-4">
              Price (BDT ৳)
            </p>
            <div className="space-y-2">
              {[
                { label: 'Under ৳20,000', min: 0, max: 20000 },
                { label: '৳20,000 – ৳40,000', min: 20000, max: 40000 },
                { label: '৳40,000 – ৳70,000', min: 40000, max: 70000 },
                { label: 'Over ৳70,000', min: 70000, max: undefined },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => setFilters((f) => ({ ...f, minPrice: range.min, maxPrice: range.max }))}
                  className={`block text-left text-[9px] tracking-[0.15em] uppercase hover:opacity-50 transition-opacity ${filters.minPrice === range.min && filters.maxPrice === range.max ? 'font-semibold' : 'text-black/60'}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* ── Main Content ─── */}
        <div className="flex-1 px-6 md:px-10 pt-8 pb-20">
          {/* Sort + Mobile Filter Row */}
          <div className="flex items-center justify-between mb-8">
            <button
              className="lg:hidden flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase border border-black/15 px-4 py-2 hover:bg-black hover:text-white transition-colors"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={12} /> Filters
            </button>
            <select
              value={filters.sort}
              onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as SortOption }))}
              className="ml-auto text-[9px] tracking-[0.2em] uppercase bg-transparent border border-black/15 px-4 py-2 outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p className="text-[9px] tracking-[0.4em] uppercase text-black/30">
                No products found
              </p>
              <button onClick={clearFilters} className="text-[8px] tracking-[0.3em] uppercase underline underline-offset-4 hover:opacity-50">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Filter Overlay ─── */}
      {filterOpen && (
        <div className="fixed inset-0 z-[300] bg-[#FDFDFB] flex flex-col px-8 pt-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[9px] tracking-[0.4em] uppercase font-semibold">Filters</p>
            <button onClick={() => setFilterOpen(false)}>
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
          {/* Category — mobile */}
          <div className="mb-8">
            <p className="text-[7px] tracking-[0.45em] uppercase text-black/30 mb-4">Category</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setFilters((f) => ({ ...f, categorySlug: cat.slug })); setFilterOpen(false); }}
                  className={`text-[8px] tracking-[0.2em] uppercase border py-2 px-3 text-left transition-all ${filters.categorySlug === cat.slug ? 'bg-black text-white border-black' : 'border-black/15'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          {/* Size — mobile */}
          <div className="mb-8">
            <p className="text-[7px] tracking-[0.45em] uppercase text-black/30 mb-4">Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const active = (filters.sizes ?? []).includes(size);
                return (
                  <button key={size} onClick={() => toggleSize(size)}
                    className={`text-[9px] tracking-[0.2em] px-4 py-2 border transition-all ${active ? 'bg-black text-white border-black' : 'border-black/15'}`}>
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={() => setFilterOpen(false)}
            className="mt-auto mb-10 w-full bg-[#080808] text-white py-4 text-[9px] tracking-[0.4em] uppercase">
            Apply Filters ({filtered.length} Results)
          </button>
        </div>
      )}
    </div>
  );
}
