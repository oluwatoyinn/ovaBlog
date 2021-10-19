const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(req, res, next){
    // get the tokrn from header
    const token = req.header("x-auth-token")

    // check if not taken
    if(!token){
        return res.status(401).json({msg:"No token found, authorization failed"})
    }

    // verify token
    try {
       const decoded = jwt.verify(token, config.get("jwtTokenSecret"))
       
       req.user = decoded.user
       next()
    } catch (error) {
       res.status(401).json({msg:"Token is not valid"}) 
    }
}