const satellite = require('../../lib/satellite.js');
const Cesium = require('../../lib/cesium.js');

const { Satellites, db, Positions } = require('../../db');
const { restructureQuery } = require('./restructure')

const getAllSatellites = async () => {
  const sats = await Satellites.findAll({
    raw: true,
  })
  return await findPoints(sats);
};

const findPoints = async (sats) => {
   let resSats = [];
  for (let sat of sats) {  
    const points = await Positions.findAll({
      where: {fk_satNumber: sat.satNumber},
      raw: true
    });
    resSats.push(restructureQuery(sat, points));
  };
  return resSats;
};


module.exports = {
  getAllSatellites,
};



  