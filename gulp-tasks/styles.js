const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const assets = require('postcss-assets');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const log = require('fancy-log');
const colors = require('ansi-colors');
const purgecss = require('@fullhuman/postcss-purgecss');

const PATHS = require('../paths');
const { IS_PRODUCTION } = require('../env');

const sassOptions = {
  errLogToConsole: true,
  includePaths: ['./node_modules/'],
};

if (IS_PRODUCTION) {
  sassOptions.outputStyle = 'compressed';
}

const POSTCSS_PROCESSORS = [
  assets({
    loadPaths: [PATHS.src.imagesInline],
    cache: true,
  }),

  IS_PRODUCTION &&
    purgecss({
      content: ['./dist/**/*.{html,js}'],
    }),

  autoprefixer(),
].filter((value) => value);

module.exports = function styles() {
  return gulp
    .src(PATHS.src.styles)
    .pipe(
      plumber({
        errorHandler: function (err) {
          log.error(colors.red(err.message));
          notifier.notify({
            title: 'SASS Compilation Error',
            message: err.message,
          });
        },
      })
    )
    .pipe(gulpif(!IS_PRODUCTION, sourcemaps.init()))
    .pipe(sass(sassOptions))
    .pipe(postcss(POSTCSS_PROCESSORS))
    .pipe(gulpif(!IS_PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(PATHS.build.styles));
};
