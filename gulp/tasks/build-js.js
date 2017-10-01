var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var debug = require('gulp-debug');
var gutil = require('gulp-util');

var fs = require('fs');

var babel_config = {
  "presets": [
    require.resolve("babel-preset-flow"),
    require.resolve("babel-preset-env")
  ]
};

/**
 * Build es6 js files to standard es5 js files.
 */
gulp.task('build:js', function(){
  var startTime = new Date().getTime();
  var config = require('../config.js');
  
  var babelRc = config['js']['srcDir'] + '/.babelrc';
  if(fs.existsSync(babelRc)){
    var oldPresets = babel_config.presets;
    babel_config = JSON.parse(fs.readFileSync(babelRc));
    var newPresets = babel_config.presets;
    newPresets = newPresets.map(function(val){
      return require.resolve(val);
    });
  
    // Merge new and old presets keeping only unique values
    babel_config.presets = oldPresets.concat(newPresets.filter(function(i){
      return oldPresets.indexOf(i) === -1;
    }));
  }
  
  return browserify({debug: config['js']['sourcemaps']})
    .add(config['js']['srcDir'] + '/main.js')
    .transform(babelify, babel_config)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulp.dest(config['js']['destDir']))
    .pipe(debug({title: "build:js"}))
    .on("end", function(){gutil.log("build:js finished in: " + (new Date().getTime() - startTime) + "ms")})
    ;
});
