const Participates = require("../models/participates");


exports.participated = (req, res) => {
    const participates = new Participates(req.body);
    participates.save((err, participates) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save participates in DB"
          });
        }
        res.json({
            student_id:participates.student_id,
            isAttended:participates.isAttended,
            event_id:participates.event_id
        });
      });
};

exports.getAllParticipatentsById = (req, res, next, id) => {
    Participates.findById(id).exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "No participates was found in DB"
      });
    }
    req.profile = participates;
    res.json(participates)
    next();
  });
};

exports.getParticipates = (req, res) => {
    return res.json(req.profile);
};

exports.getAllParticipatentsByeventId = (req, res, next, id) => {
    const event_id = req.param.eventId;
    Participates.findById({event_id}).exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "No participates was found in DB"
      });
    }
    req.profile = participates;
    res.json(participates)
    next();
  });
};

exports.getAllParticipatentsByUserId = (req, res, next, id) => {
    const student_id = req.param.userId;
    Participates.findById({student_id}).exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "No participates was found in DB"
      });
    }
    req.profile = participates;
    res.json(participates)
    next();
  });
};


exports.isParticipated = (req, res, next) => {
    const { eventId, student_id } = req.body;
    Participates.findOne({ event_id: eventId, student_id: student_id }).exec((err, participates) => {
      if (err || !participates) {
        return res.status(400).json({
          error: "User has not participated in the event"
        });
      }
      res.json({
        isAttended: participates.isAttended
      });
      next();
    });
  };
  