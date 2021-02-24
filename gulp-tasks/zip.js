const gulp = require('gulp');
const gulpZip = require('gulp-zip');

const PATHS = require('../paths');

module.exports = function zipArchive() {
  return gulp
    .src(PATHS.build.html + '/**/*')
    .pipe(gulpZip(`${PATHS.build.html}.zip`))
    .pipe(gulp.dest('./'));
};
