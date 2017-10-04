var gulp = require('gulp');
var gutil = require('gulp-util');
var browsersync = require( 'browser-sync').create();
var runSequence = require('run-sequence');
var path = require('path');
var url = require('url');
var fs = require('fs');
var pug = require('pug');
var del = require('del');
var notifier = require('node-notifier');
var chalk = require('chalk');

require('./rebuild');
require('./build-css');
require('./build-image');
require('./build-html');
var watchfy = require('./build-js').watchfy;

/**
 * Callback on successful build
 */
function onSuccessBuild(){
  var config = require( '../config.js');
  
  !config["silent"] && notifier.notify({
    title: "Build success!",
    message: "Check refreshed page on your browser.",
    wait: false,
    closeLabel: "close"
  });
  browsersync.reload();
}

/**
 * Private task called when any stylus file is updated.
 */
gulp.task('build:css:sync', ['build:css'], onSuccessBuild);

/**
 * Private task called when any image file is added/modified.
 */
gulp.task('build:image:sync', ['build:image'], onSuccessBuild);

/**
 * Private task called when any pug file is updated.
 *
 * Serving html file when a pug file is updated works bit different to css/image.
 * When a pug file is updated, browserSync emit reload signal to browser.
 * At this moment, it does not build pug files.
 * When client requests web page to browserSync server, it will compile pug file
 * which corresponds to requested html file.
 *
 * This greatly improves building pug performance. So so great.
 * Most part of this idea came from https://marunouchi-tech.i-studio.co.jp/3245/.
 */
gulp.task('build:html:sync', function(){
  var config = require('../config');
  
  // Get html file path in output folder.
  var htmlFile = pug2htmlPath(global.fileChanged);
  
  /**
   * Delete output html file for rebuilding.
   * When user accesses to the deleted html file,
   * browserSync middleware (See below) will try to build html automatically.
   */
  if(fs.existsSync(htmlFile)){
    del.sync(htmlFile);
  }
  // if partial pug file is updated, all html file will be deleted.
  else{
    var indexHtml = config['html']['destIndexDir'] + '/index.html';
    var otherHtml = config['html']['destDir'] + '/**/*.html';
    del.sync([indexHtml, otherHtml]);
  }
  
  browsersync.reload();
});

/**
 * A task to serve developing web contents to developer with live preview.
 */
gulp.task('serve', function(cb){
  global.runs = 0;
  
  return runSequence('rebuild', function(){
    var config = require( '../config.js');
  
    var watcher_stylus = gulp.watch(config['css']['srcDir'] + '/**/*.styl', ['build:css:sync']);
    var watcher_image = gulp.watch(config['image']['srcDir'] + '/**/*.{tiff,svg,jpeg,jpg,png,gif}', ['build:image:sync']);
    var watcher_pug = gulp.watch(config['html']['srcDir'] + '/**/*.pug', ['build:html:sync']);
    // gulp.watch is used only for logging what file is updated.
    var watcher_js = gulp.watch(config['js']['srcDir'] + '/**/*.js');
  
    var log_changed_file = function (e) {
      global.fileChanged = e.path;
      console.log("File changed: " + path.relative(process.cwd(), e.path));
    };
  
    watcher_stylus.on("change", log_changed_file);
    watcher_image.on("change", log_changed_file);
    watcher_pug.on("change", log_changed_file);
    watcher_js.on("change", log_changed_file);
  
    return watchfy(onSuccessBuild)(function(){
      browsersync.init({
        server: {
          baseDir: config["html"]["destIndexDir"],
          middleware: [pugMiddleware]
        }
      }, function(){
        // Do incremental build by watchify instead of gulp.watch
        cb();
      });
    });
  });
});

/**
 * Convert input(editing) pug file path to output html file path.
 * @param {string} pugPath - Path to target pug file
 * @returns {string} Path to corresponding html file
 */
function pug2htmlPath(pugPath){
  var config = require('../config');
  
  pugPath = path.resolve(pugPath);
  
  
  if(pugPath === path.resolve(config['html']['srcDir'] + '/index.pug')){
    return path.resolve(config['html']['destIndexDir'] + '/index.html');
  }
  
  var relative = path.relative(path.resolve(config['html']['srcDir']), pugPath);
  
  // If config['html']['srcDir'] is not the ancestor of pugPath, throw an Error.
  if(relative[0] === '.'){
    throw new Error('Invalid pugPath: ' + pugPath + " (" + config['html']['srcDir'] + ")");
  }
  relative = relative.replace(/\.pug$/, '.html');
  
  return path.resolve(config['html']['destDir'] + '/' + relative);
}

/**
 * Middleware for browserSync.
 *
 * Only working for requests to html files. (requests to css/js/image/etc would be skipped)
 * If client requests html file that exists, just return it to client.
 * If the html file does not exists, it tries to build html from corresponding pug file
 * and return the compiled html content.
 * With returning the new html, its content will be flushed to file.
 * So the next time a client request the html, building html will be skipped.
 *
 * This improves building time for pug so great!!!
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function pugMiddleware(req, res, next){
  var build_timer = new Date().getTime();
  
  var requestedPath = path.normalize(url.parse(req.url).pathname);
  var ext = path.parse(requestedPath).ext;
  var isRootIndexHtml = ext === '' || requestedPath === '/index.html';
  var isSubHtml = requestedPath.startsWith('/contents') && (ext === '' || ext === '.html');
  
  // Do nothing if request content is not html
  if(!isRootIndexHtml && !isSubHtml){
    return next();
  }
  
  var config = require( '../config.js');
  var pugPath, dstPath;
  
  // Calculate source pug file from requested url
  if(isRootIndexHtml){
    dstPath = path.join(config['html']['destIndexDir'], 'index.html');
    pugPath = path.join(config['html']['srcDir'], 'index.pug');
  }
  else{
    dstPath = requestedPath.replace(/^(\/contents)/, '');
    if(path.parse(dstPath).ext === ''){
      dstPath = path.join(dstPath, '/index.html');
    }
    dstPath = path.join(config['html']['destDir'], dstPath);
    pugPath = path.join(config['html']['srcDir'], path.basename(dstPath, '.html')) + '.pug';
  }
  
  /**
   * If .pug file is modified, corresponding .html file should be deleted.
   * So if .html exists, .pug should not be modified.
   */
  if(fs.existsSync(dstPath)){
    return next();
  }
  
  // If source pug file does not exist, we can do nothing.
  if(!fs.existsSync(pugPath)){
    return next();
  }
  
  // Build pug file to html.
  var content = pug.renderFile(pugPath, {
    baseDir: config['html']['srcDir'],
    pretty: config['html']['pretty']
  });
  
  // Return response with compiled html content
  res.end(Buffer.from(content));
  
  // Write new content to destination path
  fs.writeFileSync(dstPath, content);
  gutil.log('build:html finished in ' + chalk.green((new Date().getTime() - build_timer) + 'ms'));
  gutil.log('build:html ' + chalk.blue(dstPath));
}

module.exports.test = {};
module.exports.test.pug2htmlPath = pug2htmlPath;
module.exports.test.pugMiddleware = pugMiddleware;
