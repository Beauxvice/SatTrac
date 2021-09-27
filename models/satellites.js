const Mongoose = require('mongoose');

const SatelliteSchema = new Mongoose.Schema({
  satelliteNumber: { type: Number, index: { unique: true }},
  tle1: { type: String },
  tle2: { type: String },
  startAt: { type: Number },
  endAt: { type: Number },
  officialucsSatName: { type: String },
  countryOfRegistry: { type: String },
  owner: { type: String },
  user: { type: String },
  purpose: { type: String },
  positions: []
});

SatelliteSchema.statics.findOneOrCreate = function (condition, options, callback) {
  const self = this;
  self.findOne(condition, (error, result) => {
    return result ? callback(error, result) : self.create(Object.assign(condition, options), (error, result) => {
      return callback(error, result);
    });
  });
};

const Satellite = Mongoose.model('Satellite', SatelliteSchema);

module.exports = Satellite;

