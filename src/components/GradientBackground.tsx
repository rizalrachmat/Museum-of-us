'use client';

import React from 'react';
import HeartField from './HeartField';

export default function GradientBackground() {
  return (
    <>
      {/* Lapis A — CSS gradient dasar (dari gradient-untitled.css palette) */}
      <div className="fixed-gradient-bg" aria-hidden="true" />

      {/* Lapis B — Animated heart field */}
      <HeartField />

      {/* Vignette — meredupkan hati di tengah agar bingkai kayu lebih fokus */}
      <div className="heart-vignette" aria-hidden="true" />

      {/* Lapis C — Film grain overlay */}
      <div className="fixed-film-grain" aria-hidden="true" />
    </>
  );
}
