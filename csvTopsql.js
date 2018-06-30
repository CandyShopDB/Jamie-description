//jamie=# \copy cancellation(id,cancel_type,cancel_summary) FROM './cancellation.csv' DELIMITER ',' csv header
var pg = require('pg');
var path = require('path');

const pool = new pg.Pool({
  user: 'jo-eunbyeol',
  host: 'localhost',
  database: 'jamie',
  port: '5432'
});
pool.connect((err, data) => {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
//\copy house_amenities FROM ./house_amenities.csv DELIMITER ',' csv header
let way = path.join(__dirname,'/house_amenities.csv');
pool.query(`copy house_amenities FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});

/*
//\copy amenities totalHouse FROM './totalHouse.csv' DELIMITER ',' csv header;
let way = path.join(__dirname,'/totalHouse.csv');
pool.query(`copy house FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});
*/

pool.query(`select * from house where id=1`, (err, res) => {
 console.log(res.rows);
  pool.end();
});
//pool.query('INSERT INTO house (id,property_type,title,location,num_guests,num_beds,num_views,num_baths,num_rooms,studio,score,description_title,days_from_last_update,minimumstay,checkin_start_time,checkout_time,description_comment,host_id,highlights_id,cancellation_id,house_rules_id,amenities_id) VALUES (10,reiciendis,molestiae,tempore,5,5,47,2,3,false,5,pariatur,12,1,10,11,'Repellat dolore earum beatae non et porro molestias corporis veritatis.', 13763,36763,536,7614,3)'));
//pool.end();
/*pool.query(`copy house FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});
*/
///Users/jo-eunbyeol/workspace/Jamie-description/csvTopsql.js
/*let way = path.join(__dirname,'/houseRules.csv');
pool.query(`copy house_rules FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});
*/
/*
let way = path.join(__dirname,'/highlights.csv');
pool.query(`copy highlights FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});
*/
/*
let way = path.join(__dirname,'/amenities.csv');
pool.query(`copy amenities FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});
*/
/*
let way = path.join(__dirname,'/host.csv');
pool.query(`copy real_host FROM '${way}' DELIMITER ',' csv header`, (err, res) => {
  console.log(err, res);
  pool.end();
});

*/


///cat host.csv | couchimport --url http://localhost:5984 --db hosts--delimiter ‘,’
module.exports = {
  query: (text, params) => pool.query(text, params),
}



/// CREATE INDEX house_idx ON house_highlight USING btree(house_id);
