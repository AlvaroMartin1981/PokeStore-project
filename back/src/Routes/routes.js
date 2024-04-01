const express= require('express')
const routes = express.Router()
const showPokemon= require('../controllers/pokemon/showPokemon')
const pokeTipo= require('../controllers/pokemon/TiposPokemon')
const showPokeballs =require('../controllers/pokeball/showPokeballs')
const pokemonUnico = require('../controllers/pokemon/pokemonId')
const pokeballUnica= require ('../controllers/pokeball/pokeballId')
const pokemonEspecial =require('../controllers/pokemon/especialPokemon')
const obtenerPokemonConEvolucion =require('../controllers/pokemon/evolucionaPokemon')
const showItems =require('../controllers/items/showItems') 

routes.get('/pokemon',showPokemon)
routes.get('/pokemon/nombre/:nombre',pokemonUnico.pokemonPorNombre)
routes.get('/pokemon/:pokemonId',pokemonUnico.pokemonId)
routes.get('/pokemon/tipo/:tipo',pokeTipo)
routes.get('/pokemon/especial/legendarios',pokemonEspecial.obtenerLegendarios)
routes.get('/pokemon/especial/misticos',pokemonEspecial.obtenerMísticos)
routes.get('/pokemon/evoluciona/evolucion',obtenerPokemonConEvolucion)



routes.get('/pokeballs',showPokeballs)
routes.get('/pokeballs/:pokeballId',pokeballUnica.pokeballId)//Ojo
routes.get('/pokeballs/nombre/:nombre',pokeballUnica.pokeballPorNombre)

routes.get('/items',showItems)
//Falta buscar items por nombre y por tipo

//ademas de las rutas de dashboard y de usuario

module.exports= routes 
