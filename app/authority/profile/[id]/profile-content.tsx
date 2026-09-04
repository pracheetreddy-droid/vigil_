'use client';

import React from 'react';
import Link from 'next/link';
import { useVigilContext } from '@/lib/store';
import { ShieldCheck, ArrowLeft, UserCheck, MapPin, PhoneCall, Clock, AlertTriangle } from 'lucide-react';

export function ProfileContent({ id }: { id: string }) {
  const { tourist, sosAlerts } = useVigilContext();

  return (
    <div className="space-y-6 py-4 font-mono max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-4 gap-2">
        <Link
          href="/authority"
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Command Center
        </Link>
        <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
          VERIFIED TOURIST PROFILE
        </span>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-zinc-800 pb-6">
          <div className="w-20 h-20 rounded-2xl bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-white text-2xl font-bold font-sans">
            PR
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white font-sans">{tourist.name}</h1>
            <div className="text-xs text-zinc-400">ID: {id || tourist.id} • {tourist.nationality}</div>
            <div className="text-xs text-emerald-400 font-bold">STATUS: {tourist.status} (Verified Credential)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <div className="text-zinc-500">LAST KNOWN GPS TELEMETRY</div>
            <div className="text-sm font-bold text-white">{tourist.location.address}</div>
            <div className="text-[10px] text-cyan-400">{tourist.location.lat.toFixed(4)}° N, {tourist.location.lng.toFixed(4)}° E</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <div className="text-zinc-500">ACTIVE JOURNEY</div>
            <div className="text-sm font-bold text-white">{tourist.currentJourney?.destination}</div>
            <div className="text-[10px] text-emerald-400">ETA: {tourist.currentJourney?.eta}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-zinc-400 uppercase">EMERGENCY CONTACT CIRCLE</div>
          <div className="space-y-2 text-xs">
            {tourist.contacts.map((c, idx) => (
              <div key={idx} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white font-sans">{c.name}</span>
                  <span className="text-zinc-400 text-xs ml-2">({c.relation})</span>
                </div>
                <span className="font-bold text-cyan-400">{c.phone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
