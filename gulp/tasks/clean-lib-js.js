var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

gulp.task('clean:lib:js', function(){
  var config = require('../config');
  var destFile = config['js']['destDir'] + '/lib.js';
  
  if(!fs.existsSync(destFile)){
    return;
  }
  
  return del([destFile], {force: true});
});
