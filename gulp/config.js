var gutil = require('gulp-util');
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
var allInOne = argv.allinone || false;

/**
 * Default configuration.(Targetting env=production)
 */
var defaultConfig = {
  "js": {
    "srcDir": srcDir + "/js",
    "destDir": dstDir + "/js",
    "compress": true,
    "sourcemaps": false,
    "libDir": srcDir + "/js/lib"
  },
  "css": {
    "srcDir": srcDir + "/css",
    "destDir": dstDir + "/css",
    "compress": true,
    "sourcemaps": false,
    "libDir": srcDir + "/css/lib"
  },
  "image": {
    "srcDir": srcDir + "/image",
    "destDir": dstDir + "/image"
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
    "srcDir": srcDir + "/html",
    "destDir": dstDir + "/contents",
    "destIndexDir": docRoot,
    "pretty": false,
    "allinone": allInOne
  },
  "misc": {
    "srcDir": srcDir + "/misc",
    "destDir": dstDir + "/misc"
  },
  "environment": "production"
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
