'use client';
import React from 'react';
import Badge from '@/components/ui/Badge';

interface PuzzleHeaderProps {
  theme: string;
  difficulty: string;
  rating: number;
  solved: number;
  attempted: number;
  streak: number;
}

export default function PuzzleHeader({ theme, difficulty, rating, solved, attempted, streak }: PuzzleHeaderProps) {
  const accuracy = attempted > 0 ? Math.round((solved / attempted) * 100) : 0;
  const diffColor = difficulty === 'Beginner' ? 'green' : difficulty === 'Intermediate' ? 'gold' : 'red';

  return (
    <div style={{
      background: '#1a120b', border: '1px solid #3d2e1e',
      borderRadius: 12, padding: '14px 18px',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.3rem' }}>🧩</span>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#f5e6c8' }}>
              {theme}
            </span>
            <Badge label={difficulty} color={diffColor} />
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#d4a853', fontWeight: 600 }}>
            ⭐ Rating: {rating.toLocaleString()}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {[
          { label: 'Solved', value: solved },
          { label: 'Streak', value: `${streak}🔥` },
          { label: 'Accuracy', value: `${accuracy}%` },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#d4a853' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.7rem', color: '#7a6040' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
