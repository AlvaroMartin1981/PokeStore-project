const express= require('express')
const routes = express.Router()

const showPokeballs =require('../controllers/pokeball/showPokeballs')
const pokeballUnica= require ('../controllers/pokeball/pokeballId')


routes.get('/pokeballs',showPokeballs)
routes.get('/pokeballs/:pokeballId',pokeballUnica.pokeballId)
routes.get('/pokeballs/nombre/:nombre',pokeballUnica.pokeballPorNombre)


module.exports= routes 
