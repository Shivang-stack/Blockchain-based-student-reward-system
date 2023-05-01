const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const walletSchema = new mongoose.Schema({
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    privateKey: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    }
});

module.exports = mongoose.model("Wallet", walletSchema);
