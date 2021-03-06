const gulp = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const through2 = require('through2');

const PATHS = require('../paths');

module.exports = function html() {
  return gulp
    .src(PATHS.build.html)
    .pipe(htmlValidator({ skipWarnings: true }))
    .pipe(
      through2.obj((file, encoding, callback) => {
        callback(null, file);
        if (!file.w3cjs.success) {
          const filename = file.history[0].split('/').slice(-1);
          throw `HTML validation error`;
        }
      })
    );
};
