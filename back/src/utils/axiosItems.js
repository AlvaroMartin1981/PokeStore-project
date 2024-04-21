const axios = require('axios');
const ProductModel = require('../models/Producto');
async function obtenerItems() {
  try {
    let url = 'https://pokeapi.co/api/v2/item?limit=100000&offset=0';

    const response = await axios.get(url);
    const { results: items } = response.data;

    for (const item of items) {
      try {
        const itemResponse = await axios.get(item.url);
        const itemDetails = itemResponse.data;

        let description = '';
        let nombre = '';
        let imagen = itemDetails.sprites.default;
        let cost =
          itemDetails.cost > 0
            ? itemDetails.cost / 100
            : 'No disponible';

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
          categoria: 'Item',
          id: itemDetails.id,
          tipo: categoria,
        };
        
        // Crear el modelo del nuevo producto
        await ProductModel.create(newProduct);
        console.log(newProduct.nombre);
      } catch (error) {
        console.error('Error al crear el producto:', error);
        // Continuar con el siguiente elemento
        continue;
      }
    }
  } catch (error) {
    console.error('Error al obtener los ítems:', error);
    throw error;
  }
}
module.exports= obtenerItems