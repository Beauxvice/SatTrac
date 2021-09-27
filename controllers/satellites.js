const models = require('../models/satellites');

// A function which handles a get request for all messages
const getSatellites = (req, res) => {

  models.messages.getSatellites()
    .then(satellites => {
      res.status(200).send(satellites);
    }).catch(error => {
      console.error(error);
    });
}; 

module.exports = {
  getSatellites,
};
