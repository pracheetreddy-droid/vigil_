'use client';

import React from 'react';
import { useVigilContext } from '@/lib/store';
import { DEMO_ROUTES, RouteOption } from '@/lib/demo-data';
import { InteractiveMap } from '@/components/interactive-map';
import { Navigation, ShieldCheck, Zap, Scale, CheckCircle2, ArrowRight, MapPin, AlertTriangle } from 'lucide-react';

export default function SafeRoutePage() {
  const { activeRoute, setActiveRoute, tourist } = useVigilContext();

  return (
    <div className="space-y-6 py-4 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            SAFETY-AWARE ROUTING ALGORITHM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
            VIGIL SAFEROUTE ENGINE
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Optimizes journey paths by balancing transit duration against real-time risk heatmaps & CCTV coverage.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <div>ORIGIN: <span className="text-white font-bold">{tourist.location.address}</span></div>
            <div>DESTINATION: <span className="text-emerald-400 font-bold">{tourist.currentJourney?.destination}</span></div>
          </div>
        </div>
      </div>

      {/* Recommended Route Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-zinc-950 to-zinc-950 border border-emerald-500/40 font-mono text-xs space-y-2 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>RECOMMENDED ROUTE: VIGIL SAFEST PATH (24 MINS • 94/100 SAFETY)</span>
        </div>
        <p className="text-zinc-300 leading-relaxed font-sans text-sm">
          "Recommended because it avoids 2 high-risk zones (MG Road Alleys & Shivajinagar) and passes 3 active police kiosks and full CCTV corridors."
        </p>
      </div>

      {/* Route Comparisons Grid (Required by Spec 10) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {DEMO_ROUTES.map((route) => {
          const isSelected = activeRoute.id === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setActiveRoute(route)}
              className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-zinc-900 border-2 border-emerald-500 shadow-xl shadow-emerald-950/30'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{route.label}</span>
                  {route.recommended && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-zinc-950 font-bold text-[10px]">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-3xl font-black text-white">{route.timeMinutes}</span>
                    <span className="text-xs text-zinc-500 font-normal"> min</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400">SAFETY</span>
                    <div className={`text-xl font-bold ${route.safetyScore >= 80 ? 'text-emerald-400' : route.safetyScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                      {route.safetyScore} <span className="text-xs text-zinc-500 font-normal">/ 100</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-2 border-t border-zinc-800">
                  {route.reason}
                </p>
              </div>

              <button
                className={`w-full py-2.5 rounded-xl font-mono font-bold text-xs transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {isSelected ? 'SELECTED ROUTE ✓' : 'SELECT THIS ROUTE'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Map View of Active Selected Route */}
      <div className="space-y-3 font-mono">
        <h2 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">
          VISUAL ROUTE MAP ({activeRoute.label})
        </h2>
        <InteractiveMap showRoute={true} selectedRoute={activeRoute} heightClass="h-[460px]" />
      </div>

      {/* Safety Routing Disclaimer (Prompt Requirement) */}
      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center font-mono text-[11px] text-zinc-500 leading-relaxed">
        ⚠️ <strong className="text-zinc-400">DEMO SAFETY ROUTING NOTICE:</strong> VIGIL SafeRoute recommendations are prototype algorithmic estimates based on simulated telemetry. VIGIL does not make real-world safety guarantees. Always exercise personal caution.
      </div>
    </div>
  );
}
