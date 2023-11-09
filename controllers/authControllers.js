// Se importa el archivo user con el esquema y los datos
const User=require("../models/User")
const jwt=require("jsonwebtoken")
const Productos=require("../models/Productos")
const bcrypt=require("bcrypt")
const passport=require("passport")

let username = null
let miRuta= null
let seccion = null
let productosrender = null
let palabraclave = null

let detalles = false
let msj_login = false
let incomplete = false
let llave2 = false

let arrayCarrito=[]
let arrayMisCompras=[]
let arrayProductos=[]

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

// Middleware
module.exports.middleware = {
    middle: (req,res,next)=>{
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect("signin")
        }
    },
    arrayCartPromise: async (req,res,next) =>{ 
        if(req.user){
            username=req.user.user
            items=req.user.cart.items
            let promesa =  items.map(async(elemento)=> {
            let producto = await Productos.findById(elemento.productId)
            let cantidad = elemento.cantidad
            return {producto, cantidad}
            });
            arrayCarrito = await Promise.all(promesa);
        }
        //console.log("productos a renderizar", arrayCarrito)
        next()
    }
}

// CONTROLADORES (se exporta la logica de las rutas a authRoutes)

// SignUp, LogIn y LogOut

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
    if(req.isAuthenticated()){
        username=req.user.name
        msj_login=false
        res.redirect("home")
    }else{
        msj_login=true
    }
}

module.exports.login_get=(req,res)=>{
    let errorText = "Hubo un error en su petición. Por favor, intente más tarde"
    res.render("signin",{username, msj_login, errorText})
}

module.exports.signOut_get=(req,res)=>{
    username = null
    req.logOut(function(err){
        if(err){
            return next(err)
        }
    })
    res.redirect("home")
}

//Renderización de Rutas 

module.exports.secciones_get= async (req,res)=>{
   miRuta="secciones"
   seccion = req.query.coleccion
   llave2 = req.query.llave2
   //paginacion(primera parte)
   let page = req.query.page
   if (page == null){page = 1}

   //llamados a db
   if(llave2){
        productosrender= await Productos.paginate({},{limit:12,page:page})
   }else{
        productosrender= await Productos.paginate({coleccion:seccion},{limit:12,page:page})
   }

  ////funcion que estoy probando
  let a = 5 //catidad de botones visibles
  let llave = req.query.llave
  page = productosrender.page
 
   if(page==1){
      llave=false
  }else if(llave){   
       a=page+4
    }
   await res.render("secciones",{username, productosrender,a, miRuta, arrayCarrito, seccion, palabraclave, llave2})
}

//agrego la funcion para la page product
module.exports.product_get= async (req,res)=>{
    miRuta="product"
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
 
    res.render("product",{productrender, productsimilares, a, idproduct, coleccionproduct,miRuta,arrayCarrito})
 }


//agrego la funcion para la page home
module.exports.home_get=async(req,res)=>{
    miRuta="home"
    //Buscador
    //declaro variable
    palabraclave = req.query.palabraclave //el ejs en header esta definimos por un form y lo tengo que capturar con u00n req.query no era req.body
    const expresionregular = new RegExp(palabraclave, 'i');//se crea a expresion relugular apartir de la variable palabraclave, la "i" es para que sea insensible a las mayusculas


    // llamado a db para ofertas
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;

//    //llamado para carrito
//    const arrayCarrito=await Productos.find({})
      //paginacion (primera parte)
      let page = req.query.page
      if (page == null || page == undefined){page = 1}
   
      // llamdos a db
    async function llamados (expresionregular,page){
        if(palabraclave == ""){
            return productosResponse= await Productos.paginate({},{limit:12,page:page})
        }else{
            return productosResponse= await Productos.paginate({nombre:{ $regex: expresionregular }},{limit:12,page:page})
        }
      }

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
    res.render("home",{username, homeofertas,i,j,arrayCarrito,productosrender,a,username,miRuta, seccion, palabraclave,llave2})
}

//agrego la funcion para la page de contacto
module.exports.contacto_get= async(req,res)=>{
    miRuta="contacto"
    res.render("contacto",{username, miRuta, arrayCarrito})
  }
  
  //agrego la funcion para la page de miscompras
