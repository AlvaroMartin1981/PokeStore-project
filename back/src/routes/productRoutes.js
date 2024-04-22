const express = require('express');
const routerProduct= express.Router();
const productController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');

routerProduct.get('/', productController.getAll);
routerProduct.get('/:id', productController.getById);
routerProduct.get('/nombre/:nombre', productController.getProductsByName);

// Rutas protegidas con autenticación
routerProduct.put('/:id/editar', authentication, productController.edit);
routerProduct.put('/:id', authentication, productController.update);
routerProduct.delete('/:id', authentication, productController.delete);
routerProduct.post('/:id/comentario', authentication, productController.insertComment);
routerProduct.post('/:id/like', authentication, productController.like);
routerProduct.post('/crear', authentication, productController.create);

module.exports = routerProduct;
