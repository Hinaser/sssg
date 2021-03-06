"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var del = require('del');

var file = chaiFiles.file;
var dir = chaiFiles.dir;

var Share = require('./shared');

var DEBUG = false; // Set true to show verbose messages in test

describe('Init', function(){
  describe('with default template', function(){
    var share = new Share();
    var srcDir = "./lib/templates/minimal/src/";
    var dstDir = "./src/";
  
    before(function(done){
      // Clear require cache for testing
      delete require.cache[require.resolve('../../')];
    
      // Without any arguments
      require('yargs')([]);
    
      // Load main module for test
      var ssg = require('../../');
    
      this.timeout(30000);
      if(!DEBUG) share.suppressConsole();
      ssg.do("init", null, function(){
        share.resetConsole();
        done();
      });
    });
  
    it('should copy index.pug from template dir', function(){
      expect(file(dstDir + "/html/index.pug")).to.equal(file(srcDir + "/html/index.pug"));
    });
  
    it('should copy main.styl from template dir', function(){
      expect(file(dstDir + "/css/main.styl")).to.equal(file(srcDir+ "/css/main.styl"));
    });
  
    it('should create image directory', function(){
      expect(dir(dstDir + "/image")).to.exist;
    });
  
    it('should copy javascript file from template dir', function(){
      expect(file(dstDir + "/js/main.js")).to.equal(file(srcDir+ "/js/main.js"));
    });
  
    it('should create misc dir', function(){
      expect(dir(dstDir + "/misc")).to.exist;
    });
  
    after(function(done){
      del(dstDir + "/**").then(function(paths){
        done();
      });
    });
  });
  
  describe('with readme template', function(){
    var share = new Share();
    var srcDir = "./lib/templates/readme/src/";
    var dstDir = "./src/";
    
    before(function(done){
      this.timeout(30000);
  
      // Clear require cache for testing
      Object.keys(require.cache).forEach(function(key) { delete require.cache[key] });
      
      // With --readme option
      require('yargs')(["--readme"]);
      
      // Load main module for test
      var ssg = require('../../');
  
      if(!DEBUG) share.suppressConsole();
      ssg.do("init", null, function(){
        share.resetConsole();
        done();
      });
    });
    
    it('should copy index.pug from readme dir', function(){
      expect(file(dstDir + "/html/index.pug")).to.equal(file(srcDir + "/html/index.pug"));
    });
    
    it('should copy main.styl from readme dir', function(){
      expect(file(dstDir + "/css/main.styl")).to.equal(file(srcDir+ "/css/main.styl"));
    });
    
    it('should copy image file from readme dir', function(){
      expect(file(dstDir + "/image/es6.png")).to.equal(file(srcDir + "/image/es6.png"));
    });
    
    it('should copy javascript file from readme dir', function(){
      expect(file(dstDir + "/js/main.js")).to.equal(file(srcDir+ "/js/main.js"));
    });
    
    it('should create misc dir', function(){
      expect(dir(dstDir + "/misc")).to.exist;
    });
    
    after(function(done){
      del(dstDir + "/**").then(function(paths){
        done();
      });
    });
  });
  
  describe('with dest dir specified', function(){
    var share = new Share();
    var srcDir = "./lib/templates/minimal/src/";
    var dstDir = "./src2/";
    
    before(function(done){
      // Clear require cache for testing
      delete require.cache[require.resolve('../../')];
      delete require.cache[require.resolve('../../gulp/tasks/init')];
      delete require.cache[require.resolve('../../lib/args')];
      delete require.cache[require.resolve('yargs')];
      
      // With dst dir specified
      require('yargs')(['inita', dstDir]);
      
      // Load main module for test
      var ssg = require('../../');
      
      this.timeout(30000);
      if(!DEBUG) share.suppressConsole();
      ssg.do("init", null, function(){
        share.resetConsole();
        done();
      });
    });
    
    it('should copy index.pug from template dir', function(){
      expect(file(dstDir + "/html/index.pug")).to.equal(file(srcDir + "/html/index.pug"));
    });
    
    after(function(done){
      del(dstDir + "/**").then(function(paths){
        done();
      });
    });
  });
});
