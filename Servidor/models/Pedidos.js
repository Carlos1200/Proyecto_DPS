const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const PedidoSchema=new Schema({
    idProducto:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Producto'
    },
    cantidad:{
        type:Number,
        required:true,
        trim:true
    },
    total:{ 
        type:Number,
        required:true,
        trim:true
    },
    comprador:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Usuario'
    },
    estado:{
        type:String,
        default:'Pendiente'
    },
    creado: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.models.Pedido||mongoose.model("Pedido", PedidoSchema);