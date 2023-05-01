const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const participatesSchema = new mongoose.Schema(
  {
    student_id: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    event_id: {
      type: ObjectId,
      ref: "Event",
      required: true
    },
    reward: {
      type: Number,
      required: true
    },
    date:{
      type:Date,
      required:true
    },
    isAttended:{
      type:Boolean,
      default: false,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participates", participatesSchema);
