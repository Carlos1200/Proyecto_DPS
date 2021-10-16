const express = require("express");
const { check,param } = require("express-validator");

const router = express.Router();

const {subirImagen}=require('../controllers/uploadControllers');

const { validarCampos, validarJWT,validarArchivoSubir } = require("../middlewares");

module.exports = () => {

    router.post('/',[
        validarJWT,
        validarArchivoSubir
    ],subirImagen);
    router.put('/usuario/:id',[
        validarJWT,
        param('id',"El id no es válido").isMongoId(),
        validarCampos,
        validarArchivoSubir
    ],actualizarImagenUsuario);

    return router;
} 