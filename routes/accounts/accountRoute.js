const express = require("express");
const { createAccountCtrl, singleAccountCtrl, getAllAccountCtrl, deleteAccountCtrl, updateAccountCtrl } = require("../../controllers/accounts/accountCtrl");
const isLogin = require("../../middlewares/isLogin");
const accountRoute = express.Router()

// Account Routes
// ***************
// POST/api/v1/accounts
accountRoute.post("/",isLogin,createAccountCtrl);

// GET/api/v1/accounts/:id
accountRoute.get("/:id",singleAccountCtrl);

// GET/api/v1/accounts/
accountRoute.get("/",getAllAccountCtrl)

// DELETE/api/v1/accounts/:id
accountRoute.delete("/:id",deleteAccountCtrl)

// UPDATE/api/v1/accounts/:id
accountRoute.put("/:id",updateAccountCtrl)
module.exports ={ accountRoute}