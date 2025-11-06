const messageModel = require("../model/message.model")

async function getMessages(req,res) {
    const {id}=req.params
    try {
        const messages=await messageModel.find({
            chatId:id
        })
        res.status(200).json({
            message:"message fetched",
            messages
        })
    } catch (error) {
        res.json({
            message:"error"
        })
        console.log(error)
    }
}

module.exports=getMessages