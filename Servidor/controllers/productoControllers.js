const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

nuevoProducto=async(req,res,next)=>{
    const {creador}=req.body;

    try {
        //Verificar que el creador exista
        const existeUsuario=await Usuario.findById(creador);
        if(!existeUsuario){
            return res.status(401).json({
                msg: 'No posee los permisos'
            });
        }

        const producto = new Producto(req.body);

        await producto.save();

        res.json({producto});
    } catch (error) {
        res.json({msg:"No se pudo crear nuevo producto"});
        next();
    }
}

actualizarProducto=async(req,res,next)=>{

    const {id}=req.usuario;

    try {

        //Verificar si el producto existe
        const existeProducto=await Producto.findById(req.params.id);
        if(!existeProducto){
            return res.status(400).json({
                msg:'Producto no existe'
            })
        };

        //Verificar si el usuario que edita es el que creó el producto
        if(id.toString()!==existeProducto.creador.toString()){
            return res.status(401).json({
                msg:'No posee permisos'
            })
        };

        //Actualizar producto
        const producto=await Producto.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true
        });

        res.json({producto});

    } catch (error) {
        res.json({msg:"No se pudo actualizar"});
        next();
    }
}

eliminarProducto=async(req,res,next)=>{
    const {id}=req.usuario;

    try {

        //Verificar si el producto existe
        const existeProducto=await Producto.findById(req.params.id);
        if(!existeProducto){
            return res.status(400).json({
                msg:'Producto no existe'
            })
        };

        //Verificar si el usuario que edita es el que creó el producto
        if(id.toString()!==existeProducto.creador.toString()){
            return res.status(401).json({
                msg:'No posee permisos'
            })
        };

        //Eliminar Producto
        await Producto.findOneAndDelete({
            _id:req.params.id
        });
        res.json({msg:"Producto eliminado"});

    } catch (error) {
        res.json({msg:"No se pudo Eliminar"});
        next();
    }


}

obtenerProductos=async(req,res,next)=>{
    try {
        const productos=await Producto.find({});
        res.json({productos});
    } catch (error) {
        res.json({msg:"No se pudo obtener los productos"});
        next();
    }
}

obtenerProducto=async(req,res,next)=>{
    const {id}=req.params;

    try {
        //Verificar que el producto exista
        const productoExiste=await Producto.findById(id);
        if(!productoExiste){
            return res.status(400).json({
                msg:'El producto no Existe'
            })
        };

        res.json({producto:productoExiste});
    } catch (error) {
        res.json({msg:"No se pudo obtener el producto"});
        next();
    }
}

obtenerProductoYear=async(req,res,next)=>{
    const {year}=req.params;
    const regex='/'+year+'/';
    try {
    const productos=await Producto.find({year:{$regex:year}});
        res.json({productos});
    } catch (error) {
        console.log(error);
        res.json({msg:"No se pudo obtener los productos"});
        next();
    }
}

obtenerProductosNombre=async(req,res,next)=>{
    const {nombre}=req.params;
    try {
        const productos=await Producto.find({nombre:{$regex:nombre,$options:'i'}});
        res.json({productos});
    } catch (error) {
        
    }
}

obtenerProductosMarca=async(req,res,next)=>{
    const {marca}=req.params;
    try {
        const productos=await Producto.find({marca:{$regex:marca,$options:'i'}});
        res.json({productos});
    } catch (error) {
        
    }
}

module.exports={
    nuevoProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductos,
    obtenerProducto,
    obtenerProductoYear,
    obtenerProductosNombre,
    obtenerProductosMarca
}