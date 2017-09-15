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

describe('Main/Index module', function() {
  it("should support build task", function(done){
    expect(ssg.isSupported("build")).to.be.true;
  });
  
  it("should support clean task", function(done){
    expect(ssg.isSupported("clean")).to.be.true;
  });
  
  it("should support init task", function(done){
    expect(ssg.isSupported("init")).to.be.true;
  });
  
  it("should support serve task", function(done){
    expect(ssg.isSupported("serve")).to.be.true;
  });
});
