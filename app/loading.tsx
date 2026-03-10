import React from 'react';

export default function Loading() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        {/* Animated chess board skeleton */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 28px)',
          gridTemplateRows: 'repeat(4, 28px)', gap: 2,
          marginBottom: 24, margin: '0 auto 24px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          {Array.from({ length: 16 }, (_, i) => {
            const row = Math.floor(i / 4), col = i % 4;
            const isLight = (row + col) % 2 === 0;
            return (
              <div key={i} style={{
                width: 28, height: 28,
                backgroundColor: isLight ? 'rgba(212,168,83,0.12)' : 'rgba(212,168,83,0.06)',
                borderRadius: 2,
              }} />
            );
          })}
        </div>
        <p style={{
          fontFamily: 'Playfair Display, serif', fontSize: '1rem',
          color: '#7a6040', fontStyle: 'italic',
        }}>
          Setting up the board…
        </p>
      </div>
    </div>
  );
}
