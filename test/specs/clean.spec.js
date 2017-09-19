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
  
    it('should clean index.html', function(){
      expect(file(share.testdata.output + "/index.html")).to.not.exist;
    });

    it('should clean sub content html', function(){
      expect(dir(share.testdata.output + "/contents/")).to.not.exist;
    });

    it('should clean all css files', function(){
      expect(dir(share.testdata.output + "/css/")).to.be.empty;
    });

    it('should clean all image files', function(){
      expect(dir(share.testdata.output + "/image/")).to.be.empty;
    });

    it('should clean all javascript files', function(){
      expect(dir(share.testdata.output + "/js/")).to.be.empty;
    });
  
    it('should clean sub content html', function(){
      expect(dir(share.testdata.output + "/misc/")).to.not.exist;
    });
    
  })
});
