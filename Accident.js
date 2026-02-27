const mongoose = require("mongoose");

const AccidentSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  reportedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Accident", AccidentSchema);
