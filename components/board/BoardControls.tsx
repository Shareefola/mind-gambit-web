'use client';
import React from 'react';

interface BoardControlsProps {
  onFlip: () => void;
  onReset?: () => void;
  onUndo?: () => void;
  showFlip?: boolean;
  showReset?: boolean;
  showUndo?: boolean;
  orientation?: 'white' | 'black';
  compact?: boolean;
}

export default function BoardControls({
  onFlip,
  onReset,
  onUndo,
  showFlip = true,
  showReset = false,
  showUndo = false,
  orientation = 'white',
  compact = false,
}: BoardControlsProps) {
  const btnStyle: React.CSSProperties = {
    background: '#2e2015',
    border: '1px solid #3d2e1e',
    borderRadius: 8,
    padding: compact ? '6px 10px' : '8px 14px',
    cursor: 'pointer',
    color: '#c8a87a',
    fontSize: compact ? '0.75rem' : '0.8rem',
    fontFamily: 'Source Sans 3, sans-serif',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap' as const,
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {showFlip && (
        <button
          style={btnStyle}
          onClick={onFlip}
          title="Flip board"
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = '#3d2e1e';
            el.style.color = '#f5e6c8';
            el.style.borderColor = '#8b6d35';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = '#2e2015';
            el.style.color = '#c8a87a';
            el.style.borderColor = '#3d2e1e';
          }}
        >
          <span style={{ fontSize: '1rem' }}>⇅</span>
          {!compact && (orientation === 'white' ? 'Black View' : 'White View')}
        </button>
      )}
      {showUndo && onUndo && (
        <button
          style={btnStyle}
          onClick={onUndo}
          title="Undo last move"
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = '#3d2e1e';
            el.style.color = '#f5e6c8';
            el.style.borderColor = '#8b6d35';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = '#2e2015';
            el.style.color = '#c8a87a';
            el.style.borderColor = '#3d2e1e';
          }}
        >
          <span>←</span>
          {!compact && 'Undo'}
        </button>
      )}
      {showReset && onReset && (
        <button
          style={btnStyle}
          onClick={onReset}
          title="Reset position"
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = '#3d2e1e';
            el.style.color = '#f5e6c8';
            el.style.borderColor = '#8b6d35';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = '#2e2015';
            el.style.color = '#c8a87a';
            el.style.borderColor = '#3d2e1e';
          }}
        >
          <span>↺</span>
          {!compact && 'Reset'}
        </button>
      )}
    </div>
  );
}
