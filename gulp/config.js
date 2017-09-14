var environments = require('gulp-environments');
var gutil = require('gulp-util');
var argv = require("yargs").argv;

/**
 * Set default environment to 'production' to
 * prevent to show debugging information.
 */
var env = argv.env || process.env.NODE_ENV;
if(!env || !["production", "development"].includes(env)){
  env = "production";
}
environments.current(environments.make(env));

var srcDir = argv.src || process.env.SSG_SRC || "src/";
var dstDir = argv.dst || process.env.SSG_DST || "docs/";
var docRoot = argv.root || process.env.SSG_ROOT || dstDir;

function addTrailingSlash(path){
  if(path[path.length-1] !== "/"){
    return path + "/";
  }
  
  return path;
}

srcDir = addTrailingSlash(srcDir);
dstDir = addTrailingSlash(dstDir);
docRoot = addTrailingSlash(docRoot);

var defaultConfig = {
  "js": {
    "srcDir": srcDir + "js",
    "destDir": dstDir + "js",
    "compress": true,
    "sourcemaps": false,
    "libDir": srcDir + "js/lib"
  },
  "css": {
    "srcDir": srcDir + "css",
    "destDir": dstDir + "css",
    "compress": true,
    "sourcemaps": false,
    "libDir": srcDir + "css/lib"
  },
  "image": {
    "srcDir": srcDir + "image",
    "destDir": dstDir + "image"
  },
  /**
   * As for html, transaction is bit different than other types of source file.
   * An index html file will be generated at the `docRoot` directory and other
   * html(pug) files will be generated under `dstDir`/contents dirctory.
   *
   * This is because this module is thought to be used mainly with Github Pages.
   * In Github Pages, both "User site" and "Project site" can be created.
   * The problem is, url of User site and Project site may conflict.
   *
   * Imagine you launch User site and create a folder in the repository.
   * Let's say the name of the folder is 'images'.
   * In this case, in order to access contents under `images` folder
   * you need to request a resource with url "https://<username>.github.io/images/some-content".
   *
   * But what happens if you want to create a github repository whose name is "images" and want to
   * create GitHub Pages for the new project?
   * The url you will have been assigned is "https://<username>.github.io/images/".
   *
   * Now the urls conflict. I don't know exactly which repository has precedence for the same url.
   * To avoid this conflict, we must avoid to give popular name to folders located just under the root folder.
   *
   * In my opinion, good folder name of the folder is "-" or "_" or something you never use for github repository name.
   * But that's just my opinion. You can freely choose the name by assigning name value to `docRoot` variable (or through env var)
   * declared at the top area of this js file.
   *
   */
  "html": {
    "srcDir": srcDir + "html",
    "destDir": dstDir + "contents",
    "destIndexDir": docRoot,
    "pretty": false
  },
  "environment": ""
};

var clone = function(obj){
  return JSON.parse(JSON.stringify(obj));
};

var config = {
  "production": clone(defaultConfig),
  "development": clone(defaultConfig)
};

config["development"]["css"]["minify"] = false;
config["development"]["css"]["sourcemaps"] = true;
config["development"]["css"]["compress"] = false;
config["development"]["js"]["compress"] = false;
config["development"]["js"]["sourcemaps"] = true;
config["development"]["html"]["pretty"] = true;

var exports = config[env];
exports.environment = env;

module.exports = exports;

gutil.log("Active configuration: " + JSON.stringify(exports, null, 2));
