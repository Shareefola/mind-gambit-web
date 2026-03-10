# App Icons

Generate these PNG icons from icon.svg for production:

- icon-16.png   (16x16)   — browser favicon
- icon-32.png   (32x32)   — browser favicon  
- icon-180.png  (180x180) — Apple touch icon
- icon-192.png  (192x192) — PWA icon (maskable)
- icon-512.png  (512x512) — PWA icon (any)

Use any SVG→PNG converter, or run:
  npx sharp-cli --input icon.svg --output icon-192.png --width 192 --height 192

The icon.svg is already included and works as a favicon via:
  <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
