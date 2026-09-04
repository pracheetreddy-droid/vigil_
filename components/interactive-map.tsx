'use client';

import React, { useState, useEffect } from 'react';
import { useVigilContext } from '@/lib/store';
import { RiskZone, IncidentReport, EmergencyService, RouteOption } from '@/lib/demo-data';
import { Shield, AlertTriangle, MapPin, Navigation, Info, Filter, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface InteractiveMapProps {
  showRoute?: boolean;
  selectedRoute?: RouteOption;
  onZoneClick?: (zone: RiskZone) => void;
  heightClass?: string;
}

export function InteractiveMap({
  showRoute = false,
  selectedRoute,
  onZoneClick,
  heightClass = 'h-[500px]',
}: InteractiveMapProps) {
  const { riskZones, incidents, tourist, activeRoute, selectedRiskZone, setSelectedRiskZone } = useVigilContext();
  const [filterType, setFilterType] = useState<'ALL' | 'RISK_ZONES' | 'INCIDENTS' | 'EMERGENCY'>('ALL');
  const [activeZoneDetail, setActiveZoneDetail] = useState<RiskZone | null>(selectedRiskZone || riskZones[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const routeToDraw = selectedRoute || activeRoute;

  const handleZoneSelect = (zone: RiskZone) => {
    setActiveZoneDetail(zone);
    setSelectedRiskZone(zone);
    if (onZoneClick) onZoneClick(zone);
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden glass-panel border border-zinc-800 flex flex-col md:flex-row`}>
      {/* Filter Header Bar */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 bg-zinc-950/90 backdrop-blur-md p-1.5 rounded-xl border border-zinc-800 text-xs font-mono">
        <span className="text-zinc-500 font-semibold px-2 flex items-center gap-1">
          <Filter className="w-3 h-3 text-brand-400" /> FILTERS:
        </span>
        {(['ALL', 'RISK_ZONES', 'INCIDENTS', 'EMERGENCY'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setFilterType(mode)}
            className={`px-2.5 py-1 rounded-lg transition ${
              filterType === mode
                ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {mode.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Legend Badge */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-3 bg-zinc-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-300">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Moderate</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" /> High Risk</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> GPS Location</span>
      </div>

      {/* Main Tactical Canvas Map Rendering */}
      <div className="relative flex-1 w-full h-full bg-[#09090d] bg-tactical-grid flex items-center justify-center overflow-hidden">
        {/* Animated Radar Scanning Effect Background */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-cyan-500/10 pointer-events-none flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full border border-cyan-500/10" />
          <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/15" />
          <div className="absolute inset-0 rounded-full radar-sweep-line animate-radar-sweep opacity-30" />
        </div>

        {/* Tactical Interactive Map Nodes */}
        <div className="relative w-full h-full p-8 flex flex-col justify-between">
          {/* Top Bar Indicators */}
          <div className="flex justify-between items-start pt-12 md:pt-2">
            <div className="px-3 py-1 bg-zinc-900/90 border border-zinc-800 rounded-lg text-[11px] font-mono text-zinc-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>BENGALURU SAFETY SECTOR • 12.9716° N, 77.5946° E</span>
            </div>
          </div>

          {/* Interactive Risk & Location Pins Container */}
          <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
            {/* Safe Route Polyline Overlay */}
            {showRoute && routeToDraw && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <path
                  d="M 120 180 Q 250 100, 380 140 T 540 220"
                  fill="none"
                  stroke={routeToDraw.id === 'SAFEST' ? '#10b981' : routeToDraw.id === 'BALANCED' ? '#f59e0b' : '#ef4444'}
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Current Tourist Pin (Pracheet) */}
            <div className="absolute left-[20%] top-[45%] z-20 group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-glow-cyan animate-pulse">
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="absolute -top-7 px-2 py-0.5 rounded bg-zinc-900 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold whitespace-nowrap">
                  YOU ({tourist.name})
                </div>
              </div>
            </div>

            {/* Risk Zones Pins */}
            {riskZones.map((zone, idx) => {
              const positions = [
                { left: '42%', top: '35%' },
                { left: '68%', top: '25%' },
                { left: '60%', top: '65%' },
                { left: '85%', top: '55%' },
              ];
              const pos = positions[idx % positions.length];
              const isSelected = activeZoneDetail?.id === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => handleZoneSelect(zone)}
                  style={{ left: pos.left, top: pos.top }}
                  className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition ${
                    filterType !== 'ALL' && filterType !== 'RISK_ZONES' ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Glowing Radius Circle */}
                    <div
                      className={`w-16 h-16 rounded-full border border-dashed flex items-center justify-center ${
                        zone.level === 'HIGH'
                          ? 'bg-red-500/15 border-red-500/60 shadow-glow-red animate-pulse'
                          : zone.level === 'MODERATE'
                          ? 'bg-amber-500/15 border-amber-500/60 shadow-glow-amber'
                          : 'bg-emerald-500/15 border-emerald-500/60'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white ${
                          zone.level === 'HIGH' ? 'bg-red-600' : zone.level === 'MODERATE' ? 'bg-amber-600' : 'bg-emerald-600'
                        } ${isSelected ? 'ring-4 ring-white' : ''}`}
                      >
                        {zone.riskScore}
                      </div>
                    </div>

                    <div className="absolute top-16 px-2 py-1 rounded bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono text-zinc-200 whitespace-nowrap shadow-xl flex items-center gap-1">
                      <span>{zone.name}</span>
                      <ChevronRight className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Info bar */}
          <div className="text-[11px] font-mono text-zinc-500 flex justify-between items-center">
            <span>LIVE INCIDENT STREAM: ACTIVE</span>
            <span>ZOOM: SECTOR 4</span>
          </div>
        </div>
      </div>

      {/* Selected Risk Zone Drawer Panel (Right Side) */}
      {activeZoneDetail && (
        <div className="w-full md:w-80 bg-zinc-950/95 border-t md:border-t-0 md:border-l border-zinc-800 p-5 flex flex-col justify-between shrink-0 font-mono">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">SELECTED RISK ZONE</span>
                <h3 className="text-base font-bold text-white font-sans mt-0.5">{activeZoneDetail.name}</h3>
              </div>
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  activeZoneDetail.level === 'HIGH'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : activeZoneDetail.level === 'MODERATE'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {activeZoneDetail.level} RISK
              </div>
            </div>

            {/* Risk Score Metric */}
            <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-zinc-400">RISK INDEX</span>
                <div className="text-2xl font-black text-white">{activeZoneDetail.riskScore} <span className="text-xs text-zinc-500 font-normal">/ 100</span></div>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-xs text-zinc-400">PEAK RISK PERIOD</span>
                <div className="text-xs font-bold text-amber-400">{activeZoneDetail.peakPeriod}</div>
              </div>
            </div>

            {/* Incidents Breakdown */}
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">RECENT INCIDENTS</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Theft:</span>
                  <span className="font-bold text-white">{activeZoneDetail.incidentsBreakdown.theft}</span>
                </div>
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Harassment:</span>
                  <span className="font-bold text-white">{activeZoneDetail.incidentsBreakdown.harassment}</span>
                </div>
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Accidents:</span>
                  <span className="font-bold text-white">{activeZoneDetail.incidentsBreakdown.accidents}</span>
                </div>
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Other:</span>
                  <span className="font-bold text-white">{activeZoneDetail.incidentsBreakdown.other}</span>
                </div>
              </div>
            </div>

            {/* AI Assessment & Recommendation */}
            <div className="space-y-2 text-xs">
              <div className="text-brand-400 font-bold uppercase flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> AI ASSESSMENT
              </div>
              <p className="text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 leading-relaxed font-sans">
                {activeZoneDetail.aiAssessment}
              </p>

              <div className="text-emerald-400 font-bold uppercase pt-1">RECOMMENDATION</div>
              <p className="text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 leading-relaxed font-sans">
                {activeZoneDetail.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
