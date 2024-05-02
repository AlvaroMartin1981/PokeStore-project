//requerimos los modulos propios de Express y los creados
const express= require('express');
const session = require('express-session')
const app =express();
const dbConnection=require('./src/config/db');
const PORT = process.env.PORT || 8080;
const cors=require ('cors')
const routerProduct= require ('./src/routes/productRoutes');
const routerUser= require ('./src/routes/usersRoutes')
const routerOrder =require ('./src/routes/orderRoutes')
const hashedSecret = require('./src/config/config')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbConnection();

app.use(session({
  secret: hashedSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
  })
);

app.use(cors());

app.use('/productos',routerProduct); 
app.use('/user',routerUser);
app.use('/pedidos',routerOrder);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})