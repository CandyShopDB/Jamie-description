const express = require('express');
const bodyParser = require('body-parser');
//const roomsRoutes = require('./Rooms');
const path = require('path');
//const morgan = require('morgan');
const nr = require('newrelic');

const request = require('superagent');
const redis = require('redis');

const client = redis.createClient();

const router = express.Router();

const pg = require('pg');

client.on('connect', () => {
 // console.log('Connected to Redis...');
});

const port = 8080;
const app = express();
/*
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
*/
// const db = require('./queries.js');

const pool = new pg.Pool({
  user: 'jo-eunbyeol',
  host: 'localhost',
  database: 'jamie',
  port: '5432',
});

app.use(bodyParser.json());

app.use('/:id', express.static(path.join(__dirname, '../public')));

//app.use('/rooms', roomsRoutes);

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
});//
/*
function getHouseplz(req, res, next) {
 const id = req.params.houseId;
 console.log(id)
 pool.query(`SELECT * FROM house where id = ${id}`, (err, queryRes) => {
 client.hmset(`id:${req.params.houseId}`, queryRes.rows[0], (err, res) => {
   if(err) {console.log('err')};
   console.log(res);
 });
  res.status(200).send(queryRes.rows[0]);
});
};
*/
/*
app.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { rows } = db.query('SELECT * FROM house WHERE id = $1', [id]);
  console.log(rows[0]);
  res.send(rows[0]);
});
*/
// '/{{$randomNumber(1,15)}}/'
/*****with redis
app.get('/api/house/:houseId/', (req, res) => {
  const id = req.params.houseId;
  const q = `SELECT * FROM house where id = ${id}`;
  const isItHashed = client.hkeys(`id:${id}`, (err, replies) => Object.keys(replies).length);
//  console.log(client.hkeys(`id:${id}`, (err, replies) => Object.keys(replies)))
  if (!isItHashed) {
  //  console.log('nono')
    pool.query(q, (err, queryRes) => {
      res.send(queryRes.rows[0]);
    //  console.log(queryRes.rows[0])
      client.hmset(
        `id:${id}`, queryRes.rows[0],
        (err1, redisRes) => {
          if (err1) {
          //  console.log('from err1',err1);
            // return res.sendStatus(500);
          } else {
          //  console.log('saved');
          }
        },
      );
    });
  } else {
    client.hgetall(`id:${id}`, (err, hashresult) => {
      //   console.log('hgetall',result); // {"key":"value","second key":"second value"}
    //  console.log(`id:${id}`)
     // console.log('from cache',hashresult)
      res.send(hashresult);

    });
  }
  // res.status(200).send(queryRes.rows[0]);
});
// res.send(queryRes.rows[0])
/*
client.hgetall(`id:1006`, (err, hashresult) => {
  //   console.log('hgetall',result); // {"key":"value","second key":"second value"}

  console.log('from cache',hashresult)
  client.quit();
});
*/

/*
client.hkeys("id:1", function (err, replies) {
 return Object.keys(replies).length;
});
*/
/*
function cache(req, res, next) {
  client.hkeys(`id:${req.params.houseId}`, function (err, data) {
      if (data != null) {
        console.log(data)
      //  client.hgetall(`id:${id}`, function(err, result) {
        //  console.log('hgetall',Object.values(result)); // {"key":"value","second key":"second value"}
          res.send(JSON.parse(Object.values(data)));
     //   });
      } else {
          next();
      }
  })
};
*/
//select id,property_type,title,location,num_guests,num_beds,num_views,num_baths,num_rooms,studio,score,description_title,days_from_last_update,minimumstay,checkin_start_time,checkout_time,description_comment,host_id,highlights_id,cancellation_id,house_rules_id,amenities_id from house where id = 100;
// app.get('/api/house/:houseId/', cache, getHouseplz);
app.get('/api/house/:houseId/', (req, res) => {
  const id = req.params.houseId;
  pool.query(`select id,property_type,title,location,num_guests,num_beds,num_views,num_baths,num_rooms,studio,score,description_title,days_from_last_update,minimumstay,checkin_start_time,checkout_time,description_comment,host_id,highlights_id,cancellation_id,house_rules_id,amenities_id from house where id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes.rows[0]);
  });
//  pool.end();
});
app.get('/api/house/:houseId/host/', (req, res) => {
  const id = req.params.houseId;
  pool.query('SELECT * FROM host where id = 1', (err, queryRes) => {
    res.status(200).send(queryRes.rows[0]);
  });
//  pool.end();
});

app.get('/api/house/:houseId/highlights', (req, res) => {
  const id = req.params.houseId;
  pool.query(`SELECT highlights.title, highlights.comment
  FROM highlights
  INNER JOIN house_highlight ON highlights.id = house_highlight.highlight_id
  WHERE house_highlight.house_id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
  // pool.end();
});

app.get('/api/house/:houseId/amenities', (req, res) => {
  const id = req.params.houseId;
  pool.query(`SELECT amenities.name, amenities.description
  FROM amenities
  INNER JOIN house_amenities ON amenities.id = house_amenities.amenity_id
  WHERE house_amenities.house_id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
//  pool.end();
});

app.get('/api/house/:houseId/description', (req, res) => {
  const id = req.params.houseId;
  pool.query('SELECT * FROM descriptions where id <= 3', (err, queryRes) => {
    res.status(200).send(queryRes);
  });
//  pool.end();
});

app.get('/api/house/:houseId/amenities', (req, res) => {
  const id = req.params.houseId;
  pool.query('SELECT * FROM amenities where id <= 3', (err, queryRes) => {
    res.status(200).send(queryRes);
  });
//  pool.end();
});

app.get('/api/house/:houseId/cancellation', (req, res) => {
  const id = req.params.houseId;
  pool.query('select * from cancellation where id = 2', (err, queryRes) => {
    res.status(200).send(queryRes.rows[0]);
  });
//  pool.end();
});

app.put('/api/house/:houseId', (req, res) => {
  const id = req.params.houseId;
  pool.query(`UPDATE house SET num_views = num_views+1 where house.id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes);
  });
//  pool.end();
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
//  pool.end();
});
app.delete('/api/house/:houseId', (req, res) => {
  const id = req.params.houseId;
  pool.query(`DELETE * FROM house where id = ${id}`, (err, queryRes) => {
    res.status(200).send(queryRes.rows);
  });
//  pool.end();
});
/*
app.put('/api/house/:houseId', (req,res) => {
  const id = req.params.houseId;
  pool.connect((err,db,done) => {
    if(err) {
      return console.log(err);
    } else {
      db.query(`UPDATE house SET num_views = num_views+1 where house.id = ${id}`,(err,table)=> {
        done();
        if(err) {
          return console.log(err);
        } else {
         console.log('row',table.rows);
          console.log(typeof rows);
          db.end();
          res.status(200).send(table.rows)
        }
      })
    }
  })
});
*/


app.listen(port, () => console.log(`listening on port ${port}`));
module.exports = app;

