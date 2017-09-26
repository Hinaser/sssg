var gulp = require('gulp');
var argv = require("yargs").argv;

gulp.task('init', function(){
  const minimal = __dirname + "/../../lib/templates/minimal/src";
  const readme = __dirname + "/../../lib/templates/readme/src";
  
  var srcDir = minimal;
  var dstDir = "./src";
  
  if(argv.readme){
    srcDir = readme;
  }
  
  if(argv._.length <= 1) { // argv._[0] should be always "init"
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
