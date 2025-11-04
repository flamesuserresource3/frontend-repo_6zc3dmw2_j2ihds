import React from 'react';
import { motion } from 'framer-motion';

function MiniStat({ label, value, colorFrom, colorTo }) {
  const size = 72;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="drop-shadow-[0_0_16px_rgba(167,139,250,0.4)]">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} stroke="#1f2430" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2}
          cy={size/2}
          r={r}
          stroke={`url(#grad-${label})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  );
}

export default function RankDisplay() {
  return (
    <div className="relative h-full w-full grid place-items-center p-6">
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-3xl rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#0b0d13]/80 to-[#0b0d13]/60 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(167,139,250,0.18)]"
      >
        <div className="flex flex-col items-center gap-8">
          {/* Shield Badge */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl blur-xl bg-gradient-to-r from-violet-600 to-cyan-400 opacity-30" />
            <div className="relative grid place-items-center rounded-2xl border border-violet-400/30 bg-black/40 p-6">
              <svg width="140" height="160" viewBox="0 0 140 160" className="text-violet-300">
                <defs>
                  <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M70 10 L120 35 V85 C120 115 100 135 70 150 C40 135 20 115 20 85 V35 L70 10 Z" fill="url(#shield-grad)" opacity="0.18" />
                <path d="M70 10 L120 35 V85 C120 115 100 135 70 150 C40 135 20 115 20 85 V35 L70 10 Z" fill="none" stroke="url(#shield-grad)" strokeWidth="3" />
                <text x="50%" y="58%" textAnchor="middle" className="fill-white" fontSize="42" fontWeight="700">A</text>
              </svg>
              <div className="mt-2 text-center">
                <div className="text-sm text-zinc-400">Hunter Rank</div>
                <div className="text-2xl font-semibold tracking-wide">Shadow Hunter</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Next Rank</span>
              <span className="text-sm text-zinc-200">72%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_24px_rgba(167,139,250,0.5)]" />
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-3 gap-6">
            <MiniStat label="STR" value={80} colorFrom="#22d3ee" colorTo="#7c3aed" />
            <MiniStat label="DEX" value={64} colorFrom="#7c3aed" colorTo="#a78bfa" />
            <MiniStat label="INT" value={92} colorFrom="#06b6d4" colorTo="#22d3ee" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
