const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const ComentariosSchema = new Schema({
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    },
    comentario:{
        type:String,
        required:true,
        trim:true
    }
    
})

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  year:{
    type:String,
    require:true,
    trim:true
  },
  informacion:{
    type:String,
    trim:true,
    default:''
  },
  precio:{
    type:Number,
    required:true,
    trim:true
  },
  marca:{
    type:String,
    required:true,
    trim:true
  },
  comentarios:[ComentariosSchema],
  foto: {
    type: String,
    trim: true,
    default: undefined
  },
  creador:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Usuario'
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.Producto ||mongoose.model("Producto", ProductoSchema);