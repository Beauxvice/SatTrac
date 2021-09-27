// const satData = require('../server/json/combinedData.json');
// const satellite = require('../lib/satellite.js');
// const Cesium = require('../lib/cesium.js');
// const { Satellites, db, Positions } = require('./init_schema');
// const Sequelize = require('sequelize');


// const generatePoints = async (db) => {
//   const totalSeconds = 60 * 60 * 24 * 1;
//   const timeStepInSeconds = 60;

  

//   let rawStart = {dayNumber: 2459412, secondsOfDay: 0};
//   let newTime = new Cesium.JulianDate;
//   let _start = Object.assign(newTime, rawStart);
  

//   const startTime = Date.now();
//   const numberOfSatellites = Object.keys(satData).length;
//   let counter = 0;
  

//   for(let sat in satData) {
//     if(satData[sat].satrec.error === 0) {
//       const { tle1, tle2, officialucsSatName, countryOfRegistry, owner, users, purpose} = satData[sat];
//       let satNumber = satData[sat].satrec.satnum;
//       const satrec = satData[sat].satrec;
      
//       if(counter % 250 === 0) {
//         console.log('\x1b[36m', `${counter} satellites of ${numberOfSatellites} calculated`, '\x1b[0m');
//         console.log("\x1b[35m", `${satNumber} finished in `, (Date.now() - startTime) / 1000 + 's', '\x1b[0m');
//       }
//       counter++;
      
//       await Satellites.findOrCreate({ where: { satNumber },
//         defaults: {
//         tle1: tle1,
//         tle2: tle2,
//         officialucsSatName: officialucsSatName,
//         countryOfRegistry: countryOfRegistry,
//         owner: owner,
//         user: users,
//         purpose: purpose
//       }})
//       .then(([satellite]) => {
//         if (satellite.dataValues.endAt !== undefined) {
          
//           const rawStart = {dayNumber: satellite.dataValues.endAt + 1, secondsOfDay: 0};
//           const newTime = new Cesium.JulianDate;
//           _start = Object.assign(newTime, rawStart);
//         }
//       })
//       .catch(err => {
//         console.error('\x1b[31m', `Satellite ${satNumber} creation error: \n`, err, '\n', '\x1b[0m');
//       });

//       let points = [];

//       for (let i = 0; i < totalSeconds; i+= timeStepInSeconds) {

//         const time = Cesium.JulianDate.addSeconds(_start, i, new Cesium.JulianDate());
//         const jsDate = Cesium.JulianDate.toDate(time);
//         const gmst = satellite.gstime(jsDate);

//         const positionAndVelocity = satellite.propagate(satrec, jsDate);
//         const p = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
//         const position = Cesium.Cartesian3.fromRadians(p.longitude, p.latitude, p.height * 1000);

//         let { dayNumber, secondsOfDay } = time;
//         secondsOfDay = Math.trunc(secondsOfDay);

//         let { x, y, z } = position;

//         points.push({
//           dayNumber: dayNumber,
//           secondNumber: secondsOfDay,
//           fk_satNumber: satNumber,
//           x: x,
//           y: y,
//           z: z
//         }); 
//       }; 

//       Satellites.findOne({where: {satNumber}})
//       .then((satellite) => {
//         satellite.update({ endAt: points[points.length - 1].dayNumber });
//       })
      
//       Positions.bulkCreate(points)
//       .then(() => {
//         points = [];
//       })
//       .catch(err => {
//       console.error('\x1b[31m', `Satellite ${satNumber} creation error: \n`, err, '\n', '\x1b[0m');
//       });
//     };
//   }
//   console.log('\x1b[32m', 'satellite generation complete\n', '\x1b[0m');
// }

// generatePoints(db);






















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