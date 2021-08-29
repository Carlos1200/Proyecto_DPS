const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  correo: { 
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  foto: {
    type: String,
    trim: true,
    default: undefined
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.Usuario||mongoose.model("Usuario", UsuarioSchema);