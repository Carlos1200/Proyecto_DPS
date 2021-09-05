const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "variables.env" });



const generarJWT = ( usuario ) => {

    const { id, correo, nombre, apellido } = usuario;
    

    return jwt.sign(
        {
          id,
          correo,
          nombre,
          apellido,
        },
        process.env.SECRETORPRIVATEKEY,
        {
          expiresIn:'7d',
        }
      );
}




module.exports = {
    generarJWT
}

