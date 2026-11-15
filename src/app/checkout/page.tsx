'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatBDT } from '@/data/products';

export default function CheckoutPage() {
  const { state, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: 'Dhaka',
    division: 'Dhaka Division',
    postalCode: '1212',
    deliveryMethod: 'express',
    paymentMethod: 'cod',
    notes: '',
  });

  const shippingCost = subtotal >= 5000 ? 0 : 350;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#FDFDFB]">
        <CheckCircle2 size={64} className="text-[#080808] mb-6 stroke-[1.5]" />
        <p className="text-[9px] tracking-[0.4em] uppercase text-black/40 mb-2">Order Confirmed</p>
        <h1
          className="text-[40px] md:text-[56px] font-black uppercase mb-4"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          ORDER #NF-{Math.floor(100000 + Math.random() * 900000)}
        </h1>
        <p className="text-[12px] text-black/60 max-w-md mb-8 leading-relaxed">
          Thank you for acquiring from NAFISAÉ. Your atelier order has been received. Our concierge
          will contact you via phone/WhatsApp to confirm dispatch.
        </p>
        <div className="flex gap-4">
          <Link
            href="/shop"
            className="bg-[#080808] text-[#FDFDFB] text-[9px] tracking-[0.4em] uppercase px-8 py-4 hover:bg-black/80 transition-colors"
          >
            Continue Browsing
          </Link>
          <Link
            href="/virtual-studio"
            className="border border-black/20 text-[9px] tracking-[0.4em] uppercase px-8 py-4 hover:bg-black/5 transition-colors"
          >
            Enter Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      <div className="mb-6">
        <Link href="/cart" className="text-[8px] tracking-[0.25em] uppercase text-black/40 hover:text-black flex items-center gap-1">
          <ArrowLeft size={10} /> Back to Bag
        </Link>
      </div>

      <div className="border-b border-black/8 pb-6 mb-10">
        <h1
          className="text-[40px] md:text-[60px] font-black uppercase leading-none"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          CHECKOUT
        </h1>
        <p className="text-[8px] tracking-[0.3em] uppercase text-[#D02020] mt-1 font-semibold">
          [DEVELOPMENT MODE — ZERO-COST SECURE TEST ENVIRONMENT]
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping & Payment Form */}
        <div className="lg:col-span-2 space-y-10">
          {/* Contact Details */}
          <div>
            <h2 className="text-[13px] tracking-[0.3em] uppercase font-bold border-b border-black/8 pb-3 mb-6">
              1. CONTACT INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@nafisae.com"
                  className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">
                  Mobile / WhatsApp (Bangladesh) *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-[13px] tracking-[0.3em] uppercase font-bold border-b border-black/8 pb-3 mb-6">
              2. DELIVERY DESTINATION
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">
                    First Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">
                    Last Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">
                  Street Address & House / Apartment *
                </label>
                <input
                  required
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="House 14, Road 7, Gulshan 2"
                  className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">City *</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">Division *</label>
                  <input
                    required
                    type="text"
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[8px] tracking-[0.25em] uppercase text-black/50 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-transparent border border-black/15 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-[13px] tracking-[0.3em] uppercase font-bold border-b border-black/8 pb-3 mb-6">
              3. PAYMENT METHOD (BANGLADESH)
            </h2>
            <div className="space-y-3">
              {[
                { id: 'cod', label: 'Cash on Delivery (COD) / Card on Delivery', desc: 'Pay in Bangladeshi Taka upon physical inspection by courier.' },
                { id: 'bkash', label: 'bKash / Nagad / Upay (Mobile Banking Test Mode)', desc: 'Test-mode mobile banking confirmation via atelier concierge.' },
                { id: 'card', label: 'Direct Bank Wire / Visa / Mastercard (Atelier Concierge)', desc: 'Concierge will provide payment link upon garment reservation.' },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    formData.paymentMethod === m.id ? 'border-black bg-[#F5F5F0]' : 'border-black/15 hover:border-black/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={formData.paymentMethod === m.id}
                    onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                    className="mt-0.5 accent-black"
                  />
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold">{m.label}</p>
                    <p className="text-[9px] text-black/50 mt-0.5">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Review Sticky Box */}
        <div className="border border-black/8 p-8 bg-[#FDFDFB] h-fit space-y-6 sticky top-20">
          <h2
            className="text-[18px] font-black uppercase tracking-widest border-b border-black/8 pb-4"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            ORDER REVIEW
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-black/8">
            {state.items.map((i) => (
              <div key={`${i.product.id}-${i.size}`} className="pt-2 flex justify-between text-[9px] uppercase">
                <div>
                  <p className="font-semibold">{i.product.name}</p>
                  <p className="text-black/50">{i.size} · {i.color.name} (x{i.quantity})</p>
                </div>
                <p className="font-semibold">{formatBDT(i.product.price * i.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-black/8 pt-4 space-y-2 text-[10px] tracking-[0.2em] uppercase">
            <div className="flex justify-between text-black/60">
              <span>Subtotal</span>
              <span>{formatBDT(subtotal)}</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Courier Delivery</span>
              <span>{shippingCost === 0 ? 'COMPLIMENTARY' : formatBDT(shippingCost)}</span>
            </div>
            <div className="border-t border-black/8 pt-3 flex justify-between text-[13px] font-bold text-black">
              <span>Total in BDT</span>
              <span>{formatBDT(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={state.items.length === 0}
            className="w-full bg-[#080808] text-[#FDFDFB] text-[9px] tracking-[0.4em] uppercase py-4 font-bold hover:bg-black/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Confirm & Place Order
          </button>

          <div className="flex items-center gap-2 justify-center text-[7px] tracking-[0.2em] uppercase text-black/40">
            <ShieldCheck size={12} /> Encrypted Zero-Cost SSL Checkout
          </div>
        </div>
      </form>
    </div>
  );
}
