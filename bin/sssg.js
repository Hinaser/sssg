#!/usr/bin/env node

var argv = require("yargs").argv;
var main = require('../');

var task = argv._[0];
var options = {};

if(task === "try"){
  options.env = "development";
  
  main.do("init", options, function(){
    options.src = "./src";
    options.dst = "./docs";
    
    main.do("serve", options);
  });
  
  return;
}

options.src = argv.src || argv.s;
options.dst = argv.dst || argv.d;
options.root = argv.root || argv.r;
options.env =  argv.env || argv.e;

main.do(task, options);
