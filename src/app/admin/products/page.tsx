'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit, Video, Box, Sparkles, Image as ImageIcon, Search } from 'lucide-react';
import { PRODUCTS, formatBDT, CATEGORIES } from '@/data/products';
import { Product } from '@/types/product';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    categorySlug: 'dresses',
    price: 35000,
    sku: `NAF-NW-${Math.floor(100 + Math.random() * 900)}`,
    description: '',
    videoIdle: '',
    videoWalk: '',
    glbModel: '',
    tryonGarment: '',
  });

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this garment from catalog?')) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find((c) => c.slug === newProduct.categorySlug) || CATEGORIES[0];
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      description: newProduct.description || 'Masterwork garment designed in Dhaka.',
      price: Number(newProduct.price),
      sku: newProduct.sku,
      category: cat,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' }],
      images: ['/images/products/placeholder.jpg'],
      assets: {
        videoIdle: newProduct.videoIdle || undefined,
        videoWalk: newProduct.videoWalk || undefined,
        glbModel: newProduct.glbModel || undefined,
        tryonGarment: newProduct.tryonGarment || undefined,
      },
      status: 'published',
      isFeatured: false,
      variants: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProductList([created, ...productList]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Catalogue & Model Assets
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            PRODUCTS & SILHOUETTES
          </h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-3 text-[8px] tracking-[0.3em] uppercase font-bold flex items-center gap-2 hover:bg-white/80 transition-colors"
        >
          <Plus size={14} /> Add New Garment
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 border border-white/10 bg-[#0f0f0f] px-4 py-2">
        <Search size={14} className="text-white/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH BY PRODUCT NAME, SKU, OR CATEGORY"
          className="bg-transparent border-none outline-none text-[9px] tracking-[0.2em] uppercase text-white w-full placeholder:text-white/20"
        />
        <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase whitespace-nowrap">
          {filtered.length} Items
        </span>
      </div>

      {/* Products Table */}
      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">SKU</th>
              <th className="p-4">Garment Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price (BDT)</th>
              <th className="p-4">Assets Linked</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono font-bold text-white/70">{p.sku}</td>
                <td className="p-4 font-bold text-white">{p.name}</td>
                <td className="p-4 text-white/60">{p.category.name}</td>
                <td className="p-4 font-semibold text-white">{formatBDT(p.price)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <span title="Product Photos" className="flex items-center gap-1 text-[8px] bg-white/5 px-2 py-0.5">
                      <ImageIcon size={10} /> Photo
                    </span>
                    {p.assets?.videoIdle && (
                      <span title="Video Model Ready" className="flex items-center gap-1 text-[8px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800">
                        <Video size={10} /> Video
                      </span>
                    )}
                    {p.assets?.glbModel && (
                      <span title="3D GLB Ready" className="flex items-center gap-1 text-[8px] bg-blue-950 text-blue-400 px-2 py-0.5 border border-blue-800">
                        <Box size={10} /> 3D
                      </span>
                    )}
                    {p.assets?.tryonGarment && (
                      <span title="AI Try-On Ready" className="flex items-center gap-1 text-[8px] bg-purple-950 text-purple-400 px-2 py-0.5 border border-purple-800">
                        <Sparkles size={10} /> AI
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-[7px] tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 font-bold">
                    {p.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-white/30 hover:text-[#D02020] transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-white/20 p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-[16px] tracking-[0.2em] uppercase font-bold text-white">
                ADD NEW GARMENT TO ARCHIVE
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-[9px] uppercase tracking-wider">
              <div>
                <label className="block text-white/50 mb-1">Garment Name *</label>
                <input
                  required
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Liquid Velvet Kimono"
                  className="w-full bg-black border border-white/15 p-2.5 text-white outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 mb-1">Category *</label>
                  <select
                    value={newProduct.categorySlug}
                    onChange={(e) => setNewProduct({ ...newProduct, categorySlug: e.target.value })}
                    className="w-full bg-black border border-white/15 p-2.5 text-white outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 mb-1">Price (BDT ৳) *</label>
                  <input
                    required
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-black border border-white/15 p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 mb-1">SKU Code</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full bg-black border border-white/15 p-2.5 text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-white/50 mb-1">Description & Craftsmanship</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Describe material, drape, and structural notes..."
                  className="w-full bg-black border border-white/15 p-2.5 text-white outline-none"
                />
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <p className="text-[8px] text-white/40 tracking-[0.25em]">VIRTUAL STUDIO ASSET LINKS (LOCAL / SUPABASE STORAGE)</p>
                <div>
                  <label className="block text-white/50 mb-1">Model Video (Idle Loop URL)</label>
                  <input
                    type="text"
                    value={newProduct.videoIdle}
                    onChange={(e) => setNewProduct({ ...newProduct, videoIdle: e.target.value })}
                    placeholder="/videos/models/custom-idle.mp4"
                    className="w-full bg-black border border-white/15 p-2 text-white outline-none text-[8px]"
                  />
                </div>
                <div>
                  <label className="block text-white/50 mb-1">3D GLB Model Asset URL</label>
                  <input
                    type="text"
                    value={newProduct.glbModel}
                    onChange={(e) => setNewProduct({ ...newProduct, glbModel: e.target.value })}
                    placeholder="/models/custom-mesh.glb"
                    className="w-full bg-black border border-white/15 p-2 text-white outline-none text-[8px]"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black py-3 text-[9px] tracking-[0.3em] font-bold hover:bg-white/80"
                >
                  Save Garment
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-white/20 text-white px-6 py-3 text-[9px] tracking-[0.2em] hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
