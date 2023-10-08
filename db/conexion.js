const mongoose=require("mongoose")

// proceso de conexion con la url
const connectDB=(url)=>{
    return mongoose.connect(url)
}

module.exports=connectDB