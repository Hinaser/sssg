"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var del = require('del');

var file = chaiFiles.file;

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

  it('should copy index.pug from playground dir', function(done){
    expect(file(dstDir + "/html/index.pug")).to.equal(file(srcDir + "/html/index.pug"));
    done();
  });

  it('should copy main.styl from playground dir', function(done){
    expect(file(dstDir + "/css/main.styl")).to.equal(file(srcDir+ "/css/main.styl"));
    done();
  });

  it('should copy image file from playground dir', function(done){
    expect(file(dstDir + "/image/es6.png")).to.equal(file(srcDir + "/image/es6.png"));
    done();
  });

  it('should copy javascript file from playground dir', function(done){
    expect(file(dstDir + "/js/main.js")).to.equal(file(srcDir+ "/js/main.js"));
    done();
  });
  
  after(function(done){
    del(dstDir + "/**").then(function(paths){
      done();
    });
  });
});
