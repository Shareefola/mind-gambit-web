import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#1a120b',
        borderTop: '1px solid #3d2e1e',
        padding: '48px 24px 32px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: '1.4rem' }}>♟</span>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #d4a853, #f0c878)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MindGambit
            </span>
          </div>
          <p
            style={{
              color: '#7a6040',
              fontSize: '0.875rem',
              fontFamily: 'Source Sans 3, sans-serif',
              lineHeight: 1.6,
            }}
          >
            Chess learning done right. Structured progression, real explanations, genuine mastery.
          </p>
        </div>

        {/* Learn */}
        <div>
          <h4
            style={{
              color: '#c8a87a',
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Learn
          </h4>
          {[
            { href: '/learn', label: 'Learning Path' },
            { href: '/openings', label: 'Opening Library' },
            { href: '/tactics', label: 'Tactical Puzzles' },
            { href: '/analysis', label: 'Board Analysis' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                color: '#7a6040',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '0.875rem',
                textDecoration: 'none',
                marginBottom: 8,
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#d4a853')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#7a6040')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Chess */}
        <div>
          <h4
            style={{
              color: '#c8a87a',
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Account
          </h4>
          {[
            { href: '/settings', label: 'Settings' },
            { href: '/settings#progress', label: 'My Progress' },
            { href: '/settings#theme', label: 'Board Themes' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                color: '#7a6040',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '0.875rem',
                textDecoration: 'none',
                marginBottom: 8,
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#d4a853')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#7a6040')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '32px auto 0',
          paddingTop: 24,
          borderTop: '1px solid #3d2e1e',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p
          style={{
            color: '#7a6040',
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '0.8rem',
          }}
        >
          © {new Date().getFullYear()} MindGambit. Built for chess learners.
        </p>
        <p
          style={{
            color: '#7a6040',
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '0.8rem',
          }}
        >
          Progress saved locally in your browser.
        </p>
      </div>
    </footer>
  );
}
