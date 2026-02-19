# Prezio

A gift box builder where you pick items, customise the packaging and preview your box — all in the browser.

**Live:** [oguzhanberkeozdil.github.io/prezio](https://oguzhanberkeozdil.github.io/prezio)

## Features

- Step-by-step gift box builder with real-time price preview
- Product catalog with search, filters and multiple view modes
- Available in three languages: English, Turkish and Polish (auto-detected by location)
- Light / dark theme
- Fully responsive — works on phones, tablets and desktops
- Designs saved locally, no account needed

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** — build & dev server
- **Tailwind CSS 4** — utility-first styling
- **Framer Motion** — page transitions & micro-interactions
- **Zustand** — state management with persistence
- **i18next** — internationalisation (EN / TR / PL)
- **Radix UI** — accessible headless components
- **Lucide React** — icon set
- **React Router 7** — client-side routing
- **React Hook Form + Zod** — form handling & validation

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deployment

Pushes to `master` automatically deploy to GitHub Pages via the included workflow (`.github/workflows/deploy.yml`).

## License

This project is for personal / portfolio use.
