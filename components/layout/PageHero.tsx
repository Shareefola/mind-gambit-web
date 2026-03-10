import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  tags?: { label: string; color?: string }[];
  icon?: string;
  compact?: boolean;
}

export default function PageHero({ title, subtitle, tags, icon, compact = false }: PageHeroProps) {
  return (
    <div
      style={{
        padding: compact ? '32px 24px' : '56px 24px 48px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: compact ? '2rem' : '2.5rem',
            marginBottom: 12,
            opacity: 0.85,
          }}
        >
          {icon}
        </div>
      )}
      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: compact ? 'clamp(1.6rem, 3vw, 2.2rem)' : 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#f5e6c8',
          lineHeight: 1.2,
          marginBottom: subtitle ? 12 : 0,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: '#c8a87a',
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: compact ? '0.95rem' : '1.1rem',
            lineHeight: 1.6,
            maxWidth: 600,
            marginBottom: tags ? 20 : 0,
          }}
        >
          {subtitle}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((tag, i) => (
            <span
              key={i}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'Source Sans 3, sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: tag.color ? `${tag.color}22` : 'rgba(212,168,83,0.12)',
                color: tag.color || '#d4a853',
                border: `1px solid ${tag.color ? `${tag.color}44` : 'rgba(212,168,83,0.25)'}`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
