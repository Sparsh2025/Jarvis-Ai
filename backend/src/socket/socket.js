const { Server } = require("socket.io");
const {generateResponse,generateVector} = require("../service/ai.service");
const cookie=require('cookie')
const jwt=require('jsonwebtoken');
const authModel = require("../model/auth.model");
const messageModel = require("../model/message.model");
const { vectorStore, queryVector } = require("../service/vectordb.service");

function initiServer(httpServer){
const io = new Server(httpServer, {  cors: {
            origin:["https://jarvis-ai-390d.onrender.com", "http://localhost:5173"],
            methods: ["GET", "POST"],
            credentials: true
        } });
io.use(async(socket,next)=>{
    const cookies=cookie.parse(socket.handshake.headers.cookie || "")
    if(!cookies.token){
        next(new Error("unauthorized"))
    }
    try {
        const decode=jwt.verify(cookies.token,process.env.JWT_SECRET)
        const user=await authModel.findById({
            _id:decode.id
        })
        socket.user=user
        next()
    } catch (error) {
        next(new Error("unauthorized")) 
    }
})
io.on("connection", (socket) => {
     
  socket.on('ai-message',async(messagePayload)=>{
     const user=socket.user
    
     // storing user message in mongodb and creating its vector
   const [userMessage,vector] = await Promise.all([ 
        messageModel.create({
        userId:user._id,
        chatId:messagePayload.chatId,
        content:messagePayload.content,
        role:'user'
    }),
    generateVector(messagePayload.content)
   ])
    
   // storing vectors in vector database pinecone
     await vectorStore({
        vector,
        messageId:userMessage._id,
        metadata:{
            chatId:messagePayload.chatId,
            userId:user._id,
            text:messagePayload.content
        }
     })
   // seraching chatHistory data from messageModel for sort term memory(stm) and memoryData from pinecone vector database for long term memory(ltm)   
   const [memoryData,chatHistory] =  await Promise.all([
    queryVector({
        vector,
        limit:3,
        metadata:{userId:user._id}
     }),
     messageModel.find({
        chatId:messagePayload.chatId
     }).sort({ createdAt: -1 }).limit(20).lean().then(messages => messages.reverse())
   ])
   
     console.log(memoryData)
   
    const stm=chatHistory.map((items)=>{
        return{
            role:items.role,
            parts:[{text:items.content}]
        }
    })
    const ltm=[
        {
            role:"user",
            parts:[{text:`this is data from vector databse
                  ${memoryData.map(items=>items.metadata.text).join("\n")}
                `}]
        }
    ]
   
  const response=await generateResponse([...ltm,...stm])
  
   socket.emit('ai-response',{
    content:response,
    chatId:messagePayload.chatId
   })
  // response from ai is storing in mongodb and we are creating its vector
  const [aiMessage,resVector] =  await Promise.all([
    messageModel.create({
        userId:user._id,
        chatId:messagePayload.chatId,
        content:response,
        role:'model'
    }),
    generateVector(response)
  ])
  
    await vectorStore({
        vector:resVector,
        messageId:aiMessage._id,
        metadata:{
            chatId:messagePayload.chatId,
            userId:user._id,
            text:response
        }
     })
   
  })
});
}

module.exports=initiServer
