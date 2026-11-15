'use client';

import React, { useState } from 'react';
import { Shield, Ban, CheckCircle } from 'lucide-react';
import { formatBDT } from '@/data/products';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([
    { id: 'usr-1', name: 'Sultana Rahman', email: 'sultana@example.com', orders: 4, spend: 154000, role: 'customer', isBlocked: false, date: '12 Sep 2026' },
    { id: 'usr-2', name: 'Tariq Hassan', email: 'tariq@example.com', orders: 2, spend: 66500, role: 'customer', isBlocked: false, date: '01 Oct 2026' },
    { id: 'usr-3', name: 'Amina Chowdhury', email: 'amina@example.com', orders: 6, spend: 284000, role: 'customer', isBlocked: false, date: '15 Aug 2026' },
    { id: 'usr-4', name: 'Fahim Khan', email: 'fahim@example.com', orders: 1, spend: 38500, role: 'staff', isBlocked: false, date: '10 Nov 2026' },
    { id: 'usr-5', name: 'Zainab Ahmed', email: 'zainab@example.com', orders: 0, spend: 0, role: 'customer', isBlocked: true, date: '02 Nov 2026' },
  ]);

  const toggleBlock = (id: string) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, isBlocked: !c.isBlocked } : c)));
  };

  const updateRole = (id: string, newRole: string) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, role: newRole } : c)));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <p className="text-[8px] tracking-[0.45em] uppercase text-white/40 mb-1">
            Accounts & Access Control
          </p>
          <h1
            className="text-[36px] md:text-[48px] font-black uppercase leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            CLIENT DIRECTORY
          </h1>
        </div>
        <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">
          {customers.length} Registered Accounts
        </span>
      </div>

      <div className="border border-white/10 bg-[#0f0f0f] overflow-x-auto">
        <table className="w-full text-left text-[9px] uppercase tracking-wider">
          <thead>
            <tr className="border-b border-white/10 text-white/30 bg-white/[0.02]">
              <th className="p-4">Client Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Lifetime Spend</th>
              <th className="p-4">Role (RBAC)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4 text-white/60 lowercase">{c.email}</td>
                <td className="p-4 text-white font-mono">{c.orders}</td>
                <td className="p-4 text-white font-semibold">{formatBDT(c.spend)}</td>
                <td className="p-4">
                  <select
                    value={c.role}
                    onChange={(e) => updateRole(c.id, e.target.value)}
                    className="bg-black border border-white/20 text-white text-[7px] uppercase px-2 py-1 outline-none"
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 text-[7px] tracking-widest font-bold ${
                      c.isBlocked
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {c.isBlocked ? 'BLOCKED' : 'ACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleBlock(c.id)}
                    className={`text-[7px] tracking-[0.2em] uppercase px-3 py-1 border transition-colors ${
                      c.isBlocked
                        ? 'border-emerald-600 text-emerald-400 hover:bg-emerald-950'
                        : 'border-red-600/40 text-red-400 hover:bg-red-950'
                    }`}
                  >
                    {c.isBlocked ? 'Unblock' : 'Block Client'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
