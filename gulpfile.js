/**
 * Unused file. Unless developing this npm module,
 * you don't need to use/edit this file.
 *
 * This `gulpfile.js` is only required when dispatching `gulp` command
 * in cli.
 */

console.log("Initializing task runner...");
var startTime = new Date().getDate();

var requireDir = require('require-dir');
requireDir('./gulp/tasks', {recurse: true});

console.log("Finished initializing in " + (new Date().getDate() - startTime) + "ms");
