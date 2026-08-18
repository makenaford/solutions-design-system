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

export const surfaces = {
  pageBg: '#070b13',
  textPrimary: '#f0f1f5',
  textSecondary: '#d1d6e0',
  textTertiary: '#d1d6e0',
  cardBgGrey: '#0f131b',
  cardBgBlue: '#6399ff0d',
  cardBgTranslucent: '#ffffff1a',
  cardBgTransparent: '#ffffff00',
} as const

export const action = {
  primaryDefault: '#0b5fff',
  primaryHover: '#377cff',
  primaryActive: '#6399ff',
  primaryInverted: '#ffffff',
  secondaryText: '#0b5fff',
  neutralDefault: '#ffffff',
  neutralInverted: '#ffffff',
  linkDefault: '#74a4ff',
  linkHover: '#bbd2ff',
  linkActive: '#8fb5ff',
  linkVisited: '#c6bfff',
  linkDisabled: '#74a4ff99',
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
    step01: '#ffffff0d',
    step02: '#8c96a908',
    shadow: '#adc9ff33',
  },
  glassLine: {
    1: '#ffffff33',
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
