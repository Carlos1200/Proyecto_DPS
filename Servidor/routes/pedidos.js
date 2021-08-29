const express = require("express");
const { check,param } = require("express-validator");

const router = express.Router();

const {nuevoPedido,editarEstado,obtenerPedidos,eliminarPedido}=require('../controllers/pedidosControllers');

const { validarCampos, validarJWT } = require("../middlewares");


module.exports = () => {

    router.post('/',[
        validarJWT,
        check('productos',"Los productos son obligatorios").isArray({min:1}),
        check('total',"El total es obligatorio").notEmpty(),
        check('total',"El total debe ser mayor a 0").isDecimal(),
        check('creador',"El ID no es valido").isMongoId(),
        validarCampos
    ],nuevoPedido);

    router.put('/:id',[
        validarJWT,
        param('id',"El id no es válido").isMongoId(),
        validarCampos
    ],editarEstado);

    router.delete('/:id',[
        validarJWT,
        param('id',"El id no es válido").isMongoId(),
        validarCampos
    ],eliminarPedido)

    router.get('/',validarJWT,obtenerPedidos);

    return router;
}