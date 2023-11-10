// Importo el express y lo guardo en la constante router
const {Router}=require("express")
const router=Router()

// Importo el archo authControllers con la logica de las rutas
const authControllers=require("../controllers/authControllers")
const passport = require("passport")

// Seteo las rutas/direcciones

// Signin, Signup, Login, Logout
router.post("/signup",authControllers.signup_post)
router.get("/signup",authControllers.signup_get)

router.post("/signin",passport.authenticate("local",{
    failureRedirect: "/signin", // Redirige en caso de fallo de autenticación
    failureMessage: 'Credenciales incorrectas, inténtelo de nuevo'
}),authControllers.login_post)

router.get("/signin",authControllers.login_get)

router.get("/signout",authControllers.signOut)

// GET

//ruta para la page ofertas
router.get("/secciones",authControllers.middleware.arrayCartPromise, authControllers.secciones_get)

//ruta para la page product
router.get("/product", authControllers.middleware.arrayCartPromise, authControllers.product_get)

//ruta para la page home 
router.get("/home", authControllers.middleware.arrayCartPromise, authControllers.home_get)

//ruta para la page home 
router.get("/contacto",authControllers.middleware.arrayCartPromise,authControllers.contacto_get)
 
//ruta para mis compras
router.get("/miscompras",[authControllers.middleware.middle, authControllers.middleware.arrayCartPromise], authControllers.miscompras_get)
 
//ruta para la page mi perfil (falta agregar la funcion a authcontrollers)
router.get("/miperfil",[authControllers.middleware.middle, authControllers.middleware.arrayCartPromise], authControllers.miperfil_get)

//ruta para la page mi perfil (falta agregar la funcion a authcontrollers)
router.get("/informacion",authControllers.middleware.arrayCartPromise, authControllers.informacion_get)

// POST

// Carrito
router.post("/carrito",authControllers.agregarAlCarrito)

router.post("/confirmar-compra",authControllers.confirmarCompra)

router.post("/editar-mi-perfil",authControllers.editarMiPerfil)

// DELETE

router.delete("/eliminar-producto/:id",authControllers.eliminarDelCarrito)

router.delete("/eliminar-todo",authControllers.eliminarTodo)

router.delete("/eliminar-compra/:id", authControllers.eliminarCompra)

// Exporto las rutas
module.exports=router