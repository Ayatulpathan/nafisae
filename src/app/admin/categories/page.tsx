'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState(CATEGORIES);
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const item = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      displayOrder: cats.length + 1,
      productCount: 0,
    };
    setCats([...cats, item]);
    setNewCatName('');
  };

  const handleDelete = (id: string) => {
    setCats(cats.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Showroom & Filter Taxonomy
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            CATEGORIES & SIZES
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Categories List (2 cols) */}
        <div className="md:col-span-2 border border-white/10 bg-[#0f0f0f] p-6 space-y-4">
          <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white border-b border-white/10 pb-3">
            ACTIVE SHOWROOM CATEGORIES
          </h2>
          <div className="divide-y divide-white/5">
            {cats.map((c) => (
              <div key={c.id} className="py-3 flex justify-between items-center text-[9px] uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-white/30 text-[8px]">[{String(c.displayOrder).padStart(2,'0')}]</span>
                  <span className="font-bold text-white">{c.name}</span>
                  <span className="text-white/40 text-[8px]">({c.productCount ?? 0} silhouettes)</span>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-white/30 hover:text-[#D02020] transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Category Form */}
        <div className="border border-white/10 bg-[#0f0f0f] p-6 space-y-4 h-fit">
          <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white border-b border-white/10 pb-3">
            CREATE CATEGORY
          </h2>
          <form onSubmit={handleAdd} className="space-y-4 text-[9px] uppercase tracking-wider">
            <div>
              <label className="block text-white/50 mb-1">Category Title *</label>
              <input
                required
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Avant-Garde"
                className="w-full bg-black border border-white/15 p-2.5 text-white outline-none focus:border-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-3 text-[9px] tracking-[0.3em] font-bold hover:bg-white/80 transition-colors"
            >
              Add to Navigation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
