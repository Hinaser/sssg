var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

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
