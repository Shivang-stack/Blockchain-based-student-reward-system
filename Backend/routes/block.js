const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/block');

// Create a new transaction
router.post('/transaction', blockchainController.createTransaction);

// Mine a new block with pending transactions
router.get('/mine', blockchainController.mineBlock);

router.get('/transactionpool', blockchainController.getTransactionPool);

router.get('/Blocks', blockchainController.getAllBlocks);


// Get the balance of a wallet
router.get('/wallet/:publicKey/balance', blockchainController.getWalletBalance);

module.exports = router;