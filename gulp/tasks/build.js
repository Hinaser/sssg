var gulp = require('gulp');
var runSequence = require('run-sequence');
require('./build-css');
require('./build-js');
require('./build-image');
require('./build-lib');
require('./build-html');

gulp.task('build', function(cb){
  runSequence(['build:css', 'build:js', 'build:image', 'build:lib'], 'build:html', cb);
});

