const User = require("../models/user");
const Achievement = require("../models/achievement");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};



exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No users was found in DB"
      });
    }
    res.json(users);
  });
};

exports.createAchievement = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
    
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    const student = req.params.userId;
    fields.student_id=student
    //destructure the fields
    var { student_id ,details } = fields;

    if (!details || !student_id) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let achievement = new Achievement(fields);
    console.log(achievement);

    //handle file here
    if (file.certificate) {
      if (file.certificate.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      achievement.certificate.data = fs.readFileSync(file.certificate.path);
      achievement.certificate.contentType = file.certificate.type;
    }
    
    //save to the DB
    achievement.save((err, achievement) => {
      if (err) {
        res.status(400).json({
          error: "Saving achievement in DB failed"
        });
      }
      res.json(achievement);
    });
  });
};

exports.getAchievementByUserId = (req, res, next) => {
  const student_Id= req.params.userId
  Achievement.find({student_id:student_Id })
    .exec((err, achievement) => {
      if (err) {
        return res.status(400).json({
          error: "Achievement not found"
        });
      }
      req.achievement = achievement;
      res.json(achievement)
      next();
    });
};

exports.getAchievementById = (req, res, next, id) => {
  Achievement.findById(id).exec((err, achievement) => {
    if (err || !achievement) {
      return res.status(400).json({
        error: "No achievement was found in DB"
      });
    }
    req.achievement = achievement; // set the req.achievement object
    next();
  });
};

// middleware
exports.certificate = (req, res, next) => {
  if (req.achievement && req.achievement.certificate && req.achievement.certificate.data) {
    res.set("Content-Type", req.achievement.certificate.contentType);
    return res.send(req.achievement.certificate.data);
  }
  next();
};



// delete controllers
// exports.deleteAchievement = (req, res) => {
//   let achievement = req.achievement;
//   Achievement.remove((err, deletedAchievement) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Failed to delete the achievement"
//       });
//     }
//     res.json({
//       message: "Deletion was a success",
//       deletedAchievement
//     });
//   });
// };
