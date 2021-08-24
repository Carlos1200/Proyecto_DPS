const express=require('express');
const conectarDB=require('./db/db');
const auth=require('./routes/auth');
const productos=require('./routes/productos');
const cors = require('cors');

//crear servidor
const app=express();


//Conectar base de datos
conectarDB();

// app.use( cors(corsOptions) );
app.use(cors());

// habilitar el body-parser
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//Habilitar routes
app.use('/api/auth/',auth());
app.use('/api/producto/',productos());
 

// puerto y arrancar el servidor
app.listen( 4000,() => {
    console.log('Servidor funcionando')
})