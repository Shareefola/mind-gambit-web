'use client';
import React from 'react';
import Link from 'next/link';
import { useBoardTheme } from '@/hooks/useBoardTheme';
import { BOARD_THEMES } from '@/components/board/themes';
import Badge from '@/components/ui/Badge';

const PIECE_SYMBOLS: Record<string, string> = {
  K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',
  k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟',
};

function MiniBoard({ fen, size = 100 }: { fen: string; size?: number }) {
  const { themeName } = useBoardTheme();
  const theme = BOARD_THEMES[themeName];
  const sq = size / 8;
  const position = fen.split(' ')[0];
  const rows = position.split('/');
  const board: (string | null)[][] = rows.map(row => {
    const cells: (string | null)[] = [];
    for (const ch of row) {
      if (/\d/.test(ch)) for (let i = 0; i < parseInt(ch); i++) cells.push(null);
      else cells.push(ch);
    }
    return cells;
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(8, ${sq}px)`,
      gridTemplateRows: `repeat(8, ${sq}px)`,
      borderRadius: 4,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    }}>
      {board.map((row, ri) =>
        row.map((piece, ci) => {
          const isLight = (ri + ci) % 2 === 0;
          return (
            <div key={`${ri}-${ci}`} style={{
              width: sq, height: sq,
              backgroundColor: isLight ? theme.lightSquare : theme.darkSquare,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: sq * 0.7, lineHeight: 1,
            }}>
              {piece ? PIECE_SYMBOLS[piece] || '' : ''}
            </div>
          );
        })
      )}
    </div>
  );
}

interface OpeningCardProps {
  opening: {
    id: string;
    name: string;
    eco?: string;
    difficulty: string;
    style: string;
    forColor: string;
    tagline: string;
    famousPlayers?: string[];
    characteristicFen?: string;
    mainLine?: { notation: string }[];
  };
  isStudied?: boolean;
}

export default function OpeningCard({ opening, isStudied = false }: OpeningCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const diffColor = opening.difficulty === 'Beginner' ? 'green' : opening.difficulty === 'Intermediate' ? 'gold' : 'red';
  const colorFor = opening.forColor === 'White' ? '♔ White' : opening.forColor === 'Black' ? '♚ Black' : '⇄ Both';
  const starCount = opening.difficulty === 'Beginner' ? 1 : opening.difficulty === 'Intermediate' ? 2 : 3;

  return (
    <Link href={`/openings/${opening.id}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#1a120b',
          border: `1px solid ${hovered ? 'rgba(212,168,83,0.35)' : '#3d2e1e'}`,
          borderRadius: 12,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          transform: hovered ? 'translateY(-2px)' : 'none',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        {/* Board preview area */}
        <div style={{
          background: '#0f0a06',
          padding: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid #3d2e1e',
        }}>
          {opening.characteristicFen && (
            <MiniBoard fen={opening.characteristicFen} size={120} />
          )}
        </div>

        {/* Card content */}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '0.95rem', fontWeight: 700,
              color: '#f5e6c8', margin: 0, lineHeight: 1.3,
              flex: 1, marginRight: 8,
            }}>
              {opening.name}
            </h3>
            {opening.eco && (
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#7a6040', flexShrink: 0 }}>
                {opening.eco}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            {'★'.repeat(starCount).split('').map((_, i) => (
              <span key={i} style={{ color: '#d4a853', fontSize: '0.7rem' }}>★</span>
            ))}
            {'☆'.repeat(3 - starCount).split('').map((_, i) => (
              <span key={i} style={{ color: '#3d2e1e', fontSize: '0.7rem' }}>★</span>
            ))}
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.72rem', color: '#7a6040', marginLeft: 4 }}>
              {opening.difficulty} · {opening.style}
            </span>
          </div>

          <p style={{
            fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.8rem',
            color: '#c8a87a', lineHeight: 1.5, margin: '0 0 10px',
          }}>
            {opening.tagline}
          </p>

          {opening.mainLine && opening.mainLine.length > 0 && (
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7a6040', margin: '0 0 10px', lineHeight: 1.5 }}>
              {opening.mainLine.slice(0, 3).map(s => s.notation).join(' ')}…
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.72rem', color: '#7a6040' }}>
              {colorFor}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {isStudied && (
                <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.7rem', color: '#4caf7d', fontWeight: 700 }}>
                  ✓ Studied
                </span>
              )}
              <span style={{
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.75rem', fontWeight: 700,
                color: hovered ? '#d4a853' : '#7a6040', transition: 'color 0.15s ease',
              }}>
                Study →
              </span>
            </div>
          </div>
        </div>

        {/* Studied badge overlay */}
        {isStudied && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(76,175,125,0.15)', border: '1px solid rgba(76,175,125,0.35)',
            borderRadius: 6, padding: '3px 8px',
          }}>
            <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#4caf7d' }}>
              ✓ STUDIED
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
