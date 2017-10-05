var gutil = require('gulp-util');
var path_normalize = require('path').normalize;
var argv = require("../lib/args").argv;

/**
 * Set default environment to 'production' to
 * prevent to show debugging information.
 */
var env = argv.env || process.env.NODE_ENV;
if(!env || !["production", "development"].includes(env)){
  env = "production";
}

/**
 * Set option from user input.
 */
var srcDir = argv.src;
var dstDir = argv.dst;
var docRoot = argv.root || dstDir;

/**
 * Set custom options
 */
var silentMode = argv.silent || false;

/**
 * Default configuration.(Targetting env=production)
 */
var defaultConfig = {
  "environment": "production",
  "srcDir": path_normalize(srcDir),
  "dstDir": path_normalize(dstDir),
  "silent": silentMode,
  "js": {
    "srcDir": path_normalize(srcDir + "/js"),
    "destDir": path_normalize(dstDir + "/js"),
    "compress": true,
    "sourcemaps": false,
    "libDir": path_normalize(srcDir + "/js/lib")
  },
  "css": {
    "srcDir": path_normalize(srcDir + "/css"),
    "destDir": path_normalize(dstDir + "/css"),
    "compress": true,
    "sourcemaps": false,
    "libDir": path_normalize(srcDir + "/css/lib")
  },
  "image": {
    "srcDir": path_normalize(srcDir + "/image"),
    "destDir": path_normalize(dstDir + "/image")
  },
  /**
   * As for html, process is bit different to other content types(js/css/image).
   * An index html file will be generated at the `docRoot` directory and other
   * html(pug) files will be generated under `dstDir`/contents directory.
   *
   * This is because this module is thought to be used with Github Pages.
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
    "srcDir": path_normalize(srcDir + "/html"),
    "destDir": path_normalize(dstDir + "/contents"),
    "destIndexDir": path_normalize(docRoot),
    "pretty": false
  },
  "misc": {
    "srcDir": path_normalize(srcDir + "/misc"),
    "destDir": path_normalize(dstDir + "/misc")
  }
};

var config = defaultConfig;

/**
 * Set development configuration if env is development
 */
if(env === "development"){
  config["environment"] = env;
  config["css"]["sourcemaps"] = true;
  config["css"]["compress"] = false;
  config["js"]["compress"] = false;
  config["js"]["sourcemaps"] = true;
  config["html"]["pretty"] = true;
}

module.exports = config;

gutil.log("Active configuration: " + JSON.stringify(config, null, 2));
