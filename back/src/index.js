//requerimos los modulos propios de Express y los creados
const express= require('express')
const app =express()
const dbConnection=require('./config/db');
require('dotenv').config();
const PORT = process.env.PORT;

//Nos conectamos con la base de datos
dbConnection()

//Middleware que usaremos para todas las rutas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Indicamos que la ruta / sera la primera ruta que nos llevara y a partir de ahi todas las demas
app.use ('/',)

//levantamos el puerto
app.listen(PORT,()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`)
})