var gulp = require('gulp');
var gulpif = require('gulp-if');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
require('./clean-css');

/**
 * Clean css build before building.
 * Other than that behavior is the same as build:css.
 */
gulp.task('rebuild:css', ['clean:css'], function(){
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
});
