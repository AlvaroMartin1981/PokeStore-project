const express= require('express')
const routes = express.Router()

const showPokeballs =require('../controllers/pokeball/showPokeballs')
const pokeballUnica= require ('../controllers/pokeball/pokeballId')


routes.get('/',showPokeballs)
routes.get('/:pokeballId',pokeballUnica.pokeballId)
routes.get('/nombre/:nombre',pokeballUnica.pokeballPorNombre)


module.exports= routes 
