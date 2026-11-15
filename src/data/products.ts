// ============================================================
// NAFISAÉ — Curated Mock Product Catalog
// All prices in Bangladeshi Taka (BDT ৳)
// ============================================================

import { Product, Category } from '@/types/product';

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'New Dropp', slug: 'new-dropp', displayOrder: 1, productCount: 7 },
  { id: 'cat-2', name: 'Sale', slug: 'sale', displayOrder: 2, productCount: 8 },
  { id: 'cat-3', name: 'Accessories', slug: 'accessories', displayOrder: 3, productCount: 4 },
  { id: 'cat-4', name: 'Bodys', slug: 'bodys', displayOrder: 4, productCount: 3 },
  { id: 'cat-5', name: 'Coats', slug: 'coats', displayOrder: 5, productCount: 2 },
  { id: 'cat-6', name: 'Corsets', slug: 'corsets', displayOrder: 6, productCount: 7 },
  { id: 'cat-7', name: 'Dresses', slug: 'dresses', displayOrder: 7, productCount: 28 },
  { id: 'cat-8', name: 'Jackets', slug: 'jackets', displayOrder: 8, productCount: 1 },
  { id: 'cat-9', name: 'Pants', slug: 'pants', displayOrder: 9, productCount: 6 },
  { id: 'cat-10', name: 'Skirts', slug: 'skirts', displayOrder: 10, productCount: 4 },
  { id: 'cat-11', name: 'Special Edition', slug: 'special-edition', displayOrder: 11, productCount: 3 },
  { id: 'cat-12', name: 'Tops', slug: 'tops', displayOrder: 12, productCount: 6 },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const PRODUCTS: Product[] = [
  // ── DRESSES ──
  {
    id: 'prod-1',
    name: 'Liquid Chrome Slip Dress',
    slug: 'liquid-chrome-slip-dress',
    description: 'Sculpted from mirror-finish liquid satin, this bias-cut slip dress moves like molten metal. A singular garment for the architecturally-minded silhouette.',
    price: 42000,
    sku: 'NAF-DR-001',
    collectionTag: 'CYBERNETIC COUTURE A/W 26',
    category: { id: 'cat-7', name: 'Dresses', slug: 'dresses', displayOrder: 7 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
      { id: 'col-2', name: 'Chrome', hex: '#c0c0c0' },
    ],
    images: [
      '/images/products/dress-chrome-1.jpg',
      '/images/products/dress-chrome-2.jpg',
    ],
    assets: {
      videoIdle: '/videos/models/dress-chrome-idle.mp4',
      videoWalk: '/videos/models/dress-chrome-walk.mp4',
      tryonGarment: '/images/tryon/dress-chrome-garment.png',
    },
    status: 'published',
    isFeatured: true,
    variants: [],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'prod-2',
    name: 'Midnight Velvet Column Gown',
    slug: 'midnight-velvet-column-gown',
    description: 'An uncompromising column of crushed midnight velvet. Floor-grazing and sovereign — a silhouette that commands complete silence upon entry.',
    price: 56000,
    sku: 'NAF-DR-002',
    collectionTag: 'OBSIDIAN SILK S/S 26',
    category: { id: 'cat-7', name: 'Dresses', slug: 'dresses', displayOrder: 7 },
    sizes: ['XS', 'S', 'M'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
      { id: 'col-3', name: 'Bordeaux', hex: '#5c0a26' },
    ],
    images: ['/images/products/dress-velvet-1.jpg'],
    assets: {
      videoIdle: '/videos/models/dress-velvet-idle.mp4',
      videoWalk: '/videos/models/dress-velvet-walk.mp4',
      tryonGarment: '/images/tryon/dress-velvet-garment.png',
    },
    status: 'published',
    isFeatured: true,
    variants: [],
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-05T00:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Sculptural Tulle Ballgown',
    slug: 'sculptural-tulle-ballgown',
    description: 'Twelve layers of industrial-strength tulle engineered into a dramatic, gravity-defying silhouette. Where architecture dissolves into poetry.',
    price: 78000,
    salePrice: 65000,
    sku: 'NAF-DR-003',
    collectionTag: 'CYBERNETIC COUTURE A/W 26',
    category: { id: 'cat-7', name: 'Dresses', slug: 'dresses', displayOrder: 7 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-4', name: 'Alabaster', hex: '#f5f0e8' },
      { id: 'col-5', name: 'Blush Mist', hex: '#e8d5cd' },
    ],
    images: ['/images/products/dress-tulle-1.jpg'],
    assets: {
      videoIdle: '/videos/models/dress-tulle-idle.mp4',
      tryonGarment: '/images/tryon/dress-tulle-garment.png',
    },
    status: 'published',
    isFeatured: false,
    variants: [],
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-10T00:00:00Z',
  },

  // ── CORSETS ──
  {
    id: 'prod-4',
    name: 'Obsidian Patent Leather Corset',
    slug: 'obsidian-patent-leather-corset',
    description: 'Hand-finished patent leather corset with architectural boning, hook-and-eye closure, and adjustable silk lacing. The definitive power statement.',
    price: 24500,
    sku: 'NAF-CO-001',
    collectionTag: 'NOIR STRUCTURE A/W 26',
    category: { id: 'cat-6', name: 'Corsets', slug: 'corsets', displayOrder: 6 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
    ],
    images: ['/images/products/corset-patent-1.jpg'],
    assets: {
      videoIdle: '/videos/models/corset-patent-idle.mp4',
      videoTurn: '/videos/models/corset-patent-turn.mp4',
      tryonGarment: '/images/tryon/corset-patent-garment.png',
    },
    status: 'published',
    isFeatured: true,
    variants: [],
    createdAt: '2026-08-20T00:00:00Z',
    updatedAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Sculpted Silk Bodice',
    slug: 'sculpted-silk-bodice',
    description: 'Bias-cut charmeuse silk bodice with under-bust seaming inspired by classical armour plates. Zero embellishment. Total impact.',
    price: 28000,
    sku: 'NAF-CO-002',
    collectionTag: 'OBSIDIAN SILK S/S 26',
    category: { id: 'cat-6', name: 'Corsets', slug: 'corsets', displayOrder: 6 },
    sizes: ['XS', 'S', 'M'],
    colors: [
      { id: 'col-6', name: 'Ivory', hex: '#fffff0' },
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
    ],
    images: ['/images/products/corset-silk-1.jpg'],
    assets: {
      videoIdle: '/videos/models/corset-silk-idle.mp4',
      tryonGarment: '/images/tryon/corset-silk-garment.png',
    },
    status: 'published',
    isFeatured: false,
    variants: [],
    createdAt: '2026-08-25T00:00:00Z',
    updatedAt: '2026-08-25T00:00:00Z',
  },

  // ── BODYS ──
  {
    id: 'prod-6',
    name: 'Solar Cutout Bodysuit',
    slug: 'solar-cutout-bodysuit',
    description: 'High-shine performance jersey bodysuit with architectural cutouts referencing solar geometry. Worn alone or as a foundation garment.',
    price: 18500,
    sku: 'NAF-BO-001',
    collectionTag: 'CYBERNETIC COUTURE A/W 26',
    category: { id: 'cat-4', name: 'Bodys', slug: 'bodys', displayOrder: 4 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-7', name: 'Solar Yellow', hex: '#f5d000' },
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
    ],
    images: ['/images/products/body-solar-1.jpg'],
    assets: {
      videoIdle: '/videos/models/body-solar-idle.mp4',
      videoPose: '/videos/models/body-solar-pose.mp4',
      tryonGarment: '/images/tryon/body-solar-garment.png',
    },
    status: 'published',
    isFeatured: true,
    variants: [],
    createdAt: '2026-09-15T00:00:00Z',
    updatedAt: '2026-09-15T00:00:00Z',
  },
  {
    id: 'prod-7',
    name: 'Noir Mesh Second-Skin',
    slug: 'noir-mesh-second-skin',
    description: 'Ultra-fine mesh bodysuit engineered for invisible layering. A transparent negative — the garment that becomes the skin it covers.',
    price: 16000,
    sku: 'NAF-BO-002',
    collectionTag: 'NOIR STRUCTURE A/W 26',
    category: { id: 'cat-4', name: 'Bodys', slug: 'bodys', displayOrder: 4 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
    ],
    images: ['/images/products/body-mesh-1.jpg'],
    assets: {
      videoIdle: '/videos/models/body-mesh-idle.mp4',
      tryonGarment: '/images/tryon/body-mesh-garment.png',
    },
    status: 'published',
    isFeatured: false,
    variants: [],
    createdAt: '2026-09-20T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z',
  },

  // ── COATS ──
  {
    id: 'prod-8',
    name: 'Oversized Shearling Trench',
    slug: 'oversized-shearling-trench',
    description: 'Monumental oversized trench in naturally tanned shearling. Dropped shoulders, exaggerated lapels, weighted hem. Architecture in sheepskin.',
    price: 68000,
    sku: 'NAF-CT-001',
    collectionTag: 'NOIR STRUCTURE A/W 26',
    category: { id: 'cat-5', name: 'Coats', slug: 'coats', displayOrder: 5 },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { id: 'col-8', name: 'Ecru', hex: '#c8b89a' },
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
    ],
    images: ['/images/products/coat-shearling-1.jpg'],
    assets: {
      videoIdle: '/videos/models/coat-shearling-idle.mp4',
      videoWalk: '/videos/models/coat-shearling-walk.mp4',
      tryonGarment: '/images/tryon/coat-shearling-garment.png',
    },
    status: 'published',
    isFeatured: true,
    variants: [],
    createdAt: '2026-10-01T00:00:00Z',
    updatedAt: '2026-10-01T00:00:00Z',
  },
  {
    id: 'prod-9',
    name: 'Vinyl Cocoon Coat',
    slug: 'vinyl-cocoon-coat',
    description: 'High-gloss vinyl coat in a cocoon silhouette. Zero buttons. Zero closures. Pure sculptural intention — worn as a shield, not a shelter.',
    price: 52000,
    sku: 'NAF-CT-002',
    collectionTag: 'CYBERNETIC COUTURE A/W 26',
    category: { id: 'cat-5', name: 'Coats', slug: 'coats', displayOrder: 5 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
      { id: 'col-9', name: 'Blood Red', hex: '#8b0000' },
    ],
    images: ['/images/products/coat-vinyl-1.jpg'],
    assets: {
      videoIdle: '/videos/models/coat-vinyl-idle.mp4',
      videoTurn: '/videos/models/coat-vinyl-turn.mp4',
      tryonGarment: '/images/tryon/coat-vinyl-garment.png',
    },
    status: 'published',
    isFeatured: false,
    variants: [],
    createdAt: '2026-10-05T00:00:00Z',
    updatedAt: '2026-10-05T00:00:00Z',
  },

  // ── JACKETS ──
  {
    id: 'prod-10',
    name: 'Tailored Cyber Blazer',
    slug: 'tailored-cyber-blazer',
    description: 'Double-breasted blazer in bonded scuba fabric with holographic peak lapels. The power suit of the post-physical era.',
    price: 38500,
    sku: 'NAF-JK-001',
    collectionTag: 'CYBERNETIC COUTURE A/W 26',
    category: { id: 'cat-8', name: 'Jackets', slug: 'jackets', displayOrder: 8 },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
      { id: 'col-10', name: 'Steel Blue', hex: '#3a5a7c' },
    ],
    images: ['/images/products/jacket-cyber-1.jpg'],
    assets: {
      videoIdle: '/videos/models/jacket-cyber-idle.mp4',
      videoWalk: '/videos/models/jacket-cyber-walk.mp4',
      tryonGarment: '/images/tryon/jacket-cyber-garment.png',
    },
    status: 'published',
    isFeatured: true,
    variants: [],
    createdAt: '2026-10-10T00:00:00Z',
    updatedAt: '2026-10-10T00:00:00Z',
  },

  // ── PANTS ──
  {
    id: 'prod-11',
    name: 'Wide-Leg Fluid Trousers',
    slug: 'wide-leg-fluid-trousers',
    description: 'Palazzo-width trousers in liquid-weight wool crepe. High-rise, wide-leg, floor-touching. The gravity of a confident stride made visible.',
    price: 22000,
    sku: 'NAF-PT-001',
    collectionTag: 'OBSIDIAN SILK S/S 26',
    category: { id: 'cat-9', name: 'Pants', slug: 'pants', displayOrder: 9 },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
      { id: 'col-4', name: 'Alabaster', hex: '#f5f0e8' },
      { id: 'col-11', name: 'Slate', hex: '#708090' },
    ],
    images: ['/images/products/pants-wide-1.jpg'],
    assets: {
      videoIdle: '/videos/models/pants-wide-idle.mp4',
      videoWalk: '/videos/models/pants-wide-walk.mp4',
      tryonGarment: '/images/tryon/pants-wide-garment.png',
    },
    status: 'published',
    isFeatured: false,
    variants: [],
    createdAt: '2026-10-15T00:00:00Z',
    updatedAt: '2026-10-15T00:00:00Z',
  },

  // ── ACCESSORIES ──
  {
    id: 'prod-12',
    name: 'Bondage Leather Choker',
    slug: 'bondage-leather-choker',
    description: 'Hand-stitched vegetable-tanned leather choker with matte gunmetal hardware. The punctuation mark of a precisely constructed look.',
    price: 8500,
    sku: 'NAF-AC-001',
    collectionTag: 'NOIR STRUCTURE A/W 26',
    category: { id: 'cat-3', name: 'Accessories', slug: 'accessories', displayOrder: 3 },
    sizes: ['S', 'M', 'L'],
    colors: [
      { id: 'col-1', name: 'Obsidian', hex: '#1a1a1a' },
      { id: 'col-12', name: 'Oxblood', hex: '#4a0e0e' },
    ],
    images: ['/images/products/acc-choker-1.jpg'],
    assets: {
      tryonGarment: '/images/tryon/acc-choker-garment.png',
    },
    status: 'published',
    isFeatured: false,
    variants: [],
    createdAt: '2026-10-20T00:00:00Z',
    updatedAt: '2026-10-20T00:00:00Z',
  },
];

/** Returns products filtered by category slug */
export function getProductsByCategory(slug: string): Product[] {
  if (slug === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category.slug === slug);
}

/** Returns a single product by ID */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Returns featured products */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured && p.status === 'published');
}

/** Returns new arrivals (last 30 days mock) */
export function getNewArrivals(limit = 6): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/** Currency formatter — Bangladeshi Taka */
export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`;
}

/** Returns all categories with product counts */
export function getAllCategories() {
  return CATEGORIES;
}
