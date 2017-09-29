var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var debug = require('gulp-debug');
var gutil = require('gulp-util');

/**
 * Build library js files like jQuery.
 */
gulp.task('build:lib:js', function(){
  var startTime = new Date().getTime();
  var config = require('../config.js');
  
  return gulp.src(config['js']['libDir'] + '/*.js')
    .pipe(newer(config['js']['destDir'] + '/lib.js'))
    .pipe(debug({title: "build:lib:js"}))
    .pipe(plumber())
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.init()))
    .pipe(concat('lib.js'))
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['js']['destDir']))
    .on("end", function(){gutil.log("build:lib:js finished in: " + (new Date().getTime() - startTime) + "ms")})
    ;
});
