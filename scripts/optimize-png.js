const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  await imagemin(['dist/images/**/*.png'], {
    destination: 'dist/images',
    plugins: [
      imageminPngquant({
        quality: [0.5, 0.7],
      }),
    ],
  });
})();
