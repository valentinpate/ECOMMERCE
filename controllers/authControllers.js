// Se importa el archivo user con el esquema y los datos
const User=require("../models/User")
const jwt=require("jsonwebtoken")

// Manejo de errores
const handleErrors=(err)=>{
    // se imprime el mensaje de error y el código del error en la consola.
    console.log(err.message,err.code)
    // se inicializa un objeto llamado "error" con propiedades para diferentes campos. Esto se utilizará para almacenar mensajes de error específicos para cada campo.
    let error = {email:"",name:"",user:"",password:"",phone:"",region:""}

    // Duplicaion de email
    if (err.code === 11000) {
        // Si el error tiene el código 11000, se asume que es un error de duplicación de un valor único en la base de datos, como un email duplicado. En este caso, se establece el mensaje de error correspondiente en la propiedad "email" del objeto "error"

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
        // Si el error es una validación de errores generados por el modelo de usuario ("Usuarios validation failed"), se procesan estos errores y se almacenan los mensajes de error específicos para cada campo en el objeto "error".
        object.values(err.errors).forEach(({properties})=>{
            error[properties.path]=properties.message
        })
    }
    return error
}

// Token
const maxAge=3*24*60*60
const createToken=(id)=>{
    //se retorna el jwt con el metodo sign que seria para crear el token a traves del parametro id y con "secret" que es una cadena de texto secreta para terminar de concretar el token
    return jwt.sign({id},"secret",{
        expiresIn:maxAge
    })
}

// Se exporta la logica de las rutas a authRoutes
module.exports.signup_post= async(req,res)=>{
    // Destructuring
    const {email,name,user,password,phone,region}=req.body

    // Se usa un TRY y un CATCH para el manejo de errores
    try{
        const users= await User.create({email,name,user,password,phone,region})
        // Encriptar datos como token
        const token=createToken(users._id,users.email,users.password)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json(users)
    }
    catch(err){
        const errors=handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.signup_get=(req,res)=>{
    res.render("signup")
}

module.exports.login_post=(req,res)=>{
    res.render("signin")
}
// module.exports.login_get=(req,res)=>{
    
// }

const Productos=require("../models/Productos")


//agrego la funcion para la page ofertas
module.exports.ofertas_get= async (req,res)=>{
   let page = req.query.page
   if (page == null){page = 1}

   const ofertasrender= await Productos.paginate({},{limit:5,page:page})

  ////funcion que estoy probando
  let a = 5
  let llave = req.query.llave
  page = ofertasrender.page
 
   if(page==1){
      llave=false
  }else if(llave){   
       a=page+4
      }
  //console.log(ofertasrender)
   await res.render("ofertas",{ofertasrender,a})

}

//agrego la funcion para la page product
module.exports.product_get= async (req,res)=>{
    const paramid = req.query.id
    const paramcolec = req.query.coleccion

    const productrender= await Productos.find({_id:paramid})
    const productsimilares= await Productos.find({coleccion:paramcolec})

    // let a = req.query.a
    // let key = req.query.key
    // let page = 2

    // if(a==null){
    //     key=false
    //     a = 5
    // }else if(key){
    //     page=req.query.page
    //     a=a+4
    //     page++
    // }

    // console.log(a)
    // console.log(key)
 
    res.render("product",{productrender, productsimilares})
 }

//agrego la funcion para la page home
module.exports.home_get=async(req,res)=>{
    // creo costante para exportar porductos de ofertas en home
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;
  
    res.render("home",{homeofertas,i,j})
}

