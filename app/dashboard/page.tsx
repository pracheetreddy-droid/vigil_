'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Compass, Navigation, Radio, QrCode, FileText, CheckCircle2, Clock, MapPin, Edit2, User, Save } from 'lucide-react';
import { useVigilContext } from '@/lib/store';
import { calculateVigilSafetyScore, DEFAULT_SAFETY_FACTORS } from '@/lib/safety-score';

export default function TouristDashboard() {
  const {
    tourist,
    updateTouristName,
    triggerSos,
    checkInMinutesRemaining,
    resetCheckInTimer,
    simulateMissedCheckIn,
    missedCheckInSimulated,
    activeRoute,
    t,
  } = useVigilContext();

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(tourist.name);

  const safetyRes = calculateVigilSafetyScore(DEFAULT_SAFETY_FACTORS);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateTouristName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="space-y-8 py-4 font-sans">
      {/* Top Welcome & Active Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider">
              AUTHENTICATED TOURIST PROFILE
            </span>
            <button
              onClick={() => {
                setNameInput(tourist.name);
                setIsEditingName(!isEditingName);
              }}
              className="text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1 transition"
            >
              <Edit2 className="w-3 h-3 text-cyan-400" />
              <span>Change Name</span>
            </button>
          </div>

          {!isEditingName ? (
            <div className="space-y-0.5 mt-0.5">
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans flex items-center gap-2">
                <span>GOOD EVENING, {tourist.name.toUpperCase()}</span>
              </h1>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span>{tourist.location.city}, {tourist.location.country}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Journey active ●
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name..."
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-brand-500 text-white font-sans text-sm focus:outline-none font-bold"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-mono font-bold flex items-center gap-1 transition"
              >
                <Save className="w-3.5 h-3.5" /> SAVE
              </button>
            </form>
          )}

          <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{tourist.location.address}, {tourist.location.city}, {tourist.location.country}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/id"
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-xs hover:bg-zinc-800 transition flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>ID: {tourist.id}</span>
          </Link>

          <button
            onClick={triggerSos}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs shadow-lg shadow-red-600/30 transition flex items-center gap-1.5 animate-pulse"
          >
            <Radio className="w-4 h-4" />
            <span>SOS EMERGENCY</span>
          </button>
        </div>
      </div>

      {/* Missed Check-In Alert Banner if simulated */}
      {missedCheckInSimulated && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-600 text-white space-y-2 shadow-2xl font-mono"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span>⚠️ MISSED SAFETY CHECK-IN DETECTED</span>
            </div>
            <button
              onClick={resetCheckInTimer}
              className="px-3 py-1 rounded bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition"
            >
              CONFIRM I'M SAFE NOW ✓
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-zinc-300 pt-1">
            <div>Tourist: <span className="text-white font-bold">{tourist.id} ({tourist.name})</span></div>
            <div>Last known location: <span className="text-white font-bold">{tourist.location.address}</span></div>
            <div>Last check-in: <span className="text-white font-bold">{tourist.lastCheckIn}</span></div>
            <div>Status: <span className="text-red-400 font-bold">ESCALATED TO COMMAND</span></div>
          </div>
        </motion.div>
      )}

      {/* CURRENT SAFETY SCORE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-mono text-brand-400 uppercase tracking-wider font-bold">VIGIL SAFETY INDEX</span>
              <h2 className="text-xl font-bold text-white font-mono mt-0.5">{tourist.location.city}, {tourist.location.country}</h2>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${safetyRes.badgeBg}`}>
              {safetyRes.level}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Big Score Gauge */}
            <div className="relative w-36 h-36 rounded-full bg-zinc-900 border-4 border-zinc-800 flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-4xl font-black font-mono text-white tracking-tight">{safetyRes.score}</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">/ 100 INDEX</span>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-pulse pointer-events-none" />
            </div>

            {/* Score Factor Breakdown */}
            <div className="flex-1 w-full space-y-3 font-mono text-xs">
              <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">SAFETY FACTORS BREAKDOWN</div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Incident density</span>
                    <span className="text-emerald-400 font-bold">LOW (18%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500 w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Emergency access</span>
                    <span className="text-emerald-400 font-bold">HIGH (92%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500 w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Recent activity</span>
                    <span className="text-emerald-400 font-bold">LOW (12%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500 w-[12%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Time risk</span>
                    <span className="text-emerald-400 font-bold">LOW (20%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-1">
                    <div className="h-full bg-emerald-500 w-[20%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center justify-between">
            <span>{safetyRes.disclaimer}</span>
          </div>
        </div>

        {/* ACTIVE ALERTS CARD */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4 font-mono flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> ACTIVE ALERTS
              </span>
              <span className="text-[10px] text-zinc-500">UPDATED 2M AGO</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>⚠️ CAUTION — MODERATE RISK ADVISORY</span>
              </div>
              <p className="leading-relaxed">
                Increased incident activity detected within 1.5 km near MG Road Junction after 9:00 PM.
              </p>
              <div className="text-zinc-300 pt-1 font-semibold">
                RECOMMENDED: Use VIGIL SafeRoute monitored roads and avoid unlit side alleys.
              </div>
            </div>
          </div>

          <Link
            href="/map"
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center text-xs text-zinc-300 font-bold transition block"
          >
            INSPECT RISK ZONES ON MAP →
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider">
          QUICK ACTIONS
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-mono">
          <button
            onClick={triggerSos}
            className="p-4 rounded-2xl bg-red-600/20 border border-red-500/40 hover:bg-red-600/30 text-red-400 hover:border-red-500 transition text-left space-y-2 group shadow-xl"
          >
            <div className="p-2 rounded-xl bg-red-600 text-white w-max">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div className="font-bold text-base text-white">SOS</div>
            <div className="text-[10px] text-red-300">Immediate assistance</div>
          </button>

          <Link
            href="/map"
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 transition text-left space-y-2 group"
          >
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 w-max border border-brand-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div className="font-bold text-base text-white">SAFETY MAP</div>
            <div className="text-[10px] text-zinc-400">Risk zones & incidents</div>
          </Link>

          <Link
            href="/saferoute"
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 transition text-left space-y-2 group"
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 w-max border border-emerald-500/30">
              <Navigation className="w-5 h-5" />
            </div>
            <div className="font-bold text-base text-white">SAFEROUTE</div>
            <div className="text-[10px] text-zinc-400">Safety-aware navigation</div>
          </Link>

          <Link
            href="/report"
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 transition text-left space-y-2 group"
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 w-max border border-amber-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div className="font-bold text-base text-white">REPORT INCIDENT</div>
            <div className="text-[10px] text-zinc-400">Submit evidence & location</div>
          </Link>

          <Link
            href="/id"
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 transition text-left space-y-2 group col-span-2 sm:col-span-1"
          >
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 w-max border border-cyan-500/30">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="font-bold text-base text-white">TOURIST ID</div>
            <div className="text-[10px] text-zinc-400">Digital QR Verification</div>
          </Link>
        </div>
      </div>

      {/* JOURNEY & CHECK-IN TRACKER */}
      <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-6 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
          <div>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">ACTIVE JOURNEY</span>
            <h3 className="text-lg font-bold text-white font-sans">{tourist.currentJourney?.destination}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              {tourist.currentJourney?.safetyStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <div className="text-xs text-zinc-400">DESTINATION</div>
            <div className="text-sm font-bold text-white">{tourist.currentJourney?.destination}</div>
            <div className="text-[10px] text-zinc-500">ETA: {tourist.currentJourney?.eta}</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
            <div className="text-xs text-zinc-400">ACTIVE ROUTE</div>
            <div className="text-sm font-bold text-emerald-400">{activeRoute.label} ({activeRoute.safetyScore}% Safety)</div>
            <div className="text-[10px] text-zinc-500">{activeRoute.reason}</div>
          </div>

          {/* Check-In Action Timer */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-400" /> NEXT CHECK-IN
              </div>
              <div className="text-sm font-bold text-white">{checkInMinutesRemaining}:00 MINS</div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={resetCheckInTimer}
                className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
              >
                I'M SAFE ✓
              </button>

              <button
                onClick={simulateMissedCheckIn}
                className="px-2.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition"
                title="Evaluator demo control"
              >
                Simulate Missed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
