'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FrameHotspot } from '@/data/letters';

interface LetterModalProps {
  item: FrameHotspot | null;
  onClose: () => void;
}

export default function LetterModal({ item, onClose }: LetterModalProps) {
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Reset imgError when item changes
  useEffect(() => {
    setImgError(false);
  }, [item]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const numStr = item.desktopId < 10 ? `0${item.desktopId}` : `${item.desktopId}`;
  const letterImgSrc = `/letters/letter-${numStr}.png`;

  return (
    <AnimatePresence>
      <div 
        className="modal-backdrop-layer"
        role="dialog"
        aria-modal="true"
        aria-label={`Surat #${item.id}: ${item.title}`}
      >
        {/* Dark Semi-transparent Overlay (Galeri hidup tetap terlihat samar di belakang) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="modal-dark-overlay"
        />

        {/* Real HTML Return Button (Pojok Kanan Atas, Ukuran Sentuh Minimal 44x44px) */}
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-label="Kembali ke galeri utama (Tutup popup)"
          className="real-return-button"
        >
          {/* White SVG Curved Back Arrow ↩ */}
          <svg
            className="return-icon-svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 14l-4-4 4-4" />
            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
          </svg>
        </motion.button>

        {/* Letter Container (Naik dari bawah dengan skala 0.85 -> 1 dan sedikit rotasi) */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 60, scale: 0.85, rotate: -2 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1, rotate: 0 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 45, scale: 0.88, rotate: 1.5 }
          }
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 270,
            duration: 0.45
          }}
          className="letter-stage-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          {!imgError ? (
            /* 1. Tampilan Gambar PNG Transparan dari refrensi media/letters/letter-NN.png */
            <div className="letter-image-container">
              <img
                src={letterImgSrc}
                alt={item.text}
                className="letter-transparent-png"
                onError={() => {
                  // Fallback ke kartu krem jika file belum ada
                  setImgError(true);
                }}
              />
            </div>
          ) : (
            /* 2. Fallback Elegan: Kartu Kertas Krem Berisi Teks Surat */
            <div className="fallback-cream-card">
              <div className="fallback-card-header">
                <div>
                  <span className="fallback-badge">Surat #{item.id}</span>
                  <h2 className="fallback-title">{item.title}</h2>
                </div>
                <span className="fallback-note-tag">
                  {item.decorationDescription}
                </span>
              </div>

              <div className="fallback-card-body">
                <p className="fallback-letter-text">
                  {item.text}
                </p>
              </div>

              <div className="fallback-card-footer">
                <span className="fallback-status-info">
                  📝 Menampilkan teks surat (menunggu <code>letter-{numStr}.png</code>)
                </span>
                <span className="fallback-footer-brand">Museum Of Us</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
