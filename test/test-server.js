const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index.js');
const pg = require('pg');
const mocha = require('mocha');
const request = require('request');


const it = mocha.it;
const should = chai.should();
const expect = require('chai').expect;

const pool = new pg.Pool({
  user: 'jo-eunbyeol',
  host: 'localhost',
  database: 'jamie',
  port: '5432',
});

pool.query('CREATE TABLE House (
  id serial,
  property_type VARCHAR(500),
  title VARCHAR(500),
  location VARCHAR(500),
   num_guests smallint,
   num_beds smallint,
   num_views smallint,
   num_baths smallint,
   num_rooms smallint,
   studio  Boolean,
   score smallint,
   description_title VARCHAR(500),
   days_from_last_update INT,
   minimumstay smallint,
   checkin_start_time smallint,
   checkout_time smallint,
   description_comment VARCHAR(5000),
   host_id INT,
   highlights_id INT,
   cancellation_id INT,
   house_rules_id INT,
   amenities_id INT,
   FOREIGN KEY (host_id) REFERENCES host(id),
   FOREIGN KEY (house_rules_id) REFERENCES house_rules(id),
   FOREIGN KEY (highlights_id) REFERENCES highlights(ID),
   FOREIGN KEY (cancellation_id) REFERENCES cancellation(id),
   FOREIGN KEY (amenities_id) REFERENCES amenities(id),
   primary key(id)
);


', (err, res) => {
  console.log(err, res)
  pool.end()
})


chai.use(chaiHttp);

describe('connect to pool', () => {
  beforeEach(() => {
  /*  const pool = new pg.Pool({
      user: 'jo-eunbyeol',
      host: 'localhost',
      database: 'jamie',
      port: '5432',
    });

   pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
     } else {
       console.log('connected')
     }
    });

  });

  afterEach(() => {
  // pool.end();
  */
  });
  ///// GET
  it('should GET 200 status code when request for house Info', (done) => {
    chai.request(app)
      .get('/api/house/10000000')
      .end((err, res) => {
          res.should.have.status(200);
          done();
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
  //POST
  it('Should POST house data to the DB', (done) => {
    const queryString = `insert into house values(10000001,"molestias","modi","molestiae",6,9,44,2,4,true,3,"clean house",294,38607,89290,6816,"hohhjkj,5,12,6,19,2`;
    pool.query(queryString, (err) => {
      if (err) { throw err; }
      request('http://127.0.0.1:8080/api/house/1000/', (error, response, body) => {
        const hostInfo = JSON.parse(body);
        expect(hostInfo.name).to.equal('MJ');
        expect(hostInfo.pictureurl).to.equal('https://s3.amazonaws.com/uifaces/faces/twitter/jeremymouton/128.jpg');
        done();
      });
    });
  });
  ///DELETE
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


 ////end
});




