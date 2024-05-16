const axios=require('axios')
const ProductModel= require('../models/Producto')
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ObtenerPokemons = async () => {
  const pagina ='https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  try {
    const response = await axios(pagina);
    const data = await response.data;

    let todos = data.results;

    for (const pokemon of todos) {
      await pokemonNumero(pokemon.name);
    }
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  }
};

const pokemonNumero = async (poke) => {
  try {
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    const descripcionResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${poke}`);

    const pokemonData = pokemonResponse.data;
    const descripcionData = descripcionResponse.data;

    const urlEvolution = descripcionData.evolution_chain.url;
    const evoluciones = await obtenerEvoluciones(urlEvolution);
    const evolucionDe = descripcionData.evolves_from_species ? descripcionData.evolves_from_species.name : null;
    const arrayhabilidades = await detalle(pokemonData.abilities);
    const habilidades = arrayhabilidades.map((habilidad) => ({
      nombre: habilidad.nombre,
      descripcion: habilidad.descripcion,
    }));

    // Obtener detalles del Pokemon y la descripción
    const descripcionEspañol = descripcionPokemon(descripcionData.flavor_text_entries);
    const name = capitalizeFirstLetter(pokemonData.name);
    const img = pokemonData.sprites.other['official-artwork'].front_default;
    const id = pokemonData.id;

    const tiposEspañol = pokemonData.types.map((tipo) => {
      const tipoNombre = tipo.type.name;
      const tipoTraducido = traducirTipo(tipoNombre);
      return tipoTraducido;
    });
    const base_experience = pokemonData.base_experience;
    const estadisticas = pokemonData.stats.map((stats) => ({
      nombre: stats.stat.name,
      valor: stats.base_stat,
    }));

    const peso = pokemonData.weight / 10;
    const height = pokemonData.height / 10;

    let sumaBaseStat = (
      (pokemonData.stats.reduce((total, stats) => {
        return total + stats.base_stat;
      }, 0) +
        base_experience) /2
    ).toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    let sumaBaseStatNumero = parseFloat(sumaBaseStat);
    if (descripcionData.is_legendary) {
      sumaBaseStatNumero *= 5;
    }
    if (descripcionData.is_mythical) {
      sumaBaseStatNumero *= 2;
    }

    if (descripcionData.capture_rate < 20) {
      sumaBaseStatNumero += 100;
    } else if (
      descripcionData.capture_rate >= 20 &&
      descripcionData.capture_rate < 40
    ) {
      sumaBaseStatNumero += 80;
    } else if (
      descripcionData.capture_rate >= 40 &&
      descripcionData.capture_rate < 60
    ) {
      sumaBaseStatNumero += 60;
    } else if (
      descripcionData.capture_rate >= 60 &&
      descripcionData.capture_rate < 80
    ) {
      sumaBaseStatNumero += 40;
    } else if (
      descripcionData.capture_rate > 80 &&
      descripcionData.capture_rate < 100
    ) {
      sumaBaseStatNumero += 20;
    } else if (descripcionData.capture_rate > 100) {
      sumaBaseStatNumero -= 20;
    }
    const random = randomLikes();
    const likesCount=RandomlikesCount()
    const newPoke = {
      nombre: name,
      descripcion: descripcionEspañol,
      imagen: img,
      precio: sumaBaseStatNumero,
      categoria: "Pokemon", 
      tipo: tiposEspañol, 
      id_pokedex: id,
      peso: peso,
      altura: height,
      estadisticas: estadisticas,
      legendario: descripcionData.is_legendary,
      mythical: descripcionData.is_mythical,
      habilidades: habilidades,
      ratio_captura: descripcionData.capture_rate,
      base_experience: base_experience,
      cadena_evoluciones: evoluciones,
      evolucionDe: evolucionDe,
      reviews: [], 
      likes: [{ 
        likes:random,
        likesCount:likesCount
      }]
  };
  
    await  ProductModel.create(newPoke)
    console.log(`Pokemon creado ${name}`);
  } catch (error) {
    console.error('Error al obtener detalles del Pokémon:', error);
  }
};

async function obtenerEvoluciones(url) {
  try {
    const response = await axios.get(url);
    const evolutionChain = response.data;

    // Función recursiva para recorrer los nodos del árbol de evolución
    const construirEvoluciones = (chain) => {
      let evoluciones = [];
      let especie = chain.species.name;

      const detallesEvolucion =
        chain.evolution_details.length > 0 ? chain.evolution_details[0] : null;
      let nivelEvolucion = detallesEvolucion
        ? detallesEvolucion.min_level
        : null;

  
      evoluciones.push({ especie: especie, nivel: nivelEvolucion });

    
      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolucion) => {
          const subEvoluciones = construirEvoluciones(evolucion);
          // Si hay subevoluciones, agregarlas a la cadena
          if (subEvoluciones) {
            evoluciones = [...evoluciones, ...subEvoluciones];
          }
        });
      }

      return evoluciones.length > 0 ? evoluciones : null;
    };

   
    const evoluciones = construirEvoluciones(evolutionChain.chain);

    return evoluciones; 
  } catch (error) {
    console.error('Error al obtener las evoluciones:', error);
    return [];
  }
}

async function detalle(habilidad) {
  try {
    let arrayhabilidades = await Promise.all(
      habilidad.map(async (ability) => {
        const urlHabilidad = ability.ability.url;

        const response = await axios.get(urlHabilidad);
        const axiosHabilidad = response.data;

        return {
          nombre: axiosHabilidad.names.find(
            (name) => name.language.name === 'es'
          ).name,
          descripcion: axiosHabilidad.flavor_text_entries.find(
            (entry) => entry.language.name === 'es'
          ).flavor_text,
        };
      })
    );
    return arrayhabilidades;
  } catch (error) {
    console.error('Error al obtener detalles de habilidades:', error);
    return [];
  }
}

function traducirTipo(typeName) {
  const diccionarioTipos = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Electrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada',
  };
  return diccionarioTipos[typeName];
}

function descripcionPokemon(flavortextentries) {
  const descripcionEspañol = flavortextentries.find(
    (entry) => entry.language.name === 'es'
  );
  return descripcionEspañol
    ? descripcionEspañol.flavor_text
    : 'No hay una descripción en español para este Pokémon';
}
function randomLikes() {
  const randomNumber = Math.random() * 2; 
  return parseFloat((randomNumber + 2).toFixed(1)); 
}

function RandomlikesCount() {
  return Math.floor(Math.random() * 20) + 1;
}
  module.exports= ObtenerPokemons
