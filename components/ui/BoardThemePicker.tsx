'use client';
import React from 'react';
import { BOARD_THEMES, BoardThemeName } from '@/components/board/themes';

interface BoardThemePickerProps {
  current: BoardThemeName;
  onChange: (name: BoardThemeName) => void;
  size?: 'sm' | 'md';
}

function MiniBoard({ themeName, size = 64 }: { themeName: BoardThemeName; size?: number }) {
  const theme = BOARD_THEMES[themeName];
  const sq = size / 8;
  const STARTING_POSITION = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R'],
  ];
  const PIECE_MAP: Record<string, string> = {
    K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
    k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟',
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(8, ${sq}px)`,
        gridTemplateRows: `repeat(8, ${sq}px)`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {STARTING_POSITION.map((row, ri) =>
        row.map((piece, ci) => {
          const isLight = (ri + ci) % 2 === 0;
          return (
            <div
              key={`${ri}-${ci}`}
              style={{
                width: sq,
                height: sq,
                backgroundColor: isLight ? theme.light : theme.dark,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: sq * 0.75,
                lineHeight: 1,
              }}
            >
              {piece ? PIECE_MAP[piece] || '' : ''}
            </div>
          );
        })
      )}
    </div>
  );
}

export default function BoardThemePicker({ current, onChange, size = 'md' }: BoardThemePickerProps) {
  const miniSize = size === 'sm' ? 48 : 64;
  const themeEntries = Object.values(BOARD_THEMES);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${miniSize + 24}px, 1fr))`,
        gap: 12,
      }}
    >
      {themeEntries.map(theme => {
        const isActive = current === theme.name;
        return (
          <button
            key={theme.name}
            onClick={() => onChange(theme.name)}
            title={theme.description}
            style={{
              background: 'transparent',
              border: `2px solid ${isActive ? '#d4a853' : '#3d2e1e'}`,
              borderRadius: 10,
              padding: 8,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              boxShadow: isActive ? '0 0 0 1px rgba(212,168,83,0.3), 0 4px 12px rgba(212,168,83,0.15)' : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.borderColor = '#8b6d35';
                (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,83,0.05)';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.borderColor = '#3d2e1e';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }
            }}
          >
            <MiniBoard themeName={theme.name} size={miniSize} />
            <span
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: isActive ? '#d4a853' : '#7a6040',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {theme.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
