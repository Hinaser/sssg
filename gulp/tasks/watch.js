var gulp = require('gulp');
require('./build-js');
require('./build-css');
require('./build-image');
require('./build-html');

gulp.task('watch-js', ['build:js'], function(){
  var config = require('../config.js');
  
  return gulp.watch(config['js']['srcDir'] + '/**/*.js', ['build:js']);
});

gulp.task('watch-css', ['build:css'], function(){
  var config = require('../config.js');
  
  return gulp.watch(config['css']['srcDir'] + '/**/*.styl', ['build:css']);
});

gulp.task('watch-image', ['build:image'], function(){
  var config = require('../config.js');
  
  return gulp.watch(config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}', ['build:image']);
});

gulp.task('watch-html', ['build:html'], function(){
  var config = require('../config.js');
  
  return gulp.watch(config['html']['srcDir'] + '/**/*.pug', ['build:html']);
});

gulp.task('watch', ['watch-js', 'watch-css', 'watch-html']);

