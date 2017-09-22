var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

gulp.task('clean:lib:css', function(){
  var config = require('../config');
  var destFile = config['css']['destDir'] + '/lib.css';
  
  if(!fs.existsSync(destFile)){
    return;
  }
  
  return del([destFile], {force: true});
});

