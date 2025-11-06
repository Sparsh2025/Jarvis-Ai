const mongoose=require('mongoose')


const authSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const authModel=mongoose.model("users",authSchema)

module.exports=authModel