const gulp = require('gulp');

const styles = require('./gulp-tasks/styles');
const svg = require('./gulp-tasks/svg');
const zip = require('./gulp-tasks/zip');
const watch = require('./gulp-tasks/watch');

gulp.task('build', gulp.parallel(styles, svg));

gulp.task('production', gulp.series('build'));

gulp.task('zip', gulp.series('production', zip));

gulp.task('default', gulp.parallel('build', watch));
