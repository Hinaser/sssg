#!/usr/bin/env node

var gulp = require('gulp');
var argv = require("yargs").argv;

function errorHandler(err){
  if(err){
    console.error(err);
    console.log("Error!")
  }
  else{
    console.log("Finished!");
  }
}


if(argv.src || argv.s) process.env["SSG_SRC"] = argv.src || argv.s;
if(argv.dst || argv.d) process.env["SSG_DST"] = argv.dst || argv.d;
if(argv.root || argv.r) process.env["SSG_ROOT"] = argv.root || argv.r;
if(argv.env || argv.e) process.env["NODE_ENV"] = argv.env || argv.e;

require('../gulpfile');

// Valid for gulp 3.x
if(gulp.start){
  gulp.start(argv._, errorHandler);
}
// Valid for gulp 4.x
else if(gulp.series){
  gulp.series(argv._, errorHandler);
}
else{
  console.error("Error: Calling gulp task from nodejs script is not supported with current gulp installation.");
}
