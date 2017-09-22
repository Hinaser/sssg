var gulp = require('gulp');
require('./build-lib-js');
require('./build-lib-css');
require('./build-lib-misc');

/**
 * Build css/js library files.
 */
gulp.task('build:lib', ['build:lib:js', 'build:lib:css', 'build:lib:misc']);
