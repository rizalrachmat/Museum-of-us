'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const triggerBlowCandles = () => {
    setCandlesBlown(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#9370DB', '#BA55D3', '#E6E6FA', '#FFB6C1', '#FFD700']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const relightCandles = () => {
    setCandlesBlown(false);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Cake Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '340px',
        padding: '12px 0'
      }}>
        
        {/* Glow Behind Cake */}
        <div style={{
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(147,112,219,0.2) 70%, transparent 100%)',
          filter: 'blur(30px)',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Candles on Top */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '4px',
          zIndex: 10
        }}>
          {[0, 1, 2].map((idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {!candlesBlown ? (
                <div
                  className="cake-flame"
                  style={{
                    width: '14px',
                    height: '22px',
                    borderRadius: '50% 50% 35% 35%',
                    marginBottom: '2px',
                    background: 'radial-gradient(ellipse at bottom, #FFF7C2 0%, #FFA726 50%, #FF5722 90%)',
                    boxShadow: '0 0 12px #FFB300, 0 0 20px rgba(255, 179, 0, 0.6)',
                  }}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0.8, y: 0 }}
                  animate={{ opacity: 0, y: -16, scale: 1.5 }}
                  transition={{ duration: 1.2 }}
                  style={{
                    width: '8px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.4)',
                    marginBottom: '4px',
                    filter: 'blur(1px)'
                  }}
                />
              )}

              {/* Wick */}
              <div style={{ width: '2px', height: '6px', background: '#333' }} />

              {/* Candle Body */}
              <div style={{
                width: '14px',
                height: '46px',
                borderRadius: '2px 2px 0 0',
                background: 'linear-gradient(to right, #FAF0E6 0%, #E6E6FA 50%, #D8BFD8 100%)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(147,112,219,0.35) 0, rgba(147,112,219,0.35) 2px, transparent 0, transparent 6px)'
              }} />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top Tier) */}
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
            zIndex: 3
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '14px',
            background: '#7A5A9E',
            borderRadius: '0 0 10px 10px',
            opacity: 0.95
          }} />
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 800,
            fontSize: '13px',
            color: '#553075',
            letterSpacing: '0.12em',
            zIndex: 2,
            marginTop: '6px'
          }}>
            21 TAHUN
          </span>
        </motion.div>

        {/* Cake Tier 2 (Middle Tier) */}
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
            zIndex: 2
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            background: '#FAF6EE',
            borderRadius: '0 0 8px 8px',
            opacity: 0.95
          }} />
          <div style={{
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
            padding: '0 6px'
          }}>
            <span style={{ fontSize: '10px', opacity: 0.85 }}>✨</span>
            <span style={{ whiteSpace: 'nowrap' }}>Putri Octafia Ramadani</span>
            <span style={{ fontSize: '10px', opacity: 0.85 }}>✨</span>
          </div>
        </motion.div>

        {/* Cake Tier 3 (Bottom Tier) */}
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
            zIndex: 1
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '15px',
            background: '#6A478D',
            borderRadius: '0 0 10px 10px',
            opacity: 0.95
          }} />
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: '#4A2B6B',
            textAlign: 'center',
            padding: '0 12px',
            marginTop: '8px'
          }}>
            Happy Birthday to My Special One
          </div>
        </motion.div>

        {/* Cake Stand / Platter */}
        <div style={{
          width: '300px',
          height: '12px',
          borderRadius: '20px',
          background: 'linear-gradient(90deg, #B8860B 0%, #FFD700 35%, #FFF8DC 50%, #FFD700 65%, #B8860B 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          marginTop: '-2px',
          zIndex: 4
        }} />
        <div style={{
          width: '130px',
          height: '20px',
          borderRadius: '0 0 14px 14px',
          background: 'linear-gradient(180deg, #D4AF37 0%, #99731C 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 3
        }} />
      </div>

      {/* Interactive Action Button */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!candlesBlown ? (
          <button
            type="button"
            onClick={triggerBlowCandles}
            style={{
              padding: '12px 28px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5E096 50%, #D4AF37 100%)',
              color: '#221133',
              fontWeight: 700,
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.2s ease'
            }}
          >
            <span>🎂</span>
            <span>Tiup Lilin Ulang Tahun!</span>
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{
              color: '#FDE68A',
              fontFamily: "'Cinzel', serif",
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.04em'
            }}>
              🎉 Lilin telah ditiup! Selamat umur 21, Cintaa! 💜
            </span>
            <button
              type="button"
              onClick={relightCandles}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.18)',
                color: '#FFFFFF',
                fontSize: '12px',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer'
              }}
            >
              Nyalakan Lilin Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
