const jwt = require("jsonwebtoken")
const authenticate = async (req,res,next)=>{
    try {
        console.log("Inside authenticate")
        const {
            cookies:{access_token :token},
        } =req;
        console.log(token)
        if(!token) throw new Error("Forbidden")
        const payload =jwt.verify(token,process.env.JWT_SECRET)
        req.user =payload;
        next()
        
    } catch (error) {
        console.log(error)
        res.status(403).send("Forbidden")
        
    }
};
const authorize =(req,res,next)=>{

}
module.exports = {authenticate}