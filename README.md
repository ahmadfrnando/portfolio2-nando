# Ahmad Fernando — Portfolio

Personal portfolio built with React, Vite, Sass, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

The contact form uses EmailJS. Create a `.env` file with:

```
VITE_SERVICE_ID_EMAILJS=...
VITE_TEMPLATE_ID_EMAILJS=...
VITE_PUBLIC_KEY_EMAILJS=...
```

## Images

Images in `public/` are optimized WebP files. Full-resolution sources live in `originals/` (git-ignored). To add a project screenshot:

```bash
cwebp -q 80 -resize 1920 0 originals/projects/projectN.png -o public/projects/projectN.webp
```
