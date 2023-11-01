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
    },
    misCompras:[{
        pedidos:[{
            _id: false,
            pedidoId:{
                type:mongoose.Types.ObjectId,
                required:true,
            },
            cantidad:{
                type:Number,
                required:true,
            },
            precioPorCantProducto:{
                type:Number,
                required:true,
            },
            precioConDesc:{
                type:Number,
                required:true,
            },
        }],
        fecha: Date,
        precio: Number,
        total: Number,
        estado: Boolean,
    }]
})


// Mensaje de usuario
UserSchema.pre("save", async function(next){

    if (this.skipPreSave) {
        return next(); // No ejecutar el middleware
      }
    // encriptar contraseñas
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.post("save",function(doc,next){
    next()
})

UserSchema.methods.agregarAlCarrito = function async (producto,cantidad){
    this.skipPreSave = true;
    let carrito = this.cart
    const regex = /\$([0-9,]+)/g //caracter $ + ([todos los caracteres del 0 a 9 y comas]el + indica que debe haber más de un dígito o coma) + /g = lo busca de forma global. no se queda en el 1ro

    if(carrito.items.length == 0){
        carrito.items.push({productId:producto._id,cantidad:cantidad})
        let numero = producto.precio.match(regex) //me trae el precio del producto que coincide con el regex
        let precio = parseFloat(numero[0].replace(/\$|,/g, '')).toFixed(2);
        precio= (precio/100).toFixed(2);
        precio = Number(precio); 
        carrito.precioTotal = precio
    } else{
            
        const existe = carrito.items.findIndex(objeto => {
            return new String (objeto.productId).trim()  == new String (producto._id).trim()
            })
        if(existe == -1){
            carrito.items.push({productId:producto._id,cantidad:cantidad})
            let numero=  producto.precio.match(regex);
            let precio = parseFloat(numero[0].replace(/\$|,/g, '')).toFixed(2);
            precio= (precio/100).toFixed(2);
            precio = Number(precio); 
            carrito.precioTotal += precio
        }else{
            let productoQueExiste = carrito.items[existe]
            productoQueExiste.cantidad++
            let numero=  producto.precio.match(regex);
            let precio = parseFloat(numero[0].replace(/\$|,/g, '')).toFixed(2);
            precio= (precio/100).toFixed(2);
            precio = Number(precio); 
            carrito.precioTotal += precio
        }
    }
    return this.save()
}
UserSchema.methods.confirmarCompra = function(precio, total, id, cantidad, precioporcantproducto, preciocondesc){
    this.skipPreSave = true
    let carrito = this.cart
    let compras = this.misCompras
    let pedidos = compras.pedidos
    if(pedidos == undefined){
        pedidos = []
    }
    function pedidosPusheados(){
        for(let i = 0; i < id.length; i++){
            if(precioporcantproducto[i] == ""){
                precioporcantproducto[i] = 0
            }
            if(preciocondesc[i] == ""){
                preciocondesc[i] = 0
            }
            pedidos.push({pedidoId:id[i],cantidad:cantidad[i],precioPorCantProducto:precioporcantproducto[i],precioConDesc:preciocondesc[i]})
        }
        return pedidos
    }
    compras.push({pedidos:pedidosPusheados(),fecha:new Date,precio:precio,total:total,estado:true})
    //carrito.items = []
    console.log("Mis compras: ", compras)
    console.log("Mis pedidos: ", pedidos)
    const guardado = this.save()
    const promesa = guardado instanceof Promise
    if(promesa){
        carrito.items = []
        carrito.precioTotal = 0
    }
    return guardado
}

// Introduzco el esquema dentro una tabla en mongo
const User=mongoose.model("UsuariosEcommerce",UserSchema)

// Exporto la constante user
module.exports=User