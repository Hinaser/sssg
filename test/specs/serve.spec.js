"use strict";

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-http'));
var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;

var Share = require('./shared');

// Load main module for test
var ssg = require('../../');

describe('Serve', function() {
  describe('#dev', function () {
    var share = null;
    
    before(function (done) {
      this.timeout(30000);
      share = new Share().suppressConsole();
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
        expect(response.text).to.equal(file(__dirname + "/../testdata/input/dst/index.html"));
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
        expect(response.text).to.equal(file(__dirname + "/../testdata/input/dst/css/main.css"));
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
  })
});
