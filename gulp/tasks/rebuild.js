var gulp = require('gulp');
var runSequence = require('run-sequence');
require('./rebuild-css');
require('./rebuild-js');
require('./rebuild-image');
require('./rebuild-lib');
require('./rebuild-html');

gulp.task('rebuild', function(cb){
  runSequence(['rebuild:css', 'rebuild:js', 'rebuild:image', 'rebuild:lib'], 'rebuild:html', cb);
});
