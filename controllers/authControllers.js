// Se importa el archivo user con el esquema y los datos
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const Productos=require("../models/Productos")
const bcrypt=require("bcrypt")
const passport = require ("passport")

let username = null
let msj_login = false
let arrayCarrito=[]
let miRuta= null

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
    console.log(error)
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
    res.render("signup",{msj_login})
    
}

 module.exports.login_post=async(req,res)=>{
    if(req.isAuthenticated()){
        //console.log("login",req.user)
        username=req.user.user
        msj_login=false
        res.redirect("home")
    }else{
        msj_login=true
    }
}
module.exports.login_get=(req,res)=>{
    res.render("signin",{username,msj_login})
}

//agrego la funcion para la page ofertas
module.exports.ofertas_get= async (req,res)=>{
  miRuta="ofertas"
  //logica y variables de carrito
  if(req.user){
    username=req.user.user
    items=req.user.cart.items
    if(items.length>arrayCarrito.length){
        let promesa =  items.map(async(elemento)=> {
        let producto = await Productos.findById(elemento.productId)
        return producto
        });
        arrayCarrito = await Promise.all(promesa); 
      }    
  };
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
   await res.render("ofertas",{productosrender,a,username,miRuta,arrayCarrito})
}

//agrego la funcion para la page product
module.exports.product_get= async (req,res)=>{
  miRuta="product"
  //logica y variables de carrito
  if(req.user){
    username=req.user.user
    items=req.user.cart.items
    if(items.length>arrayCarrito.length){
        let promesa =  items.map(async(elemento)=> {
        let producto = await Productos.findById(elemento.productId)
        return producto
        });
        arrayCarrito = await Promise.all(promesa); 
      }    
  };
  //llamado al id del producto
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
 
    res.render("product",{productrender, productsimilares,a,idproduct, coleccionproduct,username,miRuta,arrayCarrito})
 }

//agrego la funcion para la page home
 module.exports.home_get=async(req,res)=>{
  miRuta="home"
//logica y variables de carrito
   if(req.user){
    username=req.user.user
        items=req.user.cart.items
        if(items.length>arrayCarrito.length){
            let promesa =  items.map(async(elemento)=> {
            let producto = await Productos.findById(elemento.productId)
            return producto
            });
            arrayCarrito = await Promise.all(promesa); 
          }    
      };
   //console.log("productos a renderizar", arrayCarrito)

    //Buscador
    //declaro variable
    const palabraclave = req.query.palabraclave // el ejs en header esta definimos por un form y lo tengo que capturar con u00n req.query no era req.body
    const expresionregular = new RegExp(palabraclave, 'i');//se crea a expresion relugular apartir de la variable palabraclave, la "i" es para que sea insensible a las mayusculas
  

    // llamado a db para ofertas
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;

      //paginacion (primera parte)
      let page = req.query.page
      if (page == null || page == undefined){page = 1}
   
      
      // llamdos a db
     async function llamados(expresionregular,page){
      if(palabraclave == ""){
        productos= await Productos.paginate({},{limit:12,page:page})
       
      }else{
        productos= await Productos.paginate({nombre:{ $regex: expresionregular }},{limit:12,page:page})
      }
      //console.log(productos)
      return productos
    };

    let productosrender = await llamados(expresionregular,page);
    

     ////paginacion (segundaparte)
     let a = 5 //catidad de botones visibles
     let llave = req.query.llave
     page = productosrender.page
    
      if(page==1){
         llave=false
     }else if(llave){   
          a=page+4
       }
     res.render("home",{homeofertas,i,j,arrayCarrito,productosrender,a,username,miRuta})
  } 

// funcion para enviar los datos a db
module.exports.agregarAlCarrito=async(req,res)=>{
  const { cantidad, id } = req.body;
  console.log("cantidad de productos",cantidad, "y el id es ", id)
    try{
      console.log("paso")
        if (req.isAuthenticated()) {
        await User.findById(req.user.id)
        const producto= await Productos.findById(req.body.id)
         //console.log(producto)
         const result= await req.user.agregarAlCarrito(producto) //acá en esta promesa se haría async / await ?
             if(result){
                 res.redirect("/home")
             }
            }
    }
  catch(err){
    console.log (err)
  }
} 

//agrego la funcion para la page de contacto
  module.exports.contacto_get= async(req,res)=>{
    miRuta="contacto"
    //logica y variables de carrito
   if(req.user){
    username=req.user.user
    items=req.user.cart.items
    if(items.length>arrayCarrito.length){
        let promesa =  items.map(async(elemento)=> {
        let producto = await Productos.findById(elemento.productId)
        return producto
        });
        arrayCarrito = await Promise.all(promesa); 
      }    
  };
    res.render("contacto",{username,miRuta,arrayCarrito})
  }
  
  //agrego la funcion para la page de miscompras
  module.exports.miscompras_get= async(req,res)=>{
    miRuta="miscompras"
    //logica y variables de carrito
   if(req.user){
    username=req.user.user
    items=req.user.cart.items
    if(items.length>arrayCarrito.length){
        let promesa =  items.map(async(elemento)=> {
        let producto = await Productos.findById(elemento.productId)
        return producto
        });
        arrayCarrito = await Promise.all(promesa); 
      }    
  };
    res.render("miscompras",{username,miRuta,arrayCarrito})
  }

  module.exports.signout_get= async(req,res)=>{
    username = null
    res.render("signout",{username})
  }

  module.exports.miperfil_get= async (req,res)=>{
    miRuta="miperfil"
    //logica y variables de carrito
   if(req.user){
    username=req.user.user
    items=req.user.cart.items
    if(items.length>arrayCarrito.length){
        let promesa =  items.map(async(elemento)=> {
        let producto = await Productos.findById(elemento.productId)
        return producto
        });
        arrayCarrito = await Promise.all(promesa); 
      }    
  };
  //datos del usuario///xq no hace falta pasarlo en el objeto para renderizar en el ejs
    nombre=req.user.name
    username=req.user.user
    telefono = req.user.phone
    res.render("miperfil",{username,miRuta,arrayCarrito})
  }

  module.exports.info_get=async (req,res)=>{
    miRuta="informacion"
        //logica y variables de carrito
   if(req.user){
    username=req.user.user
    items=req.user.cart.items
    if(items.length>arrayCarrito.length){
        let promesa =  items.map(async(elemento)=> {
        let producto = await Productos.findById(elemento.productId)
        return producto
        });
        arrayCarrito = await Promise.all(promesa); 
      }    
  };
    res.render("informacion",{username,arrayCarrito,miRuta})
  }