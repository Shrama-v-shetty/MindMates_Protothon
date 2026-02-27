const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  extraDetails: {
    relationship: String,
    phone1: String,
    phone2: String,
    bloodGroup: String
  }
});

module.exports = mongoose.model("User", userSchema);



