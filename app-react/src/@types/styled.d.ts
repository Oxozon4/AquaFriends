// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      white: string;
      lightGrey: string;
      grey: string;
      black: string;
      success: string;
      error: string;
      warning: string;
      placeholder: string;
      red: string;
      transparent: string;
      danger: string;
    };
    fontSize: {
      logo: string;
      xxl: string;
      xl: string;
      l: string;
      m: string;
      s: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
