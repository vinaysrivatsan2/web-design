const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const BillSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  watts: {
    type: Number,
    required: true
  }
});

module.exports = Bill = mongoose.model("billData", BillSchema);