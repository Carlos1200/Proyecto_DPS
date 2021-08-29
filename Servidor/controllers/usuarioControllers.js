const Usuario=require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {generarJWT} =require('../helpers');
require("dotenv").config({ path: "variables.env" });

const cloudinary =require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


nuevoUsuario=async(req,res,next)=>{

    const {nombre,apellido,correo,password}=req.body;
    // console.log(req.body);
    try {

        const existeUsuario=await Usuario.findOne({correo});
        if(existeUsuario){
            return res.status(400).json({
                msg: 'El usuario ya existe'
            });
        }
        const usuario=new Usuario({nombre,apellido,correo,password});
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();

        // Generar el JWT
        const token = await generarJWT( usuario );


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.json({msg:"No se pudo crear nuevo usuario"});
        next();
    }
}

logIn=async(req,res,next)=>{
    const {correo,password}=req.body;

    try {

        //Verificamos si existe usuario

        const usuario=await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - correo'
            });
        }

        //Verificamos si el password es igual
        const passwordCorrecto=await bcryptjs.compare(password,usuario.password);

        if(!passwordCorrecto){
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario );


        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.json({msg:"No se pudo iniciar sesión"});
        next();
    }
}

actualizarUsuario=async(req,res,next)=>{
    const {correo,password}=req.body;


    try {

        const existeUsuario=await Usuario.findOne({correo});

        //Verificar si el usuario existe
        if(!existeUsuario){
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        } 

        //Verificar si el usuario que edita es el usuario que se edita
        if(req.usuario.id.toString()!==existeUsuario.id.toString()){
            return res.status(401).json({
                msg: 'No posee los permisos'
            });
        }

        //verificar si la contraseña se cambiò para hashearla
        const passwordCorrecto=await bcryptjs.compare(password,existeUsuario.password);
        if(passwordCorrecto){
            req.body.password=existeUsuario.password;
        }else{
            // Encriptar la contraseña nueva
            const salt = bcryptjs.genSaltSync(10);
            req.body.password = bcryptjs.hashSync( password, salt );
        }

        //Verificar si hay imagen que cambiar
        if(!req.files){
            req.body.foto=existeUsuario.foto;
        }else{

           if(existeUsuario.foto){
                //Limpiar Imagen previa
                const nombreArr = existeUsuario.foto.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                await cloudinary.uploader.destroy( public_id );
           }

            //subir nueva imagen
            const { tempFilePath } = req.files.archivo
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
            req.body.foto = secure_url;

        }
        

        const usuario=await Usuario.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true
        });

        res.json({usuario});
    } catch (error) {
        res.json({msg:"No se pudo actualizar"});
        next();
    }
}

obtenerUsuario=async(req,res,next)=>{
    res.json({usuario:req.usuario});
}

module.exports={
    nuevoUsuario,
    logIn,
    actualizarUsuario,
    obtenerUsuario
}