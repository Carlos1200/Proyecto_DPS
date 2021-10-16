require("dotenv").config({ path: "variables.env" });

const cloudinary =require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


subirImagen=async(req,res,next)=>{
    
    try {
        const { tempFilePath } = req.files.archivo
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        const url = secure_url;

        res.json({url})

    } catch (error) {
        res.json({msg:"No se pudo crear nuevo producto"});
        next();
    }
}

module.exports={
    subirImagen
}