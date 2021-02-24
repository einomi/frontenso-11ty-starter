const gulp = require('gulp');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');

const PATHS = require('../paths');

module.exports = function svg() {
  return gulp
    .src(PATHS.src.svg)
    .pipe(
      svgmin((file) => {
        const prefix = path.basename(
          file.relative,
          path.extname(file.relative)
        );
        return {
          plugins: [
            {
              removeUselessStrokeAndFill: false,
            },
            {
              cleanupIDs: {
                prefix: prefix + '-',
                minify: true,
              },
            },
          ],
        };
      })
    )
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(PATHS.build.svg));
};
