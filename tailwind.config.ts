import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0f0a06',
        surface: '#1a120b',
        elevated: '#251a10',
        card: '#2e2015',
        border: '#3d2e1e',
        gold: '#d4a853',
        'gold-light': '#f0c878',
        'gold-dim': '#8b6d35',
        cream: '#f5e6c8',
        'cream-dim': '#c8a87a',
        'cream-muted': '#7a6040',
        success: '#4caf7d',
        error: '#e05252',
        info: '#5b9bd5',
        accent: '#e8734a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.3)',
        'modal': '0 8px 24px rgba(0,0,0,0.4)',
        'gold': '0 8px 40px rgba(212,168,83,0.2)',
        'board': '0 8px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'correct-flash': 'correctFlash 0.6s ease-out',
        'wrong-flash': 'wrongFlash 0.5s ease-out',
        'celebration': 'celebration 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        correctFlash: {
          '0%': { backgroundColor: 'rgba(76,175,125,0)' },
          '30%': { backgroundColor: 'rgba(76,175,125,0.45)' },
          '100%': { backgroundColor: 'rgba(76,175,125,0)' },
        },
        wrongFlash: {
          '0%': { backgroundColor: 'rgba(224,82,82,0)' },
          '30%': { backgroundColor: 'rgba(224,82,82,0.45)' },
          '100%': { backgroundColor: 'rgba(224,82,82,0)' },
        },
        celebration: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,168,83,0)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212,168,83,0.15)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
