const express= require('express')
const routes = express.Router()
const showPokemon= require('../controllers/showPokemon')
const pokeTipo= require('../controllers/TiposPokemon')
const showPokeballs =require('../controllers/showPokeballs')
const pokemonUnico = require('../controllers/pokemonID')
const pokeballID = require ('../controllers/pokeballID')

routes.get('/pokemon',showPokemon)
routes.get('/pokemon/nombre/:nombre',pokemonUnico.pokemonPorNombre)
routes.get('/pokemon/:pokemonId',pokemonUnico.pokemonId)
routes.get('/pokemon/tipo/:tipo',pokeTipo)

routes.get('/pokeballs',showPokeballs)
routes.get('/pokeballs/:id',pokeballID)


module.exports= routes 
