'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Upload, Sparkles, AlertCircle, Shield, CheckCircle, RefreshCw } from 'lucide-react';
import { PRODUCTS, formatBDT } from '@/data/products';
import { Product } from '@/types/product';

export default function AITryOnPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = () => {
    if (!userImage || !hasConsent) return;
    setIsProcessing(true);
    // Simulate local inference processing cycle (Phase 4 connects the live Python daemon)
    setTimeout(() => {
      setIsProcessing(false);
      // Demonstrative processed visual result
      setResultImage(userImage);
    }, 2500);
  };

  const handleReset = () => {
    setUserImage(null);
    setResultImage(null);
    setHasConsent(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] px-6 md:px-12 py-12">
      {/* Header */}
      <div className="border-b border-black/8 pb-6 mb-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[8px] tracking-[0.45em] uppercase text-black/30 mb-2">
              Neural Fashion Lab / Open-Source VTON
            </p>
            <h1
              className="text-[44px] md:text-[68px] font-black uppercase leading-none tracking-tight"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              AI VIRTUAL TRY-ON
            </h1>
          </div>
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-[8px] tracking-[0.3em] uppercase bg-black text-white px-3 py-1">
              CatVTON / IDM-VTON Engine
            </span>
            <span className="text-[7px] tracking-[0.2em] uppercase text-black/40 mt-1">
              Zero-Cost Local GPU Inference Architecture
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Garment Selector */}
        <div className="border border-black/8 p-6 bg-[#FDFDFB] h-fit">
          <p className="text-[8px] tracking-[0.35em] uppercase text-black/40 mb-4">
            1. Select Garment to Wear
          </p>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedProduct(p); setResultImage(null); }}
                className={`w-full flex items-center gap-3 p-3 text-left border transition-all ${
                  selectedProduct.id === p.id
                    ? 'border-black bg-[#F5F5F0]'
                    : 'border-black/10 hover:border-black/30'
                }`}
              >
                <div className="w-12 h-16 bg-[#E8E8E3] flex-shrink-0 flex items-center justify-center text-[6px] uppercase text-black/30">
                  {p.category.name}
                </div>
                <div className="flex-1">
                  <p className="text-[9px] tracking-[0.15em] uppercase font-bold truncate">
                    {p.name}
                  </p>
                  <p className="text-[8px] tracking-[0.2em] uppercase text-black/50">
                    {p.category.name} · {formatBDT(p.price)}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-black/8">
            <p className="text-[8px] tracking-[0.25em] uppercase text-black/40">Active Selection:</p>
            <p className="text-[11px] uppercase font-bold mt-1">{selectedProduct.name}</p>
            <p className="text-[10px] text-black/60">{formatBDT(selectedProduct.price)}</p>
          </div>
        </div>

        {/* Center: Customer Upload & Viewport */}
        <div className="border border-black/8 p-6 bg-[#FDFDFB] flex flex-col justify-between">
          <div>
            <p className="text-[8px] tracking-[0.35em] uppercase text-black/40 mb-4">
              2. Upload Your Full-Body Photograph
            </p>

            {!userImage ? (
              <label className="border-2 border-dashed border-black/15 hover:border-black/40 transition-colors h-[420px] flex flex-col items-center justify-center cursor-pointer p-6 text-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Upload size={32} strokeWidth={1} className="text-black/30 mb-3" />
                <p className="text-[10px] tracking-[0.25em] uppercase font-semibold">
                  Click to Upload Photograph
                </p>
                <p className="text-[8px] tracking-[0.15em] uppercase text-black/40 mt-1 max-w-xs">
                  For optimal drape synthesis, use a well-lit, front-facing standing photograph.
                </p>
              </label>
            ) : (
              <div className="relative h-[420px] bg-[#F5F5F0] overflow-hidden flex items-center justify-center">
                <img
                  src={resultImage || userImage}
                  alt="Customer Preview"
                  className="h-full w-full object-contain"
                />
                {resultImage && (
                  <div className="absolute top-3 left-3 bg-black text-white text-[7px] tracking-[0.3em] uppercase px-2 py-1">
                    AI Try-On Result
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-black text-[7px] tracking-[0.2em] uppercase px-3 py-1.5 border border-black/20 flex items-center gap-1 shadow-sm"
                >
                  <RefreshCw size={10} /> Reset Photo
                </button>
              </div>
            )}
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="mt-6 border-t border-black/8 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasConsent}
                onChange={(e) => setHasConsent(e.target.checked)}
                className="mt-0.5 accent-black"
              />
              <span className="text-[8px] tracking-[0.15em] uppercase text-black/60 leading-normal">
                I confirm I have permission to use this photograph. Images are processed locally and
                never retained or shared with third-party advertising brokers.
              </span>
            </label>
          </div>

          <div className="mt-6">
            <button
              onClick={handleProcess}
              disabled={!userImage || !hasConsent || isProcessing}
              className={`w-full py-4 text-[9px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-2 transition-all ${
                isProcessing
                  ? 'bg-black/20 text-black/40 cursor-wait'
                  : !userImage || !hasConsent
                  ? 'bg-black/10 text-black/30 cursor-not-allowed'
                  : 'bg-[#080808] text-[#FDFDFB] hover:bg-black/85'
              }`}
            >
              <Sparkles size={13} />
              {isProcessing ? 'Synthesizing Garment Fit...' : 'Generate Virtual Try-On'}
            </button>
          </div>
        </div>

        {/* Right: Technical & Privacy Specifications */}
        <div className="border border-black/8 p-6 bg-[#F5F5F0] space-y-6 text-[10px] tracking-wide">
          <div className="flex items-center gap-2 text-black/70">
            <Shield size={16} />
            <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-black">
              Zero-Cost Architecture
            </h3>
          </div>
          <p className="text-black/60 leading-relaxed text-[11px]">
            Unlike commercial fashion platforms that charge \$0.15–\$0.50 per image API call,
            NAFISAÉ utilizes open-source diffusion models running directly on your dedicated hardware:
          </p>

          <div className="space-y-3 border-t border-black/10 pt-4 text-[9px] uppercase tracking-[0.15em]">
            <div>
              <p className="font-bold text-black">• Core Model</p>
              <p className="text-black/50">CatVTON / IDM-VTON (Apache / MIT Compliant weights)</p>
            </div>
            <div>
              <p className="font-bold text-black">• Compute Requirements</p>
              <p className="text-black/50">NVIDIA CUDA GPU with ≥8GB VRAM (or local CPU fallback)</p>
            </div>
            <div>
              <p className="font-bold text-black">• Privacy Guarantee</p>
              <p className="text-black/50">Local inference ensures client photographs never leave your host</p>
            </div>
          </div>

          <div className="border-t border-black/10 pt-4">
            <p className="text-[8px] tracking-[0.3em] uppercase text-black/40 mb-2">
              Phase 4 AI Daemon Status
            </p>
            <div className="p-3 bg-white border border-black/10 text-[8px] font-mono">
              [AI SERVICE] Standby mode<br />
              [PORT] localhost:8000<br />
              [WEIGHTS] Ready for local deployment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
