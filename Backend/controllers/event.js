const Event = require("../models/event");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.createEvent = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "problem with data"
      });
    }
    //destructure the fields
    const { name, description, link, category, reward } = fields;

    if (!name || !description || !link || !category || !reward) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let event = new Event(fields);
    console.log(event);

    //save to the DB
    event.save((err, event) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Event in DB failed"
        });
      }
      res.json(event);
    });
  });
};
  
exports.getEventById = (req, res, next, id) => {
  Event.findById(id).exec((err, event) => {
    if (err || !event) {
      return res.status(400).json({
        error: "No event was found in DB"
      });
    }
    req.profile = event;
    res.json(event)
    next();
  });
};

exports.getAllEvent = (req, res, next) => {
    Event.find().exec((err, events) => {
      if (err || !events) {
        return res.status(400).json({
          error: "No event was found in DB"
        });
      }
      res.json(events)
    });
  };
  
exports.getEvent = (req, res) => {
    return res.json(req.profile);
};