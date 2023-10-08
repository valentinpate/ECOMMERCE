// Importo los paquetes
const express=require("express")
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")

//importar variables de seguridad
require("dotenv").config();

// Importo la conexion a la url
const connectDB=require("./db/conexion")

// Importo el modulo de rutas
const authRoutes=require("./routes/authRoutes")
const Productos=require("./models/Productos")

// Guardo el express en una constante
const app=express()
// Seteo el motor de plantilla
app.set("view engine","ejs")

// Guardo el puerto desde .env
const puerto=process.env.PUERTO

// Hago que los archivos de la carpeta public sean estaticos
app.use(express.static("public"))
app.use(express.json())

// Conexion de la base de datos mongo DB
const iniciar=async()=>{
    try{
        // le paso la url a conenctDB y hace la conexion desde conexion.js
        await connectDB(process.env.MONGO_URL)
        app.listen(puerto,console.log("servidor iniciado"))
    }
    catch(error){
        console.log(error)
    }
}


// Agrego la primera ruta
app.get("/",(req,res)=>{
    res.render('home') 
})


// Conecto las rutas 
app.use(authRoutes)

// Uso la funcion iniciar
iniciar()



// Prueba Cookies
// app.get("/tomar-cookie",(req,res)=>{
//     res.cookie("NewUser",true,{maxAge:1000*60*60*24})
//     res.send("datos enviados")


// app.listen(4000,()=>{
//     console.log("servidor ejecutandose")
// })
// app.get("/leer-cookie",(req,res)=>{
//     const cookies=req.cookies
//     res.json(cookies)
// })








