const Mongoose = require('mongoose');

const DaysSchema = new Mongoose.Schema({
  days: { type: Map }
});

const Position = PositionSchema;

module.exports = Position;

