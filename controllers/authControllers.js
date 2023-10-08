const Productos=require("../models/Productos")
// se exporta la logica de las rutas a authRoutes

module.exports.signup_post=(req,res)=>{

}

module.exports.signup_get=(req,res)=>{
    res.render("signup")// agregue el renderizado de la page
    
}


module.exports.login_post=(req,res)=>{
    res.render("signin")
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
   //let i y let j para slide automático
     res.render("home",{homeofertas,i,j})
  } 