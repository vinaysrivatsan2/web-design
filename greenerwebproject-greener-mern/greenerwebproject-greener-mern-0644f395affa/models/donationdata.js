const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const donationSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});
module.exports = Donation = mongoose.model("donationData", donationSchema);