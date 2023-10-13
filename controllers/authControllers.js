// Se importa el archivo user con el esquema y los datos
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const Productos=require("../models/Productos")
const bcrypt=require("bcrypt")

let username = null
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

// se exporta la logica de las rutas a authRoutes

module.exports.signup_post= async(req,res)=>{
    // Destructuring
    const {email,name,user,password,phone,region}=req.body
    // Se usa un TRY y un CATCH para el manejo de errores
    try{
        const users= await User.create({email,name,user,password,phone,region})
        // Encriptar datos como token
        const token= createToken(users._id,users.email,users.password)
         res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
         res.status(201).json(users)
        username = user
    }
    catch(err){
        const errors=handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.signup_get=(req,res)=>{
    res.render("signup")
    
}

module.exports.login_post=async(req,res)=>{
    const {name, password} = req.body
    const busqueda = await User.find({user:name})
   // console.log(password)
   // console.log(busqueda[0].password)
    //const match = await bcrypt.compare(password, busqueda[0].password);
    if(busqueda[0].user === name && match){
        username = busqueda[0].user
        res.redirect("home")
    }else{
        res.send("Su cuenta no existe")
    }
}

module.exports.login_get=(req,res)=>{
    res.render("signin",{username})
}

//agrego la funcion para la page ofertas
module.exports.ofertas_get= async (req,res)=>{
    //paginacion (primera parte)
   let page = req.query.page
   if (page == null){page = 1}

   // llamdos a db
   const productosrender= await Productos.paginate({},{limit:12,page:page})

  ////paginacion (segundaparte)
  let a = 5 //catidad de botones visibles
  let llave = req.query.llave
  page = productosrender.page
 
   if(page==1){
      llave=false
  }else if(llave){   
       a=page+4
    }
   await res.render("ofertas",{productosrender,a,username})
}

//agrego la funcion para la page product
module.exports.product_get= async (req,res)=>{
    const paramid = req.query.id
    const paramcolec = req.query.coleccion
    const productrender= await Productos.find({_id:paramid})// producto en particular(en el que se hizo click)
  

     //paginacion (primera parte)
    let idproduct = productrender[0]._id //variable para seguir viendo el producto seleccionado atraves de las paginas
    let coleccionproduct = productrender[0].coleccion// variable para recorrer paginas de productos similares
   let page = req.query.page
   if (page == null){page = 1}

   // llamdos a db
    const productsimilares= await Productos.paginate({coleccion:paramcolec},{limit:12,page:page})

    ////paginacion (segundaparte)
  let a = 5 //catidad de botones visibles
  let llave = req.query.llave
  page = productsimilares.page
 
   if(page==1){
      llave=false
  }else if(llave){   
       a=page+4
    }
 
    res.render("product",{productrender, productsimilares,a,idproduct, coleccionproduct,username})
 }

//agrego la funcion para la page home
 module.exports.home_get=async(req,res)=>{


    // llamado a db para ofertas
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;

   //llamado para carrito
   const arraycarrito=await Productos.find({})

      //paginacion (primera parte)
      let page = req.query.page
      if (page == null){page = 1}
   
      // llamdos a db
      const productosrender= await Productos.paginate({},{limit:12,page:page})
   
     ////paginacion (segundaparte)
     let a = 5 //catidad de botones visibles
     let llave = req.query.llave
     page = productosrender.page
    
      if(page==1){
         llave=false
     }else if(llave){   
          a=page+4
       }

    //variable para login
    const user = false

     res.render("home",{homeofertas,i,j,arraycarrito,productosrender,a,username})
  } 

// funcion para enviar los datos a db
module.exports.agregarAlCarrito=async(req,res)=>{
    await Productos.findById(req.body.id)
    .then (producto => {
         req.user.agregarAlCarrito(producto) //acá en esta promesa se haría async / await ?
        .then(result => {
            res.redirect("/home")
        })
    })
    .catch(err => console.log (err))
} 

//agrego la funcion para la page de contacto
  module.exports.contacto_get= async(req,res)=>{
    res.render("contacto",{username})
  }
  
  //agrego la funcion para la page de miscompras
  module.exports.miscompras_get= async(req,res)=>{
    res.render("miscompras",{username})
  }

  module.exports.signout_get= async(req,res)=>{
    username = null
    res.render("signout",{username})
  }