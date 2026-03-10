'use client';
import React, { useEffect, useRef } from 'react';

interface Move {
  notation: string;
  annotation?: string;
  isKey?: boolean;
}

interface MoveListProps {
  moves: Move[];
  currentIndex: number;
  onMoveSelect: (index: number) => void;
  compact?: boolean;
}

export default function MoveList({ moves, currentIndex, onMoveSelect, compact = false }: MoveListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const active = ref.current.querySelector('[data-active="true"]');
      active?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [currentIndex]);

  const pairs: Array<{ white: Move; whiteIdx: number; black?: Move; blackIdx?: number }> = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({ white: moves[i], whiteIdx: i, black: moves[i + 1], blackIdx: i + 1 < moves.length ? i + 1 : undefined });
  }

  return (
    <div ref={ref} style={{
      display: 'flex', flexDirection: 'column', gap: compact ? 1 : 2,
      maxHeight: compact ? 160 : 240, overflowY: 'auto',
      padding: '2px 0',
    }}>
      {pairs.length === 0 ? (
        <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem', textAlign: 'center', padding: '12px 0' }}>
          No moves yet
        </p>
      ) : (
        pairs.map(({ white, whiteIdx, black, blackIdx }, pairIdx) => (
          <div key={pairIdx} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 1fr', gap: 2, alignItems: 'center' }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: compact ? '0.7rem' : '0.75rem',
              color: '#7a6040', textAlign: 'right', paddingRight: 4,
            }}>
              {pairIdx + 1}.
            </span>
            <button
              data-active={whiteIdx === currentIndex}
              onClick={() => onMoveSelect(whiteIdx)}
              style={{
                padding: compact ? '3px 6px' : '4px 8px',
                borderRadius: 5, border: 'none', cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: compact ? '0.78rem' : '0.82rem',
                fontWeight: 600,
                background: whiteIdx === currentIndex ? 'rgba(212,168,83,0.2)' : 'transparent',
                color: whiteIdx === currentIndex ? '#d4a853' : '#f5e6c8',
                textAlign: 'left', transition: 'all 0.1s ease',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {white.isKey && <span style={{ color: '#d4a853', fontSize: '0.6rem' }}>★</span>}
              {white.notation}
            </button>
            {black && blackIdx !== undefined ? (
              <button
                data-active={blackIdx === currentIndex}
                onClick={() => onMoveSelect(blackIdx)}
                style={{
                  padding: compact ? '3px 6px' : '4px 8px',
                  borderRadius: 5, border: 'none', cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: compact ? '0.78rem' : '0.82rem',
                  fontWeight: 600,
                  background: blackIdx === currentIndex ? 'rgba(212,168,83,0.2)' : 'transparent',
                  color: blackIdx === currentIndex ? '#d4a853' : '#c8a87a',
                  textAlign: 'left', transition: 'all 0.1s ease',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                {black.isKey && <span style={{ color: '#d4a853', fontSize: '0.6rem' }}>★</span>}
                {black.notation}
              </button>
            ) : <div />}
          </div>
        ))
      )}
    </div>
  );
}