module.exports.miscompras_get= async(req,res)=>{
    detalles=req.query.detalles
    compras = req.user.misCompras
    idQuery= req.query.id

    let promesaCompras= compras.map(async(elemento)=>{
        let pedidos = elemento.pedidos
        let fecha= elemento.fecha
        let envio=2500
        let subtotalFinal=elemento.precio
        let totalFinal= elemento.total
        let estado= elemento.estado
        let id= elemento._id
        return {fecha,envio,subtotalFinal,totalFinal,estado, id, pedidos}
    })

    arrayMisCompras= await Promise.all(promesaCompras);
    console.log("mis compras= ",arrayMisCompras)
    if(detalles === "true"){
     
    let promesaSecundaria= arrayMisCompras.map(async(e)=>{
        if(e.id == idQuery){
            let promesaInicial= e.pedidos.map(async(elemento)=>{
            let productoPorUnidad = await Productos.findById(elemento.pedidoId)
            let nombreProducto=productoPorUnidad.nombre
            let imagenProducto=productoPorUnidad.imagen
            let cantidadMisCompras= elemento.cantidad//cantidad
            let subtotalMiscompras= elemento.precioPorCantProducto// precio por cantidad
            let precioMiscompras = elemento.precioConDesc// precio con el descuento echo 
            return {nombreProducto,imagenProducto,cantidadMisCompras,subtotalMiscompras,precioMiscompras}
        })
            arrayProductos= await Promise.all(promesaInicial);
            return arrayProductos
    }
    })
        arrayProductos= await Promise.all(promesaSecundaria);
        arrayProductos= arrayProductos.filter((elemento) => elemento !== undefined);
    }
    console.log("arrayProductos3= ",arrayProductos)

    miRuta="miscompras"
    res.render("miscompras",{username, miRuta, arrayCarrito,detalles,arrayMisCompras,arrayProductos})
  }

module.exports.miperfil_get= (req,res)=>{
    miRuta="miperfil"
    nombre=req.user.name
    username=req.user.user
    telefono = req.user.phone
    res.render("miperfil",{username, miRuta, arrayCarrito, incomplete})
}

module.exports.informacion_get = (req, res)=>{
    res.render("informacion",{username, arrayCarrito})
}

// FUNCIONES POST + MÉTODOS DE DB

module.exports.agregarAlCarrito=async(req,res)=>{
    const { cantidad, arrayId } = req.body
    try{
        if(!req.isAuthenticated()){
            res.redirect("signin")
        }
        if(req.isAuthenticated()) {
            if(arrayId != undefined && arrayId.length > 0){
                for (const e of arrayId){
                    await User.findById(req.user.id); // Busca id del usuario
                    const producto = await Productos.findById(e)
                    console.log("Producto: ", producto)
                    await req.user.agregarAlCarrito(producto, cantidad)
                }
                res.redirect("home")
            }else{
                await User.findById(req.user.id) //busca id del usuario
                const producto= await Productos.findById(req.body.id) //busca el id del producto en la base
                const result= await req.user.agregarAlCarrito(producto,cantidad) //agrega al carrit
                if(result){
                    res.redirect("/home")
                }
            }
        }
    }
    catch(err){ console.log (err) }
}

module.exports.eliminarDelCarrito=async(req,res)=>{
    const id = req.params.id
    let carritoItems = req.user.cart.items
    const index = carritoItems.findIndex(objeto => objeto.productId == id)
    let busqueda = carritoItems[index]
    await User.updateOne({_id:req.user.id},{$pull:{"cart.items": {productId: busqueda.productId}}}).then((resolve,reject)=>{
        if(resolve){
            console.log("Resuelto:", resolve)
        }else{
            console.log("Error: ", reject)
        }})
    res.end()
}

module.exports.eliminarTodo=async(req,res)=>{
    await User.updateOne({_id:req.user.id}, {$pull:{"cart.items":{}}}).then((resolve,reject)=>{
        if(resolve){
            res.end()
        }else{
            console.log("Error:", reject)
            res.end()
        }
    })
}

module.exports.confirmarCompra=async(req,res)=>{
    try{
      const {precio, total,id,cantidad, precioporcantproducto, preciocondesc}=req.body
      const result= await req.user.confirmarCompra(precio,total,id,cantidad,precioporcantproducto,preciocondesc)
      if(result){
        arrayCarrito=[]
        res.redirect("miscompras")
      }else{
        res.redirect("home")
      }
    }
    catch(err){
      console.log(err)
    }
}

module.exports.editarMiPerfil = async (req,res)=>{
    try{
        const {name,user,phone} = req.body
        const usuario = req.user.id
        if(name == "" || user == "" || phone == ""){
            incomplete = true
            res.redirect("miperfil")
        }else{
            incomplete = false
            await User.findByIdAndUpdate({_id:usuario},{name:name,user:user,phone:phone})
            res.redirect("miperfil")
        }
    }
    catch(err){ console.log (err) }
}