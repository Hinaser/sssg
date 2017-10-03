var gulp = require('gulp');
var browsersync = require( 'browser-sync').create();
var runSequence = require('run-sequence');
var path = require('path');
var notifier = require('node-notifier');

require('./rebuild');
require('./build-css');
require('./build-image');
require('./build-html');
var watchfy = require('./build-js').watchfy;

function onSuccessBuild(){
  var config = require( '../config.js');
  
  !config["silent"] && notifier.notify({
    title: "Build success!",
    message: "Check refreshed page on your browser.",
    wait: false,
    closeLabel: "close"
  });
  browsersync.reload();
}

gulp.task('build:css:sync', ['build:css'], onSuccessBuild);
gulp.task('build:image:sync', ['build:image'], onSuccessBuild);
gulp.task('build:html:sync', ['build:html'], onSuccessBuild);

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
  
    return watchfy(onSuccessBuild)(function(){
      browsersync.init({
        server: {
          baseDir: config["html"]["destIndexDir"]
        }
      }, function(){
        // Do incremental build by watchify instead of gulp.watch
        cb();
      });
    });
  });
});
