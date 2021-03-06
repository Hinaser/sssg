var yargs = require('yargs');
var detectMocha = require('detect-mocha');

yargs
  // Global description
  .usage("Usage: $0 <command> [options]")
  .help("help")
  .alias("help", "h")
  //.demandCommand(1) // Disabled since it didn't work with mocha
  // Common arguments
  .alias("src", "s")
  .alias("dst", "d")
  .alias("root", "r")
  .alias("env", "e")
  .default("src", "src/")
  .default("dst", "docs/")
  .describe("src", "Source directory path to load")
  .describe("dst", "Output directory path to generate")
  .describe("root", "Root directory path to put index.html")
  .describe("env", "'development' or 'production'")
  .describe("silent", "Suppress notification")
  .describe("readme", "Only used with 'try'. Src dir will be initialized by readme web pages")
  // Specific arguments
  .command("try [--readme]", "init and serve prepared contents to play around")
  .command("init [path]", "initialize with directory specified by path")
  .command("build", "Load --src dir and output files in --dst dir")
  .command("clean", "Make --dst dir empty")
  .command("serve", "Build and serve web files")
  .command("package", "Compile all css/js/image into one html file that refers them")
;

if(!detectMocha()){
  yargs.demandCommand(1);
}

module.exports = yargs;