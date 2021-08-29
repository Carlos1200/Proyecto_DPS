

const validaCampos = require('../middlewares/validar-campos');
const validarJWT   = require('../middlewares/validar-jwt');
const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validarArchivoSubir
}