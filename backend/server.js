require('dotenv').config()
const app=require('./src/app')
const connectDB=require('./src/db/db')
const httpServer=require('http').createServer(app)
const initiServer=require('./src/socket/socket')

connectDB()
initiServer(httpServer)
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT,()=>{
    console.log("server started")
})