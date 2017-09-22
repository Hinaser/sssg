var gulp = require('gulp');
require('./rebuild-lib-css');
require('./rebuild-lib-js');
require('./rebuild-lib-misc');

gulp.task('rebuild:lib', ['rebuild:lib:js', 'rebuild:lib:css', 'rebuild:lib:misc']);
