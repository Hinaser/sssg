var gulp = require( 'gulp');
var browsersync = require( 'browser-sync').create();

gulp.task('build:js:sync', ['build:js'], function(){browsersync.reload();});
gulp.task('build:css:sync', ['build:css'], function(){browsersync.reload();});
gulp.task('build:image:sync', ['build:image'], function(){browsersync.reload();});
gulp.task('build:html:sync', ['build:html'], function(){browsersync.reload();});

gulp.task('try', ['build'], function(){
  var config = require( '../config.js');
  
  return new Promise(function(resolve, reject){
    try {
      browsersync.init({
        server: {
          baseDir: config["html"]["destIndexDir"]
        }
      }, function(){
        gulp.watch(config['js']['srcDir'] + '/**/*.js', ['build:js:sync']);
        gulp.watch(config['css']['srcDir'] + '/**/*.styl', ['build:css:sync']);
        gulp.watch(config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}', ['build:image:sync']);
        gulp.watch(config['html']['srcDir'] + '/**/*.pug', ['build:html:sync']);
        
        resolve();
      });
    }
    catch(e){
      reject();
    }
  });
});
