import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-primary-50: #f4f5f8;
  --color-primary-100: #e6e8ef;
  --color-primary-200: #cdd1df;
  --color-primary-300: #aeb4ca;
  --color-primary-400: #8b93b1;
  --color-primary-500: #687199;
  --color-primary-600: #515977;
  --color-primary-700: #3d405b;
  --color-primary-800: #2f3247;
  --color-primary-900: #212333;

  --color-secondary-50: #fdf4f4;
  --color-secondary-100: #f9e3e3;
  --color-secondary-200: #f2c2c3;
  --color-secondary-300: #e89a9b;
  --color-secondary-400: #dc6a6b;
  --color-secondary-500: #c94a4b;
  --color-secondary-600: #b53738;
  --color-secondary-700: #9e2a2b;
  --color-secondary-800: #7c2021;
  --color-secondary-900: #581617;

  --bg-main: #fbfaf8;
  --bg-card: #f3f3f3;

  --text-main: #252422;
  --text-light: #fffcf2;

  --badge-green:#32bb44;
  --badge-gray:#e4e4e4;
  --badge-secondary:#9e2a2b;
  --badge-warn:#e49f20;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.5);

  --font-sm: 14px;
  --font-md: 16px;
  --font-lg: 20px;
  --font-xl: 24px;

  /* PRIMARY (cool slate / blue-gray shift) */



  
}
[data-theme="dark"] {
  /* PRIMARY (cool slate / blue-gray shift) */
  --color-primary-50: #1a1c24;
  --color-primary-100: #222533;
  --color-primary-200: #2c3142;
  --color-primary-300: #3a4054;
  --color-primary-400: #4b5270;
  --color-primary-500: #646c8f;
  --color-primary-600: #8088a8;
  --color-primary-700: #a0a7c0;
  --color-primary-800: #c1c6d8;
  --color-primary-900: #e2e4ee;

  /* SECONDARY (muted red/rose for dark UI safety) */
  --color-secondary-50: #2a1616;
  --color-secondary-100: #3a1d1d;
  --color-secondary-200: #522626;
  --color-secondary-300: #6e3031;
  --color-secondary-400: #8b3d3e;
  --color-secondary-500: #a94c4d;
  --color-secondary-600: #c15c5d;
  --color-secondary-700: #d67a7b;
  --color-secondary-800: #e6a3a4;
  --color-secondary-900: #f3cfcf;

  /* BACKGROUNDS */
  --bg-main: #0f1115;
  --bg-card: #171a21;

  /* TEXT */
  --text-main: #f5f5f5;
  --text-light: #c7c7c7;

  /* BADGES (adjusted for dark contrast) */
  --badge-green: #2ecc71;
  --badge-gray: #3a3f4a;
  --badge-secondary: #ff6b6b;
  --badge-warn: #f4b400;
}
body {
  transition: all 0.2s;
}
`;

export default GlobalStyles;
