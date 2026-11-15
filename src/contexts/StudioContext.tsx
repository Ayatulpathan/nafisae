'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, ViewMode, AnimationType } from '@/types/product';
import { PRODUCTS, CATEGORIES } from '@/data/products';

// ── State ────────────────────────────────────────────────────
interface StudioState {
  selectedProduct: Product | null;
  selectedCategory: string; // category slug — 'all' or specific slug
  activeMode: ViewMode;
  activeAnimation: AnimationType;
  currency: string;
}

interface StudioContextValue extends StudioState {
  selectProduct: (product: Product) => void;
  selectCategory: (slug: string) => void;
  setMode: (mode: ViewMode) => void;
  setAnimation: (animation: AnimationType) => void;
  setCurrency: (currency: string) => void;
  filteredProducts: Product[];
  categories: typeof CATEGORIES;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    PRODUCTS.find((p) => p.isFeatured) ?? PRODUCTS[0] ?? null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMode, setActiveMode] = useState<ViewMode>('video');
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>('idle');
  const [currency, setCurrencyState] = useState<string>('BDT');

  const selectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    // Reset to idle animation on product switch
    setActiveAnimation('idle');
  }, []);

  const selectCategory = useCallback((slug: string) => {
    setSelectedCategory(slug);
    // Auto-select first product of this category
    const first =
      slug === 'all'
        ? PRODUCTS[0]
        : PRODUCTS.find((p) => p.category.slug === slug);
    if (first) setSelectedProduct(first);
  }, []);

  const setMode = useCallback((mode: ViewMode) => setActiveMode(mode), []);
  const setAnimation = useCallback((anim: AnimationType) => setActiveAnimation(anim), []);
  const setCurrency = useCallback((c: string) => setCurrencyState(c), []);

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category.slug === selectedCategory);

  return (
    <StudioContext.Provider
      value={{
        selectedProduct,
        selectedCategory,
        activeMode,
        activeAnimation,
        currency,
        selectProduct,
        selectCategory,
        setMode,
        setAnimation,
        setCurrency,
        filteredProducts,
        categories: CATEGORIES,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used within StudioProvider');
  return ctx;
}
