var gulp = require('gulp');
var argv = require("yargs").argv;

gulp.task('init', function(){
  var srcDir = __dirname + "/../../lib/templates/playground/src";
  var dstDir = "./src";

  if(argv.s || argv.src){
    dstDir = argv.s || argv.src;
  }
  else if(argv._.length <= 1) {
    dstDir = "./src";
  }
  else if(argv._.length === 2) {
    dstDir = argv._[1];
  }
  else {
    throw new Error("Unknown parameters");
  }
  
  console.log("Creating src directory to " + dstDir);
  
  return gulp.src([srcDir + "/**/*", srcDir + "/**/.*"], {base: srcDir})
    .pipe(gulp.dest(dstDir));
});
