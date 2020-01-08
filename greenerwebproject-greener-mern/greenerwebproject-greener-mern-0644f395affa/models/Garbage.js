const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GarbageSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  wasteType: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});
module.exports = Garbage = mongoose.model("garbageData", GarbageSchema, "garbageData");