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
    isAttended:{
      type:Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participates", participatesSchema);
