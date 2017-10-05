"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var del = require('del');

var file = chaiFiles.file;

var Share = require('./shared');

// Load main module for test
var sssg = require('../../');

describe('sssg/index.js', function() {
  describe('#isSupported', function(){
    it("should support build task", function(){
      expect(sssg.isSupported("build")).to.be.true;
    });
  
    it("should support clean task", function(){
      expect(sssg.isSupported("clean")).to.be.true;
    });
  
    it("should support rebuild task", function(){
      expect(sssg.isSupported("rebuild")).to.be.true;
    });
  
    it("should support init task", function(){
      expect(sssg.isSupported("init")).to.be.true;
    });
  
    it("should support serve task", function(){
      expect(sssg.isSupported("serve")).to.be.true;
    });
  });
  
  describe('#do', function(){
    var share = new Share();
    
    it("should throw an Error with unsupported task", function(){
      expect(function(){sssg.do('some-unsupported-task')}).to.throw();
    });
    
    it("should throw an Error when gulp.start is not implemented", function(){
      require('gulp').start = undefined;
      expect(function(){sssg.do('clean', share.testConfig)}).to.throw();
    });
  });
});
