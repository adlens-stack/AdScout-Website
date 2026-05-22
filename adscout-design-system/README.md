# AdScout Design System

The single source of truth for AdScout's visual language. Use it standalone, with Tailwind, or any JS framework.

```
adscout-design-system/
├── tokens.css           ← CSS custom properties (the master)
├── tokens.js            ← Same tokens as an ES module
├── tailwind.config.js   ← Tailwind preset that maps every token
├── typography.css       ← Element + role text styles
├── components.css       ← Reusable component classes (button, card, chip, …)
└── README.md            ← You are here
```

## Quick start

### Plain HTML / CSS
```html
<link rel="stylesheet" href="adscout-design-system/tokens.css">
<link rel="stylesheet" href="adscout-design-system/typography.css">
<link rel="stylesheet" href="adscout-design-system/components.css">

<button class="ds-btn ds-btn--primary">Book a demo</button>
```

### Tailwind project
```js
// tailwind.config.js
const adscout = require("./adscout-design-system/tailwind.config.js");
module.exports = { presets: [adscout], content: ["./src/**/*.{js,jsx,ts,tsx}"] };
```

### Any JS / framework
```js
import tokens, { color, space } from "./adscout-design-system/tokens.js";

const styles = {
  background: color.bg[2],
  padding:    space[6],
  color:      color.brand.lime,
};
```

---

## Design principles

- **Dark-first.** The entire system is calibrated for a near-black background. There is no light mode (yet).
- **Lime is sacred.** `--color-brand-lime` is the only signature color. Use it for one accent per view — never for decoration.
- **Mono = data.** JetBrains Mono is reserved for numbers, terminal output, and uppercase eyebrows. Never use it for prose.
- **4px grid.** Every spacing and radius value is a multiple of 4.
- **Hairlines, not borders.** Use `--color-border-hairline` for separation. Borders only appear when state demands them (focus, hover).

---

## Token reference

> Token names in CSS: `var(--color-brand-lime)` · in JS: `tokens.color.brand.lime`

### Colors — Brand

| CSS token                       | JS path                       | Value                       | Use                          |
|---------------------------------|-------------------------------|-----------------------------|------------------------------|
| `--color-brand-lime`            | `color.brand.lime`            | `rgb(201, 244, 20)`         | Signature accent, primary CTA |
| `--color-brand-lime-strong`     | `color.brand.limeStrong`      | `rgb(229, 255, 0)`          | Hover state of lime           |
| `--color-brand-lime-10`         | `color.brand.lime10`          | `rgba(201,244,20,0.10)`     | Soft lime fill                |
| `--color-brand-lime-20`         | `color.brand.lime20`          | `rgba(201,244,20,0.20)`     | Active chip background        |
| `--color-brand-lime-30`         | `color.brand.lime30`          | `rgba(201,244,20,0.30)`     | Soft border                   |
| `--color-brand-lime-40`         | `color.brand.lime40`          | `rgba(201,244,20,0.40)`     | Bar chart 2nd-rank            |
| `--color-brand-lime-60`         | `color.brand.lime60`          | `rgba(201,244,20,0.60)`     | Glow                          |

### Colors — Surfaces (dark stack)

| CSS token             | JS path        | Value              | Use                            |
|-----------------------|----------------|--------------------|--------------------------------|
| `--color-bg-0`        | `color.bg[0]`  | `rgb(10, 10, 15)`  | Page background                |
| `--color-bg-1`        | `color.bg[1]`  | `rgb(14, 14, 19)`  | Terminal row, dashboard chrome |
| `--color-bg-2`        | `color.bg[2]`  | `rgb(18, 18, 26)`  | Inset panel, tweak panel       |
| `--color-bg-3`        | `color.bg[3]`  | `rgb(27, 27, 32)`  | Card                           |
| `--color-bg-4`        | `color.bg[4]`  | `rgb(31, 31, 37)`  | Nested card, hover state       |
| `--color-bg-5`        | `color.bg[5]`  | `rgb(42, 41, 47)`  | Input, elevated control        |
| `--color-bg-6`        | `color.bg[6]`  | `rgb(53, 52, 58)`  | Segmented inactive             |
| `--color-surface-glass` | `color.surface.glass` | `rgba(10,10,15,0.80)` | Sticky nav (heavier blur) |
| `--color-surface-glass-soft` | `color.surface.glassSoft` | `rgba(10,10,15,0.72)` | Sticky nav (default) |

### Colors — Foreground (text)

