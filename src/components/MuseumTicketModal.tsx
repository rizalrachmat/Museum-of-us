'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * =======================================================================
 * KONSTANTA TEKS STEMPEL & PESAN KUCING (Dapat diganti di sini)
 * =======================================================================
 */
export const STAMP_TEXT = 'VALID ♥';
export const WELCOME_MESSAGE = 'Selamat datang! Jangan lupa klik semua bingkai ya ♥';

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

/**
 * =======================================================================
 * DATA HIASAN BERANIMASI LATAR BELAKANG TIKET (Statis & Bebas Mismatch)
 * =======================================================================
 */

// 1. Hati Melayang (Terkonsentrasi di Sisi Kiri & Kanan Layar)
const TICKET_FLOATING_HEARTS = [
  // Sisi Kiri (left: 4% - 24%)
  { left: '4%', size: 20, duration: 14, delay: 0, drift: 18, color: '#F3CE6E', opacity: 0.28 },
  { left: '10%', size: 14, duration: 18, delay: 3, drift: -15, color: '#D8BFD8', opacity: 0.35 },
  { left: '18%', size: 24, duration: 12, delay: 1.5, drift: 22, color: '#F3CE6E', opacity: 0.22 },
  { left: '7%', size: 16, duration: 20, delay: 5, drift: -18, color: '#E6E6FA', opacity: 0.3 },
  { left: '22%', size: 13, duration: 16, delay: 7, drift: 15, color: '#D4AF37', opacity: 0.25, desktopOnly: true },
  { left: '13%', size: 26, duration: 22, delay: 9, drift: -24, color: '#D8BFD8', opacity: 0.18, desktopOnly: true },

  // Sisi Kanan (left: 77% - 96%)
  { left: '78%', size: 22, duration: 15, delay: 1, drift: -20, color: '#F3CE6E', opacity: 0.3 },
  { left: '85%', size: 15, duration: 19, delay: 4, drift: 18, color: '#E6E6FA', opacity: 0.32 },
  { left: '92%', size: 26, duration: 13, delay: 2, drift: -22, color: '#D4AF37', opacity: 0.2 },
  { left: '82%', size: 12, duration: 21, delay: 6, drift: 16, color: '#D8BFD8', opacity: 0.35 },
  { left: '88%', size: 18, duration: 17, delay: 8, drift: -18, color: '#F3CE6E', opacity: 0.28, desktopOnly: true },
  { left: '95%', size: 24, duration: 22, delay: 10, drift: 24, color: '#E6E6FA', opacity: 0.18, desktopOnly: true },
];

// 2. Kilau Bintang 4 Sudut (Tersebar di Pinggir dan Sudut Layar)
const TICKET_STARS = [
  // Pinggir & Sudut Kiri
  { top: '9%', left: '8%', size: 14, duration: 3.2, delay: 0 },
  { top: '24%', left: '15%', size: 18, duration: 4.0, delay: 1.2 },
  { top: '44%', left: '6%', size: 12, duration: 2.8, delay: 0.5 },
  { top: '65%', left: '12%', size: 16, duration: 3.6, delay: 2.1 },
  { top: '84%', left: '7%', size: 15, duration: 3.0, delay: 1.5 },
  { top: '32%', left: '4%', size: 11, duration: 3.4, delay: 2.8, desktopOnly: true },
  { top: '76%', left: '18%', size: 13, duration: 4.2, delay: 0.8, desktopOnly: true },

  // Pinggir & Sudut Kanan
  { top: '10%', left: '90%', size: 16, duration: 3.5, delay: 0.3 },
  { top: '26%', left: '83%', size: 13, duration: 2.9, delay: 1.8 },
  { top: '48%', left: '93%', size: 17, duration: 4.1, delay: 0.9 },
  { top: '68%', left: '86%', size: 14, duration: 3.3, delay: 2.4 },
  { top: '87%', left: '91%', size: 15, duration: 3.8, delay: 1.1 },
  { top: '18%', left: '94%', size: 12, duration: 3.1, delay: 1.6, desktopOnly: true },
  { top: '79%', left: '82%', size: 14, duration: 3.7, delay: 2.7, desktopOnly: true },
];

