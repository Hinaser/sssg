var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./rebuild');
require('./clean');

/**
 * Build html file from source pug files.
 * This task builds not only html but also css/js/image files.
 */
gulp.task('package', function(cb){
  return runSequence(
    "rebuild",
    ['package:html:root', 'package:html:sub'],
    ['clean:css', 'clean:js', 'clean:image'],
    cb
  );
});

gulp.task("package:html:root", function(){
  var dom = require('gulp-dom');
  var inline = require('gulp-inline-source');
  var config = require('../config.js');
  
  return gulp.src([config['html']['destIndexDir'] + "/index.html"], {base: config['html']['destIndexDir']})
    .pipe(dom(markInline))
    .pipe(inline({
      compress: !config['html']['pretty']
    }))
    .pipe(gulp.dest(config['html']['destIndexDir']))
    ;
});

gulp.task("package:html:sub", function(){
  var dom = require('gulp-dom');
  var inline = require('gulp-inline-source');
  var config = require('../config.js');
  
  return gulp.src([
    config['html']['destDir'] + "/**/*.html",
    "!" + config['html']['destIndexDir'] + "/index.html"
  ], {base: config['html']['destDir']})
    .pipe(dom(markInline))
    .pipe(inline({
      compress: !config['html']['pretty']
    }))
    .pipe(gulp.dest(config['html']['destDir']))
    ;
});

function markInline(){
  var targets = this.querySelectorAll('img,script,link'), i=0;
  
  for(i=0; i<targets.length; i++){
    var target = targets[i];
    var tag = target.tagName.toLowerCase();
    var proto;
    
    if((tag === "img" || tag === "script") && target.hasAttribute("src")){
      proto = target.getAttribute("src");
      if(proto.slice(0,6) !== "http:/" && proto.slice(0,7) !== "https:/"){
        target.setAttribute('inline', "inline");
      }
    }
    else if(target.hasAttribute("href")){
      proto = target.getAttribute("href");
      if(proto.slice(0,6) !== "http:/" && proto.slice(0,7) !== "https:/"){
        target.setAttribute('inline', "inline");
      }
    }
  }
  
  return this;
}