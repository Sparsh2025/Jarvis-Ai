require('dotenv').config()
const app=require('./src/app')
const connectDB=require('./src/db/db')
const httpServer=require('http').createServer(app)
const initiServer=require('./src/socket/socket')

connectDB()
initiServer(httpServer)

httpServer.listen(3000,()=>{
    console.log("server started")
})