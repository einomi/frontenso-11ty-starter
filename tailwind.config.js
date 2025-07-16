module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.njk', './src/**/*.svg'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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
  plugins: [],
};
