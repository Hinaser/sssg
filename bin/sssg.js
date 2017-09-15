#!/usr/bin/env node

var argv = require("yargs").argv;

var task = argv._[0];
var options = {};
if(task === "try"){
  task = "serve";
  options.src = __dirname + "/../playground/src/";
  options.dst = __dirname + "/../docs/";
  options.root = null;
  options.env = "development";
}
else {
  options.src = argv.src || argv.s;
  options.dst = argv.dst || argv.d;
  options.root = argv.root || argv.r;
  options.env =  argv.env || argv.e;
}

var main = require('../');
main.do(task, options);
