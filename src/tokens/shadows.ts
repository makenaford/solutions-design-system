export const boxShadow = {
  elevationTight1: '0px 1px 3px rgba(45, 45, 45, 0.3)',
  elevationTight4: '0px 2px 7px rgba(45, 45, 45, 0.24)',
  dropdown: '0px 4px 8px rgba(39, 40, 51, 0.12)',
  buttonPressedInner: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
  glassCard: '0px 0px 6px 1px rgba(173, 201, 255, 0.2)',
  focusShadowTab: '-1px 1px 7px 2px rgba(31, 37, 49, 1)',
  /** Soft lift shadow for the hover-elevate micro-interaction on cards and buttons. */
  hoverLift: '0px 12px 24px -8px rgba(11, 95, 255, 0.25)',
} as const

export const backdropBlur = {
  glassCard: '100px',
  focusShadowTab: '40px',
} as const
