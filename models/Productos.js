const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    nombre:{
        type: String,
    },
    imagen:{
        type: String,
    },
    precio:{
        type: String,
    },
    coleccion:{
        type: String,
    },
    page:{
        type: Number,
    }
})

const Productos = mongoose.model("producto",productosSchema)

module.exports= Productos