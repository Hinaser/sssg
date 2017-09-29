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
  describe('#dev', function () {
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
  
    if(!DEBUG){
      after(function(done){
        del(share.testdata.output, {force: true}).then(function(){
          done();
        });
      });
    }
  });
});
