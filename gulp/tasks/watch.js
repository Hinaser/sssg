var gulp = require('gulp');
var config = require('../config.js');

gulp.task('watch-js', ['build:js'], function(){
  gulp.watch(config['js']['srcDir'] + '/**/*.js', ['build:js']);
});

gulp.task('watch-css', ['build:css'], function(){
  gulp.watch(config['css']['srcDir'] + '/**/*.styl', ['build:css']);
});

gulp.task('watch-image', ['build:image'], function(){
  gulp.watch(config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}', ['build:image']);
});

gulp.task('watch-html', ['build:html'], function(){
  gulp.watch(config['html']['srcDir'] + '/**/*.pug', ['build:html']);
});

gulp.task('watch', ['watch-js', 'watch-css', 'watch-html']);

