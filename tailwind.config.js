const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: '30px',
    },
    extend: {
      spacing: {
        0.75: '0.19rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.njk', './src/**/*.svg'],
};
