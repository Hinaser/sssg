var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-html');
require('./build-html');

gulp.task('rebuild:html', function(cb){
  return runSequence('clean:html', 'build:html', cb);
});
