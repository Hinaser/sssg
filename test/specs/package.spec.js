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

var DEBUG = false; // Set true to show verbose messages in test

describe('Package', function(){
  var share = new Share();
  
  before(function(done){
    this.timeout(30000);
    if(!DEBUG) share.suppressConsole();
    
    ssg.do("package", share.testConfig, function(){
      share.resetConsole();
      done();
    });
  });

  it('should generate index.html', function(){
    expect(file(share.testdata.output + "/index.html")).to.equal(file(share.testdata.expected + "/index.packed.html"));
  });

  it('should generate sub content html', function(){
    expect(file(share.testdata.output + "/contents/sub1/test.html")).to.equal(file(share.testdata.expected + "/contents/sub1/test.packed.html"));
  });

  it('should clean css files', function(){
    expect(dir(share.testdata.output + "/css")).to.not.exist;
  });
  
  it('should clean js files', function(){
    expect(dir(share.testdata.output + "/js")).to.not.exist;
  });

  it('should clean image files', function(){
    expect(dir(share.testdata.output + "/image")).to.not.exist;
  });

  if(!DEBUG){
    after(function(done){
      del(share.testdata.output, {force: true}).then(function(){
        done();
      });
    });
  }
});
