'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getLevelFromXP } from '@/lib/progress-utils';

const NAV_LINKS = [
  { href: '/learn',     label: 'Learn',     icon: '📖' },
  { href: '/openings',  label: 'Openings',  icon: '📚' },
  { href: '/tactics',   label: 'Tactics',   icon: '🧩' },
  { href: '/strategy',  label: 'Strategy',  icon: '🧠' },
  { href: '/endgames',  label: 'Endgames',  icon: '♔' },
  { href: '/analysis',  label: 'Analysis',  icon: '🔬' },
];

export default function Nav() {
  const pathname = usePathname();
  const { progress } = useUserProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const level = mounted ? getLevelFromXP(progress.xp) : null;
  const xp    = mounted ? progress.xp : 0;

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 60,
          background: scrolled ? 'rgba(15,10,6,0.97)' : '#0f0a06',
          borderBottom: '1px solid #3d2e1e',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 0,
          transition: 'background 0.2s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>♟</span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #d4a853, #f0c878)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.01em',
          }}>MindGambit</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 2, marginLeft: 28, flex: 1, alignItems: 'center' }}>
          {NAV_LINKS.map(link => {
            const active = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: active ? 700 : 600,
                  color: active ? '#d4a853' : '#7a6040',
                  background: active ? 'rgba(212,168,83,0.1)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(212,168,83,0.25)' : 'transparent'}`,
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}>
                  <span style={{ marginRight: 4 }}>{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* XP / Level badge */}
        {mounted && level && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 12px',
              background: 'rgba(212,168,83,0.08)',
              border: '1px solid rgba(212,168,83,0.2)',
              borderRadius: 20,
            }}>
              <span style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#d4a853' }}>
                {level.icon} {level.name}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7a6040' }}>
                {xp} XP
              </span>
            </div>
            <Link href="/settings" style={{ textDecoration: 'none' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                border: '1px solid #3d2e1e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#1a120b',
                color: '#7a6040',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}>⚙</div>
            </Link>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          style={{
            display: 'none',
            marginLeft: 'auto',
            background: 'transparent',
            border: 'none',
            color: '#c8a87a',
            fontSize: '1.3rem',
            cursor: 'pointer',
            padding: 6,
          }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15,10,6,0.98)',
          zIndex: 99,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          animation: 'slideUp 0.2s ease-out',
          overflowY: 'auto',
        }}>
          {NAV_LINKS.map(link => {
            const active = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: active ? '#d4a853' : '#c8a87a',
                  background: active ? 'rgba(212,168,83,0.1)' : '#1a120b',
                  border: `1px solid ${active ? 'rgba(212,168,83,0.25)' : '#3d2e1e'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            );
          })}
          <Link href="/settings" style={{ textDecoration: 'none', marginTop: 8 }}>
            <div style={{ padding: '14px 18px', borderRadius: 10, fontFamily: 'Source Sans 3, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#c8a87a', background: '#1a120b', border: '1px solid #3d2e1e', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.2rem' }}>⚙</span>Settings
            </div>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 800px) {
          nav > div:not(.mobile-menu-btn) { display: none !important; }
        }
      `}</style>
    </>
  );
}
