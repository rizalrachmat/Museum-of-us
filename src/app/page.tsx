'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_FRAMES, CAT_HOTSPOT, FrameHotspot } from '@/data/letters';
import LetterModal from '@/components/LetterModal';
import BirthdayView from '@/components/BirthdayView';
import MobileRotateBanner from '@/components/MobileRotateBanner';

/* Gold museum title: letters enter staggered then settle into razor-sharp text with shimmer */
function AnimatedTitle({ text }: { text: string }) {
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimDone(true);
      return;
    }
    // 12 letters * 45ms stagger + 600ms = ~1140ms. At 1250ms, all letters are fully in place.
    const timer = setTimeout(() => {
      setAnimDone(true);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className="museum-title">
      <span className="title-sparkle sparkle-left" aria-hidden="true">✦</span>
      {animDone ? (
        <span className="museum-title-text">{text}</span>
      ) : (
        text.split('').map((ch, i) => (
          <span
            key={i}
            className="museum-letter"
            style={{ '--i': i } as React.CSSProperties}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))
      )}
      <span className="title-sparkle sparkle-right" aria-hidden="true">✦</span>
    </h1>
  );
}

export default function MuseumOfUsPage() {
  const [activeLetter, setActiveLetter] = useState<FrameHotspot | null>(null);
  const [isBirthdayPageOpen, setIsBirthdayPageOpen] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);
  
  // Debug mode: default OFF for final presentation; ?debug=1 or toggle to enable
  const [debugMode, setDebugMode] = useState(false);

  // Check for ?debug=1 query param on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1') setDebugMode(true);
    }
  }, []);

  // Hide hint pill after first frame click
  const handleFrameClick = (frame: FrameHotspot) => {
    setActiveLetter(frame);
    if (!hintHidden) setHintHidden(true);
  };

  return (
    <main className="app-viewport">

      {/* Mobile Orientation Suggestion Banner */}
      <MobileRotateBanner />

      {/* View Switch: Birthday Desktop 23 vs Gallery Desktop 1 */}
      {isBirthdayPageOpen ? (
        <BirthdayView onBack={() => setIsBirthdayPageOpen(false)} />
      ) : (
        <div className="gallery-stage">
          
          {/* Museum Title — Single sharp gold nameplate */}
          <div className="museum-title-wrap">
            <div className="museum-title-pill">
              {/* Dark frosted pill backdrop (z-index 1, placed behind text) */}
              <div className="museum-title-pill-bg" aria-hidden="true" />

              {/* Title Content & Ornaments (z-index 2, not inside blur/filter element) */}
              <div className="museum-title-content">
                {/* Left ornament */}
                <span className="title-ornament title-ornament-left" aria-hidden="true">
                  <span className="title-heart">♥</span>
                  <span className="title-ornament-line" />
                </span>

                <AnimatedTitle text="Museum Of Us" />

                {/* Right ornament */}
                <span className="title-ornament title-ornament-right" aria-hidden="true">
                  <span className="title-ornament-line" />
                  <span className="title-heart">♥</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop 1 Clean Image */}
          <img
            src="/assets/desktop-1-clean.png"
            alt="Gallery Wall"
            className="gallery-wall-image"
          />

          {/* 21 Transparent Frame Hotspot Buttons */}
          {GALLERY_FRAMES.map((frame) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => handleFrameClick(frame)}
              aria-label={`Surat ${frame.id}: ${frame.title}`}
              style={{
                left: frame.coords.left,
                top: frame.coords.top,
                width: frame.coords.width,
                height: frame.coords.height,
                borderRadius: frame.shape === 'oval' ? '50%' : '6px',
              }}
              className={`hotspot-button ${debugMode ? 'debug-active' : ''}`}
            >
              {debugMode && (
                <span className="debug-label">#{frame.id}</span>
              )}
            </button>
          ))}

          {/* Cat Hotspot Button (Navigates to Desktop 23) */}
          <button
            type="button"
            onClick={() => setIsBirthdayPageOpen(true)}
            aria-label="Kucing Ulang Tahun - Buka Surat Ulang Tahun Jiaa"
            style={{
              left: CAT_HOTSPOT.coords.left,
              top: CAT_HOTSPOT.coords.top,
              width: CAT_HOTSPOT.coords.width,
              height: CAT_HOTSPOT.coords.height,
            }}
            className={`cat-hotspot-button ${debugMode ? 'debug-active' : ''}`}
          >
            {debugMode && (
              <span className="debug-label" style={{ background: '#9333EA' }}>🐱 23</span>
            )}
          </button>

          {/* Hint Pill — bottom left to avoid cat in center-bottom */}
          <span className={`hint-pill ${hintHidden ? 'hint-hidden' : ''}`}>
            klik bingkai untuk membuka surat • klik kucing untuk kejutan ulang tahun
          </span>
        </div>
      )}

      {/* Floating Debug Toggle (default off; ?debug=1 or button to enable) */}
      <button
        type="button"
        onClick={() => setDebugMode(!debugMode)}
        className="debug-switch-toggle"
        title="Klik untuk menyalakan/mematikan outline merah area klik"
      >
        {debugMode ? '🔴 Debug Outline: AKTIF' : '⚪ Debug Outline: MATI'}
      </button>

      {/* Letter Modal (Desktop 2..22) */}
      <LetterModal
        item={activeLetter}
        onClose={() => setActiveLetter(null)}
      />

    </main>
  );
}
