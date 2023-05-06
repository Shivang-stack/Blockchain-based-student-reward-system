const Participates = require("../models/participates");
const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction")
const crypto = require('crypto');
const mongoose = require("mongoose");

exports.registeredToEvent = (req, res) => {
  const newParticipates = new Participates(req.body);
  Participates.findOne({ event_id: req.body.event_id, student_id: req.body.student_id }).exec((err, existingParticipates) => {
    if (!err && !existingParticipates) {
      newParticipates.save((err, savedParticipates) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save participates in DB"
          });
        }
        res.json({
          student_id: savedParticipates.student_id,
          isAttended: savedParticipates.isAttended,
          event_id: savedParticipates.event_id
        });
      });
    } else {
      return res.status(400).json({
        error: "Already Registered"
      });
    }
  });  
};


exports.getAllParticipatentsById = (req, res, next, id) => {
    Participates.findById(id).exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "No participates was found in DB"
      });
    }
    req.profile = participates;
    res.json(participates)
    next();
  });
};

exports.getParticipates = (req, res) => {
    return res.json(req.profile);
};
  
exports.getAllParticipatentsByeventId = (req, res, next) => {
  const event_id = req.params.eventId;
  
  Participates.find({ event_id: event_id }).populate('student_id event_id').exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "No participates were found in DB"
      });
    }
    req.profile = participates;
    res.json(participates);
    next();
  });
};

// exports.getAllParticipatentsByeventId = (req, res) => {
//   const eventId = req.params.eventId;
//   Participates.find({ event_id: eventId })
//     .populate("student_id", "_id name email")
//     .select("_id isAttended")
//     .exec((err, participates) => {
//       if (err || !participates) {
//         return res.status(400).json({
//           error: "No participants were found in DB yo"
//         });
//       }
//       res.json(participates);
//     });
// };


exports.getAllParticipatentsByUserId = (req, res, next) => {
    const student_id = req.params.userId;
    Participates.find({ student_id: student_id }).populate('event_id').exec((err, participates) => {
      if (err || !participates) {
        return res.status(400).json({
          error: "No Events were found in DB related to the user"
        });
      }
      req.profile = participates;
      res.json(participates);
      next();
    });
};

const automaticTransaction = async (receiverId, amount, eventId) => {
  try{
    // Find sender and receiver wallets
    const senderWallet = await Wallet.findById(process.env.ADMIN_ID);
    const receiverWallet = await Wallet.findById(receiverId);
    const existingTrans= await Transaction.findOne({ event:eventId , receiver: receiverId })
    
    if (existingTrans) {
      console.log('Transaction Already Exists')
      return "Transaction Already Exists"
    }

    // Verify that the sender has enough balance
    if (senderWallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Create a new transaction
    const transaction = new Transaction({
      sender: senderWallet._id,
      receiver: receiverWallet._id,
      event: eventId,
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
    
    console.log("Transaction Performed")
    return "Transaction Performed"
  }
  catch(error){
    console.log(error)
    return "Error Occured"
  }
}

const signTransaction = (transaction, privateKey) => {
  const hmac = crypto.createHmac('sha256', privateKey);
  const signature = hmac.update(transaction.toString()).digest('hex');
  transaction.signature = signature;
  return transaction;
};



exports.attendedTheEvent = (req, res, next) => {
  Participates.findOne({ event_id: req.body.event_id, student_id: req.body.student_id }).populate('student_id event_id').exec((err, participates) => {
    if (err || !participates) {
      return res.status(400).json({
        error: "User has not participated in the event"
      });
    }

    participates.isAttended = true;

    const transaction = automaticTransaction( participates.student_id.wallet,participates.event_id.reward, participates.event_id._id)

    
    participates.save((err, savedParticipates) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save participates in DB"
        });
      }
      res.json({
        message:"Student Attendance Recorded"
      });
    });

  });
};
  
