'use client';
import React from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #d4a853, #b8893d)',
    color: '#0f0a06',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#c8a87a',
    border: '1px solid #3d2e1e',
  },
  danger: {
    background: 'rgba(224,82,82,0.15)',
    color: '#e05252',
    border: '1px solid rgba(224,82,82,0.3)',
  },
  success: {
    background: 'rgba(76,175,125,0.15)',
    color: '#4caf7d',
    border: '1px solid rgba(76,175,125,0.3)',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: '0.8rem' },
  md: { padding: '10px 22px', fontSize: '0.9rem' },
  lg: { padding: '14px 32px', fontSize: '1rem' },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        fontFamily: 'Source Sans 3, sans-serif',
        fontWeight: 700,
        borderRadius: 8,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        letterSpacing: '0.01em',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          const el = e.currentTarget;
          if (variant === 'primary') {
            el.style.background = 'linear-gradient(135deg, #f0c878, #d4a853)';
            el.style.transform = 'translateY(-1px)';
            el.style.boxShadow = '0 4px 16px rgba(212,168,83,0.35)';
          } else if (variant === 'ghost') {
            el.style.background = '#251a10';
            el.style.color = '#f5e6c8';
            el.style.borderColor = '#8b6d35';
          } else if (variant === 'danger') {
            el.style.background = 'rgba(224,82,82,0.25)';
          } else if (variant === 'success') {
            el.style.background = 'rgba(76,175,125,0.25)';
          }
        }
      }}
      onMouseLeave={e => {
        if (!disabled && !loading) {
          const el = e.currentTarget;
          Object.assign(el.style, variantStyles[variant]);
          el.style.transform = '';
          el.style.boxShadow = '';
        }
      }}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⟳</span>
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
