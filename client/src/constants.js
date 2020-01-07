export const COLORS = {
  primary: 'hsl(258, 100%, 50%)',
};

export const UNIT = 8;

export const BREAKPOINT_SIZES = {
  sm: 540,
  md: 900,
  lg: 1125,
};

export const BREAKPOINTS = {
  sm: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
  mdMin: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
  lgMin: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
};

export const THEME = {
  colors: COLORS,
  unit: UNIT,
  breakpoints: BREAKPOINTS,
};
