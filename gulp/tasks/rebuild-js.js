var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-js');
require('./build-js');

/**
 * Build es6 js files to standard es5 js files.
 */
gulp.task('rebuild:js', function(cb){
  return runSequence('clean:js', 'build:js', cb);
});
