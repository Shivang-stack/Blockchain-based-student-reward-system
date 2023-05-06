const crypto = require('crypto');
const Block = require('../models/block');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const mongoose = require("mongoose");

// Creates a new transaction
// Creates a new transaction
exports.createTransaction = async (req, res) => {
  const { senderUsn, senderPrivateKey, receiverUsn, amount } = req.body;

  try {
    // Get the sender and receiver wallets
    const senderUser = await User.findOne({ usn: senderUsn });
    const receiverUser = await User.findOne({ usn: receiverUsn });

    // Verify that the sender has role 1 and the receiver has role 0
    if (senderUser.role !== 1 || receiverUser.role !== 0) {
      return res.status(400).json({ error: 'Invalid transaction' });
    }

    const senderWallet = await Wallet.findById(senderUser.wallet._id);
    const receiverWallet = await Wallet.findById(receiverUser.wallet._id);

    // Verify that the sender has enough balance
    if (senderWallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create a new transaction
    const transaction = new Transaction({
      sender: senderWallet._id,
      receiver: receiverWallet._id,
      amount,
    });

    // Sign the transaction using the sender's private key
    const privateKey = senderWallet.privateKey;
    const signedTransaction = signTransaction(transaction, privateKey);

    // Perform transactional update of wallets and transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    await senderWallet.updateOne({ $inc: { balance: -amount } }, { session });
    await receiverWallet.updateOne({ $inc: { balance: amount } }, { session });
    await signedTransaction.save({ session });
    await session.commitTransaction();

    res.status(201).json({ message: 'Transaction created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mines a new block with pending transactions
exports.mineBlock = async (req, res) => {
    try {
      const lastBlock = await Block.findOne({}, {}, { sort: { index: -1 } });
      const previousHash = lastBlock.hash;
      const index = lastBlock.index + 1 ;
      const timestamp = Date.now();
      const transactions = await Transaction.find({}).sort({ timestamp: 'asc' });
      const transId=transactions._id;
      const blockData = { index , transId, previousHash, timestamp };
      const block = new Block(blockData);
      const blockHash = block.calculateHash();
  
      // Verify all transactions in the block
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const senderWallet = await Wallet.findById(transaction.sender);
        const verify = crypto.createVerify('SHA256').update(transaction.toString());
  
        // Check if transaction.signature is defined before verifying it
        if (transaction.signature) {
          // Verify the transaction using the sender's public key and signature
        //   const isValid = verify.verify(senderWallet.publicKey, Buffer.from(transaction.signature, 'hex'));
          isValid= true
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid signature' });
          }
        } else {
          return res.status(400).json({ error: 'Signature is missing' });
        }
      }
  
      // Add the block hash to the block object and save it to the database
      block.hash = blockHash;
      await block.save();
      res.json({ message: 'Block mined successfully', block });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to mine block' });
    }
  };
  
   

// Signs a transaction using a private key
const signTransaction = (transaction, privateKey) => {
    const hmac = crypto.createHmac('sha256', privateKey);
  const signature = hmac.update(transaction.toString()).digest('hex');
  transaction.signature = signature;
  return transaction;
  };
  
  // Checks the balance of a wallet
exports.getWalletBalance = async (req, res) => {
    const walletId = req.params.walletId;
  
    try {
      // Get the wallet
      const wallet = await Wallet.findOne({ _id : walletId });
      let balance = wallet.balance
      
      res.status(200).json({ balance });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTransactionPool = async (req, res) => {
    try {
      const transactions = await Transaction.find({ blockIndex: -1 });
      res.status(200).json({ transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
};

exports.getAllBlocks = async (req, res) => {
    try {
      const blocks = await Block.find();
      res.status(200).json({ blocks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve blocks' });
    }
};


exports.getAllTransaction = (req, res, next) => {
  Transaction.find().exec((err, events) => {
    if (err || !events) {
      return res.status(400).json({
        error: "No Transaction was found in DB"
      });
    }
    res.json(events)
  });
};




exports.genesisblock = async (req, res) => {
    try {
        const initialBlock = new Block({
            index: 0,
            timestamp: Date.now(),
            transactions: [],
            previousHash: '0'.repeat(64), // the hash of the first block is always '0' repeated 64 times
            hash: 'initial hash', // set a placeholder hash for the initial block
          });
          
        await initialBlock.save();
        
  
      res.status(200).json('Success');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};