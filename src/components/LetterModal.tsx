'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FrameHotspot } from '@/data/letters';

interface LetterModalProps {
  item: FrameHotspot | null;
  onClose: () => void;
}

export default function LetterModal({ item, onClose }: LetterModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // Aksesibilitas: Kunci scroll body saat modal terbuka dan kembalikan fokus saat ditutup
  useEffect(() => {
    if (item) {
      setIsClosing(false);
      lastActiveElementRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
        if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
          lastActiveElementRef.current.focus();
        }
      };
    }
  }, [item]);

  // Animasi keluar saat ditutup (±200 ms) sebelum dilepas dari DOM
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // Tangani tombol Escape untuk menutup dengan animasi keluar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isClosing]);

  if (!item) return null;

  return (
    <div
      className={`modal-backdrop-layer ${isClosing ? 'modal-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Surat #${item.id}: ${item.title}`}
    >
      {/* Latar Gelap Ungu + Blur: Fade-in 300 ms, Fade-out 200 ms */}
      <div
        className="modal-dark-overlay"
        onClick={handleClose}
      />

      {/* Tombol Tutup ✕ di Pojok Kanan Atas (Min 44x44 px) */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Tutup surat"
        title="Tutup surat (Esc)"
        className="real-return-button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Kartu Surat di Tengah: Animasi Pegas Ringan cubic-bezier(0.34, 1.56, 0.64, 1) */}
      <div
        className="letter-stage-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fallback-cream-card">
          <div className="fallback-card-header">
            {/* 1. Label "SURAT #N" (Stagger 1: 90 ms) */}
            <div className="stagger-item stagger-1">
              <span className="fallback-badge">SURAT #{item.id}</span>
            </div>

            {/* 2. Judul Surat (Stagger 2: 180 ms) */}
            <div className="stagger-item stagger-2">
              <h2 className="fallback-title">{item.title}</h2>
              {item.decorationDescription && (
                <span className="fallback-note-tag">{item.decorationDescription}</span>
              )}
            </div>

            {/* 3. Garis Pemisah (Stagger 3: 270 ms) */}
            <div className="letter-divider stagger-item stagger-3" />
          </div>

          {/* 4. Isi Surat Tampil Penuh dan Jelas (Stagger 4: 360 ms) */}
          <div className="fallback-card-body stagger-item stagger-4">
            <p className="fallback-letter-text">
              {item.text}
            </p>
          </div>

          {/* 5. Footer (Stagger 5: 450 ms) */}
          <div className="fallback-card-footer stagger-item stagger-5">
            {process.env.NODE_ENV === 'development' && (
              <span className="fallback-status-info">
                📝 Surat #{item.id} (Desktop #{item.desktopId})
              </span>
            )}
            <span className="fallback-footer-brand">
              MUSEUM OF US
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
