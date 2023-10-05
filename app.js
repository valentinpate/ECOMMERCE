// Importo los paquetes
const express=require("express")
const mongoose=require("mongoose")
//importar variables de seguridad
require("dotenv").config();
// Importo el modulo de rutas
const authRoutes=require("./routes/authRoutes")

// Guardo el express en una constante
const app=express()

// Hago que los archivos de la carpeta public sean estaticos
app.use(express.static("public"))

// Seteo el motor de plantilla
app.set("view engine","ejs")

// Conexion de la base de datos mongo DB
const dbURL="mongodb+srv://martinbottaro34:JoT8VhALyqIxzzT2@cluster0.1kbibly.mongodb.net/"
mongoose.connect(dbURL)
.then((result)=>app.listen(4000))
.catch((error)=>console.log(error))


// Agrego la primera ruta
app.get("/",(req,res)=>{
    res.render("home") 
})


// Conecto las rutas 
app.use(authRoutes)

// levanto el servidor
// app.listen(4000,()=>{
//     console.log("servidor ejecutandose")
// })



