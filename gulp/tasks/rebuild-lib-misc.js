var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-lib-misc');
require('./build-lib-misc');

/**
 * Copy raw files to build destination directory.
 */
gulp.task('rebuild:lib:misc', function(cb){
  return runSequence('clean:lib:misc', 'build:lib:misc', cb);
});