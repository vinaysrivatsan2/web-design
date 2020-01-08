const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const Garbage = require("../../models/Garbage");

router.post("/garbage", (req, res) => {
    // Form validation
        const newgcollection = new Garbage({
          userid: req.body.userid,
          wasteType: req.body.wasteType,
          weight: req.body.weight
        });
        newgcollection.save().then(res.json({
          success: true
        }))
        });
module.exports = router;