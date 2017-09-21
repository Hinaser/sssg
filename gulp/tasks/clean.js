var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

gulp.task('clean:css', function(){
  var config = require('../config');
  var destDir = config['css']['destDir'];
  
  if(!fs.existsSync(destDir)){
    return;
  }
  
  return del([destDir], {force: true});
});

gulp.task('clean:js', function(){
  var config = require('../config');
  var destDir = config['js']['destDir'];
  
  if(!fs.existsSync(destDir)){
    return;
  }
  
    return del([destDir], {force: true});
});

gulp.task('clean:image', function(){
  var config = require('../config');
  var destDir = config['image']['destDir'];
  
  if(!fs.existsSync(destDir)){
    return;
  }
  
  return del([destDir], {force: true});
});

gulp.task('clean:html', function(){
  var config = require('../config');
  var destIndexFile = config['html']['destIndexDir'] + '/index.html';
  var destDir = config['html']['destDir'];
  var deletings = [];
  
  if(fs.existsSync(destIndexFile)){
    deletings.push(destIndexFile);
  }
  if(fs.existsSync(destDir)){
    deletings.push(destDir);
  }
  
  if(deletings.length < 1) return;

  return del(deletings, {force: true});
});

gulp.task('clean:lib:js', function(){
  var config = require('../config');
  var destFile = config['js']['destDir'] + '/lib.js';
  
  if(!fs.existsSync(destFile)){
    return;
  }
  
  return del([destFile], {force: true});
});

gulp.task('clean:lib:css', function(){
  var config = require('../config');
  var destFile = config['css']['destDir'] + '/lib.css';
  
  if(!fs.existsSync(destFile)){
    return;
  }
  
  return del([destFile], {force: true});
});

gulp.task('clean:lib:misc', function(){
  var config = require('../config');
  var destDir = config['misc']['destDir'];
  
  if(!fs.existsSync(destDir)){
    return;
  }
  
  return del([destDir], {force: true});
});

gulp.task('clean:lib', ['clean:lib:js', 'clean:lib:css', 'clean:lib:misc']);

gulp.task('clean', ['clean:css', 'clean:js', 'clean:image', 'clean:html', 'clean:lib'], function(){
  return true;
});
