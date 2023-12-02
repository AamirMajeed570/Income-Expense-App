const { AppErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader")
const verifyToken = require("../utils/verifyToken")

const isLogin = (req,res,next)=>{
    // Get Token From The User
    const token = getTokenFromHeader(req);
    // Verify
    const decodedUser=verifyToken(token)
    // Save the User into Req body
    req.user = decodedUser.id;
    if(!decodedUser){
        return next(new AppErr('Invalid Token,Please Login again',401));
    }
    next();
}

module.exports = isLogin;