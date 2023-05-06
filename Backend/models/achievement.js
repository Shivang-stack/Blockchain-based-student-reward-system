const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const achievementSchema = new mongoose.Schema(
  {
    student_id: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    certificate: {
        data: Buffer,
        contentType: String,
    },
    details:{
        type: String,
        maxlength: 2000
    }   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
