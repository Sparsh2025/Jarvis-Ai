const jwt=require('jsonwebtoken')
const authModel = require('../model/auth.model')
async function authMiddleware(req,res,next){
  const {token}=req.cookies
  if(!token){
    return res.status(401).json({
        message:"unauthorized"
    })
  }
 try {
    
  const decode=jwt.verify(token,process.env.JWT_SECRET)
  const user=await authModel.findOne({
    _id:decode.id
  })
  req.user=user
  next()
 } catch (error) {
    res.status(401).json({
        message:"unauthorized"
    })
 }
}

module.exports=authMiddleware