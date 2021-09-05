

const generarJWT   = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');
const coleccionesPermitidas=require('./validar-colecciones');


module.exports = {
    ...generarJWT,
    ...subirArchivo,
    ...coleccionesPermitidas,
}