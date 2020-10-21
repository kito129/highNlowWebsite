// to
// pscp -r D:\00_PROJECTs\38_highnlow_site\site root@45.137.202.41:/site


// --- IMPORT ---

//import dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

//import API routes
const ideasRoutes = require("./api/routes/ideasRoutes");

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
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
  }
  next();
});

//error 404 for not found routers
/*
TODO TO FIX
app.use((req, res, next) => {
  const error = new Error("Route Not Valid");
  error.status = 404;
  next(error);
});
*/

//specific error or 500 generic error routers gestor
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json(JSON.stringify({
    error: {
      message: error.message
    }
  }));
});

// Routes which should handle requests
app.use("/idea", ideasRoutes);

// Routes for public file (static)
app.use(express.static(path.join(__dirname, './public')));


// --- API START ---

//app is listening on PORT
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port: 5000"  );
  
});
