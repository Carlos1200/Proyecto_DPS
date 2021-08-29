const Producto=require('../models/Producto');
const Pedido=require('../models/Pedidos');

nuevoPedido=async(req,res,next)=>{
    const {creador,productos,total}=req.body;
    try {
    
    //Verificar si el creador es el logueado
    if(req.usuario.id.toString()!==creador.toString()){
        res.status(401).json({msg:"No posse permisos para esta acción"})
    }

    //TODO: Verificar si cada Producto existe

    //Separar los idProductos de el arreglo productos
    const idProductos=productos.reduce((sum,product)=>[...sum,product.producto],[]);

    //Asegurarnos que el id Exista
    const productosDB=await Producto.find( { _id : { $in :idProductos } });

    

    const productosArray=productosDB.map((p,i)=>{

        if(p.existencia<productos[i].cantidad){
            res.status(400).json({msg:`La cantidad de ${p.nombre} no puede ser mayor a su existencia - ${p.existencia} < ${productos[i].cantidad}`});
        }
        
        p.cantidad=productos[i].cantidad;

        return p;
    });


    //verificando si el total es correcto
    const subTotal=productosArray.reduce((sum,product)=>sum+product.precio*product.cantidad,0);

    if((parseFloat(subTotal).toFixed(2))!==parseFloat(total).toFixed(2)){
        res.status(400).json({msg:"El total es incorrecto"});
    }


    //Preparando datos para guardarlos en la base de datos
    let prod=[];
    
    

    productosArray.forEach((p,i)=>{
        prod.push({
            idProducto:productosArray[i]._id,
            cantidad:p.cantidad,
            total:Number(p.cantidad)*Number(p.precio),
            comprador:creador
        })
    });

    //Insertar pedido
    const pedidos=await Pedido.insertMany(prod);



    res.json({pedidos});
    } catch (error) {
        console.log(error);
        res.json({msg:"No se pudo crear los nuevos Pedidos"});
        next();
    }


}

editarEstado=async(req,res,next)=>{
    const {estado}=req.body;
    const {id}=req.params;
    if(estado.toString()!=="Pendiente"&&estado.toString()!=="Completado"){
        res.status(400).json({msg:`${estado} no esta dentro de los estados permitidos`});
    }
    try {
        //Validar que el pedido exista
        const pedidoExiste=await Pedido.findById(id.toString());

        if(!pedidoExiste){
            res.status(400).json({msg:'El pedido no existe'});
        }
        const pedido=await Pedido.findOneAndUpdate({_id:id.toString()},{$set:{estado}},{
            new:true
        });

        res.json({pedido});
    } catch (error) {
        console.log(error);
        res.json({msg:"No se pudo cambiar estado, revisa tus datos"});
        next();
    }
}

eliminarPedido=async(req,res,next)=>{
    const {id}=req.params;

    try {
        //Comprobar que exista pedido
        const pedidoExiste=await Pedido.findById(id.toString());
        if(!pedidoExiste){
            res.status(400).json({msg:'El pedido no existe'});
        }

       //Verificar que el pedido esta completo
       if(pedidoExiste.estado!=='Completado'){
        res.status(400).json({msg:'Solo se pueden eliminar pedidos completos'});
       }
       
       await Pedido.findOneAndDelete({_id:id.toString()});

       res.json({msg:"El Pedido se elimino correctamente"});

    } catch (error) {
        console.log(error);
        res.json({msg:"No se pudo eliminar el pedido"});
        next();
    }
}


obtenerPedidos=async(req,res,next)=>{
    try {

        const pedidos=await Pedido.aggregate([
            {
                $lookup:{
                    from:'productos',
                    localField:"idProducto",
                    foreignField:"_id",
                    as: "producto"
                }
            },
            {
                $project:{idProducto:0}
            }
        ]);

        res.json({pedidos});
    } catch (error) {
        console.log(error);
        res.json({msg:"No se pudo obtener los pedidos"});
        next();
    }
}

module.exports={
    nuevoPedido,
    editarEstado,
    eliminarPedido,
    obtenerPedidos
}
