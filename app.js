// Importo los paquetes
const express=require("express")
const cookieParser=require("cookie-parser")
const session = require("express-session");
const passport = require("passport");
const estrategiaLocal = require('./config/passport')

require("dotenv").config() //Importar variables de entorno

// Importo la conexión a la URL
const connectDB=require("./db/conexion")

// Importo el modulo de rutas
const authRoutes=require("./routes/authRoutes")

// Guardo el express en una constante
const app=express()

// Guardo el puerto desde .env
const puerto=process.env.PUERTO

// Hago que los archivos de la carpeta public sean estaticos
app.use(express.static("public"))
app.use(express.json())

// Seteo el motor de plantilla
app.set("view engine","ejs")

//middelware para leer lo datos del front
app.use(express.urlencoded({extended:true}))

//configuracion de cookie-parser
app.use(cookieParser(process.env.SECRETO_A));

//consgiguracion de express-session
app.use(session({
    secret: process.env.SECRETO_B,
    resave: false,
    saveUninitialized: true,
  }));

  // Configurar Passport.js
estrategiaLocal.estrategia(passport);
app.use(passport.initialize());
app.use(passport.session());

// Conexion de la base de datos mongo DB
const iniciarDB=async()=>{
   try{
       await connectDB(process.env.MONGO_URL)
       app.listen(puerto,console.log("servidor iniciado"))
   }
   catch(error){
       console.log(error)
   }
}

// Agrego la primera ruta
app.get("/",async(req,res)=>{
   res.redirect("home")
})

// Conecto las rutas
app.use(authRoutes)

// Uso la funcion iniciar
iniciarDB()



