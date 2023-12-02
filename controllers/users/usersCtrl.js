const bcrypt = require('bcryptjs')
const User = require('../../model/User')
const { AppErr, appErr } = require('../../utils/appErr')
const generateToken = require('../../utils/generateToken')
// const verifyToken = require('../../utils/verifyToken')

// In this file we will write the business logic for User
// Register a new User
const registerUserCtrl = async (req, res, next) => {
  const { fullname, password, email } = req.body
  try {
    // Check If Email Exists
    const userFound = await User.findOne({ email })
    if (userFound) {
      return next(new AppErr('User Already Exists', 400))
    }
    // Check If Fields are Empty
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    // Create User
    const user = await User.create({
      fullname,
      email,
      password: hashPassword
    })
    res.json({
      status: 'success',
      fullname: user.fullname,
      id: user._id,
      email: user.email
    })
  } catch (error) {
    next(new AppErr(error.message,500))
  }
}

// Login Ctrl
const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body

  try {
    // Check If Email Exists
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return next(new AppErr('Invalid Credentials', 400))
    }
    // Check Password
    const isPasswordMatch = await bcrypt.compare(password, userFound.password)
    if (!isPasswordMatch) {
      return next(new AppErr('Invalid Credentials', 400))
    }
    res.json({
      status: 'success',
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id)
    })
  } catch (error) {
    next(new AppErr(error.message,500))
  }
}

// Profile Ctrl
const profileUserCtrl = async (req, res,next) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user).populate({
      path:"accounts",
      populate:{
        path:'transactions',
        "model":"Transaction",
      }
    });
    res.json(user)
  } catch (error) {
    next(new AppErr(error.message,500))
  }
}

// Delete Ctrl
const deleteUserCtrl = async (req, res,next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status:'success',
      data:null
    })
    res.json({ msg: 'Delete Route' })
  } catch (error) {
   next(new AppErr(error.message,500))
  }
}

// Update Ctrl
const updateUserCtrl = async (req, res,next) => {
  try {
    // Check if email Exists
    const userFound = await User.findOne({email:req.body.email})
    if(req.body.email){
      if(userFound){
        return next(new AppErr('Email Already Taken',402))
      }
    }

    // Check if user is updating password
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      // Update The User
      const user = await User.findByIdAndUpdate(req.user,{
        password:hashedPassword,
      },
      {
        new:true,
        runValidators:true,
      })
      //  Send The Response
       return res.status(200).json({
        status:'success',
        data:user,
      })
    }
    const user = await User.findByIdAndUpdate(req.user,req.body,{
      new:true,
      runValidators:true,
    })
    //  Send The Response
   return res.status(200).json({
      status:'success',
      data:user,
    })
  } catch (error) {
    next(new AppErr(error.message,500))
  }
}
module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  profileUserCtrl,
  deleteUserCtrl,
  updateUserCtrl
}
