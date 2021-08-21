const express=require('express');
const {check}=require('express-validator');
const router=express.Router();
const {nuevoUsuario,logIn,actualizarUsuario}=require('../controllers/usuarioControllers');

const {validarCampos} = require('../middlewares');


module.exports=()=>{

    router.post('/usuarios',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('password',"La contraseña debe contener por lo menos 6 caracteres").isLength({min:6}),
        validarCampos
    ],nuevoUsuario
    );

    router.post('/login',[
        check('correo','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],logIn);

    router.put('/usuarios/:id',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('password',"La contraseña debe contener por lo menos 6 caracteres").isLength({min:6}),
        validarCampos
    ],actualizarUsuario)


    return router;
}