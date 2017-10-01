var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./clean-image');
require('./build-image');

/**
 * Copy image files into destination folder.
 * Supported image file extensions are described in the source code below.
 * Please update the code if you'd like to build image files whose extension are other than
 * 'tiff', 'svg', 'jpeg', 'jpg', 'png' or 'gif'.
 */

gulp.task('rebuild:image', function(cb){
  return runSequence('clean:image', 'build:image', cb);
});
