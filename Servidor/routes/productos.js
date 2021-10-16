const express = require("express");
const { check,param } = require("express-validator");
const {
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductos,
  obtenerProducto,
  obtenerProductoYear,
  obtenerProductosNombre,
} = require("../controllers/productoControllers");
const router = express.Router();

const { validarCampos, validarJWT,validarArchivoSubir } = require("../middlewares");

module.exports = () => {
  router.post(
    "/",
    [
      validarJWT,
      check("nombre", "El nombre es obligatorio").notEmpty(),
      check("year", "El año es obligatorio").notEmpty(),
      check("foto", "La foto referente al producto es obligatoria").notEmpty(),
      check("year", "El año debe de ser válido").isInt(),
      check("precio", "El precio es obligatorio").notEmpty(),
      check("precio", "El precio debe de tener formato correcto").isDecimal(),
      check('existencia',"La existencia es obligatoria").notEmpty(),
      check('existencia',"La existencia debe de ser válido").isInt(),
      validarCampos,
      // validarArchivoSubir,
    ],
    nuevoProducto
  );

  router.put(
    "/:id",
    [
      validarJWT,
      check("nombre", "El nombre es obligatorio").notEmpty(),
      check("year", "El año es obligatorio").notEmpty(),
      check("year", "El año debe de ser válido").isInt(),
      check("precio", "El precio es obligatorio").notEmpty(),
      check("precio", "El precio debe de tener formato correcto").isDecimal(),
      check('existencia',"La existencia es obligatoria").notEmpty(),
      check('existencia',"La existencia debe de ser válido").isInt(),
      param('id',"El id no es válido").isMongoId(),
      validarCampos,
    ],
    actualizarProducto
  );

  router.delete("/:id", [
    validarJWT,
    param('id',"El id no es válido").isMongoId(),
    validarCampos
  ], eliminarProducto);

  router.get('/',obtenerProductos);

  router.get('/:id',[
    validarJWT,
    param('id',"El id no es válido").isMongoId(),
    validarCampos
  ],obtenerProducto);

  router.get('/year/:year',obtenerProductoYear);

  router.get('/nombre/:nombre',obtenerProductosNombre);


  return router;
};
