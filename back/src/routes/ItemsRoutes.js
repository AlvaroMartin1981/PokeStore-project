const express= require('express')
const routes = express.Router()

const showItems =require('../controllers/items/showItems') 
const itemsTipo =require('../controllers/items/tipoItems') 
const ItemsUnico =require('../controllers/items/ItemsId') 

routes.get('/',showItems)
routes.get('/categoria/:itemstipo',itemsTipo)
routes.get('/:itemsId',ItemsUnico.itemsId)
routes.get('/nombre/:nombre',ItemsUnico.itemsPorNombre)

module.exports= routes 