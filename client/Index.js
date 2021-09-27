Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0N2I2NTY0NS00YWI2LTQ3YzktOTQwOS0yMjA5MWY4OWNkMGQiLCJpZCI6NTc0MDMsImlhdCI6MTYyMjI4MzA5Mn0.PbI4SSpd4gfbw9XIsBlly_9ZzBXpXqnVcC8l-0rJrcA'

const viewer = new Cesium.Viewer('cesiumContainer', {
terrainProvider: Cesium.createWorldTerrain()
});

// Add Cesium OSM Buildings.
viewer.scene.primitives.add(Cesium.createOsmBuildings());

// Fly the camera to New Orleans using longitude, latitude, and height.
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-90.06297, 29.95784, 40000000)
});


const startTime = Date.now();
let counter = 0;
console.log('Request sent');


fetch('http://localhost:3000/satData').then(response => {
  console.log('Response received', (Date.now() - startTime) / 1000 + 's');
  return response.json();
}).then(data => { 
  console.log('Data processing...', (Date.now() - startTime) / 1000 + 's');
  propagateSatellite(data);
  console.log('Finished in ', (Date.now() - startTime) / 1000 + 's');
}).catch((err) => {
  console.error(err);
});


const propagateSatellite = (data) => {

  const times = data['times'];
  const positions = data['positions'];
  const descriptions = data['descriptions'];
  let newTime = new Cesium.JulianDate;
  const start = Object.assign(newTime, data['start']);
  newTime = new Cesium.JulianDate;
  const stop = Object.assign(newTime, data['stop']);
 
  viewer.clock.startTime = start
  viewer.clock.stopTime = stop
  viewer.clock.currentTime = start
  viewer.timeline.zoomTo(start, stop);
  viewer.clock.multiplier = 1;
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

  for (let i = 0; i < times.length; i++) {
    counter++;
    if(counter % 500 === 0) {
      console.log('Thinking...')
    }
    
    const positionsOverTime = new Cesium.SampledPositionProperty();
    for (let j = 0; j < times[i].length; j++) {
      newTime = new Cesium.JulianDate;
      let julianTime = Object.assign(newTime, times[i][j]);
      positionsOverTime.addSample(julianTime, positions[i][j]); 
    }
    viewer.entities.add({
      description: descriptions[i],
      position: positionsOverTime,
      point: { pixelSize: 1.5, color: Cesium.Color.RED }
    });
  }
  console.log(viewer);
}