const express = require('express');
const parser = require('body-parser');
const Sequelize = require('sequelize');


const satellite = require('../lib/satellite.js');
const Cesium = require('../lib/cesium.js');
const { Satellites, db, Positions } = require('../db');
const { classesRouter } = require('../routes');
const { getAllSatellites } = require('./workers/queries')

const app = express();
app.use('/satellites', classesRouter);

const port = 3000;


app.get('/satellites', async (req, res) => {
  console.log("\x1b[31m", 'request received <=');  
  const response = await getAllSatellites()
  res.send(response);
})
  

app.listen(port, () => {
  console.log("\x1b[37m\x1b[40m", `app listening at http://localhost:${port}...`); 
})
