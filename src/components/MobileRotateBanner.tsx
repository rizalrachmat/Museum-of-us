'use client';

import React, { useState, useEffect } from 'react';

export default function MobileRotateBanner() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // If mobile screen and height > width
      const isMobile = window.innerWidth <= 768;
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 mx-4 max-w-md mx-auto bg-[#231238]/95 border border-[#D4AF37]/40 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-center space-x-4 animate-bounce">
      {/* Rotating phone icon */}
      <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center shrink-0 text-2xl">
        📱🔄
      </div>
      <div className="flex-1">
        <p className="text-xs sm:text-sm font-medium leading-snug">
          Miringkan HP ke <strong>mode landscape</strong> untuk melihat museum dalam satu layar penuh!
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="px-2.5 py-1 text-xs rounded-lg bg-white/15 hover:bg-white/25 text-white shrink-0"
      >
        Tutup
      </button>
    </div>
  );
}
