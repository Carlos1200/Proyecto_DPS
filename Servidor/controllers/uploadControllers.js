const Usuario = require("../models/Usuario");
const Producto=require("../models/Producto");
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

actualizarImagenProducto=async(req,res,next)=>{
  try {
    const existeProducto = await Producto.findById(req.params.id);
    console.log(existeProducto);
    //Verificar si el usuario existe
    if (!existeProducto) {
      return res.status(400).json({
        msg: "El producto no existe",
      });
    }

    if (existeProducto.foto) {
      //Limpiar Imagen previa
      const nombreArr = existeProducto.foto.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      await cloudinary.uploader.destroy(public_id);
    }

    //subir nueva imagen
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    existeProducto.foto = secure_url;

    const { foto } = await Producto.findOneAndUpdate(
      { _id: existeProducto._id },
      existeProducto,
      {
        new: true,
      }
    );

    res.json({ foto });
  } catch (error) {
    res.json({ msg: "No se pudo subir la imagen del producto" });
    next();
  }


}

module.exports = {
  subirImagen,
  actualizarImagenUsuario,
  actualizarImagenProducto
};
