const express = require('express')
const {
  createTransactionCtrl,
  deleteTransactionCtrl,
  getTransactionCtrl,
  updateTransactionCtrl,
  getTransactionsCtrl
} = require('../../controllers/transactions/transactionCtrl')
const isLogin = require('../../middlewares/isLogin')
const transactionRoutes = express.Router()

// POST/api/v1/transactions
transactionRoutes.post('/', isLogin, createTransactionCtrl)

// Delete/api/v1/transactions
transactionRoutes.delete('/:id', deleteTransactionCtrl)

// GET/api/v1/transactions/:id
transactionRoutes.get('/:id', getTransactionCtrl)

// GET/api/v1/transactions/:id
transactionRoutes.get('/', getTransactionsCtrl)

// Update/api/v1/transactions
transactionRoutes.put('/:id', updateTransactionCtrl)

module.exports = {
  transactionRoutes
}
