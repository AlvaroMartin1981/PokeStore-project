const express= require('express')
const routes = express.Router()
const showPokemon= require('../controllers/showPokemon')
const pokeTipo= require('../controllers/TiposPokemon')
const showPokeballs =require('../controllers/showPokeballs')
const pokemonUnico = require('../controllers/pokemonId')
const pokeballUnica= require ('../controllers/pokeballId')
const pokemonEspecial =require('../controllers/especialPokemon')

routes.get('/pokemon',showPokemon)
routes.get('/pokemon/nombre/:nombre',pokemonUnico.pokemonPorNombre)
routes.get('/pokemon/:pokemonId',pokemonUnico.pokemonId)
routes.get('/pokemon/tipo/:tipo',pokeTipo)
routes.get('/pokemon/especial/legendarios',pokemonEspecial.obtenerLegendarios)
routes.get('/pokemon/especial/misticos',pokemonEspecial.obtenerMísticos)

routes.get('/pokeballs',showPokeballs)
routes.get('/pokeballs/:id',pokeballUnica.pokeballId)
routes.get('/pokeballs/nombre/:nombre',pokeballUnica.pokeballPorNombre)


module.exports= routes 
