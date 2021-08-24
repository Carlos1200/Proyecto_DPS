const express = require("express");
const { check } = require("express-validator");
const {
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductos,
  obtenerProducto,
  obtenerProductoYear,
  obtenerProductosNombre,
  obtenerProductosMarca
} = require("../controllers/productoControllers");
const router = express.Router();

const { validarCampos, validarJWT } = require("../middlewares");

module.exports = () => {
  router.post(
    "/",
    [
      validarJWT,
      check("nombre", "El nombre es obligatorio").notEmpty(),
      check("year", "El año es obligatorio").notEmpty(),
      check("year", "El año debe de ser válido").isInt(),
      check("marca", "La marca es obligatoria").notEmpty(),
      check("precio", "El precio es obligatorio").notEmpty(),
      check("precio", "El precio debe de tener formato correcto").isDecimal(),
      validarCampos,
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
      check("marca", "La marca es obligatoria").notEmpty(),
      check("precio", "El precio es obligatorio").notEmpty(),
      check("precio", "El precio debe de tener formato correcto").isDecimal(),
      validarCampos,
    ],
    actualizarProducto
  );

  router.delete("/:id", [validarJWT], eliminarProducto);

  router.get('/',obtenerProductos);

  router.get('/:id',obtenerProducto);

  router.get('/year/:year',obtenerProductoYear);

  router.get('/nombre/:nombre',obtenerProductosNombre);

  router.get('/marca/:marca',obtenerProductosMarca);


  return router;
};
