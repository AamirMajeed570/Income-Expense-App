require('dotenv').config();
require('./config/dbConnect');
const cors = require("cors")
const express = require("express");
const bodyParser = require('body-parser')
const { usersRoute } = require("./routes/users/usersRoute");
const { accountRoute } = require("./routes/accounts/accountRoute");
const { transactionRoutes } = require("./routes/transactions/transactionRoute");
const globalErrHandler = require('./middlewares/globalErrHandler');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
// CORS Middleware
app.use(cors());
// ***************MIDDLEWARES CODE STARTS*************** 

// User Middleware
app.use("/api/v1/users",usersRoute);

// Accounts Middleware
app.use("/api/v1/accounts",accountRoute);

// Transaction Middleware
app.use("/api/v1/transactions",transactionRoutes);

// ***************MIDDLEWARES CODE ENDS*************** 

//Middleware For Error Handlers
app.use(globalErrHandler);

// Listen Server
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is Listening at http://localhost:${PORT}`);
})