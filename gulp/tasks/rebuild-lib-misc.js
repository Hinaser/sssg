var gulp = require('gulp');
var plumber = require('gulp-plumber');
require('./clean-lib-misc');

/**
 * Copy raw files to build destination directory.
 */
var buildLibMisc = function(){
  var config = require('../config.js');
  
  return gulp.src(config['misc']['srcDir'] + '/**/*', {base: config['misc']['srcDir']})
    .pipe(plumber())
    .pipe(gulp.dest(config['misc']['destDir']))
};

gulp.task('rebuild:lib:misc', ['clean-lib-misc'], buildLibMisc);

