const mongoose = require("mongoose");

const Formazione = require("../models/formazioneModel");

// sort

//OK
exports.formazione_get_all = (req, res, next) => {
    Formazione.find()
    .select("title subtitle paragraph date tag photoGallery _id")
    .exec()
    .then(docs => {
        const response = {
            formaziones: docs.map(doc => {
            return {
                title: doc.title,
                subtitle: doc.subtitle,
                paragraph: doc.paragraph,
                date: doc.date,
                tag: doc.tag,
                photoGallery: doc.photoGallery,
                _id: doc._id,
                  request: {
                  type: "GET",
                  url: "formazione/" + doc._id
                }
            };
            })
        };
        if (docs.length > 0) {
        // per data
        response.formaziones.sort(function(o1,o2){
          return o2.date - o1.date;
        });
        // rispodni
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

//OK
exports.formazione_get_home = (req, res, next) => {
  Formazione.find()
  .select("title subtitle paragraph date tag photoGallery _id")
  .exec()
  .then(docs => {
      const response = {
          formaziones: docs.map(doc => {
          return {
              title: doc.title,
              subtitle: doc.subtitle,
              paragraph: doc.paragraph,
              date: doc.date,
              tag: doc.tag,
              photoGallery: doc.photoGallery,
              _id: doc._id,
                request: {
                type: "GET",
                url: "formazione/" + doc._id
              }
          };
          })
      };
      if (docs.length > 0) {
      // per data
      response.formaziones.sort(function(o1,o2){
        return o2.date - o1.date;
      });
      //cut at 4
      let homeResp = response.formaziones.slice(0,4);
      //risp
      res.status(200).json(JSON.stringify(homeResp));
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


//OK
exports.formaziones_get_formazione = (req, res, next) => {
  const id = req.params.formazioneId;
  Formazione.findById(id)
    .select("title subtitle paragraph date tag photoGallery _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(JSON.stringify({
          formazione: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/formazione/"+ doc._id
          }
        }));
      } else {
        res
          .status(404)
          .json(JSON.stringify({ message: "provided ID formazione NOT FOUND" }));
      }
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({ error: err }));
    });
};

