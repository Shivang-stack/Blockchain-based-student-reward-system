const Event = require("../models/event");


exports.createEvent = (req, res) => {
    const event = new Event(req.body);
    event.save((err, event) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save event in DB"
          });
        }
        res.json({
          name: event.name,
          description: event.description,
          id: event._id,
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