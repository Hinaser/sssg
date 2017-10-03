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
  console.log("Error : " + err.message);
}

/**
 * Build es6 js files to standard es5 js files.
 */
gulp.task('build:js', function(){
  var startTime = new Date().getTime();
  var config = require('../config.js');
  
  var babelRc = config['js']['srcDir'] + '/.babelrc';
  if(fs.existsSync(babelRc)){
    babel_config = loadBabelRc(babelRc);
  }
  
  var b = browserify({debug: config['js']['sourcemaps']});
  b.add(config['js']['srcDir'] + '/main.js').transform(babelify, babel_config);
  
  function bundle(){
    return b
      .bundle()
      .on("error", onError)
      .pipe(source("main.js"))
      .pipe(buffer())
      .pipe(plumber())
      .pipe(gulpif(config['js']['compress'], uglify()))
      .pipe(gulp.dest(config['js']['destDir']))
      .on("end", function(){
        if(typeof(cb) === "function") cb();
        gutil.log("build:js finished in: " + (new Date().getTime() - startTime) + "ms");
      })
      .pipe(debug({title: "build:js"}))
      ;
  }
  
  return bundle();
});

function watchfy(cb){
  var config = require('../config.js');
  
  var babelRc = config['js']['srcDir'] + '/.babelrc';
  if(fs.existsSync(babelRc)){
    babel_config = loadBabelRc(babelRc);
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
  
  function bundle(newCb){
    var startTime = new Date().getTime();
    
    return b
      .bundle()
      .on("error", onError)
      .pipe(source("main.js"))
      .pipe(buffer())
      .pipe(plumber())
      .pipe(gulpif(config['js']['compress'], uglify()))
      .pipe(gulp.dest(config['js']['destDir']))
      .on("end", function(){
        if(typeof(newCb) === "function")
          newCb();
        else if(typeof(cb) === "function")
          cb();
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
 * babel-presets-env and babel-presets-flow are loaded always.
 *
 * @param file
 */
function loadBabelRc(file){
  // Merge presets
  var oldPresets = babel_config.presets.slice();
  var newBabelConfig = JSON.parse(fs.readFileSync(file));
  var newPresets = newBabelConfig.presets;
  
  if(newPresets){
    newPresets = newPresets.map(function(val){
      return require.resolve((val.slice(0,13) === "babel-preset-") ? val : "babel-preset-" + val);
    });
  
    // Merge new and old presets keeping only unique values
    newBabelConfig.presets = oldPresets.concat(newPresets.filter(function(i){
      return oldPresets.indexOf(i) === -1;
    }));
  }
  
  // Load plugins
  var plugins = newBabelConfig.plugins;
  if(plugins){
    plugins = plugins.map(function(val){
      return require.resolve((val.slice(0,13) === "babel-plugin-") ? val : "babel-plugin-" + val);
    });
  
    newBabelConfig.plugins = plugins;
  }
  
  return newBabelConfig;
}

module.exports.watchfy = watchfy;