const mongoose = require("mongoose");

const Registration = require("../models/registrationModel");

//POST
exports.registratons_create_registraton = (req, res, next) => {
  Registration.find({ name: req.body.name })
    .exec()
    .then(reg => {
      if (reg.length >= 1) {
        return res.status(409).json(JSON.stringify({
          message: "Registration already exists"
        }));
      } else {
  
        const registration = new Registration({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
        });
        registration
          .save()
          .then(result => {
            res.status(201).json(JSON.stringify({
              message: "Created Registration Field",
              createdRegistration: {
                _id: result._id,
                name: result.name,
                email: result.email,
              }
            }));
            console.log("UTENTE REGITRATO:\n" + result.email);
          })
        .catch(err => {
          console.log("ERROR:\n" + err);
          res.status(500).json(JSON.stringify({
            error: err
          }));
        });
      }
    });
};

//POST
exports.registratons_check_registraton = (req, res, next) => {

  var name = req.body.name;
  var email = req.body.email;

  if( !((email == "" || ((email.includes("@")==0  || (email.includes(".")==0  )))) || (name == ""))){

    Registration.find( {$or:[ { name: req.body.name }, { email: req.body.email } ]} )
    .exec()
    .then(register => {
      if (register.length >= 1) {
        return res.status(409).json(JSON.stringify({
          message: "Registration already exists"
        }));
      } else {
        return res.status(200).json(JSON.stringify({
          message: "Registration not exists"
        }));
      }
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
  } else {
    return res.status(410).json(JSON.stringify({
      message: "Invalid input"
    }));
  }
};

  
//GET
exports.registratons_get_registraton = (req, res, next) => {
  Registration.find()
    .select("name email _id")
    .exec()
    .then(docs => {
        const response = {
            ideas: docs.map(doc => {
            return {
                name: doc.name,
                email: doc.email,
                _id: doc._id
            };
            })
        };
        if (docs.length > 0) {
        // risp
        res.status(200).json(JSON.stringify(response));
        } else {
            res.status(404).json(JSON.stringify({
                message: 'No entries found'
            }));
        }
    })
    .catch(err => {
    console.log("ERROR:\n" + err);
    res.status(500).json({
        error: err
    });
    });
  };