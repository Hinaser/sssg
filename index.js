"use strict";

var tasks = {
  "build":            "./gulp/tasks/build.js",
  "build:css":        "./gulp/tasks/build-css.js",
  "build:js":         "./gulp/tasks/build-js.js",
  "build:image":      "./gulp/tasks/build-image.js",
  "build:html":       "./gulp/tasks/build-html.js",
  "build:lib":        "./gulp/tasks/build-lib.js",
  "build:lib:js":     "./gulp/tasks/build-lib-js.js",
  "build:lib:css":    "./gulp/tasks/build-lib-css.js",
  "build:lib:misc":   "./gulp/tasks/build-lib-misc.js",
  "rebuild":          "./gulp/tasks/rebuild.js",
  "rebuild:css":      "./gulp/tasks/rebuild-css.js",
  "rebuild:js":       "./gulp/tasks/rebuild-js.js",
  "rebuild:image":    "./gulp/tasks/rebuild-image.js",
  "rebuild:html":     "./gulp/tasks/rebuild-html.js",
  "rebuild:lib":      "./gulp/tasks/rebuild-lib.js",
  "rebuild:lib:css":  "./gulp/tasks/rebuild-lib-css.js",
  "rebuild:lib:js":   "./gulp/tasks/rebuild-lib-js.js",
  "rebuild:lib:misc": "./gulp/tasks/rebuild-lib-misc.js",
  "clean":            "./gulp/tasks/clean.js",
  "clean:css":        "./gulp/tasks/clean-css.js",
  "clean:js":         "./gulp/tasks/clean-js.js",
  "clean:image":      "./gulp/tasks/clean-image.js",
  "clean:html":       "./gulp/tasks/clean-html.js",
  "clean:lib":        "./gulp/tasks/clean-lib.js",
  "clean:lib:css":    "./gulp/tasks/clean-lib-css.js",
  "clean:lib:js":     "./gulp/tasks/clean-lib-js.js",
  "clean:lib:misc":   "./gulp/tasks/clean-lib-misc.js",
  "serve":            "./gulp/tasks/serve.js",
  "init":             "./gulp/tasks/init.js",
  "package":          "./gulp/tasks/package.js"
};

/**
 * SSSG = Simple Static Site Generator.
 * Utility object for executing site generation tasks via nodejs scripts.
 */
var SSSG = {};

/**
 * @typedef {object} Options
 * @property {string} src - Source directory path. Either relative/absolute path is supported.
 * @property {string} dst - Destination directory path.
 * @property {string} root - Directory path where index.html file will be generated.
 * @property {string} env - Either "production" or "development".
 */

/**
 * Check whether a task is supported
 * @param {string} task - Name of task. i.e. build/clean/serve
 * @returns {boolean}
 */
SSSG.isSupported = function(task){
  return Object.keys(tasks).includes(task);
};

/**
 * Do task.
 * @param {string} task - Name of a task.
 * @param {Options} options
 * @param {function=} cb - Function called when task has done.
 */
SSSG.do = function(task, options, cb){
  if(!SSSG.isSupported(task)){
    throw new Error("[Error] Task " + task + " is not supported.");
  }
  
  if(!cb){
    cb = errorHandler;
  }
  
  var isUpdated = setOption(options);
  
  if(isUpdated){
    delete require.cache[require.resolve(tasks[task])];
  }
  
  require(tasks[task]);
  var gulp = require('gulp');
  
  // Valid for gulp 3.x
  if(gulp.start){
    return gulp.start(task, cb);
  }
  // Valid for gulp 4.x
  /*
  else if(gulp.series){
    return gulp.series(task, cb);
  }
  */
  else{
    throw new Error("Error: Calling gulp task from nodejs script is not supported with current gulp installation.");
  }
};

/**
 * Parse and install option values for use.
 * @private
 * @param {Options} options
 * @return {boolean} - true if any option values update current settings.
 */
function setOption(options){
  if(!options) return false;
  
  var yargs = require('./lib/args');
  
  var newArgs = {};
  
  // Save current arguments to temporary buffer
  Object.keys(yargs.argv).forEach(function(key){
    if(key === "_"){
      newArgs._ = yargs.argv[key];
    }
    else if(key !== "$0" && key.length > 1 && yargs.argv[key]){ // Shorthand notation like "-x" will be ignored.
      newArgs[key] = yargs.argv[key];
    }
  });
  
  // Update arguments in temporary buffer
  if(options.src){
    newArgs["src"] = options.src;
  }
  if(options.dst){
    newArgs["dst"] = options.dst;
  }
  if(options.root){
    newArgs["root"] = options.root;
  }
  if(options.env){
    newArgs["env"] = options.env;
  }
  
  // Clear old config
  if(require.cache[require.resolve('./gulp/config')]){
    var oldConfig = require('./gulp/config');
    delete require.cache[require.resolve('./gulp/config')];
  
    // Provision updated arguments to yargs
    yargs(parseArgs(newArgs));
  
    var newConfig = require('./gulp/config');
    
    return (JSON.stringify(oldConfig) === JSON.stringify(newConfig));
  }
  else{
    // Provision updated arguments to yargs
    yargs(parseArgs(newArgs));
    return true;
  }
}

/**
 *
 * @param argv
 */
function parseArgs(argv){
  var newArgs = [];
  Object.keys(argv).forEach(function(key){
    if(key === "_"){
      newArgs = newArgs.concat(argv[key]);
    }
    else if(key !== "$0"){
      if(typeof(argv[key]) === "boolean"){
        newArgs = newArgs.concat(["--" + key]);
      }
      else {
        newArgs = newArgs.concat(["--" + key, argv[key]]);
      }
    }
  });
  
  return newArgs;
}

/**
 * Error handler
 * @private
 * @param err
 */
function errorHandler(err){
  if(err){
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
  else{
    console.log("Finished!");
  }
}

module.exports = SSSG;
