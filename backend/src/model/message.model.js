const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    },
    content:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","model"],
        default:"user"
    }
},{
    timestamps:true
})

const messageModel=mongoose.model("message",messageSchema)

module.exports=messageModel