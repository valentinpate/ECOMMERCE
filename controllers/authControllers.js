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
    const paramid = req.query.id //capturo el id
    const paramcolec = req.query.coleccion //capturo la coleccion

    const productrender= await Productos.find({_id:paramid}) // para renderizar el producto en el que se hizo click
    const productsimilares= await Productos.find({coleccion:paramcolec})// para renderizar los prodcutos similares

    let a = req.query.a
    let llave = req.query.llave
    let page = 2
   
     if(a == null){
        llave=false
        a= 5
    }else if(llave){   
        page = req.query.page
        a=a+4
        page++}
        console.log(a)
    console.log(llave)
     await res.render("product",{productrender,productsimilares,page,a})
 }

//agrego la funcion para la page home
 module.exports.home_get=async(req,res)=>{
    // creo costante para exportar porductos de ofertas en home
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;
  
     res.render("home",{homeofertas,i,j})
  }