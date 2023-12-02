const Account = require('../../model/Account')
const Transaction = require('../../model/Transaction')
const User = require('../../model/User')
const { AppErr } = require('../../utils/appErr')
// In this file we will write the business logic for Transactions
const createTransactionCtrl = async (req, res, next) => {
  const { name, amount, notes, transactionTypes, account, category } = req.body
  try {
    // 1.Find The User
    const userFound = await User.findById(req.user)
    if (!userFound) {
      return next(new AppErr('User Not Found', 404))
    }
    // 2.Find The Account
    const accountFound = await Account.findById(account)
    if (!accountFound) {
      return next(new AppErr('Account Not Found', 404))
    }
    // 3.Create The Transactions
    const transaction = await Transaction.create({
      amount,
      notes,
      account,
      transactionTypes,
      category,
      name,
      createdBy: req.user
    })
    // 4.Push the Transaction into the account
    accountFound.transactions.push(transaction._id)
    // 5.Resave the Account
    await accountFound.save()
    res.json({
      status: 'success',
      data: transaction
    })
  } catch (error) {
    res.json(error)
  }
}

const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params
    await Transaction.findByIdAndDelete(id)
    res.json({
      status: 'success',
      data: null
    })
  } catch (error) {
    next(new AppErr(error.message, 500))
  }
}

const getTransactionCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.find()
    res.status(200).json({
      status: 'success',
      data: trans
    })
  } catch (error) {
    next(new AppErr(error.message, 500))
  }
}

const getTransactionsCtrl = async (req, res, next) => {
  try {
    const { id } = req.params
    const trans = await Transaction.findById(id)
    res.status(200).json({
      status: 'success',
      data: trans
    })
  } catch (error) {
    next(new AppErr(error.message, 500))
  }
}

const updateTransactionCtrl = async (req, res,next) => {
  try {
    const { id } = req.params
    const tran = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.json({ 
      status:'success',
      data:tran,
    })
  } catch (error) {
    next(new AppErr(error.message,500))
  }
}

module.exports = {
  createTransactionCtrl,
  deleteTransactionCtrl,
  getTransactionCtrl,
  getTransactionsCtrl,
  updateTransactionCtrl
}
