const gulp = require('gulp');

const scss = require('./gulp-tasks/styles');
const tailwind = require('./gulp-tasks/tailwind');
const svg = require('./gulp-tasks/svg');
const zip = require('./gulp-tasks/zip');
const watch = require('./gulp-tasks/watch');
// const w3cValidator = require('./gulp-tasks/w3c-validator');

gulp.task('svg', svg);

gulp.task('styles', gulp.parallel(scss, tailwind));

gulp.task('zip', zip);

// gulp.task('w3c-validator', w3cValidator);

gulp.task('default', gulp.parallel('styles', watch));
