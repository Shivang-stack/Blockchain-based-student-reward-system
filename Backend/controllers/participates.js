const Participates = require("../models/participates");


exports.registeredToEvent = (req, res) => {
  const newParticipates = new Participates(req.body);
  Participates.findOne({ event_id: req.body.event_id, student_id: req.body.student_id }).exec((err, existingParticipates) => {
    if (!err && !existingParticipates) {
      newParticipates.save((err, savedParticipates) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save participates in DB"
          });
        }
        res.json({
          student_id: savedParticipates.student_id,
          isAttended: savedParticipates.isAttended,
          event_id: savedParticipates.event_id
        });
      });
    } else {
      return res.status(400).json({
        error: "Already Registered"
      });
    }
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
  
exports.getAllParticipatentsByeventId = (req, res, next) => {
  const event_id = req.params.eventId;
  
  Participates.find({ event_id: event_id }).populate('student_id event_id').exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "No participates were found in DB"
      });
    }
    req.profile = participates;
    res.json(participates);
    next();
  });
};

// exports.getAllParticipatentsByeventId = (req, res) => {
//   const eventId = req.params.eventId;
//   Participates.find({ event_id: eventId })
//     .populate("student_id", "_id name email")
//     .select("_id isAttended")
//     .exec((err, participates) => {
//       if (err || !participates) {
//         return res.status(400).json({
//           error: "No participants were found in DB yo"
//         });
//       }
//       res.json(participates);
//     });
// };


exports.getAllParticipatentsByUserId = (req, res, next) => {
    const student_id = req.params.userId;
    Participates.find({ student_id: student_id }).populate('event_id').exec((err, participates) => {
      if (err || !participates) {
        return res.status(400).json({
          error: "No Events were found in DB related to the user"
        });
      }
      req.profile = participates;
      res.json(participates);
      next();
    });
};


exports.attendedTheEvent = (req, res, next) => {
  Participates.findOne({ event_id: req.body.event_id, student_id: req.body.student_id }).exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "User has not participated in the event"
      });
    }

    participates.isAttended = true;

    participates.save((err, savedParticipates) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save participates in DB"
        });
      }
      res.json({
        message:"Student Attendance Recorded"
      });
    });

  });
};
  