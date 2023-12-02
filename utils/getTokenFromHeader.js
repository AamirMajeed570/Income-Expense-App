const verifyToken = require("./verifyToken");
const getTokenFromHeader = (req)=>{
    // How to get a Token from Header
    // The word "Bearer" is used to indicate that the token is included in the header
  const headerObj = req.headers
  const token = headerObj['authorization'].split(' ')[1]
  const result = verifyToken(token);
  if(token!== undefined){
    return token
  }
  else{
    return{
        status:'Failed',
        message:'No Token attached to the Header',
    }
  }
}

module.exports = getTokenFromHeader;