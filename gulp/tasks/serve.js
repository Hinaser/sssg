var gulp = require('gulp');
var browsersync = require( 'browser-sync').create();
var runSequence = require('run-sequence');
var path = require('path');

require('./rebuild');
require('./build-css');
require('./build-image');
require('./build-html');
var watchfy = require('./build-js').watchfy;

gulp.task('build:css:sync', ['build:css'], function(){browsersync.reload();});
gulp.task('build:image:sync', ['build:image'], function(){browsersync.reload();});
gulp.task('build:html:sync', ['build:html'], function(){browsersync.reload();});

gulp.task('serve', function(cb){
  global.runs = 0;
  
  return runSequence('rebuild', function(){
    var config = require( '../config.js');
  
    var watcher_stylus = gulp.watch(config['css']['srcDir'] + '/**/*.styl', ['build:css:sync']);
    var watcher_image = gulp.watch(config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}', ['build:image:sync']);
    var watcher_pug = gulp.watch(config['html']['srcDir'] + '/**/*.pug', ['build:html:sync']);
    // gulp.watch is used only for logging what file is updated.
    var watcher_js = gulp.watch(config['js']['srcDir'] + '/**/*.js');
  
    var log_changed_file = function (e) {
      global.fileChanged = e.path;
      console.log("File changed: " + path.relative(process.cwd(), e.path));
    };
  
    watcher_stylus.on("change", log_changed_file);
    watcher_image.on("change", log_changed_file);
    watcher_pug.on("change", log_changed_file);
    watcher_js.on("change", log_changed_file);
  
    return new Promise(function(resolve, reject){
      try {
        browsersync.init({
          server: {
            baseDir: config["html"]["destIndexDir"]
          }
        }, function(){
          // Do incremental build by watchify instead of gulp.watch
          resolve(watchfy(function(){browsersync.reload()})(cb));
        });
      }
      catch(e){
        reject();
      }
    });
  });
});
