const mongoose=require("mongoose")

const Productos=require("./models/Productos")

const jsonProduct=require('./productos.json')

const iniciar=async()=>{
    try{
         
        await mongoose.connect("mongodb+srv://martinbottaro34:JoT8VhALyqIxzzT2@cluster0.1kbibly.mongodb.net/")
            await Productos.deleteMany()
            await Productos.create(jsonProduct)
            console.log('SE EFECTO EL CAMBIO')
    }
    catch(error){
        console.log(error)
    }
}

iniciar()