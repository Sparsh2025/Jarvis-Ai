const chatModel = require("../model/chat.model")

async function createChat(req,res){
    const {title}=req.body
    const user=req.user
    if(!title){
       return res.json({
            message:"provide title"
        })
    }

    const chat=await chatModel.create({
        userId:user._id,
        title:title
    }) 
    res.status(201).json({
        message:"title created",
        chat
    })
}
async function getChats(req,res){
    const user=req.user
    if(!user){
        return res.status(401).json({
            message:"login please"
        })
    }
try {
    const chats=await chatModel.find({
        userId:user._id
    })
    res.status(200).json({
        message:"chats fetched",
        chats
    })
} catch (error) {
    res.json({
        message:"error"
    })
}
    

}
module.exports={createChat,getChats}