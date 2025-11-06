const express=require('express')
const { authRegister, authLogin, logout } = require('../controller/auth.controller')
const authMiddleware = require('../middleware/middleware')

const route=express.Router()

route.post('/register',authRegister)
route.post('/login',authLogin)
route.post('/logout',authMiddleware,logout)
module.exports=route