const Account = require('../../model/Account')
const User = require('../../model/User')
const { AppErr } = require('../../utils/appErr')

// In this file we will write the business logic for Account
const createAccountCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body
  try {
    // 1. Find The Logged In user
    const userFound = await User.findById(req.user)
    if (!userFound) {
      return next(new AppErr('User Not Found', 402))
    }
    // 2. Create Account
    const account = await Account.create({
      name,
      initialBalance,
      notes,
      accountType,
      createdBy: req.user
    })
    // 3. Push the Account into Users Account Field
    userFound.accounts.push(account._id)
    // 4. Resave The User
    await userFound.save()
    res.json({
      status: 'success',
      data: account
    })
  } catch (error) {
    next(error)
  }
}
// All Accounts
const getAllAccountCtrl = async (req, res) => {
  try {
    const accounts = await Account.find().populate('transactions')
    res.json(accounts)
  } catch (error) {
    res.json(error)
  }
}
// Get A Single Account
const singleAccountCtrl = async (req, res,next) => {
  try {
    // Find The Id from params
    const { id } = req.params;
    const account = await Account.findById(id).populate('transactions')

    res.json({
      status: 'success',
      data:account,
    })
  } catch (error) {
    next(new AppErr(error.message,500));
  }
}

const deleteAccountCtrl = async (req, res,next) => {
  try {
    const {id} = req.params;
    await Account.findByIdAndDelete(id);
    res.status(200).json({
      status:'success',
      data:null,
    })
  } catch (error) {
    next(new AppErr(error.message,500));
  }
}

const updateAccountCtrl = async (req, res,next) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id,req.body,{
      new:true,runValidators:true,
    })
    res.json({
      status:'success',
      data:account,
    })
  } catch (error) {
    next(new AppErr(error.message,500));
  }
}

module.exports = {
  createAccountCtrl,
  singleAccountCtrl,
  getAllAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl
}
