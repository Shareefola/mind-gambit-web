'use client';
import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('MindGambit Error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: '4rem', marginBottom: 20 }}>♚</div>
        <h2 style={{
          fontFamily: 'Playfair Display, serif', fontSize: '1.8rem',
          fontWeight: 700, color: '#f5e6c8', marginBottom: 10,
        }}>
          Something went wrong
        </h2>
        <p style={{
          fontFamily: 'Source Sans 3, sans-serif', fontSize: '0.95rem',
          color: '#c8a87a', lineHeight: 1.6, marginBottom: 28,
        }}>
          An unexpected error occurred. Your progress is saved in your browser and won&apos;t be lost.
        </p>
        {error.message && (
          <div style={{
            background: '#1a120b', border: '1px solid rgba(224,82,82,0.2)',
            borderRadius: 8, padding: '10px 14px', marginBottom: 24,
          }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#e05252', margin: 0 }}>
              {error.message}
            </p>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => reset()} className="btn-primary">
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '10px 20px', borderRadius: 8,
              border: '1px solid #3d2e1e', background: 'transparent',
              color: '#c8a87a', fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
