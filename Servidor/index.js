const express=require('express');
const conectarDB=require('./db/db');
const auth=require('./routes/auth');
const productos=require('./routes/productos');
const pedidos=require('./routes/pedidos');
const cors = require('cors');
const fileUpload = require('express-fileupload');
//:D
//crear servidor
const app=express();


//Conectar base de datos
conectarDB();

// app.use( cors(corsOptions) );
app.use(cors());

// habilitar el body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//Habilitar la subida de archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}))

//Habilitar routes
app.use('/api/auth/',auth());
app.use('/api/producto/',productos());
app.use('/api/pedidos/',pedidos());
 

// puerto y arrancar el servidor
app.listen( process.env.PORT||4000,() => {
    console.log('Servidor funcionando',process.env.PORT)
})