| CSS token              | JS path        | Value                  | Use                          |
|------------------------|----------------|------------------------|------------------------------|
| `--color-fg-1`         | `color.fg[1]`  | `rgb(255, 255, 255)`   | Display, primary headings    |
| `--color-fg-2`         | `color.fg[2]`  | `rgb(228, 225, 233)`   | Body, secondary headings     |
| `--color-fg-3`         | `color.fg[3]`  | `rgb(196, 201, 172)`   | Olive-cream — terminal/meta  |
| `--color-fg-4`         | `color.fg[4]`  | `rgb(148, 163, 184)`   | Muted UI labels              |
| `--color-fg-5`         | `color.fg[5]`  | `rgb(100, 116, 139)`   | Footer, captions             |
| `--color-fg-disabled`  | `color.fg.disabled` | `rgba(196,201,172,0.4)` | Disabled state          |

### Colors — Borders

| CSS token                        | JS path                       | Value                  |
|----------------------------------|-------------------------------|------------------------|
| `--color-border-hairline`        | `color.border.hairline`       | `rgba(68,73,51,0.15)`  |
| `--color-border-hairline-strong` | `color.border.hairlineStrong` | `rgba(68,73,51,0.30)`  |
| `--color-border-slate`           | `color.border.slate`          | `rgba(30,41,59,0.50)`  |
| `--color-border-lime`            | `color.border.lime`           | `rgba(201,244,20,0.30)`|
| `--color-border-lime-soft`       | `color.border.limeSoft`       | `rgba(201,244,20,0.15)`|

### Colors — Data / Semantic

| CSS token              | JS path              | Value             |
|------------------------|----------------------|-------------------|
| `--color-data-blue`    | `color.data.blue`    | `rgb(59,130,246)` |
| `--color-data-blue-soft` | `color.data.blueSoft` | `rgb(96,165,250)` |
| `--color-data-green`   | `color.data.green`   | `rgb(34,197,94)`  |
| `--color-data-yellow`  | `color.data.yellow`  | `rgb(250,204,21)` |
| `--color-data-red`     | `color.data.red`     | `rgb(239,68,68)`  |
| `--color-data-orange`  | `color.data.orange`  | `rgb(249,115,22)` |
| `--color-data-purple`  | `color.data.purple`  | `rgb(168,85,247)` |
| `--color-data-pink`    | `color.data.pink`    | `rgb(236,72,153)` |
| `--color-data-cyan`    | `color.data.cyan`    | `rgb(6,182,212)`  |
| `--color-data-violet`  | `color.data.violet`  | `rgb(139,92,246)` |

### Categorical chart palette

Use `--color-chart-1` through `--color-chart-10` in order for any categorical chart. Order is calibrated for dark-bg readability.

| # | Hue       | Use                  |
|---|-----------|----------------------|
| 1 | Lime      | Primary / "us"       |
| 2 | Green     | Secondary positive   |
| 3 | Orange    | Warm contrast        |
| 4 | Purple    | Cool contrast        |
| 5 | Pink      | Distinct cool        |
| 6 | Blue      | Reference            |
| 7 | Cyan      | Tertiary             |
| 8 | Yellow    | Highlight            |
| 9 | Red       | Negative / alert     |
| 10| Violet    | Last-resort distinct |

### Semantic roles

| CSS token         | Aliases to              |
|-------------------|-------------------------|
| `--color-success` | `--color-brand-lime`    |
| `--color-info`    | `--color-data-blue-soft`|
| `--color-warning` | `--color-data-yellow`   |
| `--color-danger`  | `--color-data-red`      |

---

## Typography

### Families

| CSS token         | JS path             | Family               | Use                                |
|-------------------|---------------------|----------------------|------------------------------------|
| `--font-display`  | `font.family.display` | Plus Jakarta Sans  | Headings, display, hero            |
| `--font-body`     | `font.family.body`  | Inter                | Body, UI labels                    |
| `--font-mono`     | `font.family.mono`  | JetBrains Mono       | Numbers, terminal, eyebrow caps    |

### Size scale

| Token name  | CSS                       | JS                  | Value | Use                          |
|-------------|---------------------------|---------------------|-------|------------------------------|
| 2xs         | `--font-size-2xs`         | `font.size["2xs"]`  | 10px  | Mono caps, eyebrow           |
| xs          | `--font-size-xs`          | `font.size.xs`      | 11px  | Mono small                   |
| sm          | `--font-size-sm`          | `font.size.sm`      | 12px  | Mono data                    |
| base        | `--font-size-base`        | `font.size.base`    | 14px  | Body small, label            |
| md          | `--font-size-md`          | `font.size.md`      | 16px  | Body default                 |
| lg          | `--font-size-lg`          | `font.size.lg`      | 18px  | Lead paragraph               |
| xl          | `--font-size-xl`          | `font.size.xl`      | 20px  | Body large, h4               |
| 2xl         | `--font-size-2xl`         | `font.size["2xl"]`  | 24px  | h3                           |
| 3xl         | `--font-size-3xl`         | `font.size["3xl"]`  | 36px  | Mono display                 |
| 4xl         | `--font-size-4xl`         | `font.size["4xl"]`  | 48px  | h2, section title            |
| 5xl         | `--font-size-5xl`         | `font.size["5xl"]`  | 60px  | h1, final CTA                |
| 6xl         | `--font-size-6xl`         | `font.size["6xl"]`  | 72px  | Hero display                 |
| 7xl         | `--font-size-7xl`         | `font.size["7xl"]`  | 96px  | Display xl                   |

