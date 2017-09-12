var gulp = require('gulp');
var del = require('del');
var resolve = require('path').resolve;
var config = require('../config');

/**
 * Because glob style file selection is used, target destination folder path
 * must be under nodejs project directory. It is too risky to trust configuration edited by an anonymous user.
 * @param {String} path - A path string for destination folder.
 * @throws {Error} - If the path is not relative path or blank, throws an Error.
 */
function throwExceptionIfDangerousPath (path){
  var trimmedPath = path.trim();
  var allowedRootPath = __dirname + "/../../../../";
  var projectParentDir = resolve(__dirname + "../../../").split(require('path').sep);
  
  if(projectParentDir[projectParentDir.length-1] !== "node_modules"){
    console.log("clean.js assumes you are just developing this module.");
    console.log("Dangerous path protection is disabled.");
  }
  else{
    // At this time, dangerous path protection is disabled
    if(false && !trimmedPath.includes(resolve(allowedRootPath))){
      throw new Error("Could not delete files in a path outside this nodejs project.");
    }
  }
}

gulp.task('clean:css', function(){
  var destDir = config['css']['destDir'];
  throwExceptionIfDangerousPath(destDir);
  
  return del([destDir + '/main.css'], {force: true});
});

gulp.task('clean:js', function(){
  var destDir = config['js']['destDir'];
  throwExceptionIfDangerousPath(destDir);

  return del([destDir + '/main.js'], {force: true});
});

gulp.task('clean:image', function(){
  var destDir = config['image']['destDir'];
  throwExceptionIfDangerousPath(destDir);

  return del([destDir + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {force: true});
});

gulp.task('clean:html', function(){
  var destIndexDir = config['html']['destIndexDir'];
  var destDir = config['html']['destDir'];
  throwExceptionIfDangerousPath(destIndexDir);
  throwExceptionIfDangerousPath(destDir);

  return del([destIndexDir + '/index.html', destDir], {force: true});
});

gulp.task('clean:lib:js', function(){
  var destDir = config['js']['destDir'];
  throwExceptionIfDangerousPath(destDir);

  return del([destDir + '/lib.js'], {force: true});
});

gulp.task('clean:lib:css', function(){
  var destDir = config['css']['destDir'];
  throwExceptionIfDangerousPath(destDir);

  return del([destDir + '/lib.css'], {force: true});
});

gulp.task('clean:lib', ['clean:lib:js', 'clean:lib:css']);

gulp.task('clean', ['clean:css', 'clean:js', 'clean:image', 'clean:html', 'clean:lib'], function(){
  return true;
});
