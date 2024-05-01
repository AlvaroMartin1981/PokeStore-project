const express = require('express');
const routerProduct= express.Router();
const productController = require('../controllers/productController');
const { authentication, isAdmin } = require('../middlewares/authentication');


routerProduct.get('/', productController.getAll);
routerProduct.get('/:id', productController.getById);
routerProduct.get('/nombre/:nombre', productController.getProductsByName);

// Rutas protegidas con autenticación
routerProduct.post('/:id/comentario', authentication, productController.insertComment);
routerProduct.post('/:id/like', authentication, productController.like);

// Rutas protegidas solo para administradores
routerProduct.put('/:id/editar', isAdmin, productController.edit);
routerProduct.post('/crear',isAdmin, productController.create);
routerProduct.delete('/:id',isAdmin, productController.delete);
routerProduct.put('/:id',isAdmin, productController.update);

module.exports = routerProduct;
