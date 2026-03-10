'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ChessBoard from '@/components/board/ChessBoard';

const HERO_FEN = 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5';

const FEATURES = [
  {
    icon: '📖',
    title: 'Structured Learning Path',
    desc: 'Five units, fifteen lessons, zero confusion. From first move to advanced strategy — every step builds on the last.',
    href: '/learn',
    color: '#d4a853',
  },
  {
    icon: '📚',
    title: 'Opening Library',
    desc: 'Ten essential openings with full move annotation, variations, middlegame plans, and the mistakes to avoid.',
    href: '/openings',
    color: '#5b9bd5',
  },
  {
    icon: '🧩',
    title: 'Tactical Puzzles',
    desc: 'Hand-curated puzzles across ten tactical themes — Forks, Pins, Skewers, Discovered Attacks and beyond.',
    href: '/tactics',
    color: '#e8734a',
  },
  {
    icon: '🧠',
    title: 'Strategic Thinking',
    desc: 'Passed pawns, outposts, two weaknesses, Rook activity — the principles that separate club players from masters.',
    href: '/strategy',
    color: '#9b59b6',
  },
  {
    icon: '♔',
    title: 'Essential Endgames',
    desc: 'Lucena, Philidor, Opposition, Key Squares — twelve positions every serious player must know cold.',
    href: '/endgames',
    color: '#4caf7d',
  },
  {
    icon: '🔬',
    title: 'Analysis Board',
    desc: 'Explore any position freely. Load any FEN, play moves, annotate, and study at your own pace.',
    href: '/analysis',
    color: '#c8a87a',
  },
];

const STATS = [
  { value: '15', label: 'Structured Lessons' },
  { value: '27', label: 'Tactical Puzzles' },
  { value: '10', label: 'Opening Guides' },
  { value: '12', label: 'Endgame Studies' },
];

const FLOATING_PIECES = ['♞', '♜', '♝', '♛', '♚'];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          padding: '48px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(212,168,83,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 80%, rgba(91,155,213,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating decorative pieces */}
        {mounted && FLOATING_PIECES.map((piece, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              fontSize: `${2.5 + (i % 3) * 0.8}rem`,
              opacity: 0.04 + (i % 3) * 0.02,
              color: '#d4a853',
              top: `${10 + i * 16}%`,
              left: `${5 + (i % 2) * 8}%`,
              animation: `float ${6 + i * 1.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {piece}
          </span>
        ))}

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left: Text */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 20,
                background: 'rgba(212,168,83,0.1)',
                border: '1px solid rgba(212,168,83,0.2)',
                marginBottom: 24,
              }}
            >
              <span style={{ fontSize: '0.8rem' }}>♟</span>
              <span
                style={{
                  color: '#d4a853',
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Premium Chess Learning
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#f5e6c8',
                letterSpacing: '-0.03em',
                marginBottom: 24,
              }}
            >
              Chess the way it{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #d4a853, #f0c878)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                should
              </span>{' '}
              be taught.
            </h1>

            <p
              style={{
                color: '#c8a87a',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '1.1rem',
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              Structured lessons that build real understanding. Opening guides that explain the
              why. Puzzles with explanations that actually teach. No ads, no fluff — just chess.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/learn" className="btn-primary">
                Start Learning →
              </Link>
              <Link href="/tactics" className="btn-ghost">
                Try a Puzzle
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                paddingTop: 32,
                borderTop: '1px solid #3d2e1e',
              }}
            >
              {STATS.map(stat => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #d4a853, #f0c878)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: '#7a6040',
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Chess Board */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 16,
                background: '#1a120b',
                borderRadius: 16,
                border: '1px solid #3d2e1e',
                boxShadow: '0 8px 40px rgba(212,168,83,0.12), 0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <ChessBoard
                fen={HERO_FEN}
                interactive={false}
                size={400}
                showCoordinates={true}
                arrows={[
                  { from: 'f3', to: 'e5', color: 'gold' },
                  { from: 'c4', to: 'f7', color: 'red' },
                ]}
              />
            </div>
            <p
              style={{
                color: '#7a6040',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              The Italian Game — White has excellent piece coordination
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: '80px 24px',
          background: '#1a120b',
          borderTop: '1px solid #3d2e1e',
          borderBottom: '1px solid #3d2e1e',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#f5e6c8',
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}
            >
              Everything you need to improve
            </h2>
            <p
              style={{
                color: '#c8a87a',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '1rem',
                maxWidth: 480,
                margin: '0 auto',
              }}
            >
              Six interconnected tools that work together to build a complete chess education.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            {FEATURES.map((f, i) => (
              <Link key={i} href={(f as any).href || '#'} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: '#2e2015',
                  border: '1px solid #3d2e1e',
                  borderRadius: 14,
                  padding: 28,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  animation: 'fadeUp 0.4s ease-out forwards',
                  animationDelay: `${i * 80}ms`,
                  opacity: 0,
                  height: '100%',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = '#251a10';
                  el.style.borderColor = `${f.color}44`;
                  el.style.boxShadow = `0 8px 32px ${f.color}15`;
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = '#2e2015';
                  el.style.borderColor = '#3d2e1e';
                  el.style.boxShadow = '';
                  el.style.transform = '';
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${f.color}18`,
                    border: `1px solid ${f.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    marginBottom: 16,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#f5e6c8',
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: '#c8a87a',
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                  }}
                >
                  {f.desc}
                </p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>♟</div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: '#f5e6c8',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Ready to play better chess?
          </h2>
          <p
            style={{
              color: '#c8a87a',
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Your progress saves automatically — no account needed. Start your first lesson
            and see why understanding beats memorization every time.
          </p>
          <Link href="/learn" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            Begin the Journey →
          </Link>
        </div>
      </section>
    </div>
  );
}
