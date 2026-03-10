'use client';
import React from 'react';
import ChessBoard from '@/components/board/ChessBoard';
import { useBoardTheme } from '@/hooks/useBoardTheme';

interface MiddlegameThemeProps {
  theme: {
    title: string;
    description: string;
    fen: string;
    arrows?: { from: string; to: string; color: 'gold' | 'green' | 'red' | 'blue' }[];
    plan: string;
  };
  boardSize?: number;
}

export default function MiddlegameTheme({ theme, boardSize = 280 }: MiddlegameThemeProps) {
  const { themeName } = useBoardTheme();

  return (
    <div style={{
      background: '#1a120b', border: '1px solid #3d2e1e',
      borderRadius: 12, overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #3d2e1e' }}>
        <h4 style={{
          fontFamily: 'Playfair Display, serif', fontSize: '1rem',
          fontWeight: 700, color: '#d4a853', margin: '0 0 6px',
        }}>
          {theme.title}
        </h4>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', color: '#c8a87a', margin: 0, lineHeight: 1.6 }}>
          {theme.description}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 14, background: '#0f0a06' }}>
        <ChessBoard
          fen={theme.fen}
          interactive={false}
          size={boardSize}
          themeName={themeName}
          arrows={theme.arrows}
          showCoordinates
        />
      </div>
      <div style={{ padding: '12px 16px', background: 'rgba(212,168,83,0.04)', borderTop: '1px solid #3d2e1e' }}>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.82rem', color: '#c8a87a', margin: 0, lineHeight: 1.6 }}>
          <span style={{ color: '#d4a853', fontWeight: 700 }}>Plan: </span>
          {theme.plan}
        </p>
      </div>
    </div>
  );
}
