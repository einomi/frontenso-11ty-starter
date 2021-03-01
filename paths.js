module.exports = {
  build: {
    styles: 'dist/css/',
    images: 'dist/assets/images/',
    sprites: 'dist/assets/images/sprites/',
    svg: 'dist/assets/svg/',
  },
  src: {
    styles: 'src/sass/styles.scss',
    images: 'src/assets/images/**/*.*',
    imagesInline: 'src/assets/images/inline/',
    sprites: 'src/assets/images/sprites/*.png',
    svg: 'src/assets/svg/**/*.svg',
  },
  watch: {
    styles: 'src/**/*.{sass,scss}',
    svg: 'src/assets/svg/**/*.svg',
  },
};
