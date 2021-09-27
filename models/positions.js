const Mongoose = require('mongoose');

const PositionSchema = new Mongoose.Schema({
  x: { type: Number },
  y: { type: Number },
  z: { type: Number },
  dayNumber: { type: Number },
  secondNumber: { type: Number },
});

const Position = PositionSchema;

module.exports = Position;

