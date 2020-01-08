const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const bill = require("./routes/api/billData");
const garbage = require("./routes/api/garbageData");
const cart = require('./routes/api/cart');
const order = require('./routes/api/order');
const products = require("./routes/api/productsData");
const nodemailer = require("nodemailer");
const donations=require("./routes/api/Donationdata")
const app = express();

app.use(cors());
// Bodyparser middleware 
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/billdata", bill);
app.use("/api/garbageData", garbage);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/productsData",products);
app.use("/api/Donationdata",donations);
app.post("/api/sendmail", (req, res) => {
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gogreenerapp@gmail.com',
          pass: 'greener123'
        }
      });
      var mailOptions = {
        from: 'gogreenerapp@gmail.com',
        to: req.body.usermail,
        subject: 'Thank you for making a difference!',
        text: req.body.wasteType + 'waste (' + req.body.weight + 'kg) is scheduled for ' + req.body.pickType + ' at ' +req.body.time
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
    app.post("/api/newusermail", (req, res) => {
      console.log(req.body);
      var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gogreenerapp@gmail.com',
              pass: 'greener123'
            }
          });
          var mailOptions = {
            from: 'gogreenerapp@gmail.com',
            to: req.body.email,
            subject: 'Welcome to the Greener family!',
            text:  'Hi ' + req.body.name + '\n\xA0' + 'We are really happy that you are a part of the Greener family. You are one step closer in making our planet more healthy. Kudos! In our website you have wide range of eco-friendly products, you can track your electricity bills and many more. We alse have a safe way of disposing your waste which prevents damaging our planet. So start surfing!'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        });
        app.post("/api/sendordermail", (req, res) => {
          console.log(req.body);
          var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'gogreenerapp@gmail.com',
                  pass: 'greener123'
                }
              });
              var mailOptions = {
                from: 'gogreenerapp@gmail.com',
                to: req.body.email,
                subject: 'Order placed successfully!',
                text:  'Hi ' + req.body.name + '\n\xA0' + 'Your order has been sucessfully placed.'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            });


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Greener Server: Up and running on port ${port} !`));