### Weight scale

| Token name    | CSS                          | JS                    | Value |
|---------------|------------------------------|-----------------------|-------|
| regular       | `--font-weight-regular`      | `font.weight.regular` | 400   |
| medium        | `--font-weight-medium`       | `font.weight.medium`  | 500   |
| semibold      | `--font-weight-semibold`     | `font.weight.semibold`| 600   |
| bold          | `--font-weight-bold`         | `font.weight.bold`    | 700   |
| extrabold     | `--font-weight-extrabold`    | `font.weight.extrabold` | 800 |

### Line height & letter spacing

| CSS token                 | Value     | When to use            |
|---------------------------|-----------|------------------------|
| `--line-height-tight`     | 1.0       | Display sizes          |
| `--line-height-snug`      | 1.05      | h1                     |
| `--line-height-headline`  | 1.2       | Card titles            |
| `--line-height-heading`   | 1.33      | h3                     |
| `--line-height-body`      | 1.5       | Default body           |
| `--line-height-relaxed`   | 1.625     | Long-form              |
| `--letter-spacing-tighter`| −4.8px    | Display-xl             |
| `--letter-spacing-tight`  | −3.6px    | Display                |
| `--letter-spacing-h1`     | −3px      | h1                     |
| `--letter-spacing-h2`     | −2.4px    | h2                     |
| `--letter-spacing-h3`     | −1px      | h3                     |
| `--letter-spacing-wide`   | 1px       | Mono caps              |
| `--letter-spacing-wider`  | 1.2px     | Eyebrow                |
| `--letter-spacing-widest` | 1.4px     | Section label          |

### Type role classes (in `typography.css`)

`.ds-display-xl` · `.ds-display` · `.ds-h1` · `.ds-h2` · `.ds-h3` · `.ds-h4` · `.ds-h5`
`.ds-body-lg` · `.ds-body` · `.ds-body-sm` · `.ds-label`
`.ds-mono` · `.ds-mono-sm` · `.ds-mono-data` · `.ds-mono-lg`
`.ds-caps` · `.ds-eyebrow` · `.ds-section-label`

---

## Spacing (4px grid)

| Token name | CSS            | JS           | Value  |
|------------|----------------|--------------|--------|
| 0          | `--space-0`    | `space[0]`   | 0      |
| 1          | `--space-1`    | `space[1]`   | 4px    |
| 2          | `--space-2`    | `space[2]`   | 8px    |
| 3          | `--space-3`    | `space[3]`   | 12px   |
| 4          | `--space-4`    | `space[4]`   | 16px   |
| 5          | `--space-5`    | `space[5]`   | 24px   |
| 6          | `--space-6`    | `space[6]`   | 32px   |
| 7          | `--space-7`    | `space[7]`   | 48px   |
| 8          | `--space-8`    | `space[8]`   | 64px   |
| 9          | `--space-9`    | `space[9]`   | 96px   |
| 10         | `--space-10`   | `space[10]`  | 128px  |

---

## Radii

| Token name | CSS              | JS              | Value     | Use                 |
|------------|------------------|-----------------|-----------|---------------------|
| xs         | `--radius-xs`    | `radius.xs`     | 4px       | Chip, segmented     |
| sm         | `--radius-sm`    | `radius.sm`     | 8px       | Small card, input   |
| md         | `--radius-md`    | `radius.md`     | 12px      | Button, card-inner  |
| lg         | `--radius-lg`    | `radius.lg`     | 16px      | Card, panel         |
| xl         | `--radius-xl`    | `radius.xl`     | 24px      | Hero, CTA banner    |
| pill       | `--radius-pill`  | `radius.pill`   | 9999px    | Eyebrow, chip       |

---

## Shadows

| Token name           | CSS                          | JS                       |
|----------------------|------------------------------|--------------------------|
| sm                   | `--shadow-sm`                | `shadow.sm`              |
| md                   | `--shadow-md`                | `shadow.md`              |
| lg                   | `--shadow-lg`                | `shadow.lg`              |
| xl                   | `--shadow-xl`                | `shadow.xl`              |
| nav                  | `--shadow-nav`               | `shadow.nav`             |
| glow-lime-soft       | `--shadow-glow-lime-soft`    | `shadow.glowLimeSoft`    |
| glow-lime            | `--shadow-glow-lime`         | `shadow.glowLime`        |
| glow-lime-strong     | `--shadow-glow-lime-strong`  | `shadow.glowLimeStrong`  |
| card (composite)     | `--shadow-card`              | `shadow.card`            |
| card-hero (composite)| `--shadow-card-hero`         | `shadow.cardHero`        |

