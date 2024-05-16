const express = require('express');
const routerProduct= express.Router();
const productController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');

routerProduct.get('/', productController.getAll);
routerProduct.get('/:id', productController.getById);
routerProduct.get('/nombre/:nombre', productController.getProductsByName);

// Rutas protegidas con autenticación
routerProduct.post('/:id/comentario', productController.insertComment);
routerProduct.post('/:id/like', productController.like);

// Rutas protegidas solo para administradores
routerProduct.put('/:id/editar', authentication, productController.edit);
routerProduct.post('/crear',authentication, productController.create);
routerProduct.delete('/:id',authentication, productController.delete);
routerProduct.put('/:id',authentication, productController.update);

module.exports = routerProduct;
