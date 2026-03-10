import React from 'react';

type BadgeColor = 'gold' | 'green' | 'red' | 'blue' | 'accent' | 'muted';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  dot?: boolean;
}

const colorMap: Record<BadgeColor, { bg: string; text: string; border: string }> = {
  gold: { bg: 'rgba(212,168,83,0.12)', text: '#d4a853', border: 'rgba(212,168,83,0.25)' },
  green: { bg: 'rgba(76,175,125,0.12)', text: '#4caf7d', border: 'rgba(76,175,125,0.25)' },
  red: { bg: 'rgba(224,82,82,0.12)', text: '#e05252', border: 'rgba(224,82,82,0.25)' },
  blue: { bg: 'rgba(91,155,213,0.12)', text: '#5b9bd5', border: 'rgba(91,155,213,0.25)' },
  accent: { bg: 'rgba(232,115,74,0.12)', text: '#e8734a', border: 'rgba(232,115,74,0.25)' },
  muted: { bg: 'rgba(122,96,64,0.15)', text: '#7a6040', border: 'rgba(122,96,64,0.2)' },
};

export default function Badge({ label, color = 'gold', dot = false }: BadgeProps) {
  const c = colorMap[color];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        borderRadius: 20,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        fontFamily: 'Source Sans 3, sans-serif',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: c.text,
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </span>
  );
}
