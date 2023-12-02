const express = require('express')
const {
  registerUserCtrl,
  loginUserCtrl,
  profileUserCtrl,
  deleteUserCtrl,
  updateUserCtrl
} = require('../../controllers/users/usersCtrl')
const isLogin = require('../../middlewares/isLogin')

const usersRoute = express.Router()
// Users Route

// POST/api/v1/users/register
usersRoute.post('/register',registerUserCtrl)
// POST/api/v1/users/login
usersRoute.post('/login', loginUserCtrl)

// GET/api/v1/users/register/profile/:id
usersRoute.get('/profile/',isLogin,profileUserCtrl)

// DELETE/api/v1/users/:id
usersRoute.delete('/',isLogin, deleteUserCtrl);
// UPDATE/api/v1/users/:id
usersRoute.put('/',isLogin, updateUserCtrl)

module.exports = {
  usersRoute
}
