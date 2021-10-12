

const generarJWT   = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');
const coleccionesPermitidas=require('./validar-colecciones');
const googleVerify=require('./google-verify');



module.exports = {
    ...generarJWT,
    ...subirArchivo,
    ...coleccionesPermitidas,
    ...googleVerify
}