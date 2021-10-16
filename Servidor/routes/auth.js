const express=require('express');
const {check,param}=require('express-validator');
const router=express.Router();
const {nuevoUsuario,logIn,actualizarUsuario,obtenerUsuario,loginGoogle}=require('../controllers/usuarioControllers');


const {validarCampos,validarJWT} = require('../middlewares');


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

    router.post('/loginGoogle',[
        check('idToken',"El token es obligatorio").notEmpty(),
        validarCampos
    ],loginGoogle)

    router.put('/usuarios/:id',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('correo','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('password',"La contraseña debe contener por lo menos 6 caracteres").isLength({min:6}),
        param('id',"El id no es válido").isMongoId(),
        validarCampos
    ],actualizarUsuario);

    router.get('/',[
        validarJWT
    ],obtenerUsuario)


    return router;
}