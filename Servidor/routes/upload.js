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

    return router;
} 