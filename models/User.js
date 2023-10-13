// Importo los paquetes
const mongoose=require("mongoose")
const {isEmail}=require("validator")
const bcrypt=require("bcrypt")
// const agregarAlCarrito= require("../controllers/authControllers")

// Creo el esquema con los datos
const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Por favor ingrese un email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Por favor ingrese un email valido"]
    },
    name:{
        type:String,
        required:[true,"Por favor ingrese un nombre"],
        unique:false
    },
    user:{
        type:String,
        required:[true,"Por favor ingrese un nombre de usuario"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Por favor ingrese una contraseña"],
        minlength:[6,"Por favor ingrese un minimo de 6 caracteres"],
        unique:false
    },
    phone:{
        type:Number,
        required:false,
        unique:false,
    },
    region:{
        type:String,
        required:false,
        unique:false,
    },
    cart:{
        items:[{
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"Productos",
                required:true,
            },
            cantidad:{
                type:Number,
                required:true,
            },
        }],
        precioTotal:Number,
    }
})


// Mensaje de usuario
UserSchema.pre("save", async function(next){
    // encriptar contraseñas
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
   // console.log("el nuevo usuario esta siendo creado y se pasara a guardar",this)
   console.log("paso por save")
    next()
})

UserSchema.post("save",function(doc,next){
    //console.log("el nuevo usuario fue creado y guardado",doc)
    next()
})

UserSchema.methods.agregarAlCarrito = function(producto){
    let carrito = this.cart

    if(carrito.items.length == 0){
        carrito.items.push({productId:producto._id,cantidad:1})
        carrito.precioTotal = producto.precio
    }else{
        const existe = carrito.items.findIndex(objeto => objeto.productId == producto._id)

        if(existe == -1){
            carrito.items.push({productId:producto._id,cantidad:1})
            carrito.precioTotal += producto.precio
        }else{
            let productoQueExiste = carrito.items[existe]
            productoQueExiste.cantidad+1
            carrito.precioTotal += producto.precio
        }
    }
    console.log("Usuario en esquema: ", this)
    return this.save()
}

// Introduzco el esquema dentro una tabla en mongo
const User=mongoose.model("UsuariosEcommerce",UserSchema)

// Exporto la constante user
module.exports=User