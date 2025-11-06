const express=require('express')
const authRoute=require('./routing/auth.route')
const chatRoute=require('./routing/chat.route')
const messageRoute=require('./routing/message.route')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express()
app.use(cors({
    origin:"https://jarvis-ai-390d.onrender.com",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)
module.exports=app
