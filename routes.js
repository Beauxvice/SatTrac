const { Router } = require('express');
const satellites = require('./controllers/satellites');

// Connect controller methods to their corresponding routes
const classesRouter = Router();

classesRouter.get('/satellites', satellites.getSatellites);
//classesRouter.post('/satellites', satellites.postSatellites);

module.exports = {
  classesRouter,
};
