'use client';

import React from 'react';
import Link from 'next/link';
import { useVigilContext } from '@/lib/store';
import { ShieldCheck, CheckCircle2, MapPin, UserCheck, Lock, Clock, ArrowLeft } from 'lucide-react';

export function VerifyContent({ id }: { id: string }) {
  const { tourist } = useVigilContext();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950 border-2 border-emerald-500/60 shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500 animate-pulse" />

        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> IDENTITY VERIFIED
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            VIGIL VERIFICATION PORTAL
          </h1>
          <p className="text-xs text-zinc-400 font-sans">
            Official cryptographic verification confirmation issued by Karnataka Tourism & Vigil Safety Net.
          </p>
        </div>

        {/* Verification Card Breakdown */}
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">TOURIST ID:</span>
            <span className="font-bold text-white">{id || tourist.id}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">FULL NAME:</span>
            <span className="font-bold text-white">{tourist.name}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">NATIONALITY:</span>
            <span className="font-bold text-white">{tourist.nationality}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">SAFETY STATUS:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> {tourist.status}
            </span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-500">LAST CHECK-IN:</span>
            <span className="font-bold text-zinc-300">{tourist.lastCheckIn} (2 minutes ago)</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-500">VERIFICATION HASH:</span>
            <span className="font-bold text-cyan-400 font-mono text-[10px]">0x98A7...284F</span>
          </div>
        </div>

        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed font-sans">
          ✓ Verified by Karnataka State Tourism & Vigil Global Safety Net. Safe travel credential active.
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition pt-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Tourist Dashboard
        </Link>
      </div>
    </div>
  );
}
