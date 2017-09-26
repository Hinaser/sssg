var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var uncache = require('gulp-uncache');
var path = require('path');

/**
 * Build html file from source pug files.
 * This task builds not only html but also css/js/image files.
 */
gulp.task('build:html', ['build:html:root', 'build:html:sub']);

gulp.task("build:html:root", function(){
  var config = require('../config.js');
  
  var stream = gulp.src([config['html']['srcDir'] + "/index.pug"], {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(pug({
      pretty: config['html']['pretty']
    }));
  
  if(config['html']['allinone']){
    var dom = require('gulp-dom');
    var inline = require('gulp-inline-source');
    
    stream = stream
      .pipe(dom(markInline))
      .pipe(gulp.dest(config['html']['destIndexDir']))
      .pipe(inline({
        compress: !config['html']['pretty']
      }))
      .pipe(gulp.dest(config['html']['destIndexDir']))
    ;
  }
  else {
    stream = stream
      .pipe(uncache({
        rename: false,
        append: "hash",
        srcDir: config['html']['destIndexDir']
      }))
      .pipe(gulp.dest(config['html']['destIndexDir']))
    ;
  }
  
  return stream;
});

gulp.task("build:html:sub", function(){
  var config = require('../config.js');
  
  var stream = gulp.src([
    config['html']['srcDir'] + "/**/*.pug",
    "!" + config['html']['srcDir'] + "/index.pug",
    "!" + config['html']['srcDir'] + "/**/*.part.pug"
  ], {base: config['html']['srcDir']})
    .pipe(plumber())
    .pipe(pug({
      pretty: config['html']['pretty']
    }));
  
  if(config['html']['allinone']){
    var dom = require('gulp-dom');
    var inline = require('gulp-inline-source');
    
    stream = stream
      .pipe(dom(markInline))
      .pipe(gulp.dest(config['html']['destDir']))
      .pipe(inline({
        compress: !config['html']['pretty']
      }))
      .pipe(gulp.dest(config['html']['destDir']))
    ;
  }
  else {
    stream = stream
      .pipe(uncache({
        rename: false,
        append: "hash",
        srcFileMap: function(filename){
          var fixedPath = filename.split(/[/]/)
            .map(function(val){
              if(val === ".."){
                return null;
              }
              return val;
            })
            .filter(function(s){ return s })
            .join("/");
          return path.resolve(config['html']['destDir'] + "/../" + fixedPath);
        }
      }))
      .pipe(gulp.dest(config['html']['destDir']))
    ;
  }
  
  return stream;
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