// 5. Siluet Bingkai Museum Melayang di Pinggir Kiri & Kanan (Desktop Only)
const TICKET_FRAMES = [
  { top: '18%', left: '5%', size: 48, rot: -6, duration: 7.5, delay: 0, shape: 'rect' as const },
  { top: '46%', left: '4%', size: 44, rot: 5, duration: 8.5, delay: 1.5, shape: 'oval' as const },
  { top: '72%', left: '8%', size: 52, rot: -4, duration: 9.0, delay: 0.8, shape: 'rect' as const },
  { top: '22%', left: '88%', size: 50, rot: 6, duration: 8.0, delay: 1.0, shape: 'oval' as const },
  { top: '68%', left: '86%', size: 46, rot: -5, duration: 7.8, delay: 2.0, shape: 'rect' as const },
];

/**
 * Ornamen Sudut Garis Emas Vintage (SVG Inline)
 */
function CornerOrnament({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const getStyle = (): React.CSSProperties => {
    switch (position) {
      case 'top-left':
        return { top: '16px', left: '16px' };
      case 'top-right':
        return { top: '16px', right: '16px', transform: 'scaleX(-1)' };
      case 'bottom-left':
        return { bottom: '16px', left: '16px', transform: 'scaleY(-1)' };
      case 'bottom-right':
        return { bottom: '16px', right: '16px', transform: 'scale(-1, -1)' };
    }
  };

  return (
    <div
      className={`ticket-corner-ornament ticket-corner-${position}`}
      style={getStyle()}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 74 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="corner-drawn-path"
          d="M4 70 V 22 C 4 12, 12 4, 22 4 H 70"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="corner-drawn-path"
          d="M12 70 V 28 C 12 19, 19 12, 28 12 H 70"
          stroke="#F3CE6E"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.65"
        />
        <circle cx="22" cy="22" r="3" fill="#D4AF37" opacity="0.8" />
        <path
          className="corner-drawn-path"
          d="M5 5 L15 15"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Kucing Penyambut Bertopi Pesta Ulang Tahun (SVG Vektor Tajam)
 */
function WelcomingPartyCat() {
  return (
    <svg
      className="ticket-cat-svg"
      width="96"
      height="86"
      viewBox="0 0 92 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bayangan Bawah Cakar */}
      <ellipse cx="46" cy="78" rx="30" ry="4" fill="rgba(20, 8, 30, 0.28)" />

      {/* Topi Pesta Ulang Tahun (Party Cone Hat) */}
      <g transform="translate(43, 6) rotate(8)">
        <polygon points="12,0 0,34 24,34" fill="#6A478D" />
        <path d="M4 28 Q12 25 20 28" stroke="#F3CE6E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 18 Q12 15 17 18" stroke="#F3CE6E" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 9 Q12 7 15 9" stroke="#F3CE6E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="-1" r="4" fill="#FFD700" />
        <circle cx="12" cy="-1" r="2.5" fill="#FFF4D0" />
      </g>

      {/* Telinga Kiri */}
      <polygon points="18,36 10,14 32,24" fill="#FFB074" />
      <polygon points="19,33 13,18 29,24" fill="#FFAAA6" />

      {/* Telinga Kanan */}
      <polygon points="74,36 82,14 60,24" fill="#FFB074" />
      <polygon points="73,33 79,18 63,24" fill="#FFAAA6" />

      {/* Kepala Kucing Bulat Imut */}
      <ellipse cx="46" cy="46" rx="36" ry="30" fill="#FFB074" />
      {/* Pipi & Moncong Krem Cerah */}
      <ellipse cx="46" cy="52" rx="26" ry="18" fill="#FFF3E0" />

      {/* Mata Kiri Berbinar */}
      <ellipse cx="32" cy="42" rx="5" ry="6.5" fill="#241030" />
      <circle cx="30.5" cy="40" r="2.2" fill="#FFFFFF" />
      <circle cx="33.5" cy="44.5" r="1.1" fill="#FFFFFF" />

      {/* Mata Kanan Berbinar */}
      <ellipse cx="60" cy="42" rx="5" ry="6.5" fill="#241030" />
      <circle cx="58.5" cy="40" r="2.2" fill="#FFFFFF" />
      <circle cx="61.5" cy="44.5" r="1.1" fill="#FFFFFF" />

      {/* Pipi Merona (Blush Pink) */}
      <ellipse cx="23" cy="50" rx="4.5" ry="3" fill="rgba(255, 130, 150, 0.45)" />
      <ellipse cx="69" cy="50" rx="4.5" ry="3" fill="rgba(255, 130, 150, 0.45)" />

      {/* Hidung Segitiga Pink Lucu */}
      <polygon points="46,47 43.5,44 48.5,44" fill="#E86A82" />

      {/* Mulut Melengkung Imut (ω) */}
      <path d="M42 49 Q44 52 46 49 Q48 52 50 49" stroke="#4A2035" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Kumis Kiri */}
      <line x1="14" y1="46" x2="26" y2="48" stroke="#4A2035" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      <line x1="13" y1="52" x2="25" y2="52" stroke="#4A2035" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      <line x1="15" y1="58" x2="27" y2="56" stroke="#4A2035" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />

      {/* Kumis Kanan */}
      <line x1="78" y1="46" x2="66" y2="48" stroke="#4A2035" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      <line x1="79" y1="52" x2="67" y2="52" stroke="#4A2035" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      <line x1="77" y1="58" x2="65" y2="56" stroke="#4A2035" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />

      {/* Dua Cakar Depan Kecil Bersandar di Tepi Atas Tiket */}
      <ellipse cx="32" cy="74" rx="7.5" ry="6" fill="#FFF3E0" stroke="#FFB074" strokeWidth="1.5" />
      <ellipse cx="60" cy="74" rx="7.5" ry="6" fill="#FFF3E0" stroke="#FFB074" strokeWidth="1.5" />
      <line x1="30" y1="73" x2="30" y2="76" stroke="#FFB074" strokeWidth="1" strokeLinecap="round" />
      <line x1="34" y1="73" x2="34" y2="76" stroke="#FFB074" strokeWidth="1" strokeLinecap="round" />
      <line x1="58" y1="73" x2="58" y2="76" stroke="#FFB074" strokeWidth="1" strokeLinecap="round" />
      <line x1="62" y1="73" x2="62" y2="76" stroke="#FFB074" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

interface MuseumTicketModalProps {
  isImageLoaded: boolean;
  onEnter: () => void;
}

export default function MuseumTicketModal({
  isImageLoaded,
  onEnter,
}: MuseumTicketModalProps) {
  // Alur Rangkaian Animasi:
  // idle -> stamping -> tearing -> curtains-opening -> done
  const [animStage, setAnimStage] = useState<'idle' | 'stamping' | 'tearing' | 'curtains-opening' | 'done'>('idle');
  const [isShaking, setIsShaking] = useState(false);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  // Bersihkan semua timer saat unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // Otomatis fokus ke tombol "Masuk" saat gambar galeri telah selesai dimuat
  useEffect(() => {
    if (isImageLoaded && enterButtonRef.current && animStage === 'idle') {
      enterButtonRef.current.focus();
    }
  }, [isImageLoaded, animStage]);

  // Cek apakah user mengaktifkan prefers-reduced-motion
  const isReducedMotion = () => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Klik Tombol "Masuk Museum"
   * Urutan Rangkaian:
   * 1. Stempel "VALID ♥" (±300 ms) + tiket bergetar sedikit
   * 2. Jeda ±350 ms
   * 3. Sobek tiket terbelah dua di garis putus-putus emas (±700 ms)
   * 4. Tirai beludru membuka ke samping kiri & kanan (±1100 ms)
   * 5. Selesai -> onEnter() dipanggil
   */
  const handleEnterClick = () => {
    if (!isImageLoaded || animStage !== 'idle') return;

    if (isReducedMotion()) {
      setAnimStage('stamping');
      addTimer(() => {
        setAnimStage('curtains-opening');
        addTimer(() => {
          onEnter();
        }, 300);
      }, 300);
      return;
    }

    // 1. Stempel cap "VALID ♥"
    setAnimStage('stamping');
    setIsShaking(true);
    addTimer(() => setIsShaking(false), 160);

    // 2. Jeda ±350 ms setelah stempel selesai (300 ms + 350 ms = 650 ms)
    addTimer(() => {
      // 3. Sobek tiket (durasi ±700 ms)
      setAnimStage('tearing');
    }, 650);

    // 4. Setelah sobek selesai (650 ms + 700 ms = 1350 ms), buka tirai panggung
    addTimer(() => {
      setAnimStage('curtains-opening');
    }, 1350);

    // 5. Setelah tirai selesai membuka penuh (1350 ms + 1100 ms = 2450 ms), panggil onEnter
    addTimer(() => {
      setAnimStage('done');
      onEnter();
    }, 2450);
  };

  const isButtonDisabled = !isImageLoaded || animStage !== 'idle';
  const isCurtainsOpen = animStage === 'curtains-opening' || animStage === 'done';
  const isTorn = animStage === 'tearing' || animStage === 'curtains-opening' || animStage === 'done';
  const showStamp = animStage !== 'idle';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${TICKET_TEXT_CONFIG.title} - ${TICKET_TEXT_CONFIG.header}`}
      className={`ticket-backdrop-layer ${isCurtainsOpen ? 'ticket-backdrop-exit' : ''}`}
    >
      {/* ========================================================
          1. TIRAI PANGGUNG BELUDRU (PANEL KIRI & KANAN)
          ======================================================== */}
      <div className="ticket-curtains-container" aria-hidden="true">
        {/* Panel Kiri (Membuka ke Kiri translateX(-100%)) */}
        <div className={`ticket-curtain-panel ticket-curtain-left ${isCurtainsOpen ? 'ticket-curtain-open' : ''}`}>
          <div className="ticket-curtain-edge-gold" />
        </div>

        {/* Panel Kanan (Membuka ke Kanan translateX(100%)) */}
        <div className={`ticket-curtain-panel ticket-curtain-right ${isCurtainsOpen ? 'ticket-curtain-open' : ''}`}>
          <div className="ticket-curtain-edge-gold" />
        </div>
      </div>

      {/* Pattern Hati Latar Belakang Samar */}
      <div className="ticket-backdrop-heart-pattern" aria-hidden="true" />

      {/* ========================================================
          LAPISAN HIASAN BERANIMASI DI LATAR BELAKANG TIKET
          ======================================================== */}
      <div className={`ticket-decor-layer ${isCurtainsOpen ? 'ticket-backdrop-exit' : ''}`} aria-hidden="true">
        {/* 3. Sinar Lampu Galeri / Museum Spotlight (Kiri Atas & Kanan Atas) */}
        <div className="ticket-spotlight ticket-spotlight-left" />
        <div className="ticket-spotlight ticket-spotlight-right" />

        {/* 4. Ornamen Sudut Emas Vintage di 4 Sudut Layar */}
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* 5. Siluet Bingkai Museum Melayang (Sisi Kiri & Kanan) */}
        {TICKET_FRAMES.map((f, i) => (
          <div
            key={i}
            className="ticket-silhouette-frame"
            style={
              {
                top: f.top,
                left: f.left,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                '--rot': `${f.rot}deg`,
              } as React.CSSProperties
            }
          >
            {f.shape === 'rect' ? (
              <svg width={f.size} height={f.size * 1.3} viewBox="0 0 50 65" fill="none">
                <rect x="2" y="2" width="46" height="61" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2.5" />
                <rect x="6" y="6" width="38" height="53" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              </svg>
            ) : (
              <svg width={f.size} height={f.size * 1.25} viewBox="0 0 50 62" fill="none">
                <ellipse cx="25" cy="31" rx="22" ry="28" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="25" cy="31" rx="17" ry="23" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              </svg>
            )}
          </div>
        ))}

        {/* 1. Hati Melayang di Latar Belakang (Sisi Kiri & Kanan) */}
        {TICKET_FLOATING_HEARTS.map((h, i) => (
          <span
            key={i}
            className={`ticket-floating-heart ${h.desktopOnly ? 'ticket-decor-desktop-only' : ''}`}
            style={
              {
                left: h.left,
                fontSize: `${h.size}px`,
                color: h.color,
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                '--target-opacity': h.opacity,
                '--drift-x': `${h.drift}px`,
              } as React.CSSProperties
            }
          >
            ♥
          </span>
        ))}

        {/* 2. Kilau Bintang 4 Sudut (Twinkling Stars) */}
        {TICKET_STARS.map((s, i) => (
          <span
            key={i}
            className={`ticket-star-sparkle ${s.desktopOnly ? 'ticket-decor-desktop-only' : ''}`}
            style={
              {
                top: s.top,
                left: s.left,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
          </span>
        ))}
      </div>

      {/* ========================================================
          KARTU UTAMA TIKET MASUK + KUCING PENYAMBUT
          ======================================================== */}
      <div className="ticket-modal-wrapper">
        <div className="ticket-card-box">
          {/* ========================================================
              4. KUCING PENYAMBUT BERTENGGER & GELEMBUNG UCAPAN
              (Diletakkan di luar elemen overflow: hidden kartu tiket)
              ======================================================== */}
          <div className={`ticket-cat-anchor ${isTorn ? 'ticket-cat-exit' : ''}`}>
            {/* Gelembung Ucapan di Sebelah Kiri Kucing, di Atas Tiket */}
            <div className="ticket-speech-bubble" aria-hidden="true">
              <span>{WELCOME_MESSAGE}</span>
            </div>

            {/* Kucing SVG Bertopi Pesta (Duduk di Tepi Atas Tiket, Sedikit ke Kanan) */}
            <div className="ticket-cat-idle">
              <WelcomingPartyCat />
            </div>
          </div>

          <div
            className={`ticket-vintage-card ticket-vintage-card-enter ${isShaking ? 'ticket-shaking' : ''}`}
          >
            {/* Efek Kilau Cahaya yang Melintas Sekali */}
            <div className="ticket-shimmer-sweep" aria-hidden="true" />

          {/* Hiasan Ikon Hati di Sudut Kanan Atas */}
          <div className="ticket-corner-heart" aria-hidden="true">
            ♥
          </div>

          {/* ========================================================
              2. STEMPEL "VALID ♥" (CAP UNGU TUA SAAT KLIK)
              ======================================================== */}
          {showStamp && (
            <div className="ticket-stamp-seal" aria-hidden="true">
              <span>{STAMP_TEXT}</span>
            </div>
          )}

          {/* ========================================================
              2.c SOBEK TIKET (BAGIAN ATAS & BAGIAN BAWAH)
              ======================================================== */}
          <div className="ticket-split-wrapper">
            {/* BAGIAN ATAS TIKET */}
            <div className={`ticket-half-top ${isTorn ? 'ticket-torn-top' : ''}`}>
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
            </div>

            {/* BAGIAN BAWAH TIKET (STUB) */}
            <div className={`ticket-half-bottom ${isTorn ? 'ticket-torn-bottom' : ''}`}>
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
                    disabled={isButtonDisabled}
                    aria-label={TICKET_TEXT_CONFIG.buttonAriaLabel}
                    className={`ticket-enter-button ${
                      isImageLoaded && animStage === 'idle'
                        ? 'ticket-enter-button-ready'
                        : 'ticket-enter-button-disabled'
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
          </div>
        </div>
      </div>

      {/* TULISAN LOADING DI BAWAH TIKET (Aktif sampai gambar galeri selesai dimuat) */}
        <div
          className={`ticket-loading-footer ${
            isImageLoaded || animStage !== 'idle' ? 'ticket-loading-footer-hidden' : ''
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
