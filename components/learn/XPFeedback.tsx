'use client';
import React, { useEffect, useState } from 'react';

interface XPFeedbackProps {
  xp: number;
  message?: string;
  onDone?: () => void;
  visible: boolean;
}

export default function XPFeedback({ xp, message = 'Well done!', onDone, visible }: XPFeedbackProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        onDone?.();
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 300,
        textAlign: 'center',
        pointerEvents: 'none',
        animation: 'celebration 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      <div
        style={{
          background: 'rgba(15,10,6,0.95)',
          border: '2px solid rgba(212,168,83,0.5)',
          borderRadius: 20,
          padding: '24px 40px',
          boxShadow: '0 8px 40px rgba(212,168,83,0.25), 0 16px 48px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #d4a853, #f0c878)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 8,
          }}
        >
          {message}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>⭐</span>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#d4a853',
            }}
          >
            +{xp} XP
          </span>
        </div>
      </div>
    </div>
  );
}
