import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

export default function SwipeContainer({ pages }) {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    x.set(-index * width);
  }, [index, width, x]);

  const onDragEnd = (_, info) => {
    const threshold = width * 0.15;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -threshold || velocity < -500) {
      setIndex((i) => Math.min(i + 1, pages.length - 1));
    } else if (offset > threshold || velocity > 500) {
      setIndex((i) => Math.max(i - 1, 0));
    } else {
      // snap back
      setIndex((i) => i);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Page indicators */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-violet-400 shadow-[0_0_12px_2px_rgba(167,139,250,0.8)]' : 'w-2 bg-zinc-600'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        ref={containerRef}
        className="h-full flex"
        style={{ width: `${pages.length * 100}vw`, x }}
        drag="x"
        dragConstraints={{ left: -((pages.length - 1) * width), right: 0 }}
        dragElastic={0.1}
        onDragEnd={onDragEnd}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        {pages.map((PageEl, i) => (
          <section
            key={i}
            className="w-screen h-screen shrink-0 relative"
          >
            <AnimatePresence mode="wait">{PageEl}</AnimatePresence>
          </section>
        ))}
      </motion.div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.06),transparent_60%)]" />
    </div>
  );
}
