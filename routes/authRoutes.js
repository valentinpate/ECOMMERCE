// Importo el express y lo guardo en la constante router
const {Router}=require("express")
const router=Router()

// Importo el archvio authControllers con la logica de las rutas
const authControllers=require("../controllers/authControllers")

// Seteo las rutas/direcciones
router.post("/signup",authControllers.signup_post)
router.get("/signup",authControllers.signup_get)

router.post("/signin",authControllers.login_post)
router.get("/signin",authControllers.login_get)

//ruta para la page ofertas
router.get("/ofertas",authControllers.ofertas_get)

//ruta para la page mi perfil (falta agregar la funcion a authcontrollers)
router.get("/miperfil",(req,res)=>{
    res.render("miperfil")
  })


// Exporto las rutas
module.exports=router