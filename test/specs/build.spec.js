"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);

var file = chaiFiles.file;

var Share = require('./shared');

// Load main module for test
var ssg = require('../../');

describe('Build', function(){
  describe('#all', function(){
    var share = null;
    
    before(function(done){
      this.timeout(30000);
      share = new Share().suppressConsole();
      ssg.do("build", share.testConfig, function(){
        share.resetConsole();
        done();
      });
    });
  
    it('should generate index.html', function(done){
      expect(file(share.testdata.output + "index.html")).to.equal(file(share.testdata.expected + "/index.html"));
      done();
    });

    it('should generate sub content html', function(done){
      expect(file(share.testdata.output + "/contents/sub1/test.html")).to.equal(file(share.testdata.expected + "/contents/sub1/test.html"));
      done();
    });

    it('should generate css file', function(done){
      expect(file(share.testdata.output + "/css/main.css")).to.equal(file(share.testdata.expected+ "/css/main.css"));
      done();
    });

    it('should generate image file', function(done){
      expect(file(share.testdata.output + "/image/image-test.jpg")).to.equal(file(share.testdata.expected+ "/image/image-test.jpg"));
      done();
    });

    it('should generate javascript file', function(done){
      expect(file(share.testdata.output + "/js/main.js")).to.equal(file(share.testdata.expected+ "/js/main.js"));
      done();
    });
  })
});
