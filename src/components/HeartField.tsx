'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const HEART_PATH =
  'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791' +
  ' 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457' +
  ' 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621' +
  ' 5.274 5.181 0 4.069-5.136 8.625-11 14.402z';

interface HeartDef { col: number; row: number; twinkle: boolean; }
interface RisingHeart { id: string; left: number; size: number; dur: number; del: number; }

function buildGrid(cellPx: number, maxH: number): { hearts: HeartDef[]; cols: number } {
  const cols = Math.ceil(window.innerWidth / cellPx) + 1;
  const rows = Math.ceil(window.innerHeight / cellPx) + 1;
  const limit = Math.min(cols * rows, maxH);
  const hearts: HeartDef[] = [];
  outer: for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (hearts.length >= limit) break outer;
      hearts.push({ col: c, row: r, twinkle: Math.random() < 0.08 });
    }
  }
  return { hearts, cols };
}

function spawnRising(): RisingHeart[] {
  const n = 3 + Math.floor(Math.random() * 3);
  return Array.from({ length: n }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    left: 5 + Math.random() * 90,
    size: 16 + Math.floor(Math.random() * 13),
    dur: 5 + Math.random() * 3,
    del: Math.random() * 2,
  }));
}

export default function HeartField() {
  const [hearts, setHearts] = useState<HeartDef[]>([]);
  const [cols, setCols] = useState(16);
  const [rising, setRising] = useState<RisingHeart[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rebuild = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isTiny = w < 768 || h < 450;
    const cellPx = Math.max(40, Math.min(64, w * 0.046));
    const maxH = isTiny ? 120 : 260;
    const { hearts: h2, cols: c } = buildGrid(cellPx, maxH);
    setHearts(h2);
    setCols(c);
    wrapRef.current?.style.setProperty('--cell', `${cellPx}px`);
  }, []);

  useEffect(() => {
    rebuild();
    const onResize = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(rebuild, 200);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [rebuild]);

  useEffect(() => {
    const fire = () => {
      const batch = spawnRising();
      setRising(batch);
      setTimeout(() => setRising([]), 12000);
    };
    fire();
    const id = setInterval(fire, 8000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty('--px', String(e.clientX));
      el.style.setProperty('--py', String(e.clientY));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="heart-field"
      aria-hidden="true"
      style={{ '--cols': cols } as React.CSSProperties}
    >
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="hglass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.12)" />
          </linearGradient>
        </defs>
      </svg>

      {hearts.map(({ col, row, twinkle }) => (
        <span
          key={`${col}-${row}`}
          className={`heart-cell${twinkle ? ' twinkle' : ''}`}
          style={{ '--c': col, '--r': row } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" className="heart-svg" focusable="false">
            <path d={HEART_PATH} fill="url(#hglass)" stroke="rgba(255,255,255,.35)" strokeWidth="0.5" />
          </svg>
        </span>
      ))}

      {rising.map((rh) => (
        <span
          key={rh.id}
          className="heart-rising"
          style={{ left: `${rh.left}%`, '--rdur': `${rh.dur}s`, '--rdel': `${rh.del}s` } as React.CSSProperties}
        >
          <svg viewBox="0 0 24 24" width={rh.size} height={rh.size} style={{ display: 'block' }} focusable="false">
            <path d={HEART_PATH} fill="rgba(255,255,255,.55)" />
          </svg>
        </span>
      ))}
    </div>
  );
}
