const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nr = require('newrelic');

const request = require('superagent');

const redis = require('redis');

const client = redis.createClient();

const pg = require('pg');
const port = 8080;
const app = express();

const pool = new pg.Pool({
  user: 'jo-eunbyeol',
  host: 'localhost',
  database: 'jamie',
  port: '5432',
});


client.on('connect', function(){
 // console.log('Redis is connected');
})
client.on('error', function(){
//  console.log('Error connecting');
})
pool.connect((err, data) => {
  if(err) {
  //  console.log(err);
  } else {
  //  console.log('connected');
  }
});



app.use(bodyParser.json());

app.use('/:id', express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Mehods',
      'GET, POST, PUT, PATCH, DELETE',
    );
    return res.status(200).json({});
  }
  next();
});

function cache(req, res, next) {
  const id = req.params.houseId;
  client.get(id, function (err, data) {
      if (err) throw err;
      if (data !== null) {
        console.log('!!!!',data)
          res.send(data);
      } else {
          next();
      }
  });
}
/*
app.get('/api/house/:houseId/', (req, res) => {
  const id = req.params.houseId;
  pool.query(`select id,property_type,title,location,num_guests,num_beds,num_views,num_baths,num_rooms,studio,score,description_title,days_from_last_update,minimumstay,checkin_start_time,checkout_time,description_comment,host_id,highlights_id,cancellation_id,house_rules_id,amenities_id from house where id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes.rows[0]);
  });
});
*/

app.get('/api/house/:houseId/', cache, (req, res) => {
  const id = req.params.houseId;
  pool.query(`select id,property_type,title,location,num_guests,num_beds,num_views,num_baths,num_rooms,studio,score,description_title,days_from_last_update,minimumstay,checkin_start_time,checkout_time,description_comment,host_id,highlights_id,cancellation_id,house_rules_id,amenities_id from house where id = ${id}`, (err, queryRes) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(queryRes.rows[0]);
      client.setex(id, 36000, JSON.stringify(queryRes.rows[0]));
    }
  });
});

app.get('/api/house/:houseId/host/', (req, res) => {
  const id = req.params.houseId;
  pool.query('SELECT * FROM host where id = 1', (err, queryRes) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(queryRes.rows[0]);
    }
  });
});

app.get('/api/house/:houseId/highlights', (req, res) => {
  const id = req.params.houseId;
  pool.query(`SELECT highlights.title, highlights.comment
  FROM highlights
  INNER JOIN house_highlight ON highlights.id = house_highlight.highlight_id
  WHERE house_highlight.house_id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
});

app.get('/api/house/:houseId/amenities', (req, res) => {
  const id = req.params.houseId;
  pool.query(`SELECT amenities.name, amenities.description
  FROM amenities
  INNER JOIN house_amenities ON amenities.id = house_amenities.amenity_id
  WHERE house_amenities.house_id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
});

app.get('/api/house/:houseId/description', (req, res) => {
  const id = req.params.houseId;
  pool.query('SELECT * FROM descriptions where id <= 3', (err, queryRes) => {
    res.status(200).send(queryRes);
  });
});

app.get('/api/house/:houseId/amenities', (req, res) => {
  const id = req.params.houseId;
  pool.query('SELECT * FROM amenities where id <= 3', (err, queryRes) => {
    res.status(200).send(queryRes);
  });
});

app.get('/api/house/:houseId/cancellation', (req, res) => {
  const id = req.params.houseId;
  pool.query('select * from cancellation where id = 2', (err, queryRes) => {
    res.status(200).send(queryRes.rows[0]);
  });
});

app.put('/api/house/:houseId', (req, res) => {
  const id = req.params.houseId;
  pool.query(`UPDATE house SET num_views = num_views+1 where house.id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
});

app.post('/api/house/:houseId', (req, res) => {
  const id = req.params.houseId;
  const property_type = req.body.property_type;
  const title = req.body.title;
  const location = req.body.location;
  const num_guests = req.body.num_guests;
  const num_beds = req.body.num_beds;
  const num_views = req.body.num_views;
  const num_baths = req.body.num_baths;
  const num_rooms = req.body.num_rooms;
  const studio = req.body.studio;
  const score = req.body.score;
  const description_title = req.body.description_title;
  const days_from_last_update = req.body.days_from_last_update;
  const minimumstay = req.body.minimumstay;
  const checkin_start_time = req.body.checkin_start_time;
  const checkout_time = req.body.checkout_time;
  const description_comment = req.body.description_comment;
  const host_id = req.body.host_id;
  const highlights_id = req.body.highlights_id;
  const cancellation_id = req.body.cancellation_id;
  const house_rules_id = req.body.house_rules_id;
  const amenities_id = req.body.amenities_id;
  pool.query(`insert into house values(${id + 1},${property_type},${title},${location},${num_guests},${num_beds},${num_views},${num_baths},${num_rooms},${studio},${score},${description_title},${days_from_last_update},${minimumstay},${checkin_start_time},${checkout_time},${description_comment},${host_id},${highlights_id},${cancellation_id},${house_rules_id},${amenities_id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
});
app.delete('/api/house/:houseId', (req, res) => {
  const id = req.params.houseId;
  pool.query(`DELETE * FROM house where id = ${id}`, (err, queryRes) => {
    return queryRes;
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
module.exports = app;
