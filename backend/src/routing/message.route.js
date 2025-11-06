const express=require('express')
const authMiddleware = require('../middleware/middleware')
const getMessages = require('../controller/message.controller')

const route=express.Router()

route.get('/:id',authMiddleware,getMessages)
module.exports=route