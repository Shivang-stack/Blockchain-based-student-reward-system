const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    signature: {
        type: String,
        required: true,
      },
  });
 
module.exports = mongoose.model("Transaction", transactionSchema);
