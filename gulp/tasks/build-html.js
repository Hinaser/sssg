var gulp = require('gulp');
var pug = require('gulp-pug');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var uncache = require('gulp-uncache');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var path = require('path');
var notifier = require('node-notifier');
var chalk = require('chalk');

/**
 * Build html file from source pug files.
 * By using gulp-pug-inheritance, these tasks enable incremental build.
 */
gulp.task('build:html', function(cb){
  var startTime = new Date().getTime();
  
  return runSequence('build:html:index', 'build:html:sub', function(){
    gutil.log("build:html finished in: " + (new Date().getTime() - startTime) + "ms");
    global.runs !== undefined && global.runs++;
    cb();
  });
});

/**
 * A filter which passes *.pug except for partial pug files and root index.pug.
 * Examples for ignored files:
 * aaa.part.pug, _layout.pug, _test/aaa.pug
 */
var content_filter = function(){
  var config = require('../config.js');
  
  return filter(function (file) {
    var part_pug = /\.part\.pug$/.test(file.relative);
    var _pug = /\/_/.test(path.relative(process.cwd(), file.path)) || /^_/.test(file.relative);
    var index_pug = path.resolve(config['html']['srcDir'] + "/index.pug") === file.path;
  
    return !part_pug && !_pug && !index_pug
  });
};

var onError = function (err) {
  var config = require('../config.js');
  
  global.runs !== undefined && global.runs > 0 && !config.silent && notifier.notify({
    title: "Building pug to html failed!",
    message: err.message,
    wait: false,
    closeLabel: "close"
  });
  console.error(err.name);
  console.error(err.message);
};

gulp.task("build:html:index", function(){
  var config = require('../config.js');
  
  var src = config['html']['srcDir'] + "/index.pug";
  
  return gulp.src(src, {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .on('error', onError)
    .pipe(uncache({
      rename: false,
      append: "hash",
      srcDir: config['html']['destIndexDir']
    }))
    .pipe(gulp.dest(config['html']['destIndexDir']))
    .pipe(debug({title: "build:html:index"}))
    ;
});

gulp.task("build:html:sub", function(){
  var config = require('../config.js');
  
  var src = [
    config['html']['srcDir'] + "/**/*.pug",
    "!" + config['html']['srcDir'] + "/index.pug"
  ];
  
  return gulp.src(src, {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(content_filter())
    .pipe(pug({
      pretty: config['html']['pretty']
    }))
    .on('error', onError)
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
