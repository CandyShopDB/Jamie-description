const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index.js');
const pg = require('pg');
const request = require('request');

const should = chai.should();
const expect = require('chai').expect;

const pool = new pg.Pool({
  user: 'jo-eunbyeol',
  host: 'localhost',
  database: 'jamie',
  port: '5432',
});

chai.use(chaiHttp);

describe('connect to pool', () => {
  beforeEach((done) => {
    const pool = new pg.Pool({
      user: 'jo-eunbyeol',
      host: 'localhost',
      database: 'jamie',
      port: '5432',
    });
    pool.query('SELECT * FROM host where id = 1');
  });

  afterEach(() => {
    pool.end();
  });
});

describe('House', () => {
  it('should GET 200 status code when request for house Info', (done) => {
    chai.request(app)
      .get('/api/house/10000000')
      .end((err, res) => {
          res.should.have.status(200);
          done();
        });
  });
  it('should DELETE house', (done) => {
    const queryString = 'DELETE FROM house where id = 90078';
    pool.query(queryString, (err) => {
      if (err) { throw err; }
      request('http://127.0.0.1:8080/api/house/90078', (error, response, body) => {
        expect(body).to.equal('');
        done();
      });
    });
  });
});


describe('Host', () => {
  it('Should get first Host Info from the DB', (done) => {
    const queryString = 'SELECT * FROM host where id = 1';
    pool.query(queryString, (err) => {
      if (err) { throw err; }
      request('http://127.0.0.1:8080/api/house/1000/host', (error, response, body) => {
      const hostInfo = JSON.parse(body);
        expect(hostInfo.name).to.equal('MJ');
        expect(hostInfo.pictureurl).to.equal('https://s3.amazonaws.com/uifaces/faces/twitter/jeremymouton/128.jpg');
        done();
      });
    });
  });
  it('Should get last Host Info from the DB', (done) => {
    const queryString = 'SELECT * FROM host where id = 100000';
    pool.query(queryString, (err) => {
      if (err) { throw err; }
      request('http://127.0.0.1:8080/api/house/100000', (error, response, body) => {
        const houseInfo = JSON.parse(body);
        expect(houseInfo.title).to.equal('voluptate');
        expect(houseInfo.host_id).to.equal(24971);
        done();
      });
    });
  });
});


