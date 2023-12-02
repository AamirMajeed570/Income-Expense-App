require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = id=>{
    // console.log(process.env.JWT_KEY)
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn:"10d"})
}
module.exports = generateToken; 