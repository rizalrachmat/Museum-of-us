'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * =======================================================================
 * KONSTANTA TEKS TIKET MASUK (Dapat diubah di sini)
 * =======================================================================
 */
export const TICKET_TEXT_CONFIG = {
  header: 'MUSEUM OF US',
  title: 'Tiket Masuk',
  subtitle: '1 orang istimewa',
  ticketNumber: 'No. 0021',
  loadingText: 'menyiapkan museum, sabar ya sayangg',
  buttonText: 'Masuk Museum',
  buttonAriaLabel: 'Masuk ke galeri Museum Of Us',
};

interface MuseumTicketModalProps {
  isImageLoaded: boolean;
  onEnter: () => void;
}

export default function MuseumTicketModal({
  isImageLoaded,
  onEnter,
}: MuseumTicketModalProps) {
  const [isDismissing, setIsDismissing] = useState(false);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  // Otomatis fokus ke tombol "Masuk" saat gambar galeri telah selesai dimuat
  useEffect(() => {
    if (isImageLoaded && enterButtonRef.current) {
      enterButtonRef.current.focus();
    }
  }, [isImageLoaded]);

  const handleEnterClick = () => {
    if (!isImageLoaded || isDismissing) return;
    setIsDismissing(true);

    // Animasi keluar tiket (±600 ms) sebelum callback onEnter dipanggil
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${TICKET_TEXT_CONFIG.title} - ${TICKET_TEXT_CONFIG.header}`}
      className={`ticket-backdrop-layer ${isDismissing ? 'ticket-backdrop-exit' : ''}`}
    >
      {/* Pattern Hati Latar Belakang Samar */}
      <div className="ticket-backdrop-heart-pattern" aria-hidden="true" />

      {/* Kontainer Utama Tiket */}
      <div className="ticket-modal-wrapper">
        <div
          className={`ticket-vintage-card ${
            isDismissing ? 'ticket-vintage-card-exit' : 'ticket-vintage-card-enter'
          }`}
        >
          {/* Efek Kilau Cahaya yang Melintas Sekali */}
          <div className="ticket-shimmer-sweep" aria-hidden="true" />

          {/* Hiasan Ikon Hati di Sudut Kanan Atas */}
          <div className="ticket-corner-heart" aria-hidden="true">
            ♥
          </div>

          {/* BAGIAN UTAMA TIKET */}
          <div className="ticket-main-section">
            {/* Header: MUSEUM OF US */}
            <div
              className="ticket-stagger-item"
              style={{ '--stagger': 0 } as React.CSSProperties}
            >
              <span className="ticket-brand-header">
                {TICKET_TEXT_CONFIG.header}
              </span>
            </div>

            {/* Judul Utama: Tiket Masuk */}
            <div
              className="ticket-stagger-item"
              style={{ '--stagger': 1 } as React.CSSProperties}
            >
              <h1 className="ticket-main-title">
                {TICKET_TEXT_CONFIG.title}
              </h1>
            </div>

            {/* Subjudul Miring Emas: 1 orang istimewa */}
            <div
              className="ticket-stagger-item"
              style={{ '--stagger': 2 } as React.CSSProperties}
            >
              <p className="ticket-subtitle-gold">
                {TICKET_TEXT_CONFIG.subtitle}
              </p>
            </div>
          </div>

          {/* GARIS PERFORASI VINTAGE (GIGI SETENGAH LINGKARAN & PUTUS-PUTUS EMAS) */}
          <div className="ticket-perforation-divider" aria-hidden="true">
            <span className="ticket-perforation-notch notch-left" />
            <span className="ticket-dashed-line" />
            <span className="ticket-perforation-notch notch-right" />
          </div>

          {/* BAGIAN BAWAH / SOBEKAN TIKET (STUB) */}
          <div className="ticket-stub-section">
            <div
              className="ticket-stub-meta ticket-stagger-item"
              style={{ '--stagger': 4 } as React.CSSProperties}
            >
              {/* Nomor Tiket */}
              <span className="ticket-number-tag">
                {TICKET_TEXT_CONFIG.ticketNumber}
              </span>

              {/* Barcode Dekoratif Vintage */}
              <div className="ticket-barcode-lines" aria-hidden="true">
                {[2, 1, 3, 1, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
                  <span
                    key={i}
                    style={{
                      width: `${w}px`,
                      height: '24px',
                      backgroundColor: '#52345E',
                      display: 'inline-block',
                      marginRight: i % 4 === 0 ? '3px' : '1.5px',
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* TOMBOL MASUK */}
            <div
              className="ticket-stagger-item"
              style={{ '--stagger': 5, width: '100%' } as React.CSSProperties}
            >
              <button
                ref={enterButtonRef}
                type="button"
                onClick={handleEnterClick}
                disabled={!isImageLoaded || isDismissing}
                aria-label={TICKET_TEXT_CONFIG.buttonAriaLabel}
                className={`ticket-enter-button ${
                  isImageLoaded ? 'ticket-enter-button-ready' : 'ticket-enter-button-disabled'
                }`}
              >
                <span>{TICKET_TEXT_CONFIG.buttonText}</span>
                <span className="ticket-enter-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* TULISAN LOADING DI BAWAH TIKET (Aktif sampai gambar galeri selesai dimuat) */}
        <div
          className={`ticket-loading-footer ${
            isImageLoaded ? 'ticket-loading-footer-hidden' : ''
          }`}
          aria-live="polite"
          aria-busy={!isImageLoaded}
        >
          <p className="ticket-loading-message">
            {TICKET_TEXT_CONFIG.loadingText}{' '}
            <span className="ticket-loading-heart" aria-hidden="true">
              ♥
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
