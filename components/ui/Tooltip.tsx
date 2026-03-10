'use client';
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ text, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const posStyles: Record<string, React.CSSProperties> = {
    top:    { bottom: '110%', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: '110%',   left: '50%', transform: 'translateX(-50%)' },
    left:   { right: '110%', top: '50%',  transform: 'translateY(-50%)' },
    right:  { left: '110%',  top: '50%',  transform: 'translateY(-50%)' },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          ...posStyles[position],
          background: '#2e2015',
          border: '1px solid #3d2e1e',
          borderRadius: 6,
          padding: '5px 10px',
          color: '#c8a87a',
          fontFamily: 'Source Sans 3, sans-serif',
          fontSize: '0.78rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          zIndex: 200,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}>
          {text}
        </div>
      )}
    </div>
  );
}
