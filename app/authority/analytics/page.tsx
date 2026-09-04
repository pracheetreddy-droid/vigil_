'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Clock, Shield, TrendingDown } from 'lucide-react';

const INCIDENTS_TIME_DATA = [
  { time: '00:00', count: 2 },
  { time: '04:00', count: 1 },
  { time: '08:00', count: 3 },
  { time: '12:00', count: 5 },
  { time: '16:00', count: 4 },
  { time: '20:00', count: 9 },
  { time: '23:59', count: 3 },
];

const INCIDENTS_CATEGORY_DATA = [
  { category: 'Theft', count: 12, color: '#ef4444' },
  { category: 'Harassment', count: 6, color: '#f59e0b' },
  { category: 'Accident', count: 4, color: '#06b6d4' },
  { category: 'Suspicious', count: 3, color: '#6366f1' },
  { category: 'Medical', count: 2, color: '#10b981' },
];

const RISK_DISTRIBUTION_DATA = [
  { name: 'Low Risk Sectors', value: 45, color: '#10b981' },
  { name: 'Moderate Risk', value: 35, color: '#f59e0b' },
  { name: 'High Risk Zones', value: 20, color: '#ef4444' },
];

const RESPONSE_TIMES_BY_SECTOR = [
  { sector: 'Sector 1 (Indiranagar)', timeMins: 3.4 },
  { sector: 'Sector 2 (Koramangala)', timeMins: 4.1 },
  { sector: 'Sector 3 (MG Road)', timeMins: 3.8 },
  { sector: 'Sector 4 (Majestic)', timeMins: 5.6 },
  { sector: 'Sector 5 (Whitefield)', timeMins: 6.2 },
];

const HOTSPOT_TRENDS_DATA = [
  { day: 'Mon', incidents: 14, patrols: 20 },
  { day: 'Tue', incidents: 18, patrols: 22 },
  { day: 'Wed', incidents: 12, patrols: 24 },
  { day: 'Thu', incidents: 22, patrols: 26 },
  { day: 'Fri', incidents: 31, patrols: 35 },
  { day: 'Sat', incidents: 27, patrols: 34 },
  { day: 'Sun', incidents: 24, patrols: 30 },
];

export default function AuthorityAnalyticsPage() {
  return (
    <div className="space-y-8 py-4 font-mono">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="text-xs text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> STATISTICAL RISK & INCIDENT METRICS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
            SAFETY ANALYTICS SUITE
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Empirical historical incident data, emergency response efficiency, and risk vector distribution across Bengaluru.
          </p>
        </div>
      </div>

      {/* Key Metric Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-500 uppercase">AVG EMERGENCY RESPONSE TIME</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">3.8 MINS</div>
          <div className="text-[10px] text-zinc-400">↓ 1.4 mins faster than municipal target</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-500 uppercase">RESOLVED INCIDENTS</span>
          <div className="text-3xl font-black text-white font-mono">88.8%</div>
          <div className="text-[10px] text-emerald-400">24 out of 27 cases resolved</div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
          <span className="text-xs text-zinc-500 uppercase">ACTIVE TOURIST COVERAGE</span>
          <div className="text-3xl font-black text-cyan-400 font-mono">1,284</div>
          <div className="text-[10px] text-zinc-400">Real-time telemetry link active</div>
        </div>
      </div>

      {/* Recharts Visualizations (Spec 21) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incidents Over Time Line Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <div className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            1. INCIDENTS OVER TIME (24-HOUR DISTRIBUTION)
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={INCIDENTS_TIME_DATA}>
                <XAxis dataKey="time" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Category Bar Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <div className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            2. INCIDENTS BY TYPE CATEGORY
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCIDENTS_CATEGORY_DATA}>
                <XAxis dataKey="category" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <div className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            3. REGIONAL RISK VECTOR DISTRIBUTION
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION_DATA}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {RISK_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emergency Response Times by Sector */}
        <div className="p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <div className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            4. AVERAGE DISPATCH RESPONSE TIME (MINUTES)
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESPONSE_TIMES_BY_SECTOR} layout="vertical">
                <XAxis type="number" stroke="#71717a" fontSize={11} />
                <YAxis dataKey="sector" type="category" stroke="#71717a" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px' }}
                />
                <Bar dataKey="timeMins" fill="#10b981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Hotspot Trends Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <div className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
            5. WEEKLY HOTSPOT INCIDENT TRENDS VS PREVENTATIVE PATROL DEPLOYMENTS
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOTSPOT_TRENDS_DATA}>
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px' }}
                />
                <Bar dataKey="incidents" fill="#ef4444" name="Incidents" radius={[4, 4, 0, 0]} />
                <Bar dataKey="patrols" fill="#06b6d4" name="Patrol Units" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
