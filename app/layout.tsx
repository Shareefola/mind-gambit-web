import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/navigation/Nav';
import Footer from '@/components/layout/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d4a853',
};

export const metadata: Metadata = {
  title: {
    default: 'MindGambit — Chess Learning Platform',
    template: '%s | MindGambit',
  },
  description: 'Learn chess the way it should be taught. Interactive lessons, opening library, tactical puzzles, strategy guides, and endgame training — all in one premium platform.',
  keywords: ['chess', 'learn chess', 'chess lessons', 'chess openings', 'chess tactics', 'chess puzzles', 'chess training', 'chess endgames', 'chess strategy'],
  authors: [{ name: 'MindGambit' }],
  creator: 'MindGambit',
  openGraph: {
    title: 'MindGambit — Chess Learning Platform',
    description: 'Premium chess education. Real explanations. Interactive boards. Structured progression from beginner to master.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MindGambit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindGambit — Chess Learning Platform',
    description: 'Learn chess the way it should be taught.',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MindGambit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* PWA + mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png" />
      </head>
      <body>
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
