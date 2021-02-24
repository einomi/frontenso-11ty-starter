const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

const PATHS = require('../paths');
const { IS_PRODUCTION } = require('../env');

module.exports = function images() {
  return gulp
    .src([
      PATHS.src.images,
      `!${PATHS.src.imagesInline}/**.*`,
      `!${PATHS.src.sprites}`,
    ])
    .pipe(
      gulpif(
        IS_PRODUCTION,
        imagemin(
          [
            pngquant(),
            // imagemin.jpegtran({
            //   progressive: true,
            // }),
            imageminMozjpeg({
              quality: 80,
              progressive: true,
            }),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
          ],
          {
            verbose: true,
          }
        )
      )
    )
    .pipe(gulp.dest(PATHS.build.images));
};
