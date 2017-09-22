var es = require('event-stream');
var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var uncache = require('gulp-uncache');
require('./clean-html');

gulp.task('rebuild:html', ['clean:html'], function(){
  var config = require('../config.js');
  
  var indexStream = gulp.src([config['html']['srcDir'] + "/index.pug"], {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .pipe(uncache({
      rename: false,
      append: "hash",
      srcDir: config['html']['destIndexDir']
    }))
    .pipe(gulp.dest(config['html']['destIndexDir']));
  
  var subStream = gulp.src([
    config['html']['srcDir'] + "/**/*.pug",
    "!" + config['html']['srcDir'] + "/index.pug",
    "!" + config['html']['srcDir'] + "/**/*.part.pug"
  ], {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .pipe(uncache({
      rename: false,
      append: "hash",
      srcDir: config['html']['destDir']
    }))
    .pipe(gulp.dest(config['html']['destDir']));
  
  return es.merge([
    indexStream,
    subStream
  ]);
});
