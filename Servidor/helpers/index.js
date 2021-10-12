

const generarJWT   = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');
const coleccionesPermitidas=require('./validar-colecciones');
<<<<<<< HEAD
const googleVerify=require('./google-verify');
=======
>>>>>>> 8caf1963cb452acb00cae91716a371fe00b0e544


module.exports = {
    ...generarJWT,
    ...subirArchivo,
    ...coleccionesPermitidas,
<<<<<<< HEAD
    ...googleVerify
=======
>>>>>>> 8caf1963cb452acb00cae91716a371fe00b0e544
}