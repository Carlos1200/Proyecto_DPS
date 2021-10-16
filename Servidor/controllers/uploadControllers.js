const Usuario = require("../models/Usuario");
require("dotenv").config({ path: "variables.env" });

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

subirImagen = async (req, res, next) => {
  try {
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    const url = secure_url;

    res.json({ url });
  } catch (error) {
    res.json({ msg: "No se pudo subir la imagen del producto" });
    next();
  }
};

actualizarImagenUsuario = async (req, res, next) => {
  try {
    const existeUsuario = await Usuario.findById(req.params.id);

    //Verificar si el usuario existe
    if (!existeUsuario) {
      return res.status(400).json({
        msg: "El usuario no existe",
      });
    }

    if (existeUsuario.foto) {
      //Limpiar Imagen previa
      const nombreArr = existeUsuario.foto.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    //subir nueva imagen
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    existeUsuario.foto = secure_url;

    const { foto } = await Usuario.findOneAndUpdate(
      { _id: existeUsuario._id },
      existeUsuario,
      {
        new: true,
      }
    );

    res.json({ foto });
  } catch (error) {
    res.json({ msg: "No se pudo subir la imagen del usuario" });
    next();
  }
};

module.exports = {
  subirImagen,
  actualizarImagenUsuario
};
