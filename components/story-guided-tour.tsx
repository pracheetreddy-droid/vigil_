'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, RotateCcw, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useVigilContext } from '@/lib/store';

interface StoryStep {
  step: number;
  title: string;
  description: string;
  route: string;
  actionText?: string;
  triggerAction?: (ctx: any) => void;
}

const AISHA_STORY_STEPS: StoryStep[] = [
  {
    step: 1,
    title: '1. Aisha Arrives in Bengaluru',
    description: 'Aisha opens VIGIL. Generates verified Digital Tourist ID (VG-284921) with QR access.',
    route: '/id',
  },
  {
    step: 2,
    title: '2. Live Location Intelligence',
    description: 'VIGIL automatically detects GPS position (Near MG Road) and scans surroundings.',
    route: '/',
  },
  {
    step: 3,
    title: '3. Real-Time Safety Index Generated',
    description: 'VIGIL computes Safety Index (87/100 LOW RISK) based on emergency proximity and incident density.',
    route: '/dashboard',
  },
  {
    step: 4,
    title: '4. Open Interactive Safety Map',
    description: 'Aisha explores surroundings on the dark map to spot nearby risk zones and police hubs.',
    route: '/map',
  },
  {
    step: 5,
    title: '5. Moderate-Risk Zone Detected',
    description: 'VIGIL highlights MG Road (Score 72 MODERATE RISK) with a 34% evening incident spike.',
    route: '/map',
  },
  {
    step: 6,
    title: '6. Ask VIGIL AI Copilot',
    description: 'Aisha asks: "Is it safe to visit this area tonight?" VIGIL AI provides context-aware guidance.',
    route: '/copilot',
  },
  {
    step: 7,
    title: '7. AI Explains Risk & Recommendations',
    description: 'AI explains moderate theft risk after 9 PM and recommends taking western monitored routes.',
    route: '/copilot',
  },
  {
    step: 8,
    title: '8. VIGIL Recommends SafeRoute',
    description: 'Aisha opens SafeRoute engine comparing Fastest (18m/48) vs Safest (24m/94).',
    route: '/saferoute',
  },
  {
    step: 9,
    title: '9. Aisha Starts Journey',
    description: 'VIGIL recommends the 94% safety route avoiding 2 risk zones and passing 3 police kiosks.',
    route: '/saferoute',
  },
  {
    step: 10,
    title: '10. Share Journey with Safety Circle',
    description: 'Aisha broadcasts live journey, ETA, and protected status to Mom, Dad & Friend.',
    route: '/circle',
  },
  {
    step: 11,
    title: '11. Suspicious Incident Occurs',
    description: 'Aisha notices suspicious activity and prepares to submit a community report or trigger SOS.',
    route: '/report',
  },
  {
    step: 12,
    title: '12. Aisha Activates SOS',
    description: 'Aisha triggers the emergency SOS button. Immediate location & tourist payload is broadcast.',
    route: '/sos',
    triggerAction: (ctx) => ctx.triggerSos(),
  },
  {
    step: 13,
    title: '13. Emergency Alert Created',
    description: 'VIGIL displays nearest police (1.2km) & hospital (2.4km) while transmitting telemetry.',
    route: '/sos',
  },
  {
    step: 14,
    title: '14. VIGIL COMMAND Receives Alert',
    description: 'Switch to Authority view! Operations center receives flashing SOS for Aisha (VG-284921).',
    route: '/authority',
  },
  {
    step: 15,
    title: '15. Authority Views Aisha’s Safety Profile',
    description: 'Authorities inspect Aisha’s verified passport, journey history, and live coordinates.',
    route: '/authority/profile/VG-284921',
  },
  {
    step: 16,
    title: '16. Incident Recorded & Cataloged',
    description: 'Incident #INC-82931 is officially cataloged into Bengaluru safety database.',
    route: '/authority',
  },
  {
    step: 17,
    title: '17. VIGIL Intelligence Identifies Hotspot',
    description: 'VIGIL Intelligence detects +34% incident surge and suggests patrol deployment.',
    route: '/authority/intelligence',
  },
  {
    step: 18,
    title: '18. Authority Receives Recommendation & Dispatches',
    description: 'Authority approves AI recommendation and dispatches mobile unit to MG Road Junction.',
    route: '/authority',
  },
];

export function StoryGuidedTour() {
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const vigilCtx = useVigilContext();

  // Prefetch all route bundles on mount for instant zero-lag navigation
  React.useEffect(() => {
    AISHA_STORY_STEPS.forEach((s) => {
      try {
        router.prefetch(s.route);
      } catch {}
    });
  }, [router]);

  const currentStep = AISHA_STORY_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < AISHA_STORY_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const nextStep = AISHA_STORY_STEPS[nextIdx];
      if (nextStep.triggerAction) {
        nextStep.triggerAction(vigilCtx);
      }
      router.push(nextStep.route);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      const prevStep = AISHA_STORY_STEPS[prevIdx];
      router.push(prevStep.route);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-brand-500/40 text-brand-400 text-xs font-mono shadow-xl hover:bg-zinc-800 transition"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Run VIGIL Demo Tour ({currentStepIndex + 1}/18)</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-brand-500/30 text-xs py-2 px-4 shadow-xl relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-1.5 rounded-lg bg-brand-500/20 border border-brand-500/40 text-brand-400 shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-brand-400 font-bold uppercase tracking-wider">
                AISHA DEMO SCENARIO • STEP {currentStep.step} OF 18
              </span>
              <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                {currentStep.route}
              </span>
            </div>
            <div className="font-semibold text-zinc-100 flex items-center gap-2">
              {currentStep.title}
              <span className="text-zinc-400 font-normal hidden lg:inline">— {currentStep.description}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 transition flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === AISHA_STORY_STEPS.length - 1}
            className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-500 text-white font-medium shadow-md shadow-brand-500/20 transition flex items-center gap-1.5"
          >
            <span>Next Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition"
            title="Minimize tour bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
