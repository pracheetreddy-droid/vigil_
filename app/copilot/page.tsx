'use client';

import React, { useState } from 'react';
import { useVigilContext } from '@/lib/store';
import { askVigilAi, AiCopilotResponse } from '@/lib/ai-service';
import { Bot, Send, Sparkles, Shield, AlertTriangle, Hospital, ShieldCheck, ArrowRight, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  structuredResponse?: AiCopilotResponse;
  timestamp: string;
}

const INITIAL_SUGGESTED_QUESTIONS = [
  'Is my current area safe?',
  'What is the safest route?',
  'Why is this area risky?',
  'Where is the nearest hospital?',
  'What should I do in an emergency?',
  'What should I do if I feel unsafe?',
];

export default function CopilotPage() {
  const { tourist } = useVigilContext();
  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      text: `Hello ${tourist.name}. I am VIGIL AI — Safety Copilot. I have scanned your location (${tourist.location.address}, ${tourist.location.city}) and active risk telemetry. How can I assist your journey?`,
      timestamp: '10:40 PM',
    },
  ]);

  const handleSend = async (queryText: string) => {
    const textToSubmit = queryText || inputQuery;
    if (!textToSubmit.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'USER',
      text: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    const aiRes = await askVigilAi(textToSubmit, {
      lat: tourist.location.lat,
      lng: tourist.location.lng,
      name: tourist.location.address,
    });

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'AI',
      text: aiRes.assessmentText,
      structuredResponse: aiRes,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="space-y-6 py-4 font-sans max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Bot className="w-4 h-4" /> CONTEXT-AWARE ASSISTANT
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
            VIGIL AI — SAFETY COPILOT
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Real-time conversational risk intelligence fed by live incident feeds, CCTV logs & emergency hubs.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>LOCATION TELEMETRY LINKED</span>
        </div>
      </div>

      {/* Suggested Questions Bar (Spec 11) */}
      <div className="space-y-2 font-mono">
        <span className="text-[11px] text-zinc-500 uppercase font-bold tracking-wider">SUGGESTED QUICK QUERIES:</span>
        <div className="flex flex-wrap gap-2">
          {INITIAL_SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition text-left"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Conversational Stream Box */}
      <div className="p-6 rounded-2xl glass-panel border border-zinc-800 min-h-[460px] flex flex-col justify-between space-y-6">
        <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'AI' && (
                <div className="p-2 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-400 shrink-0 h-max">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 rounded-2xl space-y-3 ${
                  msg.sender === 'USER'
                    ? 'bg-brand-600 text-white rounded-tr-none font-mono text-xs'
                    : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-tl-none font-sans text-sm'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>{msg.sender === 'USER' ? tourist.name : 'VIGIL AI COPILOT'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="leading-relaxed">{msg.text}</p>

                {/* Structured AI Visual Response Card */}
                {msg.structuredResponse && (
                  <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80 font-mono text-xs space-y-3 mt-3">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <span className="text-zinc-500 font-bold uppercase text-[10px]">AI RISK ASSESSMENT</span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          msg.structuredResponse.riskLevel === 'HIGH RISK'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : msg.structuredResponse.riskLevel === 'MODERATE RISK'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}
                      >
                        {msg.structuredResponse.riskLevel}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-emerald-400 font-bold text-[11px]">RECOMMENDATION</div>
                      <p className="text-zinc-300 font-sans text-xs">{msg.structuredResponse.recommendationText}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                        <span className="text-zinc-500 block text-[9px]">NEAREST POLICE</span>
                        <span className="font-bold text-white">{msg.structuredResponse.nearestPoliceDist}</span>
                      </div>
                      <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                        <span className="text-zinc-500 block text-[9px]">NEAREST HOSPITAL</span>
                        <span className="font-bold text-white">{msg.structuredResponse.nearestHospitalDist}</span>
                      </div>
                    </div>

                    {msg.structuredResponse.suggestedActions?.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-zinc-400 font-bold text-[10px] uppercase">SUGGESTED ACTIONS</span>
                        <div className="space-y-1">
                          {msg.structuredResponse.suggestedActions.map((act, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-zinc-300 text-xs">
                              <ArrowRight className="w-3 h-3 text-brand-400" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === 'USER' && (
                <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 shrink-0 h-max">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-zinc-400 font-mono text-xs">
              <Bot className="w-5 h-5 text-brand-400 animate-spin" />
              <span>VIGIL AI is processing location telemetry & risk models...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
          className="flex items-center gap-3 pt-4 border-t border-zinc-800"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask VIGIL AI about your location, safety, or recommended routes..."
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 font-sans"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-mono font-bold text-xs disabled:opacity-40 transition flex items-center gap-1.5"
          >
            <span>SEND</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Informational Guidance Disclaimer (Prompt Requirement) */}
        <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-500 text-center leading-relaxed">
          ⚠️ <strong className="text-zinc-400">SAFETY NOTICE:</strong> VIGIL AI provides contextual safety intelligence for informational guidance only. In an emergency or life-threatening situation, dial <span className="text-white font-bold">112</span> directly or activate <span className="text-red-400 font-bold">VIGIL SOS</span>.
        </div>
      </div>
    </div>
  );
}
