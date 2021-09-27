const mongoose = require('mongoose');
const satData = require('../server/json/combinedData.json');
const satellite = require('../lib/satellite.js');
const Cesium = require('../lib/cesium.js');



mongoose.connect('mongodb://localhost:27017/propagate', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('\x1b[33m', 'Connection to SatTrac database successful', '\x1b[0m');
}).catch(error => {
  console.error('\x1b[31m', 'Connection to SatTrac database NOT successful: \n', err, '\n', '\x1b[0m');
});

module.exports = db;