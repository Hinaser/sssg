var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var babel_presets = [
  require.resolve("babel-preset-flow"),
  require.resolve("babel-preset-env")
];

/**
 * Build es6 js files to standard es5 js files.
 */
gulp.task('rebuild:js', ['clean:js'], function(){
  var config = require('../config.js');
  
  return browserify({debug: config['js']['sourcemaps']})
    .add(config['js']['srcDir'] + '/main.js')
    .transform(babelify, {presets: babel_presets})
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulp.dest(config['js']['destDir']));
});
