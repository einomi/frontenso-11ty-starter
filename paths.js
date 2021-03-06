module.exports = {
  build: {
    styles: 'dist/css/',
    images: 'dist/images/',
    sprites: 'dist/images/sprites/',
    svg: 'dist/svg/',
  },
  src: {
    styles: 'src/sass/styles.scss',
    tailwind: 'src/sass/tailwind.css',
    images: 'src/images/**/*.*',
    imagesInline: 'src/images/inline/',
    sprites: 'src/images/sprites/*.png',
    svg: 'src/svg/**/*.svg',
  },
  watch: {
    styles: 'src/**/*.{sass,scss}',
    tailwind: 'src/sass/tailwind.css',
    svg: 'src/svg/**/*.svg',
  },
};
