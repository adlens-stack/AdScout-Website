/**
 * AdScout Design System — Tailwind v3 / v4 config
 * -----------------------------------------------
 * Drop into your project and `extend` from it. Every utility class
 * Tailwind generates maps to an AdScout token, so you never write
 * raw hex / pixel values in app code.
 *
 *   // tailwind.config.js (your project)
 *   const adscout = require("@adscout/design-system/tailwind.config");
 *   module.exports = {
 *     presets: [adscout],
 *     content: [...your paths],
 *   };
 *
 * Resulting utilities (sample):
 *   bg-brand-lime    →  rgb(201, 244, 20)
 *   text-fg-3        →  olive-cream terminal meta
 *   rounded-lg       →  16px
 *   shadow-card      →  full card shadow + lime glow
 *   font-mono        →  JetBrains Mono
 *   text-4xl         →  48px
 */

import tokens from "./tokens.js";

const { color, font, space, radius, shadow, motion, zIndex, breakpoint, layout } = tokens;

/** Helper: flatten nested color tree to Tailwind's "name-shade" map */
const flattenColors = (obj, prefix = "") => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}-${k}` : k;
    if (typeof v === "string") out[key] = v;
    else if (v && typeof v === "object") Object.assign(out, flattenColors(v, key));
  }
  return out;
};

const colors = {
  /* Brand */
  "brand-lime":         color.brand.lime,
  "brand-lime-strong":  color.brand.limeStrong,
  "brand-lime-10":      color.brand.lime10,
  "brand-lime-20":      color.brand.lime20,
  "brand-lime-30":      color.brand.lime30,
  "brand-lime-40":      color.brand.lime40,
  "brand-lime-60":      color.brand.lime60,

  /* Backgrounds */
  "bg-0": color.bg[0], "bg-1": color.bg[1], "bg-2": color.bg[2],
  "bg-3": color.bg[3], "bg-4": color.bg[4], "bg-5": color.bg[5], "bg-6": color.bg[6],
  "surface-glass":      color.surface.glass,
  "surface-glass-soft": color.surface.glassSoft,

  /* Foregrounds */
  "fg-1": color.fg[1], "fg-2": color.fg[2], "fg-3": color.fg[3],
  "fg-4": color.fg[4], "fg-5": color.fg[5],
  "fg-disabled": color.fg.disabled,

  /* Borders */
  "border-hairline":        color.border.hairline,
  "border-hairline-strong": color.border.hairlineStrong,
  "border-slate":           color.border.slate,
  "border-lime":            color.border.lime,
  "border-lime-soft":       color.border.limeSoft,

  /* Data + chart palette */
  ...flattenColors({ data: color.data }),
  ...flattenColors({ chart: color.chart }),

  /* Semantic */
  success: color.semantic.success,
  info:    color.semantic.info,
  warning: color.semantic.warning,
  danger:  color.semantic.danger,
};

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class", // AdScout is dark-first; this enables `light:` override hooks
  theme: {
    /* Override (not extend) the defaults — every color in the theme is ours */
    colors,

    /* Spacing — exposes Tailwind's p-1, m-5, gap-7, etc to our 4px grid */
    spacing: {
      0:  space[0],  1:  space[1],  2:  space[2],  3:  space[3],
      4:  space[4],  5:  space[5],  6:  space[6],  7:  space[7],
      8:  space[8],  9:  space[9],  10: space[10],
    },

    /* Font families */
    fontFamily: {
      display: font.family.display.split(",").map(s => s.trim().replace(/"/g, "")),
      body:    font.family.body.split(",").map(s => s.trim().replace(/"/g, "")),
      sans:    font.family.body.split(",").map(s => s.trim().replace(/"/g, "")),
      mono:    font.family.mono.split(",").map(s => s.trim().replace(/"/g, "")),
    },

    /* Font sizes — [size, { lineHeight, letterSpacing }] */
    fontSize: {
      "2xs": [font.size["2xs"], { lineHeight: String(font.lineHeight.body),  letterSpacing: font.letterSpacing.wide   }],
      "xs":  [font.size.xs,     { lineHeight: String(font.lineHeight.body),  letterSpacing: font.letterSpacing.normal }],
      "sm":  [font.size.sm,     { lineHeight: String(font.lineHeight.body),  letterSpacing: font.letterSpacing.normal }],
      "base":[font.size.base,   { lineHeight: String(font.lineHeight.body),  letterSpacing: font.letterSpacing.normal }],
      "md":  [font.size.md,     { lineHeight: String(font.lineHeight.body),  letterSpacing: font.letterSpacing.normal }],
      "lg":  [font.size.lg,     { lineHeight: String(font.lineHeight.relaxed),letterSpacing: font.letterSpacing.normal }],
      "xl":  [font.size.xl,     { lineHeight: String(font.lineHeight.relaxed),letterSpacing: font.letterSpacing.normal }],
      "2xl": [font.size["2xl"], { lineHeight: String(font.lineHeight.heading),letterSpacing: font.letterSpacing.normal }],
      "3xl": [font.size["3xl"], { lineHeight: String(font.lineHeight.snug),  letterSpacing: font.letterSpacing.h3     }],
      "4xl": [font.size["4xl"], { lineHeight: String(font.lineHeight.tight), letterSpacing: font.letterSpacing.h2     }],
      "5xl": [font.size["5xl"], { lineHeight: String(font.lineHeight.snug),  letterSpacing: font.letterSpacing.h1     }],
      "6xl": [font.size["6xl"], { lineHeight: String(font.lineHeight.tight), letterSpacing: font.letterSpacing.tight  }],
      "7xl": [font.size["7xl"], { lineHeight: String(font.lineHeight.tight), letterSpacing: font.letterSpacing.tighter}],
    },

    fontWeight: {
      regular:   String(font.weight.regular),
      medium:    String(font.weight.medium),
      semibold:  String(font.weight.semibold),
      bold:      String(font.weight.bold),
      extrabold: String(font.weight.extrabold),
    },

    lineHeight: {
      tight:    String(font.lineHeight.tight),
      snug:     String(font.lineHeight.snug),
      headline: String(font.lineHeight.headline),
      heading:  String(font.lineHeight.heading),
      body:     String(font.lineHeight.body),
      relaxed:  String(font.lineHeight.relaxed),
    },

    letterSpacing: {
      tighter: font.letterSpacing.tighter,
      tight:   font.letterSpacing.tight,
      h1:      font.letterSpacing.h1,
      h2:      font.letterSpacing.h2,
      h3:      font.letterSpacing.h3,
      normal:  font.letterSpacing.normal,
      wide:    font.letterSpacing.wide,
      wider:   font.letterSpacing.wider,
      widest:  font.letterSpacing.widest,
    },

    borderRadius: {
      none: "0",
      xs:   radius.xs,
      sm:   radius.sm,
      md:   radius.md,
      lg:   radius.lg,
      xl:   radius.xl,
      pill: radius.pill,
      full: radius.pill,
    },

    boxShadow: {
      none:               "none",
      sm:                 shadow.sm,
      md:                 shadow.md,
      lg:                 shadow.lg,
      xl:                 shadow.xl,
      nav:                shadow.nav,
      "glow-lime-soft":   shadow.glowLimeSoft,
      "glow-lime":        shadow.glowLime,
      "glow-lime-strong": shadow.glowLimeStrong,
      card:               shadow.card,
      "card-hero":        shadow.cardHero,
    },

    transitionTimingFunction: {
      out:    motion.ease.out,
      "in-out": motion.ease.inOut,
    },

    transitionDuration: {
      fast: motion.duration.fast,
      med:  motion.duration.med,
      slow: motion.duration.slow,
    },

    zIndex: {
      base:         String(zIndex.base),
      raised:       String(zIndex.raised),
      dropdown:     String(zIndex.dropdown),
      sticky:       String(zIndex.sticky),
      overlay:      String(zIndex.overlay),
      modal:        String(zIndex.modal),
      toast:        String(zIndex.toast),
      "tweak-panel":String(zIndex.tweakPanel),
    },

    screens: {
      sm:  breakpoint.sm,
      md:  breakpoint.md,
      lg:  breakpoint.lg,
      xl:  breakpoint.xl,
      "2xl": breakpoint["2xl"],
    },

    extend: {
      maxWidth: {
        container: layout.containerMax,
      },
      height: {
        nav: layout.navHeight,
      },
      backdropBlur: {
        nav: layout.navBlur,
      },
    },
  },

  plugins: [],
};

export default config;
module.exports = config;
