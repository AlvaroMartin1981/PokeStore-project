const express= require('express')
const routes = express.Router()

const showItems =require('../controllers/items/showItems') 
const itemsTipo =require('../controllers/items/tipoItems') 
const ItemsUnico =require('../controllers/items/ItemsId') 

routes.get('/items',showItems)
routes.get('/items/categoria/:itemstipo',itemsTipo)
routes.get('/items/:itemsId',ItemsUnico.itemsId)
routes.get('/items/nombre/:nombre',ItemsUnico.itemsPorNombre)

module.exports= routes 