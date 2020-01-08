const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Donation = require("../../models/donationdata");


router.post("/donationreq", (req, res) => {
  // Form validation
  const newdonation = new Donation({
    userid: req.body.userid,
    amount: req.body.amount,
    date:req.body.date
  });
  newdonation.save().then(res.json({
    success: true
  }))
});


router.get("/donationreq", (req, res) => {
  // Form validation
  Donation.find({ userid: req.query.id }, function (err, result) {
    if (err) throw err;
    return res
      .status(200)
      .json(result)
  });
});
module.exports = router;