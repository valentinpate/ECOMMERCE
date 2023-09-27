// Se importa el archivo user con el esquema y los datos
const User=require("../models/User")

// Manejo de errores
const handleErrors=(err)=>{
    console.log(err.message,err.code)
    let error = {email:"",name:"",password:"",user:"",phone:""}

    // Duplicaion de email
    if(err.code===11000){
        error.email="Este email ya esta en uso"
        return error
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
    const {email,name,user,password,phone}=req.body

    // Se usa un TRY y un CATCH para el manejo de errores
    try{
        const users= await User.create({email,name,user,password,phone})
        res.status(201).json(users)
    }
    catch(err){
        const errors=handleErrors(err)
        res.status(400).json({errors})
    }

}

module.exports.signup_get=(req,res)=>{
    
}


module.exports.login_post=(req,res)=>{
    
}

module.exports.login_get=(req,res)=>{
    
}