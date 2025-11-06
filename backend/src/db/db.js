const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("connected to DB")
    })
}

module.exports=connectDB