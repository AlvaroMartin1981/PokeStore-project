
const express = require('express');
const routerProduct= express.Router();
const productController = require('../controllers/productController');



routerProduct.get('/', productController.getAll);
routerProduct.get('/:id', productController.getById);
routerProduct.get('/nombre/:nombre', productController.getProductsByName);
routerProduct.put('/:id/editar', productController.edit);
routerProduct.put('/:id', productController.update);
routerProduct.delete(':id', productController.delete);
routerProduct.post('/:id/comentario', productController.insertComment);
routerProduct.post('/:id/like', productController.like);
routerProduct.post('/crear', productController.create);

module.exports = routerProduct;
