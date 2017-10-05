"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var del = require('del');
var file = chaiFiles.file;
var dir = chaiFiles.dir;
var Share = require('./shared');

var cache = require('gulp-cached');

// Load main module for test
var ssg = require('../../');

var DEBUG = false; // Set true to show verbose messages in test

function before_and_after(config, task, beforeCallback, afterCallback){
  before(function(done){
    this.timeout(30000);
    if(!DEBUG) config.suppressConsole();
  
    // Clear cache
    cache.caches = {};
    
    if(typeof(beforeCallback)==="function") beforeCallback();
    
    ssg.do(task, config.testConfig, function(){
      config.resetConsole();
      done();
    });
  });
  
  if(!DEBUG){
    after(function(done){
      if(typeof(afterCallback)==="function") afterCallback();
      
      del(config.testdata.output, {force: true}).then(function(){
        done();
      });
    });
  }
}

describe('Build', function(){
  describe('#all', function(){
    var share = new Share();
    
    before_and_after(share, "build");
    
    it('should generate index.html', function(){
      expect(file(share.testdata.output + "/index.html")).to.equal(file(share.testdata.expected + "/index.html"));
    });

    it('should generate sub content html', function(){
      expect(file(share.testdata.output + "/contents/sub1/test.html")).to.equal(file(share.testdata.expected + "/contents/sub1/test.html"));
    });
  
    it('should ignore partial pug files', function(){
      expect(file(share.testdata.output + "/contents/_partial_test.html")).to.not.exist;
      expect(file(share.testdata.output + "/contents/layout.part.html")).to.not.exist;
    });
    
    it('should ignore partial pug folder', function(){
      expect(dir(share.testdata.output + "/contents/_sub2")).to.not.exist;
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
  });
  
  describe('#js', function() {
    describe('#with .babelrc', function(){
      var share = new Share();
      share.testConfig.src = share.testdata.input =  __dirname + "/../testdata/input/src-build-js/";
      share.testdata.expected =  __dirname + "/../testdata/input/dst-build-js/";
      
      before_and_after(share, "build:js");
      
      it('should transpile js code based on .babelrc profile', function(){
        expect(file(share.testdata.output + "/js/main.js")).to.equal(file(share.testdata.expected + "/js/main.js"));
      })
    });
    
    describe('#with .babelrc short preset name', function(){
      var share = new Share();
      share.testConfig.src = share.testdata.input =  __dirname + "/../testdata/input/src-build-js2/";
      share.testdata.expected =  __dirname + "/../testdata/input/dst-build-js2/";
    
      before_and_after(share, "build:js");
    
      it('should transpile js code based on .babelrc profile', function(){
        expect(file(share.testdata.output + "/js/main.js")).to.equal(file(share.testdata.expected + "/js/main.js"));
      })
    });
  
    describe('#compiling javascript file which has invalid syntax', function(){
      var share = new Share();
      share.testConfig.src = share.testdata.input =  __dirname + "/../testdata/input/src-build-js3/";
    
      before_and_after(share, "build:js");
    
      it('should output nothing', function(){
        expect(file(share.testdata.output + "/js/main.js")).to.not.exist;
      })
    });
  });
});
