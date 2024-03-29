//requerimos los modulos propios de Express y los creados
const express= require('express');
const app =express();
const dbConnection=require('./src/config/db');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const routes=require ('./src/Routes/routes')

//Nos conectamos con la base de datos
dbConnection();
// Llamar a la función para obtener las pokeballs

//Middleware que usaremos para todas las rutas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',routes)
//Indicamos que la ruta / sera la primera ruta que nos llevara y a partir de ahi todas las demas


//levantamos el puerto

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
