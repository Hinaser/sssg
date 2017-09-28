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

var DEBUG = false; // Set true to show verbose messages in test

describe('Rebuild', function(){
  describe('#all', function(){
    var share = new Share();
    
    before(function(done){
      this.timeout(30000);
      if(!DEBUG) share.suppressConsole();
      ssg.do("rebuild", share.testConfig, function(){
        share.resetConsole();
        done();
      });
    });
  
    it('should generate index.html', function(){
      expect(file(share.testdata.output + "/index.html")).to.equal(file(share.testdata.expected + "/index.html"));
    });

    it('should generate sub content html', function(){
      expect(file(share.testdata.output + "/contents/sub1/test.html")).to.equal(file(share.testdata.expected + "/contents/sub1/test.html"));
    });

    it('should generate css file', function(){
      expect(file(share.testdata.output + "/css/main.css")).to.equal(file(share.testdata.expected+ "/css/main.css"));
    });
    
    it('should merge lib css files', function(){
      expect(file(share.testdata.output + "/css/lib.css")).to.equal(file(share.testdata.expected + "/css/lib.css"));
    });

    it('should generate image file', function(){
      expect(file(share.testdata.output + "/image/image-test.jpg")).to.equal(file(share.testdata.expected+ "/image/image-test.jpg"));
    });

    it('should generate javascript file', function(){
      expect(file(share.testdata.output + "/js/main.js")).to.equal(file(share.testdata.expected+ "/js/main.js"));
    });
  
    it('should merge lib js files', function(){
      expect(file(share.testdata.output + "/js/lib.js")).to.equal(file(share.testdata.expected + "/js/lib.js"));
    });
  
    it('should copy raw misc files', function(){
      expect(file(share.testdata.output + "/misc/sample1/test.json")).to.equal(file(share.testdata.expected + "/misc/sample1/test.json"));
    });
    
    if(!DEBUG){
      after(function(done){
        del(share.testdata.output, {force: true}).then(function(){
          done();
        });
      });
    }
  })
});
