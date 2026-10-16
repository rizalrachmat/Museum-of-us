'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_DATA } from '@/data/letters';
import BirthdayCake from './BirthdayCake';

interface BirthdayViewProps {
  onBack: () => void;
}

export default function BirthdayView({ onBack }: BirthdayViewProps) {
  return (
    <div
      className="birthday-view-container"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      {/* Return Button (Pojok Kanan Atas, Ukuran Sentuh Min 44x44px) */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Kembali ke galeri utama"
        className="birthday-return-button"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          minWidth: '44px',
          minHeight: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1.5px solid rgba(255, 255, 255, 0.45)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 70,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg
          style={{ width: '24px', height: '24px', transform: 'scaleX(-1)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 14l-4-4 4-4" />
          <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
        </svg>
      </button>

      {/* Main Responsive Card Grid (Desktop 23) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="birthday-card-grid"
        style={{
          width: 'min(94vw, 1060px)',
          minHeight: '520px',
          maxHeight: '90dvh',
          background: '#FFFFFF',
          color: '#2A182E',
          borderRadius: '28px',
          boxShadow: '0 30px 80px rgba(18, 8, 32, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          margin: 'auto',
          position: 'relative',
          zIndex: 60,
        }}
      >
        {/* Left Column: Letter / Message Card */}
        <div
          className="birthday-letter-side"
          style={{
            padding: '40px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF5EE 100%)',
            borderRight: '1px solid rgba(112, 88, 163, 0.15)',
            overflowY: 'auto',
          }}
        >
          <div>
            {/* Badge */}
            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(112, 88, 163, 0.12)',
                color: '#7058A3',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              Special Birthday Edition
            </div>

            {/* Title: Exact Text from Figma */}
            <h1
              className="birthday-title"
              style={{
                fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(24px, 3.2vw, 36px)',
                fontWeight: 800,
                color: '#47225D',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                marginBottom: '24px',
              }}
            >
              {BIRTHDAY_DATA.title}
            </h1>

            {/* Letter Content: Exact Text from Prompt */}
            <p
              className="birthday-content"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(15px, 1.4vw, 17px)',
                lineHeight: 1.85,
                color: '#35203A',
                whiteSpace: 'pre-line',
              }}
            >
              {BIRTHDAY_DATA.content}
            </p>
          </div>

          {/* Footer Signature */}
          <div
            style={{
              marginTop: '36px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(112, 88, 163, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#7058A3',
              fontWeight: 600,
            }}
          >
            <span>Museum Of Us</span>
            <span>21st Birthday Milestone</span>
          </div>
        </div>

        {/* Right Column: Custom Animated Birthday Cake */}
        <div
          className="birthday-cake-side"
          style={{
            background: 'linear-gradient(135deg, #2D1B42 0%, #201032 50%, #150824 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Shimmer Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.18,
              backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <BirthdayCake />
        </div>
      </motion.div>
    </div>
  );
}
