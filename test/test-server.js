'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../lib/app');
var should = chai.should();

chai.use(chaiHttp);

describe('Express microservice starter API', function() {

  it('should return 200 on / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should return 200 on /heartbeat GET', function(done) {
    chai.request(server)
      .get('/heartbeat')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should return 404 on /this-endpoint-not-exist api GET', function(done) {
    chai.request(server)
      .get('/this-endpoint-not-exist')
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
  });

});
