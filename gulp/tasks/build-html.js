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
var debug = require('gulp-debug');
var path = require('path');

/**
 * Build html file from source pug files.
 * This task builds not only html but also css/js/image files.
 */
gulp.task('build:html', function(cb){
  var startTime = new Date().getTime();
  
  return runSequence(['build:html:root', 'build:html:sub'], function(){
    gutil.log("build:html finished in: " + (new Date().getTime() - startTime) + "ms");
    global.runs !== undefined && global.runs++;
    cb();
  });
});

gulp.task("build:html:root", function(){
  var config = require('../config.js');
  var indexFilter = filter(function(file){
    return path.resolve(config['html']['srcDir'] + "/index.pug") === file.path;
  });
  
  var src = config['html']['srcDir'] + "/*.pug";
  if(global.runs && global.fileChanged){
    src = global.fileChanged;
  }
  
  return gulp.src(src, {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(gulpif(!global.runs, indexFilter))
    .pipe(changed(config['html']['destIndexDir'], {extension: '.html'}))
    .pipe(gulpif(global.runs !== undefined, cached('pug-root')))
    .pipe(pugInheritance({basedir: path.resolve(config['html']['srcDir']), skip: 'node_modules'}))
    .pipe(indexFilter)
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .pipe(uncache({
      rename: false,
      append: "hash",
      srcDir: config['html']['destIndexDir']
    }))
    .pipe(gulp.dest(config['html']['destIndexDir']))
    .pipe(debug({title: "build:html:root"}))
    ;
});

gulp.task("build:html:sub", function(){
  var config = require('../config.js');
  
  var src = [
    config['html']['srcDir'] + "/**/*.pug",
    "!" + config['html']['srcDir'] + "/index.pug"
  ];
  if(global.runs && global.fileChanged){
    src = global.fileChanged;
  }
  
  return gulp.src(src, {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(gulpif(!global.runs, filter(function(file){
      return !/\.part\.pug$/.test(file.relative);
    })))
    .pipe(changed(config['html']['destDir'], {extension: '.html'}))
    .pipe(gulpif(global.runs !== undefined, cached('pug-sub')))
    .pipe(pugInheritance({basedir: path.resolve(config['html']['srcDir']), skip: 'node_modules'}))
    .pipe(filter(function(file){
      return !/\.part\.pug$/.test(file.relative)
        && path.resolve(config['html']['srcDir'] + "/index.pug") !== file.path;
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
    .pipe(debug({title: "build:html:sub"}))
    ;
});
