const axios = require('axios');
const PokeballModel = require('./PokeBallModel');

async function obtenerPokeballs() {
    try {
        let url = 'https://pokeapi.co/api/v2/item/?limit=10000';

        const { data } = await axios.get(url);
        const items = data.results;

        // Filtrar las pokeballs
        const pokeballItems = items.filter((item) => {
            return item.name.includes('-ball') || item.name.includes('-Ball');
        });

        for (const pokeballItem of pokeballItems) {
            const { data: itemDetails } = await axios.get(pokeballItem.url);

            // Verificar si es una pokeball
            if (
                (itemDetails.name.includes('-ball') || itemDetails.name.includes('-Ball')) &&
                (itemDetails.category.name.includes('-ball') || itemDetails.category.name.includes('-Ball'))
            ) {
                // Verificar si la Poke Ball tiene una foto
                if (itemDetails.sprites && itemDetails.sprites.default) {
                    // Encontrar la descripción en español en las entradas de efecto
                    let description = '';
                    let nombre = '';
                    let imagen = itemDetails.sprites.default;
                    let cost = itemDetails.cost > 0 ? (itemDetails.cost / 100) : 'Por el momento, esta pokeball no está disponible';

                    // Si no se encuentra en las entradas de efecto, intenta buscar en las entradas de texto
                    const textEntry = itemDetails.flavor_text_entries.find(
                        (entry) => entry.language.name === 'es'
                    );

                    description = textEntry ? textEntry.text : 'No hay descripción en español disponible';

                    const nombreEntry = itemDetails.names.find(
                        (entry) => entry.language.name === 'es'
                    );

                    nombre = nombreEntry ? nombreEntry.name : pokeballItem.name;

                    const newPokeBall = {
                        nombre: nombre,
                        descripcion: description,
                        imagen: imagen,
                        precio: cost
                    };

                    await PokeballModel.create(newPokeBall)
                }
            }
        }
    } catch (error) {
        console.error('Error al obtener las pokeballs:', error);
        throw error;
    }
}


module.exports= obtenerPokeballs