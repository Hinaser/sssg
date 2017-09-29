var gulp = require('gulp');
var pug = require('gulp-pug');
var pugInheritance = require('gulp-pug-inheritance');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var uncache = require('gulp-uncache');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var path = require('path');

var debug = require('gulp-debug');

/**
 * Build html file from source pug files.
 * This task builds not only html but also css/js/image files.
 */
gulp.task('build:html', function(){
  var startTime = new Date().getTime();
  
  return runSequence(['build:html:root', 'build:html:sub'], function(){
    gutil.log("build:html finished in: " + (new Date().getTime() - startTime) + "ms");
  });
});

gulp.task("build:html:root", function(){
  var config = require('../config.js');
  
  return gulp.src([config['html']['srcDir'] + "/**/*.pug"], {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(changed(config['html']['destIndexDir'], {extension: '.html'}))
    .pipe(gulpif(global.isWatching, cached('pug')))
    .pipe(pugInheritance({basedir: path.resolve(config['html']['srcDir']), skip: 'node_modules'}))
    .pipe(filter(function(file){
      return path.resolve(config['html']['srcDir'] + "/index.pug") === file.path;
    }))
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .pipe(uncache({
      rename: false,
      append: "hash",
      srcDir: config['html']['destIndexDir']
    }))
    .pipe(gulp.dest(config['html']['destIndexDir']))
    ;
});

gulp.task("build:html:sub", function(){
  var config = require('../config.js');
  
  return gulp.src([
    config['html']['srcDir'] + "/**/*.pug",
    "!" + config['html']['srcDir'] + "/index.pug"
  ], {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(changed(config['html']['destDir'], {extension: '.html'}))
    .pipe(gulpif(global.isWatching, cached('pug')))
    .pipe(pugInheritance({basedir: path.resolve(config['html']['srcDir']), skip: 'node_modules'}))
    .pipe(filter(function(file){
      return !/^.*\.part\.pug/.test(file.relative);
    }))
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .pipe(uncache({
      rename: false,
      append: "hash",
      srcFileMap: function(filename){
        var fixedPath = filename.split(/[/]/)
          .map(function(val){
            if(val === ".."){
              return null;
            }
            return val;
          })
          .filter(function(s){ return s })
          .join("/");
        return path.resolve(config['html']['destDir'] + "/../" + fixedPath);
      }
    }))
    .pipe(gulp.dest(config['html']['destDir']))
    ;
});
