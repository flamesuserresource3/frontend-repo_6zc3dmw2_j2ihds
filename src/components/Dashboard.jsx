import React, { useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

function NeonProgressRing({ size = 160, stroke = 12, progress = 68 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="drop-shadow-[0_0_20px_rgba(167,139,250,0.6)]">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} stroke="#1f2430" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2}
          cy={size/2}
          r={r}
          stroke="url(#grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
          style={{ filter: 'url(#glow)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-semibold tracking-tight">{progress}%</div>
          <div className="text-xs text-zinc-400 uppercase">Daily Sync</div>
        </div>
      </div>
    </div>
  );
}

function DailyQuests() {
  const [quests, setQuests] = useState([
    { id: 1, label: 'Clear Inbox to Zero', done: false },
    { id: 2, label: 'Deep Work 90 min', done: true },
    { id: 3, label: 'Train 30 min', done: false },
    { id: 4, label: 'Read 20 pages', done: false },
  ]);

  const toggle = (id) => setQuests((q) => q.map((x) => x.id === id ? { ...x, done: !x.done } : x));

  return (
    <div className="mt-6 space-y-3">
      {quests.map((q) => (
        <button
          key={q.id}
          onClick={() => toggle(q.id)}
          className={`group w-full flex items-center justify-between rounded-xl border px-4 py-3 backdrop-blur-sm transition-all duration-300 ${
            q.done
              ? 'border-violet-500/40 bg-violet-500/10 shadow-[0_0_20px_rgba(167,139,250,0.35)]'
              : 'border-zinc-700/60 hover:border-violet-400/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.25)] bg-white/5'
          }`}
        >
          <span className={`text-sm ${q.done ? 'text-violet-200 line-through decoration-violet-400/60' : 'text-zinc-200'}`}>
            {q.label}
          </span>
          <span
            className={`h-6 w-6 rounded-md border flex items-center justify-center transition-all ${
              q.done
                ? 'border-violet-400 bg-violet-500/30 shadow-[0_0_12px_rgba(167,139,250,0.9)]'
                : 'border-zinc-600 group-hover:border-violet-400'
            }`}
            aria-hidden
          >
            {q.done ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-violet-200"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500"><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="relative h-full w-full">
      {/* 3D Hero */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Y7DK6OtMHusdC345/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0d13]/40 to-[#0b0d13]" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full lg:w-1/2 max-w-xl rounded-2xl border border-violet-500/20 bg-black/40 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(167,139,250,0.15)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">System Dashboard</h1>
              <p className="text-zinc-400 text-sm">Hunter: Shadow Operative</p>
            </div>
            <NeonProgressRing progress={72} />
          </div>
          <DailyQuests />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
          className="w-full lg:w-1/2 max-w-xl rounded-2xl border border-cyan-400/20 bg-black/40 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
        >
          <h2 className="text-xl font-semibold mb-4">Daily Quest Log</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-700/60 bg-white/5 p-4">
              <p className="text-sm text-zinc-400">Streak</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="rounded-xl border border-zinc-700/60 bg-white/5 p-4">
              <p className="text-sm text-zinc-400">Completed</p>
              <p className="text-3xl font-bold">7/10</p>
            </div>
            <div className="rounded-xl border border-zinc-700/60 bg-white/5 p-4 col-span-2">
              <p className="text-sm text-zinc-400">Focus Tip</p>
              <p className="text-zinc-200">Switch to single-task mode for the next 25 minutes.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
