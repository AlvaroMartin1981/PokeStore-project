const express = require('express');
const router = express.Router();
const productController = require('./controllers/productController');


router.get('/productos', productController.getAll);
router.get('/productos/:id', productController.getById);
router.get('/productos/nombre/:nombre', productController.getProductsByName);//revisr
router.put('/productos/:id/editar', productController.edit);
router.put('/productos/:id', productController.update);
router.delete('/productos/:id', productController.delete);
router.post('/productos/:id/comentario', productController.insertComment);
router.post('/productos/:id/like', productController.like);
router.post('/productos/crear', productController.create);

module.exports = router;
