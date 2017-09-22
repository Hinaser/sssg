"use strict";

var gulp = require('gulp');

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
  "init":             "./gulp/tasks/init.js"
};

/**
 * SSG = Static Site Generator.
 * Utility object for executing site generation tasks via nodejs scripts.
 */
var SSG = {};

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
SSG.isSupported = function(task){
  return Object.keys(tasks).includes(task);
};

/**
 * List all supported tasks.
 * @returns {Array}
 */
SSG.supportedTasks = function(){
  return Object.keys(tasks);
};

/**
 * Do task.
 * @param {string} task - Name of a task.
 * @param {Options} options
 * @param {function=} cb - Function called when task has done.
 */
SSG.do = function(task, options, cb){
  if(!SSG.isSupported(task)){
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
  
  // Valid for gulp 3.x
  if(gulp.start){
    return gulp.start(task, cb);
  }
  // Valid for gulp 4.x
  else if(gulp.series){
    return gulp.series(task, cb);
  }
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
  var initialState = {
    "SSG_SRC": process.env["SSG_SRC"],
    "SSG_DST": process.env["SSG_DST"],
    "SSG_ROOT": process.env["SSG_ROOT"],
    "NODE_ENV": process.env["NODE_ENV"]
  };
  var isUpdated = false;
  
  if(!options) return isUpdated;
  
  if(options.src){
    process.env["SSG_SRC"] = options.src;
    isUpdated = true;
  }
  if(options.dst){
    process.env["SSG_DST"] = options.dst;
    isUpdated = true;
  }
  if(options.root){
    process.env["SSG_ROOT"] = options.root;
    isUpdated = true;
  }
  if(options.env){
    process.env["NODE_ENV"] = options.env;
    isUpdated = true;
  }
  
  return isUpdated;
}

/**
 * Error handler
 * @private
 * @param err
 */
function errorHandler(err){
  if(err){
    console.error(err);
    console.log("Error!")
  }
  else{
    console.log("Finished!");
  }
}

module.exports = SSG;
