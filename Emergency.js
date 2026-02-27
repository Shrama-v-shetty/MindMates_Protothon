const mongoose = require("mongoose");

const EmergencySchema = new mongoose.Schema({
    name: { type: String, required: true },
    incident: String,
    role: String,
    severity: String,
    unconscious: String,
    numberInjured: String,
    victimTypes: {
    type: [String],
    default: []
},
immediateDanger: {
    type: [String],
    default: []
},

    locationInput: String
}, { timestamps: true });

module.exports = mongoose.model("Emergency", EmergencySchema);

