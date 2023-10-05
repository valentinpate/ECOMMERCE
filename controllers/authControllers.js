// Se importa el archivo user con el esquema y los datos
const User=require("../models/User")

// Manejo de errores
const handleErrors=(err)=>{
    console.log(err.message,err.code)
    let error = {email:"",name:"",password:"",user:"",phone:"",region:""}

    // Duplicaion de email
    if (err.code === 11000) {
        if (err.message.includes("email")) {
            error.email = "Este email ya está en uso";
        }
        if (err.message.includes("user")) {
            error.user = "Este usuario ya está en uso";
        }
        return error;
    }

    // Validacion de errores
    if(err.message.includes("Usuarios validation failed")){
        object.values(err.errors).forEach(({properties})=>{
            error[properties.path]=properties.message
        })
    }
    return error
}

// Se exporta la logica de las rutas a authRoutes
module.exports.signup_post= async(req,res)=>{
    // Destructuring
    const {email,name,user,password,phone,region}=req.body

    // Se usa un TRY y un CATCH para el manejo de errores
    try{
        const users= await User.create({email,name,user,password,phone,region})
        res.status(201).json(users)
    }
    catch(err){
        const errors=handleErrors(err)
        res.status(400).json({errors})
    }
}

const Productos=require("../models/Productos")
// se exporta la logica de las rutas a authRoutes

module.exports.signup_post=(req,res)=>{

}

module.exports.signup_get=(req,res)=>{
    res.render("signup")// agregue el renderizado de la page
    
}


module.exports.login_post=(req,res)=>{
    
}

//agrego la funcion para la page ofertas
module.exports.ofertas_get= async (req,res)=>{
   const ofertasrender= await Productos.find({coleccion:"ofertas"})

    await res.render("ofertas",{ofertasrender})
}

//agrego la funcion para la page product
module.exports.product_get= async (req,res)=>{
    const paramid = req.query.id
    const paramcolec = req.query.coleccion

    const productrender= await Productos.find({_id:paramid})
    const productsimilares= await Productos.find({coleccion:paramcolec})
 
     await res.render("product",{productrender,productsimilares})
 }

//agrego la funcion para la page home
module.exports.home_get=async(req,res)=>{
    // creo costante para exportar porductos de ofertas en home
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;
    res.render("home",{homeofertas,i,j})
}
