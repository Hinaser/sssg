"use strict";

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-http'));
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;
var del = require('del');
var Share = require('./shared');

var cache = require('gulp-cached');

// Load main module for test
var ssg = require('../../');

var DEBUG = false; // Set true to show verbose messages in test

describe('Serve', function() {
  describe('#server', function () {
    describe('#correct case', function(){
      var share = new Share();
  
      before(function (done) {
        this.timeout(30000);
        if(!DEBUG) share.suppressConsole();
    
        // Clear cache
        cache.caches = {};
    
        ssg.do("serve", share.testConfig, function () {
          share.resetConsole();
          done();
        });
      });
  
      if(!DEBUG){
        after(function(done){
          del(share.testdata.output, {force: true}).then(function(){
            done();
          });
        });
      }
  
      describe('Request to "http://localhost:3000/"', function(){
        var response = null;
    
        before(function(done){
          this.timeout(10000);
      
          chai.request("http://localhost:3000")
            .get("/")
            .end(function(err, res){
              response = res;
              done();
            });
        });
    
        it("should response status code 200", function(){
          expect(response).to.have.status(200);
        });
    
        it("should be html", function(){
          expect(response).to.be.html;
        });
    
        it("should be equal to local index.html file", function(){
          expect(response.text).to.equal(file(share.testdata.expected + "/index.html"));
        });
      });
  
      describe('Request to "http://localhost:3000/contents/sub1/test.html"', function(){
        var response = null;
    
        before(function(done){
          this.timeout(10000);
      
          chai.request("http://localhost:3000")
            .get("/contents/sub1/test.html")
            .end(function(err, res){
              response = res;
              done();
            });
        });
    
        it("should response status code 200", function(){
          expect(response).to.have.status(200);
        });
    
        it("should be html", function(){
          expect(response).to.be.html;
        });
    
        it("should be equal to local index.html file", function(){
          expect(response.text).to.equal(file(share.testdata.expected + "/contents/sub1/test.html"));
        });
      });
  
      describe('Request to "http://localhost:3000/css/main.css"', function(){
        var response = null;
    
        before(function(done){
          this.timeout(10000);
      
          chai.request("http://localhost:3000")
            .get("/css/main.css")
            .end(function(err, res){
              response = res;
              done();
            });
        });
    
        it("should response status code 200", function(){
          expect(response).to.have.status(200);
        });
    
        it("should be css", function(){
          expect(response).to.have.header('content-type', /^text\/css/);
        });
    
        it("should be equal to local main.css file", function(){
          expect(response.text).to.equal(file(share.testdata.expected + "/css/main.css"));
        });
      });
  
      describe('Request to "http://localhost:3000/js/main.js"', function(){
        var response = null;
    
        before(function(done){
          this.timeout(10000);
      
          chai.request("http://localhost:3000")
            .get("/js/main.js")
            .end(function(err, res){
              response = res;
              done();
            });
        });
    
        it("should response status code 200", function(){
          expect(response).to.have.status(200);
        });
    
        it("should be javascript", function(){
          expect(response).to.have.header('content-type', /^application\/javascript/);
        });
    
        /*
        // TODO Comment here out if chai-http can get data if content-type is application/javascript
        it("should be equal to local main.js file", function(){
          expect(response.text).to.equal(file(__dirname + "/../testdata/input/dst/js/main.js"));
        });
        */
      });
    });
  
    describe('#error case', function(){
      describe('#Error in Javascript', function(){
        var share = new Share();
        share.testConfig.src = share.testdata.input =  __dirname + "/../testdata/input/src-build-js3/";
  
        before(function (done) {
          this.timeout(30000);
          if(!DEBUG) share.suppressConsole();
    
          // Clear cache
          cache.caches = {};
    
          ssg.do("serve", share.testConfig, function () {
            share.resetConsole();
            done();
          });
        });
  
        if(!DEBUG){
          after(function(done){
            del(share.testdata.output, {force: true}).then(function(){
              done();
            });
          });
        }
        
        describe('Request to "http://localhost:3000/"', function(){
          var response = null;
    
          before(function(done){
            this.timeout(10000);
      
            chai.request("http://localhost:3000")
              .get("/")
              .end(function(err, res){
                response = res;
                done();
              });
          });
    
          it("should response status code 200", function(){
            expect(response).to.have.status(200);
          });
    
          it("should be html", function(){
            expect(response).to.be.html;
          });
        });
      });
    });
  });
  
  describe('#functions', function(){
    var share = new Share();
    var path = require('path');
    
    describe('pug2htmlPath', function(){
      beforeEach(function(){
        // Clear require cache for testing
        delete require.cache[require.resolve('yargs')];
        delete require.cache[require.resolve('../../lib/args')];
        delete require.cache[require.resolve('../../gulp/config')];
        
        require('yargs')([
          '--src', share.testConfig.src,
          '--dst', share.testConfig.dst,
          '--root', share.testConfig.root,
          '--silent'
        ]);
        
        share.doInSilence(function(){
          require('../../gulp/config');
        });
      });
  
      describe('#with valid index.pug path', function () {
        var pug2htmlPath = require('../../gulp/tasks/serve').test.pug2htmlPath;
        var arg = share.testConfig.src + '/html/index.pug';
        it('should return correct index html file path', function() {
          expect(pug2htmlPath(arg)).to.equal(path.resolve(share.testConfig.root + '/index.html'));
        });
      });
  
      describe('#with valid .pug file path', function () {
        var pug2htmlPath = require('../../gulp/tasks/serve').test.pug2htmlPath;
        var arg = share.testConfig.src + '/html/sub1/test.pug';
        it('should return correct index html file path', function() {
          expect(pug2htmlPath(arg)).to.equal(path.resolve(share.testConfig.dst + '/contents/sub1/test.html'));
        });
      });
  
      describe('#with invalid .pug path', function () {
        var pug2htmlPath = require('../../gulp/tasks/serve').test.pug2htmlPath;
        var arg = '/tmp/AAAA/index.pug';
        it('should throw Error', function() {
          expect(function(){pug2htmlPath(arg)}).to.throw();
        });
      });
    });
  
    describe('pugMiddleware', function(){
      var ncp = require('ncp').ncp;
      var pug = require('pug');
      
      var res = {end: function(b){ return b }};
      var next = function(){ return '0123' };
  
      beforeEach(function (done) {
        // Clear require cache for testing
        delete require.cache[require.resolve('yargs')];
        delete require.cache[require.resolve('../../lib/args')];
        delete require.cache[require.resolve('../../gulp/config')];
        
        require('../../lib/args')([
          '--src', __dirname + '/../testdata/input/src-serve',
          '--dst', __dirname + '/../testdata/output/dst-serve',
          '--root', __dirname + '/../testdata/output/dst-serve',
          '--silent'
        ]);
  
        share.doInSilence(function(){
          require('../../gulp/config');
        });
  
        // Delete folder
        del(__dirname + '/../testdata/output/dst-serve', {force: true}).then(function(){
          // cp -r test data
          ncp(__dirname + '/../testdata/input/dst-serve',
            __dirname + '/../testdata/output/dst-serve', function(){
              done();
            });
        });
      });
  
      afterEach(function(done){
        del(__dirname + '/../testdata/output/dst-serve', {force: true}).then(function(){
          done();
        });
      });
  
      describe('#requests to non-html content', function () {
        var pugMiddleware = require('../../gulp/tasks/serve').test.pugMiddleware;
        var req = {url: 'http://localhost:3000/css/main.css'};
        
        it('should do nothing', function() {
          expect(pugMiddleware(req, res, next)).to.equal(next());
        });
      });
      
      describe('#requests to root path without filename. File already exists.', function () {
        var pugMiddleware = require('../../gulp/tasks/serve').test.pugMiddleware;
        var req = {url: 'http://localhost:3000/'};
        
        it('should do nothing', function() {
          expect(pugMiddleware(req, res, next)).to.equal(next());
        });
      });
  
      describe('#requests to root index.html. File already exists.', function () {
        var pugMiddleware = require('../../gulp/tasks/serve').test.pugMiddleware;
        var req = {url: 'http://localhost:3000/index.html'};
        
        it('should do nothing', function() {
          expect(pugMiddleware(req, res, next)).to.equal(next());
        });
      });
  
      describe('#requests to common html that exists', function () {
        var pugMiddleware = require('../../gulp/tasks/serve').test.pugMiddleware;
        var req = {url: 'http://localhost:3000/contents/sub1/test.html'};
        
        it('should do nothing', function() {
          expect(pugMiddleware(req, res, next)).to.equal(next());
        });
      });
  
      describe('#requests to common html that does not exist', function () {
        var pugMiddleware = require('../../gulp/tasks/serve').test.pugMiddleware;
        var req = {url: 'http://localhost:3000/contents/sub1/test2.html'};
        
        it('should build html from pug', function() {
          var compiledContent = null;
          res.end = function (b) { compiledContent = b };
          var content = pug.renderFile(__dirname + '/../testdata/input/src-serve/html/sub1/test2.pug');
  
  
          share.doInSilence(function(){
            pugMiddleware(req, res, next);
          });
          expect(compiledContent.toString()).to.equal(content);
        });
      });
      
      describe('#requests to invalid path', function () {
        var pugMiddleware = require('../../gulp/tasks/serve').test.pugMiddleware;
        var req = {url: 'http://localhost:3000/wrong-path/aaa.html'};
        
        it('should do nothing', function() {
          expect(pugMiddleware(req, res, next)).to.equal(next());
        });
      });
    });
  });
});
