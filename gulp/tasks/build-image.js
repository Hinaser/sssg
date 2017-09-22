var gulp = require('gulp');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var debug = require('gulp-debug');

/**
 * Copy image files into destination folder.
 * Supported image file extensions are described in the source code below.
 * Please update the code if you'd like to build image files whose extension are other than
 * 'tiff', 'svg', 'jpeg', 'jpg', 'png' or 'gif'.
 */
gulp.task('build:image', function(){
  var config = require('../config.js');
  
  return gulp.src([config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {base: config['image']['srcDir']})
    .pipe(newer(config['image']['destDir']))
    .pipe(debug({title: "build:image"}))
    .pipe(plumber())
    .pipe(gulp.dest(config['image']['destDir']));
});
