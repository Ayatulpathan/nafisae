'use client';

import React, { useState } from 'react';
import { Sparkles, Activity, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminAISettingsPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [endpoint, setEndpoint] = useState('http://localhost:8000/api/vton');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const testConnection = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult('Ready for Phase 4 local Python service integration.');
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Local Neural Inference Configuration
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            AI TRY-ON SETTINGS
          </h1>
        </div>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] p-8 max-w-2xl space-y-6 text-[9px] uppercase tracking-wider">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <p className="font-bold text-white text-[11px]">Enable Virtual Try-On Sitewide</p>
            <p className="text-white/40 text-[8px] mt-0.5">Allows clients to upload photos and preview garments</p>
          </div>
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`px-4 py-2 text-[8px] font-bold border transition-colors ${
              isEnabled ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-red-950 text-red-400 border-red-800'
            }`}
          >
            {isEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-white/60">Local Python Inference Daemon URL</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full bg-black border border-white/15 p-3 text-white font-mono text-[9px] outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-white/60">Target Neural Architecture</label>
          <select className="w-full bg-black border border-white/15 p-3 text-white outline-none">
            <option value="catvton">CatVTON (Local PyTorch + CUDA, Zero Cost)</option>
            <option value="idmvton">IDM-VTON (Local Diffusion Weights, Zero Cost)</option>
          </select>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            onClick={testConnection}
            disabled={testing}
            className="bg-white text-black px-6 py-3 font-bold hover:bg-white/80 transition-colors flex items-center gap-2"
          >
            <Activity size={12} /> {testing ? 'Testing Endpoint...' : 'Ping Inference Service'}
          </button>
          {testResult && (
            <span className="text-emerald-400 font-mono text-[8px]">{testResult}</span>
          )}
        </div>
      </div>
    </div>
  );
}
