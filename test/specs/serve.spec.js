"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

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
    
    it("should return index.html", function(done){
      this.timeout(10000);
      
      chai.request("http://localhost:3000")
        .get("/")
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        })
    })
  })
});
