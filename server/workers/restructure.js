const satellite = require('../../lib/satellite.js');
const Cesium = require('../../lib/cesium.js');

const getAllSats = async () => {

};

const restructureQuery = (satellite, positions) => {
  let pointArray = [];
  let timeArray = [];


  positions.forEach((dbPoint) => {
    const point = {
      x: dbPoint.x,
      y: dbPoint.y,
      z: dbPoint.y
    };
    const time = {
      dayNumber: dbPoint.dayNumber,
      secondNumber: dbPoint.secondNumber
    };
    pointArray.push(point);
    timeArray.push(time);
  })

  satellite.positions = pointArray;
  satellite.times = timeArray;
  
  return satellite;
};

module.exports = {
  restructureQuery,
};