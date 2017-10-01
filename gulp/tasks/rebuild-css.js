var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-css');
require('./build-css');

/**
 * Clean css build before building.
 * Other than that behavior is the same as build:css.
 */
gulp.task('rebuild:css', function(cb){
  return runSequence('clean:css', 'build:css', cb);
});
