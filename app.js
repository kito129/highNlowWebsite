// to
// pscp -r D:\00_PROJECTs\38_highnlow_site\site root@45.137.202.41:/site

// TODO

//  IMG FORMAZIONE  --- 
//  FROMAZIONE -> ARTICOLI ---
// IDEE TOGLIERE PUNTO  --- 

// PARTNER   --- 
// ETORO IMG ONLINE  ---  
//BANNER  ---  
// CHECK ALL HEAD AND FOOTER  ---  
// COOCKIE
// MAIL

// REGISTRAZIONE POST
// API PER HOME // LAST 3 IDEA & ARTICLE  --- 
// TELEGRAM  ---  
// LOGO AND ICON -- - - 



// --- IMPORT ---

//import dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const nodemailer = require('nodemailer');

//import API routes
const ideasRoutes = require("./api/routes/ideasRoutes");
const formazioneRoutes = require("./api/routes/formazioneRoutes");
const registrationRoutes = require("./api/routes/registrationRoutes");

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
app.use("/formazione", formazioneRoutes);

// Routes for public file (static)
app.use(express.static(path.join(__dirname, './public')));

// --- MAIL AND REG ---

app.use('/sendemail',(req,res,next)=>{
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
  here we are using gmail as our service
  In Auth object , we specify our email and password
  */
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'tuttibonus07@gmail.com',
      pass: 'QDtm(t/5ZN' // naturally, replace both with your real credentials or an application-specific password
    }
  });
  /*
  In mailOptions we specify from and to address, subject and HTML content.
  In our case , we use our personal email as from and to address,
  Subject is Contact name and
  html is our form details which we parsed using bodyParser.
  */
  var mailOptions = {
    from: 'tuttibonus07@gmail.com',//replace with your email
    to: 'selva.marco.bet@gmail.com',//replace with your email
    subject: `Contact name: ${req.body.name}`,
    html:`<h1>Contact details</h1>
<h2> name:${req.body.name} </h2><br>
<h2> email:${req.body.email} </h2><br>
<h2> message:${req.body.message} </h2><br>`
  };
  /*
   Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
  call back as parameter
  */
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error') // if error occurs send error as response to client
    }
    else {
      console.log('Email sent: ' + info.response);
      res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
    }
  });
})



// --- API START ---

//app is listening on PORT
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port: 5000"  );
  
});
