const axios = require('axios');
const ItemModel = require('../models/itemModel')

async function obtenerOtrosItems() {
  try {
    let url = 'https://pokeapi.co/api/v2/item/?limit=30000';

    const response = await axios.get(url);
    const { results: items } = response.data;

    // Filtrar los ítems que no son pokeballs
    const otrosItems = items.filter((item) => {
      return !(item.name.includes('-ball') || item.name.includes('-Ball'));
    });

    for (const item of otrosItems) {
      const itemResponse = await axios.get(item.url);
      const itemDetails = itemResponse.data;

      // Verificar si es un ítem válido
      if (
        itemDetails.name &&
        itemDetails.sprites &&
        itemDetails.sprites.default
      ) {
        // Encontrar la descripción en español en las entradas de efecto
        let description = '';
        let nombre = '';
        let imagen = itemDetails.sprites.default;
        let cost =
          itemDetails.cost > 0
            ? itemDetails.cost / 100
            : 'Por el momento, este ítem no está disponible';

        // Obtener la categoría en español
        let categoria = itemDetails.category.name;

        // Si no se encuentra en las entradas de efecto, intenta buscar en las entradas de texto
        const textEntry = itemDetails.flavor_text_entries.find(
          (entry) => entry.language.name === 'es'
        );

        description = textEntry
          ? textEntry.text
          : 'No hay descripción en español disponible';

        const nombreEntry = itemDetails.names.find(
          (entry) => entry.language.name === 'es'
        );

        nombre = nombreEntry ? nombreEntry.name : item.name;

        const newItem = {
          nombre: nombre,
          descripcion: description,
          imagen: imagen,
          precio: cost,
          tipo: categoria,
          categoria:'Item',
        };
        await ItemModel.create(newItem)
        // Crear el modelo del nuevo ítem
        console.log(newItem.nombre);
      }
    }
  } catch (error) {
    console.error('Error al obtener los ítems:', error);
    throw error;
  }
}
module.exports=obtenerOtrosItems