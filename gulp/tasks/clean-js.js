var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

gulp.task('clean:js', function(){
  var config = require('../config');
  var destDir = config['js']['destDir'];
  
  if(!fs.existsSync(destDir)){
    return;
  }
  
  return del([destDir], {force: true});
});
