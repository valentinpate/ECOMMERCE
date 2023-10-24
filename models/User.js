// Importo los paquetes
const mongoose=require("mongoose")
const {isEmail}=require("validator")
const bcrypt=require("bcrypt")

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
    if (this.skipPreSave) {
        return next(); // No ejecutar el middleware
    }
    // encriptar contraseñas
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
    console.log("el nuevo usuario esta siendo creado y se pasara a guardar",this)
    next()
})

UserSchema.post("save",function(doc,next){
    console.log("el nuevo usuario fue creado y guardado",doc)
    next()
})

UserSchema.methods.agregarAlCarrito = function(producto){
    this.skipPreSave = true;
    let carrito = this.cart
    const regex = /\$([0-9,]+)/g //caracter $ + ([todos los caracteres del 0 a 9 y comas]el + indica que debe haber más de un dígito o coma) + /g = lo busca de forma global. no se queda en el 1ro

    if(carrito.items.length == 0){
        carrito.items.push({productId:producto._id,cantidad:1})
        let numero = producto.precio.match(regex) //me trae el precio del producto que coincide con el regex
        console.log("Número:", numero)
        let precio = parseFloat(numero[0].replace(/$|,/g, '')) // / $ | , (selecciono todos los carácteres "$" y "," para reemplazarlos por un vacío -> , "")
        console.log("Precio:", precio)
        // carrito.precioTotal = precio
    }else{
        const existe = carrito.items.findIndex(objeto => objeto.productId == producto._id)

        if(existe == -1){
            carrito.items.push({productId:producto._id,cantidad:1})
            let numero = producto.precio.match(regex)
            let precio = parseFloat(numero[0].replace(/$|,/g, '')).toFixed(2)
            carrito.precioTotal += precio
        }else{
            let productoQueExiste = carrito.items[existe]
            productoQueExiste.cantidad+1
            let numero = producto.precio.match(regex)
            let precio = parseFloat(numero[0].replace(/$|,/g, '')).toFixed(2)
            carrito.precioTotal += precio
        }
    }
    console.log("Usuario en esquema: ", this)
    return this.save()
}

// Introduzco el esquema dentro una tabla en mongo
const User=mongoose.model("UsuariosEcommerce",UserSchema)

// Exporto la constante user
module.exports=User
