var gulp = require('gulp');
var plumber = require('gulp-plumber');
require('./clean-image');

/**
 * Copy image files into destination folder.
 * Supported image file extensions are described in the source code below.
 * Please update the code if you'd like to build image files whose extension are other than
 * 'tiff', 'svg', 'jpeg', 'jpg', 'png' or 'gif'.
 */

gulp.task('rebuild:image', ['clean:image'], function(){
  var config = require('../config.js');
  
  return gulp.src([config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {base: config['image']['srcDir']})
    .pipe(plumber())
    .pipe(gulp.dest(config['image']['destDir']));
});
