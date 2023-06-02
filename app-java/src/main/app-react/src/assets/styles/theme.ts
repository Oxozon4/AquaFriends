const size = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const theme = {
  colors: {
    primary: '#3185FC',
    secondary: '#FFFFFF',
    tertiary: '#F3F3F3',
    white: '#FFFFFF',
    lightGrey: '#F7F8FA',
    grey: '#C0C7D6',
    black: '#111111',
    success: '#8FCB81',
    error: '#CB8581',
    warning: '#E1D888',
    placeholder: '#626262',
    red: '#ff0033',
    transparent: 'rgba(0, 0, 0, 0)',
    danger: '#ff0000',
  },
  fontSize: {
    logo: '70px',
    xxl: '32px',
    xl: '24px',
    l: '16px',
    m: '14px',
    s: '12px',
  },
  breakpoints: {
    xs: `(max-width: ${size.sm})`,
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
    xl: `(min-width: ${size.xl})`,
  },
};
