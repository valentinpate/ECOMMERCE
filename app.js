// Importo los paquetes
const express=require("express")
const mongoose=require("mongoose")
const Productos=require("./models/Productos")

// Importo el modulo de rutas
const authRoutes=require("./routes/authRoutes")

// Guardo el express en una constante
const app=express()
// Seteo el motor de plantilla
app.set("view engine","ejs")

// Hago que los archivos de la carpeta public sean estaticos
app.use(express.static("public"))

// Conexion de la base de datos mongo DB

const dbURL="mongodb+srv://martinbottaro34:JoT8VhALyqIxzzT2@cluster0.1kbibly.mongodb.net/"
mongoose.connect(dbURL)
.then((result)=>app.listen(4000))
.catch((error)=>console.log(error))


// Agrego la primera ruta
app.get("/",async(req,res)=>{

   res.render("signin")
})

// Conecto las rutas
app.use(authRoutes)

// app.listen(4000,()=>{
//     console.log("servidor ejecutandose")
// })



