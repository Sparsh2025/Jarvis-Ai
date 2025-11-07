const authModel = require("../model/auth.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
async function authRegister(req,res){
    const{fullName:{firstName,lastName},email,password}=req.body

    const isUserExists=await authModel.findOne({
        email:email
    })
    if(isUserExists){
       return res.status(401).json({
            message:"user already exists"
        })
    }
    const bcryptPassword=await bcrypt.hash(password,10)
    try {
       const user=await authModel.create({
        fullName:{
            firstName,lastName
        },
        email:email,
        password:bcryptPassword
    })
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(201).json({
        message:"user created",
        user
    }) 
    } catch (error) {
        console.log(error)
    }

}

async function authLogin(req,res){
    const {email,password}=req.body

    const user=await authModel.findOne({
        email:email
    })
    if(!user){
       return res.status(401).json({
            message:"user not exists"
        })
    }
    const isPassword=await bcrypt.compare(password,user.password)
    if(!isPassword){
       return res.status(401).json({
            message:"wrong password"
        })
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(200).json({
        message:"login success",
        user
    })
}

 function logout(req,res){
  try { 
      res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Server error while logging out" });
  }

}
module.exports={authRegister,authLogin,logout}
