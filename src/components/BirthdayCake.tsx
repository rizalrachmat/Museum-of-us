'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * =======================================================================
 * TEKS HARAPAN ULANG TAHUN (Dapat diganti di sini)
 * =======================================================================
 */
export const BIRTHDAY_WISH_TEXT = 'Semoga semua harapanmu terkabul ya cintaa♥';

type CandleState = 'lit' | 'wobbling' | 'igniting' | 'extinguished';

export default function BirthdayCake() {
  // State masing-masing lilin (3 lilin: 0 = kiri, 1 = tengah, 2 = kanan)
  const [candleStates, setCandleStates] = useState<CandleState[]>(['lit', 'lit', 'lit']);
  const [smokeStates, setSmokeStates] = useState<boolean[]>([false, false, false]);

  // State tampilan teks harapan & hati melayang
  const [showWish, setShowWish] = useState(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);

  // State aksi tombol & proteksi klik berulang
  const [isAllBlown, setIsAllBlown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref penampung timer & confetti untuk cleanup
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const confettiIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current);
      confettiIntervalRef.current = null;
    }
  };

  // Cleanup semua timer dan confetti saat komponen di-unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  // Cek apakah pengguna mengaktifkan prefers-reduced-motion
  const isReducedMotion = () => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Efek Confetti Ungu, Emas, dan Pink
   * Meledak dari tengah kue dan kedua sisi panel selama ±2.5 detik
   */
  const launchBirthdayConfetti = () => {
    if (isReducedMotion()) return;

    const colors = [
      '#9370DB', // Medium Purple
      '#BA55D3', // Orchid Purple
      '#7058A3', // Museum Royal Purple
      '#D4AF37', // Metallic Gold
      '#FFD700', // Bright Gold
      '#F3CE6E', // Warm Gold
      '#FFB6C1', // Light Pink
      '#FF69B4', // Hot Pink
    ];

    // Ledakan pertama di tengah kue
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.58 },
      colors,
      disableForReducedMotion: true,
    });

    const endTime = Date.now() + 2500;

    confettiIntervalRef.current = setInterval(() => {
      if (Date.now() > endTime) {
        if (confettiIntervalRef.current) {
          clearInterval(confettiIntervalRef.current);
          confettiIntervalRef.current = null;
        }
        return;
      }

      // Tembakan meriah dari sisi kiri panel
      confetti({
        particleCount: 28,
        angle: 60,
        spread: 55,
        origin: { x: 0.15, y: 0.68 },
        colors,
        disableForReducedMotion: true,
      });

      // Tembakan meriah dari sisi kanan panel
      confetti({
        particleCount: 28,
        angle: 120,
        spread: 55,
        origin: { x: 0.85, y: 0.68 },
        colors,
        disableForReducedMotion: true,
      });
    }, 380);
  };

  /**
   * AKSI 1: Tiup Lilin Ulang Tahun!
   * 1. Api ketiga lilin bergoyang kencang sebentar (±300 ms).
   * 2. Padam satu per satu dari kiri ke kanan dengan jeda ±250 ms.
   * 3. Mengeluarkan asap tipis naik dan memudar ±1 detik.
   * 4. Glow di sekitar kue meredup.
   * 5. Setelah semua padam (jeda ±600 ms): confetti ungu/emas/pink + hati melayang + teks harapan muncul.
   */
  const handleBlowCandles = () => {
    if (isAnimating || isAllBlown) return;
    setIsAnimating(true);
    clearAllTimers();

    // Mode Reduced Motion: langsung padamkan sekaligus tanpa efek berat
    if (isReducedMotion()) {
      setCandleStates(['extinguished', 'extinguished', 'extinguished']);
      setIsAllBlown(true);
      setShowWish(true);
      setIsAnimating(false);
      return;
    }

    // 1. Ketiga api lilin bergoyang kencang ditiup angin (wobble)
    setCandleStates(['wobbling', 'wobbling', 'wobbling']);

    // 2. Padamkan satu per satu dari kiri ke kanan
    // Lilin 0 (kiri) padam pada 300 ms
    addTimer(() => {
      setCandleStates(['extinguished', 'wobbling', 'wobbling']);
      setSmokeStates([true, false, false]);
      addTimer(() => setSmokeStates((prev) => [false, prev[1], prev[2]]), 1000);
    }, 300);

    // Lilin 1 (tengah) padam pada 550 ms (300 + 250 ms)
    addTimer(() => {
      setCandleStates(['extinguished', 'extinguished', 'wobbling']);
      setSmokeStates((prev) => [prev[0], true, false]);
      addTimer(() => setSmokeStates((prev) => [prev[0], false, prev[2]]), 1000);
    }, 550);

    // Lilin 2 (kanan) padam pada 800 ms (550 + 250 ms)
    addTimer(() => {
      setCandleStates(['extinguished', 'extinguished', 'extinguished']);
      setSmokeStates((prev) => [prev[0], prev[1], true]);
      addTimer(() => setSmokeStates((prev) => [prev[0], prev[1], false]), 1000);
      setIsAllBlown(true);
    }, 800);

    // 3. Jeda ±600 ms setelah lilin terakhir padam (800 + 600 = 1400 ms)
    addTimer(() => {
      setShowWish(true);
      setShowFloatingHearts(true);
      launchBirthdayConfetti();

      // Aktifkan kembali tombol (berubah menjadi "Nyalakan lagi ✨")
      addTimer(() => {
        setIsAnimating(false);
      }, 1200);
    }, 1400);
  };

  /**
   * AKSI 2: Nyalakan Lilin Lagi
   * 1. Tulisan harapan memudar.
   * 2. Api muncul kembali satu per satu dari kiri ke kanan dengan animasi membesar dari kecil.
   * 3. Cahaya glow di sekitar kue kembali terang.
   * 4. Tombol kembali menjadi "Tiup Lilin Ulang Tahun!".
   */
  const handleRelightCandles = () => {
    if (isAnimating || !isAllBlown) return;
    setIsAnimating(true);
    clearAllTimers();

    // Sembunyikan ucapan & hati kecil
    setShowWish(false);
    setShowFloatingHearts(false);

    if (isReducedMotion()) {
      setCandleStates(['lit', 'lit', 'lit']);
      setIsAllBlown(false);
      setIsAnimating(false);
      return;
    }

    // Nyalakan lilin satu per satu dari kiri ke kanan dengan animasi igniting
    // Lilin 0 menyala pada 180 ms
    addTimer(() => {
      setCandleStates(['igniting', 'extinguished', 'extinguished']);
    }, 180);

    // Lilin 1 menyala pada 380 ms
    addTimer(() => {
      setCandleStates(['lit', 'igniting', 'extinguished']);
    }, 380);

    // Lilin 2 menyala pada 580 ms
    addTimer(() => {
      setCandleStates(['lit', 'lit', 'igniting']);
      setIsAllBlown(false);
    }, 580);

    // Semua kembali stabil menjadi 'lit' dan tombol siap digunakan lagi
    addTimer(() => {
      setCandleStates(['lit', 'lit', 'lit']);
      setIsAnimating(false);
    }, 980);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        position: 'relative',
      }}
    >
      {/* Cake Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '340px',
          padding: '12px 0 4px 0',
        }}
      >
        {/* Glow Behind Cake (Meredup lembut saat lilin padam) */}
        <div
          style={{
            position: 'absolute',
            width: 'min(260px, 75vw)',
            height: 'min(260px, 75vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.42) 0%, rgba(147,112,219,0.22) 70%, transparent 100%)',
            filter: 'blur(30px)',
            opacity: isAllBlown ? 0.18 : 0.75,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Hati Melayang Naik dari Kue saat Lilin Padam */}
        {showFloatingHearts && (
          <div className="floating-hearts-wrap" aria-hidden="true">
            {[
              { left: '22%', delay: '0s', color: '#FFB6C1', size: '15px' },
              { left: '38%', delay: '0.25s', color: '#F3CE6E', size: '18px' },
              { left: '50%', delay: '0.1s', color: '#D8BFD8', size: '16px' },
              { left: '64%', delay: '0.4s', color: '#FF69B4', size: '14px' },
              { left: '78%', delay: '0.2s', color: '#FFD700', size: '17px' },
              { left: '32%', delay: '0.65s', color: '#E6E6FA', size: '15px' },
            ].map((heart, idx) => (
              <span
                key={idx}
                className="floating-heart-item"
                style={{
                  left: heart.left,
                  animationDelay: heart.delay,
                  color: heart.color,
                  fontSize: heart.size,
                }}
              >
                ♥
              </span>
            ))}
          </div>
        )}

        {/* 3 Candles on Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 'clamp(18px, 4.5vw, 26px)',
            marginBottom: '4px',
            zIndex: 10,
          }}
        >
          {[0, 1, 2].map((idx) => {
            const state = candleStates[idx];
            const isSmoking = smokeStates[idx];

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Api Lilin / Efek Padam */}
                <div
                  style={{
                    height: '24px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {state === 'lit' && (
                    <div className={`cake-flame cake-flame-${idx}`} aria-hidden="true" />
                  )}

                  {state === 'wobbling' && (
                    <div className="cake-flame cake-flame-wobble" aria-hidden="true" />
                  )}

                  {state === 'igniting' && (
                    <div className="cake-flame cake-flame-igniting" aria-hidden="true" />
                  )}

                  {/* Asap tipis yang naik dan memudar ±1 detik */}
                  {isSmoking && (
                    <div className="candle-smoke-wrap" aria-hidden="true">
                      <span className="candle-smoke-puff candle-smoke-puff-1" />
                      <span className="candle-smoke-puff candle-smoke-puff-2" />
                    </div>
                  )}
                </div>

                {/* Sumbu Lilin (Wick) */}
                <div style={{ width: '2px', height: '6px', background: '#333' }} />

                {/* Badan Lilin (Candle Body) */}
                <div
                  style={{
                    width: '14px',
                    height: '46px',
                    borderRadius: '2px 2px 0 0',
                    background: 'linear-gradient(to right, #FAF0E6 0%, #E6E6FA 50%, #D8BFD8 100%)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(147,112,219,0.35) 0, rgba(147,112,219,0.35) 2px, transparent 0, transparent 6px)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Cake Tier 1 (Top Tier: 21 TAHUN) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{
            position: 'relative',
            width: '150px',
            height: '52px',
            borderRadius: '16px 16px 0 0',
            background: 'linear-gradient(180deg, #FDFBF7 0%, #F5EFEB 100%)',
            border: '2px solid rgba(212, 175, 55, 0.7)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 3,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '14px',
              background: '#7A5A9E',
              borderRadius: '0 0 10px 10px',
              opacity: 0.95,
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 800,
              fontSize: '13px',
              color: '#553075',
              letterSpacing: '0.12em',
              zIndex: 2,
              marginTop: '6px',
            }}
          >
            21 TAHUN
          </span>
        </motion.div>

        {/* Cake Tier 2 (Middle Tier: Putri Octafia Ramadani) */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          style={{
            position: 'relative',
            width: '220px',
            height: '64px',
            borderRadius: '18px 18px 0 0',
            background: 'linear-gradient(180deg, #6C4B8F 0%, #523472 100%)',
            border: '2px solid rgba(212, 175, 55, 0.75)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-2px',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: '#FAF6EE',
              borderRadius: '0 0 8px 8px',
              opacity: 0.95,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#F5D070',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              marginTop: '8px',
              textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(245, 208, 112, 0.35)',
              zIndex: 2,
              padding: '0 6px',
            }}
          >
            <span style={{ fontSize: '10px', opacity: 0.85 }}>✨</span>
            <span style={{ whiteSpace: 'nowrap' }}>Putri Octafia Ramadani</span>
            <span style={{ fontSize: '10px', opacity: 0.85 }}>✨</span>
          </div>
        </motion.div>

        {/* Cake Tier 3 (Bottom Tier: Happy Birthday to My Special One) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          style={{
            position: 'relative',
            width: '270px',
            height: '74px',
            borderRadius: '20px 20px 0 0',
            background: 'linear-gradient(180deg, #FAF6EE 0%, #EDE4D8 100%)',
            border: '2.5px solid rgba(212, 175, 55, 0.85)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-2px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '15px',
              background: '#6A478D',
              borderRadius: '0 0 10px 10px',
              opacity: 0.95,
            }}
          />
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '13px',
              color: '#4A2B6B',
              textAlign: 'center',
              padding: '0 12px',
              marginTop: '8px',
            }}
          >
            Happy Birthday to My Special One
          </div>
        </motion.div>

        {/* Cake Stand / Platter */}
        <div
          style={{
            width: '300px',
            maxWidth: '92vw',
            height: '12px',
            borderRadius: '20px',
            background: 'linear-gradient(90deg, #B8860B 0%, #FFD700 35%, #FFF8DC 50%, #FFD700 65%, #B8860B 100%)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            marginTop: '-2px',
            zIndex: 4,
          }}
        />
        <div
          style={{
            width: '130px',
            height: '20px',
            borderRadius: '0 0 14px 14px',
            background: 'linear-gradient(180deg, #D4AF37 0%, #99731C 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            zIndex: 3,
          }}
        />
      </div>

      {/* Teks Harapan Ulang Tahun (Fade-in + Naik Halus) */}
      <div
        aria-live="polite"
        style={{
          minHeight: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          marginBottom: '6px',
          textAlign: 'center',
          padding: '0 12px',
        }}
      >
        {showWish && (
          <p
            className="birthday-wish-text"
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              fontWeight: 600,
              color: '#F3CE6E',
              textShadow: '0 0 12px rgba(243, 206, 110, 0.45), 0 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '0.02em',
            }}
          >
            {BIRTHDAY_WISH_TEXT}
          </p>
        )}
      </div>

      {/* Interactive Action Button (Tiup Lilin / Nyalakan Lagi) */}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!isAllBlown ? (
          <button
            type="button"
            onClick={handleBlowCandles}
            disabled={isAnimating}
            aria-label="Tiup lilin ulang tahun"
            className="cake-action-button"
            style={{
              padding: '12px 28px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5E096 50%, #D4AF37 100%)',
              color: '#221133',
              fontWeight: 700,
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
            }}
          >
            {/* Ikon SVG Api Tajam (Resolusi Crisp) */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#552200"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
            </svg>
            <span>Tiup Lilin Ulang Tahun!</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRelightCandles}
            disabled={isAnimating}
            aria-label="Nyalakan lilin ulang tahun lagi"
            className="cake-action-button"
            style={{
              padding: '10px 24px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(212,175,55,0.3) 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '13.5px',
              border: '1.5px solid rgba(243, 206, 110, 0.65)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Ikon SVG Kilau (Sparkles) Tajam */}
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F3CE6E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            <span>Nyalakan lagi ✨</span>
          </button>
        )}
      </div>
    </div>
  );
}
