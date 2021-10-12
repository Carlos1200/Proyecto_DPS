const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

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
  foto: {
    type: String,
    trim: true,
    default: undefined
  },
  existencia:{
    type:Number,
    trim:true,
    trim:true
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