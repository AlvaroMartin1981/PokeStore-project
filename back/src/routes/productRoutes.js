const express = require('express');
const routerProduct = express.Router();
const productController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');

routerProduct.get('/', productController.getAll);
routerProduct.get('/nombre/:nombre', productController.getProductsByName);

// Rutas protegidas con autenticación
routerProduct.post('/:nombre/comentario', productController.insertComment);

// Rutas protegidas solo para administradores
routerProduct.post('/crear', productController.create);
routerProduct.delete('/nombre/:nombre', productController.delete);
routerProduct.put('/edit/:nombre', authentication, productController.update);

module.exports = routerProduct;
