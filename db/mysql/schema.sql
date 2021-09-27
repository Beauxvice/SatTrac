-- DROP DATABASE IF EXISTS propagate;
-- CREATE DATABASE propagate;

-- USE propagate;

-- CREATE TABLE `satellites` (
--   `id` int PRIMARY KEY AUTO_INCREMENT,
--   `satNumber` int UNIQUE NOT NULL,
--   `tle1` varchar(255) UNIQUE NOT NULL,
--   `tle2` varchar(255) UNIQUE NOT NULL,
--   `officialucsSatName` varchar(255),
--   `countryOfRegistry` varchar(255),
--   `owner` varchar(255),
--   `usersr` varchar(255),
--   `purposer` varchar(255),
--   `cosparNumber` varchar(255)
-- );


-- CREATE TABLE `positions` (
--   `id` int PRIMARY KEY AUTO_INCREMENT,
--   `x` int NOT NULL,
--   `y` int NOT NULL,
--   `z` int NOT NULL,
--   `dayNumber` int NOT NULL,
--   `secondsOfDay` int NOT NULL,
--   `id_satellite` int,
--   FOREIGN KEY (id_satellite) REFERENCES satellites(id)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables. */

