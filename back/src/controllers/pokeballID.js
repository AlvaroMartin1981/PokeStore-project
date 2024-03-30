const PokeBallModel= require('../models/PokeBallModel')

const  pokeballUnica ={

    async pokeballId(req, res) {
        try {
        const pokeballId = req.params.pokeballId;
        const pokeball = await PokeBallModel.findById(pokeballId);
console.log(pokeballId)
        if (!pokeball) {
            return res.status(404).json({ error: 'pokeball no encontrado' });
        }
        res.json(pokeball);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle de la pokeball' });
    }
    },

    async  pokeballPorNombre(req, res) {
        try {
            let nombre = req.params.nombre;
            const pokeball = await PokeBallModel.findOne({ nombre });
    
            if (!pokeball) {
                return res.status(404).json({ error: 'pokeball no encontrado' });
            }
    
            res.json(pokeball);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el detalle de la pokeball' });
        }
    }
}

module.exports = pokeballUnica;
