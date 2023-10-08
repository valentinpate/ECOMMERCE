// Importo el express y lo guardo en la constante router
const {Router}=require("express")
const router=Router()

// Importo el archvio authControllers con la logica de las rutas
const authControllers=require("../controllers/authControllers")

// Seteo las rutas/direcciones
router.post("/signup",authControllers.signup_post)
router.get("/signup",authControllers.signup_get)


// router.post("/signin",authControllers.login_post)
// router.get("/signin",authControllers.login_get)


router.post("/",authControllers.login_post)

//ruta para la page ofertas
router.get("/ofertas",authControllers.ofertas_get)

//ruta para la page product
router.get("/product",authControllers.product_get)

//ruta para la page home 
router.get("/home",authControllers.home_get)

//ruta para la page mi perfil (falta agregar la funcion a authcontrollers)
router.get("/miperfil",(req,res)=>{
  res.render("miperfil")
})

router.get("/informacion",(req,res)=>{
  res.render("informacion")
})

//rutas contacto y carrito
// router.get("/contacto",(req,res)=>{
//   res.render("contacto")    
// })
// router.get("/carrito",(req,res)=>{
//   res.render("carrito")
// })

// Exporto las rutas
module.exports=router

