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
const itemsTipo =require('../controllers/items/tipoItems') 
const ItemsUnico =require('../controllers/items/ItemsId') 


routes.get('/pokemon',showPokemon)
routes.get('/pokemon/nombre/:nombre',pokemonUnico.pokemonPorNombre)
routes.get('/pokemon/:pokemonId',pokemonUnico.pokemonId)
routes.get('/pokemon/tipo/:tipo',pokeTipo)
routes.get('/pokemon/especial/legendarios',pokemonEspecial.obtenerLegendarios)
routes.get('/pokemon/especial/misticos',pokemonEspecial.obtenerMísticos)
routes.get('/pokemon/evoluciona/evolucion',obtenerPokemonConEvolucion)

routes.get('/pokeballs',showPokeballs)
routes.get('/pokeballs/:pokeballId',pokeballUnica.pokeballId)
routes.get('/pokeballs/nombre/:nombre',pokeballUnica.pokeballPorNombre)

routes.get('/items',showItems)
routes.get('/items/categoria/:itemstipo',itemsTipo)//revisar
routes.get('/items/:itemsId',ItemsUnico.itemsId)//revisar
routes.get('/items/nombre/:nombre',ItemsUnico.itemsPorNombre)

//Falta buscar items por nombre y por tipo

//ademas de las rutas de dashboard y de usuario

module.exports= routes 
