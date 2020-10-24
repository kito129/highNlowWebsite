const mongoose = require("mongoose");

const Registration = require("../models/registrationModel");

//CHECK
exports.registratons_create_registraton = (req, res, next) => {
  Artist.find({ name: req.body.name })
    .exec()
    .then(art => {
      if (art.length >= 1) {
        return res.status(409).json(JSON.stringify({
          message: "Registration already exists"
        }));
      } else {
  
        const artist = new Registration({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
        });
        artist
          .save()
          .then(result => {
            res.status(201).json(JSON.stringify({
              message: "Created Registration Field",
              createdArtist: {
                _id: result._id,
                name: result.name,
                name: result.email,
              }
            }));
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