var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-lib-js');
require('./build-lib-js');

gulp.task('rebuild:lib:js', function(cb){
  return runSequence('clean:lib:js', 'build:lib:js', cb);
});
