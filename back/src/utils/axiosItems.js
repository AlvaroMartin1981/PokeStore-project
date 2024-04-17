const axios = require('axios');
const ProductModel = require('../models/productoModel');

async function obtenerItems() {
  try {
    let url = 'https://pokeapi.co/api/v2/item?limit=100000&offset=0';

    const response = await axios.get(url);
    const { results: items } = response.data;

    const tiposItemsSet = new Set(); // Conjunto para almacenar tipos únicos de items

    for (const item of items) {
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
            : 'Este ítem no está disponible';

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

        const newProduct = {
          nombre: nombre,
          descripcion: description,
          imagen: imagen,
          precio: cost,
          tipo: categoria,
          categoria: 'item', // Puedes cambiar esto según cómo quieras manejar las categorías
          // Agrega aquí cualquier otro campo específico del producto
        };

        // Añadir el tipo de item al conjunto de tiposItemsSet
        tiposItemsSet.add(categoria);

        // Crear el modelo del nuevo producto
        await ProductModel.create(newProduct);
        console.log(newProduct.nombre);
        console.log(tiposItemsSet)
      }
    }

    // Convertir el conjunto de tipos únicos de items en un array
    const tiposItemsArray = Array.from(tiposItemsSet);
    console.log('Tipos de items:', tiposItemsArray);

  } catch (error) {
    console.error('Error al obtener los ítems:', error);
    throw error;
  }
}

module.exports = obtenerItems;
