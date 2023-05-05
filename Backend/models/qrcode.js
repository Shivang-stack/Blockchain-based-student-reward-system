const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const qrcodeSchema = new mongoose.Schema(
  {
    event_id: {
        type: ObjectId,
        ref: "Event",
        required: true
    },
    code_image: {
        data: Buffer,
        contentType: String,
    }    
  },
  { timestamps: true }
);

module.exports = mongoose.model("QrCode", qrcodeSchema);
