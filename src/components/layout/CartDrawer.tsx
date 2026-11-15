'use client';

import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatBDT } from '@/data/products';

export default function CartDrawer() {
  const { state, closeDrawer, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* ── Backdrop ─── */}
      <div
        className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-[2px]"
        onClick={closeDrawer}
      />

      {/* ── Drawer Panel ─── */}
      <div className="fixed right-0 top-0 z-[201] h-full w-full max-w-sm bg-[#FDFDFB] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#080808]/40">Your Bag</p>
            <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#080808]">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </p>
          </div>
          <button onClick={closeDrawer} className="hover:opacity-50 transition-opacity">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={36} strokeWidth={1} className="text-black/20" />
              <p className="text-[9px] tracking-[0.3em] uppercase text-black/40">
                Your bag is empty
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="text-[9px] tracking-[0.3em] uppercase underline underline-offset-4 hover:opacity-50 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color.id}`}
                className="flex gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-28 bg-[#F5F5F0] flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-[#e8e8e3] to-[#d8d8d3] flex items-center justify-center">
                    <ShoppingBag size={24} strokeWidth={1} className="text-black/20" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-semibold leading-tight">
                        {item.product.name}
                      </p>
                      <p className="text-[8px] tracking-[0.2em] uppercase text-black/40 mt-0.5">
                        {item.size} · {item.color.name}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color.id)}
                      className="text-black/30 hover:text-black transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-black/15">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.color.id, item.quantity - 1)
                        }
                        className="px-2 py-1 hover:bg-black hover:text-white transition-colors"
                      >
                        <Minus size={9} />
                      </button>
                      <span className="text-[10px] tracking-[0.1em] w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.color.id, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-black hover:text-white transition-colors"
                      >
                        <Plus size={9} />
                      </button>
                    </div>
                    <p className="text-[11px] tracking-[0.1em] font-semibold">
                      {formatBDT(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-black/8 px-6 py-5 space-y-4">
            <div className="flex justify-between">
              <p className="text-[9px] tracking-[0.25em] uppercase text-black/50">Subtotal</p>
              <p className="text-[12px] tracking-[0.1em] font-semibold">{formatBDT(subtotal)}</p>
            </div>
            <p className="text-[8px] tracking-[0.15em] uppercase text-black/40">
              Shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full bg-[#080808] text-[#FDFDFB] text-center text-[9px] tracking-[0.4em] uppercase py-4 hover:bg-[#080808]/80 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block w-full border border-black/20 text-center text-[9px] tracking-[0.4em] uppercase py-3 hover:bg-black/5 transition-colors"
            >
              View Full Bag
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
