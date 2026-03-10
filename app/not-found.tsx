import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 480 }}>
        {/* Decorative chess piece */}
        <div style={{ fontSize: '5rem', marginBottom: 24, lineHeight: 1 }}>♟</div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
          color: '#f5e6c8', letterSpacing: '-0.03em', marginBottom: 8,
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontFamily: 'Source Sans 3, sans-serif',
          fontSize: '1rem', color: '#c8a87a',
          lineHeight: 1.7, marginBottom: 32,
        }}>
          This square doesn&apos;t exist on the board. The page you&apos;re looking for may have moved or never existed.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            ← Return Home
          </Link>
          <Link href="/learn" style={{
            textDecoration: 'none', padding: '10px 20px', borderRadius: 8,
            border: '1px solid #3d2e1e', background: 'transparent',
            color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '0.9rem', fontWeight: 700,
          }}>
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
