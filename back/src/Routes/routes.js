const express= require('express')
const routes = express.Router()
const showProducts= require('../controllers/showControllers')
const pokeTipo= require('../controllers/PokeTipoController')

routes.get('/',showProducts)
routes.get('/:tipo',pokeTipo)

module.exports= routes 
