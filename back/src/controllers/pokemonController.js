const PokemonModel = require('../models/PokemonModel');

const pokemonController ={
    
    async obtenerLegendarios (req, res){
        try {
            const legendarios = await PokemonModel.find({ legendario: true });
            res.json(legendarios);
        } catch (error) {
            console.error('Error al obtener Pokémon legendarios:', error);
            res.status(500).json({ error: 'Error al obtener Pokémon legendarios' });
        }
    },
    async obtenerMísticos (req, res){
        try {
          const místicos = await PokemonModel.find({ mythical: true });
          res.json(místicos);
        } catch (error) {
          console.error('Error al obtener Pokémon míticos:', error);
          res.status(500).json({ error: 'Error al obtener Pokémon míticos' });
        }
    },
    async obtenerPokemonConEvolucion(req, res) {
        try {
          // Buscar los Pokémon que tienen cadena de evolución con más de un paso
          const pokemonConEvolucion = await PokemonModel.find({ 'cadena_evoluciones': { $exists: true, $not: { $size: 1 } } });
      
          // Devolver la lista de Pokémon con evolución
          res.json(pokemonConEvolucion);
        } catch (error) {
          console.error('Error al obtener los Pokémon con evolución:', error);
          res.status(500).json({ error: 'Error interno del servidor' });
        }
    }, 
    async pokemonId(req, res) {
        try {
        const pokemonId = req.params.pokemonId;
        const pokemon = await PokemonModel.findById(pokemonId);

        if (!pokemon) {
            return res.status(404).json({ error: 'Pokémon no encontrado' });
        }
        res.json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle del Pokémon' });
    }
    },

    async  pokemonPorNombre(req, res) {
        try {
            let nombre = req.params.nombre;
            nombre = nombre.toUpperCase(); // Convertir a mayúsculas
            const pokemon = await PokemonModel.findOne({ nombre });
    
            if (!pokemon) {
                return res.status(404).json({ error: 'Pokémon no encontrado' });
            }
    
            res.json(pokemon);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el detalle del Pokémon' });
        }
    },
    async showPokemon (req, res){
        try {
          const TodosPokemon = await PokemonModel.find();
            res.json(TodosPokemon)
         
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener todos los pokemons' });
        }
    },
    async pokeTipo (req, res){
        let tipos = req.params.tipo;
        tipos = tipos.toUpperCase(); 
        try {
            const tiposPokemon = await PokemonModel.find({ tipo: { $in: [tipos] } });
            res.json(tiposPokemon)
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: `Error al obtener todos los pokemons de ${tipos}` });
        }
    }
}   


module.exports= pokemonController