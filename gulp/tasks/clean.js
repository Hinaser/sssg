var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

/**
 * Check if directory is OK to delete.
 *
 * @returns {boolean} - true if it may be valid directory, false if it should not be deleted.
 */
function isValidDir(){
    var config = require('../config');

    var indexFile = config['html']['destIndexDir'];
    var htmlDir = config['html']['destDir'];
    var cssDir = config['css']['destDir'];
    var jsDir = config['js']['destDir'];

    return fs.existsSync(indexFile)
        && fs.existsSync(htmlDir)
        && fs.existsSync(cssDir)
        && fs.existsSync(jsDir);
}

gulp.task('clean:css', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destDir = config['css']['destDir'];

  return del([destDir + '/main.css'], {force: true});
});

gulp.task('clean:js', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destDir = config['js']['destDir'];

    return del([destDir + '/main.js'], {force: true});
});

gulp.task('clean:image', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destDir = config['image']['destDir'];

  return del([destDir + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {force: true});
});

gulp.task('clean:html', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destIndexDir = config['html']['destIndexDir'];
  var destDir = config['html']['destDir'];

  return del([destIndexDir + '/index.html', destDir], {force: true});
});

gulp.task('clean:lib:js', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destDir = config['js']['destDir'];

  return del([destDir + '/lib.js'], {force: true});
});

gulp.task('clean:lib:css', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destDir = config['css']['destDir'];

  return del([destDir + '/lib.css'], {force: true});
});

gulp.task('clean:lib:misc', function(){
  var config = require('../config');
  
  if(!isValidDir()){
    return;
  }
  
  var destDir = config['misc']['destDir'];
  
  return del([destDir], {force: true});
});

gulp.task('clean:lib', ['clean:lib:js', 'clean:lib:css', 'clean:lib:misc']);

gulp.task('clean', ['clean:css', 'clean:js', 'clean:image', 'clean:html', 'clean:lib'], function(){
  return true;
});
