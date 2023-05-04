const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    link:{
      type: String,
      trim: true,
    },
    reward:{
      type: Number,
      required:true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    start_date:{
      type: Date,
      default:Date.now,
    },
    end_date:{
      type: Date,
      default:Date.now,
    }    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