---

## Motion

| Token name             | CSS                    | JS                     | Value                                 |
|------------------------|------------------------|------------------------|---------------------------------------|
| ease-out               | `--ease-out`           | `motion.ease.out`      | `cubic-bezier(0.22, 1, 0.36, 1)`      |
| ease-in-out            | `--ease-in-out`        | `motion.ease.inOut`    | `cubic-bezier(0.65, 0, 0.35, 1)`      |
| duration-fast          | `--duration-fast`      | `motion.duration.fast` | 120ms                                 |
| duration-med           | `--duration-med`       | `motion.duration.med`  | 200ms                                 |
| duration-slow          | `--duration-slow`      | `motion.duration.slow` | 320ms                                 |

---

## Z-index

| Token name       | CSS                   | JS                        | Value | Use            |
|------------------|-----------------------|---------------------------|-------|----------------|
| base             | `--z-base`            | `zIndex.base`             | 0     | Default        |
| raised           | `--z-raised`          | `zIndex.raised`           | 1     | Cards w/ glow  |
| dropdown         | `--z-dropdown`        | `zIndex.dropdown`         | 10    |                |
| sticky           | `--z-sticky`          | `zIndex.sticky`           | 50    | Top nav        |
| overlay          | `--z-overlay`         | `zIndex.overlay`          | 100   |                |
| modal            | `--z-modal`           | `zIndex.modal`            | 150   |                |
| toast            | `--z-toast`           | `zIndex.toast`            | 180   |                |
| tweak-panel      | `--z-tweak-panel`     | `zIndex.tweakPanel`       | 200   | Highest UI     |

---

## Breakpoints

| Token name | CSS                   | JS                  | Value   |
|------------|-----------------------|---------------------|---------|
| sm         | `--breakpoint-sm`     | `breakpoint.sm`     | 640px   |
| md         | `--breakpoint-md`     | `breakpoint.md`     | 768px   |
| lg         | `--breakpoint-lg`     | `breakpoint.lg`     | 1024px  |
| xl         | `--breakpoint-xl`     | `breakpoint.xl`     | 1280px  |
| 2xl        | `--breakpoint-2xl`    | `breakpoint["2xl"]` | 1536px  |

---

## Layout

| Token name    | CSS                 | JS                     | Value    | Use                       |
|---------------|---------------------|------------------------|----------|---------------------------|
| container-max | `--container-max`   | `layout.containerMax`  | 1216px   | Section content max-width |
| container-pad | `--container-pad`   | `layout.containerPad`  | 32px     | Section horizontal padding|
| nav-height    | `--nav-height`      | `layout.navHeight`     | 72px     | Top nav                   |
| nav-blur      | `--surface-nav-blur`| `layout.navBlur`       | 24px     | Top nav backdrop          |

---

## Component classes (in `components.css`)

### Buttons
`.ds-btn` base · `.ds-btn--primary` · `.ds-btn--ghost` · `.ds-btn--dark` · `.ds-btn--compact` · `.ds-btn--block`

### Inputs
`.ds-input` · `.ds-input--mono`

### Cards
`.ds-card` · `.ds-card--inset` · `.ds-card--hero` · `.ds-card--hoverlift` · `.ds-card--lime`

### Badges & pills
`.ds-badge` + `--lime` · `--info` · `--neutral` · `--success` · `--danger`
`.ds-pill` · `.ds-dot-live`

### Navigation
`.ds-nav` · `.ds-nav-link` · `.ds-nav-link--active`

### Filter / tabs
`.ds-chip` · `.ds-chip--active` · `.ds-tab` · `.ds-tab--active` · `.ds-tab__count`

### Data display
`.ds-kpi` (+ `__label`, `__value`, `__value--accent`, `__sub`)
`.ds-terminal` (+ `__prompt`, `__cursor`, `__meta`)
`.ds-legend` (+ `__swatch`, `__label`)

### Layout helpers
`.ds-container` · `.ds-section` · `.ds-section--bordered` · `.ds-dot-grid`

---

## Legacy aliases

The previous codebase used shorter token names — `--brand-lime`, `--bg-0`, `--fg-2`, etc. These are aliased at the bottom of `tokens.css` so they keep working. New code should prefer the namespaced forms (`--color-brand-lime`, `--color-bg-0`).

---

## Changelog

- **v1.0.0** — Initial extraction from AdScout marketing site v1 (May 2026).
