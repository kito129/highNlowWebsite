const mongoose = require("mongoose");

const Idea = require("../models/ideaModel");

//TODO
exports.idea_get_all = (req, res, next) => {
    Idea.find()
    .select("title subtitle date ticker view tradingviewLink photoGallery _id")
    .exec()
    .then(docs => {
        const response = {
            ideas: docs.map(doc => {
            return {
                title: doc.title,
                subtitle: doc.subtitle,
                date: doc.date,
                ticker: doc.ticker,
                view: doc.view,
                tradingviewLink: doc.tradingviewLink,
                photoGallery: doc.photoGallery,
                _id: doc._id,
                request: {
                type: "GET",
                url: "idea/" + doc._id
                }
            };
            })
        };
        if (docs.length > 0) {

          //REODER LIST


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


//TODO
exports.ideas_get_idea = (req, res, next) => {
  const id = req.params.ideaId;
  Idea.findById(id)
    .select("title subtitle date ticker view tradingviewLink photoGallery _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(JSON.stringify({
          idea: doc,
          request: {
            type: "GET",
            url: "http://45.137.202.41:5000/idea/"+ doc._id
          }
        }));
      } else {
        res
          .status(404)
          .json(JSON.stringify({ message: "provided ID idea NOT FOUND" }));
      }
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({ error: err }));
    });
};

