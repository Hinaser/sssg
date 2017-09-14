var gulp = require('gulp');
var del = require('del');
var resolve = require('path').resolve;
/**
 * Because glob style file selection is used, target destination folder path
 * must be under nodejs project directory. It is too risky to trust configuration edited by an anonymous user.
 * @param {String} path - A path string for destination folder.
 * @throws {Error} - If the path is not relative path or blank, throws an Error.
 */
function throwExceptionIfUnsecurePath (path){
  var securePath = resolve(__dirname + "/../../../../");
  var projectParentDir = resolve(__dirname + "/../../../").split(require('path').sep);
  
  // Forcibly convert relative path to absolute path.
  path = path[0] === "/" ? path : resolve("./" + path);
  
  // Allow any path to be deleted if this npm module is installed globally.
  if(projectParentDir[projectParentDir.length-1] !== "node_modules"){
    securePath = "/";
  }
  
  if(!path.includes(securePath)){
    throw new Error("Could not delete files in a path outside this nodejs project.");
  }
}

gulp.task('clean:css', function(){
  var config = require('../config');
  
  var destDir = config['css']['destDir'];
  throwExceptionIfUnsecurePath(destDir);
  
  return del([destDir + '/main.css'], {force: true});
});

gulp.task('clean:js', function(){
  var config = require('../config');
  
  var destDir = config['js']['destDir'];
  throwExceptionIfUnsecurePath(destDir);

  return del([destDir + '/main.js'], {force: true});
});

gulp.task('clean:image', function(){
  var config = require('../config');
  
  var destDir = config['image']['destDir'];
  throwExceptionIfUnsecurePath(destDir);

  return del([destDir + '/**/*.{tiff,svg,jpeg,jpg,png,gif}'], {force: true});
});

gulp.task('clean:html', function(){
  var config = require('../config');
  
  var destIndexDir = config['html']['destIndexDir'];
  var destDir = config['html']['destDir'];
  throwExceptionIfUnsecurePath(destIndexDir);
  throwExceptionIfUnsecurePath(destDir);

  return del([destIndexDir + '/index.html', destDir], {force: true});
});

gulp.task('clean:lib:js', function(){
  var config = require('../config');
  
  var destDir = config['js']['destDir'];
  throwExceptionIfUnsecurePath(destDir);

  return del([destDir + '/lib.js'], {force: true});
});

gulp.task('clean:lib:css', function(){
  var config = require('../config');
  
  var destDir = config['css']['destDir'];
  throwExceptionIfUnsecurePath(destDir);

  return del([destDir + '/lib.css'], {force: true});
});

gulp.task('clean:lib', ['clean:lib:js', 'clean:lib:css']);

gulp.task('clean', ['clean:css', 'clean:js', 'clean:image', 'clean:html', 'clean:lib'], function(){
  return true;
});
