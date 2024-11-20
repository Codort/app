/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        offwhite: '#e5e5dd',
        offblack: '#313129',
        coral: '#ff6045',
        navy: '#0f1e34',
        cdtpink: '#e3aab2',
        cdtpurple: '#bd99c3',
        cdtyellow: '#fdc000',
        midgrey: '#9f9f97',
        midgray: '#9f9f97',
        lightgrey: '#c7c7bf',
        lightgray: '#c7c7bf',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      fontFamily: {
        sans: [
          'IBM Plex Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
};
