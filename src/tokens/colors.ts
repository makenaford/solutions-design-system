export const brand = {
  primary: '#0b5fff',
  primaryHover: '#377cff',
  primaryActive: '#6399ff',
  lighten1: '#377cff',
  lighten3: '#7aa8ff',
  lighten4: '#adc9ff',
  accent: '#ba8fff',
} as const

export const neutral = {
  0: '#ffffff',
  1: '#1f2531',
  2: '#313948',
  3: '#404b5d',
  4: '#505e73',
  5: '#5e6b84',
  6: '#758096',
  7: '#8c96a9',
  8: '#acb4c2',
  9: '#cbd2dc',
  10: '#eaecf3',
} as const

export const baseNeutral = {
  0: '#f4f6fb',
  1: '#f0f1f5',
  2: '#e0e4eb',
  5: '#8c96a9',
  6: '#667085',
  9: '#212631',
  10: '#070b13',
} as const

export const status = {
  error: '#f3766d',
  errorBase: '#d60e00',
  warning: '#f38a3f',
  success: '#2abb7f',
  info: '#579dff',
  infoLighten2: '#e9f2ff',
  infoDarken2: '#0c66e4',
} as const

/**
 * Theme-dependent surface tokens. Each resolves through a CSS custom property (defined for both
 * themes in `src/theme.css`) instead of a literal value, so the same imported constant repaints
 * live when the `.light`/`.dark` class on an ancestor changes — whether it's consumed via a
 * Tailwind class (`bg-surfaces-pageBg`) or read directly in a JS inline style.
 */
export const surfaces = {
  pageBg: 'var(--sds-page-bg)',
  textPrimary: 'var(--sds-text-primary)',
  textSecondary: 'var(--sds-text-secondary)',
  textTertiary: 'var(--sds-text-tertiary)',
  cardBgGrey: 'var(--sds-card-bg-grey)',
  cardBgBlue: 'var(--sds-card-bg-blue)',
  cardBgTranslucent: 'var(--sds-card-bg-translucent)',
  cardBgTransparent: '#ffffff00',
  border: 'var(--sds-border)',
  borderHover: 'var(--sds-border-hover)',
  borderSubtle: 'var(--sds-border-subtle)',
  divider: 'var(--sds-divider)',
  dividerOpen: 'var(--sds-divider-open)',
  overlayHover: 'var(--sds-overlay-hover)',
} as const

export const action = {
  primaryDefault: '#0b5fff',
  primaryHover: '#377cff',
  primaryActive: '#6399ff',
  primaryInverted: '#ffffff',
  secondaryText: '#0b5fff',
  neutralDefault: '#ffffff',
  neutralInverted: '#ffffff',
  linkDefault: 'var(--sds-link-default)',
  linkHover: 'var(--sds-link-hover)',
  linkActive: 'var(--sds-link-active)',
  linkVisited: 'var(--sds-link-visited)',
  linkDisabled: 'var(--sds-link-disabled)',
} as const

export const components = {
  buttonOutline: {
    text: '#004ad7',
    bgStep01: '#bbd2ff26',
    bgStep02: '#bbd2ff00',
    lineStep01: '#0b5fff',
    lineStep02: '#0b5fff',
    strokeStep03: '#ffffff',
    strokeStep04: '#ffffff12',
  },
  ctaPrimary: {
    bgStep01: '#020a54',
    bgStep02: '#0117ae',
    bgStep03: '#0053f0',
    bgLabel: '#ffffff1a',
  },
  ctaSecondary: {
    text: '#f0f1f5',
    bgLabel: '#1f2531',
  },
  glassCard: {
    step01: 'var(--sds-glass-step-01)',
    step02: 'var(--sds-glass-step-02)',
    tint: 'var(--sds-glass-tint)',
    shadow: '#adc9ff33',
  },
  glassLine: {
    1: 'var(--sds-glass-line-1)',
    2: '#ffffff1a',
  },
  glassTab: {
    bgGradient01: '#ffffff1a',
    bgGradient02: '#7979790d',
    strokeGradient01: '#377cff',
    strokeGradient02: '#ad80f5',
    tabFill1: '#79797908',
    focusShadow: '#1f2531',
  },
  label: {
    tonalText: '#ffffff',
    tonalBg: '#313948',
    gradStep01: '#70a2ff',
    gradStep02: '#ba8fff',
  },
} as const

export const charts = {
  pink: '#e50082',
  pinkLighten4: '#ffb2de',
} as const

export const colors = {
  brand,
  neutral,
  baseNeutral,
  status,
  surfaces,
  action,
  components,
  charts,
} as const
