var gulp = require('gulp');
require('./clean-lib-js');
require('./clean-lib-css');
require('./clean-lib-misc');


gulp.task('clean:lib', ['clean:lib:js', 'clean:lib:css', 'clean:lib:misc']);
