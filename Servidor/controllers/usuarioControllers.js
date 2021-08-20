const Usuario=require('../models/Usuario');
const bcryptjs = require('bcryptjs');


nuevoUsuario=async(req,res,next)=>{

    const {nombre,apellido,correo,password}=req.body;
    
    try {
        const usuario=new Usuario({nombre,apellido,correo,password});
        
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        console.log(usuario,token);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.json(error);
        next();
    }
}

module.exports={
    nuevoUsuario
}