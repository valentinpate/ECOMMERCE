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
//rutas contacto y carrito
router.get("/contacto",(req,res)=>{
    res.render("contacto")    
})
router.get("/carrito",(req,res)=>{
    res.render("carrito")
})

//
// Exporto las rutas
module.exports=router