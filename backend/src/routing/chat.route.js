const express=require('express')
const authMiddleware = require('../middleware/middleware')
const { createChat, getChats } = require('../controller/chat.controller')

const route=express.Router()

route.post('/',authMiddleware,createChat)
route.get('/getChats',authMiddleware,getChats)

module.exports=route