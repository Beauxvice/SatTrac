const Mongoose = require('mongoose');

const satData = require('../server/json/combinedData.json');
const satellite = require('../lib/satellite.js');
const Cesium = require('../lib/cesium.js');
const db = require('./index');
const Satellites = require('../models/satellites');
const Positions = require('../models/positions');



const generatePoints = async (db) => {
  const totalSeconds = 60 * 60 * 24 * 1;
  const timeStepInSeconds = 60;

  let rawStart = {dayNumber: 2459412, secondsOfDay: 0};
  let newTime = new Cesium.JulianDate;
  let _start = Object.assign(newTime, rawStart);
  
  const startTime = Date.now();
  const numberOfSatellites = Object.keys(satData).length;
  let counter = 0;
  
    for(let sat in satData) {
      if(satData[sat].satrec.error === 0) {
        const { tle1, tle2, officialucsSatName, countryOfRegistry, owner, users, purpose} = satData[sat];
        let satNumber = satData[sat].satrec.satnum;
        const satrec = satData[sat].satrec;
        
        await Satellites.findOneOrCreate(
          { 
            satelliteNumber: satNumber
          },
          {
            tle1: tle1,
            tle2: tle2,
            officialucsSatName: officialucsSatName,
            countryOfRegistry: countryOfRegistry,
            owner: owner,
            users: users,
            purpose: purpose
          }, 
          (error, newSat) => {

            const points = [];

            for (let i = 0; i < totalSeconds; i+= timeStepInSeconds) {

              const time = Cesium.JulianDate.addSeconds(_start, i, new Cesium.JulianDate());
              const jsDate = Cesium.JulianDate.toDate(time);
              const gmst = satellite.gstime(jsDate);

              const positionAndVelocity = satellite.propagate(satrec, jsDate);
              const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
              const position = Cesium.Cartesian3.fromRadians(p.longitude, p.latitude, p.height * 1000);

              let { dayNumber, secondsOfDay } = time;
              secondsOfDay = Math.trunc(secondsOfDay);

              let { x, y, z } = position;

              points.push({
                x: x,
                y: y,
                z: z
              });
            };

            newSat.positions.push(points);

            if(counter % 250 === 0) {
              console.log('\x1b[36m', `${counter} satellites of ${numberOfSatellites} calculated in `, '\x1b[33m', (Date.now() - startTime) / 1000 + 's', '\x1b[0m');
            }

            counter++;
            return newSat.save();
          }
        )
      };
    }
    
}

generatePoints(db);






















// await Positions.findOrCreate({ where: {fk_satNumber: satNumber, dayNumberAndSecond: dayNumberAndSecond},
//   defaults: {
//     x: x,
//     y: y,
//     z: z
//   }}).catch(err => {
//     console.error('\x1b[31m', `Satellite ${satNumber} creation error: \n`, err, '\n', '\x1b[0m');
//   });

// const isSatelliteNumberDuplicate = (satNumber) => {
//   return Satellites.findOne({ where: { satNumber } })
//   .then(queryResult => {
//     return queryResult === null;
//   });
// };

// const isSatelliteNumberUnique = async (satNumber) => {
//   let qr = await Satellites.findOne({ where: { satNumber } });
//   return qr === null;
// };

// const isPositionDuplicate = async (satNumber, secondsOfDay) => {
//   let qr = await Positions.findOne({ where: { fk_satNumber: satNumber } });
//   return qr === null;
// };