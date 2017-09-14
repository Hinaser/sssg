"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);

var file = chaiFiles.file;
var dir = chaiFiles.dir;

var Share = require('./shared');

// Load main module for test
var ssg = require('../../');

describe('Clean', function(){
  describe('#all', function(){
    var share = null;
    
    before(function(done){
      this.timeout(30000);
      share = new Share().suppressConsole();
      ssg.do("build", share.testConfig, function(){
        ssg.do("clean", share.testConfig, function(){
          share.resetConsole();
          done();
        });
      });
    });
  
    it('should clean index.html', function(done){
      expect(file(share.testdata.output + "/index.html")).to.not.exist;
      done();
    });

    it('should clean sub content html', function(done){
      expect(dir(share.testdata.output + "/contents/")).to.not.exist;
      done();
    });

    it('should clean all css files', function(done){
      expect(dir(share.testdata.output + "/css/")).to.be.empty;
      done();
    });

    it('should clean all image files', function(done){
      expect(dir(share.testdata.output + "/image/")).to.be.empty;
      done();
    });

    it('should clean all javascript files', function(done){
      expect(dir(share.testdata.output + "/js/")).to.be.empty;
      done();
    });
  })
});
