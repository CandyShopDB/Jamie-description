const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index.js');
const pg = require('pg');
const should = chai.should();
const pool = new pg.Pool({
  user: 'jo-eunbyeol',
  host: 'localhost',
  database: 'jamie',
  port: '5432',
});

chai.use(chaiHttp);

describe('App', function() {
  it('should list ALL blobs on /blobs GET', function(done) {
    chai.request(app)
      .get('/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  describe('App', function() {
    it('should GET house based on id', function(done) {
      chai.request(app)
        .get('/api/house/:houseId')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('App', function() {
    it('should PUT house based on id', function(done) {
      chai.request(app)
        .put('/api/house/:houseId')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});
