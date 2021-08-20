const express=require('express');
const {check}=require('express-validator');
const router=express.Router();
const {nuevoUsuario}=require('../controllers/usuarioControllers');

const {validarCampos} = require('../middlewares');


module.exports=()=>{

    router.post('/usuarios',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],nuevoUsuario
    )


    return router;
}