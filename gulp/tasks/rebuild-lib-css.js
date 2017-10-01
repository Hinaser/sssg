var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-lib-css');
require('./build-lib-css');

/**
 * Build library css files like Bootstrap.
 */
gulp.task('rebuild:lib:css', function(cb){
  return runSequence('clean:lib:css', 'build:lib:css', cb);
});
