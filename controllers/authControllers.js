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
    const paramid = req.query.id //capturo el id
    const paramcolec = req.query.coleccion //capturo la coleccion

    const productrender= await Productos.find({_id:paramid}) // para renderizar el producto en el que se hizo click
    const productsimilares= await Productos.paginate({coleccion:paramcolec},{limit:12,page:2})// para renderizar los prodcutos similares

    await res.render("ofertas",{productrender,productsimilares})
    
 }

//agrego la funcion para la page home
 module.exports.home_get=async(req,res)=>{
    // creo costante para exportar porductos de ofertas en home
    const homeofertas= await Productos.find({coleccion:"ofertas"})
    let i = 2;
    let j = 5;
  
     res.render("home",{homeofertas,i,j})
  }