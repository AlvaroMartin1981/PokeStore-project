const PokemonModel = require('../models/PokemonModel');

const  pokemonUnico ={

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
    }
}

module.exports = pokemonUnico;
