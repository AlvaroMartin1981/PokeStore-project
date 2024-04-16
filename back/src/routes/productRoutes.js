const express = require('express');
const router = express.Router();
const productControllerVariation = require('./productController');

// Rutas para productos

// Obtener todos los productos
router.get('/', productControllerVariation.getAll);

// Obtener un producto por su ID
router.get('/:id', productControllerVariation.getById);

// Buscar productos por nombre
router.get('/search', productControllerVariation.getProductsByName);

// Editar un producto
router.put('/:id', productControllerVariation.edit);

// Actualizar un producto
router.patch('/:id', productControllerVariation.update);

// Eliminar un producto
router.delete('/:id', productControllerVariation.delete);

// Insertar un comentario en un producto
router.post('/:id/comment', productControllerVariation.insertComment);

// Dar "Me gusta" a un producto
router.post('/:id/like', productControllerVariation.like);

module.exports = router;
