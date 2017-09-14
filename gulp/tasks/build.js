var es = require('event-stream');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var newer = require('gulp-newer');
var gutil = require('gulp-util');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uncache = require('gulp-uncache');
var debug = require('gulp-debug');

var node_modules = __dirname + "/../../node_modules/";
var babel_presets = [
  node_modules + "babel-preset-flow",
  node_modules + "babel-preset-env"
];

/**
 * Build css file from stylus based source files.
 * Since this task only sees `main.styl`, any stylus files
 * not `@import`ed by the main.styl will be ignored.
 * If source stylus file is not modified(update time of dest file is newer than source files),
 * it skips building.
 */
gulp.task('build:css', function(){
  var config = require('../config.js');
  
  return gulp.src([config['css']['srcDir'] + '/**/*.styl', "!" + config['css']['srcDir'] + "/*.part.styl"])
    .pipe(plumber())
    .on('error', function(err){
      console.error(err.message);
    })
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.init()))
    .pipe(stylus({
      'compress': config['css']['compress'],
      'include css': true
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['css']['destDir']))
});

/**
 * Clean css build before building.
 * Other than that behavior is the same as build:css.
 */
gulp.task('rebuild:css', ['clean:css'], function(){
  var config = require('../config.js');
  
  return gulp.src(config['css']['srcDir'] + '/main.styl')
    .pipe(plumber())
    .on('error', function(err){
      console.error(err.message);
    })
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.init()))
    .pipe(stylus({
      'compress': config['css']['compress'],
      'include css': true
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['css']['destDir']))
});

/**
 * Build es6 js files to standard es5 js files.
 */
gulp.task('build:js', function(){
  var config = require('../config.js');
  
  return browserify({debug: config['js']['sourcemaps']})
    .add(config['js']['srcDir'] + '/main.js')
    .transform(babelify, {presets: babel_presets})
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(debug({title: "build:js"}))
    .pipe(plumber())
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulp.dest(config['js']['destDir']));
});

gulp.task('rebuild:js', ['clean:js'], function(){
  var config = require('../config.js');
  
  return browserify({debug: config['js']['sourcemaps']})
    .add(config['js']['srcDir'] + '/main.js')
    .transform(babelify, {presets: babel_presets})
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulp.dest(config['js']['destDir']));
});

/**
 * Copy image files into destination folder.
 * Supported image file extensions are described in the source code below.
 * Please update the code if you'd like to build image files whose extension are other than
 * 'tiff', 'svg', 'jpeg', 'jpg', 'png' or 'gif'.
 */
gulp.task('build:image', function(){
  var config = require('../config.js');
  
  return gulp.src([config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {base: config['image']['srcDir']})
    .pipe(newer(config['image']['destDir']))
    .pipe(debug({title: "build:image"}))
    .pipe(plumber())
    .pipe(gulp.dest(config['image']['destDir']));
});

gulp.task('rebuild:image', ['clean:image'], function(){
  var config = require('../config.js');
  
  return gulp.src([config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {base: config['image']['srcDir']})
    .pipe(plumber())
    .pipe(gulp.dest(config['image']['destDir']));
});

/**
 * Build html file from source pug files.
 * This task builds not only html but also css/js/image files.
 */
gulp.task('build:html', function(){
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

gulp.task('rebuild:html', function(){
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

//gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:image', 'build:lib']);
gulp.task('build', function(cb){
  var config = require('../config.js');
  
  runSequence(['build:css', 'build:js', 'build:image', 'build:lib'], 'build:html', cb);
});

//gulp.task('rebuild', ['rebuild:html', 'rebuild:css', 'rebuild:js', 'rebuild:image', 'rebuild:lib']);
gulp.task('rebuild', function(cb){
  var config = require('../config.js');
  
  runSequence(['rebuild:css', 'rebuild:js', 'rebuild:image', 'rebuild:lib'], 'rebuild:html', cb);
});

/**
 * Build library js files like jQuery.
 */
gulp.task('build:lib:js', function(){
  var config = require('../config.js');
  
  return gulp.src(config['js']['libDir'] + '/*.js')
    .pipe(newer(config['js']['destDir'] + '/lib.js'))
    .pipe(debug({title: "build:lib:js"}))
    .pipe(plumber())
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.init()))
    .pipe(concat('lib.js'))
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['js']['destDir']));
});

gulp.task('rebuild:lib:js', ['clean:lib:js'], function(){
  var config = require('../config.js');
  
  return gulp.src(config['js']['libDir'] + '/*.js')
    .pipe(plumber())
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.init()))
    .pipe(concat('lib.js'))
    .pipe(gulpif(config['js']['compress'], uglify()))
    .pipe(gulpif(config['js']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['js']['destDir']));
});

/**
 * Build library css files like Bootstrap.
 */
gulp.task('build:lib:css', function(){
  var config = require('../config.js');
  
  return gulp.src(config['css']['libDir'] + '/*.css')
    .pipe(newer(config['css']['destDir'] + '/lib.css'))
    .pipe(debug({title: "build:lib:css"}))
    .pipe(plumber())
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.init()))
    .pipe(gulpif(config['css']['compress'], cleanCSS()))
    .pipe(concat('lib.css'))
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['css']['destDir']))
});

gulp.task('rebuild:lib:css', ['clean:lib:css'], function(){
  var config = require('../config.js');
  
  return gulp.src(config['css']['libDir'] + '/*.css')
    .pipe(plumber())
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.init()))
    .pipe(gulpif(config['css']['compress'], cleanCSS()))
    .pipe(concat('lib.css'))
    .pipe(gulpif(config['css']['sourcemaps'], sourcemaps.write()))
    .pipe(gulp.dest(config['css']['destDir']))
});

/**
 * Build css/js library files.
 */
gulp.task('build:lib', ['build:lib:js', 'build:lib:css']);
gulp.task('rebuild:lib', ['rebuild:lib:js', 'rebuild:lib:css']);
