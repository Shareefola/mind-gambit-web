import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MindGambit — Chess Learning Platform',
    short_name: 'MindGambit',
    description: 'Learn chess the way it should be taught. Interactive lessons, openings, tactics, and a structured path to mastery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0a06',
    theme_color: '#d4a853',
    orientation: 'portrait-primary',
    categories: ['education', 'games', 'sports'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    screenshots: [
      {
        src: '/screenshots/home.png',
        sizes: '1280x720',
        type: 'image/png',
        label: 'MindGambit Home — Premium Chess Learning',
      },
    ],
  };
}
