# Pokestore

Esta es la parte del backend de una aplicacion web en Node.js utilizando Express con mongoose para crear un E-commerce Pokemon, con un catalogo de productos, donde los usuarios pueden realizar compras de dichos productos. Todos los datos se guardarán en una base de datos de mongo en Atlas.
Toda esta estructura de archivos se renderizara desde el frontend con React, el cual nos permitira visualizar todas las posibilidades de busqueda y compra de productos Pokemon.


## Índice

- [Estructura de archivos](#estructura-de-archivos)
- [Características de los archivos](#características-de-los-archivos)
- [Funciones del Controlador de Pedidos](#funciones-del-controlador-de-pedidos)
- [Funciones del Controlador de Productos](#funciones-del-controlador-de-productos)
- [Funciones del Controlador de Usuarios](#funciones-del-controlador-de-usuarios)
- [Endpoints de la App](#endpoints-de-la-app)
- [Funcionamiento de la aplicación](#funcionamiento-de-la-aplicación)


## Estructura de archivos

El backend de la aplicacion 'Pokestore' posee la siguiente estructura de archivos:

```
.
├── src
│   ├── config
│   │   ├── db.js
│   │   └── firebase.js 
│   ├── controllers
│   │   ├── orderController.js 
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middlewares 
│   │   └── authentication.js
│   ├── models
│   │   ├── OrderModel.js 
│   │   ├── ProductModel.js 
│   │   └── UserModel.js
│   ├── routes
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js 
│   ├── test 
│   │   ├── orderController.test.js
│   │   ├── productController.test.js
│   │   └── userController.test.js 
│   └── utils 
│       ├── axiosItems.js
│       └── axiosPoke.js
├── .env
├── .gitignore   
├── package.json
└── serve.js

```


### Caracteristicas de los archivos


- `config/db.js`: Archivo que establece la conexion a la base de datos MongoDB utilizando Mongoose. Además, utiliza `dotenv` para usar las variables de entorno desde un archivo `.env`.
- `config/firebase.js`: Archivo que contiene la configuración de firebase. Inicia la conexión con firebase.
- `controllers/orderController.js`: Archivo que contiene un controlador de API para manejar las solicitudes de los pedidos de productos. Utiliza el modelo `OrderModel.js` para interactuar con la base de datos y devuelve las respuestas en formato json.
- `controllers/productController.js`: Archivo que contiene la lógica para manejar las solicitudes CRUD de los productos. Devuelve las respuestas en formato json.
- `controllers/userController.js`: Archivo que contiene un controlador que maneja el registro, inicio de sesión, cierre de sesión y actualizacion de informacion de usuarios utilizando Firebase Authentication. El controlador utiliza la instancia de autenticación de Firebase `auth` inicializada previamente.
- `middlewares/authentication.js`: Archivo que contiene el middleware para comprobar si el usuario está autenticado utilizando Firebase Authentication. El middleware comprueba si hay un usuario autenticado utilizando la función `onAuthStateChanged` proporcionada por Firebase.
- `models/OrderModel.js`: Archivo que contiene la definición del esquema del pedido de productos utilizando Mongoose.
- `models/ProductModel.js`: Archivo que contiene la definición del esquema del productos utilizando Mongoose.
- `models/UserModel.js`: Archivo que contiene la definición del esquema del usuario utilizando Mongoose.
- `routes/apiRoutes.js`: Archivo que contiene la definición de las rutas para la API. Este llama a los métodos del controlador apiController.js.
- `routes/orderRoutes.js`: Archivo que contiene la definición de las rutas de los pedidos de productos. Este llama a los metodos del controlador orderController.js solo si se ha iniciado sesión.
- `routes/productRoutes.js`: Archivo que contiene la definición de las rutas relacionadas con los productos de la Pokestore. Este llama a los métodos del controlador productController.js.
- `routes/userRoutes.js`: Archivo que contiene la definición de las rutas relacionadas con los usuarios de la Pokestore. Este llama a los métodos del controlador userController.js.
- `test/orderController.test.js`: Archivo en el que se encuentran las pruebas o test del funcionamiento de nuestra aplicación relacionadas con los pedidos de productos de nuestros clientes. Algunas de ellas usando 'Mock functions' o funciones simuladas.
- `test/productController.test.js`: Archivo en el que se encuentran las pruebas o test del funcionamiento de nuestra aplicación relacionadas con nuestros productos. Algunas de ellas usando 'Mock functions' o funciones simuladas.
- `test/userController.test.js`: Archivo en el que se encuentran las pruebas o test del funcionamiento de nuestra aplicación relacionadas con nuestros usuarios. Algunas de ellas usando 'Mock functions' o funciones simuladas.
- `utils/axiosPoke.js`: Archivo en el que se guardan las funciones para las peticiones de Pokemon a la pokeapi. Una vez usada y guardados los productos en la base de datos, se supone no se vualva a necesitar.
- `.env`: Archivo que contiene las variables de entorno. Contiene la uri de la base de datos de Atlas conjunta para los dos usuarios, el puerto de la aplicación y las credenciales del proyecto de firebase.
- `.gitignore`: Archivo que contiene el nombre de los archivos que ignoran a la hora de subirse a git pull. Entre los mas destacados, el archivo .env y node_modules. 
- `package.json`: Archivo que contendrá las dependencias del proyecto. Crearemos un script para iniciar el servidor con node y otro para iniciar el servidor con nodemon.("start": "node src/index.js", "dev": "nodemon src/index.js").
- `serve.js`: Archivo principal que inicia el servidor Express. El servidor también utiliza sesiones para la gestión de usuarios, se conecta a la base de datos MongoDB y define las rutas para la aplicación web y la API. 


## Funciones del controlador de pedidos

- `Create`: Función para la creación de un pedido de producto/s, actualizando la informacion del usuario que ha realizado dicho pedido en una determinada fecha, e indicando el estado del pedido como pendiente o entregado.
- `update`: Función para la actualizacion del estado del pedido de producto/s.


## Funciones del controlador de productos

- `getAll`: Devuelve todos los productos.
- `getById`: Devuelve un producto por su ID.
- `getProductsByName`: Devuelve un producto por su nombre.
- `edit`: Se edita el producto.
- `update`: Procesa la actualización de un producto.
- `delete`: Elimina un producto.
- `insertComment`: Se añade un comentario. 
- `like`: Se añade un me gusta.
- `create`: Se crea un producto nuevo.


## Funciones del controlador de usuarios

- `register`: Se procesa el registro del usuario.
- `login`: Se procesa el login de inicio de sesion del usuario.
- `logout`: Cierra la sesion del usuario.
- `getInfo`: Procesa la actualización de la informacion del usuario.


## Endpoints de la App

La aplicacion 'Pokestore' contiene diferentes rutas según sea para el uso del cliente comprador registrado o no, o para los administradores.

#### Para el uso del cliente no registrado, los endpoint a los cuales puede acceder son:

Tiene acceso a todos los productos, y a su busqueda personalizada, ya sea por ID o por nombre.
- `routerProduct.get('/', productController.getAll)`; Devuelve todos los productos
- `routerProduct.get('/:id', productController.getById)`; Devuelve un producto buscado por su Id.
- `routerProduct.get('/nombre/:nombre', productController.getProductsByName)`; Devuelve un producto buscado por su nombre.

#### Para el uso del cliente registrado, los endpoints accesibles son:

Tiene acceso a todos los productos, y a su busqueda personalizada, ya sea por ID o por nombre, junto a la creación y actualización de pedidos, como a la posibilidad de realizar comentarios o dar me gusta a un producto el cual podemos recoger en nuestra informacion de perfil y sesión.
- `routerProduct.get('/', authentication, productController.getAll)`; Devuelve todos los productos.
- `routerProduct.get('/:id', authentication, productController.getById)`; Devuelve un producto buscado por su Id.
- `routerProduct.get('/nombre/:nombre', authentication, productController.getProductsByName)`; Devuelve un producto buscado por su nombre.
- `routerOrder.post("/",authentication, OrderController.create)`; Permite crear la orden de petición de una compra de uno o varios productos.
- `routerOrder.put("/id/:_id",authentication,OrderController.update)`; Permite la modificacion del estado del pedido entre pendiente o entregado y su actualización y futuro visionado por parte del cliente.
- `routerProduct.post('/:id/comentario', authentication, productController.insertComment)`; Inserta un comentario en el producto, pudiendo hacer una valoración, una futura compra o una distinción importante para el cliente.
- `routerProduct.post('/:id/like', authentication, productController.like)`; Se proporciona un "me gusta" a un producto, para que el cliente pueda saber cuales son sus preferencias y las de todos los clientes.


#### Para el uso de los administradores

Los administradores poseen el acceso a todos los endpoints ya sean de productos, ordenes de pedido y usuarios, pudiendo crear, buscar, modificar o eliminar cualquiera de ellos. Los puntos diferenciales serian la creación, modificación y eliminación de productos, la eliminacion de usuarios.
- `routerProduct.put('/:id/editar',isAdmin, authentication, productController.edit)`; Permite la edición del producto. 
- `routerProduct.post('/crear',isAdmin, authentication, productController.create)`; Permite la creación de un producto nuevo.
- `routerProduct.delete('/:id',isAdmin, authentication, productController.delete)`; Permite la eliminación de un producto de la venta.
- `routerUser.delete('/:id',isAdmin, authentication, productController.delete)`; Permite la eliminación de un usuario.



## Funcionamiento de la aplicación

La aplicación 'Pokestore' esta desarrollada en Node.js. Para ello se han utilizado varias dependencias que explicaremos a continuación.

-`dotenv`: Es un módulo de dependencia cero que carga las variables de entorno desde un archivo .env.

-`express`: Es el entorno de trabajo en el que se ha desarrollado la app y por el cual se ha lanzado un servidor el cual está escuchando por variable de entorno en:  http://localhost:${PORT};

-`firebase`: Es una solución creada por Google para el desarrollo de aplicaciones y mejora de partes de estas. En nuestro caso hemos desarrollado la autenticación del usuario/administrador.

-`mongoose`: Es una librería de Node.js que nos permite realizar consultas y peticiones a bases de datos alojadas en MongoDB Atlas.

-`swagger-ui-express`: Es una infraestructura de visualización que puede analizar la especificación OpenAPI y generar una consola de API para que los usuarios puedan aprender y ejecutar la API REST de forma rápida y sencilla. En nuestro caso solo se ejecutarán las rutas "api".

-`jest`: Es una biblioteca de Node.js para crear, ejecutar y estructurar pruebas o test. En nuestro caso se han realizado los test a las funciones de la aplicación.

-`fl0`: Aunque no es una dependencia utilizamos el implementador de aplicaciones backend y bases de datos llamado `fl0` en el cual hemos creado nuestro proyecto y lo hemos desplegado.