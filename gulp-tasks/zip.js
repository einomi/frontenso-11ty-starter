const gulp = require('gulp');
const gulpZip = require('gulp-zip');

const PATHS = require('../paths');

module.exports = function zipArchive() {
  return gulp
    .src(PATHS.build.root + '/**/*')
    .pipe(gulpZip(`${PATHS.build.root.replace('/', '')}.zip`))
    .pipe(gulp.dest('./'));
};
