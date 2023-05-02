const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/block');

// Create a new transaction
router.post('/transaction', blockchainController.createTransaction);

// Mine a new block with pending transactions
router.get('/mine', blockchainController.mineBlock);

router.get('/transactionpool', blockchainController.getTransactionPool);

router.get('/blocks', blockchainController.getAllBlocks);

router.get('/transactions', blockchainController.getAllTransaction);

// Get the balance of a wallet
router.get('/wallet/:walletId/balance', blockchainController.getWalletBalance);

module.exports = router;