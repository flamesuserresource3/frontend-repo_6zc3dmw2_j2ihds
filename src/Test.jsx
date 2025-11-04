import React from 'react';

export default function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0d13] text-white">
      <div className="rounded-2xl border border-violet-500/30 bg-black/40 p-8 shadow-[0_0_40px_rgba(167,139,250,0.2)]">
        <h1 className="text-2xl font-semibold tracking-tight">Test Route</h1>
        <p className="text-zinc-400 mt-2">This is a simple test page to confirm routing works.</p>
      </div>
    </div>
  );
}
