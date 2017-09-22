var gulp = require('gulp');
require('./clean-css');
require('./clean-js');
require('./clean-image');
require('./clean-html');
require('./clean-lib');

gulp.task('clean', ['clean:css', 'clean:js', 'clean:image', 'clean:html', 'clean:lib']);
