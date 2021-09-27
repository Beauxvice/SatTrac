// const mysql = require('mysql2');
// const Sequelize = require('sequelize');
// const satData = require('../server/json/combinedData.json');
// const satellite = require('../lib/satellite.js');
// const Cesium = require('../lib/cesium.js');

// const db = new Sequelize('propagate', 'root', '', {
//   dialect: 'mysql',
//   host: 'localhost',
//   logging: false
// });

// db.authenticate()
//   .then(() => {
//     console.log('\x1b[33m', 'Connection to SatTrac database successful', '\x1b[0m');
//   })
//   .catch((err) => {
//     console.error('\x1b[31m', 'Connection to SatTrac database NOT successful: \n', err, '\n', '\x1b[0m');
//   });

// const Satellites = db.define('satellites', {
//   'satNumber': {
//     type: Sequelize.INTEGER,
//     unique: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   'tle1': {
//     type: Sequelize.CHAR,
//     unique: true,
//     allowNull: false
//   },
//   'tle2': {
//     type: Sequelize.CHAR,
//     unique: true,
//     allowNull: false
//   },
//   'startAt': Sequelize.INTEGER,
//   'endAt': Sequelize.INTEGER,
//   'officialucsSatName': Sequelize.TEXT,
//   'countryOfRegistry': Sequelize.TEXT,
//   'owner': Sequelize.TEXT,
//   'user': Sequelize.TEXT,
//   'purpose': Sequelize.TEXT
// })

// const Positions = db.define('positions', {
//   'x': {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   }, 
//   'y': {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   'z': {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   'dayNumber': {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   'secondNumber': {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   'fk_satNumber': {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
// })

// Satellites.hasMany(Positions, {foreignKey: 'fk_satNumber', targetKey: 'satNumber'});

// db.sync()
// .then(() => {
//   console.log('\x1b[33m', 'Propagate schema synced to database', '\x1b[0m');
// })
// .catch((err) => {
//   console.error('\x1b[31m', 'Propagate schema NOT synced to database: \n', err, '\n', '\x1b[0m');
// })

// module.exports = {
//   db, 
//   Satellites,
//   Positions,
// };
