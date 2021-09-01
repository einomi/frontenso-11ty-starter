const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const gulpif = require('gulp-if');
const notifier = require('node-notifier');
const colors = require('ansi-colors');
const plumber = require('gulp-plumber');
const log = require('fancy-log');

const PATHS = require('../paths');
const { IS_PRODUCTION } = require('../env');

module.exports = function styles() {
  return gulp
    .src(PATHS.src.tailwind)
    .pipe(
      plumber({
        errorHandler: function (err) {
          log.error(colors.red(err.message));
          notifier.notify({
            title: 'TailwindCSS Compilation Error',
            message: err.message,
          });
        },
      })
    )
    .pipe(postcss())
    .pipe(gulpif(IS_PRODUCTION, cssmin({ processImport: false })))
    .pipe(gulp.dest(PATHS.build.styles));
};
