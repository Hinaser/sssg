var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var debug = require('gulp-debug');
var gutil = require('gulp-util');
var es = require('event-stream');
var notifier = require('node-notifier');

var fs = require('fs');

var babel_config = {
  "presets": [
    require.resolve("babel-preset-flow"),
    require.resolve("babel-preset-env")
  ]
};

function onError(err){
  var config = require('../config.js');
  
  global.runs !== undefined && global.runs > 0 && !config.silent && notifier.notify({
    title: "Building es6 to javascript failed!",
    message: err.message,
    wait: false,
    closeLabel: "close"
  });
  
  console.error(err.name);
  console.error(err.message);
  console.error(err.stack);
}

/**
 * Build es6 js files to standard es5 js files.
 */
gulp.task('build:js', function(){
  var startTime = new Date().getTime();
  var config = require('../config.js');
  
  var babelRc = config['js']['srcDir'] + '/.babelrc';
  try{
    if(fs.existsSync(babelRc)){
      babel_config = loadBabelRc(babelRc);
    }
  }
  catch(e){
    gutil.log('.babelrc is broken. ' + babelRc);
    onError(e);
    return es.merge([]); // Return empty stream
  }
  
  var b = browserify({debug: config['js']['sourcemaps']});
  b.add(config['js']['srcDir'] + '/main.js').transform(babelify, babel_config);
  
  function bundle(){
    return b
      .bundle()
      .on("error", function(err){
        onError(err);
        this.emit('end');
      })
      .pipe(source("main.js"))
      .pipe(buffer())
      .pipe(plumber())
      .pipe(gulpif(config['js']['compress'], uglify()))
      .pipe(gulp.dest(config['js']['destDir']))
      .on("end", function(){
        gutil.log("build:js finished in: " + (new Date().getTime() - startTime) + "ms");
      })
      .pipe(debug({title: "build:js"}))
      ;
  }
  
  return bundle();
});

/**
 * This function is assumed to be used in task:serve.
 *
 * @param {Function} cb - Function called on every js file change
 * @returns {bundle} You can set callback which runs once watchify starts monitoring
 */
function watchfy(cb){
  var config = require('../config.js');
  
  var babelRc = config['js']['srcDir'] + '/.babelrc';
  try{
    if(fs.existsSync(babelRc)){
      babel_config = loadBabelRc(babelRc);
    }
  }
  catch(e){
    gutil.log('.babelrc is broken. ' + babelRc);
    /**
     * .babelrc is only loaded once.
     * If loading fails, let task:serve fail.
     */
    throw e;
  }
  
  var b = browserify({
    cache: {},
    packageCache: {},
    debug: config['js']['sourcemaps'],
    plugin: [watchify]
  });
  b.add(config['js']['srcDir'] + '/main.js').transform(babelify, babel_config);
  
  b.on('log', gutil.log);
  b.on('update', bundle);
  
  function bundle(cb_only_once){
    var startTime = new Date().getTime();
    
    return b
      .bundle()
      .on("error", function(err){
        onError(err);
        if(typeof(cb_only_once) === "function"){
          cb_only_once();
          cb_only_once = undefined;
        }
        this.emit('end');
      })
      .pipe(source("main.js"))
      .pipe(buffer())
      .pipe(plumber())
      .pipe(gulpif(config['js']['compress'], uglify()))
      .pipe(gulp.dest(config['js']['destDir']))
      .on("end", function(){
        if(typeof(cb_only_once) === "function"){
          cb_only_once();
        }
        else if(typeof(cb) === "function"){
          cb();
        }
        gutil.log("build:js finished in: " + (new Date().getTime() - startTime) + "ms");
      })
      .pipe(debug({title: "build:js"}))
      ;
  }
  
  // To start watching, bundle() must be called at least once.
  return bundle;
}

/**
 * Load babel configuration from .babelrc.
 *
 * @param file
 */
function loadBabelRc(file){
  var _babelrc = fs.readFileSync(file);
  var json = JSON.parse(_babelrc);
  
  console.log("Loading " + file);
  console.log(JSON.stringify(json));
  
  return json;
}

module.exports.watchfy = watchfy;