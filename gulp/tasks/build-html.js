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
var notifier = require('node-notifier');

/**
 * Build html file from source pug files.
 * By using gulp-pug-inheritance, these tasks enable incremental build.
 */
gulp.task('build:html', function(cb){
  var startTime = new Date().getTime();
  
  return runSequence(['build:html:root', 'build:html:sub'], function(){
    gutil.log("build:html finished in: " + (new Date().getTime() - startTime) + "ms");
    global.runs !== undefined && global.runs++;
    cb();
  });
});

// A filter which only passes the index.pug
var indexFilter = function(){
  var config = require('../config.js');
  
  return filter(function(file){
    return path.resolve(config['html']['srcDir'] + "/index.pug") === file.path;
  });
};

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
  console.error(err.message);
};

gulp.task("build:html:root", function(){
  var config = require('../config.js');
  
  var src = config['html']['srcDir'] + "/*.pug";
  if(global.runs && global.fileChanged){
    src = global.fileChanged;
  }
  
  return gulp.src(src, {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(gulpif(!global.runs, indexFilter()))
    .pipe(changed(config['html']['destIndexDir'], {extension: '.html'}))
    .pipe(gulpif(global.runs !== undefined, cached('pug-root')))
    .pipe(pugInheritance({basedir: path.resolve(config['html']['srcDir']), skip: 'node_modules'}))
    .pipe(indexFilter())
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
    .pipe(gulpif(!global.runs, content_filter()))
    .pipe(changed(config['html']['destDir'], {extension: '.html'}))
    .pipe(gulpif(global.runs !== undefined, cached('pug-sub')))
    .pipe(pugInheritance({basedir: path.resolve(config['html']['srcDir']), skip: 'node_modules'}))
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
