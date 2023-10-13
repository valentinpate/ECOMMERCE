// Importo el express y lo guardo en la constante router
const {Router}=require("express")
const router=Router()

// Importo el archo authControllers con la logica de las rutas
const authControllers=require("../controllers/authControllers")

// Seteo las rutas/direcciones
router.post("/signup",authControllers.signup_post)
router.get("/signup",authControllers.signup_get)

router.post("/signin",authControllers.login_post)
router.get("/signin",authControllers.login_get)


//ruta para la page ofertas
router.get("/ofertas",authControllers.ofertas_get)

//ruta para la page product
router.get("/product",authControllers.product_get)

//ruta para la page home 
router.get("/home",authControllers.home_get)

//ruta para la page home 
router.get("/contacto",authControllers.contacto_get)

//ruta para el carrito
router.post("/carrito",authControllers.agregarAlCarrito)
 
//ruta para el carrito
router.get("/miscompras",authControllers.miscompras_get)

//ruta para el carrito
router.get("/signout",authControllers.signout_get)

//ruta para la page mi perfil 
router.get("/miperfil",authControllers.miperfil_get)

//ruta para la page mi perfil
router.get("/informacion",authControllers.info_get)



// Exporto las rutas
module.exports=router