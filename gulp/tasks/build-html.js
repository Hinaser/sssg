var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var uncache = require('gulp-uncache');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var path = require('path');

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
  
  return gulp.src([config['html']['srcDir'] + "/index.pug"], {base: config['html']['srcDir']})
    .pipe(plumber())
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
