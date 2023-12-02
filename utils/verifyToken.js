require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = token=>{
    // console.log(process.env.JWT_KEY)
    return jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if(err){
            return false;
        }
        else{
            return decoded;
        }
    })
}
module.exports = verifyToken;