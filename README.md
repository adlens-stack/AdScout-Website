# AdScout Website

Marketing and product website for AdScout — built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, wired to the AdScout design system.

## Getting started

```bash
git clone https://github.com/adlens-stack/AdScout-Website.git
cd AdScout-Website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + AdScout design system (`adscout-design-system/`)
- **Fonts:** Plus Jakarta Sans · Inter · JetBrains Mono (via `next/font/google`)
- **Deploy:** Vercel

## Design system

All visual tokens (colors, typography, spacing, radii, shadows, motion) live in `adscout-design-system/`. Do not edit files inside that folder — it is a standalone package. See `adscout-design-system/README.md` for the full token reference.

Design system classes are available globally:

```tsx
<h1 className="ds-h1">Heading</h1>
<button className="ds-btn ds-btn--primary">CTA</button>
<div className="ds-card">Card</div>
```

Tailwind utilities are mapped to design tokens:

```tsx
<div className="bg-bg-3 text-fg-2 rounded-lg shadow-card" />
<span className="text-brand-lime font-semibold" />
```

## Project structure

```
src/
  app/          Next.js App Router pages and layouts
  components/   Shared React components
  styles/       globals.css (wires design system + Tailwind)
  lib/          Utility functions and helpers
adscout-design-system/   Design token source (read-only)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
