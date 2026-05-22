/**
 * AdScout Design System — JS Token Object
 * ---------------------------------------
 * Same tokens as tokens.css, exported as an ES module so they can be
 * consumed by Tailwind (see tailwind.config.js), styled-components,
 * Emotion, or any framework that wants type-safe access.
 *
 * Token names mirror the CSS variables minus the `--` prefix and are
 * camelCased for JS ergonomics.
 *
 *   CSS: var(--color-brand-lime)
 *   JS : tokens.color.brand.lime
 */

const tokens = {
  /* ---------- Colors ---------- */
  color: {
    brand: {
      lime:        "rgb(201, 244, 20)",
      limeStrong:  "rgb(229, 255, 0)",
      lime10:      "rgba(201, 244, 20, 0.10)",
      lime20:      "rgba(201, 244, 20, 0.20)",
      lime30:      "rgba(201, 244, 20, 0.30)",
      lime40:      "rgba(201, 244, 20, 0.40)",
      lime60:      "rgba(201, 244, 20, 0.60)",
    },
    bg: {
      0: "rgb(10, 10, 15)",
      1: "rgb(14, 14, 19)",
      2: "rgb(18, 18, 26)",
      3: "rgb(27, 27, 32)",
      4: "rgb(31, 31, 37)",
      5: "rgb(42, 41, 47)",
      6: "rgb(53, 52, 58)",
    },
    surface: {
      glass:     "rgba(10, 10, 15, 0.80)",
      glassSoft: "rgba(10, 10, 15, 0.72)",
    },
    fg: {
      1: "rgb(255, 255, 255)",
      2: "rgb(228, 225, 233)",
      3: "rgb(196, 201, 172)",
      4: "rgb(148, 163, 184)",
      5: "rgb(100, 116, 139)",
      disabled: "rgba(196, 201, 172, 0.40)",
    },
    border: {
      hairline:       "rgba(68, 73, 51, 0.15)",
      hairlineStrong: "rgba(68, 73, 51, 0.30)",
      slate:          "rgba(30, 41, 59, 0.50)",
      lime:           "rgba(201, 244, 20, 0.30)",
      limeSoft:       "rgba(201, 244, 20, 0.15)",
    },
    data: {
      blue:     "rgb(59, 130, 246)",
      blueSoft: "rgb(96, 165, 250)",
      blue20:   "rgba(59, 130, 246, 0.20)",
      green:    "rgb(34, 197, 94)",
      yellow:   "rgb(250, 204, 21)",
      red:      "rgb(239, 68, 68)",
      orange:   "rgb(249, 115, 22)",
      purple:   "rgb(168, 85, 247)",
      pink:     "rgb(236, 72, 153)",
      cyan:     "rgb(6, 182, 212)",
      violet:   "rgb(139, 92, 246)",
    },
    chart: {
      1:  "rgb(201, 244, 20)",
      2:  "rgb(34, 197, 94)",
      3:  "rgb(249, 115, 22)",
      4:  "rgb(168, 85, 247)",
      5:  "rgb(236, 72, 153)",
      6:  "rgb(59, 130, 246)",
      7:  "rgb(6, 182, 212)",
      8:  "rgb(250, 204, 21)",
      9:  "rgb(239, 68, 68)",
      10: "rgb(139, 92, 246)",
    },
    semantic: {
      success: "rgb(201, 244, 20)",
      info:    "rgb(96, 165, 250)",
      warning: "rgb(250, 204, 21)",
      danger:  "rgb(239, 68, 68)",
    },
  },

  /* ---------- Typography ---------- */
  font: {
    family: {
      display: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
      body:    '"Inter", ui-sans-serif, system-ui, sans-serif',
      mono:    '"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',
    },
    size: {
      "2xs":  "10px",
      xs:     "11px",
      sm:     "12px",
      base:   "14px",
      md:     "16px",
      lg:     "18px",
      xl:     "20px",
      "2xl":  "24px",
      "3xl":  "36px",
      "4xl":  "48px",
      "5xl":  "60px",
      "6xl":  "72px",
      "7xl":  "96px",
    },
    weight: {
      regular:   400,
      medium:    500,
      semibold:  600,
      bold:      700,
      extrabold: 800,
    },
    lineHeight: {
      tight:    1.0,
      snug:     1.05,
      headline: 1.2,
      heading:  1.33,
      body:     1.5,
      relaxed:  1.625,
    },
    letterSpacing: {
      tighter: "-4.8px",
      tight:   "-3.6px",
      h1:      "-3px",
      h2:      "-2.4px",
      h3:      "-1px",
      normal:  "0",
      wide:    "1px",
      wider:   "1.2px",
      widest:  "1.4px",
    },
  },

  /* ---------- Spacing (4px grid) ---------- */
  space: {
    0: "0",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "24px",
    6: "32px",
    7: "48px",
    8: "64px",
    9: "96px",
    10: "128px",
  },

  /* ---------- Radii ---------- */
  radius: {
    xs:   "4px",
    sm:   "8px",
    md:   "12px",
    lg:   "16px",
    xl:   "24px",
    pill: "9999px",
  },

  /* ---------- Shadows ---------- */
  shadow: {
    sm:                "0 1px 2px rgba(0, 0, 0, 0.25)",
    md:                "0 8px 10px -6px rgba(0, 0, 0, 0.10), 0 20px 25px -5px rgba(0, 0, 0, 0.10)",
    lg:                "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    xl:                "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
    nav:               "0 20px 40px 0 rgba(0, 0, 0, 0.40)",
    glowLimeSoft:      "0 0 14px rgba(201, 244, 20, 0.50)",
    glowLime:          "0 0 20px rgba(201, 244, 20, 0.10)",
    glowLimeStrong:    "0 0 30px rgba(201, 244, 20, 0.08)",
    card:              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(201, 244, 20, 0.10)",
    cardHero:          "0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 30px rgba(201, 244, 20, 0.08)",
  },

  /* ---------- Motion ---------- */
  motion: {
    ease: {
      out:    "cubic-bezier(0.22, 1, 0.36, 1)",
      inOut:  "cubic-bezier(0.65, 0, 0.35, 1)",
    },
    duration: {
      fast: "120ms",
      med:  "200ms",
      slow: "320ms",
    },
  },

  /* ---------- Z-index ---------- */
  zIndex: {
    base:       0,
    raised:     1,
    dropdown:   10,
    sticky:     50,
    overlay:    100,
    modal:      150,
    toast:      180,
    tweakPanel: 200,
  },

  /* ---------- Breakpoints ---------- */
  breakpoint: {
    sm:  "640px",
    md:  "768px",
    lg:  "1024px",
    xl:  "1280px",
    "2xl": "1536px",
  },

  /* ---------- Layout ---------- */
  layout: {
    containerMax:  "1216px",
    containerPad:  "32px",
    navHeight:     "72px",
    navBlur:       "24px",
  },
};

export default tokens;
export const {
  color, font, space, radius, shadow, motion, zIndex, breakpoint, layout,
} = tokens;
