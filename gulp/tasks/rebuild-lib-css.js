var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
require('./clean-lib-css');

/**
 * Build library css files like Bootstrap.
 */
gulp.task('rebuild:lib:css', ['clean:lib:css'], function(){
  var config = require('../config.js');
  
  return gulp.src(config['css']['libDir'] + '/*.css')
    .pipe(plumber())
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.init()))
    .pipe(gulpif(config['css']['compress'], cleanCSS()))
    .pipe(concat('lib.css'))
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['css']['destDir']))
});