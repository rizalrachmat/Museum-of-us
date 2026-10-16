'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoadingScreenMounted, setIsLoadingScreenMounted] = useState(true);

  // Debug mode: default OFF for final presentation; ?debug=1 or toggle to enable
  const [debugMode, setDebugMode] = useState(false);

  // Check for ?debug=1 query param on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1') setDebugMode(true);
    }
  }, []);

  // Fade-out loading screen setelah gambar galeri selesai dimuat (±500 ms)
  useEffect(() => {
    if (isImageLoaded) {
      const timer = setTimeout(() => {
        setIsLoadingScreenMounted(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isImageLoaded]);

  // Petunjuk klik otomatis fade-out setelah ±10 detik jika belum ada interaksi
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInteracted(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Klik bingkai surat: buka modal surat dan tandai interaksi pertama
  const handleFrameClick = (frame: FrameHotspot) => {
    setActiveLetter(frame);
    if (!hasInteracted) setHasInteracted(true);
  };

  // Klik kucing: buka tampilan ulang tahun dan tandai interaksi pertama
  const handleCatClick = () => {
    setIsBirthdayPageOpen(true);
    if (!hasInteracted) setHasInteracted(true);
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

          {/* Desktop 1 Clean Image (Next.js Image WebP - Kualitas 80, Priority, Rasio Presisi) */}
          <Image
            src="/assets/desktop-1-clean.webp"
            alt="Museum Of Us - Dinding Galeri Kenangan"
            width={896}
            height={652}
            priority
            quality={80}
            sizes="(max-width: 896px) 100vw, 896px"
            className="gallery-wall-image"
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* 21 Transparent Frame Hotspot Buttons */}
          {GALLERY_FRAMES.map((frame) => (
            <button
              key={frame.id}
              type="button"
              role="button"
              tabIndex={0}
              disabled={!isImageLoaded}
              onClick={() => handleFrameClick(frame)}
              aria-label={`Surat ${frame.id}: ${frame.title}`}
              style={{
                left: frame.coords.left,
                top: frame.coords.top,
                width: frame.coords.width,
                height: frame.coords.height,
                borderRadius: frame.shape === 'oval' ? '50%' : '6px',
              }}
              className={`hotspot-button ${!hasInteracted ? 'hotspot-pulse' : ''} ${debugMode ? 'debug-active' : ''}`}
            >
              {debugMode && (
                <span className="debug-label">#{frame.id}</span>
              )}
            </button>
          ))}

          {/* Cat Hotspot Button (Navigates to Desktop 23) */}
          <button
            type="button"
            role="button"
            tabIndex={0}
            disabled={!isImageLoaded}
            onClick={handleCatClick}
            aria-label="Kucing Ulang Tahun - Buka Surat Ulang Tahun Jiaa"
            style={{
              left: CAT_HOTSPOT.coords.left,
              top: CAT_HOTSPOT.coords.top,
              width: CAT_HOTSPOT.coords.width,
              height: CAT_HOTSPOT.coords.height,
            }}
            className={`cat-hotspot-button ${!hasInteracted ? 'cat-pulse' : ''} ${debugMode ? 'debug-active' : ''}`}
          >
            {debugMode && (
              <span className="debug-label" style={{ background: '#9333EA' }}>🐱 23</span>
            )}
          </button>

          {/* Hint Pill — bottom left to avoid cat in center-bottom */}
          <span className={`hint-pill ${hasInteracted ? 'hint-hidden' : ''}`}>
            klik bingkai untuk membuka surat • klik kucing untuk kejutan ulang tahun
          </span>
        </div>
      )}

      {/* Layar Loading Sederhana (TUGAS 1) — Menutup layar sampai gambar galeri selesai dimuat */}
      {isLoadingScreenMounted && (
        <div
          className={`loading-screen ${isImageLoaded ? 'loading-screen-fade' : ''}`}
          aria-live="polite"
          aria-busy={!isImageLoaded}
        >
          <div className="loading-content">
            <p className="loading-text">
              menyiapkan museum, sabar ya sayangg{' '}
              <span className="loading-heart" aria-hidden="true">♥</span>
            </p>
          </div>
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
