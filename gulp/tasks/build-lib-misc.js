var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

/**
 * Copy raw files to build destination directory.
 */
var buildLibMisc = function(){
  var startTime = new Date().getTime();
  var config = require('../config.js');
  
  return gulp.src(config['misc']['srcDir'] + '/**/*', {base: config['misc']['srcDir']})
    .pipe(plumber())
    .pipe(gulp.dest(config['misc']['destDir']))
    .on("end", function(){gutil.log("build:lib:misc finished in: " + (new Date().getTime() - startTime) + "ms")})
};

gulp.task('build:lib:misc', buildLibMisc);

