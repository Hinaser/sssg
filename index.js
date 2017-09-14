"use strict";

var gulp = null;
var gulpTasks = null;

var tasks = [
  "build", "rebuild",
  "build:css", "rebuild:css",
  "build:js", "rebuild:js",
  "build:image", "rebuild:image",
  "build:html", "rebuild:html",
  "build:lib", "rebuild:lib",
  "build:lib:js", "rebuild:lib:js",
  "build:lib:css", "rebuild:lib:css",
  "clean",
  "clean:css",
  "clean:js",
  "clean:image",
  "clean:html",
  "clean:lib",
  "clean:lib:js",
  "clean:lib:css",
  "serve"
];

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
 * @param {string} task - Name of task. i.e. build/clean/serve:dev
 * @returns {boolean}
 */
SSG.isSupported = function(task){
  return tasks.includes(task);
};

/**
 * List all supported tasks.
 * @returns {Array}
 */
SSG.supportedTasks = function(){
  return tasks;
};

/**
 * Do task.
 * @param {string} task - Name of a task.
 * @param {Options} options
 * @param {function} cb - Function called when task has done.
 */
SSG.do = function(task, options, cb){
  if(!SSG.isSupported(task)){
    throw new Error("[Error] Task " + task + " is not supported.");
  }
  
  if(!cb){
    cb = errorHandler;
  }
  
  if(!gulp){
    gulp = require('gulp');
  }
  
  var isUpdated = setOption(options);
  
  if(!gulpTasks || isUpdated){
    gulpTasks = require('./gulpfile');
  }
  
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
