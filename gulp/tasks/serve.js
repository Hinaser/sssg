var gulp = require('gulp');
var browsersync = require( 'browser-sync').create();
var path = require('path');

require('./rebuild');
require('./build-js');
require('./build-css');
require('./build-image');
require('./build-html');

gulp.task('build:js:sync', ['build:js'], function(){browsersync.reload();});
gulp.task('build:css:sync', ['build:css'], function(){browsersync.reload();});
gulp.task('build:image:sync', ['build:image'], function(){browsersync.reload();});
gulp.task('build:html:sync', ['build:html'], function(){browsersync.reload();});

gulp.task('serve', ['rebuild'], function(){
  var config = require( '../config.js');
  
  return new Promise(function(resolve, reject){
    try {
      browsersync.init({
        server: {
          baseDir: config["html"]["destIndexDir"]
        }
      }, function(){
        global.isWatching = true;
        
        var watcher_js = gulp.watch(config['js']['srcDir'] + '/**/*.js', ['build:js:sync']);
        var watcher_stylus = gulp.watch(config['css']['srcDir'] + '/**/*.styl', ['build:css:sync']);
        var watcher_image = gulp.watch(config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}', ['build:image:sync']);
        var watcher_pug = gulp.watch(config['html']['srcDir'] + '/**/*.pug', ['build:html:sync']);
        
        var log_changed_file = function (e) {
          console.log("File changed: " + path.relative(process.cwd(), e.path));
        };
  
        watcher_js.on("change", log_changed_file);
        watcher_stylus.on("change", log_changed_file);
        watcher_image.on("change", log_changed_file);
        watcher_pug.on("change", log_changed_file);
        
        resolve();
      });
    }
    catch(e){
      reject();
    }
  });
});
