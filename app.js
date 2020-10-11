
//import dependencies
const express = require("express");
const app = express();
const path = require('path');

var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes which should be accepted requests
app.use((req, res, next) => {
  //CORS error fix in the header
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.static(path.join(__dirname, './public')));


//app is listening on PORT
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port: 5000"  );
  
});
