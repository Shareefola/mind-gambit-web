'use client';
import React, { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  color = '#d4a853',
  height = 6,
  animated = true,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    if (animated) {
      requestAnimationFrame(() => setDisplayPct(percentage));
    } else {
      setDisplayPct(percentage);
    }
  }, [percentage, animated]);

  return (
    <div>
      {(showLabel || label) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontFamily: 'Source Sans 3, sans-serif',
            fontSize: '0.8rem',
            color: '#c8a87a',
          }}
        >
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          borderRadius: height / 2,
          background: '#3d2e1e',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${displayPct}%`,
            borderRadius: height / 2,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            transition: animated ? 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
}
