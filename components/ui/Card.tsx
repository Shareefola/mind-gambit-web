import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
  elevated?: boolean;
}

export default function Card({ children, style, onClick, hoverable = false, elevated = false }: CardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: elevated ? '#251a10' : '#1a120b',
        border: `1px solid ${hovered ? 'rgba(212,168,83,0.3)' : '#3d2e1e'}`,
        borderRadius: 12,
        padding: '20px 22px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        transform: hovered && hoverable ? 'translateY(-1px)' : 'none',
        boxShadow: hovered && hoverable ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
