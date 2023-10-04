// Importo los paquetes
const express=require("express")
const mongoose=require("mongoose")
//importar variables de seguridad
const dotenv = require ("dotenv")
dotenv.config();
// Importo el modulo de rutas
const authRoutes=require("./routes/authRoutes")
const Productos=require("./models/Productos")

// Guardo el express en una constante
const app=express()
// Seteo el motor de plantilla
app.set("view engine","ejs")

// Hago que los archivos de la carpeta public sean estaticos
app.use(express.static("public"))


// Conexion de la base de datos mongo DB
console.log("prueba")
const dbURL="mongodb+srv://martinbottaro34:JoT8VhALyqIxzzT2@cluster0.1kbibly.mongodb.net/"
mongoose.connect(dbURL)
.then((result)=>app.listen(4000))
.catch((error)=>console.log(error))


// Agrego la primera ruta
app.get("/",(req,res)=>{
    res.render("home") 
})

app.get("/prueba",async (req,res)=>{
    try{
        console.log("probando")
        const productos = await Productos.find({})
        console.log("probado")
        res.status(201).json(productos)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
})

// Conecto las rutas
app.use(authRoutes)

// levanto el servidor
// app.listen(4000,()=>{
//     console.log("servidor ejecutandose")
// })



