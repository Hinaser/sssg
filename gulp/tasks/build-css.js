var gulp = require('gulp');
var gulpif = require('gulp-if');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var debug = require('gulp-debug');

/**
 * Build css file from stylus based source files.
 * Since this task only sees `main.styl`, any stylus files
 * not `@import`ed by the main.styl will be ignored.
 * If source stylus file is not modified(update time of dest file is newer than source files),
 * it skips building.
 */
gulp.task('build:css', function(){
  var startTime = new Date().getTime();
  var config = require('../config.js');
  
  return gulp.src(config['css']['srcDir'] + '/main.styl')
    .pipe(plumber())
    .on('error', function(err){
      console.error(err.message);
    })
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.init()))
    .pipe(stylus({
      'compress': config['css']['compress'],
      'include css': true
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['css']['destDir']))
    .pipe(debug({title: "build:css"}))
    .on("end", function(){gutil.log("build:css finished in: " + (new Date().getTime() - startTime) + "ms")})
    ;
});
