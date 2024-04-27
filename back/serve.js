//requerimos los modulos propios de Express y los creados
const express= require('express');
const session = require('express-session')
const app =express();
const dbConnection=require('./src/config/db');
const PORT = process.env.PORT || 5003;
const cors=require ('cors')
const routerProduct= require ('./src/routes/productRoutes');
const routerUser= require ('./src/routes/usersRoutes')
const routerOrder =require ('./src/routes/orderRoutes')

//const hashedSecret = require('./src/config/config')
//const MongoStore = require('connect-mongo');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Nos conectamos con la base de datos
dbConnection();

/*app.use(session({
  secret: hashedSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
  })
);


app.use(cors())
//Middleware que usaremos para todas las rutas

app.use('/productos',routerProduct); 
app.use('/user',routerUser);
app.use('/pedidos',routerOrder)

//levantamos el puerto


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
