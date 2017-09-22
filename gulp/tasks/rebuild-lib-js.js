var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
require('./clean-lib-js');

gulp.task('rebuild:lib:js', ['clean:lib:js'], function(){
  var config = require('../config.js');
  
  return gulp.src(config['js']['libDir'] + '/*.js')
    .pipe(plumber())
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.init()))
    .pipe(concat('lib.js'))
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['js']['destDir']));
});
