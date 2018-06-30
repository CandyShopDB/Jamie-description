
DROP TABLE IF EXISTS host;
CREATE TABLE real_host (
   id serial,
   name VARCHAR(30),
   pictureUrl VARCHAR(100),
   primary key(id)
);

DROP TABLE IF EXISTS amenities;
CREATE TABLE amenities (
   id serial,
   name VARCHAR(30),
   primary key(id)
);

DROP TABLE IF EXISTS cancellation;
CREATE TABLE cancellation (
   id serial,
   cancellationType VARCHAR(30),
   cancellationSummary VARCHAR(1000),
   primary key(id)
);

DROP TABLE IF EXISTS highlights;
CREATE TABLE highlights (
   id serial,
   title VARCHAR(30),
   comment VARCHAR(1000),
   primary key(id)
);
DROP TABLE IF EXISTS house_rules;
CREATE TABLE house_rules (
   id serial,
   rulename VARCHAR(30),
   primary key(id)
);


DROP TABLE IF EXISTS House;

CREATE TABLE House (
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



