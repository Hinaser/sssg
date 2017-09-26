#!/usr/bin/env node

var argv = require("../lib/args").argv;
var main = require('../');

var task = argv._[0];
var options = {};

if(task === "try"){
  options.env = "development";
  
  main.do("init", null, function(){
    options.src = "./src";
    options.dst = "./docs";
    main.do("serve", options);
  });
  
  return;
}

options.src = argv.src;
options.dst = argv.dst;
options.root = argv.root;

if(task === "serve"){
  options.env =  argv.env || "development";
}
else {
  options.env =  argv.env || "production";
}

main.do(task, options);
