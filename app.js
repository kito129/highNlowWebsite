/**
 * HigNLow 2.0
 * 10/19/2020 start new version
 * last version:  2.0.0
 * last review: 10/25/2020
 * 
 * update:  2.0.0  10/25/2020
 * author:  highnlow
 */

// --- IMPORT ---

//import dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

// pm2 metrics
const io = require('@pm2/io')

var meter = io.meter({
  name      : 'req/min',
  samples   : 1,
  timeframe : 60
})

var histogram = io.histogram({
  name        : 'latency',
  measurement : 'mean'
})

var latency = 0

setInterval(function() {
  latency = Math.round(Math.random() * 100)
  histogram.update(latency)
}, 100)

//use middleware 
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// --- DATABASE ---

//database setting
const CONNECTION_URL = 
  "mongodb://highnlow:"+
  process.env.MONGO_ATLAS_PW +
  "@clustermain-shard-00-00.ex6ld.mongodb.net:27017,clustermain-shard-00-01.ex6ld.mongodb.net:27017,clustermain-shard-00-02.ex6ld.mongodb.net:27017/highnlow?ssl=true&replicaSet=atlas-11sdtm-shard-0&authSource=admin&retryWrites=true&w=majority";
const DATABASE_NAME = "highnlow";
//database connection option
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes
  connectTimeoutMS: 1000,
  poolSize: 10 // Maintain up to 10 socket connections
};

//database connection
try {
  mongoose.connect(CONNECTION_URL,options);
  mongoose.Promise = global.Promise;
  //handle error
  console.log("\n\n-----Server Connected to " + DATABASE_NAME + " database-----\n\n")
  mongoose.connection.on('error',console.error.bind(
    console, '\n-----MongoDB connection error------:\n')
  );
  
} catch (error) {
  console.log("ERROR to connect to " + DATABASE_NAME + " database");
  console.log("ERROR:\n" + error);}

  
// --- ROUTES API ---

// Routes which should be accepted requests
app.use((req, res, next) => {
  //CORS error fix in the header
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  meter.mark()

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

//import API routes
const ideasRoutes = require("./api/routes/ideasRoutes");
const formazioneRoutes = require("./api/routes/formazioneRoutes");
const registrationRoutes = require("./api/routes/registrationRoutes");
const emailRoutes = require("./api/routes/emailRoutes");

// Routes which should handle requests
app.use("/idea", ideasRoutes);
app.use("/formazione", formazioneRoutes);
app.use("/registration", registrationRoutes);
app.use("/email", emailRoutes);

// Routes for public file (static)
app.use(express.static(path.join(__dirname, './public')));

//error 404 for not found routers
app.use((req, res, next) => {
  const error = new Error("Route Not Valid");
  res.status(404);
  res.sendFile(path.join(__dirname, '/public/404.html'));
});

//specific error or 500 generic error routers gestor
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json(JSON.stringify({
    error: {
      message: error.message
    }
  }));
});


// --- API START ---

//app is listening on PORT
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port: 3000"  );
  
});
