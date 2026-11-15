'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatBDT } from '@/data/products';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart, itemCount, subtotal } = useCart();
  const shippingThreshold = 5000;
  const freeShipping = subtotal >= shippingThreshold;
  const progressToFree = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2">
        <Link href="/shop" className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black flex items-center gap-1">
          <ArrowLeft size={10} /> Continue Shopping
        </Link>
      </div>

      <div className="flex items-baseline justify-between border-b border-black/8 pb-6 mb-10">
        <h1
          className="text-[44px] md:text-[64px] font-black uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          SHOPPING BAG
        </h1>
        <span className="text-[10px] tracking-[0.3em] uppercase text-black/50">
          [{itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}]
        </span>
      </div>

      {state.items.length === 0 ? (
        <div className="py-24 text-center flex flex-col items-center justify-center gap-5">
          <ShoppingBag size={48} strokeWidth={1} className="text-black/20" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-black/40">Your bag is empty</p>
          <Link
            href="/shop"
            className="mt-2 bg-[#080808] text-[#FDFDFB] text-[9px] tracking-[0.4em] uppercase px-8 py-4 hover:bg-black/80 transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free shipping progress bar */}
            <div className="border border-black/8 p-4 bg-[#F5F5F0]">
              <div className="flex justify-between text-[8px] tracking-[0.25em] uppercase mb-2">
                <span>
                  {freeShipping
                    ? '✓ COMPLIMENTARY SHIPPING UNLOCKED'
                    : `ADD ${formatBDT(shippingThreshold - subtotal)} FOR FREE SHIPPING`}
                </span>
                <span>{progressToFree}%</span>
              </div>
              <div className="w-full h-1 bg-black/10">
                <div
                  className="h-full bg-[#080808] transition-all duration-500"
                  style={{ width: `${progressToFree}%` }}
                />
              </div>
            </div>

            <div className="divide-y divide-black/8 border-y border-black/8">
              {state.items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color.id}`} className="py-6 flex gap-6 items-center">
                  <div className="w-24 h-32 bg-[#F5F5F0] flex-shrink-0 flex items-center justify-center text-[7px] tracking-[0.2em] uppercase text-black/20">
                    {item.product.category.name}
                  </div>
                  <div className="flex-1">
                    <p className="text-[7px] tracking-[0.3em] uppercase text-black/40 mb-1">
                      {item.product.collectionTag ?? item.product.category.name}
                    </p>
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="text-[12px] tracking-[0.15em] uppercase font-bold hover:opacity-60 transition-opacity">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-black/60 mt-1">
                      Size: <span className="font-semibold text-black">{item.size}</span> · Colour:{' '}
                      <span className="font-semibold text-black">{item.color.name}</span>
                    </p>
                    <p className="text-[11px] font-semibold mt-2">{formatBDT(item.product.price)}</p>
                  </div>
                  {/* Quantity */}
                  <div className="flex items-center gap-3 border border-black/20 px-3 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color.id, item.quantity - 1)}
                      className="text-xs hover:text-black/50"
                    >
                      -
                    </button>
                    <span className="text-[10px] w-4 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color.id, item.quantity + 1)}
                      className="text-xs hover:text-black/50"
                    >
                      +
                    </button>
                  </div>
                  {/* Total & Delete */}
                  <div className="text-right min-w-[90px]">
                    <p className="text-[12px] font-bold">{formatBDT(item.product.price * item.quantity)}</p>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color.id)}
                      className="mt-2 text-black/30 hover:text-[#D02020] transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-[8px] tracking-[0.3em] uppercase text-black/40 hover:text-[#D02020] transition-colors"
              >
                Empty Bag
              </button>
              <Link
                href="/shop"
                className="text-[8px] tracking-[0.3em] uppercase text-black/60 hover:text-black underline underline-offset-4"
              >
                Add More Items
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="border border-black/8 p-8 bg-[#FDFDFB] h-fit space-y-6">
            <h2
              className="text-[20px] font-black uppercase tracking-widest border-b border-black/8 pb-4"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 text-[10px] tracking-[0.2em] uppercase">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span className="font-semibold text-black">{formatBDT(subtotal)}</span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Shipping</span>
                <span className="font-semibold text-black">
                  {freeShipping ? 'FREE' : formatBDT(350)}
                </span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>Estimated Tax (VAT)</span>
                <span className="font-semibold text-black">INCLUDED</span>
              </div>
              <div className="border-t border-black/8 pt-4 flex justify-between text-[13px] font-bold text-black">
                <span>Total</span>
                <span>{formatBDT(subtotal + (freeShipping ? 0 : 350))}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full bg-[#080808] text-[#FDFDFB] text-center py-4 text-[9px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-2 hover:bg-black/85 transition-colors"
              >
                Proceed to Checkout <ArrowRight size={12} />
              </Link>
            </div>

            <div className="border-t border-black/8 pt-6 space-y-2 text-[8px] tracking-[0.15em] uppercase text-black/40">
              <p>• Complimentary luxury packaging included</p>
              <p>• 14-day international returns</p>
              <p>• Direct atelier inspection guarantee</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
