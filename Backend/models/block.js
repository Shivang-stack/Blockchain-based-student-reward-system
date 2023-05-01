const SHA256 = require("crypto-js/sha256");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const calculateHash = (index, previousHash, timestamp, transactions) =>
  SHA256(index + previousHash + timestamp + JSON.stringify(transactions)).toString();

const blockSchema = new mongoose.Schema({
  index: {
    type: Number,
    unique: true,
    index: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  transactions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
  previousHash: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

blockSchema.methods.calculateHash = function () {
  return calculateHash(this.index, this.previousHash, this.timestamp, this.transactions);
};

const Block = mongoose.model("Block", blockSchema);

module.exports = mongoose.model("Block", blockSchema);
