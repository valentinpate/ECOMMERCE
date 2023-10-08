const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

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
    }
})

productosSchema.plugin(mongoosePaginate)

const Productos = mongoose.model("producto",productosSchema)

module.exports= Productos