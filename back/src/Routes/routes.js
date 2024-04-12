const express= require('express')
const routes = express.Router()
const itemController = require('../controllers/itemController');
const pokemonController = require('../controllers/pokemonController');
const pokeballController = require('../controllers/pokeballController')


//const productController= require('../controllers/productController')



routes.get( '/', (req, res) => {
    res.redirect('/products/')
});


routes.get('/pokemon',pokemonController.showPokemon)
routes.get('/pokemon/nombre/:nombre',pokemonController.pokemonPorNombre)
routes.get('/pokemon/:pokemonId',pokemonController.pokemonId)
routes.get('/pokemon/tipo/:tipo',pokemonController.pokeTipo)
routes.get('/pokemon/especial/legendarios',pokemonController.obtenerLegendarios)
routes.get('/pokemon/especial/misticos',pokemonController.obtenerMísticos)
routes.get('/pokemon/evoluciona/evolucion',pokemonController.obtenerPokemonConEvolucion)

routes.get('/pokeballs',pokeballController.showPokeballs)
routes.get('/pokeballs/:pokeballId',pokeballController.pokeballId)
routes.get('/pokeballs/nombre/:nombre',pokeballController.pokeballPorNombre)

routes.get('/items',itemController.showItems)
routes.get('/items/categoria/:itemstipo',itemController.itemsTipo)//revisar
routes.get('/items/:itemsId',itemController.itemsId)//revisar
routes.get('/items/nombre/:nombre',itemController.itemsPorNombre)

//Falta buscar items por nombre y por tipo

//ademas de las rutas de dashboard y de usuario

module.exports= routes 
