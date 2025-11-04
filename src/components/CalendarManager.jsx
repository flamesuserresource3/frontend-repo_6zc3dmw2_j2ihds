import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startIdx = first.getDay(); // 0 Sun - 6 Sat
  const days = [];
  for (let i = 0; i < startIdx; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  return days;
}

export default function CalendarManager() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [quests, setQuests] = useState([
    { title: 'Publish Devlog', color: '#22d3ee' },
    { title: 'Gym', color: '#7c3aed' },
    { title: 'Read', color: '#a78bfa' },
  ]);
  const [completions, setCompletions] = useState({
    // key: yyyy-mm-dd -> array of quest indices completed
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = useMemo(() => buildMonth(year, month), [year, month]);

  const title = cursor.toLocaleString('default', { month: 'long', year: 'numeric' });

  const toggleCompletion = (date, qi) => {
    const key = date.toISOString().slice(0,10);
    setCompletions((prev) => {
      const existing = prev[key] || [];
      const idx = existing.indexOf(qi);
      const next = idx >= 0 ? existing.filter((x) => x !== qi) : [...existing, qi];
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="relative h-full w-full p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl rounded-3xl border border-violet-500/20 bg-black/40 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(167,139,250,0.18)]"
      >
        {/* Quest Manager */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Quest Manager</h3>
            <p className="text-sm text-zinc-400">Track monthly progress with colored system dots.</p>
          </div>
          <div className="flex items-center gap-3">
            {quests.map((q, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-white/5 px-3 py-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: q.color }} />
                <span className="text-sm text-zinc-200">{q.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Calendar Header */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="rounded-lg border border-zinc-700/60 bg-white/5 px-3 py-1.5 text-sm hover:border-violet-400 hover:shadow-[0_0_16px_rgba(167,139,250,0.25)] transition"
          >
            Prev
          </button>
          <div className="text-lg font-medium">{title}</div>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="rounded-lg border border-zinc-700/60 bg-white/5 px-3 py-1.5 text-sm hover:border-violet-400 hover:shadow-[0_0_16px_rgba(167,139,250,0.25)] transition"
          >
            Next
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mt-4 grid grid-cols-7 gap-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
            <div key={d} className="text-center text-xs text-zinc-400">{d}</div>
          ))}
          {days.map((d, idx) => (
            <div key={idx} className={`min-h-[84px] rounded-xl border p-2 ${d ? 'border-zinc-700/60 bg-white/5' : 'border-transparent'}`}>
              {d && (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">{d.getDate()}</span>
                    <div className="flex -space-x-1">
                      {(completions[d.toISOString().slice(0,10)] || []).slice(0,3).map((qi, k) => (
                        <span key={k} className="h-2.5 w-2.5 rounded-full ring-2 ring-[#0b0d13]" style={{ background: quests[qi]?.color }} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {quests.map((q, qi) => (
                      <button
                        key={qi}
                        onClick={() => toggleCompletion(d, qi)}
                        className="text-[11px] rounded-md border border-zinc-700/60 px-2 py-1 hover:border-violet-400 hover:shadow-[0_0_12px_rgba(167,139,250,0.25)] transition"
                      >
                        <span className="inline-flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full" style={{ background: q.color }} />
                          {q.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
