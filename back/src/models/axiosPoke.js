const axios=require('axios')
const PokemonModel = require('./Pokemodels')

const ObtenerPokemons = async (pagina) => {
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
      const [pokemonResponse, descripcionResponse] = await Promise.all([
        axios(`https://pokeapi.co/api/v2/pokemon/${poke}`),
        axios(`https://pokeapi.co/api/v2/pokemon-species/${poke}`)
      ]);

      const pokemon = pokemonResponse.data; // Acceder al cuerpo de la respuesta
      const descripcion = descripcionResponse.data;
      const arrayhabilidades = await detalle(pokemon.abilities);
      const habilidades = arrayhabilidades.map((habilidad) => ({
        nombre: habilidad.nombre,
        descripcion: habilidad.descripcion,
      }));
  
      const legendario = descripcion.is_legendary;
      const mythical = descripcion.is_mythical;
  
      // Obtener detalles del Pokemon y la descripción
      const descripcionEspañol = descripcionPokemon(
        descripcion.flavor_text_entries
      );
      const name = pokemon.name.toUpperCase();
      const img = pokemon.sprites.other['official-artwork'].front_default;
      const id = pokemon.id;
    
  
      const tiposEspañol = pokemon.types.map((tipo) => {
        const tipoNombre = tipo.type.name;
        const tipoTraducido = traducirTipo(tipoNombre);
        return tipoTraducido;
      });
      const base_experience = pokemon.base_experience;
      const estadisticas = pokemon.stats.map((stats) => ({
        nombre: stats.stat.name,
        valor: stats.base_stat,
      }));
  
      const peso = pokemon.weight / 10;
      const height = pokemon.height / 10;
  
      let sumaBaseStat = (
        (pokemon.stats.reduce((total, stats) => {
          return total + stats.base_stat;
        }, 0) +
          base_experience) /
        10
      ).toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });


    let sumaBaseStatNumero = parseFloat(sumaBaseStat);
    if (legendario) {
        sumaBaseStatNumero *= 5;
     }
    if (mythical) {
        sumaBaseStatNumero *= 2;
    }
      
    if (descripcion.capture_rate < 20) {
        sumaBaseStatNumero += 120;
    } else if ( descripcion.capture_rate >= 20 && descripcion.capture_rate < 40)
    {
        sumaBaseStatNumero += 90;
    } else if ( descripcion.capture_rate >= 40 && descripcion.capture_rate < 60)
    { 
         sumaBaseStatNumero += 60;
    } else if ( descripcion.capture_rate >= 60 && descripcion.capture_rate < 80)
     {
       sumaBaseStatNumero += 40;
    } else if (descripcion.capture_rate > 80 && descripcion.capture_rate < 100) {
       sumaBaseStatNumero += 20;
    } else if (descripcion.capture_rate > 100) {
      sumaBaseStatNumero -= 20;
    }
  
      const newPoke = {
        nombre: name,
        tipo: tiposEspañol,
        peso: peso,
        altura: height,
        imagen: img,
        descripcion: descripcionEspañol,
        estadisticas: estadisticas,
        id_pokedex: id,
        legendario: legendario,
        mythical: mythical,
        habilidades: habilidades,
        ratio_captura: descripcion.capture_rate,
        precio: sumaBaseStatNumero,
        base_experience:base_experience
      };

      await  PokemonModel.create(newPoke)
      console.log(name);
    
    } catch (error) {
      console.error('Error al obtener detalles del Pokémon:', error);
    }
  };
  
  function traducirTipo(typeName) {
    const diccionarioTipos = {
      normal: 'NORMAL',
      fire: 'FUEGO',
      water: 'AGUA',
      electric: 'ELECTRICO',
      grass: 'PLANTA',
      ice: 'HIELO',
      fighting: 'PELEA',
      poison: 'VENENO',
      ground: 'TIERRA',
      flying: 'VOLADOR',
      psychic: 'PSÍQUICO',
      bug: 'INSECTO',
      rock: 'ROCA',
      ghost: 'FANSTASMA',
      dragon: 'DRAGÓN',
      dark: 'SINIESTRO',
      steel: 'ACERO',
      fairy: 'HADA',
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
  
  async function detalle(habilidad) {
    let arrayhabilidades = await Promise.all(
      habilidad.map(async (ability) => {
        const urlHabilidad = ability.ability.url;
  
        const response = await axios(`${urlHabilidad}`);
        const axiosHabilidad = await response.data;
  
        return {
          nombre: axiosHabilidad.names.find((name) => name.language.name === 'es')
            .name,
          descripcion: axiosHabilidad.flavor_text_entries.find(
            (entry) => entry.language.name === 'es'
          ).flavor_text,
        };
      })
    );
    return arrayhabilidades;
  }
module.exports ={ pokemonNumero,ObtenerPokemons}