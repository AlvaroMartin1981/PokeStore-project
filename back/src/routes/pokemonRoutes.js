const express= require('express')
const router = express.Router()
const showPokemon= require('../controllers/pokemon/showPokemon')
const pokeTipo= require('../controllers/pokemon/TiposPokemon')
const pokemonUnico = require('../controllers/pokemon/pokemonId')
const pokemonEspecial =require('../controllers/pokemon/especialPokemon')
const obtenerPokemonConEvolucion =require('../controllers/pokemon/evolucionaPokemon')
  

router.get('/',showPokemon)
router.get('/nombre/:nombre',pokemonUnico.pokemonPorNombre)
router.get('/:pokemonId',pokemonUnico.pokemonId)
router.get('/tipo/:tipo',pokeTipo)
router.get('/special/legendarios',pokemonEspecial.obtenerLegendarios)
router.get('/especial/misticos',pokemonEspecial.obtenerMísticos)
router.get('/evoluciona/evolucion',obtenerPokemonConEvolucion)

module.exports= router