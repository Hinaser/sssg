#!/usr/bin/env node

var args = require("../lib/args");
var argv = args.argv;
var main = require('../');

var task = argv._[0];
var options = {};

if(task !== "try" && !main.isSupported(task)){
  console.error("Error unsupported task: " + task);
  args.showHelp();
  return;
}


/**
 * Work around for a bug in pug-inheritance.
 * pug-inheritance assumes package.json always exists on working folder.
 * This behavior does not consider global use.
 *
 * @TODO Remove the code below when pug-inheritance fix the bug
 */
var fs = require('fs');
var chalk = require('chalk');
if(!fs.existsSync("package.json")){
  console.log(chalk.red("Due to a bug in pug-inheritance, we need to create empty package.json here"));
  console.log(chalk.red("I'll fix this behavior as soon as pug-inheritance patches this bug"));
  console.log("");
  fs.writeFileSync("package.json", "{}");
}

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
