// Importo el express y lo guardo en la constante router
const {Router}=require("express")
const router=Router()
const passport = require('passport');

// Importo el archo authControllers con la logica de las rutas
const authControllers=require("../controllers/authControllers")


//middleware
const middle = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("signin")
    }
}

// Seteo las rutas/direcciones
router.post("/signup",authControllers.signup_post)
router.get("/signup",authControllers.signup_get)

router.post("/signin",passport.authenticate("local",{
    failureRedirect: "/signin", // Redirige en caso de fallo de autenticación
    failureMessage: 'Credenciales incorrectas, inténtelo de nuevo'

}),authControllers.login_post)
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
router.post("/carrito",  (req,res,next)=>{
    if(req.isAuthenticated()){
        next();}
        else{res.redirect("home")}

},authControllers.agregarAlCarrito)
 
//ruta para el carrito
router.get("/miscompras",middle,authControllers.miscompras_get)

//ruta para el carrito
router.get("/signout",authControllers.signout_get)

//ruta para la page mi perfil 
router.get("/miperfil",middle,authControllers.miperfil_get)

//ruta para la page mi perfil
router.get("/informacion",authControllers.info_get)


// Exporto las rutas
module.exports=router