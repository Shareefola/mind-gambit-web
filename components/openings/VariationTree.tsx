'use client';
import React from 'react';

interface Variation {
  id: string;
  name: string;
  idea: string;
  gameType?: string;
}

interface VariationTreeProps {
  variations: Variation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function VariationTree({ variations, activeId, onSelect }: VariationTreeProps) {
  if (!variations || variations.length === 0) {
    return (
      <p style={{ color: '#7a6040', fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.85rem', padding: '12px 0' }}>
        No variations available for this opening.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {variations.map(v => {
        const isActive = v.id === activeId;
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            style={{
              padding: '12px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
              border: `1px solid ${isActive ? 'rgba(212,168,83,0.4)' : '#3d2e1e'}`,
              background: isActive ? 'rgba(212,168,83,0.08)' : 'transparent',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(212,168,83,0.2)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = '#3d2e1e'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.88rem', fontWeight: 700,
                color: isActive ? '#d4a853' : '#f5e6c8',
              }}>
                {v.name}
              </span>
              {v.gameType && (
                <span style={{
                  fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.68rem',
                  color: '#7a6040', background: '#0f0a06', border: '1px solid #3d2e1e',
                  borderRadius: 4, padding: '2px 6px',
                }}>
                  {v.gameType}
                </span>
              )}
            </div>
            <p style={{
              fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem',
              color: '#c8a87a', margin: 0, lineHeight: 1.5,
            }}>
              {v.idea}
            </p>
          </button>
        );
      })}
    </div>
  );
}
