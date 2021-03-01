const gulpWatch = require('gulp-watch');

const PATHS = require('../paths');
const styles = require('./styles');
const svg = require('./svg');

module.exports = function watch() {
  gulpWatch([PATHS.watch.styles], styles);
  gulpWatch([PATHS.watch.svg], svg);
};
