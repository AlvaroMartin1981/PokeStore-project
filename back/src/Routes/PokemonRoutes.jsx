const express= require('express')
const routes = express.Router()
const showPokemon= require('../controllers/pokemon/showPokemon')
const pokeTipo= require('../controllers/pokemon/TiposPokemon')
const pokemonUnico = require('../controllers/pokemon/pokemonId')
const pokemonEspecial =require('../controllers/pokemon/especialPokemon')
const obtenerPokemonConEvolucion =require('../controllers/pokemon/evolucionaPokemon')
  

routes.get('/pokemon',showPokemon)
routes.get('/pokemon/nombre/:nombre',pokemonUnico.pokemonPorNombre)
routes.get('/pokemon/:pokemonId',pokemonUnico.pokemonId)
routes.get('/pokemon/tipo/:tipo',pokeTipo)
routes.get('/pokemon/especial/legendarios',pokemonEspecial.obtenerLegendarios)
routes.get('/pokemon/especial/misticos',pokemonEspecial.obtenerMísticos)
routes.get('/pokemon/evoluciona/evolucion',obtenerPokemonConEvolucion)

module.exports= routes