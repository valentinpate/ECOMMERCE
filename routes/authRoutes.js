// Importo el express y lo guardo en la constante router
const {Router}=require("express")
const router=Router()

// Importo el archo authControllers con la logica de las rutas
const authControllers=require("../controllers/authControllers")
const passport = require('passport');

// Seteo las rutas/direcciones
router.post("/signup",authControllers.signup_post)
router.get("/signup",authControllers.signup_get)

router.post("/signin",passport.authenticate("local",{
    failureRedirect: "/signin", // Redirige en caso de fallo de autenticación
    failureMessage: 'Credenciales incorrectas, inténtelo de nuevo'
}),authControllers.login_post)

router.get("/signin",authControllers.login_get)

router.get("/signout",authControllers.signOut_get)

//ruta para la page ofertas
router.get("/ofertas",[authControllers.middleware.arrayCartPromise],authControllers.ofertas_get)

//ruta para la page product
router.get("/product",authControllers.product_get)

//ruta para la page home 
router.get("/home",[authControllers.middleware.arrayCartPromise],authControllers.home_get)

//ruta para la page home 
router.get("/contacto",[authControllers.middleware.arrayCartPromise],authControllers.contacto_get)

// Carrito
router.post("/carrito",authControllers.agregarAlCarrito)
 
//ruta para mis compras
router.get("/miscompras",[authControllers.middleware.middle, authControllers.middleware.arrayCartPromise], authControllers.miscompras_get)
 
//ruta para la page mi perfil (falta agregar la funcion a authcontrollers)
router.get("/miperfil",[authControllers.middleware.middle, authControllers.middleware.arrayCartPromise], authControllers.miperfil_get)

router.post("/editar-mi-perfil",authControllers.editarMiPerfil)

//ruta para la page mi perfil (falta agregar la funcion a authcontrollers)
router.get("/informacion",[authControllers.middleware.arrayCartPromise],authControllers.informacion_get)

// Exporto las rutas
module.exports=router