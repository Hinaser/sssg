"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var del = require('del');

var file = chaiFiles.file;
var dir = chaiFiles.dir;

var Share = require('./shared');

// Load main module for test
var ssg = require('../../');

describe('Init', function(){
  var share = null;
  var srcDir = "./playground/src/";
  var dstDir = "./src/";
  
  before(function(done){
    this.timeout(30000);
    share = new Share().suppressConsole();
    ssg.do("init", null, function(){
      share.resetConsole();
      done();
    });
  });

  it('should copy index.pug from playground dir', function(){
    expect(file(dstDir + "/html/index.pug")).to.equal(file(srcDir + "/html/index.pug"));
  });

  it('should copy main.styl from playground dir', function(){
    expect(file(dstDir + "/css/main.styl")).to.equal(file(srcDir+ "/css/main.styl"));
  });

  it('should copy image file from playground dir', function(){
    expect(file(dstDir + "/image/es6.png")).to.equal(file(srcDir + "/image/es6.png"));
  });

  it('should copy javascript file from playground dir', function(){
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
